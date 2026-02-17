#!/usr/bin/env node
import fs from 'fs';
import crypto from 'crypto';

function parseArgs(argv) {
  const args = { digest: '', result: '', dryRun: false, testSuffix: '' };
  for (let i = 2; i < argv.length; i++) {
    const cur = argv[i];
    if (cur === '--digest') args.digest = argv[++i];
    else if (cur === '--result') args.result = argv[++i];
    else if (cur === '--dry-run') args.dryRun = true;
    else if (cur === '--test-suffix') args.testSuffix = argv[++i] || '';
  }
  return args;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function uniqueNonEmpty(values = []) {
  return [...new Set(values.map((v) => String(v || '').trim()).filter(Boolean))];
}

function limitText(text, max = 600) {
  const s = String(text || '');
  if (s.length <= max) return s;
  return `${s.slice(0, max)}…`;
}

function appendSuffix(text, suffix, maxLen = 280) {
  const base = String(text || '');
  const sfx = String(suffix || '');
  if (!sfx) return base;

  if (base.length + sfx.length <= maxLen) return `${base}${sfx}`;

  const ellipsis = '…';
  const keepLen = Math.max(0, maxLen - sfx.length - ellipsis.length);
  return `${base.slice(0, keepLen)}${ellipsis}${sfx}`;
}

function buildThreadWithSuffix(thread, suffix) {
  if (!suffix) return thread;
  return {
    main: appendSuffix(thread.main, suffix),
    replies: (thread.replies || []).map((reply) => appendSuffix(reply, suffix)),
  };
}

// --- OAuth 1.0a ---

function percentEncode(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) =>
    `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

function buildOAuthHeader({ method, url, consumerKey, consumerSecret, tokenKey, tokenSecret }) {
  const oauthParams = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: String(Math.floor(Date.now() / 1000)),
    oauth_token: tokenKey,
    oauth_version: '1.0',
  };

  const sigParams = Object.entries(oauthParams)
    .map(([k, v]) => [percentEncode(k), percentEncode(v)])
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  const baseString = [method.toUpperCase(), percentEncode(url), percentEncode(sigParams)].join('&');
  const signingKey = `${percentEncode(consumerSecret)}&${percentEncode(tokenSecret)}`;
  const signature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');

  oauthParams.oauth_signature = signature;

  const headerValue = Object.entries(oauthParams)
    .map(([k, v]) => `${percentEncode(k)}="${percentEncode(v)}"`)
    .join(', ');

  return `OAuth ${headerValue}`;
}

// --- Parse X API error payload ---

function parseErrorPayload(resBody) {
  let parsed = null;
  try {
    parsed = JSON.parse(resBody);
  } catch {
    parsed = null;
  }

  const details = [];
  const codes = [];
  const collect = (obj) => {
    if (!obj || typeof obj !== 'object') return;

    const detail = obj.detail || obj.message || obj.title || obj.reason || obj.value;
    if (detail) details.push(String(detail));

    if (obj.code !== undefined && obj.code !== null) codes.push(String(obj.code));
    if (obj.type) codes.push(String(obj.type));
    if (obj.parameter) codes.push(`parameter:${obj.parameter}`);
  };

  if (parsed && typeof parsed === 'object') {
    collect(parsed);

    if (Array.isArray(parsed.errors)) {
      for (const err of parsed.errors) collect(err);
    }

    if (Array.isArray(parsed.problems)) {
      for (const p of parsed.problems) collect(p);
    }
  }

  const errorDetail = uniqueNonEmpty(details).join(' | ') || String(resBody || 'Unknown error');
  const errorCode = uniqueNonEmpty(codes).join(',') || null;

  return {
    parsed,
    errorDetail: limitText(errorDetail, 1000),
    errorCode,
  };
}

function buildRetryWaitMs({ status, attempt, rlReset }) {
  // 403: duplicate/spam suspected -> intentionally longer backoff
  if (status === 403) {
    const min = attempt * 30000; // 30s, 60s, 90s...
    const max = min + 30000;
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  // 429: respect reset header if available
  if (status === 429) {
    const resetEpoch = Number(rlReset || 0);
    const nowEpoch = Math.floor(Date.now() / 1000);
    if (Number.isFinite(resetEpoch) && resetEpoch > nowEpoch) {
      const untilResetMs = (resetEpoch - nowEpoch) * 1000;
      return Math.max(untilResetMs + 1000, 10000);
    }

    const min = attempt * 15000; // 15s, 30s, 45s...
    const max = min + 10000;
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  return 0;
}

class XPostError extends Error {
  constructor({ message, httpStatus = null, errorCode = null, errorDetail = '', attempts = 1, response = null }) {
    super(message);
    this.name = 'XPostError';
    this.httpStatus = httpStatus;
    this.errorCode = errorCode;
    this.errorDetail = errorDetail;
    this.attempts = attempts;
    this.response = response;
  }
}

function asXPostError(err) {
  if (err instanceof XPostError) return err;
  return new XPostError({
    message: err?.message || 'Unknown posting error',
    errorDetail: err?.message || 'Unknown posting error',
    attempts: 1,
  });
}

// --- Tweet posting ---

async function postTweet({ text, replyToId, url, credentials, maxAttempts = 3 }) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const authorization = buildOAuthHeader({ method: 'POST', url, ...credentials });

      const body = { text };
      if (replyToId) {
        body.reply = { in_reply_to_tweet_id: replyToId };
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const resBody = await res.text();

      if (res.ok) {
        const json = JSON.parse(resBody);
        return { id: json.data.id, attempts: attempt };
      }

      const rlRemaining = res.headers.get('x-rate-limit-remaining');
      const rlReset = res.headers.get('x-rate-limit-reset');
      if (rlRemaining !== null) {
        console.warn(`Rate limit remaining: ${rlRemaining}, reset: ${rlReset}`);
      }

      const parsed = parseErrorPayload(resBody);
      const waitMs = attempt < maxAttempts ? buildRetryWaitMs({ status: res.status, attempt, rlReset }) : 0;

      console.warn(`Attempt ${attempt}/${maxAttempts} failed (${res.status}) code=${parsed.errorCode || '-'} detail=${parsed.errorDetail}`);

      if (waitMs > 0) {
        console.warn(`Retrying in ${(waitMs / 1000).toFixed(1)}s...`);
        await sleep(waitMs);
        continue;
      }

      throw new XPostError({
        message: `X post failed (${res.status}): ${parsed.errorDetail}`,
        httpStatus: res.status,
        errorCode: parsed.errorCode,
        errorDetail: parsed.errorDetail,
        attempts: attempt,
        response: parsed.parsed,
      });
    } catch (err) {
      if (err instanceof XPostError) throw err;

      const netErr = asXPostError(err);
      if (attempt < maxAttempts) {
        const waitMs = 3000 + attempt * 2000 + Math.floor(Math.random() * 2000); // 5~9s
        console.warn(`Attempt ${attempt}/${maxAttempts} network error: ${netErr.errorDetail}`);
        console.warn(`Retrying in ${(waitMs / 1000).toFixed(1)}s...`);
        await sleep(waitMs);
        continue;
      }

      throw new XPostError({
        message: `Network error while posting: ${netErr.errorDetail}`,
        errorCode: 'network_error',
        errorDetail: netErr.errorDetail,
        attempts: attempt,
      });
    }
  }

  throw new XPostError({
    message: 'Unexpected posting error',
    errorCode: 'unexpected',
    errorDetail: 'Unexpected posting error',
    attempts: maxAttempts,
  });
}

// --- Tweet deletion (for rollback) ---

async function deleteTweet({ tweetId, apiBase, credentials }) {
  const url = `${apiBase}/2/tweets/${tweetId}`;
  const authorization = buildOAuthHeader({ method: 'DELETE', url, ...credentials });

  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: { Authorization: authorization },
    });

    if (res.ok) {
      console.log(`Deleted tweet: ${tweetId}`);
      return { ok: true };
    }

    const resBody = await res.text();
    const parsed = parseErrorPayload(resBody);
    console.warn(`Failed to delete tweet ${tweetId} (${res.status}) code=${parsed.errorCode || '-'} detail=${parsed.errorDetail}`);
    return { ok: false, status: res.status, errorCode: parsed.errorCode, errorDetail: parsed.errorDetail };
  } catch (err) {
    const msg = err?.message || 'delete fetch failed';
    console.warn(`Failed to delete tweet ${tweetId}: ${msg}`);
    return { ok: false, status: null, errorCode: 'delete_network_error', errorDetail: msg };
  }
}

// --- Rollback: delete all posted tweets ---

async function rollbackThread(postedIds, apiBase, credentials) {
  console.log(`\nRolling back ${postedIds.length} posted tweet(s)...`);
  let deleted = 0;
  const failures = [];

  // Delete in reverse order (replies first, then main)
  for (let i = postedIds.length - 1; i >= 0; i--) {
    const tweetId = postedIds[i];
    const result = await deleteTweet({ tweetId, apiBase, credentials });
    if (result.ok) deleted++;
    else failures.push({ tweetId, ...result });

    if (i > 0) await sleep(1000);
  }

  console.log(`Rollback complete: ${deleted}/${postedIds.length} deleted`);
  return {
    attempted: postedIds.length,
    deleted,
    failures,
  };
}

function writeResult(resultPath, data) {
  if (resultPath) {
    fs.writeFileSync(resultPath, JSON.stringify(data, null, 2));
  }
}

function parseBoolEnv(name, defaultValue) {
  const raw = process.env[name];
  if (raw === undefined || raw === null || raw === '') return defaultValue;
  return !['0', 'false', 'no', 'off'].includes(String(raw).toLowerCase());
}

async function main() {
  const { digest: digestPath, result: resultPath, dryRun, testSuffix } = parseArgs(process.argv);
  if (!digestPath) {
    console.error('Usage: node scripts/post-x.mjs --digest <digest.json> [--result <post-result.json>] [--dry-run] [--test-suffix " · test:abcd123"]');
    process.exit(1);
  }

  const digest = JSON.parse(fs.readFileSync(digestPath, 'utf-8'));
  const originalThread = digest.social?.x_thread;
  if (!originalThread || !originalThread.main) {
    console.error('No x_thread data in digest');
    process.exit(1);
  }

  const thread = buildThreadWithSuffix(originalThread, testSuffix);

  if (dryRun) {
    console.log('[DRY_RUN] X Thread');
    if (testSuffix) console.log(`Using test suffix: ${testSuffix}`);

    console.log('\n=== MAIN TWEET ===');
    console.log(thread.main);
    console.log(`(${thread.main.length} chars)`);

    (thread.replies || []).forEach((reply, i) => {
      console.log(`\n=== REPLY ${i + 1} ===`);
      console.log(reply);
      console.log(`(${reply.length} chars)`);
    });

    console.log(`\nTotal: 1 main + ${(thread.replies || []).length} replies`);
    return;
  }

  const consumerKey = process.env.X_API_KEY;
  const consumerSecret = process.env.X_API_SECRET;
  const tokenKey = process.env.X_ACCESS_TOKEN;
  const tokenSecret = process.env.X_ACCESS_TOKEN_SECRET;

  if (!consumerKey || !consumerSecret || !tokenKey || !tokenSecret) {
    console.error('Missing X API credentials. Required: X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET');
    process.exit(1);
  }

  const degradeReply403429 = parseBoolEnv('X_DEGRADE_REPLY_403_429', true);

  const apiBase = process.env.X_API_BASE || 'https://api.x.com';
  const url = `${apiBase}/2/tweets`;
  const credentials = { consumerKey, consumerSecret, tokenKey, tokenSecret };

  const posted = [];
  const attempts = { main: 0, replies: [] };

  // Post main tweet
  let mainId = null;
  console.log('Posting main tweet...');
  try {
    const mainResult = await postTweet({ text: thread.main, url, credentials });
    mainId = mainResult.id;
    attempts.main = mainResult.attempts;
    posted.push({ type: 'main', id: mainId });
    console.log(`Main tweet posted: ${mainId}`);
  } catch (error) {
    const err = asXPostError(error);
    attempts.main = err.attempts || attempts.main || 1;
    writeResult(resultPath, {
      success: false,
      failurePhase: 'main',
      error: err.errorDetail,
      errorDetail: err.errorDetail,
      errorCode: err.errorCode,
      httpStatus: err.httpStatus,
      attempts,
      posted,
      rolledBack: 0,
      rollbackDeleted: 0,
      degradedMode: null,
      response: err.response || null,
    });

    console.error(`Main tweet FAILED: ${err.message}`);
    process.exit(1);
  }

  // Post replies as a chain
  let parentId = mainId;
  const replies = thread.replies || [];
  let failedReply = null;

  for (let i = 0; i < replies.length; i++) {
    const delay = 6000 + Math.floor(Math.random() * 4000); // 6-10s
    await sleep(delay);

    console.log(`Posting reply ${i + 1}/${replies.length}...`);
    try {
      const replyResult = await postTweet({ text: replies[i], replyToId: parentId, url, credentials });
      parentId = replyResult.id;
      posted.push({ type: `reply ${i + 1}`, id: parentId });
      attempts.replies.push({ index: i + 1, attempts: replyResult.attempts, success: true });
      console.log(`Reply ${i + 1} posted: ${parentId}`);
    } catch (error) {
      const err = asXPostError(error);
      attempts.replies.push({
        index: i + 1,
        attempts: err.attempts,
        success: false,
        httpStatus: err.httpStatus,
        errorCode: err.errorCode,
      });
      failedReply = {
        index: i + 1,
        error: err.errorDetail,
        errorDetail: err.errorDetail,
        errorCode: err.errorCode,
        httpStatus: err.httpStatus,
        attempts: err.attempts,
        response: err.response || null,
        isDegradable: degradeReply403429 && (err.httpStatus === 403 || err.httpStatus === 429),
      };
      console.error(`Reply ${i + 1} FAILED: ${err.message}`);
      break;
    }
  }

  if (failedReply && failedReply.isDegradable) {
    console.warn(`\nThread degraded to main-only mode: reply ${failedReply.index}/${replies.length} blocked (${failedReply.httpStatus})`);
    writeResult(resultPath, {
      success: true,
      degradedMode: 'main_only',
      failurePhase: 'reply',
      failedAt: failedReply.index,
      totalReplies: replies.length,
      error: failedReply.error,
      errorDetail: failedReply.errorDetail,
      errorCode: failedReply.errorCode,
      httpStatus: failedReply.httpStatus,
      attempts,
      posted,
      rolledBack: 0,
      rollbackDeleted: 0,
      manualAction: 'reply_followup_recommended',
      response: failedReply.response,
    });

    console.log(`\nMain tweet kept. Please add remaining replies manually if needed.`);
    process.exit(0);
  }

  // Non-degradable failure -> rollback
  if (failedReply) {
    console.error(`\nThread incomplete: reply ${failedReply.index}/${replies.length} failed`);
    console.error(`Reason: ${failedReply.error}`);

    const postedIds = posted.map((p) => p.id);
    const rollback = await rollbackThread(postedIds, apiBase, credentials);

    writeResult(resultPath, {
      success: false,
      failurePhase: 'reply',
      failedAt: failedReply.index,
      totalReplies: replies.length,
      error: failedReply.error,
      errorDetail: failedReply.errorDetail,
      errorCode: failedReply.errorCode,
      httpStatus: failedReply.httpStatus,
      attempts,
      posted,
      rolledBack: rollback.attempted,
      rollbackDeleted: rollback.deleted,
      rollbackFailures: rollback.failures,
      degradedMode: null,
      response: failedReply.response,
    });

    console.error('\nExiting with error — thread rolled back. Re-trigger workflow to retry.');
    process.exit(1);
  }

  writeResult(resultPath, {
    success: true,
    degradedMode: null,
    attempts,
    posted,
    totalReplies: replies.length,
  });

  console.log(`\nThread complete: 1 main + ${replies.length} replies (all successful)`);
}

main();

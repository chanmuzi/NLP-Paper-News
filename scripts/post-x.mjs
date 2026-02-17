#!/usr/bin/env node
import fs from 'fs';
import crypto from 'crypto';

function parseArgs(argv) {
  const args = { digest: '', dryRun: false };
  for (let i = 2; i < argv.length; i++) {
    const cur = argv[i];
    if (cur === '--digest') args.digest = argv[++i];
    else if (cur === '--dry-run') args.dryRun = true;
  }
  return args;
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

// --- Tweet posting ---

async function postTweet({ text, replyToId, url, credentials, retries = 3 }) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    // Each attempt needs a fresh OAuth signature (nonce/timestamp)
    const authorization = buildOAuthHeader({ method: 'POST', url, ...credentials });

    const body = { text };
    if (replyToId) {
      body.reply = { in_reply_to_tweet_id: replyToId };
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const resBody = await res.text();
    if (res.ok) {
      const json = JSON.parse(resBody);
      return json.data.id;
    }

    // Log rate limit headers for debugging
    const rlRemaining = res.headers.get('x-rate-limit-remaining');
    const rlReset = res.headers.get('x-rate-limit-reset');
    if (rlRemaining !== null) {
      console.warn(`Rate limit remaining: ${rlRemaining}, reset: ${rlReset}`);
    }

    // Retry on 403 (duplicate/spam detection) or 429 (rate limit)
    if ((res.status === 403 || res.status === 429) && attempt < retries) {
      const wait = attempt * 5000 + Math.floor(Math.random() * 3000); // 5-8s, 10-13s
      console.warn(`Attempt ${attempt} failed (${res.status}), retrying in ${(wait / 1000).toFixed(1)}s...`);
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }

    throw new Error(`X post failed (${res.status}): ${resBody}`);
  }
}

async function main() {
  const { digest: digestPath, dryRun } = parseArgs(process.argv);
  if (!digestPath) {
    console.error('Usage: node scripts/post-x.mjs --digest <digest.json> [--dry-run]');
    process.exit(1);
  }

  const digest = JSON.parse(fs.readFileSync(digestPath, 'utf-8'));
  const thread = digest.social?.x_thread;
  if (!thread || !thread.main) {
    console.error('No x_thread data in digest');
    process.exit(1);
  }

  if (dryRun) {
    console.log('[DRY_RUN] X Thread');
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

  const apiBase = process.env.X_API_BASE || 'https://api.x.com';
  const url = `${apiBase}/2/tweets`;
  const credentials = { consumerKey, consumerSecret, tokenKey, tokenSecret };

  // Post main tweet
  console.log('Posting main tweet...');
  const mainId = await postTweet({ text: thread.main, url, credentials });
  console.log(`Main tweet posted: ${mainId}`);

  // Post replies as a chain
  let parentId = mainId;
  const replies = thread.replies || [];
  for (let i = 0; i < replies.length; i++) {
    // Randomized delay between replies to avoid spam detection
    const delay = 4000 + Math.floor(Math.random() * 3000); // 4-7s
    await new Promise((r) => setTimeout(r, delay));

    console.log(`Posting reply ${i + 1}/${replies.length}...`);
    try {
      parentId = await postTweet({ text: replies[i], replyToId: parentId, url, credentials });
      console.log(`Reply ${i + 1} posted: ${parentId}`);
    } catch (err) {
      console.error(`Reply ${i + 1} failed: ${err.message}`);
      // Continue with remaining replies using last successful parent
    }
  }

  console.log(`Thread complete: 1 main + ${replies.length} replies`);
}

main();

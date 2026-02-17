#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const X_HARD_LIMIT = 280;
const DEFAULT_X_SAFE_LIMIT = 275; // non-premium 계정 안전 여유
const URL_REGEX = /https?:\/\/[^\s)]+/gi;

function parseArgs(argv) {
  const args = { input: '', outDir: 'artifacts', siteBaseUrl: '' };
  for (let i = 2; i < argv.length; i++) {
    const cur = argv[i];
    if (cur === '--input') args.input = argv[++i];
    else if (cur === '--out-dir') args.outDir = argv[++i];
    else if (cur === '--site-base-url') args.siteBaseUrl = argv[++i];
  }
  return args;
}

function toBool(value, defaultValue = false) {
  if (value === undefined || value === null || value === '') return defaultValue;
  return !['0', 'false', 'no', 'off'].includes(String(value).toLowerCase());
}

function getSafeLimit() {
  const raw = Number(process.env.X_SAFE_LIMIT || DEFAULT_X_SAFE_LIMIT);
  if (!Number.isFinite(raw)) return DEFAULT_X_SAFE_LIMIT;
  return Math.max(240, Math.min(X_HARD_LIMIT, Math.floor(raw)));
}

function countXChars(text) {
  const normalized = String(text || '').replace(URL_REGEX, 'x'.repeat(23));
  return [...normalized].length;
}

function isWithinXLimit(text, limit = X_HARD_LIMIT) {
  return countXChars(text) <= limit;
}

function clipToXLimit(text, limit = X_HARD_LIMIT) {
  const src = String(text || '');
  if (isWithinXLimit(src, limit)) return src;

  const chars = [...src];
  const ellipsis = '…';
  while (chars.length > 0) {
    const candidate = chars.join('') + ellipsis;
    if (isWithinXLimit(candidate, limit)) {
      return candidate;
    }
    chars.pop();
  }
  return '';
}

function compactLines(text) {
  return String(text || '')
    .replace(/\r/g, '')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function inferUpdateLabel() {
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const day = dayNames[now.getDay()];
  const dateStr = `${yyyy}.${mm}.${dd} (${day})`;

  let isAdditional = false;
  try {
    const todayKST = `${yyyy}-${mm}-${dd}`;
    const log = execSync(
      `git log --since="${todayKST}T00:00:00+09:00" --until="${todayKST}T23:59:59+09:00" --oneline --grep="^Add " -- data/items.json`,
      { encoding: 'utf-8', timeout: 5000 }
    ).trim();
    if (log && log.split('\n').filter(Boolean).length >= 2) {
      isAdditional = true;
    }
  } catch {
    // ignore
  }

  return {
    dateStr,
    updateLabel: isAdditional ? '추가 업데이트' : '업데이트',
  };
}

function buildDeterministicXThread(items, siteBaseUrl, safeLimit = DEFAULT_X_SAFE_LIMIT) {
  const typeIcon = { paper: '📜', dev: '🧑🏻‍💻', news: '🗞️' };
  const { dateStr, updateLabel } = inferUpdateLabel();

  // --- Main tweet ---
  const header = `📌 ${dateStr} ${updateLabel} (${items.length}건)\n\n`;
  const footer = siteBaseUrl ? `\n\n👉 ${siteBaseUrl}` : '';

  let mainText = '';
  for (let count = Math.min(items.length, 10); count >= 1; count--) {
    const lines = items.slice(0, count).map((item) => `• [${item.org}] ${item.title}`);
    const remaining = items.length - count;
    const moreLine = remaining > 0 ? `\n외 ${remaining}건` : '';
    const candidate = compactLines(header + lines.join('\n') + moreLine + footer);
    if (isWithinXLimit(candidate, safeLimit)) {
      mainText = candidate;
      break;
    }
  }

  if (!mainText) {
    const remainingLine = items.length > 1 ? `\n외 ${items.length - 1}건` : '';
    const staticPart = compactLines(header + remainingLine + footer);
    const firstLinePrefix = '• ';
    const firstLineRaw = `[${items[0]?.org || '-'}] ${items[0]?.title || '-'}`;
    const available = Math.max(24, safeLimit - countXChars(staticPart) - countXChars(firstLinePrefix));
    const firstLine = firstLinePrefix + clipToXLimit(firstLineRaw, available);
    mainText = compactLines(header + firstLine + remainingLine + footer);
    if (!isWithinXLimit(mainText, safeLimit)) {
      mainText = clipToXLimit(mainText, safeLimit);
    }
  }

  // --- Replies ---
  const total = items.length;
  const replies = items.map((item, idx) => {
    const icon = typeIcon[item.type] || '📄';
    const num = `[${idx + 1}/${total}]`;
    const titleLine = `${num} ${icon} [${item.org}] ${item.title}`;
    let urlLine = item.url ? `\n🔗 ${item.url}` : '';

    // 제목만으로도 초과할 수 있으므로 선축약
    let headerPart = titleLine;
    const headerLimit = Math.max(32, safeLimit - countXChars(urlLine));
    if (!isWithinXLimit(headerPart + urlLine, safeLimit)) {
      headerPart = clipToXLimit(headerPart, headerLimit);
    }

    // 여전히 넘치면 링크 제거(메인 링크로 유도)
    if (!isWithinXLimit(headerPart + urlLine, safeLimit)) {
      urlLine = '';
      headerPart = clipToXLimit(headerPart, safeLimit);
    }

    const bulletLines = (item.bullets || []).map((b) => {
      if (b.level >= 2) return `   ↳ ${b.text}`;
      return `• ${b.text}`;
    });

    let bestText = compactLines(headerPart + urlLine);

    for (let count = bulletLines.length; count >= 0; count--) {
      const parts = [headerPart];
      if (count > 0) parts.push(bulletLines.slice(0, count).join('\n'));
      const candidate = compactLines(parts.join('\n') + urlLine);
      if (isWithinXLimit(candidate, safeLimit)) {
        bestText = candidate;
        break;
      }
    }

    if (!isWithinXLimit(bestText, safeLimit)) {
      bestText = clipToXLimit(bestText, safeLimit);
    }

    if (!isWithinXLimit(bestText, X_HARD_LIMIT)) {
      bestText = clipToXLimit(bestText, X_HARD_LIMIT);
    }

    return bestText;
  });

  return { main: mainText, replies };
}

function getModelCandidates() {
  const explicit = String(process.env.OPENAI_MODEL || '').trim();
  if (explicit) return [explicit];
  return ['gpt-4.1-mini', 'gpt-4o-mini'];
}

function parseJsonSafely(raw) {
  const text = String(raw || '').trim();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    // 코드블록/여분 텍스트 fallback
    const first = text.indexOf('{');
    const last = text.lastIndexOf('}');
    if (first >= 0 && last > first) {
      try {
        return JSON.parse(text.slice(first, last + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

function normalizeAiThreadCandidate(candidate, items) {
  const total = items.length;
  const main = compactLines(candidate?.main || '');
  const repliesSrc = Array.isArray(candidate?.replies) ? candidate.replies : [];

  const replies = Array.from({ length: total }, (_, idx) => {
    let text = compactLines(repliesSrc[idx] || '');
    if (!text) return '';

    const requiredPrefix = `[${idx + 1}/${total}]`;
    if (!text.startsWith(requiredPrefix)) {
      text = `${requiredPrefix} ${text}`;
    }
    return text;
  });

  return { main, replies };
}

function validateThreadLengths(thread, limit, items) {
  const violations = [];

  if (!thread?.main) {
    violations.push({ target: 'main', reason: 'empty' });
  } else {
    const c = countXChars(thread.main);
    if (c > limit) violations.push({ target: 'main', reason: 'too_long', chars: c, limit });
  }

  if (!Array.isArray(thread?.replies) || thread.replies.length !== items.length) {
    violations.push({ target: 'replies', reason: 'invalid_length', expected: items.length, actual: thread?.replies?.length || 0 });
    return violations;
  }

  thread.replies.forEach((reply, idx) => {
    if (!reply) {
      violations.push({ target: `reply_${idx + 1}`, reason: 'empty' });
      return;
    }
    const c = countXChars(reply);
    if (c > limit) {
      violations.push({ target: `reply_${idx + 1}`, reason: 'too_long', chars: c, limit });
    }
  });

  return violations;
}

async function callOpenAIThreadOnce({ apiKey, model, items, siteBaseUrl, safeLimit, feedback }) {
  const endpointBase = String(process.env.OPENAI_API_BASE || 'https://api.openai.com/v1').replace(/\/$/, '');
  const endpoint = `${endpointBase}/chat/completions`;

  const payloadForModel = {
    locale: 'ko-KR',
    safe_limit: safeLimit,
    hard_limit: X_HARD_LIMIT,
    rules: {
      main: '핵심 1~2개만 포함하고 과도한 문장 금지',
      replies: '각 reply는 1~2개 bullet 중심으로 간결하게 요약',
      preserve_prefix: '[n/total] prefix must be included for each reply',
      url_counting: 'URL는 길이와 무관하게 23자로 간주',
      no_premium_assumption: '비프리미엄 계정 기준으로 제한 준수',
    },
    site_base_url: siteBaseUrl,
    items: items.map((it, idx) => ({
      index: idx + 1,
      type: it.type,
      org: it.org,
      title: it.title,
      url: it.url || '',
      bullets: (it.bullets || []).map((b) => ({ text: b.text, level: b.level })).slice(0, 4),
    })),
    feedback: feedback || null,
  };

  const schema = {
    name: 'x_thread',
    strict: true,
    schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        main: { type: 'string' },
        replies: {
          type: 'array',
          minItems: items.length,
          maxItems: items.length,
          items: { type: 'string' },
        },
      },
      required: ['main', 'replies'],
    },
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      response_format: { type: 'json_schema', json_schema: schema },
      messages: [
        {
          role: 'system',
          content: '당신은 X 스레드 작성 에디터입니다. 반드시 JSON만 출력하세요. 장황한 문장/광고성 표현 없이 간결하고 명확하게 요약하세요.',
        },
        {
          role: 'user',
          content: JSON.stringify(payloadForModel),
        },
      ],
    }),
  });

  const raw = await res.text();
  if (!res.ok) {
    throw new Error(`OpenAI API error (${res.status}): ${raw.slice(0, 400)}`);
  }

  const parsed = parseJsonSafely((() => {
    try {
      const j = JSON.parse(raw);
      return j?.choices?.[0]?.message?.content || '';
    } catch {
      return raw;
    }
  })());

  if (!parsed) {
    throw new Error('OpenAI 응답 JSON 파싱 실패');
  }

  return parsed;
}

async function buildAiXThread(items, siteBaseUrl, safeLimit, fallbackThread) {
  const apiKey = String(process.env.OPENAI_API_KEY || '').trim();
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY not set');
  }

  const modelCandidates = getModelCandidates();
  let feedback = null;
  let lastError = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    for (const model of modelCandidates) {
      try {
        const rawCandidate = await callOpenAIThreadOnce({
          apiKey,
          model,
          items,
          siteBaseUrl,
          safeLimit,
          feedback,
        });

        const candidate = normalizeAiThreadCandidate(rawCandidate, items);
        const violations = validateThreadLengths(candidate, safeLimit, items);

        if (violations.length === 0) {
          console.log(`ai_copy=success model=${model} attempt=${attempt}`);
          return candidate;
        }

        feedback = { attempt, violations, candidate };
        console.warn(`ai_copy=retry model=${model} attempt=${attempt} violations=${JSON.stringify(violations)}`);
      } catch (err) {
        lastError = err;
        console.warn(`ai_copy=model_failed model=${model} attempt=${attempt} reason=${err.message}`);
      }
    }
  }

  throw new Error(`AI copy generation failed after retries: ${lastError?.message || 'unknown error'}`);
}

async function buildXThread(items, siteBaseUrl) {
  const safeLimit = getSafeLimit();
  const deterministic = buildDeterministicXThread(items, siteBaseUrl, safeLimit);

  const enableAi = toBool(process.env.ENABLE_AI_X_COPY, false);
  if (!enableAi) {
    return { ...deterministic, meta: { generator: 'rule', safe_limit: safeLimit } };
  }

  try {
    const aiThread = await buildAiXThread(items, siteBaseUrl, safeLimit, deterministic);
    return { ...aiThread, meta: { generator: 'openai', safe_limit: safeLimit } };
  } catch (err) {
    console.warn(`ai_copy=fallback_to_rule reason=${err.message}`);
    return { ...deterministic, meta: { generator: 'rule_fallback', safe_limit: safeLimit, fallback_reason: err.message } };
  }
}

async function main() {
  const { input, outDir, siteBaseUrl } = parseArgs(process.argv);
  if (!input) {
    console.error('Usage: node scripts/build-digest.mjs --input <new-items.json> [--out-dir artifacts]');
    process.exit(1);
  }

  const payload = JSON.parse(fs.readFileSync(input, 'utf-8'));
  const items = payload.added_items || [];
  fs.mkdirSync(outDir, { recursive: true });

  const xThreadWithMeta = await buildXThread(items, siteBaseUrl);
  const { meta: xThreadMeta, ...xThread } = xThreadWithMeta;

  const socialDraftMd = [
    `# Social Draft`,
    ``,
    `## X — Main Tweet`,
    '```',
    xThread.main,
    '```',
    ``,
    ...xThread.replies.map((r, i) => [`## X — Reply ${i + 1}`, '```', r, '```', ``]).flat(),
    `## Items`,
    ...items.map((item) => `- [${item.type}] ${item.title} (${item.org}) ${item.url || ''}`),
  ].join('\n');

  const digest = {
    generated_at: new Date().toISOString(),
    added_count: items.length,
    items,
    social: {
      x_thread: xThread,
      x_thread_meta: {
        ...xThreadMeta,
        main_chars: countXChars(xThread.main),
        reply_chars: xThread.replies.map((r) => countXChars(r)),
      },
    },
  };

  fs.writeFileSync(path.join(outDir, 'digest.json'), JSON.stringify(digest, null, 2), 'utf-8');
  fs.writeFileSync(path.join(outDir, 'social-draft.md'), socialDraftMd, 'utf-8');

  console.log(`digest_saved=${path.join(outDir, 'digest.json')}`);
  console.log(`x_copy_generator=${xThreadMeta?.generator || 'rule'}`);
}

main().catch((err) => {
  console.error(`build-digest failed: ${err.message}`);
  process.exit(1);
});

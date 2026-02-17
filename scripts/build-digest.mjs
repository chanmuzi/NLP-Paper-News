#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const X_HARD_LIMIT = 280;
const DEFAULT_X_SAFE_LIMIT = 275;
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
    if (isWithinXLimit(candidate, limit)) return candidate;
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
    if (log && log.split('\n').filter(Boolean).length >= 2) isAdditional = true;
  } catch {
    // ignore
  }

  return {
    dateStr,
    updateLabel: isAdditional ? '추가 업데이트' : '업데이트',
  };
}

// ----------------------------
// Rule-based fallback generator
// ----------------------------
function buildDeterministicXThread(items, siteBaseUrl, safeLimit = DEFAULT_X_SAFE_LIMIT) {
  const typeIcon = { paper: '📜', dev: '🧑🏻‍💻', news: '🗞️' };
  const { dateStr, updateLabel } = inferUpdateLabel();

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
    if (!isWithinXLimit(mainText, safeLimit)) mainText = clipToXLimit(mainText, safeLimit);
  }

  const total = items.length;
  const replies = items.map((item, idx) => {
    const icon = typeIcon[item.type] || '📄';
    const num = `[${idx + 1}/${total}]`;
    const titleLine = `${num} ${icon} [${item.org}] ${item.title}`;
    let urlLine = item.url ? `\n🔗 ${item.url}` : '';

    let headerPart = titleLine;
    const headerLimit = Math.max(32, safeLimit - countXChars(urlLine));
    if (!isWithinXLimit(headerPart + urlLine, safeLimit)) {
      headerPart = clipToXLimit(headerPart, headerLimit);
    }

    if (!isWithinXLimit(headerPart + urlLine, safeLimit)) {
      urlLine = '';
      headerPart = clipToXLimit(headerPart, safeLimit);
    }

    const bulletLines = (item.bullets || []).map((b) => (b.level >= 2 ? `   ↳ ${b.text}` : `• ${b.text}`));
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

    if (!isWithinXLimit(bestText, safeLimit)) bestText = clipToXLimit(bestText, safeLimit);
    if (!isWithinXLimit(bestText, X_HARD_LIMIT)) bestText = clipToXLimit(bestText, X_HARD_LIMIT);
    return bestText;
  });

  return { main: mainText, replies };
}

// ----------------------------
// OpenAI-based generator
// ----------------------------
function parseJsonSafely(raw) {
  const text = String(raw || '').trim();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
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

function getModelCandidates(kind = 'main') {
  // 우선순위: kind 전용 > 공통 > 기본
  const explicitKind = String(process.env[kind === 'main' ? 'OPENAI_MODEL_MAIN' : 'OPENAI_MODEL_REPLY'] || '').trim();
  const explicitCommon = String(process.env.OPENAI_MODEL || '').trim();
  const userPreferred = explicitKind || explicitCommon;

  const defaults = kind === 'main'
    ? ['gpt-4.1-mini', 'gpt-4o-mini']
    : ['gpt-4.1-mini', 'gpt-4o-mini'];

  return [...new Set([userPreferred, ...defaults].filter(Boolean))];
}

function makeCommonPromptContext(items, siteBaseUrl, safeLimit) {
  const { dateStr, updateLabel } = inferUpdateLabel();
  return {
    locale: 'ko-KR',
    style_ref: '간결한 정보형 스레드(헤더 + 핵심 불릿), 과장/광고 문구 금지',
    posting_context: {
      date_str: dateStr,
      update_label: updateLabel,
      total_items: items.length,
      site_base_url: siteBaseUrl,
    },
    constraints: {
      hard_limit: X_HARD_LIMIT,
      safe_limit: safeLimit,
      url_counting_rule: 'All URLs count as 23 chars',
      no_premium_assumption: true,
    },
    items: items.map((it, idx) => ({
      index: idx + 1,
      type: it.type,
      org: it.org,
      title: it.title,
      url: it.url || '',
      bullets: (it.bullets || []).slice(0, 4).map((b) => ({ text: b.text, level: b.level })),
    })),
  };
}

async function callOpenAIJsonSchema({ apiKey, model, schemaName, schema, systemPrompt, userPayload, debugCollector }) {
  const endpointBase = String(process.env.OPENAI_API_BASE || 'https://api.openai.com/v1').replace(/\/$/, '');
  const endpoint = `${endpointBase}/chat/completions`;

  const requestBody = {
    model,
    temperature: 0.35,
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: schemaName,
        strict: true,
        schema,
      },
    },
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: JSON.stringify(userPayload) },
    ],
  };

  if (debugCollector) {
    debugCollector.requests.push({ schemaName, model, systemPrompt, userPayload });
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const raw = await res.text();
  if (!res.ok) {
    if (debugCollector) debugCollector.responses.push({ schemaName, model, status: res.status, raw });
    throw new Error(`OpenAI API error (${res.status}): ${raw.slice(0, 600)}`);
  }

  let content = '';
  try {
    const j = JSON.parse(raw);
    content = j?.choices?.[0]?.message?.content || '';
  } catch {
    content = raw;
  }

  const parsed = parseJsonSafely(content);
  if (debugCollector) debugCollector.responses.push({ schemaName, model, status: res.status, content, parsed });
  if (!parsed) throw new Error(`OpenAI JSON parse failed (${schemaName})`);
  return parsed;
}

function validateMainText(main, safeLimit) {
  const violations = [];
  if (!main || !String(main).trim()) {
    violations.push({ target: 'main', reason: 'empty' });
    return violations;
  }
  const c = countXChars(main);
  if (c > safeLimit) violations.push({ target: 'main', reason: 'too_long', chars: c, safeLimit });
  if (!String(main).includes('📌')) violations.push({ target: 'main', reason: 'missing_header_emoji' });
  return violations;
}

function normalizeReplies(replies, total, items) {
  const result = Array.from({ length: total }, (_, idx) => {
    const raw = compactLines(replies?.[idx] || '');
    if (!raw) return '';
    const prefix = `[${idx + 1}/${total}]`;
    const body = raw.startsWith(prefix) ? raw : `${prefix} ${raw}`;

    // reply가 너무 길면 링크 제거 전단계
    return body;
  });

  // 빈 reply는 최소 골격으로라도 채우기 (validation에서 다시 걸러짐)
  return result.map((r, idx) => r || `[${idx + 1}/${total}] [${items[idx]?.org || '-'}] ${items[idx]?.title || '-'}`);
}

function validateReplies(replies, safeLimit, items) {
  const violations = [];
  if (!Array.isArray(replies) || replies.length !== items.length) {
    violations.push({ target: 'replies', reason: 'invalid_length', expected: items.length, actual: replies?.length || 0 });
    return violations;
  }

  replies.forEach((reply, idx) => {
    const text = String(reply || '');
    if (!text.trim()) {
      violations.push({ target: `reply_${idx + 1}`, reason: 'empty' });
      return;
    }
    const c = countXChars(text);
    if (c > safeLimit) violations.push({ target: `reply_${idx + 1}`, reason: 'too_long', chars: c, safeLimit });

    const expectedPrefix = `[${idx + 1}/${items.length}]`;
    if (!text.startsWith(expectedPrefix)) {
      violations.push({ target: `reply_${idx + 1}`, reason: 'missing_prefix', expectedPrefix });
    }
  });

  return violations;
}

function postProcessReplies(replies, items, safeLimit) {
  return replies.map((reply, idx) => {
    let text = compactLines(reply);

    // 제목만으로도 길면 강제 축약
    if (!isWithinXLimit(text, safeLimit)) {
      const lines = text.split('\n');
      const header = lines[0] || '';
      const rest = lines.slice(1).filter((l) => !l.startsWith('🔗 '));
      const minimized = compactLines([header, ...rest].join('\n'));
      text = isWithinXLimit(minimized, safeLimit) ? minimized : clipToXLimit(minimized, safeLimit);
    }

    if (!isWithinXLimit(text, X_HARD_LIMIT)) text = clipToXLimit(text, X_HARD_LIMIT);

    const expectedPrefix = `[${idx + 1}/${items.length}]`;
    if (!text.startsWith(expectedPrefix)) text = `${expectedPrefix} ${text}`;
    return text;
  });
}

async function buildAiXThread(items, siteBaseUrl, safeLimit, debugCollector = null) {
  const apiKey = String(process.env.OPENAI_API_KEY || '').trim();
  if (!apiKey) throw new Error('OPENAI_API_KEY not set');

  const context = makeCommonPromptContext(items, siteBaseUrl, safeLimit);

  // 1) Main post generation (separate call)
  const mainSchema = {
    type: 'object',
    additionalProperties: false,
    properties: { main: { type: 'string' } },
    required: ['main'],
  };

  const mainSystemPrompt = [
    'You are an expert Korean X post editor for concise research-news curation.',
    'Output must be JSON only and strictly follow schema.',
    'Main post requirements:',
    '- Start with a pin-style header line (e.g., "📌 YYYY.MM.DD (...) 업데이트 (N건)").',
    '- Include only top 1~2 items as bullets.',
    '- End with site link line if provided (👉 ...).',
    '- Keep tone factual, compact, non-promotional.',
    '- Must satisfy char limits (safe_limit preferred, hard_limit mandatory).',
  ].join('\n');

  let main = '';
  let mainFeedback = null;
  let mainModelUsed = null;

  for (let attempt = 1; attempt <= 3 && !main; attempt++) {
    for (const model of getModelCandidates('main')) {
      try {
        const mainPayload = {
          ...context,
          task: 'generate_main_post_only',
          feedback: mainFeedback,
        };

        const parsed = await callOpenAIJsonSchema({
          apiKey,
          model,
          schemaName: 'x_main_post',
          schema: mainSchema,
          systemPrompt: mainSystemPrompt,
          userPayload: mainPayload,
          debugCollector,
        });

        const candidate = compactLines(parsed.main || '');
        const violations = validateMainText(candidate, safeLimit);
        if (violations.length === 0) {
          main = candidate;
          mainModelUsed = model;
          break;
        }

        mainFeedback = { attempt, violations, candidate };
      } catch (err) {
        mainFeedback = { attempt, error: err.message };
      }
    }
  }

  if (!main) {
    throw new Error('AI main post generation failed after retries');
  }

  // 2) Replies generation (separate call)
  const repliesSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      replies: {
        type: 'array',
        minItems: items.length,
        maxItems: items.length,
        items: { type: 'string' },
      },
    },
    required: ['replies'],
  };

  const replySystemPrompt = [
    'You are an expert Korean X thread reply writer for AI/NLP research digests.',
    'Output must be JSON only and strictly follow schema.',
    'Reply requirements for each item:',
    '- Start with exact prefix: [n/total] ...',
    '- One title line + max 1~2 핵심 bullet lines.',
    '- Keep very concise and factual; no filler.',
    '- If URL exists, include at most one final link line (🔗 ...).',
    '- Must satisfy safe_limit and hard_limit.',
  ].join('\n');

  let replies = null;
  let replyFeedback = null;
  let replyModelUsed = null;

  for (let attempt = 1; attempt <= 3 && !replies; attempt++) {
    for (const model of getModelCandidates('reply')) {
      try {
        const replyPayload = {
          ...context,
          task: 'generate_all_replies_only',
          formatting: {
            prefix_example: '[1/3] 📜 [Org] Title',
            bullet_example: '• 핵심 요약',
            nested_example: '   ↳ 보충 정보',
          },
          feedback: replyFeedback,
        };

        const parsed = await callOpenAIJsonSchema({
          apiKey,
          model,
          schemaName: 'x_reply_list',
          schema: repliesSchema,
          systemPrompt: replySystemPrompt,
          userPayload: replyPayload,
          debugCollector,
        });

        const normalized = normalizeReplies(parsed.replies, items.length, items);
        const processed = postProcessReplies(normalized, items, safeLimit);
        const violations = validateReplies(processed, safeLimit, items);

        if (violations.length === 0) {
          replies = processed;
          replyModelUsed = model;
          break;
        }

        replyFeedback = { attempt, violations, candidate: processed };
      } catch (err) {
        replyFeedback = { attempt, error: err.message };
      }
    }
  }

  if (!replies) {
    throw new Error('AI replies generation failed after retries');
  }

  return {
    main,
    replies,
    meta: {
      generator: 'openai',
      safe_limit: safeLimit,
      main_model: mainModelUsed,
      reply_model: replyModelUsed,
    },
  };
}

async function buildXThread(items, siteBaseUrl, outDir) {
  const safeLimit = getSafeLimit();
  const deterministic = buildDeterministicXThread(items, siteBaseUrl, safeLimit);

  const enableAi = toBool(process.env.ENABLE_AI_X_COPY, false);
  const enableDebug = toBool(process.env.OPENAI_X_DEBUG, false);
  const debugCollector = enableDebug ? { requests: [], responses: [] } : null;

  if (!enableAi) {
    return {
      ...deterministic,
      meta: {
        generator: 'rule',
        safe_limit: safeLimit,
      },
      debugCollector,
    };
  }

  try {
    const aiThread = await buildAiXThread(items, siteBaseUrl, safeLimit, debugCollector);
    return { ...aiThread, debugCollector };
  } catch (err) {
    console.warn(`ai_copy=fallback_to_rule reason=${err.message}`);
    return {
      ...deterministic,
      meta: {
        generator: 'rule_fallback',
        safe_limit: safeLimit,
        fallback_reason: err.message,
      },
      debugCollector,
    };
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

  const result = await buildXThread(items, siteBaseUrl, outDir);
  const { main, replies, meta: xThreadMeta, debugCollector } = result;

  const xThread = { main, replies };

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

  if (debugCollector) {
    fs.writeFileSync(path.join(outDir, 'openai-x-copy-debug.json'), JSON.stringify(debugCollector, null, 2), 'utf-8');
  }

  console.log(`digest_saved=${path.join(outDir, 'digest.json')}`);
  console.log(`x_copy_generator=${xThreadMeta?.generator || 'rule'}`);
}

main().catch((err) => {
  console.error(`build-digest failed: ${err.message}`);
  process.exit(1);
});

#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const X_HARD_LIMIT = 280;
const DEFAULT_X_SAFE_LIMIT = 260; // 비프리미엄/가중치 보수 대응
const DEFAULT_GEN_MARGIN = 16;
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
  return Math.max(220, Math.min(X_HARD_LIMIT, Math.floor(raw)));
}

function getGenerationLimit(safeLimit) {
  const raw = Number(process.env.X_GEN_MARGIN || DEFAULT_GEN_MARGIN);
  const margin = Number.isFinite(raw) ? Math.max(0, Math.floor(raw)) : DEFAULT_GEN_MARGIN;
  return Math.max(210, Math.min(safeLimit, safeLimit - margin));
}

function isWideChar(ch) {
  const cp = ch.codePointAt(0);
  if (!cp) return false;
  return (
    (cp >= 0x1100 && cp <= 0x11FF) ||
    (cp >= 0x2E80 && cp <= 0xA4CF) ||
    (cp >= 0xAC00 && cp <= 0xD7A3) ||
    (cp >= 0xF900 && cp <= 0xFAFF) ||
    (cp >= 0xFE10 && cp <= 0xFE6F) ||
    (cp >= 0xFF01 && cp <= 0xFF60) ||
    (cp >= 0xFFE0 && cp <= 0xFFE6)
  );
}

function isEmoji(ch) {
  try {
    return /\p{Extended_Pictographic}/u.test(ch);
  } catch {
    return false;
  }
}

function countXChars(text) {
  const normalized = String(text || '').replace(URL_REGEX, 'x'.repeat(23));
  let total = 0;
  for (const ch of [...normalized]) {
    if (isEmoji(ch) || isWideChar(ch)) total += 2;
    else total += 1;
  }
  return total;
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

function cleanInline(text) {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .replace(/^[•\-\d.)\s]+/, '')
    .replace(/["“”]/g, '')
    .trim();
}

function limitPlain(text, maxLen) {
  const src = cleanInline(text);
  if (!src || src.length <= maxLen) return src;
  return `${src.slice(0, Math.max(1, maxLen - 1)).trim()}…`;
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
  } catch {}

  return { dateStr, updateLabel: isAdditional ? '추가 업데이트' : '업데이트' };
}

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
      } catch {}
    }
    return null;
  }
}

function getModelCandidates(kind = 'main') {
  const kindModel = String(process.env[kind === 'main' ? 'OPENAI_MODEL_MAIN' : 'OPENAI_MODEL_REPLY'] || '').trim();
  const common = String(process.env.OPENAI_MODEL || '').trim();
  const defaults = ['gpt-5.2', 'gpt-4.1-mini', 'gpt-4o-mini'];
  return [...new Set([kindModel, common, ...defaults].filter(Boolean))];
}

async function callOpenAIJsonSchema({ apiKey, model, schemaName, schema, systemPrompt, userPayload, debug }) {
  const endpointBase = String(process.env.OPENAI_API_BASE || 'https://api.openai.com/v1').replace(/\/$/, '');
  const endpoint = `${endpointBase}/chat/completions`;

  if (debug) debug.requests.push({ schemaName, model, systemPrompt, userPayload });

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.15,
      response_format: {
        type: 'json_schema',
        json_schema: { name: schemaName, strict: true, schema },
      },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: JSON.stringify(userPayload) },
      ],
    }),
  });

  const raw = await res.text();
  if (!res.ok) {
    if (debug) debug.responses.push({ schemaName, model, status: res.status, raw });
    throw new Error(`OpenAI API error (${res.status}): ${raw.slice(0, 500)}`);
  }

  let content = '';
  try {
    const j = JSON.parse(raw);
    content = j?.choices?.[0]?.message?.content || '';
  } catch {
    content = raw;
  }

  const parsed = parseJsonSafely(content);
  if (debug) debug.responses.push({ schemaName, model, status: res.status, content, parsed });
  if (!parsed) throw new Error(`OpenAI JSON parse failed (${schemaName})`);
  return parsed;
}

function getIcon(type) {
  const icons = { paper: '📜', dev: '🧑🏻‍💻', news: '🗞️' };
  return icons[type] || '📄';
}

function renderMainText({ dateStr, updateLabel, totalCount, highlights, siteBaseUrl }) {
  const lines = [];
  lines.push(`📌 ${dateStr} ${updateLabel} (${totalCount}건)`);
  lines.push('');

  const top = (highlights || []).slice(0, 2);
  for (const h of top) {
    const org = limitPlain(h.org, 24) || 'Unknown';
    const title = limitPlain(h.titleShort, 56) || '업데이트';
    const summary = limitPlain(h.summary, 48) || '핵심 업데이트';
    lines.push(`• [${org}] ${title}: ${summary}`);
  }

  const rest = Math.max(0, totalCount - top.length);
  if (rest > 0) lines.push(`외 ${rest}건`);
  if (siteBaseUrl) {
    lines.push('');
    lines.push(`👉 ${siteBaseUrl}`);
  }

  return compactLines(lines.join('\n'));
}

function forceMainWithinLimit({ text, limit, dateStr, updateLabel, totalCount, highlights, siteBaseUrl }) {
  let out = compactLines(text);
  if (isWithinXLimit(out, limit)) return out;

  const oneHighlight = (highlights || []).slice(0, 1);
  out = renderMainText({ dateStr, updateLabel, totalCount, highlights: oneHighlight, siteBaseUrl });
  if (isWithinXLimit(out, limit)) return out;

  const stripped = oneHighlight.map((h) => ({ ...h, summary: '' }));
  out = renderMainText({ dateStr, updateLabel, totalCount, highlights: stripped, siteBaseUrl });
  if (isWithinXLimit(out, limit)) return out;

  if (siteBaseUrl) {
    out = compactLines(`📌 ${dateStr} ${updateLabel} (${totalCount}건)\n외 ${totalCount}건\n\n👉 ${siteBaseUrl}`);
  } else {
    out = compactLines(`📌 ${dateStr} ${updateLabel} (${totalCount}건)\n외 ${totalCount}건`);
  }

  return isWithinXLimit(out, limit) ? out : clipToXLimit(out, limit);
}

function renderReplyText({ index, total, icon, org, titleShort, points, url }) {
  const lines = [];
  const orgLabel = limitPlain(org, 24) || 'Unknown';
  const title = limitPlain(titleShort, 52) || '요약';
  lines.push(`[${index}/${total}] ${icon || '📄'} [${orgLabel}] ${title}`);

  const cleanedPoints = (points || []).map((p) => cleanInline(p)).filter(Boolean).slice(0, 2);
  for (const p of cleanedPoints) lines.push(`• ${limitPlain(p, 64)}`);

  if (url) lines.push(`🔗 ${url}`);
  return compactLines(lines.join('\n'));
}

function forceReplyWithinLimit({ text, limit, item, index, total, fallbackPoints }) {
  let out = compactLines(text);
  if (isWithinXLimit(out, limit)) return out;

  out = renderReplyText({
    index,
    total,
    icon: getIcon(item.type),
    org: item.org,
    titleShort: item.title,
    points: [fallbackPoints[0] || '핵심 업데이트'],
    url: item.url || '',
  });
  if (isWithinXLimit(out, limit)) return out;

  out = renderReplyText({
    index,
    total,
    icon: getIcon(item.type),
    org: item.org,
    titleShort: limitPlain(item.title, 30),
    points: [limitPlain(fallbackPoints[0] || '핵심 업데이트', 30)],
    url: item.url || '',
  });
  if (isWithinXLimit(out, limit)) return out;

  return clipToXLimit(out, limit);
}

async function rewriteToLimit({ apiKey, model, kind, original, limit, contextPayload, debug }) {
  const schema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      text: { type: 'string' },
    },
    required: ['text'],
  };

  const prompt = [
    `당신은 X ${kind} 텍스트 길이 최적화기입니다.`,
    `의미/사실을 유지한 채 ${limit}자(가중치 계산) 이하로 줄이세요.`,
    '과장/광고/해시태그 금지, 핵심만 남기세요.',
    '반드시 JSON만 출력하세요.',
  ].join('\n');

  const parsed = await callOpenAIJsonSchema({
    apiKey,
    model,
    schemaName: `x_${kind}_rewrite`,
    schema,
    systemPrompt: prompt,
    userPayload: { original, limit, context: contextPayload },
    debug,
  });

  return compactLines(String(parsed.text || ''));
}

async function fitTextToLimit({ apiKey, model, kind, text, limit, contextPayload, debug }) {
  let out = compactLines(text);
  if (isWithinXLimit(out, limit)) return out;

  for (let i = 0; i < 2; i++) {
    try {
      const rewritten = await rewriteToLimit({ apiKey, model, kind, original: out, limit, contextPayload, debug });
      if (!rewritten) continue;
      out = compactLines(rewritten);
      if (isWithinXLimit(out, limit)) return out;
    } catch {}
  }

  return clipToXLimit(out, limit);
}

function buildDeterministicXThread(items, siteBaseUrl, safeLimit) {
  const { dateStr, updateLabel } = inferUpdateLabel();

  const highlights = items.slice(0, 2).map((it) => ({
    org: it.org,
    titleShort: it.title,
    summary: cleanInline(it?.bullets?.[0]?.text || '핵심 업데이트'),
  }));

  const main = forceMainWithinLimit({
    text: renderMainText({ dateStr, updateLabel, totalCount: items.length, highlights, siteBaseUrl }),
    limit: safeLimit,
    dateStr,
    updateLabel,
    totalCount: items.length,
    highlights,
    siteBaseUrl,
  });

  const replies = items.map((item, idx) => {
    const points = (item.bullets || []).slice(0, 2).map((b) => cleanInline(b.text)).filter(Boolean);
    const rendered = renderReplyText({
      index: idx + 1,
      total: items.length,
      icon: getIcon(item.type),
      org: item.org,
      titleShort: item.title,
      points,
      url: item.url || '',
    });
    return forceReplyWithinLimit({
      text: rendered,
      limit: safeLimit,
      item,
      index: idx + 1,
      total: items.length,
      fallbackPoints: points,
    });
  });

  return { main, replies };
}

function buildAiContext(items, generationLimit, siteBaseUrl) {
  return {
    locale: 'ko-KR',
    char_policy: {
      hard_limit: X_HARD_LIMIT,
      generation_limit: generationLimit,
      url_weight: 23,
      note: '링크는 가중치 23으로 계산. 이모지/한글은 가중치 증가 가능.',
    },
    style_policy: {
      tone: ['간결', '사실 중심', '과장 금지', '광고 문구 금지'],
      summary_rule: '항목별 핵심은 1~2개만',
      main_example: [
        '📌 YYYY.MM.DD (요일) 업데이트 (N건)',
        '• [Org] 제목: 핵심 요약',
        '• [Org] 제목: 핵심 요약',
        '외 N건',
        '👉 https://chanmuzi.github.io/NLP-Paper-News/',
      ],
      reply_example: [
        '[i/N] [아이콘] [Org] 제목(짧게)',
        '• 핵심 1',
        '• 핵심 2',
        '🔗 URL',
      ],
    },
    site_base_url: siteBaseUrl,
    items: items.map((it, idx) => ({
      index: idx + 1,
      type: it.type,
      org: it.org,
      title: it.title,
      url: it.url || '',
      bullets: (it.bullets || []).slice(0, 5).map((b) => ({ text: cleanInline(b.text), level: b.level })),
    })),
  };
}

async function buildAiXThread(items, siteBaseUrl, safeLimit, debug) {
  const apiKey = String(process.env.OPENAI_API_KEY || '').trim();
  if (!apiKey) throw new Error('OPENAI_API_KEY not set');
  const generationLimit = getGenerationLimit(safeLimit);

  const mainModels = getModelCandidates('main');
  const replyModels = getModelCandidates('reply');
  const context = buildAiContext(items, generationLimit, siteBaseUrl);
  const { dateStr, updateLabel } = inferUpdateLabel();

  const mainSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      highlights: {
        type: 'array',
        minItems: 1,
        maxItems: Math.min(2, Math.max(1, items.length)),
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            index: { type: 'integer', minimum: 1, maximum: Math.max(1, items.length) },
            org: { type: 'string' },
            title_short: { type: 'string' },
            summary: { type: 'string' },
          },
          required: ['index', 'org', 'title_short', 'summary'],
        },
      },
    },
    required: ['highlights'],
  };

  const mainPrompt = [
    '당신은 한국어 X 기술 뉴스 에디터입니다.',
    '목표: 메인 포스트용 하이라이트 1~2개를 JSON으로 생성합니다.',
    '중요: 원문 재배치가 아니라 핵심 추출 요약이어야 합니다.',
    '형식 일관성을 위해 아래 스타일을 따릅니다:',
    '📌 YYYY.MM.DD (요일) 업데이트 (N건)',
    '• [Org] 제목: 핵심 요약',
    '• [Org] 제목: 핵심 요약',
    '외 N건',
    '👉 https://chanmuzi.github.io/NLP-Paper-News/',
    '제약:',
    '- 한국어만 사용',
    '- 과장/홍보/감탄/해시태그 금지',
    '- 각 요약은 사실 1~2포인트로 압축',
    '- title_short는 짧게, summary는 더 짧게',
    '반드시 schema JSON만 출력합니다.',
  ].join('\n');

  let mainPlan = null;
  let mainModelUsed = null;
  let mainAttempts = 0;

  for (const model of mainModels) {
    mainAttempts += 1;
    try {
      const parsed = await callOpenAIJsonSchema({
        apiKey,
        model,
        schemaName: 'x_main_plan_v2',
        schema: mainSchema,
        systemPrompt: mainPrompt,
        userPayload: context,
        debug,
      });
      mainPlan = parsed;
      mainModelUsed = model;
      break;
    } catch {
      // try next model
    }
  }

  if (!mainPlan) throw new Error('AI main plan generation failed');

  const mainHighlights = (mainPlan.highlights || []).slice(0, 2).map((h) => ({
    org: h.org,
    titleShort: h.title_short,
    summary: h.summary,
  }));

  let mainText = renderMainText({
    dateStr,
    updateLabel,
    totalCount: items.length,
    highlights: mainHighlights,
    siteBaseUrl,
  });

  if (!isWithinXLimit(mainText, generationLimit)) {
    mainText = await fitTextToLimit({
      apiKey,
      model: mainModelUsed,
      kind: 'main',
      text: mainText,
      limit: generationLimit,
      contextPayload: { dateStr, updateLabel, totalCount: items.length, highlights: mainHighlights },
      debug,
    });
  }

  mainText = forceMainWithinLimit({
    text: mainText,
    limit: safeLimit,
    dateStr,
    updateLabel,
    totalCount: items.length,
    highlights: mainHighlights,
    siteBaseUrl,
  });

  const replySchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      replies: {
        type: 'array',
        minItems: items.length,
        maxItems: items.length,
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            index: { type: 'integer', minimum: 1, maximum: Math.max(1, items.length) },
            icon: { type: 'string' },
            org: { type: 'string' },
            title_short: { type: 'string' },
            key_points: {
              type: 'array',
              minItems: 1,
              maxItems: 2,
              items: { type: 'string' },
            },
          },
          required: ['index', 'icon', 'org', 'title_short', 'key_points'],
        },
      },
    },
    required: ['replies'],
  };

  const replyPrompt = [
    '당신은 한국어 X 스레드 작성기입니다.',
    '목표: 각 아이템별 reply용 요약 필드를 JSON으로 생성합니다.',
    '원문 재배치 금지. 핵심만 1~2포인트로 압축합니다.',
    '형식 참조:',
    '[i/N] [아이콘] [Org] 제목(짧게)',
    '• 핵심 1',
    '• 핵심 2',
    '🔗 URL',
    '제약:',
    '- 한국어만 사용',
    '- 과장/홍보/해시태그 금지',
    '- title_short는 매우 짧게',
    '- key_points는 각 1문장으로 간결하게',
    '반드시 schema JSON만 출력합니다.',
  ].join('\n');

  let replyPlan = null;
  let replyModelUsed = null;
  let replyAttempts = 0;

  for (const model of replyModels) {
    replyAttempts += 1;
    try {
      const parsed = await callOpenAIJsonSchema({
        apiKey,
        model,
        schemaName: 'x_reply_plan_v2',
        schema: replySchema,
        systemPrompt: replyPrompt,
        userPayload: context,
        debug,
      });
      replyPlan = parsed;
      replyModelUsed = model;
      break;
    } catch {
      // try next model
    }
  }

  if (!replyPlan) throw new Error('AI reply plan generation failed');

  const replyMap = new Map();
  for (const r of replyPlan.replies || []) replyMap.set(Number(r.index), r);

  const overLimitRewrites = [];
  const replies = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const idx = i + 1;
    const src = replyMap.get(idx) || {};
    const fallbackPoints = (item.bullets || []).slice(0, 2).map((b) => cleanInline(b.text)).filter(Boolean);

    let replyText = renderReplyText({
      index: idx,
      total: items.length,
      icon: src.icon || getIcon(item.type),
      org: src.org || item.org,
      titleShort: src.title_short || item.title,
      points: Array.isArray(src.key_points) && src.key_points.length > 0 ? src.key_points : fallbackPoints,
      url: item.url || '',
    });

    if (!isWithinXLimit(replyText, generationLimit)) {
      const rewritten = await fitTextToLimit({
        apiKey,
        model: replyModelUsed,
        kind: 'reply',
        text: replyText,
        limit: generationLimit,
        contextPayload: { item, index: idx, total: items.length },
        debug,
      });
      if (rewritten !== replyText) overLimitRewrites.push(idx);
      replyText = rewritten;
    }

    replyText = forceReplyWithinLimit({
      text: replyText,
      limit: safeLimit,
      item,
      index: idx,
      total: items.length,
      fallbackPoints,
    });

    replies.push(replyText);
  }

  return {
    main: mainText,
    replies,
    meta: {
      generator: 'openai',
      safe_limit: safeLimit,
      generation_limit: generationLimit,
      main_model: mainModelUsed,
      reply_model: replyModelUsed,
      main_model_candidates: mainModels,
      reply_model_candidates: replyModels,
      attempts: {
        main_model_trials: mainAttempts,
        reply_model_trials: replyAttempts,
        rewritten_reply_indexes: overLimitRewrites,
      },
    },
  };
}

async function buildXThread(items, siteBaseUrl) {
  const safeLimit = getSafeLimit();
  const fallback = buildDeterministicXThread(items, siteBaseUrl, safeLimit);
  const enableAi = toBool(process.env.ENABLE_AI_X_COPY, false);
  const debug = toBool(process.env.OPENAI_X_DEBUG, false) ? { requests: [], responses: [] } : null;

  if (!enableAi) return { ...fallback, meta: { generator: 'rule', safe_limit: safeLimit }, debug };

  try {
    const ai = await buildAiXThread(items, siteBaseUrl, safeLimit, debug);
    return { ...ai, debug };
  } catch (err) {
    console.warn(`ai_copy=fallback_to_rule reason=${err.message}`);
    return {
      ...fallback,
      meta: { generator: 'rule_fallback', safe_limit: safeLimit, fallback_reason: err.message },
      debug,
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

  const { main, replies, meta, debug } = await buildXThread(items, siteBaseUrl);
  const xThread = { main, replies };

  const socialDraftMd = [
    '# Social Draft',
    '',
    '## X — Main Tweet',
    '```',
    xThread.main,
    '```',
    '',
    ...xThread.replies.map((r, i) => [`## X — Reply ${i + 1}`, '```', r, '```', '']).flat(),
    '## Items',
    ...items.map((item) => `- [${item.type}] ${item.title} (${item.org}) ${item.url || ''}`),
  ].join('\n');

  const digest = {
    generated_at: new Date().toISOString(),
    added_count: items.length,
    items,
    social: {
      x_thread: xThread,
      x_thread_meta: {
        ...meta,
        hard_limit: X_HARD_LIMIT,
        main_chars: countXChars(xThread.main),
        reply_chars: xThread.replies.map((r) => countXChars(r)),
      },
    },
  };

  fs.writeFileSync(path.join(outDir, 'digest.json'), JSON.stringify(digest, null, 2), 'utf-8');
  fs.writeFileSync(path.join(outDir, 'social-draft.md'), socialDraftMd, 'utf-8');
  if (debug) fs.writeFileSync(path.join(outDir, 'openai-x-copy-debug.json'), JSON.stringify(debug, null, 2), 'utf-8');

  console.log(`digest_saved=${path.join(outDir, 'digest.json')}`);
  console.log(`x_copy_generator=${meta?.generator || 'rule'}`);
}

main().catch((err) => {
  console.error(`build-digest failed: ${err.message}`);
  process.exit(1);
});

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

function sanitizeReplySummary(text) {
  let out = cleanInline(text);
  out = out.replace(/^\[\d+\/\d+\]\s*/g, '');
  out = out.replace(/^([📜📄🗞️📰🧑🏻‍💻🛠️]\s*)+/g, '');
  out = out.replace(/^(\[[^\]]+\]\s*)+/g, '');
  out = out.replace(/^[-–—:：]\s*/g, '');
  out = out.replace(/🔗\s*https?:\/\/\S+/gi, '');
  out = out.replace(/\s+/g, ' ').trim();
  return out;
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

function renderMainText({ dateStr, updateLabel, totalCount, entries, siteBaseUrl, visibleCount, titleMaxLen }) {
  const lines = [];
  lines.push(`📌 ${dateStr} ${updateLabel} (${totalCount}건)`);
  lines.push('');

  const picked = (entries || []).slice(0, visibleCount);
  for (const e of picked) {
    const title = limitPlain(e.titleShort, titleMaxLen) || '업데이트';
    lines.push(`• ${title}`);
  }

  const rest = Math.max(0, totalCount - picked.length);
  if (rest > 0) lines.push(`외 ${rest}건`);
  if (siteBaseUrl) {
    lines.push('');
    lines.push(`👉 ${siteBaseUrl}`);
  }

  return compactLines(lines.join('\n'));
}

function forceMainWithinLimit({ limit, dateStr, updateLabel, totalCount, entries, siteBaseUrl }) {
  const titleLens = [56, 46, 38, 32, 26, 20];
  for (const titleMaxLen of titleLens) {
    for (let visibleCount = totalCount; visibleCount >= 1; visibleCount--) {
      const candidate = renderMainText({
        dateStr,
        updateLabel,
        totalCount,
        entries,
        siteBaseUrl,
        visibleCount,
        titleMaxLen,
      });
      if (isWithinXLimit(candidate, limit)) return candidate;
    }
  }

  const minimal = siteBaseUrl
    ? `📌 ${dateStr} ${updateLabel} (${totalCount}건)\n외 ${totalCount}건\n\n👉 ${siteBaseUrl}`
    : `📌 ${dateStr} ${updateLabel} (${totalCount}건)\n외 ${totalCount}건`;
  return isWithinXLimit(minimal, limit) ? compactLines(minimal) : clipToXLimit(minimal, limit);
}

function renderReplyText({ index, total, titleShort, summaryLine, url, titleMaxLen = 46, summaryMaxLen = 96 }) {
  const title = limitPlain(titleShort, titleMaxLen) || '요약';
  const summary = limitPlain(sanitizeReplySummary(summaryLine || ''), summaryMaxLen) || '핵심 업데이트입니다.';
  const line1 = `[${index}/${total}] ${title}`;
  // 카드 preview 유도를 위해 URL은 라벨 없이 마지막 줄에만 추가
  return url ? compactLines(`${line1}\n${summary}\n${url}`) : compactLines(`${line1}\n${summary}`);
}

function forceReplyWithinLimit({ limit, item, index, total, titleShort, summaryLine, baseReply }) {
  if (isWithinXLimit(baseReply, limit)) return baseReply;

  const fallbackSummary = sanitizeReplySummary(summaryLine || item?.bullets?.[0]?.text || '핵심 업데이트');
  const titleCandidates = [titleShort, item.title, limitPlain(item.title, 34), limitPlain(item.title, 24)].filter(Boolean);
  const summaryLens = [90, 72, 56, 42, 30];

  for (const title of titleCandidates) {
    for (const summaryMaxLen of summaryLens) {
      const candidate = renderReplyText({
        index,
        total,
        titleShort: title,
        summaryLine: fallbackSummary,
        url: item.url || '',
        titleMaxLen: title.length > 24 ? 34 : 24,
        summaryMaxLen,
      });
      if (isWithinXLimit(candidate, limit)) return candidate;
    }
  }

  return clipToXLimit(baseReply, limit);
}

function buildDeterministicXThread(items, siteBaseUrl, safeLimit) {
  const { dateStr, updateLabel } = inferUpdateLabel();

  const entries = items.map((it) => ({
    titleShort: it.title,
  }));

  const main = forceMainWithinLimit({
    limit: safeLimit,
    dateStr,
    updateLabel,
    totalCount: items.length,
    entries,
    siteBaseUrl,
  });

  const replies = items.map((item, idx) => {
    const summaryLine = cleanInline(item?.bullets?.[0]?.text || '핵심 업데이트');
    const titleShort = item.title;
    const baseReply = renderReplyText({
      index: idx + 1,
      total: items.length,
      titleShort,
      summaryLine,
      url: item.url || '',
    });
    return forceReplyWithinLimit({
      limit: safeLimit,
      item,
      index: idx + 1,
      total: items.length,
      titleShort,
      summaryLine,
      baseReply,
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
      main_format: [
        '📌 YYYY.MM.DD (요일) 업데이트 (N건)',
        '• 짧은 제목',
        '• 짧은 제목',
        '외 N건',
        '👉 https://chanmuzi.github.io/NLP-Paper-News/',
      ],
      reply_format: [
        '[i/N] 짧은 제목',
        '설명 문장 1개(줄글)',
        'URL(카드 preview용, 라벨/이모지 없이)',
      ],
      no_bullet_in_reply: true,
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
      entries: {
        type: 'array',
        minItems: Math.max(1, Math.min(2, items.length)),
        maxItems: items.length,
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            index: { type: 'integer', minimum: 1, maximum: Math.max(1, items.length) },
            title_short: { type: 'string' },
          },
          required: ['index', 'title_short'],
        },
      },
    },
    required: ['entries'],
  };

  const mainPrompt = [
    '당신은 한국어 X 기술 뉴스 에디터입니다.',
    '메인 포스트용 항목 나열을 JSON으로 생성하세요.',
    '중요: 제목만 간결하게 나열하고 설명 문장은 넣지 마세요.',
    '형식 기준:',
    '📌 YYYY.MM.DD (요일) 업데이트 (N건)',
    '• 짧은 제목',
    '• 짧은 제목',
    '외 N건',
    '👉 https://chanmuzi.github.io/NLP-Paper-News/',
    '제약:',
    '- 한국어 중심(고유명사는 원문 유지 가능)',
    '- 과장/광고/해시태그 금지',
    '- title_short는 매우 짧고 정보만 남길 것',
    '- 가능한 많은 항목을 entries에 넣되, 각 title_short를 압축할 것',
    '반드시 schema JSON만 출력합니다.',
  ].join('\n');

  let mainPlan = null;
  let mainModelUsed = null;
  let mainModelTrials = 0;
  let mainGenerationTurns = 0;

  for (const model of mainModels) {
    mainModelTrials += 1;
    let feedback = null;
    for (let turn = 1; turn <= 3; turn++) {
      try {
        const parsed = await callOpenAIJsonSchema({
          apiKey,
          model,
          schemaName: 'x_main_plan_v4',
          schema: mainSchema,
          systemPrompt: mainPrompt,
          userPayload: { ...context, feedback },
          debug,
        });
        mainGenerationTurns += 1;

        const entries = (parsed.entries || []).map((e) => ({ titleShort: e.title_short }));
        const candidateMain = forceMainWithinLimit({
          limit: generationLimit,
          dateStr,
          updateLabel,
          totalCount: items.length,
          entries,
          siteBaseUrl,
        });

        if (isWithinXLimit(candidateMain, generationLimit)) {
          mainPlan = parsed;
          mainModelUsed = model;
          break;
        }

        feedback = {
          reason: 'too_long',
          measured_chars: countXChars(candidateMain),
          target_limit: generationLimit,
          instruction: 'entries 수를 유지하되 title_short를 더 짧게 압축하세요.',
        };
      } catch (err) {
        feedback = { reason: 'generation_error', detail: err.message };
      }
    }
    if (mainPlan) break;
  }

  if (!mainPlan) throw new Error('AI main plan generation failed');

  const mainEntries = (mainPlan.entries || []).map((e) => ({ titleShort: e.title_short }));
  const mainText = forceMainWithinLimit({
    limit: safeLimit,
    dateStr,
    updateLabel,
    totalCount: items.length,
    entries: mainEntries,
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
            title_short: { type: 'string' },
            summary_line: { type: 'string' },
          },
          required: ['index', 'title_short', 'summary_line'],
        },
      },
    },
    required: ['replies'],
  };

  const replyPrompt = [
    '당신은 한국어 X 스레드 작성기입니다.',
    '각 아이템에 대해 reply용 텍스트를 JSON으로 생성하세요.',
    '중요: bullet(•) 형식을 절대 사용하지 마세요.',
    '형식 기준:',
    '[i/N] 짧은 제목',
    '설명 문장 1개(줄글)',
    'URL(카드 preview용, 라벨/이모지 없이)',
    '제약:',
    '- 한국어 중심(고유명사는 원문 유지 가능)',
    '- 과장/홍보/해시태그 금지',
    '- title_short는 짧게',
    '- summary_line은 깔끔한 문장 1개',
    '- summary_line에 번호/아이콘/기관/URL을 넣지 말 것(링크는 시스템이 별도 부착)',
    '- 줄글 형식, bullet 금지',
    '반드시 schema JSON만 출력합니다.',
  ].join('\n');

  let replyPlan = null;
  let replyModelUsed = null;
  let replyModelTrials = 0;
  let replyGenerationTurns = 0;
  const overLimitReplyIndexes = [];

  for (const model of replyModels) {
    replyModelTrials += 1;
    let feedback = null;

    for (let turn = 1; turn <= 3; turn++) {
      try {
        const parsed = await callOpenAIJsonSchema({
          apiKey,
          model,
          schemaName: 'x_reply_plan_v4',
          schema: replySchema,
          systemPrompt: replyPrompt,
          userPayload: { ...context, feedback },
          debug,
        });
        replyGenerationTurns += 1;

        const tempMap = new Map();
        for (const r of parsed.replies || []) tempMap.set(Number(r.index), r);

        const tooLong = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const idx = i + 1;
          const src = tempMap.get(idx) || {};
          const candidate = renderReplyText({
            index: idx,
            total: items.length,
            titleShort: src.title_short || item.title,
            summaryLine: src.summary_line || cleanInline(item?.bullets?.[0]?.text || '핵심 업데이트'),
            url: item.url || '',
          });
          const chars = countXChars(candidate);
          if (chars > generationLimit) tooLong.push({ index: idx, chars });
        }

        if (tooLong.length === 0) {
          replyPlan = parsed;
          replyModelUsed = model;
          break;
        }

        overLimitReplyIndexes.push(...tooLong.map((x) => x.index));
        feedback = {
          reason: 'too_long',
          target_limit: generationLimit,
          too_long_items: tooLong,
          instruction: 'too_long_items의 title_short/summary_line을 더 짧게 압축하세요.',
        };
      } catch (err) {
        feedback = { reason: 'generation_error', detail: err.message };
      }
    }

    if (replyPlan) break;
  }

  if (!replyPlan) throw new Error('AI reply plan generation failed');

  const replyMap = new Map();
  for (const r of replyPlan.replies || []) replyMap.set(Number(r.index), r);

  const replies = items.map((item, i) => {
    const idx = i + 1;
    const src = replyMap.get(idx) || {};
    const titleShort = src.title_short || item.title;
    const summaryLine = src.summary_line || cleanInline(item?.bullets?.[0]?.text || '핵심 업데이트');

    const baseReply = renderReplyText({
      index: idx,
      total: items.length,
      titleShort,
      summaryLine,
      url: item.url || '',
    });

    return forceReplyWithinLimit({
      limit: safeLimit,
      item,
      index: idx,
      total: items.length,
      titleShort,
      summaryLine,
      baseReply,
    });
  });

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
        main_model_trials: mainModelTrials,
        reply_model_trials: replyModelTrials,
        main_generation_turns: mainGenerationTurns,
        reply_generation_turns: replyGenerationTurns,
        over_limit_reply_indexes: [...new Set(overLimitReplyIndexes)],
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

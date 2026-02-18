#!/usr/bin/env node
import fs from 'fs';

const X_HARD_LIMIT = 280;
const URL_REGEX = /https?:\/\/[^\s)]+/gi;

function parseArgs(argv) {
  const args = { thread: '', instruction: '', out: 'artifacts/rewrite-result.json' };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--thread') args.thread = argv[++i];
    else if (argv[i] === '--instruction') args.instruction = argv[++i];
    else if (argv[i] === '--out') args.out = argv[++i];
  }
  return args;
}

function countXChars(text) {
  const normalized = String(text || '').replace(URL_REGEX, 'x'.repeat(23));
  const codepoint = Array.from(normalized).length;
  try {
    const seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    return Math.max(codepoint, Array.from(seg.segment(normalized)).length);
  } catch {
    return codepoint;
  }
}

function parseJsonSafely(text) {
  try {
    return JSON.parse(text);
  } catch {
    const first = text.indexOf('{');
    const last = text.lastIndexOf('}');
    if (first >= 0 && last > first) {
      try { return JSON.parse(text.slice(first, last + 1)); } catch {}
    }
    return null;
  }
}

function getModelCandidates() {
  const primary = String(process.env.OPENAI_MODEL_REPLY || '').trim();
  const common = String(process.env.OPENAI_MODEL || '').trim();
  const defaults = ['gpt-5.2', 'gpt-4.1-mini', 'gpt-4o-mini'];
  return [...new Set([primary, common, ...defaults].filter(Boolean))];
}

async function callOpenAI({ apiKey, model, payload }) {
  const endpointBase = String(process.env.OPENAI_API_BASE || 'https://api.openai.com/v1').replace(/\/$/, '');
  const res = await fetch(`${endpointBase}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'rewrite_x_thread_v1',
          strict: true,
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              main: { type: 'string' },
              replies: { type: 'array', items: { type: 'string' } },
            },
            required: ['main', 'replies'],
          },
        },
      },
      messages: [
        {
          role: 'system',
          content: [
            'You are an editor for Korean X threads.',
            'Apply the user instruction to main/replies.',
            `Every post must stay within ${X_HARD_LIMIT} weighted characters.`,
            'Do not invent facts. Keep links if present.',
            'Return JSON only.',
          ].join('\n')
        },
        { role: 'user', content: JSON.stringify(payload) },
      ]
    }),
  });

  const raw = await res.text();
  if (!res.ok) throw new Error(`OpenAI API error (${res.status}): ${raw.slice(0, 400)}`);
  const body = parseJsonSafely(raw);
  const content = body?.choices?.[0]?.message?.content || raw;
  const parsed = parseJsonSafely(content);
  if (!parsed) throw new Error('OpenAI JSON parse failed');
  return parsed;
}

function validateThread(thread) {
  const failures = [];
  const mainUsed = countXChars(thread.main || '');
  if (mainUsed > X_HARD_LIMIT) failures.push({ phase: 'main', used: mainUsed });
  (thread.replies || []).forEach((r, i) => {
    const used = countXChars(r || '');
    if (used > X_HARD_LIMIT) failures.push({ phase: `reply_${i + 1}`, used });
  });
  return failures;
}

function parseTarget(instruction, totalReplies) {
  const raw = String(instruction || '');
  const lowered = raw.toLowerCase();
  if (/\[target:\s*main only\]/.test(lowered)) {
    return { type: 'main_only', updatedIndices: [] };
  }
  if (/\[target:\s*all replies\]/.test(lowered)) {
    return { type: 'all_replies', updatedIndices: Array.from({ length: totalReplies }, (_, i) => i + 1) };
  }
  const single = lowered.match(/\[target:\s*reply\s+(\d+)\s+only/);
  if (single) {
    const idx = Number(single[1]);
    if (Number.isFinite(idx) && idx >= 1 && idx <= totalReplies) {
      return { type: 'single_reply', updatedIndices: [idx] };
    }
  }
  return { type: 'unknown', updatedIndices: [] };
}

function applyScopedUpdate({ original, candidate, target }) {
  const originalMain = String(original.main || '');
  const originalReplies = Array.isArray(original.replies) ? original.replies.map((x) => String(x || '')) : [];
  const candidateMain = String(candidate.main || '');
  const candidateReplies = Array.isArray(candidate.replies) ? candidate.replies.map((x) => String(x || '')) : [];

  if (target.type === 'main_only') {
    return {
      main: candidateMain || originalMain,
      replies: originalReplies,
      updatedIndices: [],
    };
  }

  if (target.type === 'all_replies') {
    const replies = originalReplies.map((prev, i) => String(candidateReplies[i] || prev));
    return {
      main: originalMain,
      replies,
      updatedIndices: target.updatedIndices,
    };
  }

  if (target.type === 'single_reply' && target.updatedIndices.length === 1) {
    const targetIdx = target.updatedIndices[0] - 1;
    const replies = originalReplies.map((prev, i) => (i === targetIdx ? String(candidateReplies[i] || prev) : prev));
    return {
      main: originalMain,
      replies,
      updatedIndices: target.updatedIndices,
    };
  }

  return {
    main: candidateMain || originalMain,
    replies: originalReplies.map((prev, i) => String(candidateReplies[i] || prev)),
    updatedIndices: [],
  };
}

async function main() {
  const { thread: threadPath, instruction, out } = parseArgs(process.argv);
  if (!threadPath || !instruction) {
    console.error('Usage: node scripts/rewrite-x-thread.mjs --thread <json> --instruction <text> [--out artifacts/rewrite-result.json]');
    process.exit(1);
  }

  const apiKey = String(process.env.OPENAI_API_KEY || '').trim();
  if (!apiKey) {
    console.error('OPENAI_API_KEY not set');
    process.exit(1);
  }

  const original = JSON.parse(fs.readFileSync(threadPath, 'utf8'));
  const target = parseTarget(instruction, Array.isArray(original.replies) ? original.replies.length : 0);
  const models = getModelCandidates();

  let selectedModel = '';
  let rewritten = null;
  let errorMessage = '';

  for (const model of models) {
    try {
      const candidate = await callOpenAI({
        apiKey,
        model,
        payload: {
          instruction,
          original_thread: {
            main: String(original.main || ''),
            replies: Array.isArray(original.replies) ? original.replies.map((x) => String(x || '')) : [],
          },
        },
      });

      const normalizedRaw = {
        main: String(candidate.main || ''),
        replies: Array.isArray(candidate.replies) ? candidate.replies.map((x) => String(x || '')) : [],
      };
      const normalizedApplied = applyScopedUpdate({ original, candidate: normalizedRaw, target });
      const normalized = {
        main: normalizedApplied.main,
        replies: normalizedApplied.replies,
      };

      const failures = validateThread(normalized);
      if (failures.length === 0) {
        selectedModel = model;
        rewritten = { ...normalized, updatedIndices: normalizedApplied.updatedIndices };
        break;
      }
      errorMessage = `length_over_limit:${JSON.stringify(failures)}`;
    } catch (err) {
      errorMessage = err.message || String(err);
    }
  }

  const result = rewritten
    ? {
        success: true,
        thread: { main: rewritten.main, replies: rewritten.replies },
        meta: {
          model: selectedModel,
          instruction,
          hard_limit: X_HARD_LIMIT,
          target: target.type,
          updated_indices: rewritten.updatedIndices || [],
        },
      }
    : {
        success: false,
        error: errorMessage || 'rewrite_failed',
        thread: {
          main: String(original.main || ''),
          replies: Array.isArray(original.replies) ? original.replies.map((x) => String(x || '')) : [],
        },
        meta: {
          model: null,
          instruction,
          hard_limit: X_HARD_LIMIT,
          target: target.type,
          updated_indices: [],
        },
      };

  fs.mkdirSync(out.split('/').slice(0, -1).join('/') || '.', { recursive: true });
  fs.writeFileSync(out, JSON.stringify(result, null, 2), 'utf8');
  console.log(`rewrite_saved=${out}`);
}

main().catch((err) => {
  console.error(`rewrite failed: ${err.message}`);
  process.exit(1);
});

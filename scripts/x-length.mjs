#!/usr/bin/env node
// CLI for validating X tweet lengths against the same rules build-digest/post-x use.
//
// Usage:
//   node scripts/x-length.mjs --text "단일 텍스트"
//   node scripts/x-length.mjs --json '{"main":"...","replies":["...","..."]}'
//   node scripts/x-length.mjs --json-file path/to/thread.json
//   echo "어떤 트윗" | node scripts/x-length.mjs --stdin
//
// Output: JSON to stdout. Exit code 0 on success, 1 on validation failure.

import fs from 'fs';
import {
  X_HARD_LIMIT,
  DEFAULT_SAFE_LIMIT,
  countXChars,
  countXCharsDetail,
  getSafeLimit,
} from './x-text-utils.mjs';

function parseArgs(argv) {
  const args = {
    text: null,
    json: null,
    jsonFile: null,
    stdin: false,
    limit: X_HARD_LIMIT,
    safeLimit: getSafeLimit(),
  };
  for (let i = 2; i < argv.length; i++) {
    const cur = argv[i];
    if (cur === '--text') args.text = argv[++i];
    else if (cur === '--json') args.json = argv[++i];
    else if (cur === '--json-file') args.jsonFile = argv[++i];
    else if (cur === '--stdin') args.stdin = true;
    else if (cur === '--limit') args.limit = Number(argv[++i]) || X_HARD_LIMIT;
    else if (cur === '--safe-limit') args.safeLimit = Number(argv[++i]) || DEFAULT_SAFE_LIMIT;
  }
  return args;
}

function readStdin() {
  return new Promise((resolve) => {
    let buf = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => (buf += chunk));
    process.stdin.on('end', () => resolve(buf));
  });
}

function inspect(text, limit, safeLimit) {
  const detail = countXCharsDetail(text);
  return {
    text,
    used: detail.used,
    codepoint: detail.codepoint,
    grapheme: detail.grapheme,
    limit,
    safeLimit,
    withinLimit: detail.used <= limit,
    withinSafeLimit: detail.used <= safeLimit,
  };
}

function inspectThread(thread, limit, safeLimit) {
  const main = inspect(String(thread.main || ''), limit, safeLimit);
  const replies = (Array.isArray(thread.replies) ? thread.replies : []).map((r) =>
    inspect(String(r || ''), limit, safeLimit)
  );
  const ok = main.withinLimit && replies.every((r) => r.withinLimit);
  const safe = main.withinSafeLimit && replies.every((r) => r.withinSafeLimit);
  return { main, replies, ok, withinSafeLimit: safe, limit, safeLimit };
}

async function resolveInput(args) {
  if (args.text != null) return { mode: 'single', value: args.text };
  if (args.json) return { mode: 'thread', value: JSON.parse(args.json) };
  if (args.jsonFile) return { mode: 'thread', value: JSON.parse(fs.readFileSync(args.jsonFile, 'utf8')) };
  if (args.stdin) return { mode: 'single', value: (await readStdin()).replace(/\n+$/, '') };
  return null;
}

async function main() {
  const args = parseArgs(process.argv);
  const input = await resolveInput(args);
  if (!input) {
    console.error('Usage:');
    console.error('  node scripts/x-length.mjs --text "..."');
    console.error('  node scripts/x-length.mjs --json \'{"main":"...","replies":["..."]}\'');
    console.error('  node scripts/x-length.mjs --json-file path/to/thread.json');
    console.error('  ... | node scripts/x-length.mjs --stdin');
    process.exit(2);
  }

  if (input.mode === 'single') {
    const out = inspect(input.value, args.limit, args.safeLimit);
    process.stdout.write(JSON.stringify(out, null, 2) + '\n');
    process.exit(out.withinLimit ? 0 : 1);
  }

  const out = inspectThread(input.value, args.limit, args.safeLimit);
  process.stdout.write(JSON.stringify(out, null, 2) + '\n');
  process.exit(out.ok ? 0 : 1);
}

main().catch((err) => {
  console.error(`x-length failed: ${err.message}`);
  process.exit(2);
});

// expose for unit testing
export { inspect, inspectThread };

#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function parseArgs(argv) {
  const args = { before: '', after: '', output: '' };
  for (let i = 2; i < argv.length; i++) {
    const cur = argv[i];
    if (cur === '--before') args.before = argv[++i];
    else if (cur === '--after') args.after = argv[++i];
    else if (cur === '--output') args.output = argv[++i];
  }
  return args;
}

function readJson(filePath, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return fallback;
  }
}

function main() {
  const { before, after, output } = parseArgs(process.argv);
  if (!after || !output) {
    console.error('Usage: node scripts/extract-new-items.mjs --before <path> --after <path> --output <path>');
    process.exit(1);
  }

  const beforeJson = before ? readJson(before, { items: [] }) : { items: [] };
  const afterJson = readJson(after);
  if (!afterJson?.items || !Array.isArray(afterJson.items)) {
    console.error(`Invalid after file: ${after}`);
    process.exit(1);
  }

  const beforeIds = new Set((beforeJson?.items || []).map((item) => item.id));
  const addedItems = afterJson.items.filter((item) => item?.id && !beforeIds.has(item.id));

  const result = {
    generated_at: new Date().toISOString(),
    base_count: (beforeJson?.items || []).length,
    head_count: afterJson.items.length,
    added_count: addedItems.length,
    added_items: addedItems,
  };

  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`added_count=${addedItems.length}`);
  console.log(`saved=${output}`);
}

main();

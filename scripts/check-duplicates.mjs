#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseMarkdownFragment } from './lib/markdown-fragment.mjs';
import { findDuplicateCandidates } from './lib/check-duplicates.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_DATA_PATH = path.join(__dirname, '..', 'data', 'items.json');

function usage() {
  return `
Usage:
  node scripts/check-duplicates.mjs --urls <url1> [url2 ...]
  node scripts/check-duplicates.mjs --from-markdown <path>
  node scripts/check-duplicates.mjs --pairs-json '[{"org":"OpenAI","title":"..."}]'
  node scripts/check-duplicates.mjs --pairs-file <path>

Options:
  --data <path>       items.json path (default: data/items.json)
`;
}

function parseArgs(argv) {
  const args = {
    dataPath: DEFAULT_DATA_PATH,
    urls: [],
    pairsJson: '',
    pairsFile: '',
    fromMarkdown: '',
  };

  for (let i = 2; i < argv.length; i++) {
    const cur = argv[i];
    if (cur === '--data') {
      args.dataPath = argv[++i];
    } else if (cur === '--urls') {
      while (i + 1 < argv.length && !argv[i + 1].startsWith('--')) {
        args.urls.push(argv[++i]);
      }
    } else if (cur === '--pairs-json') {
      args.pairsJson = argv[++i];
    } else if (cur === '--pairs-file') {
      args.pairsFile = argv[++i];
    } else if (cur === '--from-markdown') {
      args.fromMarkdown = argv[++i];
    } else if (cur === '--help' || cur === '-h') {
      args.help = true;
    } else {
      throw new Error(`Unknown argument: ${cur}`);
    }
  }

  return args;
}

function readJson(filePath) {
  const absPath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  return JSON.parse(fs.readFileSync(absPath, 'utf-8'));
}

function resolveCandidates(args) {
  const candidates = args.urls.map((url) => ({ url }));

  if (args.pairsJson) {
    const parsed = JSON.parse(args.pairsJson);
    candidates.push(...(Array.isArray(parsed) ? parsed : [parsed]));
  }

  if (args.pairsFile) {
    const parsed = readJson(args.pairsFile);
    candidates.push(...(Array.isArray(parsed) ? parsed : [parsed]));
  }

  if (args.fromMarkdown) {
    const absPath = path.isAbsolute(args.fromMarkdown)
      ? args.fromMarkdown
      : path.resolve(process.cwd(), args.fromMarkdown);
    const content = fs.readFileSync(absPath, 'utf-8');
    candidates.push(...parseMarkdownFragment(content));
  }

  return candidates;
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    process.stdout.write(usage());
    process.exit(0);
  }

  const candidates = resolveCandidates(args);
  if (candidates.length === 0) {
    process.stderr.write(usage());
    process.exit(2);
  }

  const data = readJson(args.dataPath);
  const items = Array.isArray(data.items) ? data.items : [];
  const duplicates = findDuplicateCandidates(candidates, items);

  const out = {
    ok: duplicates.length === 0,
    checked: {
      candidates: candidates.length,
      existingItems: items.length,
    },
    duplicateCount: duplicates.length,
    duplicates,
  };

  process.stdout.write(JSON.stringify(out, null, 2) + '\n');
  process.exit(out.ok ? 0 : 1);
}

try {
  main();
} catch (err) {
  process.stderr.write(`check-duplicates failed: ${err.message}\n`);
  process.exit(2);
}

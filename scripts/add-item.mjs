#!/usr/bin/env node
/**
 * CLI script to add new items to items.json
 * 
 * Usage:
 *   node add-item.mjs --type paper --org "OpenAI" --title "New Research" --url "https://..." --bullets "bullet 1" "bullet 2"
 *   node add-item.mjs --interactive
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import { generateId } from './lib/item-id.mjs';
import { parseMarkdownFragment } from './lib/markdown-fragment.mjs';
import { findDuplicateCandidates } from './lib/check-duplicates.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, '..', 'data', 'items.json');

function getCurrentWeekDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const week = Math.ceil(day / 7);
  return {
    date: `${year}-${month.toString().padStart(2, '0')}-W${week.toString().padStart(2, '0')}`,
    year: year.toString(),
    month: month.toString(),
    week: week.toString(),
  };
}

function loadData() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

function computeStats(items) {
  const stats = { total: items.length, paper: 0, dev: 0, news: 0 };
  for (const it of items) {
    if (it.type && Object.prototype.hasOwnProperty.call(stats, it.type)) {
      stats[it.type]++;
    }
  }
  return stats;
}

function saveData(data) {
  data.last_updated = new Date().toISOString();
  data.total_items = data.items.length;
  data.stats = computeStats(data.items);
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

function describeInput(input) {
  const name = [input.org, input.title].filter(Boolean).join(' — ');
  return name || input.url || '(unknown item)';
}

function printDuplicateReport(duplicates, { prefix = '❌ Duplicate item(s) found' } = {}) {
  console.error(prefix);
  for (const duplicate of duplicates) {
    console.error(`   - input: ${describeInput(duplicate.input)}`);
    for (const matchInfo of duplicate.matches) {
      const match = matchInfo.match;
      const detail = matchInfo.reason === 'url'
        ? `url: ${matchInfo.normalizedUrl}`
        : `id: ${matchInfo.id}`;
      console.error(`     ${detail}`);
      console.error(`     existing: [${match.date || 'unknown date'}] ${match.title} (id: ${match.id})`);
    }
  }
}

function addItem(item, { allowDuplicates = false, skipDuplicates = false } = {}) {
  const data = loadData();
  const dateInfo = getCurrentWeekDate();
  
  const newItem = {
    id: item.id || generateId(item.org, item.title),
    date: item.date || dateInfo.date,
    year: item.year || dateInfo.year,
    month: item.month || dateInfo.month,
    week: item.week || dateInfo.week,
    type: item.type || 'paper',
    org: item.org,
    title: item.title,
    url: item.url || '',
    bullets: item.bullets || [],
    tags: item.tags || [],
  };

  const duplicates = findDuplicateCandidates([newItem], data.items);
  if (duplicates.length > 0 && !allowDuplicates) {
    if (skipDuplicates) {
      printDuplicateReport(duplicates, { prefix: '⚠️ Duplicate item skipped' });
      return null;
    }

    printDuplicateReport(duplicates);
    console.error('Use --skip-duplicates to skip duplicate inputs, or --allow-duplicates to force add.');
    process.exit(1);
  }
  
  // Add to beginning (newest first)
  data.items.unshift(newItem);
  saveData(data);
  
  console.log(`✅ Added: [${newItem.type}] ${newItem.title}`);
  console.log(`   ID: ${newItem.id}`);
  console.log(`   Total items: ${data.total_items}`);
  
  return newItem;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {
    type: 'paper',
    org: '',
    title: '',
    url: '',
    bullets: [],
    tags: [],
    interactive: false,
    fromMarkdown: '',
    dryRun: false,
    allowDuplicates: false,
    skipDuplicates: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--interactive' || arg === '-i') {
      result.interactive = true;
    } else if (arg === '--type' || arg === '-t') {
      result.type = args[++i];
    } else if (arg === '--org' || arg === '-o') {
      result.org = args[++i];
    } else if (arg === '--title') {
      result.title = args[++i];
    } else if (arg === '--url' || arg === '-u') {
      result.url = args[++i];
    } else if (arg === '--bullets' || arg === '-b') {
      // Collect all following non-flag arguments as bullets
      while (i + 1 < args.length && !args[i + 1].startsWith('--')) {
        result.bullets.push({ text: args[++i], level: 1 });
      }
    } else if (arg === '--tags') {
      while (i + 1 < args.length && !args[i + 1].startsWith('--')) {
        result.tags.push(args[++i]);
      }
    } else if (arg === '--from-markdown') {
      result.fromMarkdown = args[++i];
    } else if (arg === '--dry-run') {
      result.dryRun = true;
    } else if (arg === '--allow-duplicates') {
      result.allowDuplicates = true;
    } else if (arg === '--skip-duplicates') {
      result.skipDuplicates = true;
    }
  }

  return result;
}

function addItemsFromMarkdown(filePath, { dryRun = false, allowDuplicates = false, skipDuplicates = false } = {}) {
  const absPath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  const content = fs.readFileSync(absPath, 'utf-8');
  const parsed = parseMarkdownFragment(content);
  if (parsed.length === 0) {
    console.error(`❌ No items parsed from ${absPath}`);
    process.exit(1);
  }

  const data = loadData();
  const duplicates = findDuplicateCandidates(parsed, data.items);

  if (dryRun) {
    console.log(`🧪 [dry-run] Parsed ${parsed.length} item(s) from ${absPath}:`);
    for (const it of parsed) {
      console.log(`   - [${it.type}] ${it.org} — ${it.title}`);
      console.log(`       url: ${it.url || '(none)'}`);
      console.log(`       bullets: ${it.bullets.length}`);
    }
    if (duplicates.length > 0) {
      printDuplicateReport(duplicates, { prefix: '⚠️ [dry-run] Duplicate item(s) found' });
    }
    return parsed;
  }

  let itemsToAdd = parsed;
  if (duplicates.length > 0 && !allowDuplicates) {
    if (skipDuplicates) {
      printDuplicateReport(duplicates, { prefix: '⚠️ Duplicate item(s) skipped' });
      const duplicateIndexes = new Set(duplicates.map((duplicate) => duplicate.index));
      itemsToAdd = parsed.filter((_, index) => !duplicateIndexes.has(index));
    } else {
      printDuplicateReport(duplicates);
      console.error('Nothing added. Use --skip-duplicates to add only non-duplicates, or --allow-duplicates to force add.');
      process.exit(1);
    }
  }

  if (itemsToAdd.length === 0) {
    console.log('ℹ️ No items added.');
    return [];
  }

  const dateInfo = getCurrentWeekDate();
  const added = [];
  for (const it of itemsToAdd) {
    const newItem = {
      id: generateId(it.org, it.title),
      date: dateInfo.date,
      year: dateInfo.year,
      month: dateInfo.month,
      week: dateInfo.week,
      type: it.type,
      org: it.org,
      title: it.title,
      url: it.url || '',
      bullets: it.bullets || [],
      tags: it.tags || [],
    };
    data.items.unshift(newItem);
    added.push(newItem);
    console.log(`✅ Added: [${newItem.type}] ${newItem.title}`);
    console.log(`   ID: ${newItem.id}`);
  }
  saveData(data);
  console.log(`📊 Total items: ${data.total_items}`);
  return added;
}

async function interactiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  const question = (q) => new Promise((resolve) => rl.question(q, resolve));
  
  console.log('\n📝 새 항목 추가\n');
  
  const type = await question('타입 (paper/dev/news) [paper]: ') || 'paper';
  const org = await question('기관: ');
  const title = await question('제목: ');
  const url = await question('URL: ');
  
  console.log('설명 (빈 줄 입력시 종료):');
  const bullets = [];
  let bullet;
  while ((bullet = await question('  - ')) !== '') {
    bullets.push({ text: bullet, level: 1 });
  }
  
  const tagsInput = await question('태그 (쉼표 구분): ');
  const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()) : [];
  
  rl.close();
  
  if (!org || !title) {
    console.error('❌ 기관과 제목은 필수입니다.');
    process.exit(1);
  }
  
  return addItem({ type, org, title, url, bullets, tags });
}

// Main
const args = parseArgs();

if (args.interactive) {
  interactiveMode();
} else if (args.fromMarkdown) {
  addItemsFromMarkdown(args.fromMarkdown, {
    dryRun: args.dryRun,
    allowDuplicates: args.allowDuplicates,
    skipDuplicates: args.skipDuplicates,
  });
} else if (args.org && args.title) {
  addItem(args, {
    allowDuplicates: args.allowDuplicates,
    skipDuplicates: args.skipDuplicates,
  });
} else {
  console.log(`
📚 NLP Paper News - Item Adder

Usage:
  node add-item.mjs --org "OpenAI" --title "New Paper" --url "https://..." --bullets "point 1" "point 2"
  node add-item.mjs --from-markdown ~/claude-summarize/2026-04-23_1530.md
  node add-item.mjs --interactive

Options:
  --type, -t          paper | dev | news (default: paper)
  --org, -o           Organization name (required)
  --title             Title (required)
  --url, -u           URL
  --bullets, -b       Bullet points (multiple)
  --tags              Tags (multiple)
  --interactive       Interactive mode
  --from-markdown P   Append all items parsed from a fragment markdown file
  --dry-run           With --from-markdown: parse and print without writing
  --skip-duplicates   Skip inputs already present by normalized URL or generated id
  --allow-duplicates  Force add even when normalized URL or generated id already exists
`);
}

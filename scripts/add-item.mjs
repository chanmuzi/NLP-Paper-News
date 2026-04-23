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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, '..', 'data', 'items.json');

// ─── Markdown fragment parsing ─────────────────────────────────────
// Mirrors parseMarkdownItem/parseBullet in parse-markdown.mjs but for
// `/summarize`-style fragments (no year/month/week headers — those are
// auto-filled via getCurrentWeekDate()).

const TYPE_MAP = {
  '📜': 'paper',
  '🧑🏻‍💻': 'dev',
  '🧑🏻💻': 'dev',
  '🗞️': 'news',
  '🗞': 'news',
};

function parseMarkdownItemLine(line) {
  const iconMatch = line.match(/^-\s*(📜|🧑🏻‍💻|🧑🏻💻|🗞️|🗞)/);
  if (!iconMatch) return null;
  const type = TYPE_MAP[iconMatch[1]] || 'unknown';
  const afterIcon = line.slice(iconMatch[0].length).trim();

  const orgMatch = afterIcon.match(/^\[([^\]]+)\]\s*/);
  if (!orgMatch) return null;
  const org = orgMatch[1];
  const afterOrg = afterIcon.slice(orgMatch[0].length);

  let title = '';
  let url = '';
  if (afterOrg.startsWith('[')) {
    let depth = 0;
    let titleEnd = -1;
    for (let i = 0; i < afterOrg.length; i++) {
      if (afterOrg[i] === '[') depth++;
      else if (afterOrg[i] === ']') {
        depth--;
        if (depth === 0) { titleEnd = i; break; }
      }
    }
    if (titleEnd > 0) {
      title = afterOrg.slice(1, titleEnd);
      const rest = afterOrg.slice(titleEnd + 1).trim();
      const urlMatch = rest.match(/^\(([^)]+)\)/);
      if (urlMatch) url = urlMatch[1];
    }
  }
  title = title.replace(/\*\*/g, '').trim();
  if (!title) return null;
  return { type, org, title, url };
}

function parseBulletLine(line) {
  const match = line.match(/^(\s*)-\s+(.+)$/);
  if (!match) return null;
  const indent = match[1].length;
  const text = match[2].trim();
  const level = indent < 4 ? 1 : indent < 8 ? 2 : 3;
  return { text, level };
}

export function parseMarkdownFragment(content) {
  const lines = String(content || '').split('\n');
  const items = [];
  let current = null;
  for (const line of lines) {
    if (line.match(/^-\s*(📜|🧑🏻‍💻|🧑🏻💻|🗞️|🗞)/)) {
      if (current) items.push(current);
      const parsed = parseMarkdownItemLine(line);
      if (parsed) {
        current = { ...parsed, bullets: [], tags: [] };
      } else {
        current = null;
      }
      continue;
    }
    if (current && line.match(/^\s+-\s+/)) {
      const bullet = parseBulletLine(line);
      if (bullet && bullet.text) current.bullets.push(bullet);
    }
  }
  if (current) items.push(current);
  return items;
}

function generateId(org, title) {
  const slug = `${org}-${title}`
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
  return slug;
}

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

function saveData(data) {
  data.last_updated = new Date().toISOString();
  data.total_items = data.items.length;
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

function addItem(item) {
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
    }
  }

  return result;
}

function addItemsFromMarkdown(filePath, { dryRun = false } = {}) {
  const absPath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  const content = fs.readFileSync(absPath, 'utf-8');
  const parsed = parseMarkdownFragment(content);
  if (parsed.length === 0) {
    console.error(`❌ No items parsed from ${absPath}`);
    process.exit(1);
  }

  if (dryRun) {
    console.log(`🧪 [dry-run] Parsed ${parsed.length} item(s) from ${absPath}:`);
    for (const it of parsed) {
      console.log(`   - [${it.type}] ${it.org} — ${it.title}`);
      console.log(`       url: ${it.url || '(none)'}`);
      console.log(`       bullets: ${it.bullets.length}`);
    }
    return parsed;
  }

  const data = loadData();
  const dateInfo = getCurrentWeekDate();
  const added = [];
  for (const it of parsed) {
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
  addItemsFromMarkdown(args.fromMarkdown, { dryRun: args.dryRun });
} else if (args.org && args.title) {
  addItem(args);
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
`);
}

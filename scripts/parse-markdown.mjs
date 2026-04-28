#!/usr/bin/env node
/**
 * Markdown Parser for NLP Paper News
 * 
 * Supports format:
 * - 📜 [Org] [Title](URL)
 *     - bullet point 1
 *         - nested bullet
 * - 🧑🏻‍💻 [Org] [Title](URL)
 * - 🗞️ [Org] [Title](URL)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateId } from './lib/item-id.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Type mapping
const TYPE_MAP = {
  '📜': 'paper',
  '🧑🏻‍💻': 'dev',
  '🧑🏻💻': 'dev',  // Alternative encoding
  '🗞️': 'news',
  '🗞': 'news',
};

function parseMarkdownItem(line) {
  // Match: - 📜 [Org] [Title](URL) or - 📜 [Org] [Title](URL) (Conference)
  // Also handles titles with brackets like [[Product launch] ...]
  
  const iconMatch = line.match(/^-\s*(📜|🧑🏻‍💻|🧑🏻💻|🗞️|🗞)/);
  if (!iconMatch) return null;
  
  const icon = iconMatch[1];
  const type = TYPE_MAP[icon] || 'unknown';
  const afterIcon = line.slice(iconMatch[0].length).trim();
  
  // Extract [Org]
  const orgMatch = afterIcon.match(/^\[([^\]]+)\]\s*/);
  if (!orgMatch) return null;
  
  const org = orgMatch[1];
  const afterOrg = afterIcon.slice(orgMatch[0].length);
  
  // Extract [Title](URL) - handle nested brackets in title
  let title = '';
  let url = '';
  
  // Find the title - it starts with [ and we need to find matching ]
  if (afterOrg.startsWith('[')) {
    let bracketCount = 0;
    let titleEnd = -1;
    
    for (let i = 0; i < afterOrg.length; i++) {
      if (afterOrg[i] === '[') bracketCount++;
      else if (afterOrg[i] === ']') {
        bracketCount--;
        if (bracketCount === 0) {
          titleEnd = i;
          break;
        }
      }
    }
    
    if (titleEnd > 0) {
      title = afterOrg.slice(1, titleEnd);
      const afterTitle = afterOrg.slice(titleEnd + 1).trim();
      
      // Extract URL if present
      const urlMatch = afterTitle.match(/^\(([^)]+)\)/);
      if (urlMatch) {
        url = urlMatch[1];
      }
    }
  }
  
  // Clean up title - remove ** bold markers
  title = title.replace(/\*\*/g, '').trim();
  
  if (!title) return null;
  
  return { type, org, title, url };
}

function parseBullet(line) {
  const match = line.match(/^(\s*)-\s+(.+)$/);
  if (!match) return null;
  
  const indent = match[1].length;
  const text = match[2].trim();
  const level = indent < 4 ? 1 : indent < 8 ? 2 : 3;
  
  return { text, level };
}

function parseReadme(content) {
  const lines = content.split('\n');
  const items = [];
  
  let currentYear = '';
  let currentMonth = '';
  let currentWeek = '1';
  let currentItem = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Year header: # 2025, # 2026
    const yearMatch = line.match(/^#\s+(\d{4})/);
    if (yearMatch) {
      currentYear = yearMatch[1];
      continue;
    }
    
    // Month header: ## 🎄 12월, ## ☃ 2월
    const monthMatch = line.match(/^##\s+.+\s+(\d+)월/);
    if (monthMatch) {
      currentMonth = monthMatch[1];
      continue;
    }
    
    // Week header: <summary>1st week</summary>
    const weekMatch = line.match(/<summary>(\d+)(?:st|nd|rd|th)\s+week<\/summary>/i);
    if (weekMatch) {
      currentWeek = weekMatch[1];
      continue;
    }
    
    // Item header
    if (line.match(/^-\s*(📜|🧑🏻‍💻|🧑🏻💻|🗞️|🗞)/)) {
      // Save previous item
      if (currentItem) {
        items.push(currentItem);
      }
      
      const parsed = parseMarkdownItem(line);
      if (parsed) {
        currentItem = {
          id: generateId(parsed.org, parsed.title),
          date: `${currentYear}-${currentMonth.padStart(2, '0')}-W${currentWeek.padStart(2, '0')}`,
          year: currentYear,
          month: currentMonth,
          week: currentWeek,
          type: parsed.type,
          org: parsed.org,
          title: parsed.title,
          url: parsed.url,
          bullets: [],
          tags: [],
        };
      }
      continue;
    }
    
    // Bullet point (belongs to current item)
    if (currentItem && line.match(/^\s+-\s+/)) {
      const bullet = parseBullet(line);
      if (bullet && bullet.text) {
        currentItem.bullets.push(bullet);
      }
    }
  }
  
  // Don't forget last item
  if (currentItem) {
    items.push(currentItem);
  }
  
  return items;
}

// Main execution
const readmePath = process.argv[2] || path.join(__dirname, '../../NLP-Paper-News/README.md');
const outputPath = process.argv[3] || path.join(__dirname, '../data/items.json');

console.log('📖 Reading:', readmePath);
const content = fs.readFileSync(readmePath, 'utf-8');

console.log('🔄 Parsing...');
const items = parseReadme(content);

// Stats
const stats = {
  total: items.length,
  paper: items.filter(i => i.type === 'paper').length,
  dev: items.filter(i => i.type === 'dev').length,
  news: items.filter(i => i.type === 'news').length,
};

console.log('📊 Stats:', stats);

// Check for issues
const issues = items.filter(i => !i.title || i.title.includes('['));
if (issues.length > 0) {
  console.log('⚠️  Items with potential issues:', issues.length);
  issues.slice(0, 3).forEach(i => console.log('   -', i.title || '(empty title)'));
}

// Save
const output = {
  version: 2,
  last_updated: new Date().toISOString(),
  total_items: items.length,
  stats,
  items,
};

fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
console.log('✅ Saved to:', outputPath);

#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

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

/**
 * Build X thread data: main tweet + reply per item.
 *
 * Main tweet:
 *   📌 NLP-Paper-News · 2025.02.17 (월) 업데이트 (6건)
 *
 *   • Gaia2 (Meta)
 *   • LLaDA2.1 (Ant)
 *   외 4건
 *
 *   👉 https://site-url
 *
 * Each reply:
 *   [1/6] 📜 Gaia2 (Meta)
 *   • bullet level 1
 *      ↳ bullet level 2
 *   🔗 https://arxiv.org/abs/...
 */
function buildXThread(items, siteBaseUrl) {
  const typeIcon = { paper: '📜', dev: '🧑🏻‍💻', news: '🗞️' };

  // --- Main tweet ---
  const maxMain = 280;
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const day = dayNames[now.getDay()];
  const dateStr = `${yyyy}.${mm}.${dd} (${day})`;
  const header = `📌 NLP-Paper-News · ${dateStr} 업데이트 (${items.length}건)\n\n`;
  const footer = siteBaseUrl ? `\n\n👉 ${siteBaseUrl}` : '';

  // Fit as many items as possible into 280 chars, show "외 N건" for the rest
  let mainText = '';
  for (let count = Math.min(items.length, 10); count >= 1; count--) {
    const lines = items.slice(0, count).map((item) => `• ${item.title} (${item.org})`);
    const remaining = items.length - count;
    const moreLine = remaining > 0 ? `\n외 ${remaining}건` : '';
    const candidate = header + lines.join('\n') + moreLine + footer;
    if (candidate.length <= maxMain) {
      mainText = candidate;
      break;
    }
  }
  if (!mainText) {
    mainText = header + `• ${items[0].title} (${items[0].org})` +
      (items.length > 1 ? `\n외 ${items.length - 1}건` : '') + footer;
  }

  // --- Replies (one per item) ---
  // Each reply has [n/total] prefix to avoid X duplicate content detection
  const total = items.length;
  const replies = items.map((item, idx) => {
    const icon = typeIcon[item.type] || '📄';
    const num = `[${idx + 1}/${total}]`;
    const titleLine = `${num} ${icon} ${item.title} (${item.org})`;
    const headerPart = titleLine;
    const urlLine = item.url ? `\n🔗 ${item.url}` : '';

    const bulletLines = (item.bullets || []).map((b) => {
      if (b.level >= 2) return `   ↳ ${b.text}`;
      return `• ${b.text}`;
    });

    // Fit as many complete bullets as possible within 280 chars
    const maxLen = 280;
    let bestText = headerPart + urlLine;

    for (let count = bulletLines.length; count >= 0; count--) {
      const parts = [headerPart];
      if (count > 0) parts.push(bulletLines.slice(0, count).join('\n'));
      const candidate = parts.join('\n') + urlLine;
      if (candidate.length <= maxLen) {
        bestText = candidate;
        break;
      }
    }

    return bestText;
  });

  return { main: mainText, replies };
}

function main() {
  const { input, outDir, siteBaseUrl } = parseArgs(process.argv);
  if (!input) {
    console.error('Usage: node scripts/build-digest.mjs --input <new-items.json> [--out-dir artifacts]');
    process.exit(1);
  }

  const payload = JSON.parse(fs.readFileSync(input, 'utf-8'));
  const items = payload.added_items || [];
  fs.mkdirSync(outDir, { recursive: true });

  // --- X thread ---
  const xThread = buildXThread(items, siteBaseUrl);

  // --- Social draft (manual fallback) ---
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
    },
  };

  fs.writeFileSync(path.join(outDir, 'digest.json'), JSON.stringify(digest, null, 2), 'utf-8');
  fs.writeFileSync(path.join(outDir, 'social-draft.md'), socialDraftMd, 'utf-8');

  console.log(`digest_saved=${path.join(outDir, 'digest.json')}`);
}

main();

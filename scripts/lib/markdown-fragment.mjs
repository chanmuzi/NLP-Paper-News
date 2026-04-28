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
        if (depth === 0) {
          titleEnd = i;
          break;
        }
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

function calculateEffectiveIndent(whitespace) {
  let total = 0;
  for (const ch of whitespace) total += ch === '\t' ? 4 : 1;
  return total;
}

function parseBulletLine(line) {
  const match = line.match(/^(\s*)-\s+(.+)$/);
  if (!match) return null;
  const effectiveIndent = calculateEffectiveIndent(match[1]);
  const text = match[2].trim();
  const level = effectiveIndent < 6 ? 1 : effectiveIndent < 12 ? 2 : 3;
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
      current = parsed ? { ...parsed, bullets: [], tags: [] } : null;
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

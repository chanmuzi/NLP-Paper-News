// X (Twitter) text length utilities.
// Mirrors the counting/clipping rules used by build-digest.mjs and post-x.mjs
// so the /post skill can validate Claude-generated tweets without re-implementing
// the same gotchas (URL=23 weight, CJK/emoji=2x, grapheme vs codepoint).

export const X_HARD_LIMIT = 280;
export const DEFAULT_SAFE_LIMIT = 260;
export const DEFAULT_LOCAL_GUARD = 278;
export const URL_REGEX = /https?:\/\/[^\s)]+/gi;

export function isWideChar(ch) {
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

export function isEmoji(ch) {
  try {
    return /\p{Extended_Pictographic}/u.test(ch);
  } catch {
    return false;
  }
}

export function graphemeSegments(text) {
  const src = String(text || '');
  try {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const seg = new Intl.Segmenter('en', { granularity: 'grapheme' });
      return Array.from(seg.segment(src), (x) => x.segment);
    }
  } catch {}
  return [...src];
}

export function countXCharsCodepoint(text) {
  const normalized = String(text || '').replace(URL_REGEX, 'x'.repeat(23));
  let total = 0;
  for (const ch of [...normalized]) {
    if (isEmoji(ch) || isWideChar(ch)) total += 2;
    else total += 1;
  }
  return total;
}

export function countXCharsGrapheme(text) {
  const normalized = String(text || '').replace(URL_REGEX, 'x'.repeat(23));
  let total = 0;
  for (const g of graphemeSegments(normalized)) {
    if (isEmoji(g) || isWideChar(g)) total += 2;
    else total += 1;
  }
  return total;
}

export function countXChars(text) {
  return Math.max(countXCharsCodepoint(text), countXCharsGrapheme(text));
}

export function countXCharsDetail(text) {
  const codepoint = countXCharsCodepoint(text);
  const grapheme = countXCharsGrapheme(text);
  return { codepoint, grapheme, used: Math.max(codepoint, grapheme) };
}

export function isWithinXLimit(text, limit = X_HARD_LIMIT) {
  return countXChars(text) <= limit;
}

export function clipToXLimit(text, limit = X_HARD_LIMIT) {
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

export function getSafeLimit() {
  const raw = Number(process.env.X_SAFE_LIMIT || DEFAULT_SAFE_LIMIT);
  if (!Number.isFinite(raw)) return DEFAULT_SAFE_LIMIT;
  return Math.max(220, Math.min(X_HARD_LIMIT, Math.floor(raw)));
}

export function getLocalGuardLimit() {
  const raw = Number(process.env.X_LOCAL_GUARD_LIMIT || DEFAULT_LOCAL_GUARD);
  if (!Number.isFinite(raw)) return DEFAULT_LOCAL_GUARD;
  return Math.max(250, Math.min(X_HARD_LIMIT, Math.floor(raw)));
}

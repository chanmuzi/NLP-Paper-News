const TRACKING_PARAMS = new Set([
  'lid',
  'sid',
  'ref',
  'source',
  'fbclid',
  'gclid',
  'msclkid',
  'mc_cid',
  'mc_eid',
]);

function isTrackingParam(name) {
  const lower = String(name || '').toLowerCase();
  return lower.startsWith('utm_') || TRACKING_PARAMS.has(lower);
}

function parseUrl(rawUrl) {
  const trimmed = String(rawUrl || '').trim();
  if (!trimmed) return null;

  try {
    return new URL(trimmed);
  } catch {
    try {
      return new URL(`https://${trimmed}`);
    } catch {
      return null;
    }
  }
}

function normalizePathname(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}

function normalizeSearchParams(searchParams) {
  const entries = [];
  for (const [name, value] of searchParams.entries()) {
    if (!isTrackingParam(name)) entries.push([name, value]);
  }
  entries.sort(([aName, aValue], [bName, bValue]) => {
    const byName = aName.localeCompare(bName);
    return byName || aValue.localeCompare(bValue);
  });
  const normalized = new URLSearchParams();
  for (const [name, value] of entries) normalized.append(name, value);
  return normalized.toString();
}

function normalizeArxivId(id) {
  return String(id || '').replace(/\.pdf$/i, '').replace(/\/+$/, '');
}

function arxivAbsUrl(url) {
  const host = url.hostname.toLowerCase().replace(/^www\./, '');
  if (host !== 'arxiv.org') return null;

  const match = url.pathname.match(/^\/(?:abs|html|pdf|e-print)\/(.+?)\/?$/i);
  if (!match) return null;

  const id = normalizeArxivId(decodeURIComponent(match[1]));
  if (!id) return null;
  return `https://arxiv.org/abs/${id}`;
}

export function normalizeUrlForComparison(rawUrl) {
  const url = parseUrl(rawUrl);
  if (!url) return String(rawUrl || '').trim();

  const arxivUrl = arxivAbsUrl(url);
  if (arxivUrl) return arxivUrl;

  const originalProtocol = url.protocol.toLowerCase();
  url.protocol = ['http:', 'https:'].includes(originalProtocol) ? 'https:' : originalProtocol;
  url.hostname = url.hostname.toLowerCase().replace(/^www\./, '');
  url.hash = '';
  url.pathname = normalizePathname(url.pathname);

  const search = normalizeSearchParams(url.searchParams);
  url.search = search ? `?${search}` : '';

  if (
    (url.protocol === 'https:' && url.port === '443') ||
    (originalProtocol === 'http:' && url.port === '80')
  ) {
    url.port = '';
  }

  return url.toString();
}

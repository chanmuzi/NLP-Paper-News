import { generateId } from './item-id.mjs';
import { normalizeUrlForComparison } from './normalize-url.mjs';

function itemSummary(item) {
  if (!item) return null;
  return {
    id: item.id || generateId(item.org, item.title),
    date: item.date || '',
    type: item.type || '',
    org: item.org || '',
    title: item.title || '',
    url: item.url || '',
  };
}

function candidateSummary(candidate) {
  return {
    org: candidate.org || '',
    title: candidate.title || '',
    id: candidate.id || (candidate.org && candidate.title ? generateId(candidate.org, candidate.title) : ''),
    url: candidate.url || '',
  };
}

function buildExistingIndexes(items) {
  const byUrl = new Map();
  const byId = new Map();

  for (const item of items || []) {
    const id = item.id || generateId(item.org, item.title);
    if (id && !byId.has(id)) byId.set(id, item);

    const normalizedUrl = normalizeUrlForComparison(item.url || '');
    if (normalizedUrl && !byUrl.has(normalizedUrl)) byUrl.set(normalizedUrl, item);
  }

  return { byUrl, byId };
}

export function findDuplicatesByUrl(urls, items) {
  const { byUrl } = buildExistingIndexes(items);
  return (urls || [])
    .map((url, index) => {
      const normalizedUrl = normalizeUrlForComparison(url || '');
      const match = normalizedUrl ? byUrl.get(normalizedUrl) : null;
      if (!match) return null;
      return {
        index,
        input: url,
        normalizedUrl,
        match: itemSummary(match),
      };
    })
    .filter(Boolean);
}

export function findDuplicatesById(candidates, items) {
  const { byId } = buildExistingIndexes(items);
  return (candidates || [])
    .map((candidate, index) => {
      const id = candidate.id || generateId(candidate.org, candidate.title);
      const match = id ? byId.get(id) : null;
      if (!match) return null;
      return {
        index,
        input: candidateSummary(candidate),
        id,
        match: itemSummary(match),
      };
    })
    .filter(Boolean);
}

export function findDuplicateCandidates(candidates, items) {
  const { byUrl, byId } = buildExistingIndexes(items);

  return (candidates || [])
    .map((candidate, index) => {
      const matches = [];
      const normalizedUrl = normalizeUrlForComparison(candidate.url || '');
      if (normalizedUrl && byUrl.has(normalizedUrl)) {
        matches.push({
          reason: 'url',
          normalizedUrl,
          match: itemSummary(byUrl.get(normalizedUrl)),
        });
      }

      const id = candidate.id || (candidate.org && candidate.title ? generateId(candidate.org, candidate.title) : '');
      if (id && byId.has(id)) {
        matches.push({
          reason: 'id',
          id,
          match: itemSummary(byId.get(id)),
        });
      }

      if (matches.length === 0) return null;
      return {
        index,
        input: candidateSummary(candidate),
        matches,
      };
    })
    .filter(Boolean);
}

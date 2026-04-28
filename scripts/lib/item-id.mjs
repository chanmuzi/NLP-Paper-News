export function generateId(org = '', title = '') {
  return `${org}-${title}`
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 100);
}

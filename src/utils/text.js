export function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function searchableText(item) {
  const flatten = (value) => {
    if (Array.isArray(value)) return value.flatMap(flatten)
    if (value && typeof value === 'object') return Object.values(value).flatMap(flatten)
    return value == null ? [] : [String(value)]
  }
  return normalizeText(flatten(item).join(' '))
}

export function uniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]).filter(Boolean))]
    .sort((a, b) => String(a).localeCompare(String(b), 'pt-BR'))
}

export function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function toAnchor(value = '') {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Only fields intentionally published by the Archive may feed client-side search.
// This allowlist is a privacy boundary: adding a new editorial field does not make
// it searchable (or expose it through snippets) until that field is reviewed here.
export const publicSearchFields = [
  'name', 'subtitle', 'summary', 'description', 'category', 'status', 'period',
  'era', 'origin', 'location', 'region', 'kingdom', 'race', 'lineage', 'house', 'capital', 'symbol',
  'government', 'economy', 'population', 'threat', 'habitat', 'traits', 'motto',
  'leadership', 'aliases', 'formerNames', 'titles', 'epithets', 'biography',
  'detailedTimeline', 'sections', 'events', 'curiosities', 'references', 'relations',
  'appearance', 'personality', 'qualities', 'flaws', 'fears', 'desires',
  'objectives', 'values', 'beliefs', 'knowledge', 'publicSecrets', 'family',
  'allies', 'enemies', 'warParticipation', 'eraParticipation', 'politicalPosition',
  'publicReputation', 'culturalViews', 'legacy', 'historicalSources',
  'disputedClaims', 'rumors', 'climate', 'geography', 'culture', 'customs',
  'festivals', 'cuisine', 'importantCharacters', 'relevantPlaces',
  'currentSituation', 'background', 'trigger', 'commanders', 'armies',
  'alliances', 'strategies', 'mainBattles', 'consequences', 'civilianImpact',
  'politicalImpact', 'economicImpact', 'culturalImpact', 'historicalAccounts',
  'politicalContext', 'peoplesSituation', 'magicSituation', 'rulers',
  'discoveries', 'migrations', 'crises', 'religiousChanges', 'culturalChanges',
  'naturalEvents', 'historicalFigures', 'originMyth', 'creationView', 'deathView',
  'magicView', 'symbols', 'rituals', 'sacredDates', 'clergy', 'sacredPlaces',
  'ancientTexts', 'heresies', 'regionalDifferences', 'contradictions',
  'modernInterpretations', 'possiblyTrue', 'unconfirmed', 'ancientNames',
  'creator', 'materials', 'inscriptions', 'costs', 'formerBearers',
  'currentBearer', 'activation', 'destruction', 'risks', 'members', 'methods',
  'causes', 'phases', 'demographics', 'laws', 'military', 'internalConflicts',
  'dailyLife', 'inheritance', 'vows', 'survival', 'rivalries', 'archiveNote',
  'historicalRole', 'role', 'branch', 'realm', 'region', 'terrain', 'climate',
  'collectionLabel', 'searchAliases', 'relationType', 'war', 'character', 'sourceType', 'sourceReliability',
]

export function searchableText(item, fields = publicSearchFields) {
  const flatten = (value) => {
    if (Array.isArray(value)) return value.flatMap(flatten)
    if (value && typeof value === 'object') return Object.values(value).flatMap(flatten)
    return value == null ? [] : [String(value)]
  }
  return normalizeText(fields.flatMap((field) => flatten(item?.[field])).join(' '))
}

export function uniqueValues(items, key) {
  return [...new Set(items.flatMap((item) => Array.isArray(item[key]) ? item[key] : [item[key]])
    .map((value) => value && typeof value === 'object' ? value.label ?? value.name : value)
    .filter(Boolean))]
    .sort((a, b) => String(a).localeCompare(String(b), 'pt-BR'))
}

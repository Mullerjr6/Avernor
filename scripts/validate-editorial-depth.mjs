import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  artifacts, books, celestials, characters, cities, cosmology, creatures, dynasties, endTimes, eras,
  factions, genealogies, houses, kingdoms, lances, legends, locations, mythologies, narKhalion,
  necromancy, peoples, portals, prophecies, relics, religions, returned, successions, wars, worlds,
  genealogyPeople,
} from '../src/content/index.js'
import { catalogs } from '../src/data/catalogs.js'
import { recordDepth } from '../src/content/editorial/recordVolumes.js'

const errors = []
const warnings = []
const present = (value) => Array.isArray(value) ? value.length > 0 : typeof value === 'string' ? value.trim().length > 0 : value != null
const slugOf = (item) => item.slug ?? item.id ?? item.name ?? 'registro-sem-id'
const allowedKnowledgeStatuses = new Set(['public', 'documented', 'unknown', 'lost', 'disputed', 'secret', 'unrecorded', 'rumor', 'people-only'])
const forbiddenPublicKeys = new Set(['secrets', 'authorSecrets', 'authorOnlyFacts', 'privateCanon', 'canonicalTruth'])
const placeholderPattern = /(?:lorem\s+ipsum|texto\s+de\s+preenchimento|conte[uú]do\s+em\s+breve|\?\?\?)/i

function minimum(collection, label, fields, options = {}) {
  for (const item of collection) {
    for (const field of fields) if (!present(item[field])) errors.push(`${label}/${slugOf(item)}: campo editorial ausente ${field}`)
    if ((item.description?.length ?? 0) < (options.description ?? 140)) errors.push(`${label}/${slugOf(item)}: descrição curta (${item.description?.length ?? 0})`)
    if (options.biography && (item.biography?.length ?? 0) < options.biography) errors.push(`${label}/${slugOf(item)}: requer ${options.biography} capítulos narrativos`)
    if (options.timeline && (item.detailedTimeline?.length ?? 0) < options.timeline) errors.push(`${label}/${slugOf(item)}: requer ${options.timeline} marcos cronológicos`)
    if (options.sections && (item.sections?.length ?? 0) < options.sections) errors.push(`${label}/${slugOf(item)}: requer ${options.sections} seções documentais`)
  }
}

minimum(characters, 'personagens', ['appearance', 'personality', 'qualities', 'flaws', 'fears', 'desires', 'objectives', 'values', 'moralLimits', 'attire', 'weapons', 'abilities', 'limitations', 'weaknesses', 'knowledge', 'family', 'allies', 'enemies', 'politicalPosition', 'publicReputation', 'physicalCondition', 'emotionalCondition', 'knownDestiny', 'legacy', 'historicalSources', 'disputedClaims'], { biography: 4, timeline: 3, description: 180 })
minimum(kingdoms, 'reinos', ['foundation', 'climate', 'geography', 'population', 'government', 'succession', 'economy', 'religion', 'architecture', 'culture', 'customs', 'festivals', 'cuisine', 'military', 'internalConflicts', 'currentSituation', 'rumors', 'narrativeImportance'], { biography: 3 })
minimum(cities, 'cidades', ['foundation', 'climate', 'geography', 'government', 'religion', 'architecture', 'culture', 'customs', 'military', 'internalConflicts', 'currentSituation', 'rumors', 'narrativeImportance'], { biography: 2 })
minimum(locations, 'locais', ['climate', 'geography', 'currentSituation', 'rumors', 'narrativeImportance'])
minimum(houses, 'casas', ['foundation', 'government', 'succession', 'religion', 'culture', 'customs', 'importantCharacters', 'currentSituation', 'rumors', 'narrativeImportance', 'publicReputation'], { biography: 3 })
minimum(peoples, 'povos', ['origin', 'geography', 'government', 'religion', 'architecture', 'attire', 'culture', 'customs', 'festivals', 'cuisine', 'military', 'internalConflicts', 'currentSituation', 'rumors', 'narrativeImportance'], { biography: 3 })
minimum(factions, 'faccoes', ['foundation', 'government', 'culture', 'methods', 'moralLimits', 'rivalsPolitical', 'currentSituation', 'rumors', 'narrativeImportance'], { description: 180 })
minimum(wars, 'guerras', ['aliases', 'background', 'trigger', 'belligerents', 'commanders', 'armies', 'alliances', 'objectives', 'strategies', 'mainBattles', 'losses', 'consequences', 'territorialChanges', 'politicalImpact', 'economicImpact', 'culturalImpact', 'historicalAccounts', 'disputedClaims', 'legacy'], { timeline: 4, description: 180 })
minimum(eras, 'historia', ['beginning', 'startingEvent', 'politicalContext', 'peoplesSituation', 'magicSituation', 'rulers', 'discoveries', 'migrations', 'crises', 'religiousChanges', 'culturalChanges', 'naturalEvents', 'historicalFigures', 'endingEvent', 'transition'], { timeline: 4, description: 180 })
minimum([...mythologies, ...religions], 'crencas', ['originMyth', 'creationView', 'deathView', 'magicView', 'symbols', 'rituals', 'sacredDates', 'clergy', 'sacredPlaces', 'ancientTexts', 'heresies', 'regionalDifferences', 'politicalImpact', 'contradictions', 'modernInterpretations', 'possiblyTrue', 'unconfirmed'])
minimum([...artifacts, ...relics], 'itens', ['ancientNames', 'creator', 'materials', 'appearance', 'inscriptions', 'powers', 'limitations', 'costs', 'formerBearers', 'currentBearer', 'events', 'rumors', 'activation', 'destruction', 'risks', 'historicalSources', 'disputedClaims'])

const archiveCollections = [
  ['criaturas', creatures], ['livros', books], ['lendas', legends], ['cosmologia', cosmology], ['portais', portals],
  ['outros-mundos', worlds], ['retornados', returned], ['necromancia', necromancy], ['fim-dos-tempos', endTimes],
  ['nar-khalion', narKhalion], ['profecias', prophecies], ['reliquias', relics], ['celestiais', celestials],
  ['lancas', lances], ['dinastias', dynasties], ['sucessoes', successions],
]
const archiveFields = ['archivalOverview', 'provenance', 'publicKnowledge', 'knowledgeGaps', 'culturalReadings', 'historicalSources', 'disputedClaims', 'narrativeImportance', 'imageBrief', 'knowledgeStatus', 'confidence']
for (const [label, collection] of archiveCollections) minimum(collection, label, archiveFields, { description: 250, sections: 4 })

const allCollections = [
  ['artefatos', artifacts], ...archiveCollections, ['personagens', characters], ['cidades', cities], ['eras', eras],
  ['faccoes', factions], ['casas', houses], ['reinos', kingdoms], ['locais', locations], ['mitologias', mythologies],
  ['povos', peoples], ['religioes', religions], ['guerras', wars], ['genealogias', genealogies], ['pessoas-genealogicas', genealogyPeople],
]

function inspectValue(value, path, seen = new Set()) {
  if (value == null || seen.has(value)) return
  if (typeof value === 'string') {
    if (placeholderPattern.test(value)) errors.push(`${path}: texto de preenchimento detectado`)
    return
  }
  if (typeof value !== 'object') return
  seen.add(value)
  if (Array.isArray(value)) return value.forEach((entry, index) => inspectValue(entry, `${path}[${index}]`, seen))
  for (const [key, child] of Object.entries(value)) {
    if (forbiddenPublicKeys.has(key)) errors.push(`${path}: chave reservada proibida no conteúdo público (${key})`)
    inspectValue(child, `${path}.${key}`, seen)
  }
}

for (const [label, collection] of allCollections) {
  for (const item of collection) {
    inspectValue(item, `${label}/${slugOf(item)}`)
    if (item.knowledgeStatus && !allowedKnowledgeStatuses.has(item.knowledgeStatus)) errors.push(`${label}/${slugOf(item)}: knowledgeStatus inválido ${item.knowledgeStatus}`)
    if (item.knowledgeStatus === 'author-only') errors.push(`${label}/${slugOf(item)}: conhecimento exclusivo do autor não pode integrar src`)
  }
}

const normalized = (text) => String(text ?? '').toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
const trigrams = (text) => {
  const words = normalized(text).split(' ').filter((word) => word.length > 2)
  return new Set(words.slice(0, -2).map((word, index) => `${word} ${words[index + 1]} ${words[index + 2]}`))
}
const similarity = (left, right) => {
  const a = trigrams(left)
  const b = trigrams(right)
  if (!a.size || !b.size) return 0
  const intersection = [...a].filter((token) => b.has(token)).length
  return intersection / (a.size + b.size - intersection)
}

for (const [label, collection] of allCollections) {
  const descriptions = collection.filter(({ description }) => description?.length >= 100)
  for (let left = 0; left < descriptions.length; left += 1) {
    for (let right = left + 1; right < descriptions.length; right += 1) {
      const first = descriptions[left]
      const second = descriptions[right]
      if (normalized(first.description) === normalized(second.description)) errors.push(`${label}: descrição duplicada em ${slugOf(first)} e ${slugOf(second)}`)
      else {
        const score = similarity(first.description, second.description)
        if (score >= 0.78) errors.push(`${label}: descrições excessivamente semelhantes em ${slugOf(first)} e ${slugOf(second)} (${score.toFixed(2)})`)
      }
    }
  }
}

const repeatedSentences = new Map()
for (const [label, collection] of allCollections) {
  for (const item of collection) {
    for (const sentence of String(item.description ?? '').split(/(?<=[.!?])\s+/)) {
      const key = normalized(sentence)
      if (key.length < 70) continue
      const usages = repeatedSentences.get(key) ?? []
      usages.push(`${label}/${slugOf(item)}`)
      repeatedSentences.set(key, usages)
    }
  }
}
for (const [sentence, usages] of repeatedSentences) if (usages.length >= 3) errors.push(`frase repetida em ${usages.length} registros: ${sentence.slice(0, 90)}…`)

// O registro de detalhe deve oferecer leitura substancial antes das fichas especializadas.
// Catálogos duplicados, como Bestiário/Criaturas, são auditados apenas uma vez por id.
const auditedRecordIds = new Set()
for (const [catalogKey, catalog] of Object.entries(catalogs)) {
  if (catalogKey === 'bestiario') continue
  for (const item of catalog.items) {
    if (auditedRecordIds.has(item.id)) continue
    auditedRecordIds.add(item.id)
    const depth = recordDepth(item, catalogKey)
    if (depth.volumes < 5) errors.push(`${catalog.path}/${item.slug}: registro primário requer ao menos 5 volumes (${depth.volumes})`)
    if (depth.entries < 15) errors.push(`${catalog.path}/${item.slug}: registro primário requer ao menos 15 entradas temáticas (${depth.entries})`)
  }
}

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map((entry) => entry.isDirectory() ? sourceFiles(join(directory, entry.name)) : [join(directory, entry.name)]))
  return nested.flat()
}
for (const file of await sourceFiles(fileURLToPath(new URL('../src', import.meta.url)))) {
  if (!/\.(?:js|jsx|mjs|ts|tsx)$/.test(file)) continue
  const source = await readFile(file, 'utf8')
  if (/docs[\\/]autor|SEGREDOS-DO-AUTOR|GENEALOGIAS-SECRETAS|REGISTROS-RESTRITOS/.test(source)) errors.push(`${file}: conteúdo público referencia arquivo reservado do autor`)
  if (/\b(?:secrets|authorSecrets|authorOnlyFacts|privateCanon|canonicalTruth)\s*:/.test(source)) errors.push(`${file}: declara chave reservada em fonte pública`)
  if (/vontade\s+unida\s+costurar[aá]\s+o\s+v[eé]u|medo\s+reunido\s+abrir[aá]\s+o\s+c[aá]rcere|quando\s+as\s+cinco\s+m[aã]os\s+tocarem/i.test(source)) errors.push(`${file}: revela mecanismo reservado das Cinco Relíquias`)
}

if (warnings.length) warnings.forEach((warning) => console.warn(`Editorial warning: ${warning}`))
if (errors.length) {
  console.error(`Editorial depth validation failed with ${errors.length} error(s):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  const total = allCollections.reduce((sum, [, collection]) => sum + collection.length, 0)
  console.log(`Editorial depth validation passed: ${total} public records across ${allCollections.length} collections; archive depth, repetition and secrecy checks succeeded.`)
}

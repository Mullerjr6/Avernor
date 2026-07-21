import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { artifacts, characters, cities, eras, factions, houses, kingdoms, locations, mythologies, peoples, relics, religions, wars } from '../src/content/index.js'

const errors = []
const present = (value) => Array.isArray(value) ? value.length > 0 : typeof value === 'string' ? value.trim().length > 0 : value != null
const minimum = (collection, label, fields, options = {}) => {
  for (const item of collection) {
    for (const field of fields) if (!present(item[field])) errors.push(`${label}/${item.slug}: campo editorial ausente ${field}`)
    if ((item.description?.length ?? 0) < (options.description ?? 140)) errors.push(`${label}/${item.slug}: descrição curta (${item.description?.length ?? 0})`)
    if (options.biography && (item.biography?.length ?? 0) < options.biography) errors.push(`${label}/${item.slug}: requer ${options.biography} capítulos narrativos`)
    if (options.timeline && (item.detailedTimeline?.length ?? 0) < options.timeline) errors.push(`${label}/${item.slug}: requer ${options.timeline} marcos cronológicos`)
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

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map((entry) => entry.isDirectory() ? sourceFiles(join(directory, entry.name)) : [join(directory, entry.name)]))
  return nested.flat()
}
for (const file of await sourceFiles(fileURLToPath(new URL('../src', import.meta.url)))) {
  const source = await readFile(file, 'utf8')
  if (/docs[\\/]autor|SEGREDOS-DO-AUTOR|GENEALOGIAS-SECRETAS/.test(source)) errors.push(`${file}: conteúdo público referencia arquivo reservado do autor`)
}

if (errors.length) {
  console.error(`Editorial depth validation failed with ${errors.length} error(s):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  const total = characters.length + kingdoms.length + cities.length + locations.length + houses.length + peoples.length + factions.length + wars.length + eras.length + mythologies.length + religions.length + artifacts.length + relics.length
  console.log(`Editorial depth validation passed: ${total} core dossiers meet domain requirements.`)
}

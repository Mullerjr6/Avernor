import canon from '../generated/canon.json' with { type: 'json' }
import { characterProfiles } from '../../../src/ai/characters/characterProfiles.js'

export const canonById = Object.fromEntries(canon.records.map((record) => [record.id, record]))

export const knowledgeRules = Object.fromEntries(Object.values(characterProfiles).map((profile) => [profile.characterId, {
  voice: profile.conversationalDirection,
  knows: profile.knowledgePolicy
    .filter(({ status }) => !['unknown', 'secret', 'forbidden'].includes(status))
    .flatMap(({ ids }) => ids),
  withholds: profile.protectedKnowledge,
}]))

export function recordsKnownBy(characterId, discoveredIds = []) {
  const allowed = new Set([...(knowledgeRules[characterId]?.knows ?? []), ...discoveredIds])
  return [...allowed].map((id) => canonById[id]).filter(Boolean)
}

export function canonicalContext(characterId, discoveredIds = []) {
  const rule = knowledgeRules[characterId]
  return {
    character: canonById[characterId],
    voice: rule?.voice ?? '',
    knownRecords: recordsKnownBy(characterId, discoveredIds).map(({ id, name, summary, description, limitations, truthStatus }) => ({
      id, name, summary, description, limitations, truthStatus,
    })),
    protectedKnowledge: rule?.withholds ?? [],
  }
}

export { canon }

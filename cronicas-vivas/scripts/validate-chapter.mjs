import { chapter } from '../src/engine/chapterZero.js'
import { ALLOWED_INVENTORY, choicesForScene, choose, createInitialState } from '../src/engine/gameEngine.js'
import { consequenceForChoice } from '../src/engine/choiceConsequences.js'
import canon from '../src/generated/canon.json' with { type: 'json' }

const errors = []
const sceneIds = new Set(Object.keys(chapter.scenes))
const canonIds = new Set(canon.records.map(({ id }) => id))
const reachable = new Set()
const stateReachable = new Set()
const reachableEndings = new Set()
const requirementFlags = new Set()
let consequenceCount = 0
const distinctConsequences = new Set()

for (const scene of Object.values(chapter.scenes)) {
  for (const choice of scene.choices) {
    Object.keys(choice.requires?.flags ?? {}).forEach((key) => requirementFlags.add(key))
    ;(choice.requires?.anyFlags ?? []).forEach((key) => requirementFlags.add(key))
  }
}

function visit(sceneId) {
  if (reachable.has(sceneId)) return
  const scene = chapter.scenes[sceneId]
  if (!scene) return
  reachable.add(sceneId)
  scene.choices.forEach(({ target }) => visit(target))
}

visit(chapter.firstSceneId)

const depthMemo = new Map()
function routeDepth(sceneId) {
  if (depthMemo.has(sceneId)) return depthMemo.get(sceneId)
  const scene = chapter.scenes[sceneId]
  const ownWords = scene.text.trim().split(/\s+/).length
  if (scene.ending) return { minWords: ownWords, maxWords: ownWords, minScenes: 1, maxScenes: 1 }
  const paths = scene.choices.map(({ target }) => routeDepth(target))
  const result = {
    minWords: ownWords + Math.min(...paths.map(({ minWords }) => minWords)),
    maxWords: ownWords + Math.max(...paths.map(({ maxWords }) => maxWords)),
    minScenes: 1 + Math.min(...paths.map(({ minScenes }) => minScenes)),
    maxScenes: 1 + Math.max(...paths.map(({ maxScenes }) => maxScenes)),
  }
  depthMemo.set(sceneId, result)
  return result
}

const narrativeDepth = routeDepth(chapter.firstSceneId)
if (narrativeDepth.minWords < 3_000) errors.push(`rota mais curta possui apenas ${narrativeDepth.minWords} palavras narrativas`)
if (narrativeDepth.minScenes < 24) errors.push(`rota mais curta possui apenas ${narrativeDepth.minScenes} cenas`)

const queue = [createInitialState()]
const stateSignatures = new Set()
while (queue.length) {
  const state = queue.shift()
  const relevantFlags = Object.fromEntries([...requirementFlags].map((key) => [key, state.flags[key] ?? false]))
  const signature = JSON.stringify({ sceneId: state.sceneId, flags: relevantFlags, relationships: state.relationships })
  if (stateSignatures.has(signature)) continue
  stateSignatures.add(signature)
  if (stateSignatures.size > 100_000) {
    errors.push('exploração de estados excedeu o limite de segurança')
    break
  }

  const currentScene = chapter.scenes[state.sceneId]
  stateReachable.add(state.sceneId)
  if (currentScene.ending) reachableEndings.add(currentScene.id)
  const available = choicesForScene(state, currentScene)
  if (!currentScene.ending && available.length === 0) errors.push(`${currentScene.id}: estado válido sem escolhas disponíveis`)
  for (const choice of available) queue.push(choose(state, choice.id))
}

for (const scene of Object.values(chapter.scenes)) {
  if (!scene.id || !scene.stage || !scene.speaker || !scene.title || !scene.text) errors.push(`${scene.id}: campos narrativos ausentes`)
  if (scene.text.length < 80) errors.push(`${scene.id}: cena excessivamente curta`)
  const choiceIds = scene.choices.map(({ id }) => id)
  if (new Set(choiceIds).size !== choiceIds.length) errors.push(`${scene.id}: escolhas duplicadas`)
  for (const choice of scene.choices) {
    const consequence = consequenceForChoice(scene, choice)
    const consequenceWords = consequence.trim().split(/\s+/).length
    consequenceCount += 1
    distinctConsequences.add(consequence)
    if (consequenceWords < 45) errors.push(`${scene.id}/${choice.id}: consequência rasa com ${consequenceWords} palavras`)
    if (!sceneIds.has(choice.target)) errors.push(`${scene.id}/${choice.id}: alvo inexistente ${choice.target}`)
    for (const effect of choice.effects ?? []) {
      if (effect.type !== 'relationship_delta') errors.push(`${scene.id}/${choice.id}: efeito não autorizado ${effect.type}`)
      if (!['elara', 'aelwen'].includes(effect.target)) errors.push(`${scene.id}/${choice.id}: alvo de relação inválido ${effect.target}`)
      if (!Number.isInteger(effect.value) || Math.abs(effect.value) > 1) errors.push(`${scene.id}/${choice.id}: variação de relação inválida`)
    }
  }
  for (const id of scene.discover ?? []) if (!canonIds.has(id)) errors.push(`${scene.id}: descoberta sem registro canônico ${id}`)
  for (const item of scene.inventory ?? []) if (!ALLOWED_INVENTORY.has(item)) errors.push(`${scene.id}: item não autorizado ${item}`)
  if (!scene.ending && scene.choices.length === 0) errors.push(`${scene.id}: beco sem saída não declarado`)
}

for (const sceneId of sceneIds) if (!reachable.has(sceneId)) errors.push(`${sceneId}: cena inalcançável`)
for (const sceneId of sceneIds) if (!stateReachable.has(sceneId)) errors.push(`${sceneId}: cena inalcançável pelas condições de estado`)
const declaredEndings = Object.values(chapter.scenes).filter(({ ending }) => ending)
if (!declaredEndings.length) errors.push('capítulo sem encerramento')
for (const ending of declaredEndings) if (!reachableEndings.has(ending.id)) errors.push(`${ending.id}: desfecho declarado mas inalcançável`)
for (const item of createInitialState().inventory) if (!ALLOWED_INVENTORY.has(item)) errors.push(`inventário inicial contém item não autorizado ${item}`)

if (errors.length) {
  console.error(`Validação do capítulo falhou com ${errors.length} erro(s):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  console.log(`Capítulo válido: ${sceneIds.size} cenas, ${reachableEndings.size} desfechos, ${stateSignatures.size} estados, ${consequenceCount} consequências (${distinctConsequences.size} textos distintos) e rotas de ${narrativeDepth.minScenes}–${narrativeDepth.maxScenes} cenas (${narrativeDepth.minWords}–${narrativeDepth.maxWords} palavras fixas).`)
}

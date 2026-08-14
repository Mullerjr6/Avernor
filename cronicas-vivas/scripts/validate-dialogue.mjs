import { story } from '../src/engine/chapterZero.js'
import { localReply } from '../src/engine/localNarrator.js'
import { SAVE_KEY, applyNarrativeTurn, createInitialState, loadState, persistState } from '../src/engine/gameEngine.js'

const errors = []
const storage = new Map()
globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: (key) => storage.delete(key),
}

function validateReply(reply, scene, label) {
  if (!reply.narration || reply.narration.split(/\s+/).length < 18) errors.push(`${label}: narração local insuficiente`)
  if (!Array.isArray(reply.dialogue) || !reply.dialogue.length) errors.push(`${label}: nenhuma voz de NPC`)
  for (const entry of reply.dialogue ?? []) {
    if (!scene.participants.includes(entry.speakerId)) errors.push(`${label}: participante ausente falou (${entry.speakerId})`)
    if (entry.speakerId === 'sirius-kayler' || entry.speaker === 'SIRIUS') errors.push(`${label}: resposta escreveu fala de Sirius`)
    if (!entry.text || entry.text.split(/\s+/).length < 25) errors.push(`${label}: fala de ${entry.speakerId} insuficiente`)
    if (entry.action && entry.action.trim().split(/\s+/).length < 3) errors.push(`${label}: ação solta ou reduzida a nome (${entry.action})`)
  }
  if (scene.multiNpc && !scene.participants.every((id) => reply.dialogue.some(({ speakerId }) => speakerId === id))) errors.push(`${label}: cena multi-NPC omitiu uma voz`)
  if (!reply.afterNarration) errors.push(`${label}: fecho narrativo ausente`)
  if (!reply.storySignals.every((signal) => scene.allowedSignals.includes(signal))) errors.push(`${label}: sinal fora do contrato da cena`)
}

function playUntil(state, targetSceneId, texts, maximum = 20) {
  let index = 0
  while (state.sceneId !== targetSceneId && index < maximum) {
    const scene = story.scenes[state.sceneId]
    const text = texts[index] ?? `Intervenção livre ${index + 1}: prossigo com atenção ao que foi revelado.`
    const reply = localReply({ text, state, scene })
    validateReply(reply, scene, `${scene.id}/${state.sceneTurns}`)
    state = applyNarrativeTurn(state, reply, text)
    index += 1
  }
  if (state.sceneId !== targetSceneId) errors.push(`progressão não alcançou ${targetSceneId} em ${maximum} turnos`)
  return state
}

const initial = createInitialState()
if (initial.storyHistory.some(({ speaker }) => speaker === 'SIRIUS')) errors.push('nova jornada contém fala inicial escrita para Sirius')
const initialText = initial.storyHistory.map(({ text }) => text).join(' ')
if (!/três guerreiros orcs/iu.test(initialText)) errors.push('nova jornada não encontra os três mercenários')
if (!/A decisão ainda não havia sido tomada/iu.test(initialText)) errors.push('abertura não entrega a decisão ao jogador')
if (initial.flags.rescueComplete) errors.push('resgate começou concluído')

// A palavra abre uma rota própria e não é tratada como combate.
let state = initial
let current = story.scenes[state.sceneId]
let reply = localReply({ text: 'Soltem a mulher. Ninguém precisa morrer nesta clareira.', state, scene: current })
validateReply(reply, current, 'decisão por diálogo')
state = applyNarrativeTurn(state, reply, 'Soltem a mulher. Ninguém precisa morrer nesta clareira.')
if (state.sceneId !== 'negociacao-na-clareira') errors.push('fala de negociação não abriu a rota de diálogo')
if (state.flags.clearingApproach !== 'dialogue') errors.push('rota de diálogo não foi preservada no estado')

state = playUntil(state, 'clareira-depois-do-grito', [
  'Quem pagou não lhes deu o próprio nome. Isso deveria preocupá-los mais do que minha presença.',
  'Saiam pela trilha oriental e ela fica. É a única proposta que ainda deixa todos respirando.',
  'Cumpram o acordo. Eu não os perseguirei enquanto libertarem a prisioneira.',
], 8)
if (!state.flags.rescueComplete || state.flags.rescuePath !== 'dialogue') errors.push('desfecho negociado não registrou o resgate')
if (!state.storyMemories.some(({ id }) => id === 'memory-rescue-opening' && /diálogo/iu.test(state.storyMemories.find(({ id }) => id === 'memory-rescue-opening')?.summary))) errors.push('memória não preservou a rota negociada')

// A mesma entrada problemática enviada pelo usuário precisa reconhecer nome recusado e ferimentos na mesma resposta.
current = story.scenes[state.sceneId]
const identityAndCare = localReply({ text: 'Não sou ninguém, você está bem?', state, scene: current })
validateReply(identityAndCare, current, 'identidade e condição')
if (/pergunta de Sirius/iu.test(identityAndCare.narration)) errors.push('declaração de Sirius foi narrada como pergunta genérica')
if (!identityAndCare.dialogue.some(({ text }) => /pulsos|ferid|caminhar/iu.test(text) && /nome|viajante|ninguém/iu.test(text))) errors.push('Elara não respondeu às duas partes da intervenção')
state = applyNarrativeTurn(state, identityAndCare, 'Não sou ninguém, você está bem?')

current = story.scenes[state.sceneId]
const distanceReply = localReply({ text: 'O que uma elfa faz tão longe de casa?', state, scene: current })
validateReply(distanceReply, current, 'motivo de Elara')
if (!distanceReply.dialogue.some(({ text }) => /rota de refugiados|marcadores de passagem|emboscada/iu.test(text))) errors.push('pergunta sobre Elara estar longe de casa não recebeu resposta direta')
if (distanceReply.dialogue[0]?.text === identityAndCare.dialogue[0]?.text) errors.push('narrador local repetiu a fala anterior')
state = applyNarrativeTurn(state, distanceReply, 'O que uma elfa faz tão longe de casa?')

// Ação declarada abre combate e não é convertida em negociação.
let combatState = createInitialState()
current = story.scenes[combatState.sceneId]
reply = localReply({ text: 'Avanço contra o mercenário da esquerda e lanço um raio no chão diante dele.', state: combatState, scene: current })
validateReply(reply, current, 'decisão por combate')
combatState = applyNarrativeTurn(combatState, reply, 'Avanço contra o mercenário da esquerda e lanço um raio no chão diante dele.')
if (combatState.sceneId !== 'combate-na-clareira') errors.push('ação ofensiva não abriu a rota de combate')
combatState = playUntil(combatState, 'clareira-depois-do-grito', [
  'Descarrego eletricidade na pedra branca para separar os dois da trilha.',
  'Avanço pelo flanco seco e mantenho a descarga longe das raízes onde ela está presa.',
  'Derrubo o captor que segura a corda e abro espaço para que a elfa alcance a adaga.',
], 8)
if (!combatState.flags.rescueComplete || combatState.flags.rescuePath !== 'combat') errors.push('desfecho de combate não registrou a rota escolhida')

// O conto completo continua sem saltos automáticos ou Elara onipresente.
state = playUntil(state, 'vestigios-do-contrato', ['Ainda não terminei de responder.', 'Meu nome pode esperar; o mandante, não.', 'Vamos examinar o que eles deixaram.'], 8)
current = story.scenes[state.sceneId]
reply = localReply({ text: 'Quem pagou por isso e o que realmente podemos provar?', state, scene: current })
validateReply(reply, current, 'consulta de informação')
if (!reply.dialogue.some(({ text }) => /vestígios|não um rosto|não.*prova/iu.test(text))) errors.push('consulta não recebeu resposta coerente sobre informação desconhecida')
state = applyNarrativeTurn(state, reply, 'Quem pagou por isso e o que realmente podemos provar?')

let guard = 0
let sawMultiNpc = false
let sawSceneWithoutElara = false
while (state.sceneId !== 'retorno-de-elara' && guard < 60) {
  current = story.scenes[state.sceneId]
  const text = `Turno livre ${guard + 1}: respondo ao que foi dito e avanço apenas quando a cena tiver desenvolvido suas consequências.`
  reply = localReply({ text, state, scene: current })
  validateReply(reply, current, `${current.id}/${state.sceneTurns}`)
  if (current.multiNpc && reply.dialogue.length >= 2) sawMultiNpc = true
  if (!current.participants.includes('elara')) {
    sawSceneWithoutElara = true
    if (reply.dialogue.some(({ speakerId }) => speakerId === 'elara')) errors.push('Elara falou durante sua ausência')
  }
  state = applyNarrativeTurn(state, reply, text)
  guard += 1
}
if (guard >= 60) errors.push('progressão contínua ficou presa antes do capítulo seguinte')
if (!sawMultiNpc) errors.push('nenhuma conversa com múltiplos NPCs ocorreu')
if (!sawSceneWithoutElara) errors.push('nenhuma cena sem Elara ocorreu')
if (!state.visitedScenes.includes('conversa-sem-elara')) errors.push('cena privada com Aelwen não foi visitada')
if (!state.storyMemories.some(({ id }) => id === 'memory-rescue-opening')) errors.push('memória do resgate se perdeu entre cenas')
if (!state.summary.includes('Entre três lâminas')) errors.push('resumo acumulado não preservou a decisão inicial')
if (state.chapterId !== 'capitulo-um-raizes-sem-selo') errors.push('progressão não alcançou o capítulo seguinte')

persistState(state)
if (!storage.has(SAVE_KEY)) errors.push('save não foi gravado')
const restored = loadState()
if (restored.sceneId !== state.sceneId || restored.totalTurns !== state.totalTurns) errors.push('save/load não restaurou a posição narrativa')
if (restored.storyMemories.length !== state.storyMemories.length) errors.push('save/load não restaurou memórias')
if (restored.presentNpcIds.join(',') !== story.scenes[restored.sceneId].participants.join(',')) errors.push('save/load não restaurou participantes presentes')

if (errors.length) {
  console.error(`Validação narrativa falhou com ${errors.length} erro(s):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  console.log(`Narrativa válida: ${state.totalTurns} turnos, ${state.visitedScenes.length} cenas, rotas de diálogo e combate, elenco dinâmico, memória e save/load preservados.`)
}

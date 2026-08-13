import { chapter } from '../src/engine/chapterZero.js'
import { interpretPlayerDialogue } from '../src/engine/dialogueInterpreter.js'
import { localReply } from '../src/engine/localNarrator.js'
import { addFreeReply, createInitialState } from '../src/engine/gameEngine.js'

const scene = chapter.scenes['shared-road-2']
const baseState = {
  ...createInitialState(),
  sceneId: scene.id,
  flags: { metElara: true, ravenFormRevealed: true },
  relationships: { elara: 2, aelwen: 0 },
}

const cases = [
  ['A sua tia já sabia que eu podia me transformar em corvo?', 'raven', 'aelwen'],
  ['Tenho medo de um dia não conseguir voltar da forma de corvo.', 'raven', null, 'vulnerability'],
  ['O que o pacto diz sobre nós dois?', 'pact'],
  ['Você ainda sente medo depois do que aconteceu na clareira?', 'capture'],
  ['Quem pagou os mercenários?', 'conspiracy'],
  ['Como funciona sua adaga?', 'dagger'],
  ['Minha mãe aparece nos arquivos de Sylvaris?', 'namidia'],
  ['Você confia em mim?', 'trust'],
  ['Você acredita que pode amar alguém por escolha e não por destino?', 'relationship', 'pact'],
  ['Quantos anos você acha que eu pareço ter?', 'age'],
  ['Desculpe por ter tentado decidir por você.', 'choice', null, 'apology'],
  ['Eu respeito sua decisão, mesmo que não concorde.', 'choice', null, 'respect'],
  ['Eu ainda não sei o que dizer depois de tudo isso.', 'open', null, 'personal'],
]

const errors = []
let state = baseState

for (const [text, expectedIntent, expectedSecondary = null, expectedTone = null] of cases) {
  const interpretation = interpretPlayerDialogue(text, state, scene)
  if (interpretation.intent !== expectedIntent) errors.push(`“${text}”: intenção ${interpretation.intent}, esperado ${expectedIntent}`)
  if (expectedSecondary && interpretation.secondaryIntent !== expectedSecondary) errors.push(`“${text}”: intenção secundária ${interpretation.secondaryIntent}, esperado ${expectedSecondary}`)
  if (expectedTone && interpretation.tone !== expectedTone) errors.push(`“${text}”: tom ${interpretation.tone}, esperado ${expectedTone}`)

  const reply = localReply({ text, state, scene, interpretation })
  if (!reply.narration || reply.narration.split(/\s+/).length < 20) errors.push(`“${text}”: narração local insuficiente`)
  if (!reply.dialogue || reply.dialogue.split(/\s+/).length < 55) errors.push(`“${text}”: fala local insuficiente`)
  if (!reply.afterthought || reply.afterthought.split(/\s+/).length < 15) errors.push(`“${text}”: reflexão final insuficiente`)
  if (reply.understoodIntent !== interpretation.intent) errors.push(`“${text}”: resposta perdeu a intenção interpretada`)

  state = addFreeReply(state, { ...reply, playerText: text }, interpretation)
}

const combinedText = 'A sua tia já sabia que eu podia me transformar em corvo?'
const combinedInterpretation = interpretPlayerDialogue(combinedText, baseState, scene)
const stateWithCombinedTurn = addFreeReply(baseState, {
  ...localReply({ text: combinedText, state: baseState, scene, interpretation: combinedInterpretation }),
  playerText: combinedText,
}, combinedInterpretation)
const continuation = 'E ela sabia disso antes de me mandar para a floresta?'
const continuedInterpretation = interpretPlayerDialogue(continuation, stateWithCombinedTurn, scene)
if (continuedInterpretation.intent !== 'aelwen') errors.push(`continuação pronominal produziu ${continuedInterpretation.intent}, esperado aelwen`)
const continuedReply = localReply({ text: continuation, state: stateWithCombinedTurn, scene, interpretation: continuedInterpretation })
if (!continuedReply.dialogue.startsWith('Não posso afirmar')) errors.push('resposta de continuação não enfrentou diretamente a pergunta anterior')
if (continuedReply.narration === stateWithCombinedTurn.dialogueMemory.at(-1)?.narration) errors.push('narração de continuação repetiu mecanicamente a reação anterior')

const repeated = interpretPlayerDialogue('Desculpe por ter tentado decidir por você.', state, scene)
const relationshipBefore = state.relationships.elara
state = addFreeReply(state, { ...localReply({ text: 'Desculpe por ter tentado decidir por você.', state, scene, interpretation: repeated }), playerText: 'Desculpe por ter tentado decidir por você.' }, repeated)
if (state.relationships.elara !== relationshipBefore) errors.push('repetição da mesma intenção permitiu acumular relação na mesma cena')

if (errors.length) {
  console.error(`Validação de diálogo falhou com ${errors.length} erro(s):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  console.log(`Diálogo válido: ${cases.length} intenções testadas, continuidade contextual preservada e efeitos não acumuláveis.`)
}

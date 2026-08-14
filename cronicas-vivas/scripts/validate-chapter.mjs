import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { story } from '../src/engine/chapterZero.js'
import { ALLOWED_INVENTORY, createInitialState } from '../src/engine/gameEngine.js'
import canon from '../src/generated/canon.json' with { type: 'json' }

const errors = []
const sceneIds = new Set(Object.keys(story.scenes))
const canonIds = new Set(canon.records.map(({ id }) => id))
const reachable = new Set()
const directory = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(directory, '..')

function visit(sceneId) {
  if (reachable.has(sceneId)) return
  const current = story.scenes[sceneId]
  if (!current) return
  reachable.add(sceneId)
  if (current.transition?.target && current.transition.target !== sceneId) visit(current.transition.target)
}

visit(story.firstSceneId)

for (const current of Object.values(story.scenes)) {
  if (!current.id || !current.chapterId || !current.stage || !current.location || !current.title || !current.objective) errors.push(`${current.id}: metadados do Diretor incompletos`)
  if (!Array.isArray(current.opening) || current.opening.length < 2) errors.push(`${current.id}: abertura narrativa insuficiente`)
  const words = current.opening.map(({ text }) => text).join(' ').trim().split(/\s+/).length
  if (words < 70) errors.push(`${current.id}: abertura rasa com ${words} palavras`)
  if (!Array.isArray(current.participants) || current.participants.length === 0) errors.push(`${current.id}: cena sem participantes`)
  if (!Array.isArray(current.beats) || current.beats.length < 3) errors.push(`${current.id}: menos de três batidas narrativas`)
  const signals = current.beats.map(({ signal }) => signal)
  if (new Set(signals).size !== signals.length) errors.push(`${current.id}: sinais narrativos duplicados`)
  if (!current.allowedSignals.every((signal) => signals.includes(signal))) errors.push(`${current.id}: sinal permitido não pertence às batidas`)
  if (!current.transition?.target || !sceneIds.has(current.transition.target)) errors.push(`${current.id}: transição inválida`)
  if (!current.transition?.signal || !signals.includes(current.transition.signal)) errors.push(`${current.id}: transição sem sinal semântico válido`)
  for (const id of [...current.discoverOnEnter, ...Object.values(current.discoverBySignal).flat()]) {
    if (!canonIds.has(id)) errors.push(`${current.id}: descoberta sem registro canônico ${id}`)
  }
  for (const entry of current.opening) if (entry.speaker === 'SIRIUS') errors.push(`${current.id}: a história escreveu fala pronta para Sirius`)
}

for (const sceneId of sceneIds) if (!reachable.has(sceneId)) errors.push(`${sceneId}: cena inalcançável`)
if (story.chapters.length < 2) errors.push('a fonte estruturada não demonstra continuidade entre capítulos')
if (!Object.values(story.scenes).some(({ participants }) => participants.length > 1)) errors.push('nenhuma cena multi-NPC foi encontrada')
if (!Object.values(story.scenes).some(({ participants }) => !participants.includes('elara'))) errors.push('nenhuma cena sem Elara foi encontrada')

const opening = story.scenes[story.firstSceneId].opening.map(({ text }) => text).join(' ')
for (const required of ['cavalo', 'Embainhou', 'grito feminino', 'forma de corvo', 'três guerreiros orcs', 'Elara', 'mercenários', 'mandante']) {
  if (!opening.includes(required)) errors.push(`abertura canônica não preservou: ${required}`)
}
if (!/não representantes de um povo/iu.test(opening)) errors.push('abertura não separa mercenários do povo orc')

const initial = createInitialState()
for (const item of initial.inventory) if (!ALLOWED_INVENTORY.has(item)) errors.push(`inventário inicial contém item não autorizado: ${item}`)
if (!initial.flags.rescueComplete || !initial.flags.ravenFormWitnessed || !initial.flags.mastermindUnknown) errors.push('estado inicial não preserva os fatos do resgate')
if (initial.presentNpcIds.join(',') !== 'elara') errors.push('participantes iniciais incorretos')

const inspectedFiles = [
  'src/App.jsx', 'src/components/DialoguePanel.jsx', 'src/engine/gameEngine.js', 'src/engine/storyDirector.js',
]
const forbiddenNames = [
  ['choices', 'ForScene'].join(''), ['available', 'Choices'].join(''), ['on', 'Choice'].join(''),
  ['choice', 'Consequences'].join(''), ['choice', '-consequence'].join(''),
]
for (const relative of inspectedFiles) {
  const source = await readFile(path.join(projectRoot, relative), 'utf8')
  for (const name of forbiddenNames) if (source.includes(name)) errors.push(`${relative}: mecanismo antigo ainda presente (${name})`)
}

if (errors.length) {
  console.error(`Validação estrutural falhou com ${errors.length} erro(s):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  const totalWords = Object.values(story.scenes).reduce((total, current) => total + current.opening.map(({ text }) => text).join(' ').split(/\s+/).length, 0)
  console.log(`Diretor válido: ${sceneIds.size} cenas em ${story.chapters.length} capítulos, ${totalWords} palavras de abertura, elenco múltiplo, progressão semântica e nenhuma fala pronta de Sirius.`)
}

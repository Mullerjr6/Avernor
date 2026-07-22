import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { dynasties } from '../src/content/dynasties/index.js'
import { characters } from '../src/content/characters/index.js'
import { genealogies, genealogyPeople } from '../src/content/genealogies/index.js'
import { successions } from '../src/content/succession/index.js'
import { wars } from '../src/content/wars/index.js'

const errors = []
const warnings = []
const duplicates = (values) => values.filter((value, index) => values.indexOf(value) !== index)
const personById = new Map(genealogyPeople.map((person) => [person.id, person]))
const treeById = new Map(genealogies.map((tree) => [tree.id, tree]))
const dynastyById = new Map(dynasties.map((dynasty) => [dynasty.id, dynasty]))
const validRelationTypes = new Set(['parent', 'adopted', 'illegitimate', 'partner', 'political-marriage', 'unofficial', 'annulled-union', 'guardian', 'oath', 'spiritual', 'contested', 'unconfirmed', 'office', 'master-apprentice', 'succession', 'broken-branch', 'custody'])
const generationalRelationTypes = new Set(['parent', 'adopted', 'illegitimate', 'office', 'master-apprentice', 'succession', 'broken-branch', 'custody'])
const symmetricRelationTypes = new Set(['partner', 'political-marriage', 'unofficial', 'annulled-union', 'oath', 'spiritual', 'contested', 'unconfirmed'])
const validRelationStatuses = new Set(['documented', 'witnessed', 'disputed', 'legendary', 'redacted', 'lost', 'unrecorded'])
const validTruthStatuses = new Set(['documented', 'witnessed', 'disputed', 'legendary', 'prophetic', 'redacted'])
const validKnowledgeStatuses = new Set(['public', 'documented', 'unknown', 'lost', 'disputed', 'secret', 'unrecorded', 'rumor', 'people-only'])
const validConfidence = new Set(['high', 'medium', 'low', 'unknown'])
const requiredPersonStrings = ['role', 'summary', 'historicalRole', 'branch', 'period', 'source', 'confidence', 'knowledgeStatus', 'truthStatus', 'visualDescription']
const forbiddenPublicKeys = new Set(['secrets', 'authorSecrets', 'authorSecret', 'privateNotes', 'restrictedTruth'])

function error(message) { errors.push(message) }
function hasText(value, minimum = 1) { return typeof value === 'string' && value.trim().length >= minimum }
function normalize(value) { return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').replace(/\s+/g, ' ').trim() }

function lifeRulesFor(people = '') {
  const normalized = normalize(people)
  if (normalized.includes('brux')) return { minimumParentAge: 18, expectedMaximum: 700, label: 'linhagem bruxa' }
  if (normalized.includes('elf')) return { minimumParentAge: 30, expectedMaximum: 850, label: 'elfos' }
  if (normalized.includes('gigante')) return { minimumParentAge: 40, expectedMaximum: 500, label: 'gigantes' }
  if (/^ana(?:o)?(?:\b|\s|—)/.test(normalized)) return { minimumParentAge: 22, expectedMaximum: 220, label: 'anões' }
  if (normalized.includes('orc')) return { minimumParentAge: 16, expectedMaximum: 130, label: 'orcs' }
  return { minimumParentAge: 16, expectedMaximum: 130, label: 'humanos' }
}

function scanForbiddenKeys(value, path = 'genealogias') {
  if (!value || typeof value !== 'object') return
  if (Array.isArray(value)) return value.forEach((entry, index) => scanForbiddenKeys(entry, `${path}[${index}]`))
  for (const [key, entry] of Object.entries(value)) {
    if (forbiddenPublicKeys.has(key)) error(`${path}: campo reservado "${key}" não pode entrar no bundle público`)
    scanForbiddenKeys(entry, `${path}.${key}`)
  }
}

scanForbiddenKeys({ genealogies, genealogyPeople })

if (genealogies.length < 18) error(`Acervo insuficiente: ${genealogies.length} árvores; mínimo editorial 18`)
if (genealogyPeople.length < 120) error(`Acervo insuficiente: ${genealogyPeople.length} pessoas; mínimo editorial 120`)

for (const duplicate of duplicates(genealogyPeople.map(({ id }) => id))) error(`Pessoa duplicada: ${duplicate}`)
for (const duplicate of duplicates(genealogies.map(({ id }) => id))) error(`Genealogia duplicada: ${duplicate}`)
for (const duplicate of duplicates(genealogies.map(({ slug }) => slug))) error(`Slug de genealogia duplicado: ${duplicate}`)
for (const duplicate of duplicates(dynasties.map(({ id }) => id))) error(`Dinastia duplicada: ${duplicate}`)
for (const duplicate of duplicates(successions.map(({ id }) => id))) error(`Sucessão duplicada: ${duplicate}`)

const membership = new Map(genealogyPeople.map(({ id }) => [id, []]))

for (const tree of genealogies) {
  if (!hasText(tree.name) || !hasText(tree.subtitle) || !hasText(tree.summary, 60) || !hasText(tree.symbol) || !hasText(tree.theme)) error(`${tree.id}: metadados editoriais da árvore incompletos`)
  if (!validTruthStatuses.has(tree.truthStatus)) error(`${tree.id}: truthStatus inválido ${tree.truthStatus}`)
  if (tree.memberIds.length < 5) error(`${tree.id}: árvore pequena demais (${tree.memberIds.length}); mínimo 5 membros públicos ou lacunas explicitadas`)

  const members = new Set(tree.memberIds)
  for (const memberId of tree.memberIds) {
    if (!personById.has(memberId)) error(`${tree.id}: pessoa inexistente ${memberId}`)
    else membership.get(memberId)?.push(tree.id)
  }
  for (const duplicate of duplicates(tree.memberIds)) error(`${tree.id}: membro repetido ${duplicate}`)

  const children = new Map(tree.memberIds.map((id) => [id, []]))
  const biologicalParents = new Map(tree.memberIds.map((id) => [id, []]))
  const generationalPredecessors = new Map(tree.memberIds.map((id) => [id, []]))
  const undirected = new Map(tree.memberIds.map((id) => [id, []]))
  const edgeKeys = new Set()

  for (const edge of tree.relations) {
    if (!members.has(edge.from) || !members.has(edge.to)) error(`${tree.id}: relação fora da árvore ${edge.from} -> ${edge.to}`)
    if (edge.from === edge.to) error(`${tree.id}: autorrelação em ${edge.from}`)
    if (!validRelationTypes.has(edge.type)) error(`${tree.id}: tipo de relação inválido ${edge.type}`)
    if (!validRelationStatuses.has(edge.status)) error(`${tree.id}: status de relação inválido ${edge.status}`)
    const edgeKey = symmetricRelationTypes.has(edge.type) ? [edge.from, edge.to].sort().join('|') + `|${edge.type}` : `${edge.from}|${edge.to}|${edge.type}`
    if (edgeKeys.has(edgeKey)) error(`${tree.id}: relação duplicada ou reciprocidade representada duas vezes ${edgeKey}`)
    edgeKeys.add(edgeKey)
    undirected.get(edge.from)?.push(edge.to)
    undirected.get(edge.to)?.push(edge.from)

    if (!generationalRelationTypes.has(edge.type)) continue
    children.get(edge.from)?.push(edge.to)
    generationalPredecessors.get(edge.to)?.push(edge.from)
    if (edge.type === 'parent') biologicalParents.get(edge.to)?.push(edge.from)
    if (!['parent', 'adopted', 'illegitimate'].includes(edge.type)) continue
    const parent = personById.get(edge.from)
    const child = personById.get(edge.to)
    if (parent && child && parent.born != null && child.born != null) {
      const { minimumParentAge, label } = lifeRulesFor(parent.people)
      if (child.born - parent.born < minimumParentAge) error(`${tree.id}: idade parental impossível para ${label} (${edge.from} -> ${edge.to})`)
    }
    if (parent?.died != null && child?.born != null && parent.died < child.born - 1) error(`${tree.id}: nascimento após morte parental ${edge.from} -> ${edge.to}`)
  }

  if (tree.memberIds.length && tree.relations.length < tree.memberIds.length - 1) error(`${tree.id}: relações insuficientes para conectar ${tree.memberIds.length} membros`)
  if (tree.memberIds.length) {
    const reached = new Set()
    const queue = [tree.memberIds[0]]
    while (queue.length) {
      const id = queue.shift()
      if (reached.has(id)) continue
      reached.add(id)
      queue.push(...(undirected.get(id) || []))
    }
    const disconnected = tree.memberIds.filter((id) => !reached.has(id))
    if (disconnected.length) error(`${tree.id}: árvore possui componentes desconectados (${disconnected.join(', ')}) — lacunas devem ser nós perdidos/não registrados, não saltos silenciosos`)
  }

  for (const [childId, parentIds] of biologicalParents) if (parentIds.length > 2) error(`${tree.id}: ${childId} possui mais de dois pais biológicos sem explicação`)
  const roots = tree.memberIds.filter((id) => (generationalPredecessors.get(id)?.length ?? 0) === 0)
  if (roots.length === 0 && !tree.originUnknown) error(`${tree.id}: linhagem sem ancestral conhecido e sem origem marcada como desconhecida`)

  const visiting = new Set()
  const visited = new Set()
  function visit(id) {
    if (visiting.has(id)) { error(`${tree.id}: ciclo de ancestralidade/ofício em ${id}`); return }
    if (visited.has(id)) return
    visiting.add(id)
    for (const child of children.get(id) ?? []) visit(child)
    visiting.delete(id)
    visited.add(id)
  }
  tree.memberIds.forEach(visit)
}

for (const person of genealogyPeople) {
  for (const field of requiredPersonStrings) if (!hasText(person[field])) error(`${person.id}: campo obrigatório ausente ou vazio (${field})`)
  if (!hasText(person.summary, 48)) error(`${person.id}: resumo deve possuir ao menos 48 caracteres`)
  if (!hasText(person.historicalRole, 48)) error(`${person.id}: papel histórico deve possuir ao menos 48 caracteres`)
  if (!hasText(person.visualDescription, 32)) error(`${person.id}: descrição visual deve possuir ao menos 32 caracteres`)
  if (!validTruthStatuses.has(person.truthStatus)) error(`${person.id}: truthStatus inválido ${person.truthStatus}`)
  if (!validKnowledgeStatuses.has(person.knowledgeStatus)) error(`${person.id}: knowledgeStatus inválido ${person.knowledgeStatus}`)
  if (person.knowledgeStatus === 'author-only') error(`${person.id}: dado conhecido apenas pelo autor não pode entrar em src/content`)
  if (person.knowledgeStatus === 'secret' && person.profile) error(`${person.id}: identidade secreta não pode apontar para perfil público`)
  if (['lost', 'unrecorded'].includes(person.knowledgeStatus) && person.truthStatus === 'redacted') error(`${person.id}: lacuna perdida/não registrada não pode ser apresentada como conteúdo deliberadamente restrito`)
  if (!validConfidence.has(person.confidence)) error(`${person.id}: confidence inválida ${person.confidence}`)
  if (!Array.isArray(person.titles) || !person.titles.length) error(`${person.id}: titles deve conter ao menos um título/classificação`)
  if (!Array.isArray(person.tags) || !person.tags.length) error(`${person.id}: tags deve conter ao menos um marcador`)
  if (!person.portrait && !hasText(person.portraitFallback)) error(`${person.id}: retrato existente ou fallback heráldico contextual obrigatório`)
  if (person.portrait && !existsSync(resolve('public', person.portrait.replace(/^\//, '')))) error(`${person.id}: retrato inexistente ${person.portrait}`)
  if (/docs[\\/]autor|segredos-do-autor|registros-restritos/i.test(person.source)) error(`${person.id}: fonte pública aponta para documentação reservada`)
  if (!(membership.get(person.id)?.length)) error(`${person.id}: pessoa não pertence a nenhuma árvore`)
  if (person.born != null && person.died != null && person.died < person.born) error(`${person.id}: morte anterior ao nascimento`)
  if (person.born < 0 && !person.period.includes('a.C.')) error(`${person.id}: período anterior ao Ano 0 deve usar a notação a.C.`)
  if (/(?:a|d)\.C\.\./.test(person.period)) error(`${person.id}: pontuação duplicada no período`)

  const status = person.status.toLocaleLowerCase('pt-BR')
  if (person.died != null && status.includes('viv')) error(`${person.id}: possui data de morte, mas aparece como vivo`)
  if (person.died == null && status.includes('mort') && !['unknown', 'lost', 'unrecorded', 'disputed'].includes(person.knowledgeStatus)) error(`${person.id}: aparece como morto sem data/período ou classificação documental que explique a lacuna`)
  if (person.born != null) {
    const age = person.died != null ? person.died - person.born : status.includes('viv') ? 1204 - person.born : null
    const { expectedMaximum, label } = lifeRulesFor(person.people)
    if (age != null && age > expectedMaximum && !hasText(person.longevityJustification, 24)) {
      error(`${person.id}: idade ${age} excede a expectativa editorial de ${label} (${expectedMaximum}) sem justificativa racial/canônica`)
    }
  }
}

for (const duplicateSummary of duplicates(genealogyPeople.map(({ summary }) => normalize(summary))).filter(Boolean)) {
  const people = genealogyPeople.filter(({ summary }) => normalize(summary) === duplicateSummary).map(({ id }) => id)
  error(`Resumo genealógico repetido literalmente em ${people.join(', ')}`)
}

const profilePeople = genealogyPeople.filter(({ profile }) => profile)
for (const duplicate of duplicates(profilePeople.map(({ profile }) => profile))) error(`Perfil ligado a mais de uma pessoa genealógica: ${duplicate}`)
const profilePersonByPath = new Map(profilePeople.map((person) => [person.profile, person]))
for (const character of characters) {
  const person = profilePersonByPath.get(`/personagens/${character.slug}`)
  if (!person) warnings.push(`${character.id}: personagem público sem nó genealógico associado`)
  if (!person) continue
  const characterTree = treeById.get(character.genealogyId)
  if (!characterTree) error(`${character.id}: genealogyId aponta para árvore inexistente (${character.genealogyId})`)
  else if (!characterTree.memberIds.includes(person.id)) error(`${character.id}: seu nó ${person.id} não pertence à árvore declarada ${character.genealogyId}`)
  for (const entry of character.detailedTimeline) {
    const match = String(entry.date ?? entry.year ?? '').match(/-?\d{3,4}/)
    if (!match) continue
    const year = Number(match[0])
    if (person.born != null && year < person.born) error(`${character.id}: evento ${entry.title ?? entry.event} ocorre antes do nascimento`)
    if (person.died != null && year > person.died) error(`${character.id}: evento ${entry.title ?? entry.event} ocorre depois da morte sem justificativa`)
  }
}

const eraRanges = { 'Grande Guerra': [0, 100], 'Queda da Coroa': [101, 158], 'Era da Magia': [159, 310], 'Era das Coroas': [311, 612], 'Caça às Bruxas': [613, 704] }
for (const war of wars) {
  const range = eraRanges[war.era]
  const years = [...String(war.period).matchAll(/\d+/g)].map(({ 0: value }) => Number(value))
  if (range && years.some((year) => year < range[0] || year > range[1])) error(`${war.id}: data fora da era ${war.era}`)
}

for (const dynasty of dynasties) if (!treeById.has(dynasty.genealogyId)) error(`${dynasty.id}: genealogia inexistente ${dynasty.genealogyId}`)
for (const succession of successions) {
  const tree = treeById.get(succession.genealogyId)
  if (!tree) error(`${succession.id}: genealogia inexistente ${succession.genealogyId}`)
  if (!dynastyById.has(succession.dynastyId)) error(`${succession.id}: dinastia inexistente ${succession.dynastyId}`)
  const allClaims = [...(succession.current ? [succession.current] : []), ...succession.order, ...succession.pretenders, ...succession.excluded]
  const ranks = succession.order.map(({ rank }) => rank)
  if (duplicates(ranks).length) error(`${succession.id}: posições sucessórias duplicadas`)
  if (duplicates(allClaims.map(({ personId }) => personId)).length) error(`${succession.id}: pessoa repetida em papéis sucessórios`)
  succession.order.forEach(({ rank }, index) => { if (rank !== index + 1) error(`${succession.id}: ordem não foi derivada de forma contínua`) })
  for (const candidate of allClaims) {
    if (!personById.has(candidate.personId)) error(`${succession.id}: candidato inexistente ${candidate.personId}`)
    if (tree && !tree.memberIds.includes(candidate.personId)) error(`${succession.id}: candidato fora da genealogia ${candidate.personId}`)
  }
}

if (warnings.length) {
  console.warn(`Genealogy validation warnings (${warnings.length}):`)
  warnings.forEach((warning) => console.warn(`- ${warning}`))
}

if (errors.length) {
  console.error(`Genealogy validation failed with ${errors.length} error(s):`)
  errors.forEach((entry) => console.error(`- ${entry}`))
  process.exitCode = 1
} else {
  console.log(`Genealogy validation passed: ${genealogies.length} trees, ${genealogyPeople.length} people, ${dynasties.length} dynasties and ${successions.length} successions.`)
}

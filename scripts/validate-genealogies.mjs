import { dynasties } from '../src/content/dynasties/index.js'
import { characters } from '../src/content/characters/index.js'
import { genealogies, genealogyPeople } from '../src/content/genealogies/index.js'
import { successions } from '../src/content/succession/index.js'
import { wars } from '../src/content/wars/index.js'

const errors = []
const duplicates = (values) => values.filter((value, index) => values.indexOf(value) !== index)
const personById = new Map(genealogyPeople.map((person) => [person.id, person]))
const treeById = new Map(genealogies.map((tree) => [tree.id, tree]))
const dynastyById = new Map(dynasties.map((dynasty) => [dynasty.id, dynasty]))
const validRelationTypes = new Set(['parent', 'adopted', 'illegitimate', 'partner', 'unofficial', 'guardian', 'oath', 'contested'])
const validRelationStatuses = new Set(['documented', 'witnessed', 'disputed', 'legendary', 'redacted'])

for (const duplicate of duplicates(genealogyPeople.map(({ id }) => id))) errors.push(`Pessoa duplicada: ${duplicate}`)
for (const duplicate of duplicates(genealogies.map(({ id }) => id))) errors.push(`Genealogia duplicada: ${duplicate}`)
for (const duplicate of duplicates(dynasties.map(({ id }) => id))) errors.push(`Dinastia duplicada: ${duplicate}`)
for (const duplicate of duplicates(successions.map(({ id }) => id))) errors.push(`Sucessão duplicada: ${duplicate}`)

for (const tree of genealogies) {
  const members = new Set(tree.memberIds)
  for (const memberId of tree.memberIds) if (!personById.has(memberId)) errors.push(`${tree.id}: pessoa inexistente ${memberId}`)
  for (const duplicate of duplicates(tree.memberIds)) errors.push(`${tree.id}: membro repetido ${duplicate}`)

  const children = new Map(tree.memberIds.map((id) => [id, []]))
  const biologicalParents = new Map(tree.memberIds.map((id) => [id, []]))
  const edgeKeys = new Set()
  for (const edge of tree.relations) {
    if (!members.has(edge.from) || !members.has(edge.to)) errors.push(`${tree.id}: relação fora da árvore ${edge.from} -> ${edge.to}`)
    if (edge.from === edge.to) errors.push(`${tree.id}: autorrelação em ${edge.from}`)
    if (!validRelationTypes.has(edge.type)) errors.push(`${tree.id}: tipo de relação inválido ${edge.type}`)
    if (!validRelationStatuses.has(edge.status)) errors.push(`${tree.id}: status de relação inválido ${edge.status}`)
    const edgeKey = ['partner', 'unofficial', 'oath', 'contested'].includes(edge.type) ? [edge.from, edge.to].sort().join('|') + `|${edge.type}` : `${edge.from}|${edge.to}|${edge.type}`
    if (edgeKeys.has(edgeKey)) errors.push(`${tree.id}: relação duplicada ou reciprocidade representada duas vezes ${edgeKey}`)
    edgeKeys.add(edgeKey)
    if (!['parent', 'adopted', 'illegitimate'].includes(edge.type)) continue
    children.get(edge.from)?.push(edge.to)
    if (edge.type === 'parent') biologicalParents.get(edge.to)?.push(edge.from)
    const parent = personById.get(edge.from)
    const child = personById.get(edge.to)
    if (parent && child && parent.born != null && child.born != null && child.born - parent.born < 12) errors.push(`${tree.id}: idade parental impossível ${edge.from} -> ${edge.to}`)
    if (parent?.died != null && child?.born != null && parent.died < child.born - 1) errors.push(`${tree.id}: nascimento após morte parental ${edge.from} -> ${edge.to}`)
  }

  for (const [childId, parentIds] of biologicalParents) if (parentIds.length > 2) errors.push(`${tree.id}: ${childId} possui mais de dois pais biológicos sem explicação`)

  const roots = tree.memberIds.filter((id) => (biologicalParents.get(id)?.length ?? 0) === 0)
  if (roots.length === 0 && !tree.originUnknown) errors.push(`${tree.id}: linhagem sem ancestral conhecido e sem origem marcada como desconhecida`)

  const visiting = new Set()
  const visited = new Set()
  function visit(id) {
    if (visiting.has(id)) { errors.push(`${tree.id}: ciclo de ancestralidade em ${id}`); return }
    if (visited.has(id)) return
    visiting.add(id)
    for (const child of children.get(id) ?? []) visit(child)
    visiting.delete(id)
    visited.add(id)
  }
  tree.memberIds.forEach(visit)
}

for (const person of genealogyPeople) {
  const status = person.status.toLocaleLowerCase('pt-BR')
  if (person.died != null && status.includes('viv')) errors.push(`${person.id}: possui data de morte, mas aparece como vivo`)
  if (person.died == null && status.includes('mort')) errors.push(`${person.id}: aparece como morto sem data ou período de morte`)
}

const profilePersonByPath = new Map(genealogyPeople.filter(({ profile }) => profile).map((person) => [person.profile, person]))
for (const character of characters) {
  const person = profilePersonByPath.get(`/personagens/${character.slug}`)
  if (!person) continue
  for (const entry of character.detailedTimeline) {
    const match = String(entry.date ?? entry.year ?? '').match(/-?\d{3,4}/)
    if (!match) continue
    const year = Number(match[0])
    if (person.born != null && year < person.born) errors.push(`${character.id}: evento ${entry.title ?? entry.event} ocorre antes do nascimento`)
    if (person.died != null && year > person.died) errors.push(`${character.id}: evento ${entry.title ?? entry.event} ocorre depois da morte sem justificativa`)
  }
}

const eraRanges = { 'Grande Guerra': [0, 100], 'Queda da Coroa': [101, 158], 'Era da Magia': [159, 310], 'Era das Coroas': [311, 612], 'Caça às Bruxas': [613, 704] }
for (const war of wars) {
  const range = eraRanges[war.era]
  const years = [...String(war.period).matchAll(/\d+/g)].map(({ 0: value }) => Number(value))
  if (range && years.some((year) => year < range[0] || year > range[1])) errors.push(`${war.id}: data fora da era ${war.era}`)
}

for (const dynasty of dynasties) if (!treeById.has(dynasty.genealogyId)) errors.push(`${dynasty.id}: genealogia inexistente ${dynasty.genealogyId}`)
for (const succession of successions) {
  const tree = treeById.get(succession.genealogyId)
  if (!tree) errors.push(`${succession.id}: genealogia inexistente ${succession.genealogyId}`)
  if (!dynastyById.has(succession.dynastyId)) errors.push(`${succession.id}: dinastia inexistente ${succession.dynastyId}`)
  const allClaims = [...(succession.current ? [succession.current] : []), ...succession.order, ...succession.pretenders, ...succession.excluded]
  const ranks = succession.order.map(({ rank }) => rank)
  if (duplicates(ranks).length) errors.push(`${succession.id}: posições sucessórias duplicadas`)
  if (duplicates(allClaims.map(({ personId }) => personId)).length) errors.push(`${succession.id}: pessoa repetida em papéis sucessórios`)
  succession.order.forEach(({ rank }, index) => { if (rank !== index + 1) errors.push(`${succession.id}: ordem não foi derivada de forma contínua`) })
  for (const candidate of allClaims) {
    if (!personById.has(candidate.personId)) errors.push(`${succession.id}: candidato inexistente ${candidate.personId}`)
    if (tree && !tree.memberIds.includes(candidate.personId)) errors.push(`${succession.id}: candidato fora da genealogia ${candidate.personId}`)
  }
}

if (errors.length) {
  console.error(`Genealogy validation failed with ${errors.length} error(s):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  console.log(`Genealogy validation passed: ${genealogies.length} trees, ${genealogyPeople.length} people, ${dynasties.length} dynasties and ${successions.length} successions.`)
}

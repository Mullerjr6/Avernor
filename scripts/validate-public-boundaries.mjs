import { readFile, readdir } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { catalogs, searchIndex } from '../src/data/catalogs.js'
import { dynasties, genealogies, successions } from '../src/content/index.js'
import { publicSearchFields } from '../src/utils/text.js'

const root = fileURLToPath(new URL('..', import.meta.url))
const sourceRoot = join(root, 'src')
const errors = []
const reservedKeys = new Set([
  'secrets', 'authorSecrets', 'authorNotes', 'authorOnlyNotes', 'hiddenCanon',
  'hiddenRelations', 'privateCanon', 'secretGenealogy', 'trueIdentity',
])
const allowedKnowledgeStatuses = new Set([
  'public', 'documented', 'unknown', 'lost', 'disputed', 'secret', 'unrecorded',
  'authorOnly', 'rumor', 'peopleOnly', 'people-only', 'pública', 'publica',
  'desconhecida', 'perdida', 'contestada', 'secreta', 'não registrada',
  'conhecida apenas pelo autor', 'baseada em rumor', 'conhecida apenas por determinado povo',
])
const prohibitedPublicClaims = [
  { label: 'causa reservada da designação de Elara', pattern: /escolha dos Círculos não decorre do pacto Kayler/i },
  { label: 'causa reservada da designação de Elara', pattern: /pacto Kayler não criou sua condição de herdeira/i },
  { label: 'critério reservado da designação de Elara', pattern: /Elara foi escolhida[^'"\n]{0,180}relação com a floresta/i },
  { label: 'causa reservada da designação de Elara', pattern: /pacto Kayler[^'"\n]{0,100}(?:não constitui causa|não sustenta essa causa)/i },
]

async function filesBelow(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const groups = await Promise.all(entries.map((entry) => entry.isDirectory()
    ? filesBelow(join(directory, entry.name))
    : [join(directory, entry.name)]))
  return groups.flat()
}

for (const file of await filesBelow(sourceRoot)) {
  if (!['.js', '.jsx', '.json'].includes(extname(file))) continue
  const source = await readFile(file, 'utf8')
  const name = relative(root, file)
  if (/docs[\\/]autor|SEGREDOS-DO-AUTOR|GENEALOGIAS-SECRETAS/i.test(source)) {
    errors.push(`${name}: referencia material reservado do autor`)
  }
  for (const key of reservedKeys) {
    const declaration = new RegExp(`(?:^|[,{\\s])${key}\\s*:`, 'm')
    if (declaration.test(source)) errors.push(`${name}: declara a chave pública reservada "${key}"`)
  }
  for (const claim of prohibitedPublicClaims) {
    if (claim.pattern.test(source)) errors.push(`${name}: expõe semanticamente ${claim.label}`)
  }
}

for (const key of reservedKeys) {
  if (publicSearchFields.includes(key)) errors.push(`busca pública inclui a chave reservada "${key}"`)
}

const publicRoots = {
  catalogs: Object.fromEntries(Object.entries(catalogs).map(([key, catalog]) => [key, catalog.items])),
  genealogies,
  dynasties,
  successions,
  searchIndex,
}

function inspect(value, path, seen = new WeakSet()) {
  if (!value || typeof value !== 'object') return
  if (seen.has(value)) return
  seen.add(value)
  for (const [key, child] of Object.entries(value)) {
    const childPath = `${path}.${key}`
    if (reservedKeys.has(key)) errors.push(`${childPath}: chave reservada presente no bundle público`)
    if (key === 'knowledgeStatus' && typeof child === 'string' && !allowedKnowledgeStatuses.has(child)) {
      errors.push(`${childPath}: classificação de conhecimento inválida "${child}"`)
    }
    inspect(child, childPath, seen)
  }
}

inspect(publicRoots, 'public')

const searchKeys = new Set()
for (const [index, record] of searchIndex.entries()) {
  for (const field of ['id', 'name', 'href', 'collectionLabel']) {
    if (!record[field]) errors.push(`searchIndex.${index}: campo público obrigatório ausente (${field})`)
  }
  if (!record.href?.startsWith('/')) errors.push(`searchIndex.${index}: destino não interno (${record.href})`)
  const key = `${record.href}|${record.name}`
  if (searchKeys.has(key)) errors.push(`searchIndex: resultado duplicado ${key}`)
  searchKeys.add(key)
}

if (errors.length) {
  console.error(`Public-boundary validation failed with ${errors.length} error(s):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  console.log(`Public-boundary validation passed: ${publicSearchFields.length} reviewed fields, ${searchIndex.length} safe search records and no reserved author keys in src/.`)
}

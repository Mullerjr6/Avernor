import { catalogs } from '../src/data/catalogs.js'
import { characters } from '../src/content/characters/index.js'
import { dynasties } from '../src/content/dynasties/index.js'
import { genealogies, genealogyPeople } from '../src/content/genealogies/index.js'
import { relics } from '../src/content/relics/index.js'
import { successions } from '../src/content/succession/index.js'
import { wars } from '../src/content/wars/index.js'

const errors = []
const routes = new Set(['/', '/cronologia', '/atlas', '/galeria', '/sobre', '/busca', '/genealogias', '/dinastias', '/sucessoes', '/404'])
const entitiesByRoute = new Map()
const genealogyPersonByProfile = new Map(genealogyPeople.filter(({ profile }) => profile).map((person) => [person.profile, person]))
const geographicCatalogPaths = new Set(['/reinos', '/cidades', '/locais', '/portais', '/outros-mundos', '/nar-khalion'])
const geographicImages = new Map()
const geographicThumbnails = new Map()

for (const catalog of Object.values(catalogs)) {
  routes.add(catalog.path)
  const slugs = catalog.items.map(({ slug }) => slug)
  slugs.filter((slug, index) => slugs.indexOf(slug) !== index).forEach((slug) => errors.push(`${catalog.path}: slug duplicado ${slug}`))
  catalog.items.forEach((item) => {
    const route = `${catalog.path}/${item.slug}`
    routes.add(route)
    if (catalog.path !== '/bestiario') entitiesByRoute.set(route, item)
    if (geographicCatalogPaths.has(catalog.path)) {
      if (!item.image || !item.thumbnail) errors.push(`${route}: registro geográfico sem imagem e miniatura próprias`)
      for (const [kind, source, registry] of [
        ['imagem', item.image, geographicImages],
        ['miniatura', item.thumbnail, geographicThumbnails],
      ]) {
        if (!source) continue
        if (registry.has(source)) errors.push(`${route}: ${kind} duplicada de ${registry.get(source)} (${source})`)
        else registry.set(source, route)
      }
    }
  })
}
genealogies.forEach((item) => routes.add(`/genealogias/${item.slug}`))
dynasties.forEach((item) => routes.add(`/dinastias/${item.slug}`))
successions.forEach((item) => {
  routes.add(`/sucessoes/${item.slug}`)
  routes.add(`/reinos/${item.slug}/sucessao`)
})
genealogyPeople.filter(({ profile }) => profile).forEach(({ profile }) => routes.add(`${profile}/genealogia`))

function checkLink(to, source) {
  if (!to?.startsWith('/')) return errors.push(`${source}: link não interno ou vazio (${to})`)
  const path = to.split(/[?#]/)[0]
  if (!routes.has(path)) errors.push(`${source}: rota inexistente ${to}`)
}

for (const catalog of Object.values(catalogs)) {
  for (const item of catalog.items) {
    if (!item.id || !item.name || !item.summary || !item.description) errors.push(`${catalog.path}/${item.slug}: campos editoriais obrigatórios ausentes`)
    if (!item.image || !item.thumbnail) errors.push(`${catalog.path}/${item.slug}: registro sem imagem responsiva completa`)
    if (['thematic', 'regional'].includes(item.imageScope) && !item.imageAlt) errors.push(`${catalog.path}/${item.slug}: prancha compartilhada sem descrição de proveniência visual`)
    if (!['documented', 'witnessed', 'disputed', 'legendary', 'prophetic', 'redacted'].includes(item.truthStatus)) errors.push(`${catalog.path}/${item.slug}: truthStatus inválido ${item.truthStatus}`)
    item.relations?.forEach(({ to }) => checkLink(to, `${catalog.path}/${item.slug}`))
    if (catalog.path !== '/bestiario' && item.relations.length === 0) errors.push(`${catalog.path}/${item.slug}: registro isolado, sem relações`)
    if (catalog.path !== '/bestiario') {
      const sourceRoute = `${catalog.path}/${item.slug}`
      item.relations.forEach(({ to }) => {
        const target = entitiesByRoute.get(to)
        if (target && !target.relations.some((relation) => relation.to === sourceRoute)) errors.push(`${sourceRoute}: relação sem reciprocidade com ${to}`)
      })
    }
  }
}

genealogyPeople.filter(({ profile }) => profile).forEach(({ id, profile }) => checkLink(profile, `pessoa ${id}`))

for (const character of characters) {
  const currentLocations = Array.isArray(character.currentLocation) ? character.currentLocation : [character.currentLocation]
  if (Array.isArray(character.currentLocation)) {
    if (currentLocations.length !== 1) errors.push(`${character.id}: personagem possui quantidade inválida de locais atuais (${currentLocations.length})`)
  }
  if (currentLocations.length !== 1 || typeof currentLocations[0] !== 'string' || !currentLocations[0].trim()) {
    errors.push(`${character.id}: local atual canônico ausente`)
  }

  const status = String(character.status || '').toLocaleLowerCase('pt-BR')
  const currentLocation = String(currentLocations[0] || '').toLocaleLowerCase('pt-BR')
  if (status.includes('mort') && currentLocation && !/mort|memorial|sepultur|desconhecid|não confirmad/.test(currentLocation)) {
    errors.push(`${character.id}: personagem morto possui local atual apresentado como presença viva (${character.currentLocation})`)
  }
}

const characterNames = characters.map(({ name }) => name)
for (const relic of relics) {
  const currentBearers = Array.isArray(relic.currentBearer) ? relic.currentBearer : [relic.currentBearer]
  if (Array.isArray(relic.currentBearer)) {
    if (currentBearers.length !== 1) errors.push(`${relic.id}: Relíquia possui quantidade inválida de portadores atuais (${currentBearers.length})`)
  }
  if (currentBearers.length !== 1 || typeof currentBearers[0] !== 'string' || !currentBearers[0].trim()) {
    errors.push(`${relic.id}: portador ou custódia atual não classificado`)
  }
  if (!Array.isArray(relic.formerBearers)) errors.push(`${relic.id}: cadeia de portadores anteriores deve ser uma lista`)

  const bearerText = String(Array.isArray(relic.currentBearer) ? relic.currentBearer.join(' ') : relic.currentBearer)
  const namedCurrentBearers = characterNames.filter((name) => bearerText.includes(name))
  if (namedCurrentBearers.length > 1) errors.push(`${relic.id}: mais de um personagem público aparece como portador atual (${namedCurrentBearers.join(', ')})`)
  if (namedCurrentBearers.length === 1) {
    const bearer = characters.find(({ name }) => name === namedCurrentBearers[0])
    if (String(bearer?.status || '').toLocaleLowerCase('pt-BR').includes('mort')) errors.push(`${relic.id}: portador atual ${bearer.name} consta como morto`)
  }
}

function warRange(period = '') {
  const years = [...String(period).matchAll(/\d+/g)].map((match) => Number(match[0]))
  if (!years.length) return null
  return { start: years[0], end: years.at(-1) }
}

for (const war of wars) {
  const range = warRange(war.period)
  if (!range) {
    errors.push(`${war.id}: guerra sem intervalo cronológico validável`)
    continue
  }
  for (const character of characters) {
    const declaredParticipation = character.warParticipation?.some((entry) => {
      const statement = String(entry)
      return statement.includes(war.name) && !/posterior|depois|após|não participou|consequência/i.test(statement)
    })
    const namedAsCommander = war.commanders?.some((entry) => String(entry).includes(character.name))
    if (!declaredParticipation && !namedAsCommander) continue
    const person = genealogyPersonByProfile.get(`/personagens/${character.slug}`)
    if (!person) {
      errors.push(`${war.id}: ${character.name} participa do conflito, mas não possui cronologia genealógica para validação`)
      continue
    }
    if (person.born != null && person.born > range.end) errors.push(`${war.id}: ${character.name} participa antes de nascer`)
    if (person.died != null && person.died < range.start) errors.push(`${war.id}: ${character.name} participa depois de morrer`)
  }
}

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} error(s):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  console.log(`Content validation passed: ${Object.keys(catalogs).length} catalogs and ${routes.size} registered routes.`)
}

import { catalogs } from '../src/data/catalogs.js'
import { dynasties } from '../src/content/dynasties/index.js'
import { genealogies, genealogyPeople } from '../src/content/genealogies/index.js'
import { successions } from '../src/content/succession/index.js'

const errors = []
const routes = new Set(['/', '/cronologia', '/atlas', '/galeria', '/sobre', '/busca', '/genealogias', '/dinastias', '/sucessoes', '/404'])
const entitiesByRoute = new Map()

for (const catalog of Object.values(catalogs)) {
  routes.add(catalog.path)
  const slugs = catalog.items.map(({ slug }) => slug)
  slugs.filter((slug, index) => slugs.indexOf(slug) !== index).forEach((slug) => errors.push(`${catalog.path}: slug duplicado ${slug}`))
  catalog.items.forEach((item) => {
    const route = `${catalog.path}/${item.slug}`
    routes.add(route)
    if (catalog.path !== '/bestiario') entitiesByRoute.set(route, item)
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

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} error(s):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  console.log(`Content validation passed: ${Object.keys(catalogs).length} catalogs and ${routes.size} registered routes.`)
}

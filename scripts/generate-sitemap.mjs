import { writeFile } from 'node:fs/promises'
import { catalogs } from '../src/data/catalogs.js'
import { dynasties } from '../src/content/dynasties/index.js'
import { genealogies } from '../src/content/genealogies/index.js'
import { successions } from '../src/content/succession/index.js'

const siteUrl = (process.env.SITE_URL ?? process.argv[2] ?? '').replace(/\/$/, '')
if (!/^https:\/\//.test(siteUrl)) {
  console.error('Defina SITE_URL com o domínio HTTPS canônico. Ex.: SITE_URL=https://exemplo.com npm run sitemap')
  process.exit(1)
}

const staticRoutes = ['/', '/cronologia', '/atlas', '/galeria', '/sobre', '/busca', '/genealogias', '/dinastias', '/sucessoes']
const catalogRoutes = Object.values(catalogs).flatMap((catalog) => [catalog.path, ...catalog.items.map((item) => `${catalog.path}/${item.slug}`)])
const specialistRoutes = [
  ...genealogies.map((item) => `/genealogias/${item.slug}`),
  ...dynasties.map((item) => `/dinastias/${item.slug}`),
  ...successions.map((item) => `/sucessoes/${item.slug}`),
  ...successions.map((item) => `/reinos/${item.slug}/sucessao`),
]
const routes = [...new Set([...staticRoutes, ...catalogRoutes, ...specialistRoutes])].sort()
const lastmod = new Date().toISOString().slice(0, 10)
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${siteUrl}${route}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`

await writeFile(new URL('../public/sitemap.xml', import.meta.url), xml, 'utf8')
console.log(`Sitemap generated with ${routes.length} URLs for ${siteUrl}.`)

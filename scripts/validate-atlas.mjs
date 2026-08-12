import { access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  ATLAS_REFERENCE_YEAR,
  atlasLayers,
  atlasRegions,
  atlasRoutes,
  canonicalAtlasPoints,
  canonicalMap,
  findAtlasRoute,
  historicalMaps,
  politicalEntities,
  routeGeometry,
  travelProfileForPoint,
} from '../src/data/canonicalMap.js'
import { createCampaignAtlasState } from '../src/data/liveChroniclesAtlas.js'
import { catalogs } from '../src/data/catalogs.js'
import { characters } from '../src/content/characters/index.js'
import { genealogies, genealogyPeople } from '../src/content/genealogies/index.js'
import { houses } from '../src/content/houses/index.js'
import { wars } from '../src/content/wars/index.js'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(scriptDirectory, '..')
const errors = []
const warnings = []

function fail(message) {
  errors.push(message)
}

function warn(message) {
  warnings.push(message)
}

function requireValue(value, label) {
  if (value === undefined || value === null || value === '') fail(`${label}: valor obrigatório ausente.`)
}

function validateUnique(items, label, field = 'id') {
  const seen = new Set()
  for (const item of items) {
    const value = item[field]
    requireValue(value, `${label}.${field}`)
    if (seen.has(value)) fail(`${label}: ${field} duplicado "${value}".`)
    seen.add(value)
  }
  return seen
}

function inside(value, minimum, maximum) {
  return Number.isFinite(value) && value >= minimum && value <= maximum
}

function pointInsidePolygon(x, y, polygon) {
  let contained = false
  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index, index += 1) {
    const [currentX, currentY] = polygon[index]
    const [previousX, previousY] = polygon[previous]
    const crossesLatitude = (currentY > y) !== (previousY > y)
    if (!crossesLatitude) continue
    const intersectionX = ((previousX - currentX) * (y - currentY)) / (previousY - currentY) + currentX
    if (x < intersectionX) contained = !contained
  }
  return contained
}

function publicAssetPath(assetPath) {
  if (!assetPath) return null
  if (assetPath.startsWith('/assets/')) return path.join(projectRoot, 'public', assetPath.slice(1))
  return path.resolve(projectRoot, assetPath)
}

async function validateAsset(assetPath, label) {
  requireValue(assetPath, label)
  if (!assetPath) return
  try {
    await access(publicAssetPath(assetPath))
  } catch {
    fail(`${label}: arquivo não encontrado (${assetPath}).`)
  }
}

function findRestrictedKeys(value, trail = []) {
  if (!value || typeof value !== 'object') return
  for (const [key, nested] of Object.entries(value)) {
    const nextTrail = [...trail, key]
    if (/^(secret|secrets|authorSecrets|restrictedKnowledge|hiddenCoordinates|privateRoute)$/i.test(key)) {
      fail(`Campo reservado exposto no dado público: ${nextTrail.join('.')}.`)
    }
    findRestrictedKeys(nested, nextTrail)
  }
}

requireValue(canonicalMap.id, 'canonicalMap.id')
requireValue(canonicalMap.title, 'canonicalMap.title')
requireValue(canonicalMap.referenceDate, 'canonicalMap.referenceDate')
requireValue(canonicalMap.coordinateSystem, 'canonicalMap.coordinateSystem')
requireValue(canonicalMap.authority?.scope, 'canonicalMap.authority.scope')
requireValue(canonicalMap.authority?.maintainedBy, 'canonicalMap.authority.maintainedBy')

if (ATLAS_REFERENCE_YEAR !== 1204 || canonicalMap.referenceDate !== '1204 d.C.') {
  fail('A autoridade temporal do Atlas deve permanecer em 1204 d.C.')
}
if (canonicalMap.authority?.status !== 'official-canonical') fail('O mapa principal deve ter autoridade official-canonical.')
if (canonicalMap.coordinateSystem !== 'normalized-percent') fail('O sistema de coordenadas deve ser normalized-percent.')
if (Math.abs(canonicalMap.aspectRatio - 1.5) > 0.0001) fail('O mapa oficial deve preservar proporção 3:2.')

const officialDocuments = [canonicalMap, ...historicalMaps].filter((map) => map.authority?.status === 'official-canonical' || map.classification === 'official-canonical')
if (officialDocuments.length !== 1 || officialDocuments[0].id !== canonicalMap.id) {
  fail('Deve existir exatamente uma carta oficial canônica: o mapa de 1204 d.C.')
}

const layerIds = validateUnique(atlasLayers, 'camadas')
const regionIds = validateUnique(atlasRegions, 'regiões')
const entityIds = validateUnique(politicalEntities, 'entidades políticas')
const pointIds = validateUnique(canonicalAtlasPoints, 'pontos')
validateUnique(canonicalAtlasPoints, 'pontos', 'slug')
const routeIds = validateUnique(atlasRoutes, 'rotas')
validateUnique(historicalMaps, 'mapas históricos')

const publicCharacterNames = new Set([
  ...characters.map(({ name }) => name),
  ...genealogyPeople.map(({ name }) => name),
])
const publicWarNames = new Set(wars.map(({ name }) => name))
const publicRecordRoutes = new Set(Object.values(catalogs)
  .flatMap((catalog) => catalog.items.map((item) => `${catalog.path}/${item.slug}`)))
const publicHouseNames = new Set()
const registeredHouseNames = [
  ...houses.map(({ name }) => name),
  ...genealogies.map(({ name, house }) => [name, house]).flat().filter(Boolean),
  ...genealogyPeople.map(({ house }) => house).filter(Boolean),
]
for (const name of registeredHouseNames) {
  publicHouseNames.add(name)
  if (!/^(Casa|Clã|Sangue|Canto|Linhagem|Dinastia|Cadeia|Custódia)\b/i.test(name)) {
    publicHouseNames.add(`Casa ${name}`)
    publicHouseNames.add(`Casa da ${name}`)
    publicHouseNames.add(`Casa do ${name}`)
    publicHouseNames.add(`Clã ${name}`)
  }
}

if (canonicalAtlasPoints.length < 25) fail(`O Atlas precisa de ao menos 25 pontos públicos; recebeu ${canonicalAtlasPoints.length}.`)
if (atlasRoutes.length < 10) warn(`A rede possui apenas ${atlasRoutes.length} trechos; considere ampliar a malha pública.`)

for (const layer of atlasLayers) {
  requireValue(layer.label, `camada ${layer.id}.label`)
  requireValue(layer.description, `camada ${layer.id}.description`)
  requireValue(layer.color, `camada ${layer.id}.color`)
}

const regionById = new Map(atlasRegions.map((region) => [region.id, region]))
for (const region of atlasRegions) {
  requireValue(region.name, `região ${region.id}.name`)
  requireValue(region.climate, `região ${region.id}.climate`)
  requireValue(region.terrain, `região ${region.id}.terrain`)
  requireValue(region.politicalControl, `região ${region.id}.politicalControl`)
  if (!entityIds.has(region.kingdomId)) fail(`Região ${region.id}: controle político inexistente (${region.kingdomId}).`)
  const bounds = region.bounds
  if (!bounds || !inside(bounds.xMin, 0, 100) || !inside(bounds.xMax, 0, 100) || !inside(bounds.yMin, 0, 100) || !inside(bounds.yMax, 0, 100)) {
    fail(`Região ${region.id}: limites devem estar normalizados entre 0 e 100.`)
  } else if (bounds.xMin >= bounds.xMax || bounds.yMin >= bounds.yMax) {
    fail(`Região ${region.id}: limites mínimos devem ser menores que os máximos.`)
  }
  if (!Array.isArray(region.polygon) || region.polygon.length < 3) fail(`Região ${region.id}: polígono inválido.`)
  for (const [index, coordinate] of (region.polygon ?? []).entries()) {
    if (!Array.isArray(coordinate) || coordinate.length !== 2 || !inside(coordinate[0], 0, 100) || !inside(coordinate[1], 0, 100)) {
      fail(`Região ${region.id}: vértice ${index} fora do sistema normalizado.`)
    }
  }
}

const requiredPointFields = [
  'id', 'slug', 'name', 'label', 'type', 'layer', 'regionId', 'kingdomId', 'summary', 'description',
  'coordinatePrecision', 'visibility', 'climate', 'terrain', 'status', 'population', 'politicalControl',
  'danger', 'referenceDate', 'truthStatus',
]
const allowedPrecision = new Set(['confirmed', 'regional', 'approximate'])
const imageOwners = new Map()

for (const point of canonicalAtlasPoints) {
  for (const field of requiredPointFields) requireValue(point[field], `ponto ${point.id ?? '(sem id)'}.${field}`)
  if (!layerIds.has(point.layer)) fail(`Ponto ${point.id}: camada inexistente (${point.layer}).`)
  if (!regionIds.has(point.regionId)) fail(`Ponto ${point.id}: região inexistente (${point.regionId}).`)
  if (!entityIds.has(point.kingdomId)) fail(`Ponto ${point.id}: controle político inexistente (${point.kingdomId}).`)
  if (!allowedPrecision.has(point.coordinatePrecision)) fail(`Ponto ${point.id}: precisão inválida (${point.coordinatePrecision}).`)
  if (point.visibility !== 'public') fail(`Ponto ${point.id}: somente registros públicos podem integrar o Atlas entregue.`)
  if (point.referenceDate !== '1204 d.C.') fail(`Ponto ${point.id}: data de referência divergente (${point.referenceDate}).`)
  if (!inside(point.x, 0, 100) || !inside(point.y, 0, 100)) fail(`Ponto ${point.id}: coordenada fora de 0–100.`)
  if (point.slug !== point.id) fail(`Ponto ${point.id}: slug deve coincidir com o id estável.`)
  if (point.href && !point.href.startsWith('/')) fail(`Ponto ${point.id}: href deve ser uma rota interna absoluta.`)

  const region = regionById.get(point.regionId)
  if (region?.bounds && (!inside(point.x, region.bounds.xMin, region.bounds.xMax) || !inside(point.y, region.bounds.yMin, region.bounds.yMax))) {
    fail(`Ponto ${point.id}: coordenada (${point.x}, ${point.y}) não pertence aos limites declarados de ${region.name}.`)
  }
  if (region?.polygon && !pointInsidePolygon(point.x, point.y, region.polygon)) {
    fail(`Ponto ${point.id}: coordenada (${point.x}, ${point.y}) está fora do polígono político/geográfico de ${region.name}.`)
  }
  for (const field of ['relatedCharacters', 'relatedHouses', 'relatedEvents', 'relatedWars', 'relatedRecords']) {
    if (!Array.isArray(point[field])) {
      fail(`Ponto ${point.id}: ${field} deve ser uma lista pública, mesmo quando vazia.`)
      continue
    }
    if (point[field].some((entry) => typeof entry !== 'string' || !entry.trim())) fail(`Ponto ${point.id}: ${field} contém associação vazia ou inválida.`)
    if (new Set(point[field]).size !== point[field].length) fail(`Ponto ${point.id}: ${field} contém associações duplicadas.`)
  }
  for (const name of point.relatedCharacters ?? []) {
    if (!publicCharacterNames.has(name)) fail(`Ponto ${point.id}: personagem relacionado inexistente (${name}).`)
  }
  for (const name of point.relatedHouses ?? []) {
    if (!publicHouseNames.has(name)) fail(`Ponto ${point.id}: Casa ou clã relacionado inexistente (${name}).`)
  }
  for (const name of point.relatedWars ?? []) {
    if (!publicWarNames.has(name)) fail(`Ponto ${point.id}: conflito relacionado inexistente (${name}).`)
  }
  for (const route of point.relatedRecords ?? []) {
    if (!publicRecordRoutes.has(route)) fail(`Ponto ${point.id}: registro relacionado inexistente (${route}).`)
  }
  const travelProfile = travelProfileForPoint(point.id)
  if (!travelProfile || travelProfile.pointId !== point.id) fail(`Ponto ${point.id}: perfil de viagem ausente.`)
  if (!travelProfile?.connections.length && travelProfile?.networkStatus !== 'local-access-unrecorded') {
    fail(`Ponto ${point.id}: acesso sem rota precisa ser explicitamente classificado como não registrado.`)
  }
  for (const connection of travelProfile?.connections ?? []) {
    if (!routeIds.has(connection.routeId)) fail(`Ponto ${point.id}: perfil de viagem referencia rota inexistente (${connection.routeId}).`)
    for (const field of ['routeName', 'destinationId', 'destinationName', 'mode', 'status', 'danger', 'season']) {
      requireValue(connection[field], `perfil de viagem ${point.id}.${connection.routeId}.${field}`)
    }
  }
  findRestrictedKeys(point, ['points', point.id])
  await validateAsset(point.image, `ponto ${point.id}.image`)
  if (point.image) {
    const existingOwner = imageOwners.get(point.image)
    if (existingOwner) fail(`Pontos ${existingOwner} e ${point.id}: uma imagem individual não pode representar dois lugares diferentes (${point.image}).`)
    imageOwners.set(point.image, point.id)
  }
}

const routeEndpointIds = new Set()
for (const route of atlasRoutes) {
  const label = `rota ${route.id}`
  for (const field of ['id', 'name', 'from', 'to', 'mode', 'distanceKm', 'durationDays', 'description', 'danger', 'status', 'visibility', 'referenceDate']) {
    requireValue(route[field], `${label}.${field}`)
  }
  const fromPoint = canonicalAtlasPoints.find((point) => point.id === route.from)
  const toPoint = canonicalAtlasPoints.find((point) => point.id === route.to)
  if (!fromPoint || !toPoint) fail(`${label}: terminal inexistente (${route.from} → ${route.to}).`)
  if (route.from === route.to) fail(`${label}: partida e destino não podem coincidir.`)
  if (!Number.isFinite(route.distanceKm) || route.distanceKm <= 0) fail(`${label}: distância deve ser positiva.`)
  if (!Number.isFinite(route.durationDays?.min) || !Number.isFinite(route.durationDays?.max) || route.durationDays.min <= 0 || route.durationDays.max < route.durationDays.min) {
    fail(`${label}: intervalo de duração inválido.`)
  }
  if (route.visibility !== 'public') fail(`${label}: rota não pública exposta.`)
  if (route.referenceDate !== '1204 d.C.') fail(`${label}: data de referência divergente.`)
  routeEndpointIds.add(route.from)
  routeEndpointIds.add(route.to)
  if (fromPoint && toPoint) {
    for (const [index, coordinate] of routeGeometry(route).entries()) {
      if (!inside(coordinate[0], 0, 100) || !inside(coordinate[1], 0, 100)) fail(`${label}: coordenada ${index} fora de 0–100.`)
    }
  }
  if (route.mode === 'fluvial' && fromPoint && toPoint) {
    const navigableTypes = new Set(['capital', 'porto', 'mar', 'regiao'])
    if (!navigableTypes.has(fromPoint?.type) || !navigableTypes.has(toPoint?.type)) fail(`${label}: trecho fluvial termina fora de porto, margem, mar ou núcleo navegável.`)
    if (!/rio|canal|margem|balsa|fluvial/i.test(`${route.name} ${route.description}`)) fail(`${label}: coerência hidrográfica não foi descrita.`)
  }
  if (route.mode === 'maritima' && fromPoint && toPoint) {
    const maritimeTypes = new Set(['capital', 'porto', 'arquipelago', 'mar'])
    if (!maritimeTypes.has(fromPoint?.type) || !maritimeTypes.has(toPoint?.type)) fail(`${label}: trecho marítimo possui terminal incompatível com costa ou águas abertas.`)
  }
  findRestrictedKeys(route, ['routes', route.id])
}

const firstEndpoint = routeEndpointIds.values().next().value
for (const endpoint of routeEndpointIds) {
  if (!findAtlasRoute(firstEndpoint, endpoint, 'distance')) fail(`A malha pública está desconectada entre ${firstEndpoint} e ${endpoint}.`)
}

const allowedHistoricalClassifications = new Set(['historical-reconstruction', 'apocryphal', 'disputed-study', 'political-proposal', 'explorer-map'])
for (const map of historicalMaps) {
  for (const field of ['id', 'title', 'classification', 'period', 'authority', 'producedBy', 'publicUse', 'warning', 'image', 'preview']) {
    requireValue(map[field], `mapa histórico ${map.id}.${field}`)
  }
  if (!allowedHistoricalClassifications.has(map.classification)) fail(`Mapa histórico ${map.id}: classificação editorial não reconhecida.`)
  if (/oficial|canônic/i.test(map.authority) && !/sem autoridade/i.test(map.authority)) fail(`Mapa histórico ${map.id}: autoridade ambígua em relação ao mapa oficial.`)
  await validateAsset(map.image, `mapa histórico ${map.id}.image`)
  await validateAsset(map.preview, `mapa histórico ${map.id}.preview`)
}

await validateAsset(canonicalMap.image, 'canonicalMap.image')
await validateAsset(canonicalMap.preview, 'canonicalMap.preview')
await validateAsset(canonicalMap.sourceMaster, 'canonicalMap.sourceMaster')

if (!canonicalAtlasPoints.some((point) => point.id === 'lethariel')) fail('Lethariel deve constar como capital pública de Sylvaris.')
const vulGar = canonicalAtlasPoints.find((point) => point.id === 'vul-gar')
if (!vulGar || !/região cultural/i.test(vulGar.description)) fail('Vul’Gar deve permanecer descrita como região cultural, não reino unificado.')
if (!canonicalMap.editorialCorrections.some((note) => /Aeloria.+erro cartográfico/i.test(note))) fail('A correção pública Aeloria → Lethariel precisa estar documentada.')
if (!canonicalMap.editorialCorrections.some((note) => /1024.+1204/i.test(note))) fail('A divergência temporal 1024 → 1204 do raster-base precisa estar documentada.')

for (const [label, input] of [
  ['coordenada de ponto', { locations: { winterheim: { x: 41 } } }],
  ['distância de rota', { routes: { 'estrada-do-norte': { distanceKm: 1 } } }],
]) {
  let rejected = false
  try {
    createCampaignAtlasState(input)
  } catch {
    rejected = true
  }
  if (!rejected) fail(`Crônicas Vivas: o adapter aceitou mutação proibida de ${label}.`)
}

try {
  createCampaignAtlasState({
    chronicleId: 'validacao-atlas',
    locations: { winterheim: { state: 'ameaçado' } },
    routes: { 'estrada-do-norte': { state: 'vigiada', delayDays: 2 } },
  })
} catch (error) {
  fail(`Crônicas Vivas: um estado transitório válido foi recusado (${error.message}).`)
}

if (warnings.length) {
  console.warn(`Atlas: ${warnings.length} aviso(s)`)
  warnings.forEach((message) => console.warn(`  - ${message}`))
}

if (errors.length) {
  console.error(`Atlas inválido: ${errors.length} erro(s)`)
  errors.forEach((message) => console.error(`  - ${message}`))
  process.exitCode = 1
} else {
  console.log(`Atlas válido: 1 mapa oficial · ${canonicalAtlasPoints.length} pontos · ${atlasRegions.length} regiões · ${atlasRoutes.length} trechos · ${historicalMaps.length} cartas comparadas.`)
}

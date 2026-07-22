import { atlasRoutes, canonicalAtlasPoints } from './canonicalMap.js'

export const campaignLocationStates = [
  'inalterado', 'ameaçado', 'ocupado', 'isolado', 'danificado', 'destruído',
  'reconstrução', 'conquistado', 'fratura-aberta',
]

export const campaignRouteStates = ['aberta', 'vigiada', 'restrita', 'ocupada', 'bloqueada', 'destruída']

const pointIds = new Set(canonicalAtlasPoints.map(({ id }) => id))
const routeIds = new Set(atlasRoutes.map(({ id }) => id))
const immutableGeographyKeys = new Set(['x', 'y', 'regionId', 'kingdomId', 'from', 'to', 'via', 'distanceKm'])

function assertOverrides(overrides, validIds, kind) {
  for (const [id, value] of Object.entries(overrides ?? {})) {
    if (!validIds.has(id)) throw new Error(`${kind} de campanha referencia ID geográfico inexistente: ${id}`)
    for (const key of Object.keys(value ?? {})) {
      if (immutableGeographyKeys.has(key)) throw new Error(`${kind} de campanha não pode alterar a geografia canônica (${id}.${key})`)
    }
  }
}

export function createCampaignAtlasState(input = {}) {
  const locations = structuredClone(input.locations ?? {})
  const routes = structuredClone(input.routes ?? {})
  assertOverrides(locations, pointIds, 'Local')
  assertOverrides(routes, routeIds, 'Rota')
  for (const [id, state] of Object.entries(locations)) {
    if (state.state && !campaignLocationStates.includes(state.state)) throw new Error(`Estado de local inválido em ${id}: ${state.state}`)
  }
  for (const [id, state] of Object.entries(routes)) {
    if (state.state && !campaignRouteStates.includes(state.state)) throw new Error(`Estado de rota inválido em ${id}: ${state.state}`)
    if (state.delayDays != null && (!Number.isFinite(state.delayDays) || state.delayDays < 0)) throw new Error(`Atraso de rota inválido em ${id}`)
  }
  return Object.freeze({
    chronicleId: input.chronicleId ?? 'sem-campanha',
    updatedAt: input.updatedAt ?? null,
    locations: Object.freeze(locations),
    routes: Object.freeze(routes),
  })
}

export function materializeCampaignAtlas(input = {}) {
  const state = createCampaignAtlasState(input)
  return {
    points: canonicalAtlasPoints.map((point) => ({ ...point, campaign: state.locations[point.id] ?? { state: 'inalterado' } })),
    routes: atlasRoutes.map((route) => ({ ...route, campaign: state.routes[route.id] ?? { state: 'aberta', delayDays: 0 } })),
    campaign: state,
  }
}

export function estimateCampaignTravel(startId, endId, input = {}, metric = 'distance') {
  if (!pointIds.has(startId) || !pointIds.has(endId)) return null
  if (startId === endId) return { pointIds: [startId], routeIds: [], distanceKm: 0, durationDays: { min: 0, max: 0 }, campaignDelayDays: 0 }
  const state = createCampaignAtlasState(input)
  const edges = new Map(canonicalAtlasPoints.map(({ id }) => [id, []]))
  for (const route of atlasRoutes) {
    const change = state.routes[route.id] ?? {}
    if (['bloqueada', 'destruída'].includes(change.state)) continue
    const delay = change.delayDays ?? 0
    const baseTime = (route.durationDays.min + route.durationDays.max) / 2
    const weight = metric === 'time' ? baseTime + delay : route.distanceKm
    edges.get(route.from)?.push({ to: route.to, route, delay, weight })
    edges.get(route.to)?.push({ to: route.from, route, delay, weight })
  }

  const distance = new Map([[startId, 0]])
  const previous = new Map()
  const pending = new Set(edges.keys())
  while (pending.size) {
    let current
    let best = Number.POSITIVE_INFINITY
    for (const id of pending) {
      const candidate = distance.get(id) ?? Number.POSITIVE_INFINITY
      if (candidate < best) { best = candidate; current = id }
    }
    if (!current || !Number.isFinite(best)) break
    pending.delete(current)
    if (current === endId) break
    for (const edge of edges.get(current) ?? []) {
      const candidate = best + edge.weight
      if (pending.has(edge.to) && candidate < (distance.get(edge.to) ?? Number.POSITIVE_INFINITY)) {
        distance.set(edge.to, candidate)
        previous.set(edge.to, { from: current, ...edge })
      }
    }
  }

  if (!previous.has(endId)) return null
  const pointPath = [endId]
  const used = []
  for (let cursor = endId; cursor !== startId;) {
    const step = previous.get(cursor)
    if (!step) return null
    used.unshift(step)
    pointPath.unshift(step.from)
    cursor = step.from
  }
  const delay = used.reduce((total, step) => total + step.delay, 0)
  return {
    pointIds: pointPath,
    routeIds: used.map(({ route }) => route.id),
    distanceKm: used.reduce((total, { route }) => total + route.distanceKm, 0),
    durationDays: used.reduce((total, { route }) => ({ min: total.min + route.durationDays.min, max: total.max + route.durationDays.max }), { min: delay, max: delay }),
    campaignDelayDays: delay,
  }
}

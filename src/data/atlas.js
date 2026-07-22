export {
  ATLAS_REFERENCE_YEAR,
  atlasLayers,
  atlasRegions,
  atlasRoutes,
  canonicalAtlasPoints,
  canonicalMap,
  findAtlasRoute,
  historicalMaps,
  pointById,
  politicalEntities,
  politicalRelations,
  routeGeometry,
} from './canonicalMap.js'

// Aliases kept for consumers that still use the original Atlas data names.
export {
  canonicalAtlasPoints as atlasPoints,
  politicalRelations as atlasRelations,
} from './canonicalMap.js'

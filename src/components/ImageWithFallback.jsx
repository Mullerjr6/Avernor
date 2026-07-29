import { useState } from 'react'
import { assets } from '../data/assets'

function responsiveVariant(src = '') {
  if (/jornada-floresta-antiga-card\.webp$/i.test(src)) return { width: 720, height: 576 }
  if (/jornada-floresta-antiga-banner\.webp$/i.test(src)) return { width: 1600, height: 1029 }
  if (/-card\.webp$/i.test(src) || /-page\.webp$/i.test(src)) {
    const base = src.replace(/-(?:card|page)\.webp$/i, '')
    const landscape = /\/(?:backgrounds|cities|gallery|locations|atlas-plates|archive-plates|lore-locations|lore-legends)\//i.test(src)
    const book = /\/(?:books|lore-books)\//i.test(src)
    return landscape
      ? { srcSet: `${base}-card.webp 720w, ${base}-page.webp 1600w`, sizes: '(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 720px', width: 720, height: 405 }
      : { srcSet: `${base}-card.webp 640w, ${base}-page.webp 960w`, sizes: '(max-width: 640px) 100vw, (max-width: 1100px) 45vw, 480px', width: 640, height: book ? 960 : 800 }
  }
  if (/-preview\.webp$/i.test(src) || /-large\.webp$/i.test(src)) {
    const base = src.replace(/-(?:preview|large)\.webp$/i, '')
    return { srcSet: `${base}-preview.webp 768w, ${base}-large.webp 2048w`, sizes: '100vw', width: 768, height: 512 }
  }
  return {}
}

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  fallback = 'default',
  loading = 'lazy',
  sizes,
  srcSet,
  objectPosition,
  fetchPriority,
  width,
  height,
}) {
  const fallbackSrc = assets.placeholders[fallback] ?? assets.placeholders.default
  const requestedSrc = src || fallbackSrc
  const [failedSrc, setFailedSrc] = useState('')
  const [loadedSrc, setLoadedSrc] = useState('')
  const currentSrc = failedSrc === requestedSrc ? fallbackSrc : requestedSrc
  const loaded = loadedSrc === currentSrc
  const inferred = responsiveVariant(src)

  return (
    <img
      className={`progressive-image ${loaded ? 'is-loaded' : ''} ${className}`.trim()}
      src={currentSrc}
      srcSet={currentSrc === src ? (srcSet ?? inferred.srcSet) : undefined}
      sizes={currentSrc === src ? (sizes ?? inferred.sizes) : undefined}
      width={width ?? inferred.width}
      height={height ?? inferred.height}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      draggable="false"
      style={objectPosition ? { objectPosition } : undefined}
      onLoad={() => setLoadedSrc(currentSrc)}
      onError={() => {
        if (currentSrc !== fallbackSrc) setFailedSrc(requestedSrc)
      }}
    />
  )
}

import { useState } from 'react'
import { assets } from '../data/assets'

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
}) {
  const fallbackSrc = assets.placeholders[fallback] ?? assets.placeholders.default
  const requestedSrc = src || fallbackSrc
  const [failedSrc, setFailedSrc] = useState('')
  const [loadedSrc, setLoadedSrc] = useState('')
  const currentSrc = failedSrc === requestedSrc ? fallbackSrc : requestedSrc
  const loaded = loadedSrc === currentSrc

  return (
    <img
      className={`progressive-image ${loaded ? 'is-loaded' : ''} ${className}`.trim()}
      src={currentSrc}
      srcSet={currentSrc === src ? srcSet : undefined}
      sizes={sizes}
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

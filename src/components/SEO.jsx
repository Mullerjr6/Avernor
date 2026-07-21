import { useEffect } from 'react'

const defaultDescription = 'Enciclopédia oficial do universo original de Avernor: história, personagens, reinos, criaturas e a saga de Sirius Kayler.'

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

export default function SEO({ title, description = defaultDescription, image = '/assets/images/maps/avernor-map-atlas-preview.webp' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Crônicas de Avernor` : 'Crônicas de Avernor — Enciclopédia oficial'
    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:image', image)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
  }, [title, description, image])

  return null
}


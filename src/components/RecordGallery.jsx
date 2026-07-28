import ImageWithFallback from './ImageWithFallback'

function galleryEntry(entry, index, recordName) {
  if (typeof entry === 'string') {
    return {
      src: entry,
      alt: `Registro visual complementar de ${recordName}`,
      caption: `Imagem ${index + 1} preservada no dossiê.`,
    }
  }
  return {
    src: entry.src ?? entry.image,
    alt: entry.alt ?? `Registro visual complementar de ${recordName}`,
    caption: entry.caption ?? entry.note ?? `Imagem ${index + 1} preservada no dossiê.`,
    objectPosition: entry.objectPosition,
  }
}

export default function RecordGallery({ items, recordName, fallback = 'default' }) {
  if (!items?.length) return null

  return (
    <section id="galeria-do-registro" className="record-gallery" aria-labelledby="record-gallery-title">
      <span className="section-number">▧</span>
      <h2 id="record-gallery-title">Galeria do registro</h2>
      <p>Imagens públicas vinculadas a este dossiê; ausências não são preenchidas com representações não canônicas.</p>
      <div className="record-gallery-grid">
        {items.map((entry, index) => {
          const image = galleryEntry(entry, index, recordName)
          return (
            <figure key={`${image.src}-${index}`}>
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                fallback={fallback}
                objectPosition={image.objectPosition}
                sizes="(max-width: 760px) 100vw, 720px"
              />
              <figcaption>{image.caption}</figcaption>
            </figure>
          )
        })}
      </div>
    </section>
  )
}

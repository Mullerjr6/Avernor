import { useEffect, useRef, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import ImageWithFallback from '../components/ImageWithFallback'
import SectionTitle from '../components/SectionTitle'
import SEO from '../components/SEO'
import { galleryItems } from '../data/gallery'

export default function GalleryPage() {
  const [active, setActive] = useState(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (active !== null && dialog && !dialog.open) dialog.showModal()
    if (active === null && dialog?.open) dialog.close()
  }, [active])

  useEffect(() => {
    function onKeyDown(event) {
      if (active === null) return
      if (event.key === 'Escape') setActive(null)
      if (event.key === 'ArrowRight') setActive((active + 1) % galleryItems.length)
      if (event.key === 'ArrowLeft') setActive((active - 1 + galleryItems.length) % galleryItems.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])

  const item = active === null ? null : galleryItems[active]

  return (
    <>
      <SEO title="Galeria" description="Retratos, paisagens e mapas preservados pelo Arquivo de Avernor." />
      <div className="page-masthead">
        <div className="content-section page-masthead-inner">
          <Breadcrumbs items={[{ label: 'Galeria' }]} />
          <SectionTitle kicker="Iconografia do continente" title="Galeria do Arquivo" description="Retratos oficiais, cenas de jornada e cartas cartográficas preservadas em alta definição." as="h1" />
        </div>
      </div>
      <section className="content-section gallery-grid" aria-label="Obras preservadas no Arquivo">
        {galleryItems.map((galleryItem, index) => (
          <button type="button" key={galleryItem.src} className={index === 5 || index > 6 ? 'gallery-wide' : ''} onClick={() => setActive(index)}>
            <ImageWithFallback src={galleryItem.thumb} alt={galleryItem.alt} fallback={galleryItem.src.includes('/maps/') || galleryItem.src.includes('/locations/') ? 'location' : 'character'} />
            <i aria-hidden="true">{String(index + 1).padStart(2, '0')}</i>
            <span><strong>{galleryItem.title}</strong><small>{galleryItem.kind} · ampliar</small></span>
          </button>
        ))}
      </section>
      <dialog ref={dialogRef} className="lightbox" onClose={() => setActive(null)} onClick={(event) => { if (event.target === dialogRef.current) setActive(null) }}>
        {item && <div className="lightbox-content">
          <button type="button" className="lightbox-close" onClick={() => setActive(null)} aria-label="Fechar imagem">×</button>
          <button type="button" className="lightbox-prev" onClick={() => setActive((active - 1 + galleryItems.length) % galleryItems.length)} aria-label="Imagem anterior">‹</button>
          <ImageWithFallback src={item.src} alt={item.alt} fallback="default" loading="eager" />
          <button type="button" className="lightbox-next" onClick={() => setActive((active + 1) % galleryItems.length)} aria-label="Próxima imagem">›</button>
          <div className="lightbox-caption"><span>{String(active + 1).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')}</span><p><strong>{item.title}</strong><small>{item.kind} · use ← → para navegar</small></p></div>
        </div>}
      </dialog>
    </>
  )
}

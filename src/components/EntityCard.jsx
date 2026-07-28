import { Link } from 'react-router'
import { visualFor } from '../data/visuals'
import ImageWithFallback from './ImageWithFallback'
import TruthBadge from './TruthBadge'

export default function EntityCard({ item, to, placeholder = 'default', featured = false, tone = 'archive', index }) {
  const meta = [item.category, item.period || item.kingdom || item.location].filter(Boolean).join(' · ')
  const hasImage = Boolean(item.thumbnail || item.image)
  const visual = visualFor(item)

  return (
    <article
      className={`entity-card entity-card-${tone} ${hasImage ? 'has-image' : 'is-placeholder'} ${featured ? 'entity-card-featured' : ''}`}
      style={visual.accent ? { '--entity-accent': visual.accent } : undefined}
    >
      <Link to={to} className="entity-card-link" aria-label={`Abrir registro: ${item.name}`}>
        <div className="entity-card-media">
          <ImageWithFallback
            src={item.thumbnail || item.image}
            alt={item.imageAlt || (hasImage ? `Ilustração de ${item.name}` : `Representação provisória de ${item.name}`)}
            fallback={placeholder}
            sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
            objectPosition={visual.thumbnailPosition || item.objectPosition}
          />
          <span className="image-corner image-corner-a" aria-hidden="true" />
          <span className="image-corner image-corner-b" aria-hidden="true" />
          {index && <span className="entity-card-index" aria-hidden="true">{String(index).padStart(2, '0')}</span>}
          <div className="card-badges"><TruthBadge status={item.truthStatus} compact />{item.status && <span className="status-badge">{item.status}</span>}</div>
        </div>
        <div className="entity-card-body">
          {meta && <span className="kicker">{meta}</span>}
          {item.imageScope === 'thematic' && <span className="entity-visual-note">Prancha temática do acervo</span>}
          {item.imageScope === 'regional' && <span className="entity-visual-note">Prancha regional do Atlas</span>}
          <h2>{item.name}</h2>
          {item.subtitle && <p className="entity-card-subtitle">{item.subtitle}</p>}
          <p>{item.summary}</p>
          <span className="text-link" aria-hidden="true">Consultar registro <span>→</span></span>
        </div>
      </Link>
    </article>
  )
}

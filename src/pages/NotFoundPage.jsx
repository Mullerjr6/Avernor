import { Link, useLocation } from 'react-router'
import ImageWithFallback from '../components/ImageWithFallback'
import OrnamentalDivider from '../components/OrnamentalDivider'
import SEO from '../components/SEO'
import { assets } from '../data/assets'

export default function NotFoundPage() {
  const location = useLocation()
  const requested = location.state?.requested || location.pathname
  return (
    <section className="not-found-page">
      <SEO title="Registro não encontrado" description="A página procurada não foi localizada no Arquivo de Avernor." />
      <div className="not-found-map" aria-hidden="true"><ImageWithFallback src={assets.maps.historical} alt="" loading="eager" fallback="location" /></div>
      <div className="not-found-shade" aria-hidden="true" />
      <div className="not-found-content">
        <div className="not-found-rune" aria-hidden="true">404</div>
        <span className="kicker">O caminho foi apagado</span>
        <h1>Este registro não chegou ao Arquivo.</h1>
        <OrnamentalDivider />
        <p>O endereço <code>{requested}</code> pode ter sido movido, perdido durante a Caça às Bruxas ou jamais ter existido.</p>
        <div className="hero-actions"><Link className="button button-primary" to="/">Voltar ao início</Link><Link className="button button-secondary" to="/biblioteca">Consultar a biblioteca</Link></div>
      </div>
    </section>
  )
}

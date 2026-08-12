import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import BackToTop from './BackToTop'

const GlobalSearch = lazy(() => import('./GlobalSearch'))

const primaryLinks = [
  ['/historia', 'História'],
  ['/cronologia', 'Cronologia'],
  ['/personagens', 'Personagens'],
  ['/genealogias', 'Genealogias'],
  ['/atlas', 'Atlas'],
]

const archiveLinks = [
  ['/busca', 'Índice geral'],
  ['/reinos', 'Reinos'], ['/cidades', 'Cidades'], ['/casas', 'Casas'], ['/dinastias', 'Dinastias'], ['/sucessoes', 'Sucessões'],
  ['/povos', 'Povos'], ['/bestiario', 'Bestiário'], ['/guerras', 'Guerras'], ['/artefatos', 'Artefatos'], ['/reliquias', 'Relíquias'],
  ['/mitologia', 'Mitologia'], ['/religioes', 'Religiões'], ['/cosmologia', 'Cosmologia'], ['/portais', 'Portais'], ['/outros-mundos', 'Outros mundos'],
  ['/retornados', 'Retornados'], ['/profecias', 'Profecias'], ['/fim-dos-tempos', 'Fim dos Tempos'], ['/necromancia', 'Necromancia'],
  ['/nar-khalion', 'Nar-Khalion'], ['/celestiais', 'Celestiais'], ['/lancas', 'Lanças'], ['/faccoes', 'Facções'],
  ['/lendas', 'Lendas'], ['/biblioteca', 'Biblioteca'], ['/galeria', 'Galeria'], ['/sobre', 'Sobre o arquivo'],
]

export default function Layout({ children }) {
  const [open, setOpen] = useState(false)
  const archiveMenu = useRef(null)
  const location = useLocation()

  useEffect(() => {
    if (archiveMenu.current) archiveMenu.current.open = false
    if (location.hash) {
      let frame
      let attempts = 0
      const scrollToAnchor = () => {
        const target = document.getElementById(location.hash.slice(1))
        if (target) target.scrollIntoView({ block: 'start' })
        else if (attempts++ < 20) frame = window.requestAnimationFrame(scrollToAnchor)
      }
      frame = window.requestAnimationFrame(scrollToAnchor)
      return () => window.cancelAnimationFrame(frame)
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
    return undefined
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!open) return undefined
    function closeOnEscape(event) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo</a>
      <header className="topbar">
        <Link className="brand" to="/" onClick={() => setOpen(false)} aria-label="Crônicas de Avernor — página inicial">
          <span className="brand-mark" aria-hidden="true"><span>A</span></span>
          <span className="brand-copy"><strong>Crônicas de Avernor</strong><small>Arquivo Real de Sylvaris</small></span>
        </Link>

        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="main-navigation">
          <span aria-hidden="true">{open ? '×' : '☰'}</span><span className="sr-only">{open ? 'Fechar menu' : 'Abrir menu'}</span>
        </button>

        <div className={`navigation-shell ${open ? 'is-open' : ''}`} id="main-navigation">
          <Suspense fallback={<div className="global-search global-search-loading" aria-label="Carregando busca">Carregando busca…</div>}>
            <GlobalSearch onNavigate={() => setOpen(false)} />
          </Suspense>
          <nav className="main-nav" aria-label="Navegação principal">
            {primaryLinks.map(([to, label]) => (
              <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'active' : undefined}>{label}</NavLink>
            ))}
            <details ref={archiveMenu} className="archive-menu">
              <summary>Acervo <span aria-hidden="true">▾</span></summary>
              <div>
                {archiveLinks.map(([to, label]) => (
                  <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'active' : undefined}>{label}</NavLink>
                ))}
              </div>
            </details>
          </nav>
        </div>
      </header>

      {open && <button type="button" className="navigation-scrim" onClick={() => setOpen(false)} aria-label="Fechar navegação" />}

      <main id="conteudo-principal"><div key={location.pathname} className="route-stage">{children}</div></main>

      <footer className="site-footer">
        <div>
          <Link className="footer-brand" to="/">Crônicas de Avernor</Link>
          <p>Uma enciclopédia viva sobre um continente de sangue, magia e juramentos.</p>
        </div>
        <nav aria-label="Navegação do rodapé">
          <Link to="/busca">Índice geral</Link><Link to="/genealogias">Genealogias</Link><Link to="/cosmologia">Cosmologia</Link><Link to="/biblioteca">Biblioteca</Link><Link to="/galeria">Galeria</Link><Link to="/sobre">Sobre</Link>
        </nav>
        <small>Universo original de Júnior Maia Müller · Arquivo atualizado em 12 de agosto de 2026</small>
      </footer>
      <BackToTop />
    </div>
  )
}

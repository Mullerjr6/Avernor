export default function TitleScreen({ hasSave, onStart, onContinue }) {
  return (
    <main className="title-screen">
      <div className="title-backdrop" />
      <section className="title-content">
        <div className="sigil" aria-hidden="true"><span>A</span></div>
        <p className="eyebrow">CRÔNICAS DE AVERNOR APRESENTA</p>
        <h1>Crônicas <em>Vivas</em></h1>
        <div className="title-divider"><span />✦<span /></div>
        <p className="chapter-label">CAPÍTULO ZERO</p>
        <h2>O Grito na Floresta</h2>
        <p className="title-copy">A caminho de Sylvaris, Sirius ouve um grito entre as árvores. Depois do resgate, cada palavra passa a viver na memória de uma história que continua avançando.</p>
        <div className="title-actions">
          {hasSave && <button className="primary-action" type="button" onClick={onContinue}>Continuar jornada</button>}
          <button className={hasSave ? 'secondary-action' : 'primary-action'} type="button" onClick={onStart}>
            {hasSave ? 'Recomeçar capítulo' : 'Iniciar capítulo'}
          </button>
        </div>
        <p className="autosave-note">O progresso é salvo automaticamente neste aparelho.</p>
      </section>
    </main>
  )
}

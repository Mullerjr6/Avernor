import { canonById } from '../data/knowledge.js'

const characterNames = { elara: 'Elara', 'rainha-aelwen': 'Aelwen', 'mercenario-orc': 'Mercenário da clareira' }

export default function CodexDrawer({ discovered, inventory, relationships, memories = [], playerActions = [], progress = {}, open, onClose }) {
  const records = discovered.map((id) => canonById[id]).filter(Boolean)
  return (
    <aside className={`codex-drawer ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open} aria-label="Códice da jornada">
      <button className="drawer-close" type="button" onClick={onClose} aria-label="Fechar códice">×</button>
      <p className="eyebrow">ARQUIVO DE CAMPO</p>
      <h2>Códice de Sirius</h2>
      <p className="drawer-intro">Somente registros encontrados, testemunhos preservados e memórias desta jornada aparecem aqui.</p>

      <section className="codex-summary">
        <div><strong>{progress.records ?? records.length}</strong><span>registros</span></div>
        <div><strong>{progress.scenes ?? 1}</strong><span>cenas vividas</span></div>
        <div><strong>{progress.facts ?? 0}</strong><span>marcos</span></div>
      </section>

      <section>
        <h3>Registros descobertos</h3>
        <div className="codex-records">
          {records.map((record) => (
            <article key={record.id}>
              <span>{record.category ?? 'Registro'}</span>
              <strong>{record.name}</strong>
              <p>{record.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h3>Inventário da jornada</h3>
        <ul>{inventory.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section>
        <h3>Vínculos</h3>
        <dl>
          {Object.entries(relationships).map(([id, relationship]) => (
            <div key={id}><dt>{characterNames[id] ?? id}</dt><dd>{relationshipLabel(relationship)}</dd></div>
          ))}
        </dl>
      </section>

      {memories.length > 0 && (
        <section>
          <h3>Memórias da jornada</h3>
          <ul className="journey-memories">{memories.map((memory) => <li key={memory.id}>{memory.summary}</li>)}</ul>
        </section>
      )}

      {playerActions.length > 0 && (
        <section>
          <h3>Atos declarados de Sirius</h3>
          <p className="codex-action-note">Gestos incorporados à continuidade desta crônica. Seus efeitos são resolvidos pelo narrador.</p>
          <ul className="codex-player-actions">{playerActions.map((action) => <li key={action.id}>{action.text}</li>)}</ul>
        </section>
      )}
    </aside>
  )
}

function relationshipLabel(relationship = {}) {
  const labels = {
    stranger: 'Ainda não definido', acquaintance: 'Reconhecimento cauteloso', ally: 'Aliança nascente',
    friend: 'Confiança escolhida', close_friend: 'Vínculo profundo', romantic_interest: 'Afeto em descoberta',
    partner: 'Companheirismo íntimo', rival: 'Rivalidade respeitosa', enemy: 'Ruptura aberta',
  }
  return labels[relationship.relationshipStage] ?? 'Ainda não definido'
}

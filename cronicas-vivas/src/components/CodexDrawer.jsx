import { canonById } from '../data/knowledge.js'

export default function CodexDrawer({ discovered, inventory, relationships, flags, open, onClose }) {
  const records = discovered.map((id) => canonById[id]).filter(Boolean)
  const memories = journeyMemories(flags)
  return (
    <aside className={`codex-drawer ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open} aria-label="Códice da jornada">
      <button className="drawer-close" type="button" onClick={onClose} aria-label="Fechar códice">×</button>
      <p className="eyebrow">ARQUIVO DE CAMPO</p>
      <h2>Códice de Sirius</h2>
      <p className="drawer-intro">Somente conhecimentos encontrados nesta jornada aparecem aqui.</p>

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
        <h3>Inventário</h3>
        <ul>{inventory.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section>
        <h3>Vínculos</h3>
        <dl>
          <div><dt>Elara</dt><dd>{relationshipLabel(relationships.elara)}</dd></div>
          <div><dt>Aelwen</dt><dd>{relationshipLabel(relationships.aelwen)}</dd></div>
        </dl>
      </section>

      {memories.length > 0 && (
        <section>
          <h3>Memórias da jornada</h3>
          <ul className="journey-memories">{memories.map((memory) => <li key={memory}>{memory}</li>)}</ul>
        </section>
      )}
    </aside>
  )
}

function relationshipLabel(value = 0) {
  if (value >= 6) return 'Vínculo profundo'
  if (value >= 4) return 'Confiança escolhida'
  if (value >= 2) return 'Confiança nascente'
  if (value >= 1) return 'Respeito cauteloso'
  if (value <= -4) return 'Ruptura'
  if (value <= -2) return 'Desconfiança aberta'
  if (value < 0) return 'Tensão'
  return 'Não definido'
}

function journeyMemories(flags = {}) {
  const memories = []
  if (flags.rescueApproach === 'shadow') memories.push('Sirius iniciou o resgate pelas sombras.')
  if (flags.rescueApproach === 'parley') memories.push('Sirius tentou negociar antes de usar a força.')
  if (flags.rescueApproach === 'storm') memories.push('Sirius revelou a tempestade na clareira.')
  if (flags.orcsSpared) memories.push('Os mercenários saíram vivos e deixaram uma dívida em aberto.')
  if (flags.orcBloodshed) memories.push('Um captor, possivelmente chamado Arvak, morreu pelo raio de Sirius.')
  if (flags.orcsEscaped && !flags.orcsSpared) memories.push('Fugitivos levaram a história do homem-corvo para além da clareira.')
  if (flags.identityRevealed) memories.push('Elara conhece o nome completo de Sirius Kayler.')
  if (flags.identityHidden) memories.push('Sirius confiou a Elara apenas metade de seu nome.')
  if (flags.contractKept) memories.push('O fragmento do contrato sem selo foi preservado.')
  if (flags.ravenProtocolShared) memories.push('Elara conhece o protocolo para ajudar Sirius a retornar da forma de corvo.')
  if (flags.rescueMotiveShared) memories.push('Sirius contou por que escolheu seguir o grito na floresta.')
  if (flags.companionshipAccepted) memories.push('Sirius e Elara escolheram seguir como companheiros até Sylvaris.')
  if (flags.companionshipConditional) memories.push('A companhia foi aceita apenas até a fronteira de Sylvaris.')
  if (flags.companionshipRefused) memories.push('Sirius recusou transformar a estrada compartilhada em companhia.')
  if (flags.sharedFear) memories.push('Sirius e Elara falaram sobre o medo de serem transformados em símbolos.')
  if (flags.route === 'hidden') memories.push('A dupla escolheu o Caminho das Árvores Ausentes.')
  if (flags.route === 'orcs') memories.push('A dupla decidiu perseguir os mercenários.')
  if (flags.route === 'camp') memories.push('A dupla preferiu conversar no abrigo antes de seguir.')
  if (flags.ending) memories.push(`Destino deste capítulo: ${flags.ending}.`)
  return memories
}

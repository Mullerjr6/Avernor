import { buildRecordVolumes, recordDepth } from '../content/editorial/recordVolumes'
import { FieldValue } from './EncyclopediaDossier'

const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

export default function PrimaryRecord({ item, catalogKey }) {
  const volumes = buildRecordVolumes(item, catalogKey)
  const depth = recordDepth(item, catalogKey)
  const secondaryOpening = item.archivalOverview && item.archivalOverview !== item.description ? item.archivalOverview : item.overview

  return <section id="registro" className="primary-record">
    <header className="primary-record-heading">
      <div><span className="section-number">I · Registro primário expandido</span><h2>Registro em volumes</h2></div>
      <p>Leitura consolidada pelo Arquivo Real: fatos, consequências e divergências permanecem separados para que a ausência de prova nunca seja confundida com certeza.</p>
    </header>
    <div className="primary-record-opening">
      <p className="dropcap">{item.description}</p>
      {secondaryOpening && <p>{secondaryOpening}</p>}
    </div>
    <dl className="record-depth-ledger" aria-label="Profundidade deste registro">
      <div><dt>Volumes</dt><dd>{depth.volumes}</dd></div>
      <div><dt>Entradas temáticas</dt><dd>{depth.entries}</dd></div>
      <div><dt>Fontes citadas</dt><dd>{depth.sources}</dd></div>
      <div><dt>Registros conectados</dt><dd>{depth.relations}</dd></div>
    </dl>
    <div className="record-volume-stack">
      {volumes.map((volume) => <article className="record-volume" key={`${item.id}-${volume.title}`}>
        <header><span>Volume {roman[volume.number - 1] ?? volume.number}</span><h3>{volume.title}</h3></header>
        {volume.lead && <p className="record-volume-lead">{volume.lead}</p>}
        <dl>{volume.entries.map(({ field, label, value }) => <div key={field}><dt>{label}</dt><dd><FieldValue value={value} /></dd></div>)}</dl>
      </article>)}
    </div>
  </section>
}

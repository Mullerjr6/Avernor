import { toAnchor } from '../utils/text'

export default function RecordTableOfContents({ item, listSections, hasAtlasEntry = false }) {
  const links = [
    ['registro', 'Registro primário'],
    ['fontes-e-lacunas', 'Autoridade e fontes'],
    item.appearance && ['aparencia', 'Aparência documentada'],
    item.biography?.length > 0 && ['biografia-e-percurso', item.biographyTitle ?? 'Biografia e percurso'],
    item.detailedTimeline?.length > 0 && ['linha-do-tempo', 'Linha do tempo'],
    item.gallery?.length > 0 && ['galeria-do-registro', 'Galeria do registro'],
    ...(item.sections ?? []).map((section) => [`secao-${toAnchor(section.title)}`, section.title]),
    ...listSections.map(([key, label]) => [`lista-${key}`, label]),
    item.genealogyId && ['parentesco', 'Parentesco documentado'],
    hasAtlasEntry && ['posicao-no-atlas', 'Posição no Atlas'],
    item.relations?.length > 0 && ['registros-relacionados', 'Registros relacionados'],
  ].filter(Boolean)

  return <details className="record-toc">
    <summary>Neste registro <span aria-hidden="true">⌄</span></summary>
    <ol>{links.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ol>
  </details>
}

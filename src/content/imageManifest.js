const imageGroups = {
  backgrounds: ['caca-bruxas', 'era-coroas', 'era-magia', 'grande-guerra', 'queda-coroa'],
  cities: ['fortaleza-do-veu', 'porto-de-eldemar', 'porto-verde', 'ravencastle', 'thur-kar', 'valoris', 'winterheim'],
  bestiary: ['alcarion', 'cervo-do-nevoeiro', 'grifo-das-alturas', 'hidra-dos-pantanos', 'kraken-de-eldemar', 'lobo-de-vidro', 'mhazir', 'vigia-de-pedra', 'vyrasul'],
  gallery: ['arquivo-submerso', 'batalha-das-aguas-negras', 'guerra-da-cinza-branca', 'guerra-dos-tres-herdeiros', 'guerra-dos-tronos', 'guerra-dos-tuneis-vazios', 'noite-das-doze-adagas', 'pacto-dos-descendentes', 'sinos-do-mar-de-cinzas'],
  locations: ['arquipelago-das-brumas', 'deserto-de-zharak', 'mar-das-estrelas', 'mar-interior', 'terras-sombrias'],
  artifacts: ['adaga-do-passo-velado', 'carta-de-normus', 'espada-da-trovoada', 'martelo-de-orun', 'medalhao-da-folha-partida'],
  houses: ['arden', 'bellatrix', 'kayler', 'nimbus', 'rivs'],
  religions: ['caminho-das-raizes', 'culto-da-brasa-comum', 'juramento-do-horizonte', 'nove-ecos'],
  books: ['a-carta-e-a-tempestade', 'atlas-das-sete-rotas', 'caderno-de-namidia', 'cronicas-perdidas-de-sylvaris', 'o-ultimo-bruxo', 'tratado-das-linhagens'],
  'atlas-plates': [
    'winterfeld-geada', 'montanhas-vigias', 'sylvaris-assentamentos', 'valoria-pontes', 'ravenhold-fronteira',
    'kar-dum-profundezas', 'eldemar-corsarios', 'oriente-clas-zharak', 'ilhas-do-nevoeiro',
    'geleiras-de-winterfeld', 'passagem-da-geada', 'montanhas-cinzentas', 'pico-da-vigia', 'fortaleza-esquecida',
    'campo-belo', 'muralha-de-pedra', 'campo-de-treinamento', 'rio-torrente', 'fortaleza-solar',
    'necropole-de-valthor', 'lethariel', 'palacio-da-seiva-clara', 'caminho-das-arvores-ausentes',
    'clarifonte', 'enaril', 'narin-falas', 'vale-das-estrelas', 'valoria', 'sete-pontes',
    'ravenhold', 'senado-de-estandartes', 'estrada-de-cinza', 'kar-dum', 'ponte-das-nove-bigornas',
    'tuneis-vazios', 'portao-de-karak', 'salao-dos-forgemantes', 'minas-de-ferro', 'eldemar',
    'docas-fundas', 'ruinas-rivs', 'vul-gar', 'espelho-de-sal', 'cidade-de-gron',
    'fortaleza-kring', 'acampamento-dos-clas', 'porto-da-serpente', 'oasis-perdido', 'cidade-da-areia',
  ],
  'archive-plates': ['povos-de-avernor', 'mitos-e-tradicoes', 'veu-e-retornados', 'celestiais-e-lancas', 'faccoes-e-sucessoes'],
  'lore-locations': ['farol-das-sete-mares', 'mosteiro-da-brasa-tardia', 'arquivo-de-pedra', 'jardim-das-pontes-silenciosas', 'mercado-dos-tres-ventos', 'torre-da-chuva-negra'],
  'lore-legends': ['barca-sem-remador', 'sino-sob-a-geleira', 'nona-porta'],
  'lore-books': ['livro-dos-caminhos-fechados', 'registro-das-aguas-partilhadas', 'codice-dos-estandartes-baixos'],
  kingdoms: ['kingdom-winterfeld', 'kingdom-sylvaris', 'kingdom-kar-dum', 'kingdom-valoria', 'kingdom-ravenhold', 'kingdom-eldemar', 'kingdom-montanhas-cinzentas'],
  cosmology: ['elyra', 'morvath', 'naelor', 'varakh', 'fenda-sem-nome', 'nar-khalion', 'prisioneiro-sem-nome'],
}

export const imageManifest = Object.fromEntries(
  Object.entries(imageGroups).flatMap(([directory, ids]) => ids.map((id) => [
    id,
    {
      image: `/assets/images/${directory}/${id}-page.webp`,
      thumbnail: `/assets/images/${directory}/${id}-card.webp`,
    },
  ])),
)

const aliasGroups = {
  'povos-de-avernor': ['humanos', 'elfos', 'orcs', 'anoes', 'gigantes', 'dragoes'],
  'mitos-e-tradicoes': [
    'cancao-do-primeiro-ceu', 'primeira-tempestade', 'doutrina-tres-correntes', 'metamorfose-do-eco',
    'credo-cicatriz-vermelha', 'memoria-primeira-raiz', 'sete-golpes-primeira-forja', 'pilares-adormecidos',
    'fe-dos-sete-nomes', 'coroa-dourada', 'vigilia-ultima-brasa', 'vigilia-sol-negro', 'chama-sem-coroa',
  ],
  'veu-e-retornados': [
    'o-veu', 'eco-primeiro-ceu', 'fraturas-do-veu', 'espelho-de-sal', 'caminho-das-arvores-ausentes',
    'elyra', 'morvath', 'naelor', 'varakh', 'fenda-sem-nome',
    'vazios', 'lembrantes', 'juramentados', 'coroados-de-cinza', 'desvelados', 'ecoantes', 'devorados', 'marcha-dos-sem-nome',
    'ultimo-violeta', 'coroa-vazia', 'arvore-sem-sombra', 'tres-feras-aladas', 'ultima-forja', 'cicatriz-aberta',
    'mar-acima', 'sete-silencios-profecia', 'cinco-reliquias', 'porta-sem-fechadura',
    'segunda-ruptura', 'noite-sem-estrelas', 'ultimo-inverno', 'despertar-dos-pilares', 'grande-marcha',
    'queda-primeira-raiz', 'ultimo-golpe', 'sete-silencios', 'mundo-esquecera-nome',
    'necromancia', 'costura-de-eco', 'escuta-ancestral', 'nar-khalion', 'prisioneiro-sem-nome',
  ],
  'celestiais-e-lancas': [
    'medalhao-ultimo-sussurro', 'fulgarion', 'aelysar', 'varkhael-seryn', 'ishara',
    'aureon', 'myriel', 'kaeloran', 'selenya', 'tharos', 'nerathiel', 'oryndar',
    'solvaris', 'elythra', 'vharun', 'ishmeriel', 'raekhar', 'mor-aeth', 'veyrion',
  ],
  'faccoes-e-sucessoes': [
    'vigias-do-limiar', 'cartografos-do-impossivel', 'peregrinos-sem-sombra', 'seladores', 'abertos',
    'filhos-setimo-silencio', 'coletores-de-nomes', 'ordem-ultima-brasa', 'pastores-dos-mortos', 'corte-de-cinza',
    'dinastia-una', 'dinastia-arden', 'dinastia-kayler', 'dinastia-bellatrix', 'dinastia-corven',
    'dinastia-aelwen', 'dinastia-nimbus', 'sucessao-de-valoria', 'sucessao-de-winterfeld',
    'sucessao-de-ravenhold', 'sucessao-de-sylvaris', 'sucessao-de-eldemar',
  ],
  'winterfeld-geada': ['fortaleza-gelida', 'passagem-da-geada'],
  'montanhas-vigias': ['acampamento-da-liberdade', 'pico-da-vigia', 'fortaleza-esquecida'],
  'ilhas-do-nevoeiro': ['ilhas-do-nevoeiro'],
  'sylvaris-assentamentos': ['clarifonte', 'enaril', 'narin-falas', 'vale-das-estrelas'],
  'valoria-pontes': ['campo-belo', 'ponte-dourada'],
  'ravenhold-fronteira': ['muralha-de-pedra', 'campo-de-treinamento', 'rio-torrente', 'fortaleza-solar', 'necropole-de-valthor'],
  'kar-dum-profundezas': ['portao-de-karak', 'salao-dos-forgemantes', 'minas-de-ferro'],
  'eldemar-corsarios': ['ancoradouro-dos-piratas'],
  'oriente-clas-zharak': ['cidade-de-gron', 'fortaleza-kring', 'acampamento-dos-clas', 'porto-da-serpente', 'oasis-perdido', 'cidade-da-areia'],
}

export const recordImageAliases = Object.fromEntries(
  Object.entries(aliasGroups).flatMap(([assetId, recordIds]) => recordIds.map((recordId) => [recordId, assetId])),
)

export function imagesFor(id) {
  // An individual plate is always more authoritative than a legacy thematic alias.
  if (imageManifest[id]) return { ...imageManifest[id], imageScope: 'individual' }
  const assetId = recordImageAliases[id]
  if (!assetId) return {}
  const scope = assetId.endsWith('-sucessoes') || assetId === 'povos-de-avernor' || assetId === 'mitos-e-tradicoes'
    || assetId === 'veu-e-retornados' || assetId === 'celestiais-e-lancas'
    ? 'thematic'
    : 'regional'
  return {
    ...imageManifest[assetId],
    imageScope: scope,
    imageAlt: scope === 'regional'
      ? `Prancha regional do Atlas associada a ${id.replaceAll('-', ' ')}`
      : `Prancha temática do Arquivo associada a ${id.replaceAll('-', ' ')}`,
  }
}

import {
  artifacts,
  books,
  characters,
  cities,
  creatures,
  eras,
  houses,
  kingdoms,
  legends,
  locations,
  religions,
  wars,
  peoples,
  mythologies,
  cosmology,
  portals,
  worlds,
  returned,
  necromancy,
  endTimes,
  narKhalion,
  prophecies,
  relics,
  celestials,
  lances,
  factions,
} from '../content/index.js'

export const catalogs = {
  historia: {
    path: '/historia', label: 'História', kicker: 'Anais do continente', title: 'As eras de Avernor',
    description: 'Cinco períodos históricos conectam o fim da Coroa Una ao nascimento de Sirius Kayler.',
    items: eras, filters: ['status', 'period'], placeholder: 'default', theme: 'chronicle', glyph: 'H', accent: '#b58954',
    mastheadImage: '/assets/images/maps/avernor-map-historical-large.webp',
  },
  reinos: {
    path: '/reinos', label: 'Reinos', kicker: 'Atlas político', title: 'Reinos e territórios',
    description: 'Coroas, confederações e refúgios moldados por clima, comércio e conflitos internos.',
    items: kingdoms, filters: ['category', 'status', 'location'], placeholder: 'location', theme: 'kingdom', glyph: 'R', accent: '#d1aa62',
    mastheadImage: '/assets/images/maps/avernor-map-atlas-large.webp',
  },
  cidades: {
    path: '/cidades', label: 'Cidades', kicker: 'Gazeta geográfica', title: 'Cidades e fortalezas',
    description: 'Capitais, portos e fortalezas cuja arquitetura responde à geografia e à história.',
    items: cities, filters: ['category', 'kingdom', 'status'], placeholder: 'location', theme: 'city', glyph: 'C', accent: '#9e8b70',
    mastheadImage: '/assets/images/maps/avernor-map-regions-large.webp',
  },
  casas: {
    path: '/casas', label: 'Casas', kicker: 'Sangue e juramento', title: 'Casas de Avernor',
    description: 'As três linhagens bruxas e famílias políticas que atravessam a saga.',
    items: houses, filters: ['category', 'lineage', 'status', 'kingdom'], placeholder: 'default', theme: 'heraldry', glyph: 'K', accent: '#9b72c4',
    mastheadImage: '/assets/images/maps/avernor-map-parchment-large.webp',
  },
  personagens: {
    path: '/personagens', label: 'Personagens', kicker: 'Registros biográficos', title: 'Vidas que movem a história',
    description: 'Bruxos, herdeiras, líderes e viajantes definidos tanto por limites quanto por feitos.',
    items: characters, filters: ['race', 'status', 'lineage', 'kingdom'], placeholder: 'character', theme: 'portrait', glyph: 'P', accent: '#c5a35f',
    mastheadImage: '/assets/images/locations/jornada-floresta-antiga-banner.webp',
  },
  bestiario: {
    path: '/bestiario', label: 'Bestiário', kicker: 'Caderno dos naturalistas', title: 'Bestiário de Avernor',
    description: 'Registros de comportamento, habitat e risco — sem confundir medo com conhecimento.',
    items: creatures, filters: ['category', 'status', 'threat', 'location'], placeholder: 'creature', theme: 'bestiary', glyph: 'B', accent: '#8e9b72',
  },
  criaturas: {
    path: '/criaturas', label: 'Criaturas', kicker: 'Fauna conhecida', title: 'Criaturas de Avernor',
    description: 'Animais, feras raras e os três únicos dragões conhecidos do mundo.',
    items: creatures, filters: ['race', 'category', 'threat', 'status'], placeholder: 'creature', theme: 'bestiary', glyph: 'F', accent: '#8e9b72',
  },
  guerras: {
    path: '/guerras', label: 'Guerras', kicker: 'Memória dos conflitos', title: 'Guerras e batalhas',
    description: 'Causas, custos e consequências dos conflitos que redesenharam fronteiras.',
    items: wars, filters: ['category', 'era', 'status'], placeholder: 'default', theme: 'war', glyph: 'G', accent: '#9c554d',
    mastheadImage: '/assets/images/maps/avernor-map-historical-large.webp',
  },
  artefatos: {
    path: '/artefatos', label: 'Artefatos', kicker: 'Objetos de consequência', title: 'Artefatos e relíquias',
    description: 'Armas, documentos e insígnias cujo valor nasce de limites e escolhas.',
    items: artifacts, filters: ['category', 'status', 'origin'], placeholder: 'artifact', theme: 'artifact', glyph: 'A', accent: '#b78d54',
  },
  lendas: {
    path: '/lendas', label: 'Lendas', kicker: 'Entre prova e memória', title: 'Lendas de Avernor',
    description: 'Relatos avaliados pelo que explicam, pelo que ocultam e pelas evidências disponíveis.',
    items: legends, filters: ['category', 'status', 'period'], placeholder: 'default', theme: 'legend', glyph: 'L', accent: '#7d719b',
  },
  biblioteca: {
    path: '/biblioteca', label: 'Biblioteca', kicker: 'Estantes do Arquivo', title: 'Biblioteca de Avernor',
    description: 'Volumes da saga de Sirius, crônicas, tratados e documentos preservados.',
    items: books, filters: ['category', 'status', 'period'], placeholder: 'book', theme: 'library', glyph: 'I', accent: '#b48755',
    mastheadImage: '/assets/images/maps/avernor-map-parchment-large.webp',
  },
  povos: {
    path: '/povos', label: 'Povos', kicker: 'Culturas e capacidades', title: 'Povos de Avernor',
    description: 'Culturas, crenças, capacidades e limites sem reduzir povos a raças de jogo ou blocos políticos.',
    items: peoples, filters: ['category', 'status', 'location'], placeholder: 'character', theme: 'portrait', glyph: 'V', accent: '#a68d69',
  },
  mitologia: {
    path: '/mitologia', label: 'Mitologia', kicker: 'Memórias da origem', title: 'Mitologias de Avernor',
    description: 'Versões culturais da criação, da Primeira Tempestade, da magia e do destino dos mortos.',
    items: mythologies, filters: ['category', 'status', 'truthStatus'], placeholder: 'default', theme: 'legend', glyph: 'M', accent: '#8273aa',
  },
  religioes: {
    path: '/religioes', label: 'Religiões', kicker: 'Fé e vida pública', title: 'Religiões e tradições',
    description: 'Ritos, instituições e conflitos espirituais que jamais são confundidos com magia hereditária.',
    items: religions, filters: ['category', 'origin', 'status'], placeholder: 'default', theme: 'legend', glyph: 'F', accent: '#b59562',
  },
  locais: {
    path: '/locais', label: 'Locais', kicker: 'Gazeta do território', title: 'Regiões e paisagens',
    description: 'Mares, florestas, desertos e zonas interditadas que moldam deslocamento e sobrevivência.',
    items: locations, filters: ['category', 'status', 'location'], placeholder: 'location', theme: 'kingdom', glyph: 'O', accent: '#7c9b84',
  },
  cosmologia: {
    path: '/cosmologia', label: 'Cosmologia', kicker: 'Estruturas do real', title: 'Cosmologia e o Véu',
    description: 'O limite entre matéria, memória, morte, mana e espaços incompletos.',
    items: cosmology, filters: ['category', 'status', 'truthStatus'], placeholder: 'default', theme: 'legend', glyph: 'Ω', accent: '#766da0',
  },
  portais: {
    path: '/portais', label: 'Portais', kicker: 'Fraturas do Véu', title: 'Fraturas do Véu',
    description: 'Passagens raras e instáveis que cobram memória, tempo, corpo ou retorno.',
    items: portals, filters: ['category', 'status', 'location'], placeholder: 'location', theme: 'legend', glyph: 'Ø', accent: '#7766a7',
  },
  mundos: {
    path: '/outros-mundos', label: 'Outros mundos', kicker: 'Além das margens', title: 'Outros mundos',
    description: 'Elyra, Morvath, Naelor, Varakh e a Fenda sem Nome — conhecidos apenas por travessias incompletas.',
    items: worlds, filters: ['category', 'status', 'truthStatus'], placeholder: 'location', theme: 'kingdom', glyph: '∞', accent: '#6c86a0',
  },
  retornados: {
    path: '/retornados', label: 'Retornados', kicker: 'Depois da morte', title: 'Os Retornados',
    description: 'Categorias, degradação de identidade e dilemas de quem atravessou uma ruptura impossível.',
    items: returned, filters: ['category', 'status', 'truthStatus'], placeholder: 'character', theme: 'bestiary', glyph: '†', accent: '#8b8b91',
  },
  profecias: {
    path: '/profecias', label: 'Profecias', kicker: 'Textos em disputa', title: 'Profecias centrais',
    description: 'Versos ambíguos, traduções adulteradas e interpretações mobilizadas por interesses políticos.',
    items: prophecies, filters: ['category', 'status'], placeholder: 'book', theme: 'library', glyph: 'Ψ', accent: '#9273ad',
  },
  fimDosTempos: {
    path: '/fim-dos-tempos', label: 'Fim dos Tempos', kicker: 'Escatologias', title: 'O fim em nove leituras',
    description: 'Sinais graduais e contraditórios pelos quais cada povo imagina o término do mundo.',
    items: endTimes, filters: ['category', 'status'], placeholder: 'default', theme: 'legend', glyph: 'IX', accent: '#78545f',
  },
  necromancia: {
    path: '/necromancia', label: 'Necromancia', kicker: 'Custos do retorno', title: 'Necromancia e memória',
    description: 'Práticas, proibições e a diferença entre ouvir ancestrais e aprisionar seus ecos.',
    items: necromancy, filters: ['category', 'status'], placeholder: 'artifact', theme: 'artifact', glyph: 'N', accent: '#746779',
  },
  reliquias: {
    path: '/reliquias', label: 'Relíquias', kicker: 'O Véu Partido', title: 'As Cinco Relíquias',
    description: 'Objetos capazes de costurar o Véu ou abrir um cárcere quando reunidos por medo.',
    items: relics, filters: ['category', 'status', 'truthStatus'], placeholder: 'artifact', theme: 'artifact', glyph: 'V', accent: '#c09a5d',
  },
  narKhalion: {
    path: '/nar-khalion', label: 'Nar-Khalion', kicker: 'Além do Sétimo Céu', title: 'O Cárcere impossível',
    description: 'Leis públicas de uma prisão sem fuga interna e o registro deliberadamente limitado de seu ocupante.',
    items: narKhalion, filters: ['category', 'status'], placeholder: 'location', theme: 'war', glyph: '⛓', accent: '#8c5a58',
  },
  celestiais: {
    path: '/celestiais', label: 'Celestiais', kicker: 'Sete nomes antigos', title: 'Os Sete Celestiais',
    description: 'Figuras de natureza incerta associadas a lei, memória, guerra, misericórdia, tempestade, morte e limiar.',
    items: celestials, filters: ['category', 'status'], placeholder: 'character', theme: 'portrait', glyph: 'VII', accent: '#c0ac77',
  },
  lancas: {
    path: '/lancas', label: 'Lanças', kicker: 'Armas celestiais', title: 'As Sete Lanças',
    description: 'Armas atribuídas aos Celestiais, preservadas entre alegoria, fragmentos e fraude.',
    items: lances, filters: ['category', 'status'], placeholder: 'artifact', theme: 'artifact', glyph: 'Λ', accent: '#a6a37d',
  },
  faccoes: {
    path: '/faccoes', label: 'Facções', kicker: 'Agendas em movimento', title: 'Facções de Avernor',
    description: 'Dez organizações com objetivos, métodos, conflitos internos e interesses sobre Sirius e o Véu.',
    items: factions, filters: ['category', 'status', 'location'], placeholder: 'default', theme: 'heraldry', glyph: 'X', accent: '#9a745c',
  },
}

// Relações editoriais explícitas continuam sendo a fonte principal. Este passe cria
// apenas o vínculo de retorno que evita dossiês isolados e mantém reciprocidade sem
// repetir a mesma informação em dois arquivos de domínio.
const canonicalCatalogs = Object.entries(catalogs).filter(([key]) => key !== 'bestiario')
const entityByRoute = new Map(canonicalCatalogs.flatMap(([, catalog]) => catalog.items.map((item) => [`${catalog.path}/${item.slug}`, { item, catalog } ])))

for (const [, sourceCatalog] of canonicalCatalogs) {
  for (const source of sourceCatalog.items) {
    const sourceRoute = `${sourceCatalog.path}/${source.slug}`
    for (const relation of [...source.relations]) {
      const target = entityByRoute.get(relation.to)
      if (!target || target.item.relations.some(({ to }) => to === sourceRoute)) continue
      target.item.relations.push({ label: `${source.name} — referência relacionada`, to: sourceRoute, generated: true })
    }
  }
}

export const relationIndex = Object.fromEntries([...entityByRoute].map(([route, { item }]) => [route, item.relations]))

export const searchIndex = [
  ...Object.values(catalogs)
    .filter((catalog) => catalog !== catalogs.bestiario)
    .flatMap((catalog) => catalog.items.map((item) => ({
      ...item,
      collectionLabel: catalog.label,
      href: `${catalog.path}/${item.slug}`,
    }))),
]

export const catalogByPath = Object.fromEntries(
  Object.entries(catalogs).map(([key, catalog]) => [catalog.path, { key, ...catalog }]),
)

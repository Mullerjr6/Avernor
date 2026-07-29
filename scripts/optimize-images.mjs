import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const masterRoot = 'artwork-masters/assets/images'

const characterSources = [
  'sirius-kayler',
  'normus-kayler-v2',
  'namidia-bellatrix-v2',
  'elara',
  'rainha-sylvaris',
  'guerreira-ruiva',
  'guerreira-orc',
  'guerreiro-orc',
]

const mapSources = [
  'avernor-map-main',
  'avernor-map-atlas',
  'avernor-map-historical',
  'avernor-map-regions',
  'avernor-map-parchment',
  'avernor-map-alt-01',
]

const landscapeSources = {
  backgrounds: ['caca-bruxas', 'era-coroas', 'era-magia', 'grande-guerra', 'queda-coroa'],
  cities: ['fortaleza-do-veu', 'porto-de-eldemar', 'porto-verde', 'ravencastle', 'thur-kar', 'valoris', 'winterheim'],
  gallery: ['arquivo-submerso', 'batalha-das-aguas-negras', 'guerra-da-cinza-branca', 'guerra-dos-tres-herdeiros', 'guerra-dos-tronos', 'guerra-dos-tuneis-vazios', 'noite-das-doze-adagas', 'pacto-dos-descendentes', 'sinos-do-mar-de-cinzas'],
  locations: ['arquipelago-das-brumas', 'deserto-de-zharak', 'mar-das-estrelas', 'mar-interior', 'terras-sombrias'],
  'atlas-plates': ['winterfeld-geada', 'montanhas-vigias', 'sylvaris-assentamentos', 'valoria-pontes', 'ravenhold-fronteira', 'kar-dum-profundezas', 'eldemar-corsarios', 'oriente-clas-zharak', 'ilhas-do-nevoeiro'],
  'archive-plates': ['povos-de-avernor', 'mitos-e-tradicoes', 'veu-e-retornados', 'celestiais-e-lancas', 'faccoes-e-sucessoes'],
  'lore-locations': ['farol-das-sete-mares', 'mosteiro-da-brasa-tardia', 'arquivo-de-pedra', 'jardim-das-pontes-silenciosas', 'mercado-dos-tres-ventos', 'torre-da-chuva-negra'],
  'lore-legends': ['barca-sem-remador', 'sino-sob-a-geleira', 'nona-porta'],
}

const portraitSources = {
  artifacts: ['adaga-do-passo-velado', 'carta-de-normus', 'espada-da-trovoada', 'martelo-de-orun', 'medalhao-da-folha-partida'],
  bestiary: ['alcarion', 'cervo-do-nevoeiro', 'grifo-das-alturas', 'hidra-dos-pantanos', 'kraken-de-eldemar', 'lobo-de-vidro', 'mhazir', 'vigia-de-pedra', 'vyrasul'],
  houses: ['arden', 'bellatrix', 'kayler', 'nimbus', 'rivs'],
  religions: ['caminho-das-raizes', 'culto-da-brasa-comum', 'juramento-do-horizonte', 'nove-ecos'],
}

const bookSources = ['a-carta-e-a-tempestade', 'atlas-das-sete-rotas', 'caderno-de-namidia', 'cronicas-perdidas-de-sylvaris', 'o-ultimo-bruxo', 'tratado-das-linhagens']
const loreBookSources = ['livro-dos-caminhos-fechados', 'registro-das-aguas-partilhadas', 'codice-dos-estandartes-baixos']

const jobs = [
  ...characterSources.flatMap((name) => [
    { source: `${masterRoot}/characters/${name}-enhanced.png`, output: `public/assets/images/characters/${name}-card.webp`, width: 640, height: 800, fit: 'cover', position: 'attention', quality: 80 },
    { source: `${masterRoot}/characters/${name}-enhanced.png`, output: `public/assets/images/characters/${name}-page.webp`, width: 960, height: 1200, fit: 'cover', position: 'attention', quality: 84 },
  ]),
  ...mapSources.flatMap((name) => [
    { source: `${masterRoot}/maps/${name}-enhanced.png`, output: `public/assets/images/maps/${name}-preview.webp`, width: 768, fit: 'inside', quality: 78 },
    { source: `${masterRoot}/maps/${name}-enhanced.png`, output: `public/assets/images/maps/${name}-large.webp`, width: 2048, fit: 'inside', quality: 86 },
  ]),
  ...Object.entries(landscapeSources).flatMap(([directory, names]) => names.flatMap((name) => [
    { source: `${masterRoot}/${directory}/${name}.png`, output: `public/assets/images/${directory}/${name}-card.webp`, width: 720, height: 405, fit: 'cover', position: 'attention', quality: 80 },
    { source: `${masterRoot}/${directory}/${name}.png`, output: `public/assets/images/${directory}/${name}-page.webp`, width: 1600, height: 900, fit: 'cover', position: 'attention', quality: 85 },
  ])),
  ...Object.entries(portraitSources).flatMap(([directory, names]) => names.flatMap((name) => [
    { source: `${masterRoot}/${directory}/${name}.png`, output: `public/assets/images/${directory}/${name}-card.webp`, width: 640, height: 800, fit: 'cover', position: 'attention', quality: 80 },
    { source: `${masterRoot}/${directory}/${name}.png`, output: `public/assets/images/${directory}/${name}-page.webp`, width: 960, height: 1200, fit: 'cover', position: 'attention', quality: 85 },
  ])),
  ...bookSources.flatMap((name) => [
    { source: `${masterRoot}/books/${name}.png`, output: `public/assets/images/books/${name}-card.webp`, width: 640, height: 960, fit: 'cover', position: 'attention', quality: 80 },
    { source: `${masterRoot}/books/${name}.png`, output: `public/assets/images/books/${name}-page.webp`, width: 960, height: 1440, fit: 'cover', position: 'attention', quality: 85 },
  ]),
  ...loreBookSources.flatMap((name) => [
    { source: `${masterRoot}/lore-books/${name}.png`, output: `public/assets/images/lore-books/${name}-card.webp`, width: 640, height: 960, fit: 'cover', position: 'attention', quality: 80 },
    { source: `${masterRoot}/lore-books/${name}.png`, output: `public/assets/images/lore-books/${name}-page.webp`, width: 960, height: 1440, fit: 'cover', position: 'attention', quality: 85 },
  ]),
  { source: `${masterRoot}/locations/jornada-floresta-antiga-enhanced.png`, output: 'public/assets/images/locations/jornada-floresta-antiga-card.webp', width: 720, height: 576, fit: 'cover', position: 'attention', quality: 80 },
  { source: `${masterRoot}/locations/jornada-floresta-antiga-enhanced.png`, output: 'public/assets/images/locations/jornada-floresta-antiga-banner.webp', width: 1600, height: 1029, fit: 'cover', position: 'attention', quality: 85 },
]

async function isCurrent(source, output) {
  try {
    const [sourceStat, outputStat] = await Promise.all([stat(source), stat(output)])
    return outputStat.mtimeMs >= sourceStat.mtimeMs
  } catch {
    return false
  }
}

for (const job of jobs) {
  const source = path.join(root, job.source)
  const output = path.join(root, job.output)
  if (await isCurrent(source, output)) {
    console.info(`current  ${job.output}`)
    continue
  }
  await mkdir(path.dirname(output), { recursive: true })
  await sharp(source)
    .rotate()
    .resize({ width: job.width, height: job.height, fit: job.fit, position: job.position, withoutEnlargement: true })
    .webp({ quality: job.quality, effort: 4, smartSubsample: true })
    .toFile(output)
  console.info(`created  ${job.output}`)
}

console.info(`Optimized ${jobs.length} responsive image variants.`)

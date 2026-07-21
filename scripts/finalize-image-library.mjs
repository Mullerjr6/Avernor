import { access, mkdir, rename } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const imageRoot = path.join(root, 'public', 'assets', 'images')

const generatedLandscape = {
  backgrounds: ['caca-bruxas', 'era-coroas', 'era-magia', 'grande-guerra', 'queda-coroa'],
  cities: ['fortaleza-do-veu', 'porto-de-eldemar', 'porto-verde', 'ravencastle', 'thur-kar', 'valoris', 'winterheim'],
  gallery: [
    'arquivo-submerso',
    'batalha-das-aguas-negras',
    'guerra-da-cinza-branca',
    'guerra-da-cinza-branca-alt-01',
    'guerra-dos-tres-herdeiros',
    'guerra-dos-tronos',
    'guerra-dos-tuneis-vazios',
    'noite-das-doze-adagas',
    'pacto-dos-descendentes',
    'sinos-do-mar-de-cinzas',
  ],
  locations: ['arquipelago-das-brumas', 'deserto-de-zharak', 'mar-das-estrelas', 'mar-interior', 'terras-sombrias'],
}

const generatedPortrait = {
  artifacts: ['adaga-do-passo-velado', 'carta-de-normus', 'espada-da-trovoada', 'martelo-de-orun', 'medalhao-da-folha-partida'],
  bestiary: ['alcarion', 'cervo-do-nevoeiro', 'grifo-das-alturas', 'hidra-dos-pantanos', 'kraken-de-eldemar', 'lobo-de-vidro', 'mhazir', 'vigia-de-pedra', 'vyrasul'],
  houses: ['arden', 'bellatrix', 'kayler', 'nimbus', 'rivs'],
  religions: ['caminho-das-raizes', 'culto-da-brasa-comum', 'juramento-do-horizonte', 'nove-ecos'],
}

const generatedBooks = ['a-carta-e-a-tempestade', 'atlas-das-sete-rotas', 'caderno-de-namidia', 'cronicas-perdidas-de-sylvaris', 'o-ultimo-bruxo', 'tratado-das-linhagens']

const legacyCharacters = [
  'elara',
  'guerreira-orc',
  'guerreira-ruiva',
  'guerreiro-orc',
  'namidia-bellatrix',
  'namidia-bellatrix-v2',
  'normus-kayler',
  'normus-kayler-v2',
  'rainha-sylvaris',
  'sirius-kayler',
]

const legacyMaps = ['avernor-map-alt-01', 'avernor-map-atlas', 'avernor-map-historical', 'avernor-map-main', 'avernor-map-parchment', 'avernor-map-regions']

async function exists(file) {
  try {
    await access(file)
    return true
  } catch {
    return false
  }
}

async function writeProcessed(source, output, resize) {
  if (!(await exists(source))) throw new Error(`Missing image: ${path.relative(root, source)}`)
  await mkdir(path.dirname(output), { recursive: true })
  const temporary = `${output}.processing`
  await sharp(source)
    .rotate()
    .toColorspace('srgb')
    .resize({ ...resize, kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.7, m1: 0.5, m2: 1.5, x1: 2, y2: 10, y3: 20 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(temporary)
  await rename(temporary, output)
  console.info(`finalized  ${path.relative(root, output)}`)
}

for (const [directory, names] of Object.entries(generatedLandscape)) {
  for (const name of names) {
    const file = path.join(imageRoot, directory, `${name}.png`)
    await writeProcessed(file, file, { width: 2560, height: 1440, fit: 'fill' })
  }
}

for (const [directory, names] of Object.entries(generatedPortrait)) {
  for (const name of names) {
    const file = path.join(imageRoot, directory, `${name}.png`)
    await writeProcessed(file, file, { width: 2048, height: 2560, fit: 'fill' })
  }
}

for (const name of generatedBooks) {
  const file = path.join(imageRoot, 'books', `${name}.png`)
  await writeProcessed(file, file, { width: 2048, height: 3072, fit: 'fill' })
}

for (const name of legacyCharacters) {
  const source = path.join(imageRoot, 'characters', `${name}.png`)
  const output = path.join(imageRoot, 'characters', `${name}-enhanced.png`)
  await writeProcessed(source, output, { width: 2048, fit: 'inside', withoutEnlargement: false })
}

for (const name of legacyMaps) {
  const source = path.join(imageRoot, 'maps', `${name}.png`)
  const output = path.join(imageRoot, 'maps', `${name}-enhanced.png`)
  await writeProcessed(source, output, { width: 3072, fit: 'inside', withoutEnlargement: false })
}

await writeProcessed(
  path.join(imageRoot, 'locations', 'jornada-floresta-antiga.png'),
  path.join(imageRoot, 'locations', 'jornada-floresta-antiga-enhanced.png'),
  { width: 2560, fit: 'inside', withoutEnlargement: false },
)

console.info('Image library finalized: 54 new masters and 17 non-destructive legacy enhancements.')

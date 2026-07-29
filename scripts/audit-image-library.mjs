import { access, readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { imageManifest } from '../src/content/imageManifest.js'

const root = process.cwd()
const publicRoot = path.join(root, 'public')
const masterRoot = path.join(root, 'artwork-masters', 'assets', 'images')
const failures = []

async function exists(file) {
  try {
    await access(file)
    return true
  } catch {
    return false
  }
}

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  return (await Promise.all(entries.map(async (entry) => {
    const file = path.join(directory, entry.name)
    return entry.isDirectory() ? filesIn(file) : [file]
  }))).flat()
}

function publicFile(url) {
  return path.join(publicRoot, ...url.replace(/^\//, '').split('/'))
}

const expectedByDirectory = {
  backgrounds: { page: [1600, 900], card: [720, 405], master: [2560, 1440] },
  cities: { page: [1600, 900], card: [720, 405], master: [2560, 1440] },
  gallery: { page: [1600, 900], card: [720, 405], master: [2560, 1440] },
  locations: { page: [1600, 900], card: [720, 405], master: [2560, 1440] },
  'atlas-plates': { page: [1600, 900], card: [720, 405], master: [1672, 941] },
  'archive-plates': { page: [1600, 900], card: [720, 405], master: [1672, 941] },
  'lore-locations': { page: [1600, 900], card: [720, 405], master: [1672, 941] },
  'lore-legends': { page: [1600, 900], card: [720, 405], master: [1672, 941] },
  artifacts: { page: [960, 1200], card: [640, 800], master: [2048, 2560] },
  bestiary: { page: [960, 1200], card: [640, 800], master: [2048, 2560] },
  houses: { page: [960, 1200], card: [640, 800], master: [2048, 2560] },
  religions: { page: [960, 1200], card: [640, 800], master: [2048, 2560] },
  books: { page: [960, 1440], card: [640, 960], master: [2048, 3072] },
  'lore-books': { page: [960, 1440], card: [640, 960], master: [1024, 1536] },
}

for (const [id, images] of Object.entries(imageManifest)) {
  for (const variant of ['image', 'thumbnail']) {
    const file = publicFile(images[variant])
    if (!(await exists(file))) {
      failures.push(`Missing ${variant}: ${images[variant]}`)
      continue
    }
    const directory = images[variant].split('/')[3]
    const expected = expectedByDirectory[directory][variant === 'image' ? 'page' : 'card']
    const metadata = await sharp(file).metadata()
    if (metadata.width !== expected[0] || metadata.height !== expected[1]) failures.push(`Unexpected size ${metadata.width}x${metadata.height}: ${images[variant]}`)
  }

  const directory = images.image.split('/')[3]
  const master = path.join(masterRoot, directory, `${id}.png`)
  const metadata = await sharp(master).metadata()
  const expectedMaster = expectedByDirectory[directory].master
  if (metadata.width !== expectedMaster[0] || metadata.height !== expectedMaster[1]) failures.push(`Unexpected master size ${metadata.width}x${metadata.height}: ${path.relative(root, master)}`)
}

const sourceFiles = (await filesIn(path.join(root, 'src'))).filter((file) => /\.(?:js|jsx)$/.test(file))
for (const source of sourceFiles) {
  const contents = await readFile(source, 'utf8')
  const urls = [...contents.matchAll(/['"](\/assets\/images\/[^'"]+)['"]/g)].map((match) => match[1])
  for (const url of urls) if (!(await exists(publicFile(url)))) failures.push(`Broken source reference in ${path.relative(root, source)}: ${url}`)
}

const allAssets = await filesIn(path.join(publicRoot, 'assets', 'images'))
const masterAssets = await filesIn(masterRoot)
const publicPngCount = allAssets.filter((file) => file.endsWith('.png')).length
const pngCount = masterAssets.filter((file) => file.endsWith('.png')).length
const webpCount = allAssets.filter((file) => file.endsWith('.webp')).length
const temporaryCount = [...allAssets, ...masterAssets].filter((file) => file.endsWith('.processing')).length

if (Object.keys(imageManifest).length !== 81) failures.push(`Manifest has ${Object.keys(imageManifest).length} entries instead of 81`)
if (pngCount !== 116) failures.push(`Master archive has ${pngCount} PNGs instead of 116`)
if (temporaryCount) failures.push(`${temporaryCount} temporary processing files remain`)
if (publicPngCount) failures.push(`${publicPngCount} PNG masters remain in public/ and would inflate the production build`)

if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else {
  console.info(`Image audit passed: ${Object.keys(imageManifest).length} integrated records, ${pngCount} preserved PNG masters outside public/, ${webpCount} published WebPs, 0 broken references.`)
}

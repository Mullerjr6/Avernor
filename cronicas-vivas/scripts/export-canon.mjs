import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { artifacts, characters, cities, locations, portals } from '../../src/content/index.js'
import { contentDate } from '../../src/content/schema.js'

const directory = path.dirname(fileURLToPath(import.meta.url))
const outputDirectory = path.resolve(directory, '../src/generated')
const outputFile = path.join(outputDirectory, 'canon.json')

const requestedRecords = [
  ['characters', characters, 'sirius-kayler'],
  ['characters', characters, 'elara'],
  ['characters', characters, 'rainha-aelwen'],
  ['locations', locations, 'floresta-antiga'],
  ['portals', portals, 'caminho-das-arvores-ausentes'],
  ['cities', cities, 'lethariel'],
  ['artifacts', artifacts, 'carta-de-normus'],
  ['artifacts', artifacts, 'medalhao-da-folha-partida'],
]

const fields = [
  'id', 'slug', 'name', 'subtitle', 'summary', 'description', 'category', 'status', 'origin', 'location',
  'period', 'kingdom', 'race', 'lineage', 'appearance', 'personality', 'speech', 'objectives', 'desires',
  'fears', 'flaws', 'qualities', 'values', 'moralLimits', 'beliefs', 'equipment', 'abilities', 'limitations',
  'relations', 'events', 'curiosities', 'quotes', 'truthStatus', 'canonStatus', 'spoilerLevel', 'image', 'thumbnail',
]

function compactRecord(collection, source, id) {
  const record = source.find((item) => item.id === id)
  if (!record) throw new Error(`Registro canônico ausente: ${collection}/${id}`)
  return Object.fromEntries(fields.flatMap((field) => {
    const value = record[field]
    if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) return []
    return [[field, value]]
  }))
}

const records = requestedRecords.map(([collection, source, id]) => ({
  collection,
  ...compactRecord(collection, source, id),
}))

const payload = {
  schemaVersion: 1,
  contentDate,
  source: 'Enciclopédia oficial de Avernor',
  chapter: 'capitulo-zero-o-grito-na-floresta',
  records,
}

await mkdir(outputDirectory, { recursive: true })
await writeFile(outputFile, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
console.log(`Cânone de Crônicas Vivas sincronizado: ${records.length} registros em ${path.relative(process.cwd(), outputFile)}.`)

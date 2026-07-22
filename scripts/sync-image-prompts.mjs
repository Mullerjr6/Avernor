import { access, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const promptRoot = path.join(root, 'docs', 'image-prompts')
const masterRoot = path.join(root, 'artwork-masters', 'assets', 'images')
const files = (await readdir(promptRoot)).filter((file) => file.endsWith('.md'))
let updated = 0
let integrated = 0
const missing = []

async function exists(file) {
  try { await access(file); return true } catch { return false }
}

for (const file of files) {
  const promptPath = path.join(promptRoot, file)
  const original = await readFile(promptPath, 'utf8')
  let source = original
    .replace(/(?:public)?\/?assets\/images\//g, 'artwork-masters/assets/images/')

  if (file.startsWith('religions-')) {
    source = source.replace(/artwork-masters\/assets\/images\/gallery\//g, 'artwork-masters/assets/images/religions/')
  }

  const match = source.match(/artwork-masters\/assets\/images\/([^`\s]+\.png)/)
  if (match) {
    const master = path.join(masterRoot, ...match[1].split('/'))
    if (await exists(master)) {
      integrated += 1
      source = source.replace(/Status:\s*pendente\.?/i, 'Status: gerada e integrada.')
    } else {
      missing.push(`${file}: ${path.relative(root, master)}`)
    }
  }

  if (source !== original) {
    await writeFile(promptPath, source, 'utf8')
    updated += 1
  }
}

if (missing.length) {
  console.error(`Prompts com mestre ausente (${missing.length}):\n${missing.join('\n')}`)
  process.exitCode = 1
} else {
  console.info(`Image prompts synchronized: ${integrated} integrated masters, ${updated} documents updated, 0 missing targets.`)
}

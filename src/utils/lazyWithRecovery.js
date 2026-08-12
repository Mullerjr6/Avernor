import { lazy } from 'react'

const recoveryKey = 'avernor:module-recovery'
const recoveryParameter = 'avernor-version'
const recoveryWindow = 90_000

export function isVersionLoadError(error) {
  const message = String(error?.message ?? error ?? '')
  return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|ChunkLoadError|Loading chunk|MIME type.*text\/html|dynamically imported module/i.test(message)
}

function lastRecovery() {
  try {
    return Number(window.sessionStorage.getItem(recoveryKey) ?? 0)
  } catch {
    return 0
  }
}

export function recoverLatestVersion(error) {
  if (!isVersionLoadError(error) || Date.now() - lastRecovery() < recoveryWindow) return false

  try {
    window.sessionStorage.setItem(recoveryKey, String(Date.now()))
  } catch {
    // A navegação com identificador único ainda força a revalidação sem sessionStorage.
  }

  const url = new URL(window.location.href)
  url.searchParams.set(recoveryParameter, String(Date.now()))
  window.location.replace(url)
  return true
}

function markVersionAsLoaded() {
  try {
    window.sessionStorage.removeItem(recoveryKey)
  } catch {
    // Ambientes que bloqueiam armazenamento continuam funcionando normalmente.
  }

  const url = new URL(window.location.href)
  if (!url.searchParams.has(recoveryParameter)) return
  url.searchParams.delete(recoveryParameter)
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
}

export function lazyWithRecovery(importer) {
  return lazy(() => importer()
    .then((module) => {
      markVersionAsLoaded()
      return module
    })
    .catch((error) => {
      if (recoverLatestVersion(error)) return new Promise(() => {})
      throw error
    }))
}

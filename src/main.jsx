import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { recoverLatestVersion } from './utils/lazyWithRecovery'
import './styles.css'
import './styles/refinement.css'
import './styles/expansion.css'
import './styles/archive.css'
import './styles/polish.css'

window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault()
  recoverLatestVersion(event.payload ?? new Error('Failed to fetch dynamically imported module'))
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)

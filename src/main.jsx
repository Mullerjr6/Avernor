import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './styles.css'
import './styles/refinement.css'
import './styles/expansion.css'
import './styles/archive.css'
import './styles/polish.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)

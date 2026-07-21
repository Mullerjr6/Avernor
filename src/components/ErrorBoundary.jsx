import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <main className="error-state">
          <span className="kicker">Falha de leitura</span>
          <h1>O Arquivo não conseguiu abrir este registro.</h1>
          <p>Recarregue a página. Se o problema persistir, o registro precisa ser revisado.</p>
          <button type="button" className="button button-primary" onClick={() => window.location.reload()}>Recarregar</button>
        </main>
      )
    }
    return this.props.children
  }
}


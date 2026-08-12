import { Component } from 'react'
import { isVersionLoadError, recoverLatestVersion } from '../utils/lazyWithRecovery'

export default class ErrorBoundary extends Component {
  state = { error: null, errorCode: '' }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    if (recoverLatestVersion(error)) return
    const signature = `${error?.name ?? 'Error'}:${error?.message ?? 'falha-sem-mensagem'}:${info?.componentStack ?? ''}`
    let hash = 0
    for (let index = 0; index < signature.length; index += 1) hash = ((hash << 5) - hash + signature.charCodeAt(index)) | 0
    this.setState({ errorCode: `AR-${Math.abs(hash).toString(36).toUpperCase().padStart(6, '0').slice(0, 6)}` })
    console.error('Falha de leitura no Arquivo de Avernor', error, info)
  }

  reloadLatest = () => {
    try {
      window.sessionStorage.clear()
    } catch {
      // O recarregamento com URL nova continua válido sem acesso ao armazenamento.
    }
    const url = new URL(window.location.href)
    url.searchParams.set('avernor-version', String(Date.now()))
    window.location.replace(url)
  }

  render() {
    if (this.state.error) {
      const versionFailure = isVersionLoadError(this.state.error)
      return (
        <main className="error-state">
          <span className="kicker">{versionFailure ? 'Nova edição disponível' : 'Falha de leitura'}</span>
          <h1>{versionFailure ? 'O Arquivo recebeu uma versão mais recente.' : 'O Arquivo não conseguiu abrir este registro.'}</h1>
          <p>{versionFailure ? 'A página será atualizada com os códices mais recentes. Se necessário, use o botão abaixo uma única vez.' : 'O erro foi isolado. Atualize a versão ou retorne ao índice enquanto este registro é revisado.'}</p>
          {this.state.errorCode && <small className="error-code">Código de diagnóstico: {this.state.errorCode}</small>}
          <div className="error-actions">
            <button type="button" className="button button-primary" onClick={this.reloadLatest}>Atualizar versão</button>
            <a className="button button-secondary" href="/">Voltar ao início</a>
          </div>
        </main>
      )
    }
    return this.props.children
  }
}


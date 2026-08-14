import { useEffect, useState } from 'react'
import CodexDrawer from './components/CodexDrawer.jsx'
import DialoguePanel from './components/DialoguePanel.jsx'
import TitleScreen from './components/TitleScreen.jsx'
import { requestNarrativeReply } from './api/narrativeClient.js'
import { backgrounds, portraits } from './data/visuals.js'
import { story } from './engine/chapterZero.js'
import {
  SAVE_KEY, applyNarrativeTurn, currentScene, loadState, persistState, progressFor, resetState,
} from './engine/gameEngine.js'

export default function App() {
  const [game, setGame] = useState(() => loadState())
  const [screen, setScreen] = useState('title')
  const [codexOpen, setCodexOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [hasSave, setHasSave] = useState(() => Boolean(localStorage.getItem(SAVE_KEY)))
  const scene = currentScene(game)
  const background = backgrounds[scene.stage]
  const activePortraits = scene.portraits.map((id) => ({ id, ...portraits[id] })).filter(({ src }) => src)
  const progress = progressFor(game)
  const activeChapter = story.chapters.find(({ id }) => id === game.chapterId)

  useEffect(() => {
    if (screen !== 'game') return
    persistState(game)
  }, [game, screen])

  useEffect(() => {
    if (screen !== 'game' || game.totalTurns === 0) return
    document.getElementById('sirius-dialogue')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [game.totalTurns, game.sceneId, screen])

  const locationName = scene.location || 'Floresta Antiga'

  function startNew() {
    if (hasSave && !window.confirm('Recomeçar apagará o progresso atual desta jornada neste aparelho. Deseja continuar?')) return
    const initial = resetState()
    setGame(initial)
    setHasSave(true)
    setScreen('game')
    window.scrollTo({ top: 0 })
  }

  async function sendDialogue(text) {
    if (busy) return
    setBusy(true)
    try {
      const stateAtRequest = game
      const sceneAtRequest = currentScene(stateAtRequest)
      const narrativeReply = await requestNarrativeReply({ text, state: stateAtRequest, scene: sceneAtRequest })
      setHasSave(true)
      setGame((current) => current.sceneId === stateAtRequest.sceneId
        ? applyNarrativeTurn(current, narrativeReply, text)
        : current)
    } finally {
      setBusy(false)
    }
  }

  if (screen === 'title') {
    return <TitleScreen hasSave={hasSave} onStart={startNew} onContinue={() => setScreen('game')} />
  }

  return (
    <main className={`game-screen mood-${scene.mood}`}>
      <img key={scene.stage} className="scene-background" src={background.src} alt={background.alt} />
      <div className="scene-vignette" />
      <div className="scene-grain" />

      <header className="game-header">
        <button className="brand-button" type="button" onClick={() => setScreen('title')} aria-label="Voltar ao título">
          <span className="mini-sigil"><i>A</i></span>
          <span><strong>Crônicas Vivas</strong><small>AVERNOR</small></span>
        </button>
        <div className="chapter-progress" aria-label={`${progress}% do capítulo percorrido`}>
          <span>{activeChapter?.number ?? scene.chapterNumber}</span>
          <div><i style={{ width: `${progress}%` }} /></div>
          <small>{progress}%</small>
        </div>
        <div className="header-actions">
          <span className={`save-state ${busy ? 'is-saving' : ''}`}><i /> {busy ? 'A história responde' : 'Salvo'}</span>
          <button type="button" onClick={() => setCodexOpen(true)}>Códice <b>{game.discovered.length}</b></button>
        </div>
      </header>

      <div className="location-mark">
        <span>LOCAL ATUAL</span>
        <strong>{locationName}</strong>
      </div>

      <div className={`portrait-ensemble count-${activePortraits.length}`} aria-hidden="true">
        {activePortraits.map((portrait, index) => (
          <figure key={`${scene.id}-${portrait.id}`} className={`character-portrait portrait-${index + 1}`}>
            <img src={portrait.src} alt="" style={{ objectPosition: portrait.focus }} />
          </figure>
        ))}
      </div>

      <div className="game-content">
        <DialoguePanel
          scene={scene}
          history={game.storyHistory}
          busy={busy}
          onDialogue={sendDialogue}
        />
      </div>

      <button className="mobile-codex" type="button" onClick={() => setCodexOpen(true)} aria-label="Abrir códice">⌘</button>
      {codexOpen && (
        <>
          <div className="drawer-scrim is-open" onClick={() => setCodexOpen(false)} aria-hidden="true" />
          <CodexDrawer
            discovered={game.discovered}
            inventory={game.inventory}
            relationships={game.relationships}
            memories={game.storyMemories}
            progress={game.codexProgress}
            open
            onClose={() => setCodexOpen(false)}
          />
        </>
      )}
    </main>
  )
}

import { useEffect, useMemo, useState } from 'react'
import CodexDrawer from './components/CodexDrawer.jsx'
import DialoguePanel from './components/DialoguePanel.jsx'
import TitleScreen from './components/TitleScreen.jsx'
import { requestNarrativeReply } from './api/narrativeClient.js'
import { backgrounds, portraits } from './data/visuals.js'
import { chapter } from './engine/chapterZero.js'
import { interpretPlayerDialogue } from './engine/dialogueInterpreter.js'
import {
  SAVE_KEY, addFreeReply, choicesForScene, choose, loadState, persistState, progressFor, resetState,
} from './engine/gameEngine.js'

export default function App() {
  const [game, setGame] = useState(() => loadState())
  const [screen, setScreen] = useState('title')
  const [codexOpen, setCodexOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [hasSave, setHasSave] = useState(() => Boolean(localStorage.getItem(SAVE_KEY)))
  const scene = chapter.scenes[game.sceneId]
  const background = backgrounds[scene.stage]
  const portrait = scene.portrait ? portraits[scene.portrait] : null
  const replies = Array.isArray(game.freeReplies[scene.id]) ? game.freeReplies[scene.id] : []
  const availableChoices = choicesForScene(game, scene)
  const canFreeTalk = game.flags.metElara && !scene.ending && scene.passage.some(({ speaker }) => speaker === 'ELARA')
  const progress = progressFor(game)

  useEffect(() => {
    if (screen !== 'game') return
    persistState(game)
  }, [game, screen])

  useEffect(() => {
    if (screen === 'game') window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [game.sceneId, screen])

  const locationName = useMemo(() => {
    if (scene.location) return scene.location
    if (scene.stage === 'lethariel') return 'Lethariel'
    if (scene.stage === 'palace') return 'Palácio da Seiva Clara'
    if (scene.stage === 'hiddenPath') return 'Caminho das Árvores Ausentes'
    return 'Floresta Antiga'
  }, [scene.location, scene.stage])

  function startNew() {
    if (hasSave && !window.confirm('Recomeçar apagará o progresso atual deste capítulo. Deseja continuar?')) return
    const initial = resetState()
    setGame(initial)
    setHasSave(true)
    setScreen('game')
  }

  function makeChoice(choiceId) {
    setHasSave(true)
    setGame((current) => choose(current, choiceId))
  }

  async function sendFreeText(text) {
    setBusy(true)
    try {
      const interpretation = interpretPlayerDialogue(text, game, scene)
      const narrativeReply = await requestNarrativeReply({ text, state: game, scene, interpretation })
      setHasSave(true)
      setGame((current) => addFreeReply(current, { ...narrativeReply, playerText: text }, interpretation))
    } finally {
      setBusy(false)
    }
  }

  if (screen === 'title') {
    return <TitleScreen hasSave={hasSave} onStart={startNew} onContinue={() => setScreen('game')} />
  }

  return (
    <main className={`game-screen mood-${scene.mood}`}>
      <img key={scene.id} className="scene-background" src={background.src} alt={background.alt} />
      <div className="scene-vignette" />
      <div className="scene-grain" />

      <header className="game-header">
        <button className="brand-button" type="button" onClick={() => setScreen('title')} aria-label="Voltar ao título">
          <span className="mini-sigil"><i>A</i></span>
          <span><strong>Crônicas Vivas</strong><small>AVERNOR</small></span>
        </button>
        <div className="chapter-progress" aria-label={`${progress}% do capítulo concluído`}>
          <span>{chapter.number}</span>
          <div><i style={{ width: `${progress}%` }} /></div>
          <small>{progress}%</small>
        </div>
        <div className="header-actions">
          <span className="save-state"><i /> Salvo</span>
          <button type="button" onClick={() => setCodexOpen(true)}>Códice <b>{game.discovered.length}</b></button>
        </div>
      </header>

      <div className="location-mark">
        <span>LOCAL ATUAL</span>
        <strong>{locationName}</strong>
      </div>

      {portrait && (
        <figure key={portrait.src} className="character-portrait">
          <img src={portrait.src} alt={portrait.alt} style={{ objectPosition: portrait.focus }} />
        </figure>
      )}

      <div className="game-content">
        <DialoguePanel
          key={scene.id}
          scene={scene}
          replies={replies}
          choices={availableChoices}
          consequence={game.pendingConsequence}
          canFreeTalk={canFreeTalk}
          busy={busy}
          onChoice={makeChoice}
          onFreeText={sendFreeText}
        />
        {scene.ending && (
          <section className="ending-actions">
            <p>{scene.endingLabel ?? 'Capítulo Zero concluído'}</p>
            <button type="button" onClick={() => setScreen('title')}>Voltar ao título</button>
            <button type="button" onClick={() => setCodexOpen(true)}>Rever descobertas</button>
          </section>
        )}
      </div>

      <button className="mobile-codex" type="button" onClick={() => setCodexOpen(true)} aria-label="Abrir códice">⌘</button>
      {codexOpen && (
        <>
          <div className="drawer-scrim is-open" onClick={() => setCodexOpen(false)} aria-hidden="true" />
          <CodexDrawer
            discovered={game.discovered}
            inventory={game.inventory}
            relationships={game.relationships}
            flags={game.flags}
            dialogueInsights={game.dialogueInsights}
            open
            onClose={() => setCodexOpen(false)}
          />
        </>
      )}
    </main>
  )
}

import { useEffect } from 'react'
import Header from '../Header/Header'
import GameBoard from '../GameBoard/GameBoard'
import Timer from '../Timer/Timer'
import ProgressBar from '../ProgressBar/ProgressBar'
import WinScreen from '../WinScreen/WinScreen'
import LoseScreen from '../LoseScreen/LoseScreen'
import MatchedContainer from '../MatchedContainer/MatchedContainer'
import HelpButton from '../HelpButton/HelpButton'
import MusicPlayer from '../MusicPlayer/MusicPlayer'
import { useGame, GAME_ACTIONS } from '../../context/GameContext'
import { useAudio } from '../../context/AudioContext'
import { LEVELS } from '../../data/levels'
import './App.css'

function App() {
  const { state, dispatch } = useGame()
  const { playSound } = useAudio()
  
  const currentLevel = LEVELS[state.level]
  const totalPairs = currentLevel.cardsCount / 2
  
  // Get matched cards for the container
  const matchedCards = state.cards.filter(card => card.isMatched)

  // Sound Effects
  useEffect(() => {
    if (state.gameStatus === 'won') {
      playSound('WIN')
    } else if (state.gameStatus === 'lost') {
        playSound('LOSE')
    }
  }, [state.gameStatus])

  useEffect(() => {
    if (state.matchedPairs > 0) {
      playSound('MATCH')
    }
  }, [state.matchedPairs])

  function handleCardClick(cardId) {
    playSound('FLIP')
    dispatch({ 
      type: GAME_ACTIONS.FLIP_CARD, 
      payload: { cardId } 
    })
  }

  function handleLevelChange(newLevel) {
    dispatch({ 
      type: GAME_ACTIONS.CHANGE_LEVEL, 
      payload: { level: newLevel } 
    })
  }

  function handleTogglePause() {
    dispatch({ type: GAME_ACTIONS.TOGGLE_PAUSE })
  }

  function startNewGame() {
    dispatch({ type: GAME_ACTIONS.RESET_GAME })
    // Trigger START_GAME via the useEffect in GameContext
    setTimeout(() => {
      dispatch({ type: GAME_ACTIONS.START_GAME })
    }, 100)
  }

  // Navigate to next level
  function handleNextLevel(nextLevel) {
    dispatch({ 
      type: GAME_ACTIONS.CHANGE_LEVEL, 
      payload: { level: nextLevel } 
    })
    // The level change will trigger START_GAME via useEffect in GameContext
  }

  // Handle share score (optional callback for analytics/tracking)
  function handleShareScore(score, level, timeElapsed) {
    console.log('Score shared:', { score, level, timeElapsed })
    // Future: Send to backend for leaderboards
  }

  const totalTime = currentLevel.timerMinutes * 60; // Calculate total time in seconds

  return (
    <div className="app">
      <div className="pause-button-container">
         <button className="pause-icon-btn" onClick={handleTogglePause}>
           {state.gameStatus === 'paused' ? '▶️' : '⏸'} 
           <br/>
           <span style={{fontSize: '0.6rem'}}>{state.gameStatus === 'paused' ? 'Resume' : 'Pause'}</span>
         </button>
      </div>

      <div className="glass-panel">
        
        {/* Dashboard Header */}
        <div className="dashboard-header">
          {/* Left: Circular Timer */}
          <div className="dashboard-left">
             <Timer timeRemaining={state.timeRemaining} totalTime={totalTime} />
          </div>

          {/* Center: Score & Level */}
          <div className="dashboard-center">
            <div className="score-display">SCORE: {state.matchedPairs * 125}</div>
            <div className="level-display">Level {state.level === 'easy' ? '1' : state.level === 'medium' ? '2' : '3'}</div>
          </div>

          {/* Right: Combo & Stats */}
          <div className="dashboard-right">
              <div className="combo-container">
                <span className="combo-text">COMBO: {state.combo}x</span>
                <ProgressBar current={state.matchedPairs} total={totalPairs} />
              </div>
             <button className="stats-btn">Stats</button>
          </div>
        </div>

        {/* Hidden original header for functionality if needed, but we used custom UI above */}
        {/* <Header level={state.level} onLevelChange={handleLevelChange} /> */}
        
        {/* Controls (Music/Help) - moved to bottom or hidden/integrated? Images shows music in bottom right or elsewhere. 
            Let's keep them handy but maybe less obtrusive or integrated into dashboard? 
            For now, let's put them floating bottom right or just below dashboard.
        */}
        
        <div className="game-layout">
          <GameBoard 
            cards={state.cards}
            onCardClick={handleCardClick}
            disabled={state.disabled}
            gridColumns={currentLevel.gridColumns}
          />
          {state.gameStatus === 'paused' && (
            <div className="paused-overlay">
              <div className="paused-content">
                <span className="paused-icon">⏸</span>
                <h2 className="paused-title">GAME PAUSED</h2>
                <button className="btn-primary-neon" onClick={handleTogglePause}>RESUME</button>
              </div>
            </div>
          )}
        </div>
        
         <div className="bottom-controls">
            <HelpButton />
            <MusicPlayer />
            {/* Level Controls as small pills below */}
            <div className="mini-level-selector">
                <span onClick={() => handleLevelChange('easy')}>1</span>
                <span onClick={() => handleLevelChange('medium')}>2</span>
                <span onClick={() => handleLevelChange('hard')}>3</span>
            </div>
        </div>

      </div>

      {state.gameStatus === 'won' && (
        <WinScreen 
          onNextLevel={handleNextLevel}
          onRestart={startNewGame}
          onShareScore={handleShareScore}
          matchedPairs={state.matchedPairs}
          timeElapsed={state.timeElapsed}
          currentLevel={state.level}
        />
      )}

      {state.gameStatus === 'lost' && (
        <LoseScreen 
          onRestart={startNewGame}
          matchedPairs={state.matchedPairs}
          totalPairs={totalPairs}
        />
      )}
    </div>
  )
}

export default App

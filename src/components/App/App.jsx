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

  function startNewGame() {
    dispatch({ type: GAME_ACTIONS.RESET_GAME })
    // Trigger START_GAME via the useEffect in GameContext
    setTimeout(() => {
      dispatch({ type: GAME_ACTIONS.START_GAME })
    }, 100)
  }

  return (
    <div className="app">
      <Header level={state.level} onLevelChange={handleLevelChange} />
      
      <div className="game-info">
        <Timer timeRemaining={state.timeRemaining} />
        <ProgressBar current={state.matchedPairs} total={totalPairs} />
        <div className="controls-group">
          <HelpButton />
          <MusicPlayer />
        </div>
      </div>

      <div className="game-layout">
        <MatchedContainer 
          matchedCards={matchedCards}
          totalPairs={totalPairs}
        />
        
        <GameBoard 
          cards={state.cards}
          onCardClick={handleCardClick}
          disabled={state.disabled}
          gridColumns={currentLevel.gridColumns}
        />
      </div>

      {state.gameStatus === 'won' && (
        <WinScreen 
          onRestart={startNewGame}
          matchedPairs={state.matchedPairs}
          timeElapsed={state.timeElapsed}
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

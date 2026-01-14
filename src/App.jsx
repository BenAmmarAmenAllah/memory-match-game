import Header from './components/Header'
import GameBoard from './components/GameBoard'
import Timer from './components/Timer'
import ProgressBar from './components/ProgressBar'
import WinScreen from './components/WinScreen'
import LoseScreen from './components/LoseScreen'
import MatchedContainer from './components/MatchedContainer'
import { useGame, GAME_ACTIONS } from './contexts/GameContext'
import { LEVELS } from './data/levels'
import './App.css'

function App() {
  const { state, dispatch } = useGame()
  
  const currentLevel = LEVELS[state.level]
  const totalPairs = currentLevel.cardsCount / 2
  
  // Get matched cards for the container
  const matchedCards = state.cards.filter(card => card.isMatched)

  function handleCardClick(cardId) {
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

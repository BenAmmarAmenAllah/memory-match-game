import { useState, useEffect } from 'react'
import Header from './components/Header'
import GameBoard from './components/GameBoard'
import Timer from './components/Timer'
import ProgressBar from './components/ProgressBar'
import WinScreen from './components/WinScreen'
import LoseScreen from './components/LoseScreen'
import { EMOJIS } from './data/emojis'
import { LEVELS, DEFAULT_LEVEL } from './data/levels'
import { generateCards } from './utils/cardUtils'
import './App.css'

function App() {
  const [level, setLevel] = useState(DEFAULT_LEVEL)
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [gameStatus, setGameStatus] = useState('idle') // 'idle' | 'playing' | 'won' | 'lost'
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [disabled, setDisabled] = useState(false)

  const currentLevel = LEVELS[level]
  const totalPairs = currentLevel.cardsCount / 2

  // Initialize game
  useEffect(() => {
    startNewGame()
  }, [level])

  // Timer countdown
  useEffect(() => {
    if (gameStatus !== 'playing') return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setGameStatus('lost')
          return 0
        }
        return prev - 1
      })
      setTimeElapsed(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStatus])

  // Check for win condition
  useEffect(() => {
    if (matchedPairs === totalPairs && matchedPairs > 0) {
      setGameStatus('won')
    }
  }, [matchedPairs, totalPairs])

  function startNewGame() {
    const newCards = generateCards(EMOJIS, currentLevel.cardsCount)
    setCards(newCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setGameStatus('playing')
    setTimeRemaining(currentLevel.timerMinutes * 60)
    setTimeElapsed(0)
    setDisabled(false)
  }

  function handleCardClick(cardId) {
    if (disabled || flippedCards.length >= 2) return

    const card = cards.find(c => c.id === cardId)
    if (card.isFlipped || card.isMatched) return

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    // Update card state to flipped
    setCards(cards.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ))

    // Check for match when 2 cards are flipped
    if (newFlippedCards.length === 2) {
      setDisabled(true)
      const [firstId, secondId] = newFlippedCards
      const firstCard = cards.find(c => c.id === firstId)
      const secondCard = cards.find(c => c.id === secondId)

      if (firstCard.emoji === secondCard.emoji) {
        // Match found!
        setTimeout(() => {
          setCards(cards.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isMatched: true } 
              : c
          ))
          setMatchedPairs(prev => prev + 1)
          setFlippedCards([])
          setDisabled(false)
        }, 600)
      } else {
        // No match
        setTimeout(() => {
          setCards(cards.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false } 
              : c
          ))
          setFlippedCards([])
          setDisabled(false)
        }, 1000)
      }
    }
  }

  function handleLevelChange(newLevel) {
    setLevel(newLevel)
  }

  return (
    <div className="app">
      <Header level={level} onLevelChange={handleLevelChange} />
      
      <div className="game-info">
        <Timer timeRemaining={timeRemaining} />
        <ProgressBar current={matchedPairs} total={totalPairs} />
      </div>

      <GameBoard 
        cards={cards}
        onCardClick={handleCardClick}
        disabled={disabled}
        gridColumns={currentLevel.gridColumns}
      />

      {gameStatus === 'won' && (
        <WinScreen 
          onRestart={startNewGame}
          matchedPairs={matchedPairs}
          timeElapsed={timeElapsed}
        />
      )}

      {gameStatus === 'lost' && (
        <LoseScreen 
          onRestart={startNewGame}
          matchedPairs={matchedPairs}
          totalPairs={totalPairs}
        />
      )}
    </div>
  )
}

export default App

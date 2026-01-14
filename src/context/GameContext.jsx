import { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { LEVELS } from '../data/levels';
import { useTimer } from '../hooks/useTimer';
import { gameReducer, initialState, GAME_ACTIONS } from '../reducers/gameReducer';

// Create Context
const GameContext = createContext();

// Export Actions
export { GAME_ACTIONS };

// Provider Component
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Initialize game on mount and level change
  useEffect(() => {
    dispatch({ type: GAME_ACTIONS.START_GAME });
  }, [state.level]);

  // Timer tick callback
  const handleTimerTick = useCallback(() => {
    dispatch({ type: GAME_ACTIONS.TIMER_TICK });
  }, []);

  // Timer time-up callback
  const handleTimeUp = useCallback(() => {
    if (state.gameStatus === 'playing') {
      dispatch({ type: GAME_ACTIONS.GAME_LOST });
    }
  }, [state.gameStatus]);

  // Use the custom timer hook
  const { stopTimer, resetTimer } = useTimer(
    state.timeRemaining,
    state.gameStatus === 'playing',
    handleTimerTick,
    handleTimeUp
  );

  // Check for time's up condition
  useEffect(() => {
    if (state.gameStatus === 'playing' && state.timeRemaining === 0) {
      stopTimer();
      dispatch({ type: GAME_ACTIONS.GAME_LOST });
    }
  }, [state.timeRemaining, state.gameStatus, stopTimer]);

  // Check for win condition
  useEffect(() => {
    const currentLevel = LEVELS[state.level];
    const totalPairs = currentLevel.cardsCount / 2;
    
    if (state.matchedPairs === totalPairs && state.matchedPairs > 0) {
      stopTimer();
      dispatch({ type: GAME_ACTIONS.GAME_WON });
    }
  }, [state.matchedPairs, state.level, stopTimer]);

  // Handle card matching logic
  useEffect(() => {
    if (state.flippedCards.length === 2) {
      const [firstId, secondId] = state.flippedCards;
      const firstCard = state.cards.find(c => c.id === firstId);
      const secondCard = state.cards.find(c => c.id === secondId);

      if (firstCard.emoji === secondCard.emoji) {
        // Match found!
        setTimeout(() => {
          dispatch({
            type: GAME_ACTIONS.MATCH_FOUND,
            payload: { firstId, secondId }
          });
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          dispatch({
            type: GAME_ACTIONS.NO_MATCH,
            payload: { firstId, secondId }
          });
        }, 1000);
      }
    }
  }, [state.flippedCards, state.cards]);

  const value = {
    state,
    dispatch
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

// Custom Hook to use Game Context
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

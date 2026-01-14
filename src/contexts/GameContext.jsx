import { createContext, useReducer, useContext, useEffect } from 'react';
import { EMOJIS } from '../data/emojis';
import { LEVELS, DEFAULT_LEVEL } from '../data/levels';
import { generateCards } from '../utils/cardUtils';

// Create Context
const GameContext = createContext();

// Action Types
export const GAME_ACTIONS = {
  START_GAME: 'START_GAME',
  FLIP_CARD: 'FLIP_CARD',
  MATCH_FOUND: 'MATCH_FOUND',
  NO_MATCH: 'NO_MATCH',
  RESET_GAME: 'RESET_GAME',
  CHANGE_LEVEL: 'CHANGE_LEVEL',
  TIMER_TICK: 'TIMER_TICK',
  GAME_WON: 'GAME_WON',
  GAME_LOST: 'GAME_LOST',
  SET_DISABLED: 'SET_DISABLED'
};

// Initial State
const initialState = {
  level: DEFAULT_LEVEL,
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  gameStatus: 'idle', // 'idle' | 'playing' | 'won' | 'lost'
  timeRemaining: 0,
  timeElapsed: 0,
  disabled: false
};

// Reducer Function
function gameReducer(state, action) {
  switch (action.type) {
    case GAME_ACTIONS.START_GAME: {
      const currentLevel = LEVELS[state.level];
      const newCards = generateCards(EMOJIS, currentLevel.cardsCount);
      return {
        ...state,
        cards: newCards,
        flippedCards: [],
        matchedPairs: 0,
        gameStatus: 'playing',
        timeRemaining: currentLevel.timerMinutes * 60,
        timeElapsed: 0,
        disabled: false
      };
    }

    case GAME_ACTIONS.FLIP_CARD: {
      const { cardId } = action.payload;
      const card = state.cards.find(c => c.id === cardId);
      
      // Don't flip if already flipped or matched
      if (card.isFlipped || card.isMatched || state.disabled || state.flippedCards.length >= 2) {
        return state;
      }

      const newFlippedCards = [...state.flippedCards, cardId];
      const updatedCards = state.cards.map(c =>
        c.id === cardId ? { ...c, isFlipped: true } : c
      );

      return {
        ...state,
        cards: updatedCards,
        flippedCards: newFlippedCards,
        disabled: newFlippedCards.length === 2
      };
    }

    case GAME_ACTIONS.MATCH_FOUND: {
      const { firstId, secondId } = action.payload;
      const updatedCards = state.cards.map(c =>
        c.id === firstId || c.id === secondId
          ? { ...c, isMatched: true }
          : c
      );

      return {
        ...state,
        cards: updatedCards,
        matchedPairs: state.matchedPairs + 1,
        flippedCards: [],
        disabled: false
      };
    }

    case GAME_ACTIONS.NO_MATCH: {
      const { firstId, secondId } = action.payload;
      const updatedCards = state.cards.map(c =>
        c.id === firstId || c.id === secondId
          ? { ...c, isFlipped: false }
          : c
      );

      return {
        ...state,
        cards: updatedCards,
        flippedCards: [],
        disabled: false
      };
    }

    case GAME_ACTIONS.CHANGE_LEVEL:
      return {
        ...initialState,
        level: action.payload.level
      };

    case GAME_ACTIONS.RESET_GAME:
      return {
        ...state,
        gameStatus: 'idle'
      };

    case GAME_ACTIONS.TIMER_TICK:
      return {
        ...state,
        timeRemaining: Math.max(0, state.timeRemaining - 1),
        timeElapsed: state.timeElapsed + 1
      };

    case GAME_ACTIONS.GAME_WON:
      return {
        ...state,
        gameStatus: 'won'
      };

    case GAME_ACTIONS.GAME_LOST:
      return {
        ...state,
        gameStatus: 'lost',
        timeRemaining: 0
      };

    case GAME_ACTIONS.SET_DISABLED:
      return {
        ...state,
        disabled: action.payload.disabled
      };

    default:
      return state;
  }
}

// Provider Component
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Initialize game on mount and level change
  useEffect(() => {
    dispatch({ type: GAME_ACTIONS.START_GAME });
  }, [state.level]);

  // Timer countdown effect
  useEffect(() => {
    if (state.gameStatus !== 'playing') return;

    const timer = setInterval(() => {
      dispatch({ type: GAME_ACTIONS.TIMER_TICK });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.gameStatus]);

  // Check for time's up
  useEffect(() => {
    if (state.gameStatus === 'playing' && state.timeRemaining === 0) {
      dispatch({ type: GAME_ACTIONS.GAME_LOST });
    }
  }, [state.timeRemaining, state.gameStatus]);

  // Check for win condition
  useEffect(() => {
    const currentLevel = LEVELS[state.level];
    const totalPairs = currentLevel.cardsCount / 2;
    
    if (state.matchedPairs === totalPairs && state.matchedPairs > 0) {
      dispatch({ type: GAME_ACTIONS.GAME_WON });
    }
  }, [state.matchedPairs, state.level]);

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

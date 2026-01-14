import { EMOJIS } from '../data/emojis';
import { LEVELS, DEFAULT_LEVEL } from '../data/levels';
import { generateCards } from '../utils/cardUtils';

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
  SET_DISABLED: 'SET_DISABLED',
  USE_HINT: 'USE_HINT',
  REVEAL_HINT: 'REVEAL_HINT',
  HIDE_HINT: 'HIDE_HINT'
};

// Initial State
export const initialState = {
  level: DEFAULT_LEVEL,
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  gameStatus: 'idle', // 'idle' | 'playing' | 'won' | 'lost'
  timeRemaining: 0,
  timeElapsed: 0,
  disabled: false,
  hintsRemaining: 0,
  hintedCards: []
};

// Reducer Function
export function gameReducer(state, action) {
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
        disabled: false,
        hintsRemaining: currentLevel.hints,
        hintedCards: []
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

    case GAME_ACTIONS.USE_HINT: {
      if (state.hintsRemaining <= 0 || state.hintedCards.length > 0) {
        return state;
      }
      
      // Find first unmatched pair
      const unmatchedCards = state.cards.filter(c => !c.isMatched && !c.isFlipped);
      const emojiGroups = {};
      
      unmatchedCards.forEach(card => {
        if (!emojiGroups[card.emoji]) {
          emojiGroups[card.emoji] = [];
        }
        emojiGroups[card.emoji].push(card);
      });
      
      // Find first pair
      let hintPair = null;
      for (const emoji in emojiGroups) {
        if (emojiGroups[emoji].length === 2) {
          hintPair = emojiGroups[emoji];
          break;
        }
      }
      
      if (!hintPair) {
        return state;
      }
      
      return {
        ...state,
        hintsRemaining: state.hintsRemaining - 1,
        hintedCards: [hintPair[0].id, hintPair[1].id],
        disabled: true
      };
    }

    case GAME_ACTIONS.REVEAL_HINT: {
      const { cardIds } = action.payload;
      const updatedCards = state.cards.map(c =>
        cardIds.includes(c.id) ? { ...c, isFlipped: true } : c
      );
      
      return {
        ...state,
        cards: updatedCards
      };
    }

    case GAME_ACTIONS.HIDE_HINT: {
      const { cardIds } = action.payload;
      const updatedCards = state.cards.map(c =>
        cardIds.includes(c.id) ? { ...c, isFlipped: false } : c
      );
      
      return {
        ...state,
        cards: updatedCards,
        hintedCards: [],
        disabled: false
      };
    }

    default:
      return state;
  }
}

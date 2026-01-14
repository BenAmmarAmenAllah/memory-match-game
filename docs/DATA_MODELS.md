# 📦 Data Models

## Card Object
```javascript
{
  id: string,        // Unique identifier, e.g., "card-1"
  emoji: string,     // Emoji character, e.g., "🎮"
  isFlipped: boolean,// Currently showing face
  isMatched: boolean // Already matched with pair
}
```

## Level Object
```javascript
{
  name: string,       // "Easy" | "Medium" | "Hard"
  cardsCount: number, // Total cards (32, 64, 128)
  timerMinutes: number, // Countdown time in minutes
  hints: number,      // Available hints
  gridColumns: number // Grid layout columns
}
```

## Game State
```javascript
{
  cards: Card[],
  flippedCards: string[],  // IDs of currently flipped (max 2)
  matchedPairs: number,
  currentLevel: Level,
  gameStatus: 'idle' | 'playing' | 'won' | 'lost',
  hintsLeft: number,
  timeRemaining: number
}
```

## Audio State
```javascript
{
  musicEnabled: boolean,
  soundEnabled: boolean,
  volume: number,     // 0-1
  currentTrack: string
}
```

## Level Configurations
```javascript
export const LEVELS = {
  easy: {
    name: 'Easy',
    cardsCount: 32,       // 16 pairs
    timerMinutes: 5,      // 5 minutes
    hints: 2,
    gridColumns: 8
  },
  medium: {
    name: 'Medium',
    cardsCount: 64,       // 32 pairs
    timerMinutes: 10,     // 10 minutes
    hints: 3,
    gridColumns: 8
  },
  hard: {
    name: 'Hard',
    cardsCount: 128,      // 64 pairs
    timerMinutes: 15,     // 15 minutes
    hints: 4,
    gridColumns: 8
  }
};
```

## Emoji Collection
```javascript
export const EMOJIS = [ '😀', '🤣', '😍', '🤩', '😝', '🥳', '😘', '😈', '👿', '🤮', '🤑', '🤫', '💩', '🤡', '🌈', '🔥', '🍎', '🍕', '🚗', '🚀', '⚽️', '🎸', '🎮', '💡', '🐶', '🐱', '🦋', '🌸', '🌍', '🍦', '💎', '🔑', '🎁', '🎈', '🎨', '🎹', '🎬', '🏆', '🏝️', '🌕', '👻', '👽', '👾', '🤖', '👑', '🧤', '👓', '👜', '🥨', '🍩', '🍣', '🍤', '🍭', '🍺', '🛹', '🚲', '🚂', '✈️', '🛰️', '⏰', '🔋', '🧿', '🧬', '🧪' ];
```

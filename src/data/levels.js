// Level configurations for different difficulty modes
export const LEVELS = {
  easy: {
    name: 'Easy',
    cardsCount: 16,       // 8 pairs
    timerMinutes: 5,      // 5 minutes
    hints: 2,
    gridColumns: 4
  },
  medium: {
    name: 'Medium',
    cardsCount: 24,       // 12 pairs
    timerMinutes: 8,      // 8 minutes
    hints: 3,
    gridColumns: 6
  },
  hard: {
    name: 'Hard',
    cardsCount: 32,       // 16 pairs
    timerMinutes: 12,     // 12 minutes
    hints: 4,
    gridColumns: 8
  }
};

export const DEFAULT_LEVEL = 'easy';

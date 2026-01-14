// Utility functions for card manipulation

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate card pairs from emoji array
 */
export function generateCards(emojis, count) {
  const pairsNeeded = count / 2;
  const selectedEmojis = emojis.slice(0, pairsNeeded);
  
  // Create pairs
  const pairs = selectedEmojis.flatMap((emoji, index) => [
    { id: `card-${index}-a`, emoji, isFlipped: false, isMatched: false },
    { id: `card-${index}-b`, emoji, isFlipped: false, isMatched: false }
  ]);
  
  return shuffle(pairs);
}

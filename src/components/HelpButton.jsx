import { useEffect } from 'react';
import { useGame, GAME_ACTIONS } from '../contexts/GameContext';
import './HelpButton.css';

function HelpButton() {
  const { state, dispatch } = useGame();

  const handleHintClick = () => {
    if (state.hintsRemaining <= 0 || state.gameStatus !== 'playing' || state.disabled) {
      return;
    }

    // Use hint - find and mark a pair
    dispatch({ type: GAME_ACTIONS.USE_HINT });
  };

  // Handle revealing and hiding hinted cards
  useEffect(() => {
    if (state.hintedCards.length === 2) {
      // Reveal the hinted cards
      setTimeout(() => {
        dispatch({
          type: GAME_ACTIONS.REVEAL_HINT,
          payload: { cardIds: state.hintedCards }
        });
      }, 100);

      // Hide them after 2.5 seconds
      setTimeout(() => {
        dispatch({
          type: GAME_ACTIONS.HIDE_HINT,
          payload: { cardIds: state.hintedCards }
        });
      }, 2600);
    }
  }, [state.hintedCards, dispatch]);

  const isDisabled = 
    state.hintsRemaining <= 0 || 
    state.gameStatus !== 'playing' || 
    state.disabled ||
    state.hintedCards.length > 0;

  return (
    <button
      className={`help-button ${isDisabled ? 'disabled' : ''}`}
      onClick={handleHintClick}
      disabled={isDisabled}
      title={state.hintsRemaining > 0 ? `${state.hintsRemaining} hints remaining` : 'No hints left'}
    >
      <span className="help-icon">💡</span>
      <span className="hint-count">{state.hintsRemaining}</span>
    </button>
  );
}

export default HelpButton;

import Card from './Card';
import './GameBoard.css';

function GameBoard({ cards, onCardClick, disabled, gridColumns }) {
  return (
    <div 
      className="game-board"
      style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
    >
      {cards.map(card => (
        <Card 
          key={card.id}
          card={card}
          onClick={onCardClick}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

export default GameBoard;

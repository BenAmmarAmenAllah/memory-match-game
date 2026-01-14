import './Card.css';

function Card({ card, onClick, disabled }) {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card.id);
    }
  };

  return (
    <div 
      className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <span className="card-icon">?</span>
        </div>
        <div className="card-back">
          <span className="card-emoji">{card.emoji}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;

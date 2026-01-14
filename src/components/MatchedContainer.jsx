import './MatchedContainer.css';

function MatchedContainer({ matchedCards, totalPairs }) {
  return (
    <div className="matched-container">
      <div className="container-header">
        <span className="container-icon">🎯</span>
        <h3 className="container-title">Matched Pairs</h3>
      </div>
      
      <div className="container-body">
        <div className="container-basket">
          <div className="basket-top"></div>
          <div className="basket-middle"></div>
          <div className="basket-bottom"></div>
          
          <div className="matched-cards-grid">
            {matchedCards.map((card, index) => (
              <div 
                key={card.id} 
                className="matched-card-mini"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="mini-emoji">{card.emoji}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="container-count">
          <span className="count-number">{matchedCards.length / 2}</span>
          <span className="count-divider">/</span>
          <span className="count-total">{totalPairs}</span>
        </div>
      </div>
    </div>
  );
}

export default MatchedContainer;

import './LoseScreen.css';

function LoseScreen({ onRestart, matchedPairs, totalPairs }) {
  return (
    <div className="overlay">
      <div className="overlay-content lose">
        <div className="overlay-icon">😢</div>
        <h2 className="overlay-title">Time's Up!</h2>
        <p className="overlay-message">Better luck next time!</p>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Pairs Matched</span>
            <span className="stat-value">{matchedPairs} / {totalPairs}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Completion</span>
            <span className="stat-value">
              {Math.round((matchedPairs / totalPairs) * 100)}%
            </span>
          </div>
        </div>
        <button className="overlay-button" onClick={onRestart}>
          Try Again
        </button>
      </div>
    </div>
  );
}

export default LoseScreen;

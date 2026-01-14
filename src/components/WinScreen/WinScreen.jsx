import './WinScreen.css';

function WinScreen({ onRestart, matchedPairs, timeElapsed }) {
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  return (
    <div className="overlay">
      <div className="overlay-content win">
        <div className="overlay-icon">🏆</div>
        <h2 className="overlay-title">Congratulations!</h2>
        <p className="overlay-message">You won the game!</p>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Pairs Matched</span>
            <span className="stat-value">{matchedPairs}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Time Taken</span>
            <span className="stat-value">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
        <button className="overlay-button" onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default WinScreen;

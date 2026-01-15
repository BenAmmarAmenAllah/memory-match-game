import './LoseScreen.css';

function LoseScreen({ onRestart, onBackToMenu, matchedPairs, totalPairs }) {
  const completionPercentage = Math.round((matchedPairs / totalPairs) * 100);

  return (
    <div className="overlay lose-overlay">
      <div className="overlay-content lose-glass">
        {/* Hourglass Icon Container */}
        <div className="lose-icon-container">
          <div className="pulse-slow"></div>
          <svg className="hourglass-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2H6V7.172C6 7.702 6.211 8.211 6.586 8.586L10.172 12.172C10.547 12.547 10.758 13.056 10.758 13.586V16.828L5.414 22.172C4.781 22.805 5.228 23.887 6.121 23.887H17.879C18.772 23.887 19.219 22.805 18.586 22.172L13.242 16.828V13.586C13.242 13.056 13.453 12.547 13.828 12.172L17.414 8.586C17.789 8.211 18 7.702 18 7.172V2ZM16 7C16 7.265 15.895 7.519 15.707 7.707L12 11.414V16H11V11.414L7.293 7.707C7.105 7.519 7 7.265 7 7V4H16V7Z" fill="currentColor"/>
          </svg>
        </div>

        <h2 className="lose-title">Time's <span className="highlight">Up!</span></h2>
        <p className="lose-subtitle">Better luck next time, champ!</p>

        <div className="lose-stats-grid">
          <div className="lose-stat-box">
            <span className="lose-stat-label">PAIRS MATCHED</span>
            <span className="lose-stat-value">{matchedPairs} <span className="stat-separator">/</span> {totalPairs}</span>
          </div>
          <div className="lose-stat-box">
            <span className="lose-stat-label">COMPLETION</span>
            <span className="lose-stat-value">{completionPercentage}%</span>
          </div>
        </div>

        <div className="lose-actions">
          <button className="btn-restart-neon" onClick={onRestart}>
            <svg className="restart-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V1L8 5L12 9V6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18C8.69 18 6 15.31 6 12H4C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4Z" fill="currentColor"/>
            </svg>
            TRY AGAIN
          </button>
          
          <button className="btn-back-menu" onClick={onBackToMenu}>
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoseScreen;


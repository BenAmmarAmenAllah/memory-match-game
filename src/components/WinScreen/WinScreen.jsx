import './WinScreen.css';

function WinScreen({ onRestart, matchedPairs, timeElapsed }) {
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  
  // Fake score calculation for visual flair
  const score = (matchedPairs * 1000) + Math.max(0, (300 - timeElapsed) * 50);

  return (
    <div className="overlay">
      {/* Background Particles/Confetti Simulation */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))} 
      </div>

      <div className="overlay-content win-glass">
        <h2 className="neon-title">YOU WIN!</h2>
        
        <div className="glass-stats-container">
          
          <div className="glass-stat-row">
            <span className="stat-icon">🕒</span>
            <div className="stat-details">
               <span className="stat-label">Time Elapsed:</span>
               <span className="stat-value">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
               </span>
            </div>
          </div>

          <div className="glass-stat-row">
             <span className="stat-icon">🎴</span>
             <div className="stat-details">
                <span className="stat-label">Pairs Matched:</span>
                <span className="stat-value">{matchedPairs}</span>
             </div>
          </div>

          <div className="glass-stat-row">
             <span className="stat-icon">⭐</span>
             <div className="stat-details">
                <span className="stat-label">Total Points:</span>
                <span className="stat-value highlight">{score.toLocaleString()}</span>
             </div>
          </div>

        </div>

        <div className="action-buttons">
            <button className="btn-primary-neon" onClick={onRestart}>
              PLAY NEXT LEVEL
            </button>
            <button className="btn-secondary-glass">
              SHARE SCORE
            </button>
        </div>
      </div>
    </div>
  );
}

export default WinScreen;

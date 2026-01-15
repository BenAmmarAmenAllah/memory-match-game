import { useState } from 'react';
import './WinScreen.css';

// Level order for progression
const LEVEL_ORDER = ['easy', 'medium', 'hard'];

function WinScreen({ onNextLevel, onRestart, onShareScore, matchedPairs, timeElapsed, currentLevel }) {
  const [shareStatus, setShareStatus] = useState(null);
  
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  
  // Score calculation
  const score = (matchedPairs * 1000) + Math.max(0, (300 - timeElapsed) * 50);

  // Check if there's a next level
  const currentLevelIndex = LEVEL_ORDER.indexOf(currentLevel);
  const hasNextLevel = currentLevelIndex < LEVEL_ORDER.length - 1;
  const nextLevel = hasNextLevel ? LEVEL_ORDER[currentLevelIndex + 1] : null;

  // Handle next level / play again button
  const handleNextLevelClick = () => {
    if (hasNextLevel && onNextLevel) {
      onNextLevel(nextLevel);
    } else if (onRestart) {
      // At max level, restart current level
      onRestart();
    }
  };

  // Handle share score
  const handleShareScore = async () => {
    const shareText = `🎮 Memory Match Game\n🏆 Level: ${currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}\n⏱️ Time: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}\n🎴 Pairs: ${matchedPairs}\n⭐ Score: ${score.toLocaleString()}\n\nCan you beat my score?`;

    // Try Web Share API first (works on mobile and some desktop browsers)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Memory Match Game - Score',
          text: shareText,
        });
        setShareStatus('shared');
        setTimeout(() => setShareStatus(null), 2000);
      } catch (err) {
        // User cancelled or share failed, try clipboard fallback
        if (err.name !== 'AbortError') {
          copyToClipboard(shareText);
        }
      }
    } else {
      // Fallback to clipboard
      copyToClipboard(shareText);
    }

    // Call optional callback
    if (onShareScore) {
      onShareScore(score, currentLevel, timeElapsed);
    }
  };

  // Clipboard fallback
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setShareStatus('copied');
      setTimeout(() => setShareStatus(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setShareStatus('error');
      setTimeout(() => setShareStatus(null), 2000);
    }
  };

  // Dynamic button text based on level
  const nextLevelButtonText = hasNextLevel 
    ? `PLAY NEXT LEVEL (${nextLevel?.toUpperCase()})` 
    : 'PLAY AGAIN';

  // Share button text based on status
  const getShareButtonText = () => {
    switch (shareStatus) {
      case 'copied': return '✓ COPIED TO CLIPBOARD!';
      case 'shared': return '✓ SHARED!';
      case 'error': return '✗ SHARE FAILED';
      default: return 'SHARE SCORE';
    }
  };

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
            <button className="btn-primary-neon" onClick={handleNextLevelClick}>
              {nextLevelButtonText}
            </button>
            <button 
              className={`btn-secondary-glass ${shareStatus ? 'status-' + shareStatus : ''}`}
              onClick={handleShareScore}
            >
              {getShareButtonText()}
            </button>
        </div>
      </div>
    </div>
  );
}

export default WinScreen;

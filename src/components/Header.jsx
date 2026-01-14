import './Header.css';

function Header({ level, onLevelChange }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="game-title">🎮 Memory Match Game</h1>
        <div className="level-selector">
          <button 
            className={`level-btn ${level === 'easy' ? 'active' : ''}`}
            onClick={() => onLevelChange('easy')}
          >
            Easy
          </button>
          <button 
            className={`level-btn ${level === 'medium' ? 'active' : ''}`}
            onClick={() => onLevelChange('medium')}
          >
            Medium
          </button>
          <button 
            className={`level-btn ${level === 'hard' ? 'active' : ''}`}
            onClick={() => onLevelChange('hard')}
          >
            Hard
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

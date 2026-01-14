import './Timer.css';

function Timer({ timeRemaining }) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  
  const isWarning = timeRemaining <= 60;
  const isCritical = timeRemaining <= 30;

  return (
    <div className={`timer ${isWarning ? 'warning' : ''} ${isCritical ? 'critical' : ''}`}>
      <span className="timer-icon">⏱️</span>
      <span className="timer-display">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}

export default Timer;

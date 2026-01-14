import './Timer.css';

function Timer({ timeRemaining, totalTime = 300 }) { // Default 5 mins if not passed
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  
  // Circle Configuration
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const progress = timeRemaining / totalTime;
  const strokeDashoffset = circumference - (progress * circumference);
  
  // Color/State
  const isWarning = timeRemaining <= 60;
  
  return (
    <div className="timer-circle-container">
      <svg width="100" height="100" className="timer-svg">
        <circle 
          cx="50" cy="50" r={radius} 
          className="circle-bg" 
        />
        <circle 
          cx="50" cy="50" r={radius} 
          className={`circle-progress ${isWarning ? 'warning' : ''}`}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="timer-text">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
    </div>
  );
}

export default Timer;

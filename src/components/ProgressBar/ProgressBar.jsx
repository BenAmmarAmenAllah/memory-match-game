import './ProgressBar.css';

function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="progress-label">Matched Pairs</span>
        <span className="progress-count">{current} / {total}</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        >
          {percentage > 10 && (
            <span className="progress-percentage">{Math.round(percentage)}%</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;

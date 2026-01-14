import './ProgressBar.css';

function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-bar-minimal">
        <div 
          className="progress-fill-minimal"
          style={{ width: `${percentage}%` }}
        />
    </div>
  );
}

export default ProgressBar;

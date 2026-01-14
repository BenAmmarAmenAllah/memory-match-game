import { useAudio } from '../../context/AudioContext';
import './SettingsPanel.css';

function SettingsPanel({ onClose }) {
  const {
    musicVolume,
    setMusicVolume,
    sfxVolume,
    setSfxVolume,
    isMuted,
    setIsMuted,
    isPlaying,
    toggleMusic
  } = useAudio();

  return (
    <div className="settings-overlay">
      <div className="settings-panel">
        <div className="settings-header">
          <h2>⚙️ Settings</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="settings-content">
          <div className="setting-group">
            <label className="setting-label">
              <span>🔊 Master Sound</span>
              <input
                type="checkbox"
                checked={!isMuted}
                onChange={() => setIsMuted(!isMuted)}
                className="toggle-checkbox"
              />
            </label>
          </div>

          <div className="setting-group">
            <label className="setting-label">
              <span>🎵 Music</span>
              <button 
                className={`music-toggle-btn ${isPlaying ? 'active' : ''}`}
                onClick={toggleMusic}
                disabled={isMuted}
              >
                {isPlaying ? 'Playing' : 'Paused'}
              </button>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={musicVolume}
              onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
              disabled={isMuted}
              className="volume-slider"
            />
          </div>

          <div className="setting-group">
            <label className="setting-label">
              <span>🔔 Sound Effects</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={sfxVolume}
              onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
              disabled={isMuted}
              className="volume-slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;

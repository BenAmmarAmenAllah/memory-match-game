import { useState } from 'react';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import './MusicPlayer.css';

function MusicPlayer() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <button 
        className="music-player-btn"
        onClick={() => setShowSettings(true)}
        title="Audio Settings"
      >
        🎵
      </button>

      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
    </>
  );
}

export default MusicPlayer;

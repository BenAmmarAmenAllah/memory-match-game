import { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import './MusicPlayer.css';

function MusicPlayer() {
  const [showSettings, setShowSettings] = useState(false);
  const { isPlaying, toggleMusic, isMuted } = useAudio();

  // Quick toggle music on single click, open settings on long press or right-click could be added later
  const handleMusicClick = (e) => {
    // If Ctrl/Cmd is held, open settings instead
    if (e.ctrlKey || e.metaKey) {
      setShowSettings(true);
    } else {
      toggleMusic();
    }
  };

  // Determine icon based on state
  const getMusicIcon = () => {
    if (isMuted) return '🔇';
    if (isPlaying) return '🎵';
    return '🔈';
  };

  return (
    <>
      <button 
        className={`music-player-btn ${isPlaying ? 'playing' : ''} ${isMuted ? 'muted' : ''}`}
        onClick={handleMusicClick}
        onContextMenu={(e) => { e.preventDefault(); setShowSettings(true); }}
        title={isPlaying ? "Click to pause music | Right-click for settings" : "Click to play music | Right-click for settings"}
      >
        {getMusicIcon()}
      </button>

      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
    </>
  );
}

export default MusicPlayer;


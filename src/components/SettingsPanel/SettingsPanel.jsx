import { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { useGame, GAME_ACTIONS } from '../../context/GameContext';
import { LEVELS } from '../../data/levels';
import './SettingsPanel.css';

function SettingsPanel({ onClose }) {
  const {
    musicVolume,
    setMusicVolume,
    sfxVolume,
    setSfxVolume,
    isMuted,
    toggleMute,
    isPlaying,
    toggleMusic
  } = useAudio();

  const { state, dispatch } = useGame();
  
  // Local state for visual toggles (these could be moved to context if functional implementation is needed later)
  const [animations, setAnimations] = useState(true);
  const [highPerformance, setHighPerformance] = useState(true);

  const handleLevelChange = (levelKey) => {
    dispatch({ 
      type: GAME_ACTIONS.CHANGE_LEVEL, 
      payload: { level: levelKey } 
    });
  };

  const currentLevelKey = state.level;

  return (
    <div className="settings-overlay">
      <div className="settings-panel">
        <h2 className="settings-title">Memory Match: Level & Settings</h2>

        {/* Level Selection Section */}
        <div className="level-selection-container">
          <div 
            className={`level-card ${currentLevelKey === 'easy' ? 'active' : ''}`}
            onClick={() => handleLevelChange('easy')}
          >
            <div className="level-info">
              <span className="level-name">Easy</span>
              <span className="level-grid">4x4</span>
            </div>
            <div className="grid-icon easy">
               {/* 4x4 Grid representation */}
               <div className="grid-preview g-4x4">
                  {[...Array(16)].map((_, i) => <div key={i}></div>)}
               </div>
            </div>
          </div>

          <div 
            className={`level-card ${currentLevelKey === 'medium' ? 'active' : ''}`}
            onClick={() => handleLevelChange('medium')}
          >
             <div className="level-info">
              <span className="level-name">Medium</span>
              <span className="level-grid">6x4</span>
            </div>
            <div className="grid-icon medium">
                {/* 6x4 Grid representation specific to this game logic usually, but user image showed 6x4? 
                   Actually code existing says Medium is 6 columns. 24 cards. so 6x4.
                */}
               <div className="grid-preview g-6x4">
                  {[...Array(24)].map((_, i) => <div key={i}></div>)}
               </div>
            </div>
          </div>

          <div 
            className={`level-card ${currentLevelKey === 'hard' ? 'active' : ''}`}
            onClick={() => handleLevelChange('hard')}
          >
             <div className="level-info">
              <span className="level-name">Hard</span>
              <span className="level-grid">8x4</span>
            </div>
            <div className="grid-icon hard">
                {/* 8 columns, 32 cards => 8x4 */}
               <div className="grid-preview g-8x4">
                  {[...Array(32)].map((_, i) => <div key={i}></div>)}
               </div>
            </div>
          </div>
        </div>

        {/* Audio Settings Section */}
        <div className="settings-section">
          <h3>Audio Settings</h3>
          
          {/* Music & Mute Toggles */}
          <div className="toggles-container audio-toggles">
            <div className="toggle-item">
              <span>🎵 Background Music</span>
              <button 
                className={`toggle-switch ${isPlaying ? 'on' : 'off'}`}
                onClick={toggleMusic}
              >
                <span className="toggle-knob"></span>
                <span className="toggle-label">{isPlaying ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            <div className="toggle-item">
              <span>🔇 Mute All</span>
              <button 
                className={`toggle-switch ${isMuted ? 'on' : 'off'}`}
                onClick={toggleMute}
              >
                <span className="toggle-knob"></span>
                <span className="toggle-label">{isMuted ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>
          
          <div className="slider-group music-slider">
            <div className="slider-label">
              <span>Music Volume:</span>
              <span className="slider-value">{Math.round(musicVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={musicVolume}
              onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
              className="custom-range range-blue"
              disabled={isMuted}
            />
          </div>

          <div className="slider-group sfx-slider">
            <div className="slider-label">
              <span>SFX Volume:</span>
              <span className="slider-value">{Math.round(sfxVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={sfxVolume}
              onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
              className="custom-range range-purple"
              disabled={isMuted}
            />
          </div>
        </div>

        {/* Graphics & Performance Section */}
        <div className="settings-section">
          <h3>Graphics & Performance</h3>
          <div className="toggles-container">
            <div className="toggle-item">
              <span>Animations</span>
              <button 
                className={`toggle-switch ${animations ? 'on' : 'off'}`}
                onClick={() => setAnimations(!animations)}
              >
                <span className="toggle-knob"></span>
                <span className="toggle-label">{animations ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            <div className="toggle-item">
              <span>High Performance Mode</span>
               <button 
                className={`toggle-switch ${highPerformance ? 'on' : 'off'}`}
                onClick={() => setHighPerformance(!highPerformance)}
              >
                <span className="toggle-knob"></span>
                <span className="toggle-label">{highPerformance ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>
        </div>

        <button className="close-main-btn" onClick={onClose}>
          CLOSE
        </button>
      </div>
    </div>
  );
}

export default SettingsPanel;

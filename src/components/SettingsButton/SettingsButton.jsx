import { useState } from 'react';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import './SettingsButton.css';

function SettingsButton() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <button 
        className="settings-btn"
        onClick={() => setShowSettings(true)}
        title="Open Settings"
      >
        ⚙️
      </button>

      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
    </>
  );
}

export default SettingsButton;

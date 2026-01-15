import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App/App.jsx'
import { GameProvider } from './context/GameContext'
import { AudioProvider } from './context/AudioContext'

// Fix for mobile vh
const setVh = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};
window.addEventListener('resize', setVh);
setVh();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AudioProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </AudioProvider>
  </StrictMode>,
)

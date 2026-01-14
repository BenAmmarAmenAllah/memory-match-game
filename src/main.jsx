import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App/App.jsx'
import { GameProvider } from './context/GameContext'
import { AudioProvider } from './context/AudioContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AudioProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </AudioProvider>
  </StrictMode>,
)

import { createContext, useContext, useState, useEffect, useRef } from 'react';

const AudioContext = createContext();

export const AUDIO_FILES = {
  MUSIC: '/audio/background-music.mp3',
  FLIP: '/audio/flip.mp3',
  MATCH: '/audio/match.mp3',
  WIN: '/audio/win.mp3',
  LOSE: '/audio/lose.mp3',
  HINT: '/audio/hint.mp3'
};

export function AudioProvider({ children }) {
  const [musicVolume, setMusicVolume] = useState(0.3);
  const [sfxVolume, setSfxVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Music playing state

  const musicRef = useRef(null);

  // Initialize background music
  useEffect(() => {
    musicRef.current = new Audio(AUDIO_FILES.MUSIC);
    musicRef.current.loop = true;
    musicRef.current.volume = musicVolume;
    
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current = null;
      }
    };
  }, []);

  // Handle music volume/mute changes
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = isMuted ? 0 : musicVolume;
      
      if (isPlaying && !isMuted) {
        // Ensure play promise is handled
        const playPromise = musicRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Audio playback was prevented:", error);
            setIsPlaying(false);
          });
        }
      } else {
        musicRef.current.pause();
      }
    }
  }, [musicVolume, isMuted, isPlaying]);

  const toggleMusic = () => {
    setIsPlaying(prev => !prev);
  };

  const playSound = (soundName) => {
    if (isMuted) return;
    
    const file = AUDIO_FILES[soundName];
    if (file) {
      const audio = new Audio(file);
      audio.volume = sfxVolume;
      audio.play().catch(e => console.log("SFX play failed", e));
    }
  };

  const value = {
    musicVolume,
    setMusicVolume,
    sfxVolume,
    setSfxVolume,
    isMuted,
    setIsMuted,
    isPlaying,
    toggleMusic,
    playSound
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

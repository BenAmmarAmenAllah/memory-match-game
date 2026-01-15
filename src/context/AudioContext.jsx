import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const AudioContext = createContext();

// Audio file paths - NCS Cruising for background music
export const AUDIO_FILES = {
  MUSIC: '/audio/Aisake, Dosi - Cruising [NCS Release].mp3',
  FLIP: '/audio/flip.mp3',
  MATCH: '/audio/match.mp3',
  WIN: '/audio/win.mp3',
  LOSE: '/audio/lose.mp3',
  HINT: '/audio/hint.mp3'
};

/**
 * AudioProvider Component
 * 
 * Manages all audio in the game:
 * - Background music (loops, user-triggered start)
 * - Sound effects (SFX)
 * - Volume controls
 * - Mute functionality
 * 
 * Uses useRef to avoid recreating Audio objects on re-render.
 * Music starts only after user interaction (browser autoplay policy).
 */
export function AudioProvider({ children }) {
  // Volume states (0 to 1)
  const [musicVolume, setMusicVolume] = useState(0.3);
  const [sfxVolume, setSfxVolume] = useState(0.5);
  
  // Mute state (affects both music and SFX)
  const [isMuted, setIsMuted] = useState(false);
  
  // Music playing state - separate from mute
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Track if audio has been initialized (after first user interaction)
  const [isInitialized, setIsInitialized] = useState(false);

  // useRef to persist the Audio object without re-creating on re-render
  const musicRef = useRef(null);

  /**
   * Initialize Audio object once on mount
   * Does NOT auto-play - waits for user interaction
   */
  useEffect(() => {
    // Create Audio object only once
    musicRef.current = new Audio(AUDIO_FILES.MUSIC);
    musicRef.current.loop = true; // Enable looping
    musicRef.current.volume = musicVolume;
    musicRef.current.preload = 'auto'; // Preload for faster start
    
    // Cleanup on unmount
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current.src = ''; // Release audio resource
        musicRef.current = null;
      }
    };
  }, []); // Empty dependency - run once on mount

  /**
   * Update music volume when musicVolume or isMuted changes
   * Handle play/pause based on isPlaying state
   */
  useEffect(() => {
    if (!musicRef.current) return;

    // Update volume (0 if muted, otherwise actual volume)
    musicRef.current.volume = isMuted ? 0 : musicVolume;
  }, [musicVolume, isMuted]);

  /**
   * Handle play/pause when isPlaying changes
   */
  useEffect(() => {
    if (!musicRef.current || !isInitialized) return;

    if (isPlaying && !isMuted) {
      // Play with promise handling (required for browser autoplay policy)
      const playPromise = musicRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Music playback was prevented:", error.message);
          setIsPlaying(false);
        });
      }
    } else {
      musicRef.current.pause();
    }
  }, [isPlaying, isMuted, isInitialized]);

  /**
   * Start music - MUST be called from a user interaction event
   * This satisfies browser autoplay policies
   */
  const startMusic = useCallback(() => {
    if (!musicRef.current) return;
    
    setIsInitialized(true);
    setIsPlaying(true);
    
    // Attempt to play immediately (user interaction context)
    const playPromise = musicRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn("Music start failed:", error.message);
        setIsPlaying(false);
      });
    }
  }, []);

  /**
   * Stop music completely
   */
  const stopMusic = useCallback(() => {
    if (!musicRef.current) return;
    
    musicRef.current.pause();
    musicRef.current.currentTime = 0; // Reset to beginning
    setIsPlaying(false);
  }, []);

  /**
   * Toggle music play/pause
   */
  const toggleMusic = useCallback(() => {
    if (!isInitialized) {
      // First time - start music
      startMusic();
    } else {
      // Toggle play/pause
      setIsPlaying(prev => !prev);
    }
  }, [isInitialized, startMusic]);

  /**
   * Toggle mute (affects both music and SFX)
   */
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  /**
   * Play a sound effect
   * Creates a new Audio object each time (SFX can overlap)
   */
  const playSound = useCallback((soundName) => {
    if (isMuted) return;
    
    const file = AUDIO_FILES[soundName];
    if (file) {
      const audio = new Audio(file);
      audio.volume = sfxVolume;
      audio.play().catch(e => {
        // Silent catch - SFX failures are not critical
        console.debug("SFX play failed:", e.message);
      });
    }
  }, [isMuted, sfxVolume]);

  // Context value - all audio controls exposed to children
  const value = {
    // Volume controls
    musicVolume,
    setMusicVolume,
    sfxVolume,
    setSfxVolume,
    
    // Mute state
    isMuted,
    setIsMuted,
    toggleMute,
    
    // Music state & controls
    isPlaying,
    isInitialized,
    startMusic,
    stopMusic,
    toggleMusic,
    
    // SFX
    playSound
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

/**
 * Custom hook to use audio context
 * Throws error if used outside AudioProvider
 */
export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}


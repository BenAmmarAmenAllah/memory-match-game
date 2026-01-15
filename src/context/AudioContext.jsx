import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const AudioContext = createContext();

/**
 * ============================================
 * MUSIC TRACKS CONFIGURATION
 * ============================================
 * Add new NCS tracks here - just add to the array!
 * Download from: https://ncs.io/music-search?genre=60 (Lofi Hip-Hop)
 */
export const MUSIC_TRACKS = [
  {
    id: 'cruising',
    name: 'Cruising',
    artist: 'Aisake, Dosi',
    file: '/audio/Aisake, Dosi - Cruising [NCS Release].mp3',
    mood: 'Peaceful, Dreamy',
    genre: 'Lofi Hip-Hop'
  },
  // Add more tracks here in the future:
  // {
  //   id: 'miffy-cafe',
  //   name: 'miffy cafe',
  //   artist: 'Artist Name',
  //   file: '/audio/miffy-cafe.mp3',
  //   mood: 'Relaxed',
  //   genre: 'Lofi Hip-Hop'
  // },
  // {
  //   id: 'apart',
  //   name: 'apart',
  //   artist: 'Artist Name',
  //   file: '/audio/apart.mp3',
  //   mood: 'Dreamy, Laid Back',
  //   genre: 'Lofi Hip-Hop'
  // },
];

/**
 * ============================================
 * SOUND EFFECTS CONFIGURATION
 * ============================================
 * Add new sound effects here - just add to the object!
 */
export const SOUND_EFFECTS = {
  FLIP: {
    file: '/audio/flip.mp3',
    description: 'Card flip sound'
  },
  MATCH: {
    file: '/audio/match.mp3',
    description: 'Successful pair match'
  },
  WIN: {
    file: '/audio/win.mp3',
    description: 'Game won celebration'
  },
  LOSE: {
    file: '/audio/lose.mp3',
    description: 'Game over / time up'
  },
  HINT: {
    file: '/audio/hint.mp3',
    description: 'Hint button used'
  },
  // Add more SFX here:
  // COMBO: {
  //   file: '/audio/combo.mp3',
  //   description: 'Combo streak sound'
  // },
};

// Legacy support - keep AUDIO_FILES for backwards compatibility
export const AUDIO_FILES = {
  MUSIC: MUSIC_TRACKS[0]?.file || '',
  ...Object.fromEntries(
    Object.entries(SOUND_EFFECTS).map(([key, value]) => [key, value.file])
  )
};

/**
 * ============================================
 * AUDIO PROVIDER COMPONENT
 * ============================================
 * 
 * Features:
 * - Multiple background music tracks with selection
 * - Sound effects (SFX) for game events
 * - Volume controls (separate for music and SFX)
 * - Mute functionality
 * - Smooth looping without overlap
 * - User-interaction-based playback (browser policy compliant)
 * 
 * Uses useRef to avoid recreating Audio objects on re-render.
 */
export function AudioProvider({ children }) {
  // ============ STATE ============
  
  // Volume states (0 to 1)
  const [musicVolume, setMusicVolume] = useState(0.3);
  const [sfxVolume, setSfxVolume] = useState(0.5);
  
  // Mute state (affects both music and SFX)
  const [isMuted, setIsMuted] = useState(false);
  
  // Music playing state
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Track if audio has been initialized (after first user interaction)
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Current track selection
  const [currentTrackId, setCurrentTrackId] = useState(MUSIC_TRACKS[0]?.id || '');

  // ============ REFS ============
  
  // Music audio element (persists across re-renders)
  const musicRef = useRef(null);
  
  // SFX audio pool (prevents overlapping issues)
  const sfxPoolRef = useRef({});

  // ============ COMPUTED VALUES ============
  
  // Get current track object
  const currentTrack = MUSIC_TRACKS.find(t => t.id === currentTrackId) || MUSIC_TRACKS[0];

  // ============ EFFECTS ============

  /**
   * Initialize Audio object on mount and when track changes
   */
  useEffect(() => {
    if (!currentTrack) return;

    // Store current playing state and time before switching
    const wasPlaying = musicRef.current && !musicRef.current.paused;
    
    // Cleanup old audio
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.src = '';
    }

    // Create new Audio object for the new track
    musicRef.current = new Audio(currentTrack.file);
    musicRef.current.loop = true;
    musicRef.current.volume = isMuted ? 0 : musicVolume;
    musicRef.current.preload = 'auto';
    
    // Resume playing if it was playing before track change
    if (wasPlaying && isInitialized) {
      const playPromise = musicRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Track change play failed:", error.message);
        });
      }
    }
    
    // Cleanup on unmount
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current.src = '';
        musicRef.current = null;
      }
    };
  }, [currentTrackId]); // Re-run when track changes

  /**
   * Update music volume when musicVolume or isMuted changes
   */
  useEffect(() => {
    if (!musicRef.current) return;
    musicRef.current.volume = isMuted ? 0 : musicVolume;
  }, [musicVolume, isMuted]);

  /**
   * Handle play/pause when isPlaying changes
   */
  useEffect(() => {
    if (!musicRef.current || !isInitialized) return;

    if (isPlaying && !isMuted) {
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

  // ============ MUSIC CONTROLS ============

  /**
   * Start music - MUST be called from user interaction
   */
  const startMusic = useCallback(() => {
    if (!musicRef.current) return;
    
    setIsInitialized(true);
    setIsPlaying(true);
    
    const playPromise = musicRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn("Music start failed:", error.message);
        setIsPlaying(false);
      });
    }
  }, []);

  /**
   * Stop music and reset to beginning
   */
  const stopMusic = useCallback(() => {
    if (!musicRef.current) return;
    
    musicRef.current.pause();
    musicRef.current.currentTime = 0;
    setIsPlaying(false);
  }, []);

  /**
   * Toggle music play/pause
   */
  const toggleMusic = useCallback(() => {
    if (!isInitialized) {
      startMusic();
    } else {
      setIsPlaying(prev => !prev);
    }
  }, [isInitialized, startMusic]);

  /**
   * Change to a different track
   * @param {string} trackId - ID of the track to switch to
   */
  const changeTrack = useCallback((trackId) => {
    const track = MUSIC_TRACKS.find(t => t.id === trackId);
    if (track) {
      setCurrentTrackId(trackId);
    }
  }, []);

  /**
   * Skip to next track in the list
   */
  const nextTrack = useCallback(() => {
    const currentIndex = MUSIC_TRACKS.findIndex(t => t.id === currentTrackId);
    const nextIndex = (currentIndex + 1) % MUSIC_TRACKS.length;
    setCurrentTrackId(MUSIC_TRACKS[nextIndex].id);
  }, [currentTrackId]);

  /**
   * Go to previous track in the list
   */
  const prevTrack = useCallback(() => {
    const currentIndex = MUSIC_TRACKS.findIndex(t => t.id === currentTrackId);
    const prevIndex = (currentIndex - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    setCurrentTrackId(MUSIC_TRACKS[prevIndex].id);
  }, [currentTrackId]);

  // ============ MUTE CONTROL ============

  /**
   * Toggle mute (affects both music and SFX)
   */
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  // ============ SOUND EFFECTS ============

  /**
   * Play a sound effect
   * @param {string} soundName - Key from SOUND_EFFECTS (e.g., 'FLIP', 'MATCH')
   */
  const playSound = useCallback((soundName) => {
    if (isMuted) return;
    
    const sfx = SOUND_EFFECTS[soundName];
    if (sfx) {
      const audio = new Audio(sfx.file);
      audio.volume = sfxVolume;
      audio.play().catch(e => {
        console.debug("SFX play failed:", e.message);
      });
    }
  }, [isMuted, sfxVolume]);

  /**
   * Preload all sound effects for faster playback
   */
  const preloadSoundEffects = useCallback(() => {
    Object.entries(SOUND_EFFECTS).forEach(([key, sfx]) => {
      const audio = new Audio(sfx.file);
      audio.preload = 'auto';
      sfxPoolRef.current[key] = audio;
    });
  }, []);

  // Preload SFX on mount
  useEffect(() => {
    preloadSoundEffects();
  }, [preloadSoundEffects]);

  // ============ CONTEXT VALUE ============
  
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
    
    // Track selection
    currentTrack,
    currentTrackId,
    changeTrack,
    nextTrack,
    prevTrack,
    availableTracks: MUSIC_TRACKS,
    
    // SFX
    playSound,
    availableSounds: Object.keys(SOUND_EFFECTS)
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

/**
 * Custom hook to use audio context
 */
export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}



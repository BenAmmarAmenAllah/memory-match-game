import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for countdown timer functionality
 * @param {number} initialTime - Initial time in seconds
 * @param {boolean} isActive - Whether the timer should be counting down
 * @param {Function} onTick - Callback function called on each tick
 * @param {Function} onTimeUp - Callback function when time reaches 0
 */
export function useTimer(initialTime, isActive, onTick, onTimeUp) {
  const timerRef = useRef(null);
  const timeUpCalledRef = useRef(false);

  // Reset the timeUpCalled flag when initialTime changes (new game/level)
  useEffect(() => {
    timeUpCalledRef.current = false;
  }, [initialTime]);

  // Main timer effect
  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      if (onTick) {
        onTick();
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive, onTick]);

  // Stop timer utility
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Reset timer utility
  const resetTimer = useCallback(() => {
    stopTimer();
    timeUpCalledRef.current = false;
  }, [stopTimer]);

  return {
    stopTimer,
    resetTimer
  };
}

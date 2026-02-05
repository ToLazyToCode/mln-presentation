
import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export const usePerformance = () => {
  const setPerformanceMode = useStore((state) => state.setPerformanceMode);

  useEffect(() => {
    // Basic mobile detection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setPerformanceMode('low');
      return;
    }

    // FPS monitoring could be added here for dynamic scaling
  }, [setPerformanceMode]);
};

import { useEffect, useState, useRef } from 'react';
import { onScroll } from 'animejs';

/**
 * useLaptopScroll
 * Ties page scroll to the 3D laptop opening animation timeline
 * Uses Anime.js v4 onScroll / ScrollObserver with smooth dampening.
 */
export function useLaptopScroll({ trackRef }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;

    // Accessibility: Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setScrollProgress(1); // Set to fully open without aggressive 3D rotation
      return;
    }

    // Smooth Lerp loop: only runs when target differs from current
    const startLoop = () => {
      if (rafIdRef.current) return;
      const step = () => {
        const diff = targetProgressRef.current - currentProgressRef.current;
        if (Math.abs(diff) > 0.0005) {
          currentProgressRef.current += diff * 0.14;
          setScrollProgress(currentProgressRef.current);
          rafIdRef.current = requestAnimationFrame(step);
        } else {
          currentProgressRef.current = targetProgressRef.current;
          setScrollProgress(targetProgressRef.current);
          rafIdRef.current = null;
        }
      };
      rafIdRef.current = requestAnimationFrame(step);
    };

    // Calculate progress directly from bounding rect relative to viewport
    const calculateProgress = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const trackHeight = trackRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollableDistance = trackHeight - windowHeight;

      if (scrollableDistance <= 0) {
        targetProgressRef.current = 1;
        startLoop();
        return;
      }

      // Distance scrolled through the track
      const scrolled = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      targetProgressRef.current = rawProgress;
      startLoop();
    };

    let observer = null;
    let usingFallback = false;

    try {
      // 1. Initialize Anime.js v4 onScroll observer as primary tracker
      observer = onScroll({
        target: trackRef.current,
        enter: 'top top',
        leave: 'bottom bottom',
        onUpdate: (self) => {
          if (self && typeof self.progress === 'number') {
            targetProgressRef.current = self.progress;
            startLoop();
          }
        }
      });
      // Initial check and resize observer
      calculateProgress();
      window.addEventListener('resize', calculateProgress, { passive: true });
    } catch (_) {
      usingFallback = true;
      window.addEventListener('scroll', calculateProgress, { passive: true });
      window.addEventListener('resize', calculateProgress, { passive: true });
      calculateProgress();
    }

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      window.removeEventListener('resize', calculateProgress);
      if (usingFallback) {
        window.removeEventListener('scroll', calculateProgress);
      }
      if (observer && typeof observer.revert === 'function') {
        observer.revert();
      }
    };
  }, [trackRef]);

  return scrollProgress;
}

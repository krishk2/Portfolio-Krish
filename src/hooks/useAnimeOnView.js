// src/hooks/useAnimeOnView.js
// Fires an anime.js animation callback once the element enters the viewport.
// Returns a callback ref (function) — assign it as ref={ref} on any DOM element.
import { useRef, useCallback } from 'react';

export function useAnimeOnView(callback, options = {}) {
  const played = useRef(false);
  const observerRef = useRef(null);

  const ref = useCallback(
    (el) => {
      // Cleanup previous observer if element changes
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !played.current) {
            played.current = true;
            callback(el);
            observer.disconnect();
          }
        },
        { threshold: options.threshold ?? 0.12 }
      );

      observer.observe(el);
      observerRef.current = observer;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return ref;
}

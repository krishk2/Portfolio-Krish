// src/components/AsciiArt.jsx
// Displays ASCII art portrait with anime.js fade-in and cyber scramble reveal
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import asciiRaw from '../assets/ascii-image.txt?raw';
import styles from './AsciiArt.module.css';

const SCRAMBLE_CHARS = '0123456789*+=/#:;';
function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

export default function AsciiArt({ isReady = true }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Wait until startup intro is complete before starting scramble animation
    if (!isReady) return;

    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lines = asciiRaw.split(/\r?\n/);
    const activeSpans = [];

    container.innerHTML = '';
    const startTime = performance.now();

    lines.forEach((line, r) => {
      const lineDiv = document.createElement('div');
      lineDiv.className = styles.line;

      for (let c = 0; c < line.length; c++) {
        const char = line[c];
        if (char === ' ') {
          lineDiv.appendChild(document.createTextNode(' '));
        } else {
          const span = document.createElement('span');
          if (prefersReducedMotion) {
            span.textContent = char;
          } else {
            span.textContent = randomChar();
            // Slow, dramatic matrix decode wave across ~4.5 seconds
            const progress = (r / lines.length) * 0.65 + (c / line.length) * 0.35;
            const resolveAt = startTime + 350 + progress * 3800 + Math.random() * 350;
            activeSpans.push({
              span,
              target: char,
              resolveAt,
              done: false,
            });
          }
          lineDiv.appendChild(span);
        }
      }
      container.appendChild(lineDiv);
    });

    // Smooth fade in container
    animate(container, { opacity: [0, 1], duration: 1100, ease: 'out(3)' });

    if (prefersReducedMotion || activeSpans.length === 0) return;

    let rafId;
    let lastTick = 0;

    const tick = (now) => {
      // Throttle character flickering to ~45ms for smooth, deliberate terminal effect
      if (now - lastTick > 45) {
        lastTick = now;
        let remaining = 0;
        for (let i = 0; i < activeSpans.length; i++) {
          const item = activeSpans[i];
          if (item.done) continue;
          if (now >= item.resolveAt) {
            item.span.textContent = item.target;
            item.done = true;
          } else {
            // Flicker subset per frame for high performance with 15k+ glyphs
            if (Math.random() < 0.12) {
              item.span.textContent = randomChar();
            }
            remaining++;
          }
        }
        if (remaining === 0) return;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isReady]);

  return (
    <div className={styles.wrapper}>
      <pre
        ref={containerRef}
        className={styles.ascii}
        aria-hidden="true"
        style={{ opacity: 0 }}
      />
    </div>
  );
}

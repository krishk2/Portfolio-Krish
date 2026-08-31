// src/components/Cursor.jsx
// Custom magnetic cursor that follows the mouse with anime.js spring physics
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import styles from './Cursor.module.css';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide default cursor
    document.body.style.cursor = 'none';

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Dot snaps instantly via anime
      animate(dot, {
        left: e.clientX,
        top: e.clientY,
        duration: 80,
        ease: 'linear',
      });
    };

    // Ring lags behind with spring
    const lerp = (a, b, n) => a + (b - a) * n;
    const loop = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.12);
      ring.style.left = pos.current.x + 'px';
      ring.style.top = pos.current.y + 'px';
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    // Scale up on hovering clickable elements
    const onEnter = () => {
      animate(dot, { scale: 3, opacity: 0.3, duration: 300, ease: 'out(3)' });
      animate(ring, { scale: 1.6, duration: 300, ease: 'out(3)' });
    };
    const onLeave = () => {
      animate(dot, { scale: 1, opacity: 1, duration: 300, ease: 'out(3)' });
      animate(ring, { scale: 1, duration: 300, ease: 'out(3)' });
    };

    const clickables = document.querySelectorAll('a, button, [data-cursor]');
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', onMove);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </>
  );
}

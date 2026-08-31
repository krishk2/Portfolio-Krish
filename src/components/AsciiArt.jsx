// src/components/AsciiArt.jsx
// Converts a photo to ASCII art using Canvas API + animates with anime.js scramble
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import heroImg from '../assets/photo.jpg';
import styles from './AsciiArt.module.css';

// ASCII density ramp — dark pixels → dense chars, bright pixels → sparse
const RAMP = '@#S%?*+;:,. ';

// We'll calculate COLS dynamically to match the name height
// Name is clamp(60px, 10vw, 130px) × 2 lines × 0.95 line-height ≈ name block height
// We target the ASCII art width ≈ that height
const TARGET_WIDTH_PX = 250; // approx name block height in px

function imgToAscii(img, cols) {
  const canvas = document.createElement('canvas');
  const charAspect = 0.45; // mono chars are taller than wide
  const aspect = img.naturalHeight / img.naturalWidth;
  const rows = Math.round(cols * aspect * charAspect);

  canvas.width = cols;
  canvas.height = rows;

  const ctx = canvas.getContext('2d');
  ctx.filter = 'contrast(1.4) brightness(1.05)';
  ctx.drawImage(img, 0, 0, cols, rows);

  const data = ctx.getImageData(0, 0, cols, rows).data;
  const lines = [];

  for (let row = 0; row < rows; row++) {
    let line = '';
    for (let col = 0; col < cols; col++) {
      const idx = (row * cols + col) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const charIdx = Math.floor((lum / 255) * (RAMP.length - 1));
      line += RAMP[charIdx];
    }
    lines.push(line);
  }
  return lines;
}

const SCRAMBLE_CHARS = '@#%?*+;:,.abcdefghijklmnopqrstuvwxyz0123456789';
function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

export default function AsciiArt() {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const run = () => {
      const container = containerRef.current;
      if (!container) return;

      // Calculate COLS so ASCII width ≈ name height
      // Each mono char is roughly fontSize * 0.6 wide (Courier New)
      // We use CSS font-size = 11px, so charWidth ≈ 11 * 0.6 = 6.6px
      // letter-spacing 0.06em adds ~0.66px → ~7.26px per char
      const CHAR_W = 7.0;
      const COLS = Math.round(TARGET_WIDTH_PX / CHAR_W); // ~36 cols

      const lines = imgToAscii(img, COLS);

      container.innerHTML = '';
      const allSpans = [];

      lines.forEach((line) => {
        const lineDiv = document.createElement('div');
        lineDiv.className = styles.line;
        [...line].forEach((char) => {
          const span = document.createElement('span');
          span.textContent = randomChar();
          span.dataset.target = char;
          lineDiv.appendChild(span);
          allSpans.push(span);
        });
        container.appendChild(lineDiv);
      });

      // Fade in block
      animate(container, { opacity: [0, 1], duration: 600, ease: 'out(3)' });

      // Scramble → resolve, left-to-right cascade
      allSpans.forEach((span, i) => {
        const targetChar = span.dataset.target;
        const delay = 300 + i * 4;
        setTimeout(() => {
          let ticks = 0;
          const maxTicks = 6 + Math.floor(Math.random() * 8);
          const interval = setInterval(() => {
            ticks++;
            if (ticks >= maxTicks) {
              span.textContent = targetChar;
              clearInterval(interval);
            } else {
              span.textContent = randomChar();
            }
          }, 40);
        }, delay);
      });
    };

    if (img.complete && img.naturalWidth > 0) {
      run();
    } else {
      img.addEventListener('load', run, { once: true });
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <img
        ref={imgRef}
        src={heroImg}
        alt=""
        aria-hidden="true"
        style={{ display: 'none' }}
        crossOrigin="anonymous"
      />
      <pre
        ref={containerRef}
        className={styles.ascii}
        aria-hidden="true"
        style={{ opacity: 0 }}
      />
    </div>
  );
}

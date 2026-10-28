// src/components/StartupAnimation.jsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { animate, createTimeline } from 'animejs';
import { playPowerClick, playBootChime } from '../utils/startupAudio';
import styles from './StartupAnimation.module.css';

const BOOT_LOGS = [
  '> BIOS v2.4 (c) 2026 KRISHNA ARCH',
  '> INITIALIZING MULTI-AGENT KERNEL...',
  '> CPU: QUANTUM CORE @ 4.80 GHz [OK]',
  '> MEMORY: 64GB DDR5 ECC [OK]',
  '> GPU: NEURAL ACCELERATOR [READY]',
  '> MOUNTING /PORTFOLIO/KRISHNA...',
  '> STARTING DISPLAY SERVER :0',
  '> LAUNCHING WORKSPACE...',
];

export default function StartupAnimation({ onComplete }) {
  const [isBooting, setIsBooting] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState([]);
  const hasFinishedRef = useRef(false);

  const overlayRef = useRef(null);
  const cameraRef = useRef(null);
  const armRef = useRef(null);
  const fingerRef = useRef(null);
  const powerBtnRef = useRef(null);
  const screenRef = useRef(null);
  const deskLedRef = useRef(null);
  const gpuRgbRef = useRef(null);
  const cpuCoolerRef = useRef(null);
  const headphoneLedRef = useRef(null);
  const monitorLedRef = useRef(null);
  const flashRef = useRef(null);
  const timelineRef = useRef(null);

  const finish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    if (timelineRef.current) {
      timelineRef.current.pause();
    }

    if (overlayRef.current) {
      animate(overlayRef.current, {
        opacity: [overlayRef.current.style.opacity || 1, 0],
        duration: 350,
        ease: 'out(2)',
        complete: () => {
          onComplete?.();
        },
      });
    } else {
      onComplete?.();
    }
  }, [onComplete]);

  // Handle ESC or Space to skip
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ') {
        finish();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [finish]);

  useEffect(() => {
    // Reveal boot lines on monitor
    if (isBooting) {
      BOOT_LOGS.forEach((log, index) => {
        setTimeout(() => {
          setVisibleLogs((prev) => [...prev, log]);
        }, index * 95);
      });
    }
  }, [isBooting]);

  useEffect(() => {
    const tl = createTimeline({
      defaults: { ease: 'out(3)' },
    });
    timelineRef.current = tl;

    // 1. Kid reaches toward power button (300ms -> 1000ms)
    tl.add(armRef.current, {
      d: [
        'M 780 460 Q 820 450 860 380',
        'M 780 460 Q 840 420 903 316',
      ],
      duration: 700,
      ease: 'out(3)',
    }, 300)
    .add(fingerRef.current, {
      cx: [860, 903],
      cy: [380, 316],
      duration: 700,
      ease: 'out(3)',
    }, 300)

    // 2. Power Button CLICK & LEDs light up (1050ms)
    .add(powerBtnRef.current, {
      fill: ['#ffffff', '#00e5ff', '#181b26'],
      stroke: ['#ffffff', '#00e5ff'],
      duration: 350,
      begin: () => {
        playPowerClick();
      },
    }, 1050)
    .add([gpuRgbRef.current, cpuCoolerRef.current, deskLedRef.current, headphoneLedRef.current].filter(Boolean), {
      opacity: [0.1, 0.95],
      duration: 400,
    }, 1100)

    // 3. Monitor screen powers on & boot sequence starts (1450ms)
    .add(screenRef.current, {
      fill: ['#050609', '#031422'],
      duration: 350,
      begin: () => {
        playBootChime();
        setIsBooting(true);
        if (flashRef.current) {
          flashRef.current.classList.add(styles.crtFlashActive);
        }
      },
    }, 1450)
    .add(monitorLedRef.current, {
      fill: ['#1e2028', '#10b981'],
      duration: 300,
    }, 1450)

    // 4. Camera zooms into monitor screen (2550ms -> 3850ms)
    .add(cameraRef.current, {
      scale: [1, 16],
      duration: 1350,
      ease: 'in(2.2)',
    }, 2550)

    // 5. Seamless dissolve into landing page (3700ms -> 4100ms)
    .add(overlayRef.current, {
      opacity: [1, 0],
      duration: 450,
      ease: 'linear',
      complete: () => {
        finish();
      },
    }, 3700);

    return () => {
      tl.pause();
    };
  }, [finish]);

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      aria-label="Interactive startup animation"
      onClick={finish}
    >
      {/* Skip Button */}
      <button
        className={styles.skipBtn}
        onClick={(e) => {
          e.stopPropagation();
          finish();
        }}
        title="Skip intro (ESC)"
      >
        Skip Intro <span className={styles.skipBadge}>ESC</span>
      </button>

      <div className={styles.soundPrompt}>
        Click anywhere to skip
      </div>

      <div className={styles.sceneWrapper}>
        <div
          ref={cameraRef}
          className={styles.camera}
        >
          <svg
            className={styles.svgScene}
            viewBox="0 0 1200 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0a0c16" />
                <stop offset="100%" stopColor="#040508" />
              </linearGradient>
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0c1736" />
                <stop offset="100%" stopColor="#182752" />
              </linearGradient>
              <linearGradient id="deskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#191b26" />
                <stop offset="100%" stopColor="#0d0e14" />
              </linearGradient>
              <linearGradient id="screenOff" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#090b10" />
                <stop offset="100%" stopColor="#040507" />
              </linearGradient>
              <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="powerGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Dark Room Wall */}
            <rect width="1200" height="800" fill="url(#wallGrad)" />

            {/* Window with Moon and Stars */}
            <g id="window">
              <rect x="70" y="80" width="210" height="290" rx="6" fill="#0d101d" stroke="#1c2033" strokeWidth="5" />
              <rect x="76" y="86" width="198" height="278" rx="3" fill="url(#skyGrad)" />
              <circle cx="110" cy="120" r="1.5" fill="#ffffff" opacity="0.8" />
              <circle cx="180" cy="110" r="2" fill="#88c0ff" opacity="0.9" />
              <circle cx="230" cy="160" r="1.2" fill="#ffffff" opacity="0.6" />
              <circle cx="130" cy="210" r="1.5" fill="#ffffff" opacity="0.7" />
              <circle cx="170" cy="270" r="1.2" fill="#88c0ff" opacity="0.8" />
              <circle cx="250" cy="240" r="1.5" fill="#ffffff" opacity="0.5" />
              <circle cx="210" cy="140" r="22" fill="#e8f0ff" opacity="0.85" />
              <circle cx="219" cy="134" r="20" fill="#182752" />
              <line x1="175" y1="86" x2="175" y2="364" stroke="#1c2033" strokeWidth="4" />
              <line x1="76" y1="225" x2="274" y2="225" stroke="#1c2033" strokeWidth="4" />
            </g>

            {/* Wall Posters & Shelf */}
            <g id="decor">
              <rect x="330" y="100" width="85" height="120" rx="4" fill="#0d0f17" stroke="#212433" strokeWidth="2" />
              <text x="372" y="150" fill="#00e5ff" fontFamily="'Space Grotesk', monospace" fontSize="10" fontWeight="bold" textAnchor="middle" opacity="0.75">&lt;SYSTEM /&gt;</text>
              <line x1="350" y1="170" x2="395" y2="170" stroke="#7928ca" strokeWidth="2" opacity="0.6" />

              <rect x="750" y="110" width="220" height="9" rx="2" fill="#181b26" />
              <rect x="770" y="76" width="14" height="34" fill="#2d3748" rx="1" />
              <rect x="788" y="70" width="16" height="40" fill="#4a5568" rx="1" />
              <rect x="808" y="80" width="12" height="30" fill="#00e5ff" opacity="0.7" rx="1" />
              <path d="M 920 110 L 915 94 L 935 94 L 930 110 Z" fill="#2d3748" />
              <circle cx="925" cy="88" r="7" fill="#10b981" opacity="0.7" />
            </g>

            {/* Desk Surface */}
            <rect x="80" y="510" width="1040" height="26" rx="4" fill="url(#deskGrad)" stroke="#262836" strokeWidth="1" />
            <line
              ref={deskLedRef}
              x1="80"
              y1="536"
              x2="1120"
              y2="536"
              stroke="#00e5ff"
              strokeWidth="2.5"
              opacity="0.1"
              filter="url(#cyanGlow)"
            />
            {/* Desk Legs */}
            <rect x="120" y="536" width="20" height="264" fill="#0b0c12" />
            <rect x="1060" y="536" width="20" height="264" fill="#0b0c12" />

            {/* Desk Mat */}
            <rect x="220" y="502" width="460" height="15" rx="2" fill="#11121a" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.2" />

            {/* Keyboard */}
            <rect x="280" y="492" width="180" height="15" rx="2" fill="#171922" stroke="#282a3a" strokeWidth="1" />
            {/* Mouse */}
            <rect x="520" y="495" width="22" height="12" rx="6" fill="#1a1c26" />

            {/* Monitor Stand */}
            <rect x="380" y="498" width="140" height="8" rx="2" fill="#1a1c24" />
            <rect x="442" y="405" width="16" height="95" fill="#14151e" />

            {/* Center Monitor Frame */}
            <g id="monitorGroup">
              <rect x="240" y="160" width="420" height="255" rx="10" fill="#0d0e14" stroke="#222534" strokeWidth="4" />
              {/* Monitor Screen (focal point of the zoom) */}
              <rect
                ref={screenRef}
                x="252"
                y="172"
                width="396"
                height="231"
                rx="4"
                fill="url(#screenOff)"
              />

              {/* Terminal Boot Text Rendered on Screen */}
              {isBooting && (
                <g id="terminalContent">
                  {visibleLogs.map((log, i) => (
                    <text
                      key={i}
                      x="264"
                      y={196 + i * 18}
                      className={styles.bootText}
                    >
                      {log}
                    </text>
                  ))}
                  {visibleLogs.length > 0 && (
                    <rect
                      x="264"
                      y={196 + visibleLogs.length * 18 - 8}
                      width="6"
                      height="10"
                      fill="#00e5ff"
                      opacity="0.8"
                    />
                  )}
                </g>
              )}

              {/* Glass Reflection Sheen */}
              <path d="M 252 172 L 420 172 L 252 380 Z" fill="#ffffff" opacity="0.02" />
              <circle ref={monitorLedRef} cx="450" cy="404" r="2.5" fill="#1e2028" />
            </g>

            {/* Kid Character (Sitting to the right of monitor) */}
            <g id="kidCharacter">
              {/* Gaming Chair Back */}
              <path d="M 680 650 L 700 370 C 705 310 770 310 775 370 L 795 650 Z" fill="#0e1017" stroke="#181a26" strokeWidth="3" />
              <rect x="715" y="380" width="45" height="14" rx="4" fill="#00e5ff" opacity="0.2" />

              {/* Torso leaning forward toward PC */}
              <path d="M 700 550 C 700 470 725 430 755 425 C 785 420 810 445 815 485 C 820 525 815 550 815 550 Z" fill="#141620" />

              {/* Head & Hair */}
              <circle cx="750" cy="375" r="25" fill="#1e2130" />
              <path d="M 728 370 C 723 340 755 330 770 345 C 785 335 795 355 790 375 C 785 370 775 375 770 370 Z" fill="#0b0c11" />

              {/* Headphones */}
              <path d="M 732 370 A 20 20 0 0 1 770 370" fill="none" stroke="#25293d" strokeWidth="5" strokeLinecap="round" />
              <rect
                ref={headphoneLedRef}
                x="728"
                y="365"
                width="7"
                height="14"
                rx="3"
                fill="#00e5ff"
                opacity="0.2"
                filter="url(#cyanGlow)"
              />

              {/* Left hand resting on desk */}
              <path d="M 725 470 Q 670 480 610 500" fill="none" stroke="#1a1c28" strokeWidth="12" strokeLinecap="round" />

              {/* Right Arm: Reaching toward PC Power Button */}
              <path
                ref={armRef}
                d="M 780 460 Q 820 450 860 380"
                fill="none"
                stroke="#1f2233"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Hand/Finger on power button */}
              <circle
                ref={fingerRef}
                cx="860"
                cy="380"
                r="7"
                fill="#282c40"
              />
            </g>

            {/* PC Tower */}
            <g id="pcTower">
              <rect x="880" y="270" width="160" height="240" rx="8" fill="#10121a" stroke="#25293d" strokeWidth="2" />
              {/* Glass Side Panel */}
              <rect x="888" y="280" width="112" height="220" rx="4" fill="#06070c" stroke="#1a1d2c" strokeWidth="1" />
              {/* Internal Components RGB */}
              <rect
                ref={gpuRgbRef}
                x="898"
                y="380"
                width="80"
                height="16"
                rx="2"
                fill="#00e5ff"
                opacity="0.1"
                filter="url(#cyanGlow)"
              />
              <circle
                ref={cpuCoolerRef}
                cx="938"
                cy="335"
                r="18"
                fill="none"
                stroke="#7928ca"
                strokeWidth="3"
                opacity="0.1"
                filter="url(#cyanGlow)"
              />

              {/* Front Panel Mesh */}
              <rect x="1008" y="272" width="28" height="236" fill="#0a0c13" />

              {/* Power Button on Front Top Corner */}
              <circle
                ref={powerBtnRef}
                cx="905"
                cy="315"
                r="9"
                fill="#181b26"
                stroke="#00e5ff"
                strokeWidth="1.8"
                filter="url(#powerGlow)"
                style={{ cursor: 'pointer' }}
              />
              <path
                d="M 905 310 L 905 315 M 901 313 A 4 4 0 1 0 909 313"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
      </div>

      <div ref={flashRef} className={styles.crtFlash} />
    </div>
  );
}

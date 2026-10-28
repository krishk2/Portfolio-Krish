// src/components/Hero.jsx
import { useEffect, useRef } from 'react';
import { animate, createTimeline } from 'animejs';
import { personal } from '../data/content';
import AsciiArt from './AsciiArt';
import styles from './Hero.module.css';

export default function Hero({ isReady = true }) {
  const sectionRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const cursorRef = useRef(null);
  const greetRef = useRef(null);
  const taglineRef = useRef(null);
  const ctasRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!isReady) return;

    // ── Timeline: intro animation sequence
    const tl = createTimeline({ defaults: { ease: 'out(4)' } });

    // 1. "Hey, I'm" fades in
    tl.add(greetRef.current, {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 600,
    }, 200)

    // 2. "Krishna" slides up with clip
    .add(line1Ref.current, {
      translateY: ['110%', '0%'],
      duration: 900,
      ease: 'out(5)',
    }, 400)

    // 3. "Koushik" follows closely
    .add(line2Ref.current, {
      translateY: ['110%', '0%'],
      duration: 900,
      ease: 'out(5)',
    }, 550)

    // 4. Cursor fades in
    .add(cursorRef.current, {
      opacity: [0, 1],
      duration: 200,
    }, 900)

    // 5. Tagline fades + drifts up
    .add(taglineRef.current, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 700,
    }, 1000)

    // 6. CTAs
    .add(ctasRef.current?.children ? Array.from(ctasRef.current.children) : [], {
      opacity: [0, 1],
      translateY: [16, 0],
      delay: (_, i) => i * 100,
      duration: 600,
    }, 1300)
    .add(scrollRef.current, {
      opacity: [0, 0.5],
      duration: 700,
    }, 1700);

    // — Blinking cursor
    let visible = true;
    const blinkInterval = setInterval(() => {
      if (cursorRef.current) {
        animate(cursorRef.current, {
          opacity: visible ? 0 : 1,
          duration: 80,
          ease: 'linear',
        });
        visible = !visible;
      }
    }, 530);

    // — Parallax on scroll
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (line1Ref.current) {
        line1Ref.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
      if (line2Ref.current) {
        line2Ref.current.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearInterval(blinkInterval);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.heroInner}>
          {/* ── Left: text ── */}
          <div className={styles.content}>
            <p className={styles.greeting} ref={greetRef}>Hey, I'm</p>

            <h1 className={styles.name}>
              <span className={styles.nameLine} ref={line1Ref}>Krishna</span>
              <br />
              <span className={styles.nameLine} ref={line2Ref}>Koushik</span>
              <span ref={cursorRef} className={styles.cursor}>_</span>
            </h1>

            <p className={styles.tagline} ref={taglineRef}>
              {personal.tagline}
            </p>

            <div className={styles.ctas} ref={ctasRef}>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                View GitHub
              </a>
              <a href={`mailto:${personal.email}`} className={styles.btnSecondary}>
                Get in Touch
              </a>
            </div>
          </div>

          {/* ── Right: ASCII portrait ── */}
          <AsciiArt isReady={isReady} />
        </div>
      </div>

      <div className={styles.scrollIndicator} ref={scrollRef} onClick={scrollDown}>
        <span className={styles.scrollText}>scroll</span>
        <span className={styles.scrollLine} id="hero-scroll-line" />
      </div>

      {/* Animated scroll line */}
      <ScrollLineAnim />

      <div className={styles.grid} aria-hidden />
    </section>
  );
}

function ScrollLineAnim() {
  useEffect(() => {
    animate('#hero-scroll-line', {
      scaleY: [0, 1, 0],
      transformOrigin: 'top center',
      duration: 1600,
      loop: true,
      ease: 'inOut(2)',
    });
  }, []);
  return null;
}

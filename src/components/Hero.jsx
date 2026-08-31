// src/components/Hero.jsx
import { useEffect, useRef } from 'react';
import { animate, createTimeline, stagger } from 'animejs';
import { personal } from '../data/content';
import AsciiArt from './AsciiArt';
import styles from './Hero.module.css';

export default function Hero() {
  const sectionRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const greetRef = useRef(null);
  const taglineRef = useRef(null);
  const ctasRef = useRef(null);
  const scrollRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    // — Split name lines into individual character spans manually
    const splitIntoChars = (el) => {
      if (!el) return [];
      const text = el.textContent;
      el.innerHTML = '';
      el.setAttribute('aria-label', text);
      return [...text].map((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.transform = 'translateY(110%)';
        span.style.opacity = '0';
        el.appendChild(span);
        return span;
      });
    };

    const chars1 = splitIntoChars(line1Ref.current);
    const chars2 = splitIntoChars(line2Ref.current);

    // — Greeting fade
    if (greetRef.current) {
      greetRef.current.style.opacity = '0';
      greetRef.current.style.transform = 'translateX(-20px)';
    }

    // — Hide elements initially
    [taglineRef.current, ctasRef.current, scrollRef.current].forEach((el) => {
      if (el) { el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; }
    });

    // — Master timeline
    const tl = createTimeline({ defaults: { ease: 'out(4)' } });

    tl.add(greetRef.current, {
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 500,
    }, 100)
    .add(chars1, {
      translateY: ['110%', '0%'],
      opacity: [0, 1],
      duration: 700,
      delay: stagger(28),
    }, 300)
    .add(chars2, {
      translateY: ['110%', '0%'],
      opacity: [0, 1],
      duration: 700,
      delay: stagger(28),
    }, 650)
    .add(taglineRef.current, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
    }, 1100)
    .add(ctasRef.current, {
      opacity: [0, 1],
      translateY: [20, 0],
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
          <AsciiArt />
        </div>

        <div className={styles.scrollIndicator} ref={scrollRef} onClick={scrollDown}>
          <span className={styles.scrollLine} id="hero-scroll-line" />
          <span className={styles.scrollText}>scroll</span>
        </div>
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

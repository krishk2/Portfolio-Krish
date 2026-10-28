// src/components/Navbar.jsx
import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import styles from './Navbar.module.css';

const links = ['about', 'experience', 'projects', 'accomplishments', 'contact'];

export default function Navbar({ onReplayIntro }) {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const linksRef = useRef([]);
  const mobileLinksRef = useRef([]);

  // Entrance animation on mount
  useEffect(() => {
    animate(navRef.current, {
      translateY: [-60, 0],
      opacity: [0, 1],
      duration: 800,
      ease: 'out(4)',
    });

    // Stagger nav links in
    animate(linksRef.current, {
      opacity: [0, 1],
      translateY: [-10, 0],
      duration: 500,
      delay: stagger(60, { start: 400 }),
      ease: 'out(3)',
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animate mobile menu open/close
  useEffect(() => {
    if (menuOpen) {
      animate(mobileLinksRef.current, {
        translateX: [-30, 0],
        opacity: [0, 1],
        duration: 400,
        delay: stagger(50),
        ease: 'out(4)',
      });
    }
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleLinkHover = (i) => {
    if (!linksRef.current[i]) return;
    animate(linksRef.current[i], {
      translateY: -2,
      duration: 200,
      ease: 'out(3)',
    });
  };

  const handleLinkLeave = (i) => {
    if (!linksRef.current[i]) return;
    animate(linksRef.current[i], {
      translateY: 0,
      duration: 300,
      ease: 'out(3)',
    });
  };

  return (
    <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <button className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          KK<span className={styles.dot}>.</span>
        </button>

        <ul className={styles.links}>
          {links.map((link, i) => (
            <li key={link}>
              <button
                ref={(el) => (linksRef.current[i] = el)}
                onClick={() => scrollTo(link)}
                onMouseEnter={() => handleLinkHover(i)}
                onMouseLeave={() => handleLinkLeave(i)}
                className={styles.link}
              >
                {link}
              </button>
            </li>
          ))}
          {onReplayIntro && (
            <li>
              <button
                onClick={onReplayIntro}
                className={styles.bootBtn}
                title="Replay PC startup intro"
              >
                <span className={styles.bootDot}>●</span> Boot
              </button>
            </li>
          )}
        </ul>

        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
          <span className={menuOpen ? styles.barOpen1 : styles.bar} />
          <span className={menuOpen ? styles.barOpen2 : styles.bar} />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobile}>
          {links.map((link, i) => (
            <button
              key={link}
              ref={(el) => (mobileLinksRef.current[i] = el)}
              className={styles.mobileLink}
              onClick={() => scrollTo(link)}
            >
              {link}
            </button>
          ))}
          {onReplayIntro && (
            <button
              className={styles.mobileBootBtn}
              onClick={() => {
                setMenuOpen(false);
                onReplayIntro();
              }}
            >
              Replay Startup Animation ⏻
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

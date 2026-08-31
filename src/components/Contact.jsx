// src/components/Contact.jsx
import { useRef } from 'react';
import { animate, createTimeline, stagger } from 'animejs';
import { personal } from '../data/content';
import { useAnimeOnView } from '../hooks/useAnimeOnView';
import styles from './Contact.module.css';

export default function Contact() {
  const emailLinkRef = useRef(null);

  const headingRef = useAnimeOnView((el) =>
    animate(el, { translateY: [40, 0], opacity: [0, 1], duration: 800, ease: 'out(4)' })
  );
  const emailWrapRef = useAnimeOnView((el) =>
    animate(el, { scaleX: [0, 1], transformOrigin: 'left center', opacity: [0, 1], duration: 600, ease: 'out(4)' })
  );
  const emailTextRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateX: [-20, 0], duration: 500, ease: 'out(3)' })
  );
  const socialsRef = useAnimeOnView((el) => {
    animate(el.querySelectorAll('a'), {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 400,
      delay: stagger(80),
      ease: 'out(3)',
    });
  });
  const footerRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], duration: 500, ease: 'out(3)' })
  );

  const handleEmailEnter = () => {
    if (!emailLinkRef.current) return;
    animate(emailLinkRef.current.querySelector(`.${styles.emailArrow}`), {
      translateX: 10,
      duration: 300,
      ease: 'out(4)',
    });
  };
  const handleEmailLeave = () => {
    if (!emailLinkRef.current) return;
    animate(emailLinkRef.current.querySelector(`.${styles.emailArrow}`), {
      translateX: 0,
      duration: 400,
      ease: 'out(3)',
    });
  };

  return (
    <section id="contact">
      <div className="container">
        <p className="section-label">Contact</p>

        <h2 className={styles.heading} ref={headingRef} style={{ opacity: 0, transform: 'translateY(40px)' }}>
          Let's work<br />together.
        </h2>

        <div className={styles.email} ref={emailWrapRef} style={{ opacity: 0, transform: 'scaleX(0)' }}>
          <a
            ref={(el) => { emailLinkRef.current = el; emailTextRef(el); }}
            href={`mailto:${personal.email}`}
            className={styles.emailLink}
            style={{ opacity: 0 }}
            onMouseEnter={handleEmailEnter}
            onMouseLeave={handleEmailLeave}
          >
            {personal.email}
            <span className={styles.emailArrow}>→</span>
          </a>
        </div>

        <div className={styles.socials} ref={socialsRef}>
          {[
            { label: 'LinkedIn ↗', href: personal.linkedin },
            { label: 'GitHub ↗', href: personal.github },
            { label: personal.phone, href: `tel:${personal.phone}` },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social}
              style={{ opacity: 0 }}
            >
              {label}
            </a>
          ))}
        </div>

        <div className={styles.footer} ref={footerRef} style={{ opacity: 0 }}>
          <p>© 2026 Krishna Koushik Padigala. Built with React.</p>
          <button
            className={styles.toTop}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </section>
  );
}

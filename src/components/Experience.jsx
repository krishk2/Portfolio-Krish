// src/components/Experience.jsx
import { useRef } from 'react';
import { animate, createTimeline, stagger } from 'animejs';
import { experience } from '../data/content';
import { useAnimeOnView } from '../hooks/useAnimeOnView';
import styles from './Experience.module.css';

function ExperienceCard({ item, index }) {
  const cardRef = useAnimeOnView(
    (el) => {
      const tl = createTimeline();
      tl.add(el.querySelector(`.${styles.dot}`), {
        scale: [0, 1],
        duration: 400,
        ease: 'spring(1, 80, 14, 0)',
      })
        .add(
          el.querySelector(`.${styles.body}`),
          {
            translateX: [-30, 0],
            opacity: [0, 1],
            duration: 600,
            ease: 'out(4)',
          },
          '-=200'
        )
        .add(
          el.querySelectorAll(`.${styles.bullet}`),
          {
            translateX: [-15, 0],
            opacity: [0, 1],
            duration: 450,
            delay: stagger(80),
            ease: 'out(3)',
          },
          '-=300'
        );
    },
    { threshold: 0.2 }
  );

  return (
    <div ref={cardRef} className={styles.card} style={{ opacity: 1 }}>
      <div className={styles.timeline}>
        <div className={styles.dot} style={{ transform: 'scale(0)' }} />
        {index < experience.length - 1 && <div className={styles.line} />}
      </div>
      <div className={styles.body} style={{ opacity: 0, transform: 'translateX(-30px)' }}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.company}>{item.company}</h3>
            <p className={styles.role}>{item.role} · {item.location}</p>
          </div>
          <span className={styles.duration}>{item.duration}</span>
        </div>
        <ul className={styles.bullets}>
          {item.bullets.map((b, i) => (
            <li key={i} className={styles.bullet} style={{ opacity: 0, transform: 'translateX(-15px)' }}>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  const titleRef = useAnimeOnView((el) => {
    animate(el, { opacity: [0, 1], translateY: [10, 0], duration: 500, ease: 'out(3)' });
  });

  return (
    <section id="experience">
      <div className="container">
        <p className="section-label" ref={titleRef} style={{ opacity: 0 }}>Experience</p>
        <div className={styles.list}>
          {experience.map((item, i) => (
            <ExperienceCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

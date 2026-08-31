// src/components/Accomplishments.jsx
import { animate, createTimeline, stagger } from 'animejs';
import { accomplishments } from '../data/content';
import { useAnimeOnView } from '../hooks/useAnimeOnView';
import styles from './Accomplishments.module.css';

function AccomplishmentRow({ item, index }) {
  const rowRef = useAnimeOnView(
    (el) => {
      animate(el, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 650,
        delay: index * 100,
        ease: 'out(4)',
      });
    },
    { threshold: 0.1 }
  );

  const handleEnter = (e) => {
    animate(e.currentTarget.querySelector(`.${styles.rowTitle}`), {
      translateX: 8,
      duration: 250,
      ease: 'out(3)',
    });
  };
  const handleLeave = (e) => {
    animate(e.currentTarget.querySelector(`.${styles.rowTitle}`), {
      translateX: 0,
      duration: 300,
      ease: 'out(3)',
    });
  };

  return (
    <div
      ref={rowRef}
      className={styles.row}
      style={{ opacity: 0 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className={styles.rowLeft}>
        <span className={styles.num}>{String(index + 1).padStart(2, '0')}</span>
        <div>
          <p className={styles.rowTitle}>{item.title}</p>
          <p className={styles.rowDetail}>{item.detail}</p>
        </div>
      </div>
      <span className={styles.year}>{item.year}</span>
    </div>
  );
}

export default function Accomplishments() {
  const titleRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [10, 0], duration: 500, ease: 'out(3)' })
  );
  const headingRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [20, 0], duration: 700, ease: 'out(4)' })
  );

  return (
    <section id="accomplishments">
      <div className="container">
        <p className="section-label" ref={titleRef} style={{ opacity: 0 }}>Accomplishments</p>
        <h2 className={styles.heading} ref={headingRef} style={{ opacity: 0 }}>Recognition</h2>
        <div className={styles.list}>
          {accomplishments.map((item, i) => (
            <AccomplishmentRow key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

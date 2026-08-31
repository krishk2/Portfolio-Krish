// src/components/Projects.jsx
import { useRef, useCallback } from 'react';
import { animate } from 'animejs';
import { projects } from '../data/content';
import { useAnimeOnView } from '../hooks/useAnimeOnView';
import styles from './Projects.module.css';

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const descRef = useRef(null);
  const isExpanded = useRef(false);

  const viewCallback = useAnimeOnView(
    (el) => {
      animate(el, {
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 700,
        delay: index * 120,
        ease: 'out(4)',
      });
    },
    { threshold: 0.05 }
  );

  const mergedRef = useCallback(
    (el) => {
      cardRef.current = el;
      viewCallback(el);
    },
    [viewCallback]
  );

  const handleEnter = () => {
    if (!descRef.current || isExpanded.current) return;
    isExpanded.current = true;
    const desc = descRef.current;
    const fullH = desc.scrollHeight + 16;
    animate(desc, { height: [0, fullH], opacity: [0, 1], duration: 450, ease: 'out(4)' });
    const arrow = cardRef.current?.querySelector(`.${styles.arrow}`);
    if (arrow) animate(arrow, { translateX: 5, translateY: -5, duration: 300, ease: 'out(3)' });
  };

  const handleLeave = () => {
    if (!descRef.current || !isExpanded.current) return;
    isExpanded.current = false;
    const desc = descRef.current;
    animate(desc, { height: [desc.clientHeight, 0], opacity: [1, 0], duration: 350, ease: 'in(3)' });
    const arrow = cardRef.current?.querySelector(`.${styles.arrow}`);
    if (arrow) animate(arrow, { translateX: 0, translateY: 0, duration: 300, ease: 'out(3)' });
  };

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.04;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.04;
    animate(card, { translateX: x, translateY: y, duration: 400, ease: 'out(3)' });
  };

  const handleMouseLeave = () => {
    handleLeave();
    if (cardRef.current) animate(cardRef.current, { translateX: 0, translateY: 0, duration: 600, ease: 'out(3)' });
  };

  return (
    <div
      ref={mergedRef}
      className={styles.card}
      style={{ opacity: 0 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <span className={styles.index}>0{index + 1}</span>

      <div className={styles.top}>
        <div>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.subtitle}>{project.subtitle}</p>
        </div>
        <span className={styles.arrow}>↗</span>
      </div>

      <div ref={descRef} style={{ height: 0, opacity: 0, overflow: 'hidden' }}>
        <p className={styles.description}>{project.description}</p>
      </div>

      <div className={styles.footer}>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <div className={styles.links}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
            GitHub ↗
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.linkLive}>
              Live ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const titleRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [20, 0], duration: 600, ease: 'out(4)' })
  );
  const headingRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [25, 0], duration: 700, ease: 'out(4)' })
  );

  return (
    <section id="projects">
      <div className="container">
        <p className="section-label" ref={titleRef} style={{ opacity: 0 }}>Projects</p>
        <h2 className={styles.sectionHeading} ref={headingRef} style={{ opacity: 0 }}>
          Things I've built
        </h2>
        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

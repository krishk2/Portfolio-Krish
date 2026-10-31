// src/components/Projects.jsx
import { useRef, useCallback } from 'react';
import { animate } from 'animejs';
import { projects } from '../data/content';
import { useAnimeOnView } from '../hooks/useAnimeOnView';
import styles from './Projects.module.css';

function ProjectCard({ project, index, onOpenVideo }) {
  const cardRef = useRef(null);
  const descRef = useRef(null);
  const isExpanded = useRef(false);

  const viewCallback = useAnimeOnView(
    (el) => {
      animate(el, {
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 700,
        delay: index * 100,
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

  const expand = () => {
    if (!descRef.current || isExpanded.current) return;
    isExpanded.current = true;
    const desc = descRef.current;
    const fullH = desc.scrollHeight + 16;
    animate(desc, { height: [0, fullH], opacity: [0, 1], duration: 400, ease: 'out(4)' });
    const arrow = cardRef.current?.querySelector(`.${styles.arrow}`);
    if (arrow) animate(arrow, { translateX: 4, translateY: -4, duration: 250, ease: 'out(3)' });
  };

  const collapse = () => {
    if (!descRef.current || !isExpanded.current) return;
    isExpanded.current = false;
    const desc = descRef.current;
    animate(desc, { height: [desc.clientHeight, 0], opacity: [1, 0], duration: 300, ease: 'in(3)' });
    const arrow = cardRef.current?.querySelector(`.${styles.arrow}`);
    if (arrow) animate(arrow, { translateX: 0, translateY: 0, duration: 250, ease: 'out(3)' });
  };

  const handleMouseEnter = () => {
    expand();
  };

  const handleMouseLeave = () => {
    collapse();
    if (cardRef.current) animate(cardRef.current, { translateX: 0, translateY: 0, duration: 500, ease: 'out(3)' });
  };

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.03;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.03;
    animate(card, { translateX: x, translateY: y, duration: 350, ease: 'out(3)' });
  };

  const handleCardClick = (e) => {
    if (e.target.closest('a') || e.target.closest('button')) return;
    if (isExpanded.current) {
      collapse();
    } else {
      expand();
    }
  };

  return (
    <div
      ref={mergedRef}
      className={styles.card}
      style={{ opacity: 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleCardClick}
    >
      <div>
        <div className={styles.metaRow}>
          <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
          {project.badge && <span className={styles.cardBadge}>{project.badge}</span>}
          {project.video && (
            <span className={styles.videoIndicator} title="In-browser video demo available">
              <span className={styles.videoIndicatorDot} /> Video
            </span>
          )}
        </div>

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
      </div>

      <div className={styles.footer}>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <div className={styles.links}>
          {project.video && (
            <button
              type="button"
              className={styles.linkVideo}
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenVideo) onOpenVideo(project);
                else {
                  window.dispatchEvent(new CustomEvent('open-video', { detail: project }));
                }
              }}
              title={`Watch ${project.title} Video Demo in website player`}
            >
              <span className={styles.playIcon}>▶</span> Watch Demo
            </button>
          )}
          {project.demo && !project.video && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkDemo}
              onClick={(e) => e.stopPropagation()}
              title="View Project Demo"
            >
              Demo ↗
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkLive}
              onClick={(e) => e.stopPropagation()}
              title="View Live Application"
            >
              Live App ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              onClick={(e) => e.stopPropagation()}
              title="View Source Code on GitHub"
            >
              Source Code ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ onOpenVideo }) {
  const titleRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [20, 0], duration: 600, ease: 'out(4)' })
  );
  const headingRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [25, 0], duration: 700, ease: 'out(4)' })
  );

  const handleWatchAll = () => {
    const firstVideo = projects.find((p) => p.video) || projects[0];
    if (onOpenVideo) onOpenVideo(firstVideo);
    else window.dispatchEvent(new CustomEvent('open-video', { detail: firstVideo }));
  };

  return (
    <section id="projects">
      <div className="container">
        <div className={styles.sectionHeaderRow}>
          <div>
            <p className="section-label" ref={titleRef} style={{ opacity: 0 }}>Projects</p>
            <h2 className={styles.sectionHeading} ref={headingRef} style={{ opacity: 0 }}>
              Things I've built
            </h2>
          </div>
          <button
            type="button"
            className={styles.watchAllBtn}
            onClick={handleWatchAll}
            title="Open in-website video player to watch all project demos"
          >
            <span className={styles.playIconHeader}>▶</span> Watch Video Demos
          </button>
        </div>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onOpenVideo={onOpenVideo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

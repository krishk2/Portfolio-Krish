// src/components/Projects.jsx
import { useRef, useCallback } from 'react';
import { animate } from 'animejs';
import { projects } from '../data/content';
import { useAnimeOnView } from '../hooks/useAnimeOnView';
import styles from './Projects.module.css';

function ProjectCard({ project, index, onOpenProject }) {
  const cardRef = useRef(null);

  const viewCallback = useAnimeOnView(
    (el) => {
      animate(el, {
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 700,
        delay: index * 90,
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

  const handleMouseEnter = () => {
    const arrow = cardRef.current?.querySelector(`.${styles.arrow}`);
    if (arrow) animate(arrow, { translateX: 4, translateY: -4, duration: 250, ease: 'out(3)' });
  };

  const handleMouseLeave = () => {
    if (cardRef.current) animate(cardRef.current, { translateX: 0, translateY: 0, duration: 500, ease: 'out(3)' });
    const arrow = cardRef.current?.querySelector(`.${styles.arrow}`);
    if (arrow) animate(arrow, { translateX: 0, translateY: 0, duration: 250, ease: 'out(3)' });
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
    if (e.target.closest('a')) return;
    onOpenProject(project);
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
      title={`Click to view ${project.title} video & extended details`}
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

        <p className={styles.description}>
          {project.summary || project.description}
        </p>
      </div>

      <div className={styles.footer}>
        <div className={styles.tags}>
          {project.tags.slice(0, 5).map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
          {project.tags.length > 5 && (
            <span className={styles.tagMore}>+{project.tags.length - 5}</span>
          )}
        </div>
        <div className={styles.links}>
          <button
            type="button"
            className={styles.linkExplore}
            onClick={(e) => {
              e.stopPropagation();
              onOpenProject(project);
            }}
            title={`Open focused modal for ${project.title}`}
          >
            {project.video ? '▶ Watch & Details ↗' : 'View Project ↗'}
          </button>
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
              Code ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ onOpenProject }) {
  const titleRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [20, 0], duration: 600, ease: 'out(4)' })
  );
  const headingRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [25, 0], duration: 700, ease: 'out(4)' })
  );

  const handleOpenFirst = () => {
    const target = projects.find((p) => p.video) || projects[0];
    if (onOpenProject) onOpenProject(target);
    else window.dispatchEvent(new CustomEvent('open-project', { detail: target }));
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
            onClick={handleOpenFirst}
            title="Open focused modal to explore all projects and videos"
          >
            <span className={styles.playIconHeader}>▶</span> Explore All Projects & Demos
          </button>
        </div>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onOpenProject={(p) => {
                if (onOpenProject) onOpenProject(p);
                else window.dispatchEvent(new CustomEvent('open-project', { detail: p }));
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

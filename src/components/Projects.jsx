// src/components/Projects.jsx
import { useRef, useCallback } from 'react';
import { animate } from 'animejs';
import { projects } from '../data/content';
import { useAnimeOnView } from '../hooks/useAnimeOnView';
import styles from './Projects.module.css';

function ProjectItem({ project, index, onOpenProject }) {
  const itemRef = useRef(null);

  const viewCallback = useAnimeOnView(
    (el) => {
      animate(el, {
        opacity: [0, 1],
        translateY: [35, 0],
        duration: 700,
        delay: index * 90,
        ease: 'out(4)',
      });
    },
    { threshold: 0.05 }
  );

  const mergedRef = useCallback(
    (el) => {
      itemRef.current = el;
      viewCallback(el);
    },
    [viewCallback]
  );

  return (
    <article ref={mergedRef} className={styles.projectItem} style={{ opacity: 0 }}>
      {/* Title & Year Row */}
      <div className={styles.headerRow}>
        <div className={styles.titleWrap}>
          <h3
            className={styles.projectTitle}
            onClick={() => onOpenProject(project)}
            title={`View ${project.title} details`}
          >
            {project.title}
          </h3>
          {project.badge && (
            <span className={styles.badge}>{project.badge}</span>
          )}
        </div>
        <span className={styles.year}>{project.year || '2026'}</span>
      </div>

      {/* Pitch & "How it works →" */}
      <p className={styles.pitchRow}>
        <span className={styles.pitchText}>
          {project.summary || project.description}
        </span>
        <button
          type="button"
          className={styles.howItWorksLink}
          onClick={() => onOpenProject(project)}
          title={`Open focused view with extended description for ${project.title}`}
        >
          How it works <span className={styles.arrowIcon}>→</span>
        </button>
      </p>

      {/* Pill Tags */}
      <div className={styles.tagsRow}>
        {project.tags.map((tag) => (
          <span key={tag} className={styles.pillTag}>
            {tag}
          </span>
        ))}
      </div>

      {/* In-Website Video Player / Preview Frame */}
      <div className={styles.mediaFrame}>
        {project.video ? (
          <div className={styles.videoBox}>
            <div className={styles.playerHeader}>
              <div className={styles.liveIndicator}>
                <span className={styles.liveDot} />
                <span className={styles.liveText}>DEMO STREAM</span>
              </div>
              <button
                type="button"
                className={styles.expandBtn}
                onClick={() => onOpenProject(project)}
                title="Expand to full focused modal view"
              >
                Expand Details ↗
              </button>
            </div>
            <iframe
              src={project.video}
              className={styles.iframe}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title={`${project.title} Video Recording`}
            />
          </div>
        ) : project.live ? (
          <div className={styles.liveBox}>
            <div className={styles.liveContent}>
              <span className={styles.liveTag}>● LIVE CLOUD DEPLOYMENT</span>
              <h4 className={styles.liveBoxTitle}>{project.title}</h4>
              <p className={styles.liveBoxSubtitle}>{project.subtitle}</p>
              <div className={styles.liveBoxActions}>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryLiveBtn}
                >
                  Open Live Deployment ↗
                </a>
                <button
                  type="button"
                  className={styles.secondaryWorksBtn}
                  onClick={() => onOpenProject(project)}
                >
                  How it works →
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.repoBox}>
            <div className={styles.liveContent}>
              <span className={styles.liveTag}>MULTI-AGENT REPOSITORY</span>
              <h4 className={styles.liveBoxTitle}>{project.title}</h4>
              <p className={styles.liveBoxSubtitle}>{project.subtitle}</p>
              <div className={styles.liveBoxActions}>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryLiveBtn}
                  >
                    View Source Code ↗
                  </a>
                )}
                <button
                  type="button"
                  className={styles.secondaryWorksBtn}
                  onClick={() => onOpenProject(project)}
                >
                  How it works →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick External Links Row */}
      <div className={styles.quickLinksRow}>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkAction}
          >
            Live App ↗
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkAction}
          >
            Source Code ↗
          </a>
        )}
        {project.driveFolder && (
          <a
            href={project.driveFolder}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkAction}
          >
            Drive Folder ↗
          </a>
        )}
        {project.demo && project.video && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkAction}
          >
            Direct Video Link ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects({ onOpenProject }) {
  const titleRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [20, 0], duration: 600, ease: 'out(4)' })
  );
  const headingRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [25, 0], duration: 700, ease: 'out(4)' })
  );

  return (
    <section id="projects">
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className="section-label" ref={titleRef} style={{ opacity: 0 }}>
            Projects
          </p>
          <h2 className={styles.sectionHeading} ref={headingRef} style={{ opacity: 0 }}>
            Selected Works
          </h2>
        </div>

        <div className={styles.projectsList}>
          {projects.map((project, i) => (
            <ProjectItem
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

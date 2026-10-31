// src/components/ProjectModal.jsx
import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { projects } from '../data/content';
import ImageLightbox from './ImageLightbox';
import styles from './ProjectModal.module.css';

export default function ProjectModal({ project, onClose }) {
  const [currentProject, setCurrentProject] = useState(project);
  const [isMediaLoading, setIsMediaLoading] = useState(true);
  const [selectedLightboxImg, setSelectedLightboxImg] = useState(null);
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const scrollBodyRef = useRef(null);

  // Update current project if prop changes
  useEffect(() => {
    if (project) {
      setCurrentProject(project);
      setIsMediaLoading(true);
      if (scrollBodyRef.current) scrollBodyRef.current.scrollTop = 0;
    }
  }, [project]);

  // Handle escape key and arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedLightboxImg) return; // Lightbox handles its own escape
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight') {
        navigateNext();
      } else if (e.key === 'ArrowLeft') {
        navigatePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentProject, selectedLightboxImg]);

  // Lock body scroll when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Animate in on mount
  useEffect(() => {
    if (overlayRef.current && modalRef.current) {
      animate(overlayRef.current, {
        opacity: [0, 1],
        duration: 250,
        ease: 'out(3)',
      });
      animate(modalRef.current, {
        opacity: [0, 1],
        scale: [0.96, 1],
        translateY: [20, 0],
        duration: 350,
        ease: 'out(4)',
      });
    }
  }, []);

  const handleClose = () => {
    if (overlayRef.current && modalRef.current) {
      animate(modalRef.current, {
        opacity: [1, 0],
        scale: [1, 0.97],
        translateY: [0, 15],
        duration: 200,
        ease: 'in(3)',
      });
      animate(overlayRef.current, {
        opacity: [1, 0],
        duration: 220,
        ease: 'in(3)',
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  const currentIndex = projects.findIndex((p) => p.title === currentProject?.title);

  const navigateNext = () => {
    if (projects.length === 0) return;
    const nextIdx = (currentIndex + 1) % projects.length;
    switchProject(projects[nextIdx]);
  };

  const navigatePrev = () => {
    if (projects.length === 0) return;
    const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
    switchProject(projects[prevIdx]);
  };

  const switchProject = (p) => {
    if (p.title === currentProject?.title) return;
    setIsMediaLoading(true);
    setCurrentProject(p);
    if (scrollBodyRef.current) {
      scrollBodyRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!currentProject) return null;

  const hasVideo = Boolean(currentProject.video);
  const driveUrl = currentProject.demo || currentProject.video;
  const folderUrl = currentProject.driveFolder || currentProject.folder;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="focused-modal-title"
    >
      <div ref={modalRef} className={styles.modal}>
        {/* Terminal Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.projectCounter}>
              PROJECT {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <div className={styles.titleGroup}>
              <h3 id="focused-modal-title" className={styles.title}>
                {currentProject.title}
              </h3>
              <p className={styles.subtitle}>{currentProject.subtitle}</p>
            </div>
            {currentProject.badge && (
              <span className={styles.badge}>{currentProject.badge}</span>
            )}
          </div>

          <div className={styles.headerActions}>
            {folderUrl && (
              <a
                href={folderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionFolder}
                title="Open Google Drive folder with snapshots & documentation"
              >
                Drive Folder ↗
              </a>
            )}
            {currentProject.live && (
              <a
                href={currentProject.live}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionLive}
                title="Launch Live Application"
              >
                Launch App ↗
              </a>
            )}
            <button
              type="button"
              className={styles.closeBtn}
              onClick={handleClose}
              title="Close modal (Esc)"
              aria-label="Close modal"
            >
              <span>✕</span>
              <kbd className={styles.kbd}>ESC</kbd>
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className={styles.scrollBody} ref={scrollBodyRef}>
          {/* Top Media: Video Player placed directly ABOVE project description */}
          <div className={styles.mediaContainer}>
            {hasVideo ? (
              <div className={styles.videoWrap}>
                <div className={styles.streamStatus}>
                  <span className={styles.pulseDot} />
                  <span className={styles.streamText}>IN-BROWSER VIDEO STREAM</span>
                </div>
                {isMediaLoading && (
                  <div className={styles.loadingSkeleton}>
                    <div className={styles.spinner} />
                    <p className={styles.loadingText}>Streaming demo recording...</p>
                    <p className={styles.loadingSub}>Loading video for {currentProject.title}</p>
                  </div>
                )}
                <iframe
                  src={currentProject.video}
                  className={styles.iframe}
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  onLoad={() => setIsMediaLoading(false)}
                  title={`${currentProject.title} Video Recording`}
                />
              </div>
            ) : currentProject.live ? (
              <div className={styles.liveAppBanner}>
                <div className={styles.liveAppInner}>
                  <span className={styles.liveTag}>● LIVE CLOUD DEPLOYMENT</span>
                  <h4 className={styles.liveTitle}>{currentProject.title}</h4>
                  <p className={styles.liveSubtitle}>{currentProject.subtitle}</p>
                  <p className={styles.liveDescription}>{currentProject.summary || currentProject.description}</p>
                  <div className={styles.liveButtons}>
                    <a
                      href={currentProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.primaryLaunchBtn}
                    >
                      Open Live Deployment ↗
                    </a>
                    {currentProject.github && (
                      <a
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.secondaryCodeBtn}
                      >
                        GitHub Repository ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.repoBanner}>
                <div className={styles.repoInner}>
                  <span className={styles.repoTag}>MULTI-AGENT REPOSITORY</span>
                  <h4 className={styles.liveTitle}>{currentProject.title}</h4>
                  <p className={styles.liveSubtitle}>{currentProject.subtitle}</p>
                  <p className={styles.liveDescription}>{currentProject.summary || currentProject.description}</p>
                  {currentProject.github && (
                    <a
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.primaryLaunchBtn}
                    >
                      View Source Code on GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Extended Description & Details (Located right BELOW the video/media) */}
          <div className={styles.detailsContent}>
            {/* Architecture Section */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionMeta}>
                <span className={styles.sectionLabel}>// ARCHITECTURE & WORKFLOW</span>
                <div className={styles.sectionDivider} />
              </div>
              <p className={styles.extendedDescription}>
                {currentProject.extendedDescription || currentProject.description}
              </p>
            </div>

            {/* Technical Highlights Grid */}
            {currentProject.highlights && currentProject.highlights.length > 0 && (
              <div className={styles.sectionBlock}>
                <div className={styles.sectionMeta}>
                  <span className={styles.sectionLabel}>// KEY HIGHLIGHTS & CAPABILITIES</span>
                  <div className={styles.sectionDivider} />
                </div>
                <div className={styles.highlightsGrid}>
                  {currentProject.highlights.map((highlight, idx) => (
                    <div key={idx} className={styles.highlightCard}>
                      <span className={styles.highlightNum}>{String(idx + 1).padStart(2, '0')}</span>
                      <p className={styles.highlightText}>{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hackathon Recognition Images (Proof of Accomplishment) */}
            {currentProject.achievementImages && currentProject.achievementImages.length > 0 && (
              <div className={styles.sectionBlock}>
                <div className={styles.sectionMeta}>
                  <span className={styles.sectionLabel}>// HACKATHON STAGE & WINNING PROOF</span>
                  <div className={styles.sectionDivider} />
                </div>
                <div className={styles.achievementImgsRow}>
                  {currentProject.achievementImages.map((img, idx) => (
                    <div
                      key={img.src}
                      className={styles.achievementImgCard}
                      onClick={() =>
                        setSelectedLightboxImg({
                          image: img,
                          list: currentProject.achievementImages,
                          index: idx,
                        })
                      }
                      title={`Click to view full photo: ${img.label || 'Achievement'}`}
                    >
                      <img
                        src={img.src}
                        alt={img.label}
                        className={styles.achievementThumb}
                        loading="lazy"
                      />
                      <div className={styles.achievementOverlay}>
                        <span className={styles.achievementLabel}>{img.label}</span>
                        <span className={styles.viewBadge}>🔍 View</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies & Frameworks */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionMeta}>
                <span className={styles.sectionLabel}>// TECHNOLOGIES & TOOLS</span>
                <div className={styles.sectionDivider} />
              </div>
              <div className={styles.tagsWrap}>
                {currentProject.tags.map((tag) => (
                  <span key={tag} className={styles.techTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className={styles.actionsFooter}>
              {currentProject.live && (
                <a
                  href={currentProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionBtnPrimary}
                >
                  Launch Live App ↗
                </a>
              )}
              {currentProject.github && (
                <a
                  href={currentProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionBtnSecondary}
                >
                  View GitHub Repo ↗
                </a>
              )}
              {driveUrl && hasVideo && (
                <a
                  href={driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionBtnGhost}
                >
                  Open Video in Drive ↗
                </a>
              )}
              {folderUrl && (
                <a
                  href={folderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionBtnGhost}
                >
                  Drive Folder (Snapshots & Docs) ↗
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer: Carousel / Project Switcher */}
        <div className={styles.footer}>
          <div className={styles.footerNav}>
            <button
              type="button"
              className={styles.navArrow}
              onClick={navigatePrev}
              title="Previous project (Left arrow)"
            >
              ← Prev Project
            </button>
            <span className={styles.counter}>
              {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              className={styles.navArrow}
              onClick={navigateNext}
              title="Next project (Right arrow)"
            >
              Next Project →
            </button>
          </div>

          <div className={styles.switcherList}>
            {projects.map((p, idx) => {
              const isActive = p.title === currentProject.title;
              return (
                <button
                  key={p.title}
                  type="button"
                  className={`${styles.switchBtn} ${isActive ? styles.switchBtnActive : ''}`}
                  onClick={() => switchProject(p)}
                >
                  <span className={styles.switchNum}>{String(idx + 1).padStart(2, '0')}</span>
                  <span className={styles.switchTitle}>{p.title}</span>
                  {p.video && <span className={styles.videoBadge}>VIDEO</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedLightboxImg && (
        <ImageLightbox
          image={selectedLightboxImg.image}
          onClose={() => setSelectedLightboxImg(null)}
          onNext={() => {
            const nextIdx = (selectedLightboxImg.index + 1) % selectedLightboxImg.list.length;
            setSelectedLightboxImg({
              image: selectedLightboxImg.list[nextIdx],
              list: selectedLightboxImg.list,
              index: nextIdx,
            });
          }}
          onPrev={() => {
            const prevIdx = (selectedLightboxImg.index - 1 + selectedLightboxImg.list.length) % selectedLightboxImg.list.length;
            setSelectedLightboxImg({
              image: selectedLightboxImg.list[prevIdx],
              list: selectedLightboxImg.list,
              index: prevIdx,
            });
          }}
          hasNext={selectedLightboxImg.list.length > 1}
          hasPrev={selectedLightboxImg.list.length > 1}
        />
      )}
    </div>
  );
}

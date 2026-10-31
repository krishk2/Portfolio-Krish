// src/components/VideoModal.jsx
import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { projects } from '../data/content';
import styles from './VideoModal.module.css';

export default function VideoModal({ project, onClose }) {
  const [currentProject, setCurrentProject] = useState(project);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  // Update current project if prop changes
  useEffect(() => {
    if (project) {
      setCurrentProject(project);
      setIsIframeLoading(true);
    }
  }, [project]);

  // Handle escape key and arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
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
  }, [currentProject]);

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
        scale: [0.95, 1],
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
        scale: [1, 0.96],
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

  const videoProjects = projects.filter((p) => p.video || p.demo);
  const currentIndex = videoProjects.findIndex((p) => p.title === currentProject?.title);

  const navigateNext = () => {
    if (videoProjects.length === 0) return;
    const nextIdx = (currentIndex + 1) % videoProjects.length;
    switchProject(videoProjects[nextIdx]);
  };

  const navigatePrev = () => {
    if (videoProjects.length === 0) return;
    const prevIdx = (currentIndex - 1 + videoProjects.length) % videoProjects.length;
    switchProject(videoProjects[prevIdx]);
  };

  const switchProject = (p) => {
    if (p.title === currentProject?.title) return;
    setIsIframeLoading(true);
    setCurrentProject(p);
  };

  if (!currentProject) return null;

  const hasVideo = Boolean(currentProject.video);
  const driveUrl = currentProject.demo || currentProject.video;
  const folderUrl = currentProject.driveFolder || (currentProject.folder);

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div ref={modalRef} className={styles.modal}>
        {/* Terminal Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.statusDot}>
              <span className={styles.pulseDot} />
              <span className={styles.statusText}>
                {hasVideo ? 'IN-BROWSER VIDEO STREAM' : 'INTERACTIVE LIVE PREVIEW'}
              </span>
            </div>
            <div>
              <h3 id="video-modal-title" className={styles.title}>
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
                className={styles.actionBtn}
                title="Open Google Drive folder with snapshots & documentation"
              >
                Drive Folder ↗
              </a>
            )}
            {driveUrl && hasVideo && (
              <a
                href={driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtn}
                title="Open video directly on Google Drive"
              >
                Google Drive ↗
              </a>
            )}
            {currentProject.live && (
              <a
                href={currentProject.live}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionLiveBtn}
                title="Launch Live Application"
              >
                Launch App ↗
              </a>
            )}
            <button
              type="button"
              className={styles.closeBtn}
              onClick={handleClose}
              title="Close Player (Esc)"
              aria-label="Close Player"
            >
              <span>✕</span>
              <kbd className={styles.kbd}>ESC</kbd>
            </button>
          </div>
        </div>

        {/* Video Player Display */}
        <div className={styles.playerContainer}>
          {hasVideo ? (
            <div className={styles.videoWrap}>
              {isIframeLoading && (
                <div className={styles.loadingSkeleton}>
                  <div className={styles.spinner} />
                  <p className={styles.loadingText}>Connecting to secure video stream...</p>
                  <p className={styles.loadingSub}>Loading recording for {currentProject.title}</p>
                </div>
              )}
              <iframe
                src={currentProject.video}
                className={styles.iframe}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                onLoad={() => setIsIframeLoading(false)}
                title={`${currentProject.title} Video Demo`}
              />
            </div>
          ) : (
            <div className={styles.webPreviewFallback}>
              <div className={styles.previewCard}>
                <span className={styles.previewTag}>LIVE DEPLOYMENT</span>
                <h4 className={styles.previewTitle}>{currentProject.title}</h4>
                <p className={styles.previewDesc}>{currentProject.description}</p>
                <div className={styles.previewLinks}>
                  <a
                    href={currentProject.demo || currentProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.launchBtn}
                  >
                    Open Live Deployment ↗
                  </a>
                  {currentProject.github && (
                    <a
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.ghBtn}
                    >
                      View Code on GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer: Quick Project Switcher */}
        <div className={styles.footer}>
          <div className={styles.footerNav}>
            <button
              type="button"
              className={styles.navArrow}
              onClick={navigatePrev}
              title="Previous project video (Left arrow)"
            >
              ← Prev
            </button>
            <span className={styles.counter}>
              {String(currentIndex + 1).padStart(2, '0')} / {String(videoProjects.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              className={styles.navArrow}
              onClick={navigateNext}
              title="Next project video (Right arrow)"
            >
              Next →
            </button>
          </div>

          <div className={styles.switcherList}>
            {videoProjects.map((p, idx) => {
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
    </div>
  );
}

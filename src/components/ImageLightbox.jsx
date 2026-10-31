// src/components/ImageLightbox.jsx
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import styles from './ImageLightbox.module.css';

export default function ImageLightbox({ image, onClose, onNext, onPrev, hasNext, hasPrev }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight' && onNext && hasNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && onPrev && hasPrev) {
        onPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasNext, hasPrev, onNext, onPrev]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    if (overlayRef.current && contentRef.current) {
      animate(overlayRef.current, {
        opacity: [0, 1],
        duration: 220,
        ease: 'out(3)',
      });
      animate(contentRef.current, {
        opacity: [0, 1],
        scale: [0.94, 1],
        duration: 280,
        ease: 'out(4)',
      });
    }
  }, [image]);

  const handleClose = () => {
    if (overlayRef.current && contentRef.current) {
      animate(contentRef.current, {
        opacity: [1, 0],
        scale: [1, 0.96],
        duration: 180,
        ease: 'in(3)',
      });
      animate(overlayRef.current, {
        opacity: [1, 0],
        duration: 200,
        ease: 'in(3)',
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  if (!image) return null;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Achievement photo preview"
    >
      <div className={styles.topBar}>
        <div className={styles.labelGroup}>
          <span className={styles.statusDot} />
          <span className={styles.labelText}>{image.label || 'Achievement Photo'}</span>
        </div>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={handleClose}
          title="Close (Esc)"
          aria-label="Close"
        >
          <span>✕</span>
          <kbd className={styles.kbd}>ESC</kbd>
        </button>
      </div>

      <div ref={contentRef} className={styles.imageWrapper}>
        {hasPrev && onPrev && (
          <button
            type="button"
            className={`${styles.navBtn} ${styles.prevBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            title="Previous Photo (Left Arrow)"
            aria-label="Previous Photo"
          >
            ←
          </button>
        )}

        <img
          src={image.src}
          alt={image.alt || image.caption || 'Achievement photo'}
          className={styles.image}
        />

        {hasNext && onNext && (
          <button
            type="button"
            className={`${styles.navBtn} ${styles.nextBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            title="Next Photo (Right Arrow)"
            aria-label="Next Photo"
          >
            →
          </button>
        )}
      </div>

      {image.caption && (
        <div className={styles.captionBar}>
          <p className={styles.captionText}>{image.caption}</p>
        </div>
      )}
    </div>
  );
}

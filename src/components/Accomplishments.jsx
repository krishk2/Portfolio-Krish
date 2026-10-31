// src/components/Accomplishments.jsx
import { useState } from 'react';
import { animate } from 'animejs';
import { accomplishments, certifications, projects } from '../data/content';
import { useAnimeOnView } from '../hooks/useAnimeOnView';
import ImageLightbox from './ImageLightbox';
import styles from './Accomplishments.module.css';

function AccomplishmentRow({ item, index, onOpenImage }) {
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

  const handleWatchVideo = (e) => {
    e.stopPropagation();
    const targetProject = projects.find((p) => p.title === item.projectTitle) || {
      title: item.title,
      subtitle: item.detail,
      video: item.video,
      driveFolder: item.folder,
      badge: "1st Place Convolve 4.0",
    };
    window.dispatchEvent(new CustomEvent('open-project', { detail: targetProject }));
  };

  return (
    <div
      ref={rowRef}
      className={styles.row}
      style={{ opacity: 0 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className={styles.rowTop}>
        <div className={styles.rowLeft}>
          <span className={styles.num}>{String(index + 1).padStart(2, '0')}</span>
          <div>
            <p className={styles.rowTitle}>{item.title}</p>
            <p className={styles.rowDetail}>{item.detail}</p>
          </div>
        </div>
        <div className={styles.rowRight}>
          {item.video && (
            <button
              type="button"
              className={styles.watchBtn}
              onClick={handleWatchVideo}
              title="Watch Convolve 4.0 Winning Demo Video in website player"
            >
              <span>▶</span> Watch Demo
            </button>
          )}
          {item.folder && (
            <a
              href={item.folder}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.folderBtn}
              onClick={(e) => e.stopPropagation()}
              title="Open Google Drive folder with snapshots & documentation"
            >
              Drive Folder ↗
            </a>
          )}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.folderBtn}
              onClick={(e) => e.stopPropagation()}
              title="View Live Deployment"
            >
              Live Demo ↗
            </a>
          )}
          <span className={styles.year}>{item.year}</span>
        </div>
      </div>

      {/* Achievement Images Gallery Strip */}
      {item.images && item.images.length > 0 && (
        <div className={styles.imagesRow}>
          {item.images.map((img, imgIdx) => (
            <div
              key={img.src}
              className={styles.imageCard}
              onClick={() => onOpenImage(img, item.images, imgIdx)}
              title={`Click to view: ${img.label || 'Photo'}`}
            >
              <div className={styles.thumbWrapper}>
                <img
                  src={img.src}
                  alt={img.alt || img.caption}
                  className={styles.thumbImage}
                  loading="lazy"
                />
              </div>
              <div className={styles.thumbBar}>
                <span className={styles.imageLabel}>{img.label}</span>
                <span className={styles.viewBadge}>🔍 View</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CertificationCard({ cert, index, onOpenImage }) {
  const cardRef = useAnimeOnView(
    (el) => {
      animate(el, {
        opacity: [0, 1],
        translateY: [25, 0],
        duration: 600,
        delay: index * 70,
        ease: 'out(3)',
      });
    },
    { threshold: 0.1 }
  );

  return (
    <a
      ref={cardRef}
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.certCard}
      style={{ opacity: 0 }}
      title={`Verify ${cert.issuer} ${cert.title}`}
    >
      <div className={styles.certTop}>
        <span className={styles.certIssuer}>{cert.issuer}</span>
        <span className={styles.certArrow}>↗</span>
      </div>

      {cert.image && (
        <div
          className={styles.certImageContainer}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onOpenImage) onOpenImage(index);
          }}
          title={`Click to preview ${cert.title} Certificate`}
        >
          <img
            src={cert.image}
            alt={`${cert.issuer} — ${cert.title} Certificate`}
            className={styles.certImage}
            loading="lazy"
          />
          <div className={styles.certHoverHint}>
            <span>🔍 Preview</span>
          </div>
        </div>
      )}

      <h4 className={styles.certTitle}>{cert.title}</h4>
      <div className={styles.certBottom}>
        <span className={styles.certTag}>{cert.tag}</span>
        <div className={styles.certActions}>
          <span
            className={styles.certPreviewBtn}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onOpenImage) onOpenImage(index);
            }}
            title="Open Certificate Preview"
          >
            🔍 Preview
          </span>
          <span className={styles.certVerify}>Verify ↗</span>
        </div>
      </div>
    </a>
  );
}

export default function Accomplishments() {
  const [lightboxState, setLightboxState] = useState(null);

  const titleRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [10, 0], duration: 500, ease: 'out(3)' })
  );
  const headingRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [20, 0], duration: 700, ease: 'out(4)' })
  );
  const certHeadingRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [20, 0], duration: 700, ease: 'out(4)' })
  );

  const handleOpenImage = (img, imagesList, currentIndex) => {
    setLightboxState({
      currentImage: img,
      imagesList,
      currentIndex,
    });
  };

  const handleNextImage = () => {
    if (!lightboxState) return;
    const { imagesList, currentIndex } = lightboxState;
    const nextIdx = (currentIndex + 1) % imagesList.length;
    setLightboxState({
      currentImage: imagesList[nextIdx],
      imagesList,
      currentIndex: nextIdx,
    });
  };

  const handlePrevImage = () => {
    if (!lightboxState) return;
    const { imagesList, currentIndex } = lightboxState;
    const prevIdx = (currentIndex - 1 + imagesList.length) % imagesList.length;
    setLightboxState({
      currentImage: imagesList[prevIdx],
      imagesList,
      currentIndex: prevIdx,
    });
  };

  return (
    <section id="accomplishments">
      <div className="container">
        <p className="section-label" ref={titleRef} style={{ opacity: 0 }}>
          Accomplishments
        </p>
        <h2 className={styles.heading} ref={headingRef} style={{ opacity: 0 }}>
          Recognition
        </h2>
        <div className={styles.list}>
          {accomplishments.map((item, i) => (
            <AccomplishmentRow
              key={i}
              item={item}
              index={i}
              onOpenImage={handleOpenImage}
            />
          ))}
        </div>

        <div className={styles.certSection}>
          <div className={styles.certHeader} ref={certHeadingRef} style={{ opacity: 0 }}>
            <div>
              <p className="section-label" style={{ marginBottom: 6 }}>
                Credentials
              </p>
              <h3 className={styles.subheading}>Certifications</h3>
            </div>
            <span className={styles.certCount}>
              {certifications.length} Verified Credentials
            </span>
          </div>

          <div className={styles.certGrid}>
            {certifications.map((cert, i) => (
              <CertificationCard
                key={cert.title + cert.issuer}
                cert={cert}
                index={i}
                onOpenImage={(certIdx) => {
                  const certList = certifications.map((c) => ({
                    src: c.image,
                    label: c.issuer,
                    caption: `${c.issuer} — ${c.title} Certificate (${c.year})`,
                    alt: `${c.issuer} ${c.title}`,
                  }));
                  handleOpenImage(certList[certIdx], certList, certIdx);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {lightboxState && (
        <ImageLightbox
          image={lightboxState.currentImage}
          onClose={() => setLightboxState(null)}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          hasNext={lightboxState.imagesList.length > 1}
          hasPrev={lightboxState.imagesList.length > 1}
        />
      )}
    </section>
  );
}

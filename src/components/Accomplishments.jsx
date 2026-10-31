// src/components/Accomplishments.jsx
import { animate } from 'animejs';
import { accomplishments, certifications, projects } from '../data/content';
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
        <span className={styles.year}>{item.year}</span>
      </div>
    </div>
  );
}

function CertificationCard({ cert, index }) {
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
      <h4 className={styles.certTitle}>{cert.title}</h4>
      <div className={styles.certBottom}>
        <span className={styles.certTag}>{cert.tag}</span>
        <span className={styles.certVerify}>Verify Credential</span>
      </div>
    </a>
  );
}

export default function Accomplishments() {
  const titleRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [10, 0], duration: 500, ease: 'out(3)' })
  );
  const headingRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [20, 0], duration: 700, ease: 'out(4)' })
  );
  const certHeadingRef = useAnimeOnView((el) =>
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

        <div className={styles.certSection}>
          <div className={styles.certHeader} ref={certHeadingRef} style={{ opacity: 0 }}>
            <div>
              <p className="section-label" style={{ marginBottom: 6 }}>Credentials</p>
              <h3 className={styles.subheading}>Certifications</h3>
            </div>
            <span className={styles.certCount}>{certifications.length} Verified Credentials</span>
          </div>

          <div className={styles.certGrid}>
            {certifications.map((cert, i) => (
              <CertificationCard key={cert.title + cert.issuer} cert={cert} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

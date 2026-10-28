// src/components/About.jsx
import { useRef } from 'react';
import { animate, createTimeline, stagger } from 'animejs';
import { skills, education } from '../data/content';
import { useAnimeOnView } from '../hooks/useAnimeOnView';
import styles from './About.module.css';

export default function About() {
  const headingRef = useAnimeOnView((el) => {
    // Split heading into lines and animate up
    const lines = el.querySelectorAll('span');
    animate(lines, {
      translateY: ['100%', '0%'],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(120),
      ease: 'out(4)',
    });
  });

  const bioRef = useAnimeOnView((el) => {
    const paras = el.querySelectorAll('p');
    animate(paras, {
      opacity: [0, 1],
      translateY: [15, 0],
      duration: 700,
      delay: stagger(150),
      ease: 'out(3)',
    });
  });

  const eduRef = useAnimeOnView((el) => {
    animate(el, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      ease: 'out(3)',
    });
  });

  const skillsRef = useAnimeOnView((el) => {
    const tags = el.querySelectorAll(`.${styles.tag}`);
    animate(tags, {
      scale: [0.7, 1],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(30, { grid: [4, tags.length / 4], from: 'center' }),
      ease: 'spring(1, 80, 14, 0)',
    });
  });

  return (
    <section id="about">
      <div className="container">
        <p className="section-label">About</p>

        <div className={styles.grid}>
          <div>
            {/* Heading with overflow-hidden so chars animate up into view */}
            <div className={styles.headingWrap} ref={headingRef}>
              <span style={{ display: 'block', overflow: 'hidden' }}>
                <span style={{ display: 'block', transform: 'translateY(100%)', opacity: 0 }}>Building intelligent</span>
              </span>
              <span style={{ display: 'block', overflow: 'hidden' }}>
                <span style={{ display: 'block', transform: 'translateY(100%)', opacity: 0 }}>
                  systems that <em className={styles.em}>think</em>.
                </span>
              </span>
            </div>

            <div ref={bioRef}>
              <p className={styles.text} style={{ opacity: 0 }}>
                I'm a final-year Computer Science student at RGUKT RK Valley with a passion
                for multi-agent AI architectures and LLM optimization. I've shipped production-grade
                AI systems at Siemens, Infosys, and Glassdata, and won top prizes at pan-India hackathons
                including Convolve 4.0 Pan-IIT.
              </p>
              <p className={styles.text} style={{ opacity: 0 }}>
                My focus is on building agentic pipelines that are fast, reliable, and explainable.
              </p>
            </div>

            <div ref={eduRef} className={styles.eduCard} style={{ opacity: 0 }}>
              <span className={styles.eduLabel}>Education</span>
              <p className={styles.eduTitle}>{education.university}</p>
              <p className={styles.eduSub}>{education.degree} · GPA {education.gpa}</p>
              <p className={styles.eduDuration}>{education.duration}</p>
            </div>
          </div>

          <div className={styles.skillsWrapper} ref={skillsRef}>
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className={styles.skillGroup}>
                <p className={styles.skillCategory}>{category}</p>
                <div className={styles.tags}>
                  {items.map((skill) => (
                    <span key={skill} className={styles.tag} style={{ opacity: 0, transform: 'scale(0.7)' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

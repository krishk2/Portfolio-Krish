// src/components/Contact.jsx
import { useState, useEffect, useCallback } from 'react';
import { animate } from 'animejs';
import { personal } from '../data/content';
import { useAnimeOnView } from '../hooks/useAnimeOnView';
import styles from './Contact.module.css';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Admin DB Modal state
  const [showDbModal, setShowDbModal] = useState(false);
  const [dbContacts, setDbContacts] = useState([]);
  const [dbCount, setDbCount] = useState(0);
  const [isLoadingDb, setIsLoadingDb] = useState(false);

  const titleRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [15, 0], duration: 500, ease: 'out(3)' })
  );
  const headingRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [25, 0], duration: 700, ease: 'out(4)' })
  );
  const leftColRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [30, 0], duration: 700, ease: 'out(3)' })
  );
  const rightColRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], translateY: [30, 0], duration: 700, delay: 100, ease: 'out(3)' })
  );
  const footerRef = useAnimeOnView((el) =>
    animate(el, { opacity: [0, 1], duration: 500, ease: 'out(3)' })
  );

  // Fetch count on mount
  const fetchContacts = useCallback(async () => {
    setIsLoadingDb(true);
    try {
      const res = await fetch('/api/contacts');
      if (res.ok) {
        const data = await res.json();
        setDbContacts(data.contacts || []);
        setDbCount(data.count || 0);
        try {
          localStorage.setItem('portfolio_contacts', JSON.stringify(data.contacts || []));
        } catch {}
      } else {
        // Fallback to localStorage if 404 or backend not attached
        const cached = localStorage.getItem('portfolio_contacts');
        if (cached) {
          const parsed = JSON.parse(cached);
          setDbContacts(parsed);
          setDbCount(parsed.length);
        }
      }
    } catch {
      // Backend not running in static preview
      try {
        const cached = localStorage.getItem('portfolio_contacts');
        if (cached) {
          const parsed = JSON.parse(cached);
          setDbContacts(parsed);
          setDbCount(parsed.length);
        }
      } catch {}
    } finally {
      setIsLoadingDb(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Click-to-copy email without a separate button
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Submit Quick Note to backend database
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.email.trim() || !formState.message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name.trim(),
          email: formState.email.trim(),
          message: formState.message.trim(),
        }),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });
        fetchContacts();
      } else {
        throw new Error('Failed to save to database');
      }
    } catch {
      // Fallback: mailto
      const subject = encodeURIComponent(
        `Portfolio Inquiry from ${formState.name.trim() || 'Visitor'}`
      );
      const body = encodeURIComponent(
        `${formState.message.trim()}\n\n— Sent from Portfolio Contact Form by ${formState.name.trim() || 'Anonymous'} (${formState.email.trim()})`
      );
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
      setSubmitStatus('fallback');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 8000);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      const res = await fetch(`/api/contact?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setDbContacts((prev) => prev.filter((c) => c.id !== id));
        setDbCount((prev) => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Failed to delete contact:', err);
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="container">
        <p className="section-label" ref={titleRef} style={{ opacity: 0 }}>
          Contact
        </p>

        <div className={styles.headerBlock} ref={headingRef} style={{ opacity: 0 }}>
          <h2 className={styles.heading}>
            Let's build something <em className={styles.em}>exceptional</em>.
          </h2>
          <p className={styles.subtext}>
            Have an opportunity in multi-agent orchestration, LLM applications, or autonomous systems?
            Whether you're hiring, exploring collaboration, or just want to connect — my inbox is open.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left Column: Direct Reachout & Network */}
          <div className={styles.leftCol} ref={leftColRef} style={{ opacity: 0 }}>
            {/* Status Card */}
            <div className={styles.statusCard}>
              <div className={styles.statusPulseWrap}>
                <span className={styles.statusPulseDot} />
                <span className={styles.statusDotRing} />
              </div>
              <div>
                <p className={styles.statusTitle}>Available for Opportunities</p>
                <p className={styles.statusSub}>Full-time roles · Agentic AI · Research collaborations</p>
              </div>
            </div>

            {/* Email Card: Click to Copy directly without separate button */}
            <div className={styles.emailCard}>
              <div className={styles.emailCardHeader}>
                <span className={styles.cardLabel}>Direct Inquiries</span>
                <span className={styles.copyInstruction}>Click email to copy</span>
              </div>

              <div
                className={`${styles.emailClickTarget} ${copied ? styles.emailCopied : ''}`}
                onClick={handleCopyEmail}
                role="button"
                tabIndex={0}
                title="Click to copy email address"
              >
                <span className={styles.emailValue}>{personal.email}</span>
                <span className={styles.copyBadge}>
                  {copied ? '✓ Copied!' : 'Copy ⎘'}
                </span>
              </div>

              <div className={styles.emailActions}>
                <a
                  href={`mailto:${personal.email}`}
                  className={styles.primaryAction}
                  title="Open in your mail client"
                >
                  Send Email ↗
                </a>
              </div>
            </div>

            {/* Professional Profiles with SVG Icons */}
            <div className={styles.profilesGrid}>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.profileCard}
                title="Connect on LinkedIn"
              >
                <div className={styles.profileTop}>
                  <div className={styles.brandWrap}>
                    <svg
                      className={styles.socialSvg}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.88a1.45 1.45 0 0 0-1.46 1.46c0 .8.65 1.46 1.46 1.46.8 0 1.46-.66 1.46-1.46 0-.8-.66-1.46-1.46-1.46Z" />
                    </svg>
                    <span className={styles.profileBadge}>LinkedIn</span>
                  </div>
                  <span className={styles.arrowIcon}>↗</span>
                </div>
                <p className={styles.profileTitle}>Krishna Koushik Padigala</p>
                <p className={styles.profileSub}>Professional network & background</p>
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.profileCard}
                title="View code on GitHub"
              >
                <div className={styles.profileTop}>
                  <div className={styles.brandWrap}>
                    <svg
                      className={styles.socialSvg}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                    </svg>
                    <span className={styles.profileBadge}>GitHub</span>
                  </div>
                  <span className={styles.arrowIcon}>↗</span>
                </div>
                <p className={styles.profileTitle}>@krishk2</p>
                <p className={styles.profileSub}>Open source repos & multi-agent systems</p>
              </a>
            </div>
          </div>

          {/* Right Column: Quick Note Form (Connected to Backend DB) */}
          <div className={styles.rightCol} ref={rightColRef} style={{ opacity: 0 }}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <div className={styles.formTitleRow}>
                  <h3 className={styles.formTitle}>Send a Quick Note</h3>
                  <button
                    type="button"
                    className={styles.viewDbBtn}
                    onClick={() => {
                      fetchContacts();
                      setShowDbModal(true);
                    }}
                    title="View stored contact submissions in database"
                  >
                    ⛁ Submissions DB ({dbCount})
                  </button>
                </div>
                <p className={styles.formDesc}>
                  Submissions are saved directly to the database.
                </p>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                  <label htmlFor="contact-name" className={styles.label}>
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="e.g. Alex Chen"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-email" className={styles.label}>
                    Your Email <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-message" className={styles.label}>
                    Message <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Tell me about your project, role, or what you'd like to discuss..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className={styles.textarea}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  {isSubmitting ? 'Saving to Database...' : 'Send Message →'}
                </button>

                {submitStatus === 'success' && (
                  <p className={styles.formSuccess}>
                    ✓ Message received and stored in database! I'll get back to you shortly.
                  </p>
                )}
                {submitStatus === 'fallback' && (
                  <p className={styles.formFallback}>
                    Opening your email client to send your message...
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Database Viewer Modal */}
        {showDbModal && (
          <div
            className={styles.modalOverlay}
            onClick={() => setShowDbModal(false)}
            aria-label="Close database modal"
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <div>
                  <h4 className={styles.modalTitle}>// Contact Database</h4>
                  <p className={styles.modalSub}>
                    {dbCount} {dbCount === 1 ? 'submission' : 'submissions'} stored in <code className={styles.code}>data/contacts.json</code>
                  </p>
                </div>
                <div className={styles.modalHeaderActions}>
                  <button
                    className={styles.refreshBtn}
                    onClick={fetchContacts}
                    disabled={isLoadingDb}
                  >
                    {isLoadingDb ? 'Loading...' : '↻ Refresh'}
                  </button>
                  <button
                    className={styles.closeBtn}
                    onClick={() => setShowDbModal(false)}
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className={styles.modalBody}>
                {dbContacts.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p className={styles.emptyTitle}>No Submissions Yet</p>
                    <p className={styles.emptyDesc}>
                      Messages sent through the Quick Note form will be saved and visible here.
                    </p>
                  </div>
                ) : (
                  <div className={styles.submissionsList}>
                    {dbContacts.map((item) => (
                      <div key={item.id} className={styles.submissionCard}>
                        <div className={styles.subCardTop}>
                          <div>
                            <span className={styles.subName}>
                              {item.name || 'Anonymous Visitor'}
                            </span>
                            <a
                              href={`mailto:${item.email}`}
                              className={styles.subEmail}
                            >
                              {item.email} ↗
                            </a>
                          </div>
                          <div className={styles.subMeta}>
                            <span className={styles.subDate}>
                              {new Date(item.createdAt).toLocaleString()}
                            </span>
                            <button
                              className={styles.deleteBtn}
                              onClick={() => handleDeleteContact(item.id)}
                              title="Delete submission"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                        <p className={styles.subMessage}>{item.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Clean Minimal Footer */}
        <div className={styles.footer} ref={footerRef} style={{ opacity: 0 }}>
          <p>© 2026 Krishna Koushik Padigala.</p>
          <button
            className={styles.toTop}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </section>
  );
}

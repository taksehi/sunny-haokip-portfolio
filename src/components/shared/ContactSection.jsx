import React, { useState } from 'react';
import { Send, Check, Copy, MessageSquare, Terminal, Film, Github, Linkedin, Youtube, Instagram, Database } from 'lucide-react';
import confetti from 'canvas-confetti';
import NeonConnectModal from './NeonConnectModal';

export default function ContactSection({ personal, activeMode }) {
  const [projectType, setProjectType] = useState(activeMode === 'dev' ? 'software' : 'film');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [neonStatus, setNeonStatus] = useState(null);
  const [isNeonModalOpen, setIsNeonModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '$5,000 - $10,000',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          discipline: projectType === 'software' ? 'Software Engineering' : 'Video & Editorial',
          name: formData.name,
          email: formData.email,
          scope: formData.budget,
          brief: formData.message
        })
      });

      const result = await res.json();
      setNeonStatus(result.persistedToNeon);
    } catch (err) {
      console.warn('API submission error:', err);
      setNeonStatus(false);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const isDev = activeMode === 'dev';

  return (
    <section id="contact" style={{ padding: '4.5rem 0' }}>
      <div className="container">
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.65rem',
              marginBottom: '0.75rem'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: isDev ? 'var(--accent-compass)' : 'var(--action-primary)',
                letterSpacing: 'var(--tracking-code)',
                textTransform: 'uppercase'
              }}>
                <MessageSquare size={14} />
                <span>// Direct Transmission</span>
              </div>

              <button
                type="button"
                onClick={() => setIsNeonModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.22rem 0.65rem',
                  borderRadius: '9999px',
                  background: 'rgba(0, 230, 153, 0.07)',
                  border: '1px solid rgba(0, 230, 153, 0.25)',
                  color: '#00e699',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(0, 230, 153, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(0, 230, 153, 0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(0, 230, 153, 0.07)';
                  e.currentTarget.style.borderColor = 'rgba(0, 230, 153, 0.25)';
                }}
                title="Configure or test Neon Database connection"
              >
                <Database size={11} />
                <span>Neon DB Bridge</span>
              </button>
            </div>

            <h2 style={{
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              fontWeight: 400,
              fontFamily: isDev ? 'var(--font-sans)' : 'var(--font-serif)',
              letterSpacing: isDev ? '-0.011em' : '-0.018em',
              marginBottom: '0.75rem'
            }}>
              Let's Build Something Exceptional
            </h2>

            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.98rem',
              maxWidth: '540px',
              margin: '0 auto',
              fontWeight: 400
            }}>
              Whether you need high-throughput engineering systems or cinematic visual storytelling, reach out below.
            </p>
          </div>

          {/* Form Card */}
          <div className="editorial-panel" style={{
            padding: 'clamp(1.75rem, 4vw, 2.5rem)',
            borderRadius: 'var(--radius-card)'
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                <div style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  borderRadius: '50%',
                  border: '1px solid var(--border-hairline)',
                  background: 'var(--bg-canvas)',
                  color: isDev ? 'var(--accent-compass)' : 'var(--action-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <Check size={24} />
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '0.5rem' }}>
                  Transmission Logged
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Thank you for reaching out, {formData.name || 'colleague'}. I'll respond within 24 hours.
                </p>

                {/* Neon Storage Status Indicator */}
                <button
                  type="button"
                  onClick={() => setIsNeonModalOpen(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.4rem 0.95rem',
                    borderRadius: '9999px',
                    background: neonStatus ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${neonStatus ? 'rgba(34, 197, 94, 0.3)' : 'var(--border-hairline)'}`,
                    fontSize: '0.76rem',
                    fontFamily: 'var(--font-mono)',
                    color: neonStatus ? '#4ade80' : 'var(--text-muted)',
                    marginBottom: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#00e699'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = neonStatus ? 'rgba(34, 197, 94, 0.3)' : 'var(--border-hairline)'}
                >
                  <Database size={13} color={neonStatus ? '#4ade80' : '#00e699'} />
                  <span>{neonStatus ? 'Persisted to Neon Postgres DB' : 'Simulated (Click to Connect Neon DB)'}</span>
                </button>

                <div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', budget: '$5,000 - $10,000', message: '' });
                    }}
                    className="btn btn-outline"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Project Category Selection */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-faint)',
                    letterSpacing: 'var(--tracking-code)',
                    marginBottom: '0.65rem'
                  }}>
                    DISCIPLINE:
                  </label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '0.65rem'
                  }}>
                    <button
                      type="button"
                      onClick={() => setProjectType('software')}
                      style={{
                        padding: '0.65rem 1rem',
                        borderRadius: isDev ? '6px' : '10px',
                        border: projectType === 'software' ? '1px solid var(--border-focus)' : '1px solid var(--border-hairline)',
                        background: projectType === 'software' ? 'rgba(255, 255, 255, 0.06)' : 'transparent',
                        color: projectType === 'software' ? 'var(--text-primary)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '0.84rem'
                      }}
                    >
                      <Terminal size={14} style={{ color: 'var(--accent-compass)' }} />
                      <span>Software Engineering</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setProjectType('film')}
                      style={{
                        padding: '0.65rem 1rem',
                        borderRadius: isDev ? '6px' : '10px',
                        border: projectType === 'film' ? '1px solid var(--border-focus)' : '1px solid var(--border-hairline)',
                        background: projectType === 'film' ? 'rgba(255, 255, 255, 0.06)' : 'transparent',
                        color: projectType === 'film' ? 'var(--text-primary)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '0.84rem'
                      }}
                    >
                      <Film size={14} style={{ color: 'var(--action-primary)' }} />
                      <span>Video & Editorial</span>
                    </button>
                  </div>
                </div>

                {/* Name & Email inputs */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1.25rem',
                  marginBottom: '1.25rem'
                }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.7rem 0.9rem',
                        borderRadius: 'var(--radius-input)',
                        background: 'var(--bg-canvas)',
                        border: '1px solid var(--border-hairline)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--border-focus)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border-hairline)'}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@organization.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.7rem 0.9rem',
                        borderRadius: 'var(--radius-input)',
                        background: 'var(--bg-canvas)',
                        border: '1px solid var(--border-hairline)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--border-focus)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border-hairline)'}
                    />
                  </div>
                </div>

                {/* Scope selector */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Estimated Scope
                  </label>
                  <select
                    value={formData.budget}
                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.9rem',
                      borderRadius: 'var(--radius-input)',
                      background: 'var(--bg-canvas)',
                      border: '1px solid var(--border-hairline)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  >
                    <option value="< $3,000">Starter scope (&lt; $3,000)</option>
                    <option value="$3,000 - $7,000">Medium scope ($3,000 - $7,000)</option>
                    <option value="$7,000 - $15,000">Full system / film campaign ($7,000 - $15,000)</option>
                    <option value="$15,000+">Enterprise / Feature production ($15,000+)</option>
                  </select>
                </div>

                {/* Message */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Project Brief
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Project deliverables, technical parameters, or narrative vision..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.9rem',
                      borderRadius: 'var(--radius-input)',
                      background: 'var(--bg-canvas)',
                      border: '1px solid var(--border-hairline)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--border-focus)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-hairline)'}
                  />
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    style={{
                      padding: '0.75rem 1.6rem',
                      background: isDev ? 'var(--text-primary)' : 'var(--action-primary)',
                      color: isDev ? 'var(--bg-canvas)' : 'var(--action-text)'
                    }}
                  >
                    <Send size={14} />
                    <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="btn btn-outline"
                    style={{
                      fontSize: '0.82rem',
                      maxWidth: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{copiedEmail ? 'Email Copied' : personal.socials.email}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Socials */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '2.5rem'
          }}>
            {[
              { icon: Github, url: personal.socials.github, name: 'GitHub' },
              { icon: Linkedin, url: personal.socials.linkedin, name: 'LinkedIn' },
              { icon: Youtube, url: personal.socials.youtube, name: 'YouTube' },
              { icon: Instagram, url: personal.socials.instagram, name: 'Instagram' }
            ].map(({ icon: Icon, url, name }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: 'var(--text-muted)',
                  width: '2.2rem',
                  height: '2.2rem',
                  borderRadius: '50%',
                  border: '1px solid var(--border-hairline)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'border-color var(--transition-fast), color var(--transition-fast)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--border-focus)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-hairline)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
                title={name}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <NeonConnectModal
        isOpen={isNeonModalOpen}
        onClose={() => setIsNeonModalOpen(false)}
      />
    </section>
  );
}

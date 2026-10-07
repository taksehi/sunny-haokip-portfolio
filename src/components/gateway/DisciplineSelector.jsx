import React from 'react';
import { ArrowRight, Terminal, Clapperboard, Cpu, Video, CheckCircle2 } from 'lucide-react';

export default function DisciplineSelector({ activeMode, onSelectMode }) {
  const isDev = activeMode === 'dev';

  const handleSelectDev = () => {
    onSelectMode('dev');
    const el = document.getElementById('showcase-area');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectFilm = () => {
    onSelectMode('film');
    const el = document.getElementById('showcase-area');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="discipline-selector" style={{
      padding: '5rem 0 4rem',
      position: 'relative',
      zIndex: 1,
      borderTop: '1px solid var(--border-hairline)',
      background: 'rgba(8, 8, 8, 0.4)'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          maxWidth: '680px',
          margin: '0 auto 3.5rem'
        }}>
          <div style={{
            fontSize: '0.78rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-faint)',
            letterSpacing: 'var(--tracking-code)',
            textTransform: 'uppercase',
            marginBottom: '0.65rem'
          }}>
            // PHASE TWO
          </div>

          <h2 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            marginBottom: '0.85rem',
            color: 'var(--text-primary)'
          }}>
            Select Your Destination
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 400 }}>
            Choose a discipline below to enter its dedicated portfolio environment.
          </p>
        </div>

        {/* The Two Choice Panels: [ Dev ] [ Film ] */}
        <div className="perspective-container grid-2" style={{ maxWidth: '1060px', margin: '0 auto' }}>
          {/* [ DEV ] Option Card */}
          <div
            onClick={handleSelectDev}
            className="cofounder-card tilt-card-dev"
            style={{
              padding: '2.5rem 2rem',
              cursor: 'pointer',
              border: isDev ? '1px solid var(--border-focus)' : '1px solid var(--border-hairline)',
              background: isDev ? 'rgba(255, 255, 255, 0.05)' : 'var(--bg-surface)'
            }}
          >
            {/* Header Tag */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              borderBottom: '1px solid var(--border-hairline)',
              paddingBottom: '1rem'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--accent-compass)',
                letterSpacing: 'var(--tracking-code)'
              }}>
                <Cpu size={16} />
                <span>[ DEV ] SOFTWARE ENGINEERING</span>
              </div>

              <span className="meta-tag" style={{ color: isDev ? 'var(--text-primary)' : 'var(--text-faint)' }}>
                {isDev ? '● ACTIVE' : 'SELECT'}
              </span>
            </div>

            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 400,
              letterSpacing: '-0.011em',
              marginBottom: '0.75rem',
              color: 'var(--text-primary)'
            }}>
              Developer Environment
            </h3>

            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.94rem',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
              fontWeight: 400
            }}>
              High-throughput microservice architectures, interactive WebGL color tools, real-time queues, and command-line interfaces.
            </p>

            {/* Feature Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--accent-compass)' }} />
                <span>Interactive CLI terminal console</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--accent-compass)' }} />
                <span>Hyperstudio obsidian wireframe layout</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--accent-compass)' }} />
                <span>Live repositories & technical specs</span>
              </div>
            </div>

            {/* Launch CTA */}
            <button
              onClick={handleSelectDev}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '0.9rem',
                background: isDev ? 'var(--action-primary)' : 'rgba(255,255,255,0.08)',
                color: isDev ? 'var(--action-text)' : 'var(--text-primary)',
                border: '1px solid var(--border-hairline)'
              }}
            >
              <span>Explore Developer World</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* [ FILM ] Option Card */}
          <div
            onClick={handleSelectFilm}
            className="cofounder-card tilt-card-film"
            style={{
              padding: '2.5rem 2rem',
              cursor: 'pointer',
              border: !isDev ? '1px solid #f59e0b' : '1px solid var(--border-hairline)',
              background: !isDev ? 'rgba(245, 158, 11, 0.06)' : 'var(--bg-surface)'
            }}
          >
            {/* Header Tag */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              borderBottom: '1px solid var(--border-hairline)',
              paddingBottom: '1rem'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: '#f59e0b',
                letterSpacing: 'var(--tracking-code)'
              }}>
                <Video size={16} />
                <span>[ FILM ] ANALOG ARCHIVE & POLAROID</span>
              </div>

              <span className="meta-tag" style={{ color: !isDev ? '#f59e0b' : 'var(--text-faint)' }}>
                {!isDev ? '● ACTIVE' : 'SELECT'}
              </span>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2rem',
              fontWeight: 400,
              letterSpacing: '-0.018em',
              marginBottom: '0.75rem',
              color: 'var(--text-primary)'
            }}>
              Cinema Environment
            </h3>

            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.94rem',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
              fontWeight: 400
            }}>
              Tactile polaroids, 35mm celluloid contact sheets, DaVinci Resolve color grading, anamorphic lenses, and commercial direction.
            </p>

            {/* Feature Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={14} style={{ color: '#f59e0b' }} />
                <span>Tactile Polaroid cards with handwritten metadata</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={14} style={{ color: '#f59e0b' }} />
                <span>35mm continuous celluloid negative film roll</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={14} style={{ color: '#f59e0b' }} />
                <span>Director clapperboard slate & flight-case gear rig</span>
              </div>
            </div>

            {/* Launch CTA */}
            <button
              onClick={handleSelectFilm}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '0.9rem',
                background: !isDev ? '#f59e0b' : 'rgba(255,255,255,0.08)',
                color: !isDev ? '#0b0a09' : 'var(--text-primary)',
                border: '1px solid var(--border-hairline)'
              }}
            >
              <span>Explore Filmmaker World</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { ArrowRight, Terminal, Film, Compass, Clapperboard, Cpu, Video, CheckCircle2, Sliders, Play } from 'lucide-react';

export default function GatewayHero({ activeMode, onSelectMode, personal, onOpenShowreel }) {
  const isDev = activeMode === 'dev';

  const handleLaunchDev = () => {
    onSelectMode('dev');
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLaunchFilm = () => {
    onSelectMode('film');
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="gateway" style={{
      padding: '4.5rem 0 3.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        {/* Top Operational Pill Badge */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.35rem 0.95rem',
            borderRadius: '9999px',
            border: '1px solid var(--border-hairline)',
            background: 'var(--bg-surface)',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-mono)',
            letterSpacing: 'var(--tracking-code)',
            color: 'var(--text-muted)'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#10b981'
            }} />
            <span>OPERATING SYSTEM: CODE & CINEMA DUAL ENGINE</span>
          </div>
        </div>

        {/* Master Center Headline */}
        <div style={{
          textAlign: 'center',
          maxWidth: '890px',
          margin: '0 auto 3rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            marginBottom: '1.25rem',
            color: 'var(--text-primary)'
          }}>
            Operating at the Convergence of <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>Code</span> & <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Cinema</span>
          </h1>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            maxWidth: '680px',
            margin: '0 auto',
            fontWeight: 400
          }}>
            Architecting high-throughput full-stack systems and directing atmospheric visual narratives with bespoke color grades. Select an operational discipline to enter.
          </p>
        </div>

        {/* CoFounder-Inspired Floating 3D Perspective Operations Cards */}
        <div className="perspective-container grid-2" style={{ marginBottom: '3.5rem' }}>
          {/* Card 1: Software & Systems Architecture */}
          <div
            onClick={handleLaunchDev}
            className="cofounder-card tilt-card-dev"
            style={{
              padding: '2rem',
              cursor: 'pointer',
              border: isDev ? '1px solid var(--border-focus)' : '1px solid var(--border-hairline)',
              background: isDev ? 'rgba(255, 255, 255, 0.04)' : 'var(--bg-surface)'
            }}
          >
            {/* Card Header Slate */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-hairline)',
              paddingBottom: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '6px',
                  background: 'var(--bg-canvas)',
                  border: '1px solid var(--border-hairline)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-compass)'
                }}>
                  <Cpu size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', letterSpacing: 'var(--tracking-code)', color: 'var(--text-primary)' }}>
                    engine://fullstack-systems
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
                    HYPERSTUDIO ARCHITECTURE
                  </div>
                </div>
              </div>

              <span className="meta-tag" style={{ color: isDev ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {isDev ? '● ACTIVE' : 'STANDBY'}
              </span>
            </div>

            {/* Title & Narrative */}
            <h2 style={{
              fontSize: '1.65rem',
              fontWeight: 400,
              letterSpacing: '-0.011em',
              marginBottom: '0.6rem',
              color: 'var(--text-primary)'
            }}>
              Software Engineering
            </h2>

            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.92rem',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              fontWeight: 400
            }}>
              {personal.taglineDev}
            </p>

            {/* Metrics Ribbon */}
            <div style={{
              background: 'var(--bg-canvas)',
              border: '1px solid var(--border-hairline)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--text-primary)',
              letterSpacing: 'var(--tracking-code)'
            }}>
              <div>// BENCHMARKS:</div>
              <div style={{ color: 'var(--accent-compass)', marginTop: '0.2rem' }}>
                • 45,000 req/sec peak • 60 FPS GLSL shaders • &lt; 4ms latency
              </div>
            </div>

            {/* Operations Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
              {[
                'Distributed event-driven queues & Redis state',
                'In-browser WebGL & Three.js color matrix engine',
                'Real-time collaborative CRDT editorial CMS'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--accent-compass)', flexShrink: 0 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Launch Action */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-hairline)'
            }}>
              <span style={{
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <span>Launch Developer Mode</span>
                <ArrowRight size={15} style={{ color: 'var(--accent-compass)' }} />
              </span>

              <span style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-faint)'
              }}>
                [ ENTER ]
              </span>
            </div>
          </div>

          {/* Card 2: Cinematography & Video Post-Production */}
          <div
            onClick={handleLaunchFilm}
            className="cofounder-card tilt-card-film"
            style={{
              padding: '2rem',
              cursor: 'pointer',
              border: !isDev ? '1px solid var(--action-primary)' : '1px solid var(--border-hairline)',
              background: !isDev ? 'rgba(0, 47, 255, 0.05)' : 'var(--bg-surface)'
            }}
          >
            {/* Card Header Slate */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-hairline)',
              paddingBottom: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '6px',
                  background: 'var(--bg-canvas)',
                  border: '1px solid var(--border-hairline)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--action-primary)'
                }}>
                  <Video size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', letterSpacing: 'var(--tracking-code)', color: 'var(--text-primary)' }}>
                    cinema://editorial-suite
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
                    ANALOGUE aF-1 NOIR
                  </div>
                </div>
              </div>

              <span className="meta-tag" style={{ color: !isDev ? 'var(--action-primary)' : 'var(--text-muted)' }}>
                {!isDev ? '● ACTIVE' : 'STANDBY'}
              </span>
            </div>

            {/* Title & Narrative */}
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.85rem',
              fontWeight: 400,
              letterSpacing: '-0.018em',
              marginBottom: '0.6rem',
              color: 'var(--text-primary)'
            }}>
              Cinematography & Editorial
            </h2>

            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.92rem',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              fontWeight: 400
            }}>
              {personal.taglineFilm}
            </p>

            {/* Metrics Ribbon */}
            <div style={{
              background: 'var(--bg-canvas)',
              border: '1px solid var(--border-hairline)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--text-primary)',
              letterSpacing: 'var(--tracking-code)'
            }}>
              <div>// PRODUCTION RIG:</div>
              <div style={{ color: 'var(--action-primary)', marginTop: '0.2rem' }}>
                • 4K 120p 10-bit 4:2:2 • Sirui 1.6x Anamorphic • DaVinci Resolve
              </div>
            </div>

            {/* Operations Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
              {[
                'Commercial direction & high-octane speed ramps',
                'Kodak 2383 D65 print LUT & film grain emulation',
                'Syncopated kinetic pacing & spatial Foley mixing'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--action-primary)', flexShrink: 0 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Launch Action */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-hairline)'
            }}>
              <span style={{
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <span>Launch Filmmaker Mode</span>
                <ArrowRight size={15} style={{ color: 'var(--action-primary)' }} />
              </span>

              <span style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-faint)'
              }}>
                [ ENTER ]
              </span>
            </div>
          </div>
        </div>

        {/* Centralized Quick Portal Trigger Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <button
            onClick={handleLaunchDev}
            className="btn btn-primary"
            style={{
              background: isDev ? 'var(--action-primary)' : 'rgba(255,255,255,0.06)',
              color: isDev ? 'var(--action-text)' : 'var(--text-primary)',
              border: '1px solid var(--border-hairline)'
            }}
          >
            <Terminal size={14} />
            <span>Enter Developer Mode</span>
          </button>

          <button
            onClick={handleLaunchFilm}
            className="btn btn-primary"
            style={{
              background: !isDev ? 'var(--action-primary)' : 'rgba(255,255,255,0.06)',
              color: !isDev ? 'var(--action-text)' : 'var(--text-primary)',
              border: '1px solid var(--border-hairline)'
            }}
          >
            <Clapperboard size={14} />
            <span>Enter Filmmaker Mode</span>
          </button>

          <button
            onClick={onOpenShowreel}
            className="btn btn-outline"
          >
            <Play size={14} fill="currentColor" />
            <span>Watch 2025 Reel</span>
          </button>
        </div>
      </div>
    </section>
  );
}

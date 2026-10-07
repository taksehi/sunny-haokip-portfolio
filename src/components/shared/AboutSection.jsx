import React from 'react';
import { Compass, Film, Code2, Sparkles } from 'lucide-react';

export default function AboutSection({ personal, activeMode }) {
  const isDev = activeMode === 'dev';

  return (
    <section id="about" style={{ padding: '4rem 0', position: 'relative' }}>
      <div className="container">
        <div className="editorial-panel" style={{
          padding: 'clamp(2rem, 5vw, 3.5rem)',
          position: 'relative'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            {/* Left Bio Column */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: isDev ? 'var(--accent-compass)' : 'var(--action-primary)',
                letterSpacing: 'var(--tracking-code)',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}>
                <Sparkles size={14} />
                <span>// Editorial Philosophy</span>
              </div>

              <h2 style={{
                fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
                fontWeight: 400,
                fontFamily: isDev ? 'var(--font-sans)' : 'var(--font-serif)',
                letterSpacing: isDev ? '-0.011em' : '-0.018em',
                lineHeight: 1.1,
                marginBottom: '1.25rem'
              }}>
                Where Logic Meets Sensory Narrative
              </h2>

              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.98rem',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
                fontWeight: 400
              }}>
                {personal.bio}
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-hairline)'
              }}>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 400, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', letterSpacing: 'var(--tracking-code)' }}>
                    End-to-End
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>Full-Stack Solo Shipper</div>
                </div>

                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 400, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', letterSpacing: 'var(--tracking-code)' }}>
                    AI & RAG
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>Intelligent Agent Systems</div>
                </div>

                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 400, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', letterSpacing: 'var(--tracking-code)' }}>
                    Solo Shot
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>Cinematic Travel & Commercials</div>
                </div>
              </div>
            </div>

            {/* Right Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: isDev ? '8px' : '12px',
                  background: 'var(--bg-canvas)',
                  border: '1px solid var(--border-hairline)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  marginBottom: '0.4rem'
                }}>
                  <Code2 size={16} style={{ color: 'var(--accent-compass)' }} />
                  <span>The Engineering Mindset</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>
                  Architecting full-stack systems from PostgreSQL databases to responsive Next.js interfaces, building robust LLM/RAG pipelines, and developing intelligent agent systems that solve real-world problems.
                </p>
              </div>

              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: isDev ? '8px' : '12px',
                  background: 'var(--bg-canvas)',
                  border: '1px solid var(--border-hairline)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  marginBottom: '0.4rem'
                }}>
                  <Film size={16} style={{ color: 'var(--action-primary)' }} />
                  <span>The Visual Storyteller</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>
                  Directing solo-shot travel films with authentic ambient light, cutting high-retention creator spots (Techburner), and crafting dynamic After Effects motion graphics and typography.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Compass, Terminal, Cpu } from 'lucide-react';

export default function DevShowcase({ projects, skills, onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const dynamicCategories = ['All', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category.includes(activeCategory) || p.category === activeCategory);

  return (
    <section id="projects" style={{ padding: '3.5rem 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            letterSpacing: 'var(--tracking-code)',
            color: 'var(--accent-compass)',
            textTransform: 'uppercase',
            marginBottom: '0.75rem'
          }}>
            <Compass size={14} />
            <span>// Engineering Systems</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 400,
            letterSpacing: '-0.011em',
            marginBottom: '0.85rem'
          }}>
            Selected Code & Architectures
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', fontSize: '0.98rem', fontWeight: 400 }}>
            Precision engineering across graphics pipelines, event-driven task queues, and collaborative tools.
          </p>
        </div>

        {/* Category Filters (Refero Ghost Pills) */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '2.5rem'
        }}>
          {dynamicCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                color: activeCategory === cat ? 'var(--text-primary)' : 'var(--text-muted)',
                border: activeCategory === cat ? '1px solid var(--border-focus)' : '1px solid var(--border-hairline)',
                padding: '0.35rem 0.9rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontWeight: 400,
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid (Hyperstudio Wireframe Cards) */}
        <div className="grid-2" style={{ marginBottom: '4.5rem' }}>
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              className="editorial-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Media Container */}
              <div
                style={{
                  height: '210px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--border-hairline)'
                }}
                onClick={() => onSelectProject(proj)}
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(20%)',
                    transition: 'transform var(--transition-smooth)'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(16,16,16,0.9) 0%, transparent 60%)'
                }} />

                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem'
                }}>
                  <span className="meta-tag">{proj.category}</span>
                </div>

                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--text-faint)',
                  letterSpacing: 'var(--tracking-code)'
                }}>
                  {proj.year}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3
                  onClick={() => onSelectProject(proj)}
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 400,
                    letterSpacing: '-0.011em',
                    marginBottom: '0.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <span>{proj.title}</span>
                  <ArrowUpRight size={16} style={{ color: 'var(--accent-compass)' }} />
                </h3>

                <div style={{
                  fontSize: '0.82rem',
                  color: 'var(--accent-compass)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: 'var(--tracking-code)',
                  marginBottom: '0.75rem'
                }}>
                  {proj.subtitle}
                </div>

                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  marginBottom: '1.25rem'
                }}>
                  {proj.description}
                </p>

                {/* Metrics Highlight (Hyperstudio Blueprint Spec) */}
                <div style={{
                  border: '1px solid var(--border-hairline)',
                  borderRadius: '6px',
                  padding: '0.55rem 0.8rem',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)',
                  letterSpacing: 'var(--tracking-code)',
                  marginBottom: '1.25rem',
                  background: 'var(--bg-canvas)'
                }}>
                  // SPEC: {proj.metrics}
                </div>

                {/* Tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  marginBottom: '1.5rem',
                  marginTop: 'auto'
                }}>
                  {proj.tags.map(tag => (
                    <span key={tag} className="meta-tag">{tag}</span>
                  ))}
                </div>

                {/* Footer Actions */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-hairline)'
                }}>
                  <button
                    onClick={() => onSelectProject(proj)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-primary)',
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <span>View Architecture</span>
                    <ArrowUpRight size={14} style={{ color: 'var(--accent-compass)' }} />
                  </button>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-hairline)'
                      }}
                      title="GitHub"
                    >
                      <Github size={15} />
                    </a>
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-hairline)'
                      }}
                      title="Live Demo"
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Core Stack (Wireframe Blueprint) */}
        <div id="skills-gear" style={{ paddingTop: '1rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-compass)',
              fontSize: '0.8rem',
              letterSpacing: 'var(--tracking-code)',
              textTransform: 'uppercase',
              marginBottom: '0.5rem'
            }}>
              // Capabilities Matrix
            </div>
            <h3 style={{
              fontSize: '1.9rem',
              fontWeight: 400,
              letterSpacing: '-0.011em'
            }}>
              Core Engineering Stack
            </h3>
          </div>

          <div className="grid-2">
            {skills.map(group => (
              <div key={group.category} className="editorial-panel" style={{ padding: '1.75rem' }}>
                <h4 style={{
                  fontSize: '1.05rem',
                  fontWeight: 400,
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Cpu size={16} style={{ color: 'var(--accent-compass)' }} />
                  <span>{group.category}</span>
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {group.skills.map(skill => (
                    <span key={skill} className="meta-tag">{skill}</span>
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

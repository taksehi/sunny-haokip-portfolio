import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, Play, Cpu, Video, Award, Compass, Smartphone, Maximize2 } from 'lucide-react';
import { getCssAspectRatio, isVerticalAspectRatio } from '../../utils/mediaUtils';

export default function ProjectModal({ project, type, onClose }) {
  const [detectedRatio, setDetectedRatio] = useState(null);
  const [fillMode, setFillMode] = useState('cover'); // 'cover' fills 100% without letterbox/pillarbox black bars

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const isDev = type === 'dev';

  // Determine vertical status dynamically
  const declaredVertical = isVerticalAspectRatio(project.aspectRatio);
  const isVertical = !isDev && (detectedRatio?.isVertical ?? declaredVertical);
  const effectiveRatio = detectedRatio?.cssRatio || (isVertical ? '9 / 16' : getCssAspectRatio(project.aspectRatio));

  const handleVideoMetadata = (e) => {
    const { videoWidth, videoHeight } = e.target;
    if (videoWidth && videoHeight) {
      setDetectedRatio({
        width: videoWidth,
        height: videoHeight,
        isVertical: videoHeight > videoWidth,
        cssRatio: `${videoWidth} / ${videoHeight}`
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          border: '1px solid var(--border-hairline)',
          borderRadius: isDev ? '12px' : '20px',
          maxWidth: isVertical ? '960px' : '820px',
          overflow: 'hidden'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(10, 10, 10, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border-hairline)',
            color: 'var(--text-primary)',
            width: '2.4rem',
            height: '2.4rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 30,
            transition: 'all var(--transition-fast)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--border-focus)';
            e.currentTarget.style.transform = 'scale(1.06)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-hairline)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={16} />
        </button>

        {/* Modal Content Structure */}
        {isDev ? (
          /* Developer Modal */
          <>
            <div style={{ height: '260px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border-hairline)' }}>
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, var(--bg-surface) 10%, transparent 80%)'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.75rem'
              }}>
                <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>{project.category}</span>
                <h2 style={{
                  fontSize: '1.8rem',
                  fontWeight: 400,
                  letterSpacing: '-0.011em',
                  lineHeight: 1.15
                }}>
                  {project.title}
                </h2>
              </div>
            </div>

            <div style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-compass)',
                  letterSpacing: 'var(--tracking-code)',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem'
                }}>
                  // Architecture & Technical Overview
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.65 }}>
                  {project.longDescription || project.description}
                </p>
              </div>

              {project.architectureNotes && (
                <div style={{
                  background: 'var(--bg-canvas)',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: '8px',
                  padding: '1.25rem',
                  marginBottom: '1.75rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--accent-compass)',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '0.35rem'
                  }}>
                    <Cpu size={14} />
                    <span>SYSTEM NOTES</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    {project.architectureNotes}
                  </div>
                </div>
              )}

              {project.tags && (
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-faint)',
                    letterSpacing: 'var(--tracking-code)',
                    marginBottom: '0.5rem'
                  }}>
                    // DEPENDENCIES & TECHNOLOGIES
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {project.tags.map(tag => (
                      <span key={tag} className="meta-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '0.85rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-hairline)'
              }}>
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
                  <Github size={15} />
                  <span>GitHub Repository</span>
                </a>
                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <ExternalLink size={15} />
                  <span>Launch Live Demo</span>
                </a>
              </div>
            </div>
          </>
        ) : isVertical ? (
          /* Vertical Film Project Modal (Side-by-Side Dynamic Reel Console) */
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            minHeight: '480px'
          }}>
            {/* Left: Dynamic Vertical Reel Viewport (Zero Black Bars) */}
            <div style={{
              flex: '1 1 340px',
              maxWidth: '420px',
              minWidth: '280px',
              background: '#040404',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              borderRight: '1px solid var(--border-hairline)',
              position: 'relative'
            }}>
              {/* Vertical Phone/Reel Bezel Frame */}
              <div style={{
                width: '100%',
                maxWidth: '340px',
                aspectRatio: effectiveRatio || '9 / 16',
                maxHeight: 'calc(80vh - 3rem)',
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#000000',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.15)'
              }}>
                {project.embedUrl ? (
                  <iframe
                    src={project.embedUrl.includes('drive.google.com') ? project.embedUrl : `${project.embedUrl}?autoplay=1&mute=0`}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      display: 'block'
                    }}
                  />
                ) : (
                  <video
                    src={project.previewVideo}
                    controls
                    autoPlay
                    loop
                    playsInline
                    onLoadedMetadata={handleVideoMetadata}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: fillMode,
                      display: 'block'
                    }}
                  />
                )}

                {/* Vertical Reel Watermark Pill */}
                <div style={{
                  position: 'absolute',
                  top: '0.75rem',
                  left: '0.75rem',
                  background: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(6px)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#f59e0b',
                  letterSpacing: '0.06em',
                  pointerEvents: 'none',
                  zIndex: 10
                }}>
                  <Smartphone size={11} />
                  <span>9:16 VERTICAL REEL</span>
                </div>
              </div>

              {/* Dynamic Fit Mode Toggle */}
              <div style={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)'
              }}>
                <span>Fill Mode:</span>
                <button
                  type="button"
                  onClick={() => setFillMode(fillMode === 'cover' ? 'contain' : 'cover')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid var(--border-hairline)',
                    color: '#f59e0b',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {fillMode === 'cover' ? 'Full Fill (No Bars)' : 'Fit Frame'}
                </button>
              </div>
            </div>

            {/* Right: Project Details & Actions */}
            <div style={{
              flex: '1 1 360px',
              padding: '2.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  marginBottom: '0.75rem'
                }}>
                  <span className="meta-tag">{project.category}</span>
                  <span className="meta-tag" style={{ color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.4)' }}>
                    {project.aspectRatio || '9:16 Vertical'}
                  </span>
                  <span className="meta-tag">{project.duration}</span>
                  <span className="meta-tag">{project.year}</span>
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.2rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.018em',
                  lineHeight: 1.1,
                  marginBottom: '0.35rem'
                }}>
                  {project.title}
                </h2>

                <div style={{ color: '#f59e0b', fontSize: '0.9rem', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)' }}>
                  {project.role}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    fontSize: '0.76rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--action-primary)',
                    letterSpacing: 'var(--tracking-code)',
                    textTransform: 'uppercase',
                    marginBottom: '0.45rem'
                  }}>
                    // Editorial Synopsis
                  </div>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.92rem',
                    lineHeight: 1.65
                  }}>
                    {project.longDescription || project.description}
                  </p>
                </div>

                {project.gear && (
                  <div style={{
                    background: 'var(--bg-canvas)',
                    border: '1px solid var(--border-hairline)',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#f59e0b',
                      letterSpacing: '0.06em',
                      marginBottom: '0.3rem'
                    }}>
                      // PRODUCTION & POST SUITE
                    </div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.84rem' }}>
                      {project.gear}
                    </div>
                  </div>
                )}

                {project.awards && (
                  <div style={{
                    background: 'var(--bg-canvas)',
                    border: '1px solid var(--border-hairline)',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.06em',
                      marginBottom: '0.3rem'
                    }}>
                      // HIGHLIGHT
                    </div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.84rem' }}>
                      {project.awards}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '0.85rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-hairline)',
                marginTop: '1.5rem'
              }}>
                {project.driveUrl && (
                  <a
                    href={project.driveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline"
                  >
                    <ExternalLink size={15} />
                    <span>Open in Google Drive</span>
                  </a>
                )}
                <button onClick={onClose} className="btn btn-primary">
                  <span>Close Film Sheet</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Horizontal Widescreen Film Project Modal (16:9 / 2.39:1 Anamorphic) */
          <>
            <div style={{
              width: '100%',
              aspectRatio: effectiveRatio || '16 / 9',
              maxHeight: '62vh',
              background: '#040404',
              position: 'relative',
              overflow: 'hidden',
              borderBottom: '1px solid var(--border-hairline)'
            }}>
              {project.embedUrl ? (
                <iframe
                  src={project.embedUrl.includes('drive.google.com') ? project.embedUrl : `${project.embedUrl}?autoplay=1&mute=0`}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block'
                  }}
                />
              ) : (
                <video
                  src={project.previewVideo}
                  controls
                  autoPlay
                  loop
                  playsInline
                  onLoadedMetadata={handleVideoMetadata}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: fillMode,
                    display: 'block'
                  }}
                />
              )}

              {/* Aspect Ratio Stamp */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(6px)',
                padding: '0.25rem 0.65rem',
                borderRadius: '4px',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: '#f59e0b',
                letterSpacing: '0.06em',
                pointerEvents: 'none',
                zIndex: 10
              }}>
                {project.aspectRatio || 'CINEMATIC WIDESCREEN'}
              </div>
            </div>

            <div style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  marginBottom: '0.5rem'
                }}>
                  <span className="meta-tag">{project.category}</span>
                  <span className="meta-tag">{project.aspectRatio}</span>
                  <span className="meta-tag">{project.duration}</span>
                  <span className="meta-tag">{project.year}</span>
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.1rem',
                  fontWeight: 400,
                  letterSpacing: '-0.018em',
                  lineHeight: 1.05,
                  marginBottom: '0.35rem'
                }}>
                  {project.title}
                </h2>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  {project.role}
                </div>
              </div>

              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--action-primary)',
                  letterSpacing: 'var(--tracking-code)',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem'
                }}>
                  // Editorial & Cinematic Synopsis
                </div>
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.94rem',
                  lineHeight: 1.65,
                  fontWeight: 400
                }}>
                  {project.longDescription || project.description}
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
                marginBottom: '1.75rem'
              }}>
                {project.gear && (
                  <div style={{
                    background: 'var(--bg-canvas)',
                    border: '1px solid var(--border-hairline)',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--action-primary)',
                      letterSpacing: 'var(--tracking-code)',
                      marginBottom: '0.4rem'
                    }}>
                      // CAMERA & COLOR RIG
                    </div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                      {project.gear}
                    </div>
                  </div>
                )}

                {project.awards && (
                  <div style={{
                    background: 'var(--bg-canvas)',
                    border: '1px solid var(--border-hairline)',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                      letterSpacing: 'var(--tracking-code)',
                      marginBottom: '0.4rem'
                    }}>
                      // SELECTION & RECOGNITION
                    </div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                      {project.awards}
                    </div>
                  </div>
                )}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '0.85rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-hairline)'
              }}>
                {project.driveUrl && (
                  <a
                    href={project.driveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline"
                  >
                    <ExternalLink size={15} />
                    <span>Open in Google Drive</span>
                  </a>
                )}
                <button onClick={onClose} className="btn btn-primary">
                  <span>Close Film Sheet</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

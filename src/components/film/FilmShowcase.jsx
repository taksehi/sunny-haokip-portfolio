import React, { useState, useRef } from 'react';
import { Play, Clapperboard, Film, Camera, Scissors, Award, Sparkles, Layers, Sliders, Volume2, Eye } from 'lucide-react';
import { getCssAspectRatio, isVerticalAspectRatio } from '../../utils/mediaUtils';

/* 1. Authentic Tactile Polaroid Card Component */
function PolaroidCard({ proj, onSelectProject, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [detectedVertical, setDetectedVertical] = useState(null);
  const videoRef = useRef(null);

  const declaredVertical = isVerticalAspectRatio(proj.aspectRatio) || (proj.title && proj.title.toLowerCase().includes('reel'));
  const isVertical = detectedVertical ?? declaredVertical;

  // Subtle organic rotation angles for tactile pinboard look
  const rotations = [-1.6, 1.4, -1.2, 1.8, -0.8, 1.2];
  const rotAngle = rotations[index % rotations.length];

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="polaroid-rotatable"
      style={{
        position: 'relative',
        transform: isHovered
          ? 'translateY(-12px) rotate(0deg) scale(1.02)'
          : `rotate(${rotAngle}deg)`,
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: isHovered ? 10 : 1
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Scotch Masking Tape Strip at Top */}
      <div style={{
        position: 'absolute',
        top: '-14px',
        left: '50%',
        transform: `translateX(-50%) rotate(${rotAngle * -1.5}deg)`,
        width: '90px',
        height: '24px',
        background: 'rgba(254, 240, 199, 0.65)',
        backdropFilter: 'blur(2px)',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
        borderLeft: '1px dashed rgba(217, 119, 6, 0.3)',
        borderRight: '1px dashed rgba(217, 119, 6, 0.3)',
        zIndex: 20,
        pointerEvents: 'none'
      }} />

      {/* Main Polaroid Photo Body */}
      <div style={{
        background: '#fbf9f4', // Classic Polaroid cream paper
        borderRadius: '4px',
        padding: '1.25rem 1.25rem 1.75rem',
        boxShadow: isHovered
          ? '0 26px 50px rgba(0, 0, 0, 0.75), 0 4px 12px rgba(245, 158, 11, 0.15)'
          : '0 16px 36px rgba(0, 0, 0, 0.55), 0 2px 6px rgba(0, 0, 0, 0.3)',
        border: '1px solid #ede5d8',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer'
      }}>
        {/* Dynamic Photo Frame Window inside Polaroid (Adapts to Vertical/Horizontal with Zero Black Bars) */}
        <div
          onClick={() => onSelectProject(proj)}
          style={{
            width: '100%',
            aspectRatio: isVertical ? '4 / 5' : '16 / 10',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '2px',
            background: '#0a0a0a',
            border: '1px solid rgba(0, 0, 0, 0.25)',
            boxShadow: 'inset 0 0 16px rgba(0, 0, 0, 0.7)',
            marginBottom: '1.25rem'
          }}
        >
          {/* Static Still Video Frame Thumbnail */}
          <img
            src={proj.posterImage}
            alt={proj.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: (isHovered && proj.previewVideo) ? 0 : 1,
              transition: 'opacity 0.4s ease, transform 0.5s ease',
              transform: isHovered ? 'scale(1.06)' : 'scale(1)',
              filter: 'contrast(1.05) saturate(1.08)'
            }}
          />

          {/* Looping Silent Video on Hover only if specific previewVideo provided */}
          {proj.previewVideo && (
            <video
              ref={videoRef}
              src={proj.previewVideo}
              loop
              muted
              playsInline
              onLoadedMetadata={(e) => {
                if (e.target.videoHeight && e.target.videoWidth) {
                  setDetectedVertical(e.target.videoHeight > e.target.videoWidth);
                }
              }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.4s ease'
              }}
            />
          )}

          {/* Analog Film Stock Stamp (Top Left) */}
          <div style={{
            position: 'absolute',
            top: '0.65rem',
            left: '0.75rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(10, 10, 10, 0.75)',
            backdropFilter: 'blur(6px)',
            padding: '0.2rem 0.55rem',
            borderRadius: '2px',
            fontSize: '0.68rem',
            fontFamily: 'var(--font-mono)',
            color: '#f59e0b',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            zIndex: 3
          }}>
            <span>{isVertical ? '● 9:16 VERTICAL REEL' : '● 35MM KODAK 500T'}</span>
          </div>

          {/* Aspect & Duration (Top Right) */}
          <div style={{
            position: 'absolute',
            top: '0.65rem',
            right: '0.75rem',
            display: 'flex',
            gap: '0.35rem',
            zIndex: 3
          }}>
            <span style={{
              background: 'rgba(10, 10, 10, 0.75)',
              backdropFilter: 'blur(6px)',
              padding: '0.2rem 0.55rem',
              borderRadius: '2px',
              fontSize: '0.68rem',
              fontFamily: 'var(--font-mono)',
              color: '#ffffff',
              letterSpacing: '0.04em'
            }}>
              {proj.aspectRatio}
            </span>
            <span style={{
              background: 'rgba(10, 10, 10, 0.75)',
              backdropFilter: 'blur(6px)',
              padding: '0.2rem 0.55rem',
              borderRadius: '2px',
              fontSize: '0.68rem',
              fontFamily: 'var(--font-mono)',
              color: '#ffffff',
              letterSpacing: '0.04em'
            }}>
              {proj.duration}
            </span>
          </div>

          {/* Center Warm Glowing Amber Play Badge */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}>
            <div style={{
              width: '3.6rem',
              height: '3.6rem',
              borderRadius: '50%',
              background: 'rgba(245, 158, 11, 0.92)',
              color: '#0b0a09',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isHovered
                ? '0 0 30px rgba(245, 158, 11, 0.8), 0 4px 16px rgba(0,0,0,0.4)'
                : '0 4px 16px rgba(0,0,0,0.4)',
              transform: isHovered ? 'scale(1.12)' : 'scale(1)',
              transition: 'all 0.25s ease'
            }}>
              <Play size={18} fill="currentColor" style={{ marginLeft: '3px' }} />
            </div>
          </div>
        </div>

        {/* Thick Polaroid Bottom Chin (Handwritten Ink Style) */}
        <div style={{ padding: '0 0.25rem' }}>
          {/* Handwritten-Style Header Stamp */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.4rem',
            borderBottom: '1px dashed #ded4c5',
            paddingBottom: '0.35rem'
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.06em',
              color: '#787166',
              textTransform: 'uppercase'
            }}>
              EXP #{index + 1} // {proj.client}
            </div>

            <div style={{
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              color: '#d97706',
              fontWeight: 600
            }}>
              {proj.year}
            </div>
          </div>

          {/* Dark Ink Title */}
          <h3
            onClick={() => onSelectProject(proj)}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.75rem',
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              color: '#1c1917',
              marginBottom: '0.3rem',
              cursor: 'pointer'
            }}
          >
            {proj.title}
          </h3>

          {/* Role Metadata */}
          <div style={{
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
            color: '#57534e',
            letterSpacing: '0.02em',
            marginBottom: '0.65rem'
          }}>
            DIR: {proj.role}
          </div>

          {/* Narrative synopsis in warm ink */}
          <p style={{
            color: '#44403c',
            fontSize: '0.88rem',
            lineHeight: 1.5,
            marginBottom: '1rem',
            fontWeight: 400
          }}>
            {proj.description}
          </p>

          {/* Award Laurel Stamp if exists */}
          {proj.awards && (
            <div style={{
              background: '#f3ece0',
              border: '1px solid #e2d7c5',
              borderRadius: '3px',
              padding: '0.45rem 0.75rem',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: '#92400e',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}>
              <Award size={14} style={{ flexShrink: 0, color: '#d97706' }} />
              <span>{proj.awards}</span>
            </div>
          )}

          {/* Action: Wax Seal / Stamp Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.65rem',
            borderTop: '1px solid #eae2d3'
          }}>
            <button
              onClick={() => onSelectProject(proj)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1.15rem',
                borderRadius: '9999px',
                background: '#1c1917',
                color: '#fafaf9',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#d97706';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#1c1917';
                e.currentTarget.style.color = '#fafaf9';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Play size={13} fill="currentColor" />
              <span>Watch Cut & Grade</span>
            </button>

            <span style={{
              fontSize: '0.74rem',
              fontFamily: 'var(--font-mono)',
              color: '#a8a29e'
            }}>
              [ 4K DCI ]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 2. 35mm Celluloid Negative Film Strip Component */
function CelluloidFilmStrip({ projects, onSelectProject }) {
  return (
    <div style={{
      background: '#060504',
      border: '1px solid #2e2820',
      borderRadius: '12px',
      padding: 'clamp(1.5rem, 3.5vw, 2.5rem) clamp(1rem, 2.5vw, 1.5rem)',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.9)'
    }}>
      {/* Top 35mm Sprocket Perforations */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 0.25rem 1.25rem',
        borderBottom: '1px dashed #3a3227',
        marginBottom: '2rem',
        overflow: 'hidden',
        flexWrap: 'nowrap',
        gap: '6px'
      }}>
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: '14px',
              height: '18px',
              borderRadius: '2px',
              background: '#13110d',
              border: '1px solid #2e2820',
              flexShrink: 0
            }}
          />
        ))}
      </div>

      {/* Film Strip Frames */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: '1.5rem'
      }}>
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            onClick={() => onSelectProject(proj)}
            style={{
              background: '#0d0c0a',
              border: '1px solid #332d24',
              borderRadius: '6px',
              padding: '1rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#f59e0b';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(245, 158, 11, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#332d24';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Celluloid Frame Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: '#d97706',
              letterSpacing: '0.08em',
              marginBottom: '0.6rem'
            }}>
              <span>KODAK 5219 // 500T</span>
              <span>▲ {idx + 12}A</span>
            </div>

            <div style={{
              position: 'relative',
              aspectRatio: isVerticalAspectRatio(proj.aspectRatio) ? '9 / 16' : (proj.aspectRatio ? getCssAspectRatio(proj.aspectRatio) : '16 / 9'),
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '0.85rem'
            }}>
              <img
                src={proj.posterImage}
                alt={proj.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  background: '#f59e0b',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Play size={14} fill="currentColor" />
                </div>
              </div>
            </div>

            <h4 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              color: '#f5efe6',
              marginBottom: '0.2rem'
            }}>
              {proj.title}
            </h4>

            <div style={{
              fontSize: '0.74rem',
              fontFamily: 'var(--font-mono)',
              color: '#a89f91'
            }}>
              {proj.category} • {proj.duration}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom 35mm Sprocket Perforations */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1.25rem 0.25rem 0',
        borderTop: '1px dashed #3a3227',
        marginTop: '2rem',
        overflow: 'hidden',
        flexWrap: 'nowrap',
        gap: '6px'
      }}>
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: '14px',
              height: '18px',
              borderRadius: '2px',
              background: '#13110d',
              border: '1px solid #2e2820',
              flexShrink: 0
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* 3. Director's Clapperboard Showreel Feature */
function DirectorClapperboard({ showreel, onOpenShowreel }) {
  return (
    <div
      onClick={onOpenShowreel}
      style={{
        background: 'linear-gradient(135deg, #181512 0%, #0d0c0a 100%)',
        border: '1px solid #383126',
        borderRadius: '16px',
        padding: 'clamp(1.5rem, 3.5vw, 2.5rem) clamp(1.2rem, 3vw, 2rem)',
        marginBottom: '4rem',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(245, 158, 11, 0.2)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#f59e0b';
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 24px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(245, 158, 11, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#383126';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(245, 158, 11, 0.2)';
      }}
    >
      {/* Clapperboard Striped Wooden Top Stick */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '18px',
        background: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 24px, #1a1714 24px, #1a1714 48px)',
        borderBottom: '2px solid #000000',
        boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
      }} />

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
        paddingTop: '0.75rem'
      }}>
        {/* Left: Chalkboard Slate Info */}
        <div style={{ maxWidth: '640px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.3rem 0.8rem',
            borderRadius: '9999px',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: '#f59e0b',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.08em',
            marginBottom: '1rem'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#ef4444',
              boxShadow: '0 0 8px #ef4444',
              animation: 'pulse 1.5s infinite'
            }} />
            <span>REC ● 24.00 FPS // 4K ANAMORPHIC</span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#faf8f5',
            marginBottom: '0.75rem'
          }}>
            {showreel.title}
          </h3>

          <p style={{
            color: '#bbb4a8',
            fontSize: '1rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
            fontWeight: 400
          }}>
            {showreel.description}
          </p>

          {/* Chalk Slate Production Table */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 100px), 1fr))',
            gap: '0.75rem',
            background: '#090807',
            border: '1px solid #2b251d',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem'
          }}>
            <div>
              <div style={{ color: '#787166' }}>ROLL</div>
              <div style={{ color: '#faf8f5', fontWeight: 600 }}>A01</div>
            </div>
            <div>
              <div style={{ color: '#787166' }}>SCENE</div>
              <div style={{ color: '#faf8f5', fontWeight: 600 }}>01 // JIBHI</div>
            </div>
            <div>
              <div style={{ color: '#787166' }}>TAKE</div>
              <div style={{ color: '#faf8f5', fontWeight: 600 }}>01</div>
            </div>
            <div>
              <div style={{ color: '#787166' }}>DIRECTOR</div>
              <div style={{ color: '#f59e0b', fontWeight: 600 }}>HAOKIP</div>
            </div>
          </div>
        </div>

        {/* Right: Master Play Trigger */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '5.2rem',
            height: '5.2rem',
            borderRadius: '50%',
            background: '#f59e0b',
            color: '#0b0a09',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 30px rgba(245, 158, 11, 0.4), inset 0 2px 2px rgba(255, 255, 255, 0.4)',
            transition: 'transform 0.25s ease'
          }}>
            <Play size={26} fill="currentColor" style={{ marginLeft: '4px' }} />
          </div>

          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            letterSpacing: '0.06em',
            color: '#f59e0b'
          }}>
            WATCH SHOWREEL [02:30]
          </span>
        </div>
      </div>
    </div>
  );
}

/* 4. Master FilmShowcase Component */
export default function FilmShowcase({ projects, gear, showreel, onSelectProject, onOpenShowreel }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('polaroid'); // 'polaroid' | 'strip'

  const categories = ['All', 'Cinematic Narrative', 'Commercial / Brand', 'Documentary / Nature', 'Music Video'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" style={{ padding: '4rem 0 5rem', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              color: '#f59e0b',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}>
              <Film size={14} />
              <span>// ANALOG ARCHIVE • POLAROID & 35MM CELLULOID</span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.6rem, 5.2vw, 3.8rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#faf8f5',
              marginBottom: '0.85rem'
            }}>
              Cinematography & Visual Narratives
            </h2>

            <p style={{ color: '#bbb4a8', maxWidth: '640px', fontSize: '1.05rem', fontWeight: 400 }}>
              Tactile Polaroid studio prints and 35mm film cuts. Hover over any frame for a silent live preview, or click to inspect full DaVinci color grades and lens specs.
            </p>
          </div>

          {/* View Mode Switcher: [ Polaroid Pinboard ] vs [ 35mm Film Strip ] */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#181512',
            padding: '0.3rem',
            borderRadius: '9999px',
            border: '1px solid #383126'
          }}>
            <button
              onClick={() => setViewMode('polaroid')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                border: 'none',
                background: viewMode === 'polaroid' ? '#f59e0b' : 'transparent',
                color: viewMode === 'polaroid' ? '#0b0a09' : '#bbb4a8',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Layers size={13} />
              <span>Polaroids</span>
            </button>

            <button
              onClick={() => setViewMode('strip')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                border: 'none',
                background: viewMode === 'strip' ? '#f59e0b' : 'transparent',
                color: viewMode === 'strip' ? '#0b0a09' : '#bbb4a8',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Film size={13} />
              <span>35mm Reel</span>
            </button>
          </div>
        </div>

        {/* Feature Clapperboard Showreel */}
        <DirectorClapperboard showreel={showreel} onOpenShowreel={onOpenShowreel} />

        {/* Filter Badges in Warm Amber */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.6rem',
          marginBottom: '3rem'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                background: activeFilter === cat ? 'rgba(245, 158, 11, 0.18)' : '#141210',
                color: activeFilter === cat ? '#f59e0b' : '#a89f91',
                border: activeFilter === cat ? '1px solid #f59e0b' : '1px solid #2e2820',
                padding: '0.45rem 1.1rem',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.02em',
                fontWeight: 400,
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Film Works Showcase: Polaroid Board OR 35mm Celluloid Strip */}
        {viewMode === 'polaroid' ? (
          <div
            className="grid-2"
            style={{
              gap: '3.5rem 2.5rem',
              marginBottom: '5.5rem'
            }}
          >
            {filteredProjects.map((proj, idx) => (
              <PolaroidCard
                key={proj.id}
                proj={proj}
                index={idx}
                onSelectProject={onSelectProject}
              />
            ))}
          </div>
        ) : (
          <div style={{ marginBottom: '5.5rem' }}>
            <CelluloidFilmStrip
              projects={filteredProjects}
              onSelectProject={onSelectProject}
            />
          </div>
        )}

        {/* Director's Camera Package & Flight Case Rig */}
        <div id="skills-gear" style={{ paddingTop: '2rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              color: '#f59e0b',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem'
            }}>
              // Hardcase Optical & Sensor Rig
            </div>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.4rem',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#faf8f5'
            }}>
              Cinema Camera Flight Case & DaVinci Console
            </h3>
          </div>

          <div className="grid-2">
            {/* Hardcase 1: Cameras & Anamorphic Glass */}
            <div style={{
              background: '#13110e',
              border: '1px solid #2d261e',
              borderRadius: '14px',
              padding: '2rem',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #28221b',
                paddingBottom: '1rem',
                marginBottom: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{
                    width: '2.2rem',
                    height: '2.2rem',
                    borderRadius: '8px',
                    background: 'rgba(245, 158, 11, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f59e0b'
                  }}>
                    <Camera size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 500, color: '#faf8f5' }}>
                      Sensors & Anamorphic Glass
                    </h4>
                    <span style={{ fontSize: '0.72rem', color: '#8c8273', fontFamily: 'var(--font-mono)' }}>
                      PELICAN 1510 FOAM INSERT A
                    </span>
                  </div>
                </div>

                <span style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#f59e0b',
                  background: 'rgba(245, 158, 11, 0.1)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px'
                }}>
                  ● CALIBRATED
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[...gear.cameras, ...gear.lenses].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#0d0c0a',
                      border: '1px solid #221d17',
                      borderRadius: '8px',
                      padding: '0.65rem 0.95rem',
                      fontSize: '0.84rem',
                      color: '#ded8ce',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    <span>{item}</span>
                    <span style={{ color: '#d97706', fontSize: '0.75rem' }}>[OPTICAL]</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hardcase 2: Post Suite & Sound Rig */}
            <div style={{
              background: '#13110e',
              border: '1px solid #2d261e',
              borderRadius: '14px',
              padding: '2rem',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #28221b',
                paddingBottom: '1rem',
                marginBottom: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{
                    width: '2.2rem',
                    height: '2.2rem',
                    borderRadius: '8px',
                    background: 'rgba(245, 158, 11, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f59e0b'
                  }}>
                    <Scissors size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 500, color: '#faf8f5' }}>
                      DaVinci Studio Deck & Sound
                    </h4>
                    <span style={{ fontSize: '0.72rem', color: '#8c8273', fontFamily: 'var(--font-mono)' }}>
                      POST-PRODUCTION CONSOLE B
                    </span>
                  </div>
                </div>

                <span style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#f59e0b',
                  background: 'rgba(245, 158, 11, 0.1)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px'
                }}>
                  ● 32-BIT FLOAT
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[...gear.postSoftware, ...gear.audioSupport].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#0d0c0a',
                      border: '1px solid #221d17',
                      borderRadius: '8px',
                      padding: '0.65rem 0.95rem',
                      fontSize: '0.84rem',
                      color: '#ded8ce',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    <span>{item}</span>
                    <span style={{ color: '#d97706', fontSize: '0.75rem' }}>[STUDIO]</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

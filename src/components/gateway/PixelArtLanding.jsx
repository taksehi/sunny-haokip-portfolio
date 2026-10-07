import React, { useEffect, useRef } from 'react';
import { ArrowDown, Terminal, Clapperboard, Play } from 'lucide-react';

export default function PixelArtLanding({ onSelectMode, onScrollDown, onOpenShowreel }) {
  const canvasRef = useRef(null);

  // Canvas floating pixel pollen / firefly animation over the meadow
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Pixel particles
    const particleCount = 30;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() > 0.6 ? 4 : 3, // chunky pixel sizes
      speedX: (Math.random() - 0.3) * 0.4,
      speedY: -0.2 - Math.random() * 0.4,
      alpha: 0.2 + Math.random() * 0.6,
      color: Math.random() > 0.5 ? '#fef08a' : '#86efac' // sunny yellow & meadow green pixels
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Reset if drifted off screen
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        // Draw crisp pixel rect
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="hero-landing"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        color: '#ffffff'
      }}
    >
      {/* 1. Animated Pixel Art Video Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        backgroundColor: '#3b82f6'
      }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero/cofounder-hero-poster.webp"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center bottom',
            imageRendering: 'pixelated'
          }}
        >
          <source src="/hero/cofounder-hero.mp4" type="video/mp4" />
        </video>

        {/* Soft Vignette & Atmosphere Gradient to blend into noir footer */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.02) 50%, rgba(10,10,10,0.65) 90%, #0a0a0a 100%)',
          pointerEvents: 'none'
        }} />

        {/* Left-edge soft shadow to ensure white text readability against blue sky/clouds */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '55%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.12) 70%, transparent 100%)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* 2. Micro Floating Pixel Canvas Overlay (Animated pollen & sparks) */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Spacer to push content down naturally */}
      <div style={{ height: '3rem' }} />

      {/* 3. Center Content: Left Copy & Primary CTAs */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: '1.5rem 3rem',
        maxWidth: '1440px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{ maxWidth: '680px' }}>
          <h1 style={{
            fontSize: 'clamp(2.6rem, 5.5vw, 4.6rem)',
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            marginBottom: '1.35rem',
            color: '#ffffff',
            textShadow: '0 3px 20px rgba(0, 0, 0, 0.5)'
          }}>
            Operating at the convergence of code & cinema
          </h1>

          <p style={{
            fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.92)',
            lineHeight: 1.55,
            marginBottom: '2.5rem',
            fontWeight: 400,
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.5)'
          }}>
            Architecting high-throughput full-stack systems and directing atmospheric visual narratives. Hand off software or cinema to bespoke creative workflows.
          </p>

          {/* Primary Action Buttons (Exact CoFounder pill layout) */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {/* White solid button like CoFounder "Run a company" */}
            <button
              onClick={() => onSelectMode('dev')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.9rem 1.85rem',
                borderRadius: '9999px',
                background: '#ffffff',
                color: '#0a0a0a',
                fontSize: '0.94rem',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.35)';
              }}
            >
              <Terminal size={16} />
              <span>Run Developer</span>
            </button>

            {/* Translucent pill button like CoFounder "Check out the launch" */}
            <button
              onClick={() => onSelectMode('film')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.9rem 1.85rem',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                color: '#ffffff',
                fontSize: '0.94rem',
                fontWeight: 500,
                border: '1px solid rgba(255, 255, 255, 0.35)',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.32)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Clapperboard size={16} />
              <span>Explore Cinema</span>
            </button>

            {/* Reel Quick Preview */}
            <button
              onClick={onOpenShowreel}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.9rem 1.4rem',
                borderRadius: '9999px',
                background: 'transparent',
                color: 'rgba(255, 255, 255, 0.92)',
                fontSize: '0.88rem',
                fontFamily: 'var(--font-mono)',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.92)'}
            >
              <Play size={14} fill="currentColor" />
              <span>Watch Reel</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Scroll Prompt pointing to Screen 2 */}
      <div
        onClick={onScrollDown}
        style={{
          position: 'relative',
          zIndex: 2,
          paddingBottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          color: 'rgba(255, 255, 255, 0.8)',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
      >
        <span style={{
          fontSize: '0.74rem',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase'
        }}>
          Scroll to Select Discipline
        </span>
        <ArrowDown
          size={16}
          style={{
            animation: 'bounce 2s infinite'
          }}
        />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-6px);
          }
          60% {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </section>
  );
}

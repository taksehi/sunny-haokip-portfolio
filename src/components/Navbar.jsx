import React, { useState, useEffect } from 'react';
import { Terminal, Clapperboard, Send, Compass } from 'lucide-react';

export default function Navbar({ activeMode, onToggleMode, personal }) {
  const isDev = activeMode === 'dev';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal navbar only once user scrolls past the landing page
      const threshold = window.innerHeight * 0.35;
      setIsVisible(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      background: isDev ? 'rgba(16, 16, 16, 0.88)' : 'rgba(11, 10, 9, 0.88)',
      borderBottom: '1px solid var(--border-hairline)',
      transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      opacity: isVisible ? 1 : 0,
      pointerEvents: isVisible ? 'auto' : 'none',
      transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, background var(--transition-smooth)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '4.25rem'
      }}>
        {/* Brand / Logo */}
        <a href="#hero-landing" style={{
          textDecoration: 'none',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '2.2rem',
            height: '2.2rem',
            borderRadius: isDev ? '6px' : '8px',
            border: '1px solid var(--border-hairline)',
            background: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isDev ? 'var(--accent-compass)' : 'var(--action-primary)'
          }}>
            {isDev ? <Compass size={16} /> : <Clapperboard size={16} />}
          </div>
          <div>
            <div style={{
              fontWeight: 400,
              fontSize: '1.05rem',
              letterSpacing: '-0.015em',
              lineHeight: 1.1
            }}>
              {personal.name}
            </div>
            <div style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: 'var(--tracking-code)',
              textTransform: 'uppercase'
            }}>
              {isDev ? 'SYS.ENG // OBSIDIAN' : 'CINEMA // ANALOG ARCHIVE'}
            </div>
          </div>
        </a>

        {/* Center Mode Switcher (Refero Ghost Pills) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-surface)',
          padding: '0.25rem',
          borderRadius: '9999px',
          border: '1px solid var(--border-hairline)'
        }}>
          <button
            onClick={() => onToggleMode('dev')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              border: isDev ? '1px solid var(--border-focus)' : '1px solid transparent',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 400,
              background: isDev ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              color: isDev ? 'var(--text-primary)' : 'var(--text-muted)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Terminal size={13} style={{ color: isDev ? 'var(--accent-compass)' : 'inherit' }} />
            <span>Developer</span>
          </button>

          <button
            onClick={() => onToggleMode('film')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              border: !isDev ? '1px solid var(--action-primary)' : '1px solid transparent',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 400,
              background: !isDev ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
              color: !isDev ? 'var(--action-primary)' : 'var(--text-muted)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Clapperboard size={13} style={{ color: !isDev ? 'var(--action-primary)' : 'inherit' }} />
            <span>Filmmaker</span>
          </button>
        </div>

        {/* Right Nav Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <a
            href="#showcase-area"
            style={{
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 400,
              transition: 'color var(--transition-fast)'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            Works
          </a>

          <a
            href="#skills-gear"
            style={{
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 400,
              transition: 'color var(--transition-fast)'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            {isDev ? 'Stack' : 'Gear Rig'}
          </a>

          <a
            href="#about"
            style={{
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 400,
              transition: 'color var(--transition-fast)'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            About
          </a>

          <a
            href="#contact"
            className="btn btn-primary"
            style={{
              padding: '0.45rem 1rem',
              fontSize: '0.82rem',
              background: isDev ? 'var(--text-primary)' : 'var(--action-primary)',
              color: isDev ? 'var(--bg-canvas)' : 'var(--action-text)'
            }}
          >
            <Send size={13} />
            <span>Contact</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

import React, { useState, useEffect } from 'react';
import { Terminal, Clapperboard, Send, Compass, Menu, X, Volume2, VolumeX } from 'lucide-react';
import soundFX from '../utils/soundEffects';

export default function Navbar({ activeMode, onToggleMode, personal }) {
  const isDev = activeMode === 'dev';
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sfxActive, setSfxActive] = useState(false);

  useEffect(() => {
    setSfxActive(soundFX.isEnabled());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal navbar once user scrolls past 35% of first screen
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
      zIndex: 100,
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      background: isDev ? 'rgba(16, 16, 16, 0.92)' : 'rgba(11, 10, 9, 0.92)',
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
        height: '4.25rem',
        gap: '0.75rem'
      }}>
        {/* Brand / Logo */}
        <a href="#hero-landing" style={{
          textDecoration: 'none',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          flexShrink: 0
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
              fontWeight: 500,
              fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
              letterSpacing: '-0.015em',
              lineHeight: 1.1
            }}>
              {personal.name}
            </div>
            <div className="desktop-only" style={{
              fontSize: '0.68rem',
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
          padding: '0.2rem',
          borderRadius: '9999px',
          border: '1px solid var(--border-hairline)',
          flexShrink: 0
        }}>
          <button
            onClick={() => onToggleMode('dev')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.35rem clamp(0.55rem, 1.5vw, 0.9rem)',
              borderRadius: '9999px',
              border: isDev ? '1px solid var(--border-focus)' : '1px solid transparent',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 400,
              background: isDev ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              color: isDev ? 'var(--text-primary)' : 'var(--text-muted)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Terminal size={13} style={{ color: isDev ? 'var(--accent-compass)' : 'inherit' }} />
            <span className="mode-label-full">Developer</span>
            <span className="mode-label-short">Dev</span>
          </button>

          <button
            onClick={() => onToggleMode('film')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.35rem clamp(0.55rem, 1.5vw, 0.9rem)',
              borderRadius: '9999px',
              border: !isDev ? '1px solid var(--action-primary)' : '1px solid transparent',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 400,
              background: !isDev ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
              color: !isDev ? 'var(--action-primary)' : 'var(--text-muted)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Clapperboard size={13} style={{ color: !isDev ? 'var(--action-primary)' : 'inherit' }} />
            <span className="mode-label-full">Filmmaker</span>
            <span className="mode-label-short">Film</span>
          </button>
        </div>

        {/* Right Desktop Nav Links */}
        <nav className="nav-desktop-links" style={{
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

          {/* Tactile Audio SFX Toggle */}
          <button
            type="button"
            onClick={() => setSfxActive(soundFX.toggle())}
            title={sfxActive ? 'Mute Tactile Audio FX' : 'Enable Tactile Audio FX (Mechanical Clicks & Shutter)'}
            style={{
              background: sfxActive ? (isDev ? 'rgba(0, 230, 153, 0.1)' : 'rgba(245, 158, 11, 0.15)') : 'transparent',
              border: `1px solid ${sfxActive ? (isDev ? 'var(--accent-compass)' : 'var(--action-primary)') : 'var(--border-hairline)'}`,
              borderRadius: '50%',
              width: '2.1rem',
              height: '2.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: sfxActive ? (isDev ? 'var(--accent-compass)' : 'var(--action-primary)') : 'var(--text-faint)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            {sfxActive ? <Volume2 size={13} /> : <VolumeX size={13} />}
          </button>

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

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="mobile-hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-hairline)',
            color: 'var(--text-primary)',
            padding: '0.45rem',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: isDev ? '#101010' : '#0b0a09',
            borderBottom: '1px solid var(--border-hairline)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <a
            href="#showcase-area"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '1rem',
              padding: '0.5rem 0',
              borderBottom: '1px solid var(--border-hairline)'
            }}
          >
            Works ({isDev ? 'Engineering' : 'Cinema'})
          </a>

          <a
            href="#skills-gear"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '1rem',
              padding: '0.5rem 0',
              borderBottom: '1px solid var(--border-hairline)'
            }}
          >
            {isDev ? 'Technical Stack' : 'Optical Gear & Rig'}
          </a>

          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '1rem',
              padding: '0.5rem 0',
              borderBottom: '1px solid var(--border-hairline)'
            }}
          >
            About & Bio
          </a>

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.75rem',
              marginTop: '0.5rem',
              background: isDev ? 'var(--text-primary)' : 'var(--action-primary)',
              color: isDev ? 'var(--bg-canvas)' : 'var(--action-text)'
            }}
          >
            <Send size={15} />
            <span>Direct Transmission</span>
          </a>
        </div>
      )}

      <style>{`
        .nav-desktop-links {
          display: flex;
        }
        .mode-label-short {
          display: none;
        }
        @media (max-width: 860px) {
          .nav-desktop-links {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: flex !important;
          }
        }
        @media (max-width: 520px) {
          .desktop-only {
            display: none !important;
          }
          .mode-label-full {
            display: none !important;
          }
          .mode-label-short {
            display: inline !important;
          }
        }
      `}</style>
    </header>
  );
}

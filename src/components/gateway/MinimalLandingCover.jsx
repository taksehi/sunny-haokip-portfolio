import React, { useState, useEffect } from 'react';
import { ArrowDown, Clock, Sparkles } from 'lucide-react';

export default function MinimalLandingCover({ personal, onScrollToSelector }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="landing-cover" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '4rem 1.5rem 3rem',
      position: 'relative',
      zIndex: 1
    }}>
      {/* Top Essential Header Bar */}
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          letterSpacing: 'var(--tracking-code)'
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#10b981'
          }} />
          <span>{personal.name.toUpperCase()} // CREATIVE TECHNOLOGIST</span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-faint)',
          letterSpacing: 'var(--tracking-code)'
        }}>
          <Clock size={13} />
          <span>SF // {timeStr || '12:00:00'} PST</span>
        </div>
      </div>

      {/* Center Minimal Hook */}
      <div className="container" style={{
        textAlign: 'center',
        maxWidth: '820px',
        margin: 'auto'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.25rem 0.75rem',
          borderRadius: '9999px',
          border: '1px solid var(--border-hairline)',
          background: 'var(--bg-surface)',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          letterSpacing: 'var(--tracking-code)',
          marginBottom: '1.75rem'
        }}>
          <Sparkles size={13} />
          <span>PORTFOLIO ARCHIVE</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.8rem, 6.5vw, 4.8rem)',
          fontWeight: 400,
          lineHeight: 1.05,
          letterSpacing: '-0.022em',
          marginBottom: '1.5rem',
          color: 'var(--text-primary)'
        }}>
          Engineering Systems & Directing Visual Stories.
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          maxWidth: '600px',
          margin: '0 auto 2.5rem',
          fontWeight: 400
        }}>
          Standing at the intersection of logical software architecture and cinematic storytelling.
        </p>

        {/* Action Button to Scroll Down to Choice */}
        <button
          onClick={onScrollToSelector}
          className="btn btn-outline"
          style={{
            padding: '0.75rem 1.75rem',
            borderRadius: '9999px',
            fontSize: '0.88rem'
          }}
        >
          <span>Choose Path</span>
          <ArrowDown size={15} />
        </button>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="container" style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer'
      }} onClick={onScrollToSelector}>
        <span style={{
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-faint)',
          letterSpacing: 'var(--tracking-code)',
          textTransform: 'uppercase'
        }}>
          Scroll down to select discipline
        </span>
        <ArrowDown size={14} style={{ color: 'var(--text-faint)', animation: 'bounce 2s infinite' }} />
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { ArrowUp, Database } from 'lucide-react';
import NeonConnectModal from './NeonConnectModal';

export default function Footer({ personal, activeMode }) {
  const [isNeonModalOpen, setIsNeonModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      padding: '2.5rem 0',
      background: 'rgba(5, 6, 9, 0.85)',
      marginTop: '2rem'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        <div>
          <div style={{
            fontWeight: 800,
            fontSize: '1rem',
            marginBottom: '0.25rem'
          }}>
            {personal.name}
          </div>
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--text-faint)',
            fontFamily: 'var(--font-mono)'
          }}>
            © {new Date().getFullYear()} • Code & Cinema. All rights reserved.
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <button
            onClick={() => setIsNeonModalOpen(true)}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              padding: '0.5rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-main)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Database size={13} color="#00e699" />
            <span>Neon DB</span>
          </button>

          <button
            onClick={scrollToTop}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              padding: '0.5rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.82rem',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-main)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      <NeonConnectModal
        isOpen={isNeonModalOpen}
        onClose={() => setIsNeonModalOpen(false)}
      />
    </footer>
  );
}

import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, XCircle, Loader2, Sparkles, X, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function NeonConnectModal({ isOpen, onClose, onConnected }) {
  const [connString, setConnString] = useState('');
  const [status, setStatus] = useState({ connected: false, loading: true });
  const [submitting, setSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      checkStatus();
    }
  }, [isOpen]);

  const checkStatus = async () => {
    try {
      setStatus(prev => ({ ...prev, loading: true }));
      const res = await fetch('/api/status');
      const data = await res.json();
      setStatus({ ...data, loading: false });
    } catch (e) {
      setStatus({ connected: false, loading: false, error: e.message });
    }
  };

  const handleConnect = async (e) => {
    e.preventDefault();
    if (!connString.trim()) {
      setError('Please provide a valid Neon PostgreSQL connection string.');
      return;
    }

    setSubmitting(true);
    setError(null);
    setResultMessage(null);

    try {
      const res = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connectionString: connString.trim() })
      });

      const data = await res.json();

      if (data.ok) {
        setResultMessage(data.message);
        setStatus({
          connected: true,
          database: data.database,
          latencyMs: data.latencyMs,
          status: `Connected (${data.latencyMs}ms latency)`
        });
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        if (onConnected) onConnected();
      } else {
        setError(data.error || 'Failed to connect to Neon database.');
      }
    } catch (err) {
      setError(err.message || 'Network error attempting to reach Neon endpoint.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      background: 'rgba(3, 4, 7, 0.82)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        background: 'linear-gradient(180deg, #0d1117 0%, #06090f 100%)',
        border: '1px solid rgba(0, 230, 153, 0.25)',
        boxShadow: '0 25px 60px -15px rgba(0, 230, 153, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        maxWidth: '560px',
        width: '100%',
        padding: '2rem',
        position: 'relative',
        color: '#f0f6fc'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8b949e',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = '#8b949e'}
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(0, 230, 153, 0.2), rgba(0, 194, 255, 0.2))',
            border: '1px solid rgba(0, 230, 153, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00e699'
          }}>
            <Database size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, letterSpacing: '-0.01em' }}>
              Neon Serverless Postgres
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#8b949e', fontFamily: 'monospace' }}>
              cloud database bridge
            </span>
          </div>
        </div>

        {/* Current Status Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1rem',
          borderRadius: '10px',
          background: status.connected ? 'rgba(0, 230, 153, 0.08)' : 'rgba(255, 255, 255, 0.03)',
          border: `1px solid ${status.connected ? 'rgba(0, 230, 153, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
          marginBottom: '1.5rem',
          fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: status.connected ? '#00e699' : '#f59e0b',
              boxShadow: status.connected ? '0 0 8px #00e699' : 'none'
            }} />
            <span style={{ fontWeight: 500 }}>
              {status.connected ? 'Connected to Neon Live' : 'Offline / Local Fallback Active'}
            </span>
          </div>
          {status.latencyMs && (
            <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#00e699' }}>
              {status.latencyMs}ms
            </span>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleConnect}>
          <label style={{
            display: 'block',
            fontSize: '0.82rem',
            fontFamily: 'monospace',
            color: '#8b949e',
            marginBottom: '0.5rem',
            letterSpacing: '0.04em'
          }}>
            NEON CONNECTION STRING (DATABASE_URL):
          </label>

          <input
            type="password"
            placeholder="postgresql://user:pass@ep-name.region.aws.neon.tech/neondb?sslmode=require"
            value={connString}
            onChange={e => setConnString(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem 1rem',
              borderRadius: '8px',
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fff',
              fontSize: '0.85rem',
              fontFamily: 'monospace',
              outline: 'none',
              marginBottom: '1rem',
              transition: 'border-color 0.2s'
            }}
            onFocus={e => e.target.style.borderColor = '#00e699'}
            onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)'}
          />

          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.7rem 0.9rem',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontSize: '0.8rem',
              marginBottom: '1rem'
            }}>
              <XCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          {resultMessage && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.7rem 0.9rem',
              borderRadius: '8px',
              background: 'rgba(0, 230, 153, 0.12)',
              border: '1px solid rgba(0, 230, 153, 0.3)',
              color: '#00e699',
              fontSize: '0.8rem',
              marginBottom: '1rem'
            }}>
              <CheckCircle2 size={15} />
              <span>{resultMessage}</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginTop: '1.25rem' }}>
            <a
              href="https://console.neon.tech"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                color: '#8b949e',
                textDecoration: 'none'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = '#8b949e'}
            >
              <span>Open Neon Console</span>
              <ExternalLink size={12} />
            </a>

            <button
              type="submit"
              disabled={submitting}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.4rem',
                borderRadius: '8px',
                background: '#00e699',
                color: '#04130c',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.7 : 1,
                boxShadow: '0 4px 15px rgba(0, 230, 153, 0.3)',
                transition: 'all 0.15s ease'
              }}
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="spin" />
                  <span>Migrating & Seeding...</span>
                </>
              ) : (
                <>
                  <Zap size={16} />
                  <span>Connect & Seed Database</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.76rem',
          color: '#6e7681',
          lineHeight: 1.5
        }}>
          💡 <strong>What this does:</strong> Connects to your Neon Postgres cluster, verifies connectivity, creates the schema tables (<code>projects</code>, <code>contact_inquiries</code>, <code>site_profile</code>), and imports Sunny's full developer & film portfolio data directly into your database.
        </div>
      </div>
    </div>
  );
}

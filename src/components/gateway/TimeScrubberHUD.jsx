import React, { useState } from 'react';
import { Sun, Moon, Sunrise, Sunset, RotateCcw, Clock } from 'lucide-react';

/**
 * TimeScrubberHUD
 * 
 * Interactive Easter Egg pill widget allowing visitors to preview the scene
 * across 24 hours of dynamic continuous sunlight & nocturnal moods.
 */
export default function TimeScrubberHUD({
  activeTime,
  timeFormatted,
  phaseName,
  isOverridden,
  setManualTime,
  setPreset,
  resetToRealTime,
  PRESETS
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Convert decimal time (0 to 24) to range input
  const handleSliderChange = (e) => {
    const val = parseFloat(e.target.value);
    setManualTime(val);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '1.25rem',
        right: '1.25rem',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.4rem',
        fontFamily: 'var(--font-mono)'
      }}
    >
      {/* Primary Pill Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          background: 'rgba(10, 12, 16, 0.78)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: isOverridden ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '9999px',
          padding: '0.35rem 0.75rem',
          fontSize: '0.74rem',
          color: '#f3f4f6',
          boxShadow: isOverridden
            ? '0 0 14px rgba(56, 189, 248, 0.25), 0 4px 12px rgba(0,0,0,0.5)'
            : '0 4px 12px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: 'pointer',
          userSelect: 'none'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        title="Click to adjust time of day Easter Egg"
      >
        <span style={{ fontSize: '0.9rem' }}>
          {activeTime >= 5 && activeTime < 9 ? '🌅' : activeTime >= 9 && activeTime < 17 ? '☀️' : activeTime >= 17 && activeTime < 20 ? '🌇' : '🌙'}
        </span>
        <span style={{ fontWeight: 500, letterSpacing: '0.02em' }}>
          {timeFormatted}
        </span>
        <span style={{
          color: isOverridden ? '#38bdf8' : 'rgba(255, 255, 255, 0.45)',
          fontSize: '0.66rem',
          textTransform: 'uppercase',
          letterSpacing: '0.06em'
        }}>
          {isOverridden ? '• MANUAL' : '• LOCAL'}
        </span>
      </div>

      {/* Expanded Control Drawer */}
      {isExpanded && (
        <div
          style={{
            background: 'rgba(10, 14, 22, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '12px',
            padding: '0.85rem 1rem',
            width: '260px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.7rem',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.05)',
            animation: 'fadeIn 0.15s ease-out'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header row with current mood */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.72rem',
            color: '#94a3b8'
          }}>
            <span style={{ color: '#38bdf8', fontWeight: 600 }}>{phaseName}</span>
            {isOverridden && (
              <button
                onClick={resetToRealTime}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.68rem',
                  cursor: 'pointer',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#38bdf8'}
                onMouseLeave={e => e.currentTarget.style.color = '#e2e8f0'}
                title="Reset to your computer's real local time"
              >
                <RotateCcw size={11} />
                <span>Sync Real</span>
              </button>
            )}
          </div>

          {/* Continuous Sun Scrubber Slider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <input
              type="range"
              min="0"
              max="24"
              step="0.1"
              value={activeTime}
              onChange={handleSliderChange}
              style={{
                width: '100%',
                height: '5px',
                accentColor: '#38bdf8',
                cursor: 'pointer',
                borderRadius: '3px',
                background: 'linear-gradient(90deg, #1e1b4b 0%, #f97316 25%, #38bdf8 50%, #f97316 75%, #0f172a 100%)'
              }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.62rem',
              color: 'rgba(255, 255, 255, 0.4)'
            }}>
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>24:00</span>
            </div>
          </div>

          {/* Quick Presets */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.35rem',
            paddingTop: '0.2rem'
          }}>
            {PRESETS.map(preset => {
              const isActive = Math.abs(activeTime - preset.time) < 1.0;
              return (
                <button
                  key={preset.id}
                  onClick={() => setPreset(preset.time)}
                  style={{
                    background: isActive ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: isActive ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '6px',
                    padding: '0.3rem 0',
                    color: isActive ? '#ffffff' : '#94a3b8',
                    fontSize: '0.65rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.15rem',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <span style={{ fontSize: '0.8rem' }}>{preset.icon}</span>
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

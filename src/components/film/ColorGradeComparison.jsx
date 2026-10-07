import React, { useState, useRef, useCallback } from 'react';
import { Sliders, Eye, Sparkles, Check } from 'lucide-react';

export default function ColorGradeComparison() {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const [selectedScene, setSelectedScene] = useState(0);
  const containerRef = useRef(null);

  const scenes = [
    {
      title: "Welcome to Jibhi // Forest Canopy & Golden Light",
      camera: "Sony FX3 // S-Log3 / S-Gamut3.Cine",
      grade: "DaVinci Resolve Studio • Kodak 2383 Print Film Emulation",
      image: "https://drive.google.com/thumbnail?id=1h4_xclJ6z1_VdnflUMeHliRhlXoGSatM&sz=w1600"
    },
    {
      title: "Commercial Campaign // High-Key Macro Grade",
      camera: "Cinema Rig 4K 10-Bit // Log Profile",
      grade: "DaVinci Color Managed • Custom Warm Skin-Tone Curves",
      image: "https://drive.google.com/thumbnail?id=1mzYt65QRAsfpomDwALnvpEOWOzRhbQtm&sz=w1600"
    }
  ];

  const currentScene = scenes[selectedScene];

  const handlePointerMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clampedPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(clampedPercent);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    handlePointerMove(e);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div style={{
      background: '#0d0c0a',
      border: '1px solid #2e2820',
      borderRadius: '16px',
      padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
      marginBottom: '4rem',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '1.75rem',
        borderBottom: '1px solid #252019',
        paddingBottom: '1.25rem'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: '#f59e0b',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '0.4rem'
          }}>
            <Sliders size={14} />
            <span>// DAVINCI RESOLVE STUDIO COLOR SUITE</span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            fontWeight: 400,
            color: '#faf8f5',
            letterSpacing: '-0.02em',
            margin: 0
          }}>
            Interactive Color Grade Wipe & LUT Studio
          </h3>
        </div>

        {/* Scene Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: '#161411',
          padding: '0.3rem',
          borderRadius: '9999px',
          border: '1px solid #332d24'
        }}>
          {scenes.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedScene(idx)}
              style={{
                background: selectedScene === idx ? '#f59e0b' : 'transparent',
                color: selectedScene === idx ? '#0a0a0a' : '#a8a29e',
                border: 'none',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Scene {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Wipe Canvas Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={isDragging ? handlePointerMove : undefined}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          maxHeight: '520px',
          borderRadius: '10px',
          overflow: 'hidden',
          cursor: 'ew-resize',
          userSelect: 'none',
          touchAction: 'none',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)',
          border: '1px solid #383126'
        }}
      >
        {/* Layer 1: Final Graded Image (Right Side) */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src={currentScene.image}
            alt="Final Graded"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'contrast(1.1) saturate(1.15) brightness(0.98)'
            }}
          />
        </div>

        {/* Layer 2: Flat RAW Log Profile (Left Side, clipped by slider position) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
        }}>
          <img
            src={currentScene.image}
            alt="Flat RAW S-Log"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'saturate(0.3) contrast(0.68) brightness(1.22)' // Exact flat S-Log3 look
            }}
          />
        </div>

        {/* Vertical Divider Line with Glow */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${sliderPos}%`,
          width: '2px',
          background: '#ffffff',
          boxShadow: '0 0 12px rgba(245, 158, 11, 0.8), 0 0 2px #fff',
          transform: 'translateX(-50%)',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          {/* Tactile Handle Puck */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#f59e0b',
            color: '#0a0a0a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            cursor: 'ew-resize',
            border: '2px solid #ffffff'
          }}>
            ◀▶
          </div>
        </div>

        {/* Left Stamp: Flat Log */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          background: 'rgba(10, 10, 10, 0.75)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#e5e5e5',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
          padding: '0.25rem 0.65rem',
          borderRadius: '4px',
          pointerEvents: 'none',
          zIndex: 5
        }}>
          ● RAW LOG PROFILE (UNGRADED)
        </div>

        {/* Right Stamp: Final Grade */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'rgba(245, 158, 11, 0.9)',
          color: '#0b0a09',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          padding: '0.25rem 0.65rem',
          borderRadius: '4px',
          pointerEvents: 'none',
          zIndex: 5
        }}>
          ● DAVINCI KODAK 500T GRADE
        </div>

        {/* Bottom Hint */}
        <div style={{
          position: 'absolute',
          bottom: '0.85rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          color: '#d4d4d4',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
          padding: '0.2rem 0.75rem',
          borderRadius: '9999px',
          pointerEvents: 'none',
          zIndex: 5
        }}>
          Drag or swipe handle to inspect grading fidelity
        </div>
      </div>

      {/* Optical / Grade Technical Specs Bar */}
      <div style={{
        marginTop: '1.25rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.76rem',
        color: '#8c8273'
      }}>
        <div>{currentScene.title}</div>
        <div style={{ color: '#d97706' }}>PIPELINE: {currentScene.grade}</div>
      </div>
    </div>
  );
}

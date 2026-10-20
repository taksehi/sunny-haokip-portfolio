import React, { useMemo } from 'react';

/**
 * PixelCelestialBody
 * 
 * Scaled up for pronounced visual presence and travels along a natural celestial arc:
 * - Rises on the left (x ~ 16%, y ~ 26%)
 * - Peaks in the high clear sky (x ~ 36%, y ~ 8%)
 * - Descends to the right (x ~ 62%, y ~ 24%), sliding seamlessly BEHIND the tree branches
 * 
 * Because the foreground tree canopy overlay (natural-canopy-overlay.webp) sits at zIndex: 2
 * with exact pixel-matched transparency and zero box clipping, the sun and moon pass naturally
 * behind the organic tree foliage.
 */
export default function PixelCelestialBody({ activeTime = 12, daylightFactor = 1, nightFactor = 0 }) {
  // Calculate Sun Arc
  const sunData = useMemo(() => {
    const isVisible = activeTime >= 5.2 && activeTime <= 19.4;
    if (!isVisible) return { visible: false };

    // Progress 0 (at 5.2) to 1 (at 19.4)
    const progress = (activeTime - 5.2) / 14.2;
    // x travels from 15% (morning left) across clear sky to 64% (setting into right trees)
    const x = 15 + progress * 49;
    // Parabolic arc for height: peak y=7.5% at mid (progress=0.46), y=25% at horizon edges
    const y = 7.5 + Math.pow(progress - 0.46, 2) * 4 * 17.5;

    // Golden/warm hue at dawn & sunset
    const isSunsetDawn = activeTime < 7.5 || activeTime > 16.8;
    const coreColor = isSunsetDawn ? '#ffedd5' : '#ffffff';
    const coronaColor = isSunsetDawn ? '#f97316' : '#fef08a';
    const flareColor = isSunsetDawn ? 'rgba(249, 115, 22, 0.45)' : 'rgba(254, 240, 138, 0.35)';

    return {
      visible: true,
      x,
      y,
      coreColor,
      coronaColor,
      flareColor,
      scale: isSunsetDawn ? 1.45 : 1.3,
      opacity: Math.min(1, Math.max(0, daylightFactor * 1.25))
    };
  }, [activeTime, daylightFactor]);

  // Calculate Moon Arc
  const moonData = useMemo(() => {
    const isVisible = activeTime >= 17.8 || activeTime <= 6.5;
    if (!isVisible) return { visible: false };

    // Standardize time so 17.8 is 0, 00:00 is ~6.2, 06.5 is ~12.7
    const normalizedTime = activeTime >= 17.8 ? activeTime - 17.8 : activeTime + 6.2;
    const progress = normalizedTime / 12.7;
    // Moon travels from 16% to 62% across the sky
    const x = 16 + progress * 46;
    // Parabolic arc
    const y = 8.5 + Math.pow(progress - 0.46, 2) * 4 * 16.5;

    return {
      visible: true,
      x,
      y,
      scale: 1.35,
      opacity: Math.min(1, Math.max(0, (nightFactor - 0.12) / 0.88))
    };
  }, [activeTime, nightFactor]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1, // Sits above base sky/video, but BEHIND natural tree canopy (zIndex: 2)
        overflow: 'hidden'
      }}
    >
      {/* 1. ENLARGED PIXEL SUN */}
      {sunData.visible && (
        <div
          style={{
            position: 'absolute',
            left: `${sunData.x}%`,
            top: `${sunData.y}%`,
            transform: `translate(-50%, -50%) scale(${sunData.scale})`,
            opacity: sunData.opacity,
            transition: 'left 0.4s ease, top 0.4s ease, opacity 0.6s ease'
          }}
        >
          {/* Atmospheric Sun Flare Glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '160px',
              height: '160px',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${sunData.flareColor} 0%, rgba(254, 240, 138, 0.12) 50%, transparent 75%)`,
              filter: 'blur(12px)',
              borderRadius: '50%'
            }}
          />

          {/* Stepped Pixel Corona Rays */}
          <div
            style={{
              position: 'relative',
              width: '46px',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Outer Warm Corona Diamond */}
            <div
              style={{
                position: 'absolute',
                width: '42px',
                height: '42px',
                backgroundColor: sunData.coronaColor,
                opacity: 0.9,
                boxShadow: `0 0 22px ${sunData.coronaColor}`,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
              }}
            />

            {/* Stepped Pixel Inner Corona */}
            <div
              style={{
                position: 'absolute',
                width: '34px',
                height: '34px',
                backgroundColor: sunData.coronaColor,
                boxShadow: `0 0 14px ${sunData.coronaColor}`
              }}
            />

            {/* Inner White/Ivory Solar Core */}
            <div
              style={{
                position: 'relative',
                width: '22px',
                height: '22px',
                backgroundColor: sunData.coreColor,
                boxShadow: '0 0 8px #ffffff'
              }}
            />
          </div>
        </div>
      )}

      {/* 2. ENLARGED PIXEL CRESCENT MOON */}
      {moonData.visible && (
        <div
          style={{
            position: 'absolute',
            left: `${moonData.x}%`,
            top: `${moonData.y}%`,
            transform: `translate(-50%, -50%) scale(${moonData.scale})`,
            opacity: moonData.opacity,
            transition: 'left 0.4s ease, top 0.4s ease, opacity 0.6s ease'
          }}
        >
          {/* Soft Lunar Glow Halo */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '130px',
              height: '130px',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(186, 230, 253, 0.4) 0%, rgba(56, 189, 248, 0.12) 48%, transparent 72%)',
              filter: 'blur(10px)',
              borderRadius: '50%'
            }}
          />

          {/* Stepped 8-Bit Pixel Crescent Moon */}
          <div
            style={{
              position: 'relative',
              width: '34px',
              height: '34px',
              boxShadow: '0 0 16px rgba(186, 230, 253, 0.75)'
            }}
          >
            {/* Outer Moon Silhouette */}
            <div
              style={{
                width: '34px',
                height: '34px',
                backgroundColor: '#f0f9ff',
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                position: 'relative'
              }}
            >
              {/* Dark Cutout masking to form a crisp pixel crescent */}
              <div
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-6px',
                  width: '30px',
                  height: '30px',
                  backgroundColor: '#0a101f', // blends with dark night sky
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                }}
              />

              {/* Faint Lunar Crater Accents */}
              <div
                style={{
                  position: 'absolute',
                  left: '6px',
                  bottom: '10px',
                  width: '4px',
                  height: '4px',
                  backgroundColor: '#93c5fd',
                  opacity: 0.75
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '8px',
                  width: '3px',
                  height: '3px',
                  backgroundColor: '#93c5fd',
                  opacity: 0.6
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

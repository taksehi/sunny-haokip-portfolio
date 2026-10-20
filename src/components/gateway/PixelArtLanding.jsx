import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { useAnimeHero, splitTextIntoLetters } from '../../hooks/useAnimeHero';
import InteractiveLaptop from './InteractiveLaptop';
import { useLaptopScroll } from '../../hooks/useLaptopScroll';
import { useTimeOfDay } from '../../hooks/useTimeOfDay';
import DistantSkylineLights from './DistantSkylineLights';
import PixelCelestialBody from './PixelCelestialBody';
import TimeScrubberHUD from './TimeScrubberHUD';

export default function PixelArtLanding({ onSelectMode, onScrollDown, onOpenShowreel, activeMode = 'dev' }) {
  const canvasRef = useRef(null);
  const heroContainerRef = useRef(null);
  const trackRef = useRef(null);
  const videoRef = useRef(null);

  // Dynamic continuous 24h mathematical time lighting & easter egg HUD
  const timeState = useTimeOfDay();
  const {
    activeTime,
    timeFormatted,
    phaseName,
    isOverridden,
    daylightFactor,
    nightFactor,
    brightness,
    contrast,
    saturation,
    cityLightsOpacity,
    skyOverlayGradient,
    skyOverlayBlend,
    laptopGlowIntensity,
    particleType,
    setManualTime,
    setPreset,
    resetToRealTime,
    PRESETS
  } = timeState;

  // Guarantee seamless background video looping & autoplay
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Track scroll progress using Anime.js v4 onScroll / ScrollObserver
  const scrollProgress = useLaptopScroll({ trackRef });

  // Initialize Anime.js kinetic typography timeline
  useAnimeHero({ containerRef: heroContainerRef });

  // Canvas floating pixel pollen (daytime) or glowing pulsing fireflies (nighttime)
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

    const isNight = particleType === 'fireflies';
    const particleCount = isNight ? 40 : 28;

    // Daytime: sunny meadow pollen; Nighttime: bioluminescent cyan/emerald glowing fireflies
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: isNight ? (Math.random() > 0.6 ? 3.5 : 2.5) : (Math.random() > 0.6 ? 4 : 3),
      speedX: (Math.random() - 0.5) * (isNight ? 0.35 : 0.4),
      speedY: isNight ? (Math.random() - 0.5) * 0.3 : -0.2 - Math.random() * 0.4,
      baseAlpha: isNight ? 0.35 + Math.random() * 0.55 : 0.2 + Math.random() * 0.6,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.03 + Math.random() * 0.04,
      color: isNight
        ? (Math.random() > 0.5 ? '#38bdf8' : (Math.random() > 0.5 ? '#34d399' : '#a7f3d0')) // glowing cyan & emerald
        : (Math.random() > 0.5 ? '#fef08a' : '#86efac') // sunny yellow & meadow green pixels
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (isNight) {
          p.pulsePhase += p.pulseSpeed;
        }

        // Reset if drifted off screen
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.y > canvas.height + 10) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        // Calculate dynamic alpha (pulsing for fireflies)
        const alpha = isNight
          ? p.baseAlpha * (0.4 + 0.6 * Math.sin(p.pulsePhase))
          : p.baseAlpha;

        // Draw crisp pixel rect (with subtle bloom if night firefly)
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(1, alpha));
        
        if (isNight && alpha > 0.4) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleType]);

  return (
    <div
      ref={trackRef}
      id="hero-scroll-track"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '220vh'
      }}
    >
      <section
        ref={heroContainerRef}
        id="hero-landing"
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          minHeight: '100vh',
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          color: '#ffffff'
        }}
      >
        {/* 1. Animated Pixel Art Video Background with Dynamic Time-of-Day Lighting Filter */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          overflow: 'hidden',
          backgroundColor: '#0a101f'
        }}>
          {/* Main Visual Layer: Clean Background Backdrop with dynamic mathematical grading */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              filter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturation})`,
              transition: 'filter 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* 8-Bit Pixel Art Background Image (Natural meadow without any background laptop) */}
            <img
              src="/hero/hero-clean-backdrop.webp?v=1"
              alt="Lush pixel art meadow with trees and distant skyline"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center bottom',
                imageRendering: 'pixelated',
                display: 'block'
              }}
            />
          </div>

          {/* Pixel Art Sun and Moon Celestial Cycle (Sits in the open sky) */}
          <PixelCelestialBody
            activeTime={activeTime}
            daylightFactor={daylightFactor}
            nightFactor={nightFactor}
          />



          {/* Distant City Skyline Building & Mast Lights (Gently illuminates when dusk/night falls) */}
          <DistantSkylineLights opacity={cityLightsOpacity} />

          {/* Dynamic Atmospheric Sky Overlay (Dawn rose, Sunset amber, or Midnight indigo moonlit wash) */}
          {skyOverlayGradient && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: skyOverlayGradient,
                mixBlendMode: skyOverlayBlend,
                pointerEvents: 'none',
                transition: 'background 0.8s ease'
              }}
            />
          )}

          {/* Soft Vignette & Atmosphere Gradient to blend into noir footer */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.02) 40%, rgba(10,10,10,0.7) 85%, #0a0a0a 100%)',
            pointerEvents: 'none'
          }} />

          {/* Dynamic atmosphere crossfade layer blending pixel-art clearing into obsidian workspace */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#101010',
            opacity: Math.max(0, Math.min(1, (scrollProgress - 0.74) / 0.24)),
            pointerEvents: 'none',
            transition: 'opacity 0.08s linear'
          }} />

          {/* Bottom feathering gradient bridge matching next section perfectly */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '180px',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(16, 16, 16, 0.7) 50%, #101010 100%)',
            pointerEvents: 'none'
          }} />

          {/* Left-edge soft shadow to ensure white text readability against blue sky/clouds on any screen width */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 'clamp(55%, 68vw, 100%)',
            height: '100%',
            background: 'radial-gradient(ellipse 95% 85% at 18% 45%, rgba(6, 10, 16, 0.78) 0%, rgba(6, 10, 16, 0.48) 50%, rgba(6, 10, 16, 0.15) 75%, transparent 100%)',
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

        {/* Time of Day Easter Egg HUD Scrubber */}
        <TimeScrubberHUD
          activeTime={activeTime}
          timeFormatted={timeFormatted}
          phaseName={phaseName}
          isOverridden={isOverridden}
          setManualTime={setManualTime}
          setPreset={setPreset}
          resetToRealTime={resetToRealTime}
          PRESETS={PRESETS}
        />

        {/* 3. Interactive 3D Anime.js Laptop (Starts closed, opens on scroll) */}
        <InteractiveLaptop
          scrollProgress={scrollProgress}
          onSelectMode={onSelectMode}
          onOpenShowreel={onOpenShowreel}
          activeMode={activeMode}
          laptopGlowIntensity={laptopGlowIntensity}
        />

        {/* Spacer to push content down naturally */}
        <div style={{ height: 'clamp(1.5rem, 5vh, 3.5rem)' }} />

        {/* 4. Center Content: Left Copy & Primary CTAs */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          padding: 'clamp(1rem, 3.5vw, 3rem)',
          maxWidth: '1600px',
          margin: '0 auto',
          width: '100%',
          opacity: Math.max(0, 1 - scrollProgress * 1.7),
          transform: `translateY(-${scrollProgress * 45}px)`,
          pointerEvents: scrollProgress > 0.35 ? 'none' : 'auto',
          transition: 'opacity 0.1s linear'
        }}>
        <div style={{ maxWidth: 'clamp(320px, 50vw, 740px)' }}>
          {/* Elevated Display Headline with Dual Typographic Identity */}
          <h1
            className="hero-headline-wrap"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 5.8vw, 4.8rem)',
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              marginBottom: 0,
              color: '#ffffff',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.8)'
            }}
          >
            <span style={{ display: 'block' }}>
              {splitTextIntoLetters('Operating at the convergence')}
            </span>
            <span style={{ 
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: '0.32em',
              flexWrap: 'wrap',
              marginTop: '0.15em'
            }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 300 }}>
                {splitTextIntoLetters('of')}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                color: '#34d399',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                textShadow: '0 0 30px rgba(52, 211, 153, 0.6)'
              }}>
                {splitTextIntoLetters('Code')}
              </span>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 300,
                color: 'rgba(255, 255, 255, 0.65)',
                fontSize: '1.05em'
              }}>
                {splitTextIntoLetters('&')}
              </span>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: '#fbbf24',
                letterSpacing: '-0.01em',
                textShadow: '0 0 30px rgba(245, 158, 11, 0.55)',
                paddingRight: '0.08em'
              }}>
                {splitTextIntoLetters('Cinema.')}
              </span>
            </span>
          </h1>
        </div>
      </div>

      {/* 5. Bottom Scroll Prompt pointing to Screen 2 */}
      <div
        onClick={onScrollDown}
        className="hero-anim-scroll"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingBottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          opacity: Math.max(0, (1 - scrollProgress * 3.5)),
          transform: `translateY(${scrollProgress * 20}px)`,
          pointerEvents: scrollProgress > 0.25 ? 'none' : 'auto',
          color: 'rgba(255, 255, 255, 0.85)',
          transition: 'color 0.2s ease, opacity 0.15s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'}
      >
        <span style={{
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.88)'
        }}>
          Scroll to Boot OS &amp; Explore
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
        @keyframes heroPing {
          0% {
            transform: scale(1);
            opacity: 0.85;
          }
          70%, 100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  </div>
  );
}

import React from 'react';

/**
 * DistantSkylineLights
 * 
 * Accurately registered 1:1 against the background video dimensions (1920x1122):
 * Uses the exact pixel-perfect image map (`/hero/city-lights-map.webp`) rendered
 * directly on top of the video container with `objectFit: cover` and `objectPosition: center bottom`.
 * 
 * This ensures that regardless of viewport resolution, aspect ratio, or responsiveness,
 * every window and rooftop red beacon stays 100% locked to its building facade.
 */
export default function DistantSkylineLights({ opacity = 0 }) {
  if (opacity <= 0.01) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: opacity,
        transition: 'opacity 0.8s ease'
      }}
    >
      {/* 1:1 Pixel-locked building windows texture (locks perfectly to the video) */}
      <img
        src="/hero/city-lights-map.webp?v=1"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center bottom',
          imageRendering: 'pixelated',
          filter: 'drop-shadow(0 0 3px rgba(254, 240, 138, 0.75)) drop-shadow(0 0 8px rgba(254, 240, 138, 0.4))'
        }}
      />
    </div>
  );
}

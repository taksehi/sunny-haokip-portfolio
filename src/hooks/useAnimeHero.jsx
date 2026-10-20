import React, { useEffect, useRef } from 'react';
import { createTimeline, stagger, remove } from 'animejs';

/**
 * useAnimeHero
 * Drives kinetic typography and element entrances on the Hero Landing Page
 * inspired by animejs.com's signature typographic stagger and easings.
 * Built for Anime.js v4 ESM modules.
 */
export function useAnimeHero({ containerRef, enabled = true }) {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Set final states immediately
      const letters = containerRef.current.querySelectorAll('.hero-anim-letter');
      letters.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      const scrollPrompt = containerRef.current.querySelectorAll('.hero-anim-scroll');
      scrollPrompt.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const container = containerRef.current;
    const letters = container.querySelectorAll('.hero-anim-letter');
    const scrollPrompt = container.querySelectorAll('.hero-anim-scroll');

    // Build timeline using Anime.js v4 createTimeline
    const tl = createTimeline({
      defaults: {
        ease: 'outExpo'
      }
    });

    timelineRef.current = tl;

    // 1. Headline letter-by-letter reveal (masked overflow lift + subtle tilt)
    if (letters.length > 0) {
      tl.add(
        letters,
        {
          translateY: ['110%', '0%'],
          rotateZ: [-5, 0],
          opacity: [0, 1],
          duration: 850,
          delay: stagger(22, { start: 200 }),
          ease: 'outExpo'
        }
      );
    }

    // 2. Scroll indicator prompt
    if (scrollPrompt.length > 0) {
      tl.add(
        scrollPrompt,
        {
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 800,
          ease: 'outQuad'
        },
        '-=200'
      );
    }

    return () => {
      if (timelineRef.current && typeof timelineRef.current.pause === 'function') {
        timelineRef.current.pause();
      }
      if (letters.length > 0) remove(letters);
      if (scrollPrompt.length > 0) remove(scrollPrompt);
    };
  }, [containerRef, enabled]);

  return { timeline: timelineRef.current };
}

/**
 * Helper to split text into wrapped words and letters for Anime.js animation
 */
export function splitTextIntoLetters(text) {
  return text.split(' ').map((word, wordIdx) => {
    return (
      <span
        key={`w-${wordIdx}`}
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          marginRight: '0.28em'
        }}
      >
        {word.split('').map((char, charIdx) => (
          <span
            key={`c-${wordIdx}-${charIdx}`}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'bottom'
            }}
          >
            <span
              className="hero-anim-letter"
              style={{
                display: 'inline-block',
                opacity: 0,
                transform: 'translateY(110%) rotate(-5deg)',
                willChange: 'transform, opacity'
              }}
            >
              {char}
            </span>
          </span>
        ))}
      </span>
    );
  });
}

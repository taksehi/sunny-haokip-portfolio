import { useState, useEffect, useMemo, useCallback } from 'react';

/**
 * useTimeOfDay Hook
 * 
 * Provides continuous mathematical sun and atmospheric lighting calculation
 * based on real local time or manual preview override (Easter Egg Scrubber).
 * 
 * Phases:
 * - Dawn/Morning  (05:00 - 08:59) -> Soft golden warmth, light mist
 * - Midday        (09:00 - 16:59) -> High brilliance, vivid saturation, crisp clear sky
 * - Golden/Sunset (17:00 - 19:29) -> Amber, crimson rim light, long shadows
 * - Night/Dusk    (19:30 - 04:59) -> Cinematic indigo moonlight, glowy city skyline, pulsing fireflies
 */

export function useTimeOfDay() {
  // Live local time tracker
  const [realTime, setRealTime] = useState(() => {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60;
  });

  // Override time (0 to 24), null means synced with realTime
  const [manualTime, setManualTime] = useState(null);

  // Sync real local clock every 30 seconds
  useEffect(() => {
    const updateRealTime = () => {
      const now = new Date();
      setRealTime(now.getHours() + now.getMinutes() / 60);
    };

    const interval = setInterval(updateRealTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const activeTime = manualTime !== null ? manualTime : realTime;
  const isOverridden = manualTime !== null;

  // Discrete time presets for the quick pill switcher
  const PRESETS = [
    { id: 'dawn', label: 'Dawn', time: 6.5, icon: '🌅' },
    { id: 'day', label: 'Noon', time: 12.0, icon: '☀️' },
    { id: 'sunset', label: 'Sunset', time: 18.5, icon: '🌇' },
    { id: 'night', label: 'Night', time: 23.0, icon: '🌙' },
  ];

  // Mathematical interpolation based on sun cycle
  const lighting = useMemo(() => {
    const t = activeTime; // 0 to 24

    // Phase label
    let phase = 'night';
    let phaseName = 'Midnight Noir';
    if (t >= 5 && t < 9) {
      phase = 'morning';
      phaseName = 'Morning Light';
    } else if (t >= 9 && t < 17) {
      phase = 'day';
      phaseName = 'Midday Sunlight';
    } else if (t >= 17 && t < 19.5) {
      phase = 'sunset';
      phaseName = 'Golden Sunset';
    }

    /**
     * Continuous Sun Altitude:
     * Peak at 13:00 (1.0), lowest at 01:00 (-1.0)
     */
    const sunAngle = ((t - 13) / 24) * 2 * Math.PI;
    const rawSunAlt = Math.cos(sunAngle); // 1.0 (noon) to -1.0 (midnight)

    // Clamped daylight curve (0 at night, 1 at peak noon)
    const daylightFactor = Math.max(0, Math.min(1, (rawSunAlt + 0.3) / 1.3));

    // Sunset/Sunrise curve (peaks around 06:30 and 18:30)
    const goldenFactor = Math.max(
      0,
      Math.min(
        1,
        Math.exp(-Math.pow(t - 18.2, 2) / 2.2) + Math.exp(-Math.pow(t - 6.5, 2) / 2.2)
      )
    );

    // Night factor (1.0 in dead of night, 0 during day)
    const nightFactor = Math.max(0, Math.min(1, 1 - daylightFactor));

    // 1. Scene Brightness (Exposure Clamped: Never drops below 0.60 so it stays cinematic, not pitch black)
    // Day = ~1.12, Morning = ~0.94, Sunset = ~0.90, Night = ~0.62
    const brightness = 0.62 + (daylightFactor * 0.48) + (goldenFactor * 0.04);

    // 2. Contrast: Night gets higher contrast to make pixel stars & city lights punch
    const contrast = 1.0 + (nightFactor * 0.16) - (goldenFactor * 0.04);

    // 3. Saturation: Golden hour pops warm tones, night desaturates slightly towards deep navy/blues
    const saturation = 0.85 + (daylightFactor * 0.28) + (goldenFactor * 0.35);

    // 4. Skyline City Lights Intensity (0 in daytime, 1.0 at night)
    // Starts turning on after 18:00 (dusk) and reaches full glow by 20:00
    let cityLightsOpacity = 0;
    if (t >= 17.8 || t < 5.8) {
      if (t >= 17.8 && t < 20.0) {
        cityLightsOpacity = (t - 17.8) / 2.2;
      } else if (t >= 4.5 && t < 5.8) {
        cityLightsOpacity = 1 - (t - 4.5) / 1.3;
      } else {
        cityLightsOpacity = 1.0;
      }
    }

    // 5. Sky Tint & Ambient Gradient colors
    // We compose multiple non-destructive atmosphere overlays
    let skyOverlayGradient = '';
    let skyOverlayBlend = 'normal';

    if (nightFactor > 0.4) {
      // Midnight Moonlit Indigo wash
      const alpha = (nightFactor - 0.4) / 0.6 * 0.65;
      skyOverlayGradient = `linear-gradient(180deg, rgba(8, 16, 42, ${alpha * 0.85}) 0%, rgba(14, 28, 64, ${alpha * 0.6}) 45%, rgba(6, 11, 26, ${alpha * 0.95}) 100%)`;
      skyOverlayBlend = 'color-burn';
    } else if (goldenFactor > 0.25) {
      // Golden hour warm amber gradient
      skyOverlayGradient = `linear-gradient(180deg, rgba(255, 125, 45, ${goldenFactor * 0.32}) 0%, rgba(255, 185, 95, ${goldenFactor * 0.22}) 50%, rgba(240, 95, 30, ${goldenFactor * 0.28}) 100%)`;
      skyOverlayBlend = 'soft-light';
    } else if (t >= 5 && t < 9) {
      // Soft dawn rose & peach
      skyOverlayGradient = `linear-gradient(180deg, rgba(255, 205, 165, 0.22) 0%, rgba(255, 235, 200, 0.12) 60%, rgba(20, 30, 45, 0.18) 100%)`;
      skyOverlayBlend = 'soft-light';
    } else {
      // Crisp clear day - faint sun boost
      skyOverlayGradient = `linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 60%)`;
      skyOverlayBlend = 'overlay';
    }

    // 6. Laptop Ground Bloom (casts vibrant glow on meadow at night)
    const laptopGlowIntensity = Math.min(1, Math.max(0, (nightFactor - 0.2) / 0.8));

    // Particle color / life profile
    const particleType = nightFactor > 0.5 ? 'fireflies' : 'pollen';

    // Format display string e.g. "09:45 AM"
    const displayHours = Math.floor(t);
    const displayMinutes = Math.floor((t - displayHours) * 60);
    const period = displayHours >= 12 ? 'PM' : 'AM';
    const formattedHour = displayHours % 12 === 0 ? 12 : displayHours % 12;
    const timeFormatted = `${formattedHour}:${displayMinutes.toString().padStart(2, '0')} ${period}`;

    return {
      activeTime: t,
      phase,
      phaseName,
      timeFormatted,
      isOverridden,
      daylightFactor,
      nightFactor,
      goldenFactor,
      brightness,
      contrast,
      saturation,
      cityLightsOpacity,
      skyOverlayGradient,
      skyOverlayBlend,
      laptopGlowIntensity,
      particleType
    };
  }, [activeTime, isOverridden]);

  const setPreset = useCallback((targetTime) => {
    setManualTime(targetTime);
  }, []);

  const resetToRealTime = useCallback(() => {
    setManualTime(null);
  }, []);

  return {
    ...lighting,
    manualTime,
    setManualTime,
    setPreset,
    resetToRealTime,
    PRESETS
  };
}

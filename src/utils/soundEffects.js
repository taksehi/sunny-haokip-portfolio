// Tactile Audio FX Engine using native Web Audio API (0 KB external MP3 downloads)

class SoundFXEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    if (typeof window !== 'undefined') {
      this.enabled = localStorage.getItem('sunny_sfx_enabled') === 'true';
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sunny_sfx_enabled', this.enabled ? 'true' : 'false');
    }
    if (this.enabled) {
      this.init();
      this.playMechanicalClick();
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  // Camera mechanical shutter sound (used when opening film modal or polaroid)
  playShutterClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Part 1: Initial mirror slap transient
      const slapOsc = this.ctx.createOscillator();
      const slapGain = this.ctx.createGain();
      slapOsc.type = 'triangle';
      slapOsc.frequency.setValueAtTime(120, now);
      slapOsc.frequency.exponentialRampToValueAtTime(30, now + 0.04);
      slapGain.gain.setValueAtTime(0.2, now);
      slapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      slapOsc.connect(slapGain);
      slapGain.connect(this.ctx.destination);
      slapOsc.start(now);
      slapOsc.stop(now + 0.04);

      // Part 2: Mechanical curtain click (40ms later)
      const clickOsc = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      clickOsc.type = 'sine';
      clickOsc.frequency.setValueAtTime(800, now + 0.045);
      clickOsc.frequency.exponentialRampToValueAtTime(140, now + 0.09);
      clickGain.gain.setValueAtTime(0.18, now + 0.045);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      clickOsc.connect(clickGain);
      clickGain.connect(this.ctx.destination);
      clickOsc.start(now + 0.045);
      clickOsc.stop(now + 0.09);
    } catch (_) {}
  }

  // Tactile mode switch click
  playMechanicalClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.035);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } catch (_) {}
  }

  // Retro terminal key click
  playKeyBeep() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.015);
    } catch (_) {}
  }
}

export const soundFX = new SoundFXEngine();
export default soundFX;

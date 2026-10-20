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

  // Magnetic reel stepper tick
  playReelTick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.02);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.02);
    } catch (_) {}
  }

  // Radio / Broadcast frequency tuning sweep chirp
  playFrequencyTune(freqMultiplier = 1) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      const baseFreq = 500 * freqMultiplier;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq + 240, now + 0.04);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch (_) {}
  }

  // Paper rustle / binder page turn
  playPaperRustle() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // White noise buffer for crisp paper texture
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.Q.setValueAtTime(1.8, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
    } catch (_) {}
  }

  // CRT Power capacitor charge / hum
  playPowerHum() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(60, now);
      osc.frequency.exponentialRampToValueAtTime(15734, now + 0.35);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (_) {}
  }

  // 5.25 inch floppy drive stepper head buzz
  playFloppySeek() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.setValueAtTime(160, now + 0.03);
      osc.frequency.setValueAtTime(110, now + 0.06);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch (_) {}
  }
}

export const soundFX = new SoundFXEngine();
export default soundFX;


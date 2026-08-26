/**
 * AETERNA GENÈVE — Web Audio API Mechanical Synthesizer
 * Generates realistic micro-mechanical escapement clicks and metallic shimmers
 */

class HorologyAudioEngine {
  constructor() {
    this.ctx = null;
    this.isEnabled = false;
    this.tickInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.init();
    this.isEnabled = !this.isEnabled;

    if (this.isEnabled) {
      this.playChime(520, 0.15);
      this.startMechanicalTicking();
    } else {
      this.stopMechanicalTicking();
    }
    return this.isEnabled;
  }

  // Synthesize a high-precision mechanical watch tick
  playMechanicalTick(isTock = false) {
    if (!this.isEnabled || !this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isTock ? 3200 : 3800, t);
      osc.frequency.exponentialRampToValueAtTime(120, t + 0.025);

      filter.type = 'bandpass';
      filter.frequency.value = isTock ? 2600 : 3100;
      filter.Q.value = 8;

      gain.gain.setValueAtTime(0.045, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.025);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.025);
    } catch (e) {
      // Audio fallback silent
    }
  }

  startMechanicalTicking() {
    let tickCount = 0;
    // 4Hz tick-tock cadence (resembling 28,800 vph escapement rhythm)
    this.tickInterval = setInterval(() => {
      this.playMechanicalTick(tickCount % 2 === 1);
      tickCount++;
    }, 250);
  }

  stopMechanicalTicking() {
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
      this.tickInterval = null;
    }
  }

  // Soft metallic chime for interactions
  playChime(freq = 440, duration = 0.2) {
    if (!this.isEnabled || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + duration);

      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + duration);
    } catch (e) {}
  }
}

window.horologyAudio = new HorologyAudioEngine();

// Cozy 8-bit Sound Synthesizer using Web Audio API

class CozyAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = AudioCtx ? new AudioCtx() : null;
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    this.init();
    return this.isMuted;
  }

  public getMuteState() {
    return this.isMuted;
  }

  private playTone(freq: number, type: OscillatorType, dur: number, gainStart: number) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gainNode.gain.setValueAtTime(gainStart, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + dur);
    } catch (e) {
      console.warn("Audio failed to play (user interaction required)", e);
    }
  }

  // Blip when clicking on menu or selecting pet
  public playClick() {
    this.playTone(350, 'sine', 0.1, 0.15);
  }

  // Soft high drop for bubble / grooming wash
  public playBubble() {
    const randomFreq = 800 + Math.random() * 600;
    this.playTone(randomFreq, 'sine', 0.15, 0.08);
  }

  // Sparkling cute chiming when applying dental/medical ointments
  public playHeal() {
    const times = [0, 0.08, 0.16];
    const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5
    times.forEach((t, index) => {
      setTimeout(() => {
        this.playTone(freqs[index], 'triangle', 0.25, 0.1);
      }, t * 1000);
    });
  }

  // whistle sound for pet training
  public playWhistle() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1100, this.ctx.currentTime + 0.15);

      gainNode.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {
      // Ignore audio start failures
    }
  }

  // Sound for successful treat/completion
  public playSuccess() {
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    freqs.forEach((f, i) => {
      setTimeout(() => {
        this.playTone(f, 'sine', 0.3, 0.12);
      }, i * 70);
    });
  }

  // Buzz/patience sound
  public playPatienceWarning() {
    this.playTone(180, 'sawtooth', 0.15, 0.05);
  }

  // Sound when pet exits happy
  public playChimeUp() {
    const freqs = [587.33, 783.99, 1174.66]; // D5, G5, D6
    freqs.forEach((f, i) => {
      setTimeout(() => {
        this.playTone(f, 'triangle', 0.4, 0.08);
      }, i * 100);
    });
  }
}

export const cozyAudio = new CozyAudioEngine();

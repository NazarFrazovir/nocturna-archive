const THEME_SRC = '/audio/golden-brown.mp3'
const THEME_VOLUME = 0.44
const FADE_SEC = 3

export class ThemeMusicController {
  private el: HTMLAudioElement | null = null
  private gain: GainNode | null = null
  private ctx: AudioContext | null = null
  private visible = false
  private ready = false

  attach(ctx: AudioContext, destination: AudioNode) {
    this.ctx = ctx
    const el = new Audio(THEME_SRC)
    el.loop = true
    el.preload = 'auto'
    el.crossOrigin = 'anonymous'

    const source = ctx.createMediaElementSource(el)

    const highpass = ctx.createBiquadFilter()
    highpass.type = 'highpass'
    highpass.frequency.value = 85
    highpass.Q.value = 0.6

    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.value = 12800
    lowpass.Q.value = 0.5

    const presence = ctx.createBiquadFilter()
    presence.type = 'peaking'
    presence.frequency.value = 3200
    presence.Q.value = 0.8
    presence.gain.value = 1.5

    const gain = ctx.createGain()
    gain.gain.value = 0

    source.connect(highpass)
    highpass.connect(lowpass)
    lowpass.connect(presence)
    presence.connect(gain)
    gain.connect(destination)

    this.el = el
    this.gain = gain

    el.addEventListener('canplaythrough', () => {
      this.ready = true
    }, { once: true })
    el.load()
  }

  setVisible(visible: boolean) {
    if (!this.ctx || !this.gain || !this.el) return
    if (visible === this.visible) return
    this.visible = visible

    const now = this.ctx.currentTime
    this.gain.gain.cancelScheduledValues(now)

    if (visible) {
      const startPlayback = () => {
        if (!this.el || !this.visible) return
        this.el.play().catch(() => {})
      }
      if (this.ready || this.el.readyState >= 3) {
        startPlayback()
      } else {
        this.el.addEventListener('canplay', startPlayback, { once: true })
      }
      this.gain.gain.setValueAtTime(this.gain.gain.value, now)
      this.gain.gain.linearRampToValueAtTime(THEME_VOLUME, now + FADE_SEC)
    } else {
      const current = this.gain.gain.value
      this.gain.gain.setValueAtTime(current, now)
      this.gain.gain.linearRampToValueAtTime(0, now + FADE_SEC)
      window.setTimeout(() => {
        if (!this.visible && this.el) {
          this.el.pause()
        }
      }, FADE_SEC * 1000 + 100)
    }
  }

  isVisible() {
    return this.visible
  }

  pause() {
    this.visible = false
    if (this.gain && this.ctx) {
      this.gain.gain.setValueAtTime(0, this.ctx.currentTime)
    }
    this.el?.pause()
  }

  destroy() {
    this.pause()
    this.el = null
    this.gain = null
    this.ctx = null
    this.ready = false
  }
}

export const themeMusic = new ThemeMusicController()
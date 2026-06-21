import type { RealmAudioProfile } from './realmProfiles'
import { HERO_PROFILE } from './realmProfiles'
import { themeMusic } from './ThemeMusicController'

const MASTER_VOLUME = 0.55
const MASTER_DUCKED = 0.14
const FADE_MS = 1800

function createNoiseBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const buffer = ctx.createBuffer(2, ctx.sampleRate * seconds, ctx.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch)
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1
    }
  }
  return buffer
}

export class ArchiveAudioEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private droneGain: GainNode | null = null
  private windGain: GainNode | null = null
  private windFilter: BiquadFilterNode | null = null
  private oscA: OscillatorNode | null = null
  private oscB: OscillatorNode | null = null
  private lfo: OscillatorNode | null = null
  private lfoGain: GainNode | null = null
  private windSource: AudioBufferSourceNode | null = null
  private running = false
  private currentProfile = HERO_PROFILE
  private themePlaying = false

  async start(): Promise<void> {
    if (this.running) {
      await this.ctx?.resume()
      return
    }

    const ctx = new AudioContext()
    const master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)

    themeMusic.attach(ctx, ctx.destination)

    const droneGain = ctx.createGain()
    const windGain = ctx.createGain()
    const windFilter = ctx.createBiquadFilter()
    windFilter.type = 'lowpass'

    droneGain.connect(master)
    windFilter.connect(windGain)
    windGain.connect(master)

    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = HERO_PROFILE.lfoRate
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = HERO_PROFILE.lfoDepth
    lfo.connect(lfoGain)
    lfoGain.connect(droneGain.gain)
    lfo.start()

    const oscA = ctx.createOscillator()
    oscA.type = 'sine'
    const oscB = ctx.createOscillator()
    oscB.type = 'triangle'

    oscA.connect(droneGain)
    oscB.connect(droneGain)

    const noise = createNoiseBuffer(ctx, 4)
    const windSource = ctx.createBufferSource()
    windSource.buffer = noise
    windSource.loop = true
    windSource.connect(windFilter)
    windSource.start()

    this.applyProfile(HERO_PROFILE, ctx, oscA, oscB, windFilter, droneGain, windGain, lfo, lfoGain)

    oscA.start()
    oscB.start()

    this.ctx = ctx
    this.master = master
    this.droneGain = droneGain
    this.windGain = windGain
    this.windFilter = windFilter
    this.oscA = oscA
    this.oscB = oscB
    this.lfo = lfo
    this.lfoGain = lfoGain
    this.windSource = windSource
    this.running = true

    await ctx.resume()
    this.fadeMasterTo(this.themePlaying ? MASTER_DUCKED : MASTER_VOLUME)
  }

  private applyProfile(
    profile: RealmAudioProfile,
    ctx: AudioContext,
    oscA: OscillatorNode,
    oscB: OscillatorNode,
    windFilter: BiquadFilterNode,
    droneGain: GainNode,
    windGain: GainNode,
    lfo: OscillatorNode,
    lfoGain: GainNode,
  ) {
    const now = ctx.currentTime
    const duck = this.themePlaying

    oscA.frequency.setTargetAtTime(profile.droneA, now, 0.8)
    oscB.frequency.setTargetAtTime(profile.droneB, now, 0.8)
    oscA.detune.setTargetAtTime(profile.detune, now, 0.8)
    oscB.detune.setTargetAtTime(-profile.detune, now, 0.8)
    windFilter.frequency.setTargetAtTime(profile.windCutoff, now, 0.8)
    droneGain.gain.setTargetAtTime(duck ? profile.droneGain * 0.25 : profile.droneGain, now, 0.8)
    windGain.gain.setTargetAtTime(duck ? profile.windGain * 0.2 : profile.windGain, now, 0.8)
    lfo.frequency.setTargetAtTime(profile.lfoRate, now, 0.8)
    lfoGain.gain.setTargetAtTime(profile.lfoDepth, now, 0.8)
    this.currentProfile = profile
  }

  crossfadeTo(profile: RealmAudioProfile) {
    if (!this.ctx || !this.oscA || !this.oscB || !this.windFilter || !this.droneGain || !this.windGain || !this.lfo || !this.lfoGain) return
    this.applyProfile(profile, this.ctx, this.oscA, this.oscB, this.windFilter, this.droneGain, this.windGain, this.lfo, this.lfoGain)
  }

  setThemePlaying(active: boolean) {
    this.themePlaying = active
    if (!this.running) return

    themeMusic.setVisible(active)
    this.fadeMasterTo(active ? MASTER_DUCKED : MASTER_VOLUME)

    if (this.ctx && this.oscA && this.oscB && this.windFilter && this.droneGain && this.windGain && this.lfo && this.lfoGain) {
      this.applyProfile(this.currentProfile, this.ctx, this.oscA, this.oscB, this.windFilter, this.droneGain, this.windGain, this.lfo, this.lfoGain)
    }
  }

  isThemePlaying() {
    return this.themePlaying
  }

  private fadeMasterTo(target: number) {
    if (!this.ctx || !this.master) return
    const now = this.ctx.currentTime
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setValueAtTime(this.master.gain.value, now)
    this.master.gain.linearRampToValueAtTime(target, now + FADE_MS / 1000)
  }

  mute() {
    themeMusic.setVisible(false)
    this.fadeMasterTo(0)
  }

  unmute() {
    this.fadeMasterTo(this.themePlaying ? MASTER_DUCKED : MASTER_VOLUME)
    if (this.themePlaying) themeMusic.setVisible(true)
  }

  playRealmStinger(realmId: string) {
    if (!this.ctx || !this.master) return
    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = realmId === 'ironwraith' ? 320 : realmId === 'hollowspire' ? 520 : 240
    filter.Q.value = 4
    osc.type = realmId === 'grimhold' ? 'sine' : 'triangle'
    osc.frequency.setValueAtTime(realmId === 'ashveil' ? 180 : 220, now)
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.6)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.linearRampToValueAtTime(0.12, now + 0.08)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9)
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.master)
    osc.start(now)
    osc.stop(now + 1)
  }

  playPageTurn() {
    if (!this.ctx || !this.master) return
    const now = this.ctx.currentTime
    const buffer = createNoiseBuffer(this.ctx, 0.15)
    const source = this.ctx.createBufferSource()
    source.buffer = buffer
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = 1200
    const gain = this.ctx.createGain()
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.linearRampToValueAtTime(0.06, now + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)
    source.connect(filter)
    filter.connect(gain)
    gain.connect(this.master)
    source.start(now)
  }

  stop() {
    if (!this.running) return
    themeMusic.pause()
    this.mute()
    setTimeout(() => {
      this.oscA?.stop()
      this.oscB?.stop()
      this.lfo?.stop()
      this.windSource?.stop()
      themeMusic.destroy()
      this.ctx?.close()
      this.ctx = null
      this.running = false
      this.themePlaying = false
    }, FADE_MS + 100)
  }

  isRunning() {
    return this.running
  }
}

export const audioEngine = new ArchiveAudioEngine()
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { audioEngine } from '../audio/ArchiveAudioEngine'
import {
  HERO_PROFILE,
  SAGA_PROFILE,
  DEFAULT_PROFILE,
  getProfileForRealm,
} from '../audio/realmProfiles'
import { useActiveSection } from '../hooks/useActiveSection'

const STORAGE_KEY = 'nocturna-audio-enabled'

interface ArchiveAudioContextValue {
  enabled: boolean
  themePlaying: boolean
  toggle: () => void
  selectedRealm: string | null
  setSelectedRealm: (id: string | null) => void
  playPageTurn: () => void
}

const ArchiveAudioContext = createContext<ArchiveAudioContextValue | null>(null)

export function ArchiveAudioProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })
  const [selectedRealm, setSelectedRealm] = useState<string | null>(null)
  const activeSection = useActiveSection()

  const toggle = useCallback(async () => {
    if (enabled) {
      audioEngine.mute()
      setTimeout(() => audioEngine.stop(), 1900)
      setEnabled(false)
      localStorage.setItem(STORAGE_KEY, 'false')
    } else {
      await audioEngine.start()
      audioEngine.setThemePlaying(true)
      setEnabled(true)
      localStorage.setItem(STORAGE_KEY, 'true')
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    let profile = DEFAULT_PROFILE

    if (activeSection === 'hero') {
      profile = HERO_PROFILE
    } else if (activeSection === 'saga') {
      profile = SAGA_PROFILE
    } else if (activeSection === 'realms') {
      profile = getProfileForRealm(selectedRealm)
    } else if (activeSection === 'oracle') {
      profile = { ...DEFAULT_PROFILE, windGain: 0.06, droneGain: 0.04, lfoRate: 0.1 }
    }

    if (audioEngine.isRunning()) {
      audioEngine.setThemePlaying(true)
      audioEngine.crossfadeTo(profile)
    }
  }, [enabled, activeSection, selectedRealm])

  useEffect(() => {
    if (enabled) {
      audioEngine.start().then(() => {
        audioEngine.setThemePlaying(true)
      })
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const resume = () => {
      if (!audioEngine.isRunning()) {
        audioEngine.start().then(() => audioEngine.setThemePlaying(true))
      }
    }
    window.addEventListener('pointerdown', resume, { once: true })
    return () => window.removeEventListener('pointerdown', resume)
  }, [enabled])

  const playPageTurn = useCallback(() => {
    if (enabled) audioEngine.playPageTurn()
  }, [enabled])

  const themePlaying = enabled

  const value = useMemo(
    () => ({
      enabled,
      themePlaying,
      toggle,
      selectedRealm,
      setSelectedRealm: (id: string | null) => {
        setSelectedRealm(id)
        if (enabled && id && id !== 'ethelmourn') {
          audioEngine.playRealmStinger(id)
        }
      },
      playPageTurn,
    }),
    [enabled, themePlaying, toggle, selectedRealm, playPageTurn],
  )

  return (
    <ArchiveAudioContext.Provider value={value}>{children}</ArchiveAudioContext.Provider>
  )
}

export function useArchiveAudio() {
  const ctx = useContext(ArchiveAudioContext)
  if (!ctx) throw new Error('useArchiveAudio must be used within ArchiveAudioProvider')
  return ctx
}
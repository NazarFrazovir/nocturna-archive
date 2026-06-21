import { useCallback, useSyncExternalStore } from 'react'
import { sagaChapters } from '../data/saga'

const STORAGE_KEY = 'nocturna-archive-progress'

export type OracleTier = 'intro' | 'book1' | 'book2' | 'book3'
export type OraclePrice = 'memory' | 'sleep' | 'name'

interface ArchiveProgress {
  readChapters: string[]
  hasEntered: boolean
  eclipseSeen: boolean
  book3CompletedAt: string | null
  oracleDay: string
  oracleCount: number
}

const DEFAULT: ArchiveProgress = {
  readChapters: [],
  hasEntered: false,
  eclipseSeen: false,
  book3CompletedAt: null,
  oracleDay: '',
  oracleCount: 0,
}

let cachedRaw: string | null = null
let cachedState: ArchiveProgress = DEFAULT

function load(): ArchiveProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === cachedRaw) return cachedState
    cachedRaw = raw
    if (!raw) {
      cachedState = DEFAULT
      return cachedState
    }
    cachedState = { ...DEFAULT, ...JSON.parse(raw) }
    return cachedState
  } catch {
    cachedState = DEFAULT
    return cachedState
  }
}

function save(next: ArchiveProgress) {
  cachedState = next
  cachedRaw = JSON.stringify(next)
  localStorage.setItem(STORAGE_KEY, cachedRaw)
  window.dispatchEvent(new Event('archive-progress'))
}

const listeners = new Set<() => void>()

function subscribe(cb: () => void) {
  listeners.add(cb)
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cachedRaw = null
      cb()
    }
  }
  const onCustom = () => {
    cachedRaw = null
    cb()
  }
  window.addEventListener('storage', onStorage)
  window.addEventListener('archive-progress', onCustom)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', onStorage)
    window.removeEventListener('archive-progress', onCustom)
  }
}

function getSnapshot() {
  return load()
}

const BOOK3_EPILOGUE = 'b3-epilogue'
const ECLIPSE_DAYS = 7

export function getOracleTier(readChapters: string[]): OracleTier {
  const read = new Set(readChapters)
  if (read.has(BOOK3_EPILOGUE) || read.has('b3-prologue')) return 'book3'
  if (read.has('b2-prologue') || read.has('b2-epilogue')) return 'book2'
  if (read.has('b1-prologue') || read.has('b1-epilogue')) return 'book1'
  return 'intro'
}

export function getRealmCrackLevel(realmId: string, readChapters: string[]): number {
  const count = sagaChapters.filter(
    (ch) => ch.realmId === realmId && readChapters.includes(ch.id),
  ).length
  return Math.min(3, count)
}

export function isEclipseActive(progress: ArchiveProgress): boolean {
  if (!progress.book3CompletedAt) return false
  const completed = new Date(progress.book3CompletedAt).getTime()
  const elapsed = Date.now() - completed
  return elapsed < ECLIPSE_DAYS * 24 * 60 * 60 * 1000
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function useArchiveProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const markChapterRead = useCallback((chapterId: string) => {
    const current = load()
    if (current.readChapters.includes(chapterId)) return
    const readChapters = [...current.readChapters, chapterId]
    const updates: Partial<ArchiveProgress> = { readChapters }

    if (chapterId === BOOK3_EPILOGUE && !current.book3CompletedAt) {
      updates.book3CompletedAt = new Date().toISOString()
    }

    save({ ...current, ...updates })
  }, [])

  const markEntered = useCallback(() => {
    const current = load()
    if (current.hasEntered) return
    save({ ...current, hasEntered: true })
  }, [])

  const markEclipseSeen = useCallback(() => {
    const current = load()
    if (current.eclipseSeen) return
    save({ ...current, eclipseSeen: true })
  }, [])

  const recordOracleAsk = useCallback(() => {
    const current = load()
    const day = todayKey()
    const oracleCount = current.oracleDay === day ? current.oracleCount + 1 : 1
    save({ ...current, oracleDay: day, oracleCount })
  }, [])

  const canAskOracle = useCallback(() => {
    const current = load()
    const day = todayKey()
    const count = current.oracleDay === day ? current.oracleCount : 0
    return count < 3
  }, [])

  const isChapterRead = useCallback(
    (chapterId: string) => progress.readChapters.includes(chapterId),
    [progress.readChapters],
  )

  const oracleTier = getOracleTier(progress.readChapters)
  const eclipseActive = isEclipseActive(progress)
  const hasProgress = progress.readChapters.length > 0 || progress.hasEntered

  return {
    progress,
    markChapterRead,
    markEntered,
    markEclipseSeen,
    recordOracleAsk,
    canAskOracle,
    isChapterRead,
    oracleTier,
    eclipseActive,
    hasProgress,
    getRealmCrackLevel: (realmId: string) => getRealmCrackLevel(realmId, progress.readChapters),
  }
}
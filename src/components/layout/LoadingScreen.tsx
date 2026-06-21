import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useArchiveProgress } from '../../hooks/useArchiveProgress'

const STEPS = [
  'Печатка слабшає…',
  'Чорнило прокидається…',
  'Архів відчиняється.',
]

const RETURNING_STEPS = [
  'Архів пам’ятає тебе…',
  'Сторінки не закриті…',
  'Продовжуй читання.',
]

const HOLD_MS = 2000

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const { hasProgress, markEntered } = useArchiveProgress()
  const [phase, setPhase] = useState<'steps' | 'hold' | 'done'>('steps')
  const [stepIndex, setStepIndex] = useState(0)
  const [holdProgress, setHoldProgress] = useState(0)
  const holdRef = useRef<number | null>(null)
  const holdStartRef = useRef(0)

  const steps = hasProgress ? RETURNING_STEPS : STEPS

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const stepDuration = prefersReduced ? 600 : 1400

    if (stepIndex < steps.length - 1) {
      const t = setTimeout(() => setStepIndex((i) => i + 1), stepDuration)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => setPhase('hold'), stepDuration)
    return () => clearTimeout(t)
  }, [stepIndex, steps.length])

  const finish = useCallback(() => {
    setPhase('done')
    markEntered()
    setTimeout(onComplete, 500)
  }, [markEntered, onComplete])

  const startHold = useCallback(() => {
    holdStartRef.current = performance.now()
    const tick = (now: number) => {
      const elapsed = now - holdStartRef.current
      const pct = Math.min(100, (elapsed / HOLD_MS) * 100)
      setHoldProgress(pct)
      if (elapsed >= HOLD_MS) {
        holdRef.current = null
        finish()
      } else {
        holdRef.current = requestAnimationFrame(tick)
      }
    }
    holdRef.current = requestAnimationFrame(tick)
  }, [finish])

  const cancelHold = useCallback(() => {
    if (holdRef.current !== null) {
      cancelAnimationFrame(holdRef.current)
      holdRef.current = null
    }
    setHoldProgress(0)
  }, [])

  useEffect(() => () => cancelHold(), [cancelHold])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="archive-entry-ritual fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-void px-6"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6 font-heading text-4xl tracking-[0.3em] text-ember md:text-5xl">
              ᚾᛟᚲ
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={steps[stepIndex]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="font-heading text-xs tracking-[0.45em] text-mist"
              >
                {phase === 'hold' ? 'ТРИМАЙ ПЕЧАТКУ' : steps[stepIndex].toUpperCase()}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {phase === 'hold' && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 flex flex-col items-center"
            >
              <button
                type="button"
                onPointerDown={startHold}
                onPointerUp={cancelHold}
                onPointerLeave={cancelHold}
                className="archive-seal-button relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-ember/40 bg-ember/5 font-heading text-[10px] tracking-[0.2em] text-ember transition-colors hover:border-ember/60"
              >
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="rgba(201,162,39,0.15)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="#c9a227"
                    strokeWidth="2"
                    strokeDasharray={`${holdProgress * 2.89} 289`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="relative z-10">УВІЙТИ</span>
              </button>
              <p className="mt-6 max-w-xs text-center font-body text-sm italic text-mist/50">
                {hasProgress
                  ? 'Ти вже був тут. Архів пам’ятає.'
                  : 'Печатка відкриється тим, хто не поспішає.'}
              </p>
            </motion.div>
          )}

          {phase === 'steps' && (
            <div className="mt-12 flex gap-2">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 w-8 rounded-full transition-colors ${
                    i <= stepIndex ? 'bg-ember/60' : 'bg-mist/15'
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
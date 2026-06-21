import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = prefersReduced ? 400 : 2400
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const pct = Math.min(100, (elapsed / duration) * 100)
      setProgress(pct)
      if (elapsed < duration) {
        requestAnimationFrame(tick)
      } else {
        setDone(true)
        setTimeout(onComplete, 600)
      }
    }

    requestAnimationFrame(tick)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-void"
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
            <p className="font-heading text-xs tracking-[0.5em] text-mist">
              АРХІВ ВІДКРИВАЄТЬСЯ
            </p>
          </motion.div>

          <div className="mt-12 h-px w-48 overflow-hidden bg-mist/20">
            <motion.div
              className="h-full bg-gradient-to-r from-ember/40 via-ember to-ember/40"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 font-heading text-[10px] tracking-widest text-mist/40">
            {Math.round(progress)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
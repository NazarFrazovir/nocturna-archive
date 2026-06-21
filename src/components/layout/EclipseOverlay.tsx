import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useArchiveProgress } from '../../hooks/useArchiveProgress'

export function EclipseOverlay() {
  const { eclipseActive, progress, markEclipseSeen } = useArchiveProgress()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (eclipseActive && !progress.eclipseSeen) {
      setVisible(true)
    }
  }, [eclipseActive, progress.eclipseSeen])

  useEffect(() => {
    document.body.classList.toggle('eclipse-active', eclipseActive)
    return () => document.body.classList.remove('eclipse-active')
  }, [eclipseActive])

  const dismiss = () => {
    markEclipseSeen()
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="eclipse-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 px-6"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 2 }}
            className="max-w-md text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-heading text-[10px] tracking-[0.5em] text-mist/50">СІМ ДНІВ</p>
            <h2 className="mt-4 font-heading text-3xl text-ember md:text-4xl">Затемнення</h2>
            <p className="mt-6 font-body text-lg italic leading-relaxed text-mist/70">
              Небо погасло. Не метафорою. Ти дочитав третю книгу — і світ відповів.
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="mt-10 font-heading text-xs tracking-[0.3em] text-ember/70 transition-colors hover:text-ember"
            >
              ПРОДОВЖИТИ →
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
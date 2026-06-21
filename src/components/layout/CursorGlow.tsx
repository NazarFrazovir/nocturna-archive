import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(max-width: 768px)').matches
    if (prefersReduced || isTouch) return

    setEnabled(true)

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  if (!enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed z-[9998] hidden md:block"
      animate={{ x: pos.x - 20, y: pos.y - 20 }}
      transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.8 }}
      aria-hidden="true"
    >
      <div className="h-10 w-10 rounded-full bg-ember/10 blur-xl" />
    </motion.div>
  )
}
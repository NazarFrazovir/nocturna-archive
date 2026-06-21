import { useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const spring = useSpring(0, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? scrollTop / docHeight : 0
      spring.set(pct)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [spring])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-blood via-ember to-ember/60"
      style={{ scaleX: spring }}
    />
  )
}
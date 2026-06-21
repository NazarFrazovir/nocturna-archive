import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { prophecies } from '../../data/prophecies'

const RUNES = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ']

export function OracleSection() {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [prophecy, setProphecy] = useState('')
  const [displayText, setDisplayText] = useState('')
  const [hasAsked, setHasAsked] = useState(false)

  const typewriter = useCallback((text: string) => {
    setDisplayText('')
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 35)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (prophecy) {
      const cleanup = typewriter(prophecy)
      return cleanup
    }
  }, [prophecy, typewriter])

  const askOracle = () => {
    if (spinning) return
    setSpinning(true)
    setHasAsked(true)
    setDisplayText('')

    const extraRotation = 1440 + Math.random() * 720
    setRotation((prev) => prev + extraRotation)

    setTimeout(() => {
      const random = prophecies[Math.floor(Math.random() * prophecies.length)]
      setProphecy(random)
      setSpinning(false)
    }, 2500)
  }

  return (
    <section id="oracle" className="relative px-6 py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-t from-veil/30 via-void to-void" />
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="section-title">Оракул Попелу</h2>
        <p className="section-subtitle">
          Запитай. Попіл відповість. Пророцтво вголос — доля написана.
        </p>

        <div className="relative mx-auto mt-8 aspect-square w-64 md:w-80">
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 rounded-full border-2 border-ember/20"
          >
            {RUNES.map((rune, i) => {
              const angle = (i / RUNES.length) * 360
              const rad = (angle * Math.PI) / 180
              const radius = 42
              return (
                <span
                  key={i}
                  className="absolute font-heading text-lg text-ember/60"
                  style={{
                    left: `${50 + radius * Math.sin(rad)}%`,
                    top: `${50 - radius * Math.cos(rad)}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {rune}
                </span>
              )
            })}
          </motion.div>

          <div className="absolute inset-8 rounded-full border border-blood/20 bg-obsidian/80" />
          <div className="absolute inset-16 rounded-full bg-gradient-to-br from-ember/10 to-blood/10" />

          <button
            type="button"
            onClick={askOracle}
            disabled={spinning}
            className="absolute inset-0 z-10 m-auto flex h-20 w-20 items-center justify-center rounded-full font-heading text-xs tracking-[0.15em] text-ember transition-all hover:scale-105 hover:text-white disabled:opacity-50"
          >
            {spinning ? '...' : 'ЗАПИТАТИ'}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hasAsked ? 1 : 0 }}
          className="mx-auto mt-10 min-h-24 max-w-xl rounded-lg border border-ember/10 bg-obsidian/50 p-6"
        >
          {displayText ? (
            <p className="font-body text-xl italic leading-relaxed text-mist">
              «{displayText}
              <span className="animate-pulse text-ember">|</span>»
            </p>
          ) : hasAsked && spinning ? (
            <p className="font-body text-lg italic text-mist/50">Попіл збирається у слова...</p>
          ) : (
            <p className="font-body text-lg italic text-mist/30">
              Оракул чекає на твоє питання.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
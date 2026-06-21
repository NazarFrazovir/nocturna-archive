import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { pickProphecy } from '../../data/prophecies'
import { useArchiveProgress } from '../../hooks/useArchiveProgress'
import type { OraclePrice } from '../../hooks/useArchiveProgress'

const RUNES = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ']

const PRICES: { id: OraclePrice; label: string; desc: string }[] = [
  { id: 'memory', label: 'Спогад', desc: 'М’якше пророцтво' },
  { id: 'sleep', label: 'Сон', desc: 'Загадкове' },
  { id: 'name', label: 'Ім’я', desc: 'Жорстке' },
]

export function OracleSection() {
  const { oracleTier, canAskOracle, recordOracleAsk, progress } = useArchiveProgress()
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [prophecy, setProphecy] = useState('')
  const [displayText, setDisplayText] = useState('')
  const [hasAsked, setHasAsked] = useState(false)
  const [price, setPrice] = useState<OraclePrice | null>(null)
  const [silenced, setSilenced] = useState(!canAskOracle())

  const wheelCracked = oracleTier === 'book2' || oracleTier === 'book3'

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

  useEffect(() => {
    setSilenced(!canAskOracle())
  }, [progress.oracleCount, progress.oracleDay, canAskOracle])

  const askOracle = () => {
    if (spinning || silenced || !price) return
    setSpinning(true)
    setHasAsked(true)
    setDisplayText('')

    const extraRotation = 1440 + Math.random() * 720
    setRotation((prev) => prev + extraRotation)

    setTimeout(() => {
      setProphecy(pickProphecy(oracleTier, price))
      recordOracleAsk()
      setSilenced(!canAskOracle())
      setSpinning(false)
    }, 2500)
  }

  return (
    <section id="oracle" className="relative px-6 py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-t from-veil/30 via-void to-void" />
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="section-title">Оракул Попелу</h2>
        <p className="section-subtitle">
          {silenced
            ? 'Вежа назвала ціну. Оракул мовчить до світанку.'
            : 'Назви ціну — потім запитай. Пророцтво не буває безкоштовним.'}
        </p>

        {!silenced && (
          <div className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-2">
            {PRICES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPrice(p.id)}
                className={`rounded border px-4 py-2 transition-all ${
                  price === p.id
                    ? 'border-ember bg-ember/10 text-ember'
                    : 'border-ember/15 text-mist/60 hover:border-ember/30'
                }`}
              >
                <span className="font-heading text-xs tracking-wider">{p.label}</span>
                <span className="mt-0.5 block font-body text-[10px] italic opacity-70">{p.desc}</span>
              </button>
            ))}
          </div>
        )}

        <div className={`relative mx-auto mt-8 aspect-square w-64 md:w-80 ${wheelCracked ? 'oracle-wheel--cracked' : ''}`}>
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

          {wheelCracked && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-px w-3/4 rotate-[35deg] bg-blood/40" />
            </div>
          )}

          <div className="absolute inset-8 rounded-full border border-blood/20 bg-obsidian/80" />
          <div className="absolute inset-16 rounded-full bg-gradient-to-br from-ember/10 to-blood/10" />

          <button
            type="button"
            onClick={askOracle}
            disabled={spinning || silenced || !price}
            className="absolute inset-0 z-10 m-auto flex h-20 w-20 items-center justify-center rounded-full font-heading text-xs tracking-[0.15em] text-ember transition-all hover:scale-105 hover:text-white disabled:opacity-40"
          >
            {spinning ? '...' : silenced ? 'ТИША' : 'ЗАПИТАТИ'}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hasAsked || silenced ? 1 : 0 }}
          className="mx-auto mt-10 min-h-24 max-w-xl rounded-lg border border-ember/10 bg-obsidian/50 p-6"
        >
          {displayText ? (
            <p className="font-body text-xl italic leading-relaxed text-mist">
              «{displayText}
              <span className="animate-pulse text-ember">|</span>»
            </p>
          ) : hasAsked && spinning ? (
            <p className="font-body text-lg italic text-mist/50">Попіл збирається у слова...</p>
          ) : silenced ? (
            <p className="font-body text-lg italic text-mist/50">
              Три питання на день. Вежа не торгується.
            </p>
          ) : !price ? (
            <p className="font-body text-lg italic text-mist/30">
              Обери ціну — потім питай.
            </p>
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
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 844, suffix: '+', label: 'Років історії' },
  { value: 7, suffix: '', label: 'Запечатаних держав' },
  { value: 312, suffix: '', label: 'Записаних артефактів' },
  { value: 13, suffix: '', label: 'Чорнильників' },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(target * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, target])

  return (
    <span ref={ref} className="font-heading text-4xl text-ember md:text-5xl">
      {count}
      {suffix}
    </span>
  )
}

export function InkkeepersSection() {
  return (
    <section id="inkkeepers" className="relative px-6 py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.04)_0%,transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <h2 className="section-title">Орден Чорнильників</h2>
        <p className="section-subtitle">
          Хранителі забутого. Ми не творимо історію — ми рятуємо її від забуття.
        </p>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="font-body text-lg leading-relaxed text-mist">
              Орден засновано в 401 році Ери Затемнення, коли імператорський архів згорів
              разом із половиною правди. Тринадцять вчених поклялися чорнилом і кров’ю:
              жодне ім’я, жодна подія, жодне пророцтво не буде стерто вдруге.
            </p>
            <p className="font-body text-lg leading-relaxed text-mist">
              Архів Ноктурни — не бібліотека. Це живий організм пам’яті. Кожна сторінка
              дихає. Кожен артефакт чекає. Кожне прокляття — чекає на читача.
            </p>
            <blockquote className="border-l-2 border-ember/30 pl-6 font-body text-xl italic text-ember/80">
              «Ми пишемо не для живих. Ми пишемо для тих, хто прийде після завіси.»
              <footer className="mt-2 font-heading text-xs tracking-widest text-mist/50 not-italic">
                — Перший Чорнильник, Еліас Попіловий
              </footer>
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="shimmer-border rounded-lg border border-ember/10 bg-obsidian/60 p-6 text-center"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="mt-2 font-heading text-[10px] tracking-widest text-mist/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
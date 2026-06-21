import { motion } from 'framer-motion'
import { RuneField } from './RuneField'
import { useMouseParallax } from '../../hooks/useMouseParallax'
import { useArchiveProgress } from '../../hooks/useArchiveProgress'


function useNightMode() {
  const hour = new Date().getHours()
  return hour >= 22 || hour < 6
}

export function HeroPortal() {
  const parallax = useMouseParallax(24)
  const { hasProgress, progress, eclipseActive } = useArchiveProgress()
  const isNight = useNightMode()
  const readPrologue = progress.readChapters.includes('b1-prologue')

  return (
    <section
      id="hero"
      className={`hero-portal relative flex min-h-svh items-center justify-center overflow-hidden px-6 ${
        isNight ? 'hero-portal--night' : ''
      } ${eclipseActive ? 'hero-portal--eclipse' : ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-veil/40 via-void to-void" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.08)_0%,transparent_70%)]" />
      {isNight && (
        <div
          className="hero-stars pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
        />
      )}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(139,38,53,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(42,31,61,0.3) 0%, transparent 50%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,15,0.8) 100%)',
        }}
      />
      <RuneField />

      <motion.div
        className="relative z-10 max-w-4xl text-center"
        style={{ x: parallax.x, y: parallax.y }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-4 font-heading text-xs tracking-[0.5em] text-mist"
        >
          ЗАБОРОНЕНИЙ АРХІВ · ЕТЕЛЬМОРН
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-heading text-5xl leading-tight tracking-wide md:text-7xl lg:text-8xl"
        >
          Архів
          <br />
          <span className="bg-gradient-to-r from-ember via-[#e8d48b] to-ember bg-clip-text text-transparent">
            Ноктурни
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mx-auto mt-6 max-w-xl font-body text-xl italic text-mist md:text-2xl"
        >
          {readPrologue
            ? 'Ти вже відкрив сторінку, якої не мало б існувати.'
            : hasProgress
              ? 'Архів пам’ятає. Сага чекає наступної глави.'
              : 'Сім держав за завісою. Забуті істини. Один крок — і ти вже в хроніці.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#saga"
            className="shimmer-border group rounded border border-ember/40 bg-ember/5 px-8 py-3 font-heading text-sm tracking-[0.2em] text-ember transition-all hover:bg-ember/15 hover:shadow-[0_0_30px_rgba(201,162,39,0.2)]"
          >
            Увійти до Архіву
          </a>
          <a
            href="#oracle"
            className="font-body text-base text-mist transition-colors hover:text-ember"
          >
            Запитати Оракула →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-20 flex flex-col items-center gap-2"
        >
          <span className="font-heading text-[10px] tracking-[0.4em] text-mist/50">ГОРТАЙ</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="h-8 w-px bg-gradient-to-b from-ember/60 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
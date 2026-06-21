import { motion } from 'framer-motion'
import { useArchiveAudio } from '../../context/ArchiveAudioContext'
import { useActiveSection } from '../../hooks/useActiveSection'

export function HeroThemeTrack() {
  const { enabled, themeOnHero } = useArchiveAudio()
  const activeSection = useActiveSection()
  const onHero = activeSection === 'hero'

  if (!onHero) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      className="hero-theme-track absolute bottom-8 right-6 z-20 md:bottom-12 md:right-10"
    >
      <div
        className={`hero-theme-track-badge flex items-center gap-3 rounded-full border px-4 py-2 backdrop-blur-sm transition-all ${
          themeOnHero
            ? 'border-ember/40 bg-obsidian/80'
            : 'border-ember/15 bg-obsidian/50'
        }`}
      >
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
            themeOnHero ? 'bg-ember/15 text-ember' : 'bg-mist/10 text-mist/40'
          }`}
        >
          {themeOnHero ? (
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              ♫
            </motion.span>
          ) : (
            '♫'
          )}
        </span>
        <div className="text-left">
          <p className="font-heading text-[9px] tracking-[0.25em] text-mist/45">ТЕМА АРХІВУ</p>
          <p className="font-heading text-xs tracking-wider text-ember/90">Golden Brown</p>
        </div>
        {!enabled && (
          <p className="hidden font-body text-[10px] italic text-mist/40 sm:block">
            Увімкни звук ↑
          </p>
        )}
      </div>
    </motion.div>
  )
}
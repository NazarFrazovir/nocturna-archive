import { motion } from 'framer-motion'
import { useArchiveAudio } from '../../context/ArchiveAudioContext'

export function ThemeNowPlaying() {
  const { enabled, themePlaying } = useArchiveAudio()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="theme-now-playing fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8"
    >
      <div
        className={`flex items-center gap-3 rounded-full border px-4 py-2 backdrop-blur-sm transition-all ${
          themePlaying
            ? 'border-ember/40 bg-obsidian/85 shadow-lg shadow-black/40'
            : 'border-ember/15 bg-obsidian/60'
        }`}
      >
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
            themePlaying ? 'bg-ember/15 text-ember' : 'bg-mist/10 text-mist/40'
          }`}
        >
          {themePlaying ? (
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
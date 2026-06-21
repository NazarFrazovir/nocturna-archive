import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SPOTIFY_TRACK_ID = '2AX5E86cn9n2dgioZEjirI'

export function HeroThemeTrack() {
  const [open, setOpen] = useState(false)

  return (
    <div className="hero-theme-track absolute bottom-8 right-6 z-20 md:bottom-12 md:right-10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="hero-theme-track-toggle flex items-center gap-2 rounded-full border border-ember/25 bg-obsidian/70 px-4 py-2 font-heading text-[10px] tracking-[0.2em] text-ember/80 backdrop-blur-sm transition-all hover:border-ember/45 hover:text-ember"
        aria-expanded={open}
        aria-label={open ? 'Сховати плеєр' : 'Слухати Golden Brown'}
      >
        <span className="text-sm">{open ? '✕' : '♫'}</span>
        <span className="hidden sm:inline">GOLDEN BROWN</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="hero-theme-track-player mt-3 overflow-hidden rounded-xl border border-ember/15 bg-obsidian/90 shadow-2xl shadow-black/50 backdrop-blur-md"
          >
            <div className="border-b border-ember/10 px-4 py-3">
              <p className="font-heading text-[9px] tracking-[0.3em] text-mist/45">ТЕМА АРХІВУ</p>
              <p className="mt-1 font-heading text-sm text-ember">Golden Brown</p>
              <p className="font-body text-xs italic text-mist/55">The Stranglers · Spotify</p>
            </div>
            <iframe
              title="Golden Brown — The Stranglers"
              src={`https://open.spotify.com/embed/track/${SPOTIFY_TRACK_ID}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="block border-0"
              style={{ borderRadius: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { artifacts } from '../../data/artifacts'
import type { Artifact } from '../../data/artifacts'
import { rarityLabels } from '../../data/artifacts'
import { ArtifactCard } from './ArtifactCard'

export function CodexSection() {
  const [selected, setSelected] = useState<Artifact | null>(null)

  return (
    <section id="codex" className="relative px-6 py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,38,53,0.06)_0%,transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl">
        <h2 className="section-title">Кодекс Артефактів</h2>
        <p className="section-subtitle">
          Реліквії століть. Доторкнись — предмет прокинеться.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {artifacts.map((artifact, i) => (
            <ArtifactCard
              key={artifact.id}
              artifact={artifact}
              index={i}
              onSelect={setSelected}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-void/80 p-6 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel shimmer-border max-w-lg rounded-xl p-8"
            >
              <span className="font-heading text-5xl text-ember">{selected.symbol}</span>
              <h3 className="mt-4 font-heading text-2xl">{selected.name}</h3>
              <p className="mt-1 font-heading text-xs tracking-wider text-mist">
                {rarityLabels[selected.rarity]} · {selected.origin}
              </p>
              <p className="mt-4 font-body text-lg leading-relaxed text-mist">
                {selected.description}
              </p>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="mt-6 font-heading text-xs tracking-widest text-ember transition-colors hover:text-white"
              >
                ЗАКРИТИ КОДЕКС
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
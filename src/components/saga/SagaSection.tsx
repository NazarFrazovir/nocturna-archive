import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sagaPremise, sagaActs, sagaThemes } from '../../data/saga'
import { characters } from '../../data/characters'
import { factions } from '../../data/factions'

export function SagaSection() {
  const [activeAct, setActiveAct] = useState(sagaActs[0].id)

  const act = sagaActs.find((a) => a.id === activeAct) ?? sagaActs[0]

  return (
    <section id="saga" className="relative px-6 py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-blood/5 to-void" />
      <div className="relative mx-auto max-w-6xl">
        <h2 className="section-title">{sagaPremise.title}</h2>
        <p className="section-subtitle">{sagaPremise.tagline}</p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel mx-auto max-w-4xl rounded-xl p-8 md:p-10"
        >
          <p className="font-body text-lg leading-relaxed text-mist md:text-xl">{sagaPremise.intro}</p>
          <blockquote className="mt-6 border-l-2 border-blood/40 pl-6 font-body text-base italic text-ember/80 md:text-lg">
            {sagaPremise.centralConflict}
          </blockquote>
        </motion.div>

        {/* Factions */}
        <div className="mt-16">
          <h3 className="mb-8 text-center font-heading text-sm tracking-[0.3em] text-mist/50">
            ТРИ СИЛИ
          </h3>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {factions.map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="shimmer-border rounded-lg border border-ember/10 bg-obsidian/70 p-5"
              >
                <h4 className="font-heading text-lg text-ember">{f.name}</h4>
                <p className="mt-2 font-body text-sm italic text-mist/60">{f.motto}</p>
                <p className="mt-3 font-body text-sm leading-relaxed text-mist">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Acts */}
        <div className="mt-20">
          <h3 className="mb-6 text-center font-heading text-sm tracking-[0.3em] text-mist/50">
            ТРИ АКТИ
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {sagaActs.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setActiveAct(a.id)}
                className={`rounded border px-5 py-2 font-heading text-xs tracking-widest transition-all ${
                  activeAct === a.id
                    ? 'border-ember bg-ember/10 text-ember'
                    : 'border-ember/20 text-mist/50 hover:border-ember/40 hover:text-mist'
                }`}
              >
                АКТ {a.number}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mt-8 rounded-xl border border-ember/10 bg-obsidian/50 p-8"
            >
              <p className="font-heading text-xs tracking-widest text-blood">{act.subtitle}</p>
              <h4 className="mt-2 font-heading text-2xl text-ember">{act.title}</h4>
              <p className="mt-4 font-body text-lg leading-relaxed text-mist">{act.summary}</p>
              <ul className="mt-6 space-y-3">
                {act.events.map((event) => (
                  <li key={event} className="flex gap-3 font-body text-base text-mist/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-ember/60" />
                    {event}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Characters */}
        <div className="mt-20">
          <h3 className="mb-8 text-center font-heading text-sm tracking-[0.3em] text-mist/50">
            ПЕРСОНАЖІ
          </h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {characters.map((c, i) => (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="shimmer-border group rounded-lg border border-ember/10 bg-obsidian/80 p-6 transition-colors hover:border-ember/25"
              >
                <p className="font-heading text-[10px] tracking-widest text-mist/40">{c.role}</p>
                <h4 className="mt-1 font-heading text-xl text-ember">{c.name}</h4>
                <p className="font-heading text-xs tracking-wider text-mist/50">
                  {c.title} · {c.realm}
                </p>
                <p className="mt-3 font-body text-sm leading-relaxed text-mist">{c.description}</p>
                {c.quote && (
                  <p className="mt-4 font-body text-sm italic text-ember/60 opacity-0 transition-opacity group-hover:opacity-100">
                    {c.quote}
                  </p>
                )}
              </motion.article>
            ))}
          </div>
        </div>

        {/* Themes */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {sagaThemes.map((theme) => (
            <span
              key={theme}
              className="rounded-full border border-mist/15 px-4 py-1.5 font-body text-sm italic text-mist/50"
            >
              {theme}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
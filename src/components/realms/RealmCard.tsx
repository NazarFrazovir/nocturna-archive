import { motion } from 'framer-motion'
import type { Realm } from '../../data/realms'

interface Props {
  realm: Realm
  index: number
}

export function RealmCard({ realm, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="shimmer-border group relative overflow-hidden rounded-lg border border-ember/10 bg-obsidian/80 p-6 transition-all duration-500 hover:border-ember/30 hover:shadow-[0_0_40px_rgba(201,162,39,0.08)]"
    >
      <div className="absolute -right-4 -top-4 font-heading text-6xl text-ember/5 transition-colors group-hover:text-ember/10">
        {realm.symbol}
      </div>

      <div className="relative z-10">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-heading text-2xl text-ember">{realm.symbol}</span>
          <span className="rounded-full border border-blood/30 bg-blood/10 px-3 py-0.5 font-heading text-[10px] tracking-wider text-blood">
            {realm.curse}
          </span>
        </div>

        <h3 className="font-heading text-xl tracking-wide">{realm.name}</h3>
        <p className="mt-3 font-body text-base leading-relaxed text-mist">{realm.description}</p>

        <div className="mt-4 flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className={`h-1 w-4 rounded-full transition-colors ${
                i < realm.danger ? 'bg-blood/70' : 'bg-mist/20'
              }`}
            />
          ))}
          <span className="ml-2 font-heading text-[10px] tracking-wider text-mist/50">НЕБЕЗПЕКА</span>
        </div>
      </div>
    </motion.article>
  )
}
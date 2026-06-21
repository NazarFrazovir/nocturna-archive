import { motion } from 'framer-motion'
import type { Realm } from '../../data/realms'

interface Props {
  realm: Realm
  index: number
  isSelected: boolean
  onSelect: (id: string) => void
}

export function RealmCard({ realm, index, isSelected, onSelect }: Props) {
  return (
    <motion.article
      id={`realm-${realm.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onClick={() => onSelect(realm.id)}
      className={`shimmer-border group relative cursor-pointer overflow-hidden rounded-lg border p-6 transition-all duration-500 ${
        isSelected
          ? 'border-ember/50 shadow-[0_0_50px_rgba(201,162,39,0.12)]'
          : 'border-ember/10 hover:border-ember/30 hover:shadow-[0_0_40px_rgba(201,162,39,0.08)]'
      }`}
      style={{
        background: `linear-gradient(135deg, ${realm.color}22 0%, var(--color-obsidian) 60%)`,
      }}
    >
      <div
        className="absolute -right-4 -top-4 font-heading text-6xl transition-colors"
        style={{ color: `${realm.color}33` }}
      >
        {realm.symbol}
      </div>

      <div className="relative z-10">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-heading text-[10px] tracking-widest text-mist/50">{realm.stateType}</span>
          <span className="rounded-full border border-blood/30 bg-blood/10 px-3 py-0.5 font-heading text-[10px] tracking-wider text-blood">
            {realm.curse}
          </span>
        </div>

        <h3 className="font-heading text-xl tracking-wide">{realm.name}</h3>
        <p className="mt-1 font-heading text-xs tracking-wider text-mist/40">{realm.capital}</p>
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
        </div>
      </div>
    </motion.article>
  )
}
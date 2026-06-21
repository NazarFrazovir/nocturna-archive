import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { Artifact } from '../../data/artifacts'
import { rarityLabels } from '../../data/artifacts'

interface Props {
  artifact: Artifact
  index: number
  onSelect: (artifact: Artifact) => void
}

const rarityStyles = {
  common: 'border-mist/20 text-mist',
  cursed: 'border-blood/40 text-blood',
  forbidden: 'border-ember/50 text-ember',
}

export function ArtifactCard({ artifact, index, onSelect }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -12, y: x * 12 })
  }

  const handleLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={() => onSelect(artifact)}
      style={{
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="shimmer-border group cursor-pointer rounded-lg border border-ember/10 bg-obsidian/90 p-5 transition-shadow hover:shadow-[0_0_30px_rgba(201,162,39,0.1)]"
    >
      <div className="flex items-start justify-between">
        <span className="font-heading text-3xl text-ember/80 transition-colors group-hover:text-ember">
          {artifact.symbol}
        </span>
        <span
          className={`rounded border px-2 py-0.5 font-heading text-[9px] tracking-wider ${rarityStyles[artifact.rarity]}`}
        >
          {rarityLabels[artifact.rarity]}
        </span>
      </div>
      <h3 className="mt-3 font-heading text-lg">{artifact.name}</h3>
      <p className="mt-2 font-body text-sm leading-relaxed text-mist">{artifact.description}</p>
      <p className="mt-3 font-heading text-[10px] tracking-wider text-mist/40">
        ПОХОДЖЕННЯ: {artifact.origin}
      </p>
    </motion.div>
  )
}
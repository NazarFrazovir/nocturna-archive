import { motion } from 'framer-motion'
import type { Realm } from '../../data/realms'

interface Props {
  realms: Realm[]
  selected: string | null
  onSelect: (id: string) => void
}

const CX = 150
const CY = 150
const RADIUS = 110

function polarToCart(angleDeg: number, r = RADIUS) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) }
}

export function RealmMap({ realms, selected, onSelect }: Props) {
  const center = { x: CX, y: CY }

  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <svg viewBox="0 0 300 300" className="w-full" aria-label="Мапа семи царств">
        <defs>
          <radialGradient id="mapGlow">
            <stop offset="0%" stopColor="rgba(201,162,39,0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <circle cx={CX} cy={CY} r={RADIUS + 20} fill="url(#mapGlow)" />
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS}
          fill="none"
          stroke="rgba(201,162,39,0.15)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />

        {realms.map((realm) => {
          const pos = polarToCart(realm.mapAngle)
          const isSelected = selected === realm.id
          return (
            <g key={realm.id}>
              <line
                x1={center.x}
                y1={center.y}
                x2={pos.x}
                y2={pos.y}
                stroke={isSelected ? realm.color : 'rgba(107,91,122,0.2)'}
                strokeWidth={isSelected ? 2 : 1}
              />
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={isSelected ? 14 : 10}
                fill={isSelected ? realm.color : 'var(--color-obsidian)'}
                stroke={isSelected ? '#c9a227' : 'rgba(201,162,39,0.3)'}
                strokeWidth={2}
                className="cursor-pointer"
                onClick={() => onSelect(realm.id)}
                whileHover={{ scale: 1.2 }}
                animate={isSelected ? { filter: `drop-shadow(0 0 8px ${realm.glow})` } : {}}
              />
              <text
                x={pos.x}
                y={pos.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none select-none font-heading text-[10px] fill-ember"
                onClick={() => onSelect(realm.id)}
              >
                {realm.symbol}
              </text>
            </g>
          )
        })}

        <circle cx={CX} cy={CY} r={22} fill="var(--color-obsidian)" stroke="rgba(201,162,39,0.4)" strokeWidth="1.5" />
        <text x={CX} y={CY + 1} textAnchor="middle" dominantBaseline="middle" className="font-heading text-[8px] fill-ember/60">
          ЕТЕЛЬ
        </text>
        <text x={CX} y={CY + 10} textAnchor="middle" dominantBaseline="middle" className="font-heading text-[8px] fill-ember/60">
          МОРН
        </text>
      </svg>

      <p className="mt-4 text-center font-body text-sm italic text-mist/50">
        Обери царство на мапі
      </p>
    </div>
  )
}
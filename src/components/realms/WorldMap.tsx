import { motion, AnimatePresence } from 'framer-motion'
import { realms, empireCenter } from '../../data/realms'
import type { Realm } from '../../data/realms'

interface Props {
  selected: string | null
  onSelect: (id: string | null) => void
}

function MapInfoPanel({
  realm,
  onClose,
}: {
  realm: Realm | typeof empireCenter | null
  onClose: () => void
}) {
  if (!realm) return null
  const isEmpire = realm.id === 'ethelmourn'
  const r = realm as Realm

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="glass-panel w-full rounded-lg border border-ember/20 p-5 md:max-w-xs"
    >
      {!isEmpire && (
        <p className="font-heading text-[10px] tracking-widest text-mist/50">{r.stateType}</p>
      )}
      <h3 className="mt-1 font-heading text-xl text-ember">{realm.name}</h3>
      {!isEmpire && (
        <p className="mt-1 font-heading text-xs tracking-wider text-mist/60">
          Столиця: {r.capital}
        </p>
      )}
      {!isEmpire && (
        <span className="mt-2 inline-block rounded border border-blood/30 bg-blood/10 px-2 py-0.5 font-heading text-[9px] tracking-wider text-blood">
          {r.curse}
        </span>
      )}
      <p className="mt-4 font-body text-base leading-relaxed text-mist">{realm.description}</p>
      <p className="mt-3 font-body text-sm italic leading-relaxed text-mist/70">
        {realm.extendedLore}
      </p>
      {!isEmpire && (
        <div className="mt-4 flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className={`h-1 w-3 rounded-full ${i < r.danger ? 'bg-blood/70' : 'bg-mist/20'}`}
            />
          ))}
          <span className="ml-2 font-heading text-[9px] tracking-wider text-mist/40">НЕБЕЗПЕКА</span>
        </div>
      )}
      <button
        type="button"
        onClick={onClose}
        className="mt-5 font-heading text-[10px] tracking-widest text-ember/60 transition-colors hover:text-ember"
      >
        ЗАКРИТИ
      </button>
    </motion.div>
  )
}

function CompassRose() {
  return (
    <g transform="translate(780, 80)" opacity="0.5">
      <circle r="28" fill="none" stroke="#c9a227" strokeWidth="0.5" />
      <path d="M0,-22 L4,0 L0,22 L-4,0 Z" fill="#c9a227" opacity="0.6" />
      <path d="M-22,0 L0,-4 L22,0 L0,4 Z" fill="#c9a227" opacity="0.3" />
      <text y="38" textAnchor="middle" className="font-heading text-[9px] fill-ember/50">
        Пн
      </text>
    </g>
  )
}

export function WorldMap({ selected, onSelect }: Props) {
  const activeRealm =
    selected === empireCenter.id
      ? empireCenter
      : realms.find((r) => r.id === selected) ?? null

  const handleRegionClick = (id: string) => {
    onSelect(selected === id ? null : id)
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_auto]">
      <div className="rpg-map-frame relative overflow-hidden rounded-xl p-3 md:p-5">
        <div className="rpg-map-inner relative overflow-hidden rounded-lg">
          <svg
            viewBox="0 0 900 520"
            className="w-full"
            aria-label="Карта Етельморну"
            role="img"
          >
            <defs>
              <filter id="mapTexture">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                <feDiffuseLighting in="noise" lightingColor="#c9a227" surfaceScale="1.5" result="light">
                  <feDistantLight azimuth="45" elevation="60" />
                </feDiffuseLighting>
                <feBlend in="SourceGraphic" in2="light" mode="multiply" />
              </filter>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(201,162,39,0.04)" strokeWidth="0.5" />
              </pattern>
            </defs>

            <rect width="900" height="520" fill="#0e0c14" />
            <rect width="900" height="520" fill="url(#grid)" />

            {/* Sea labels */}
            <text x="80" y="480" className="font-heading text-[11px] fill-mist/20 italic">
              Східні Води
            </text>
            <text x="720" y="500" className="font-heading text-[11px] fill-mist/20 italic">
              Завіса
            </text>

            {/* Empire center — clickable */}
            <motion.path
              d={empireCenter.mapPath}
              fill={selected === empireCenter.id ? 'rgba(201,162,39,0.25)' : 'rgba(201,162,39,0.08)'}
              stroke={selected === empireCenter.id ? '#c9a227' : 'rgba(201,162,39,0.35)'}
              strokeWidth={selected === empireCenter.id ? 2 : 1}
              strokeDasharray="4 3"
              className="cursor-pointer"
              onClick={() => handleRegionClick(empireCenter.id)}
              whileHover={{ fill: 'rgba(201,162,39,0.18)' }}
              filter="url(#mapTexture)"
            />

            {realms.map((realm) => {
              const isActive = selected === realm.id
              return (
                <g key={realm.id}>
                  <motion.path
                    d={realm.mapPath}
                    fill={isActive ? `${realm.color}cc` : `${realm.color}66`}
                    stroke={isActive ? '#c9a227' : 'rgba(201,162,39,0.25)'}
                    strokeWidth={isActive ? 2.5 : 1}
                    className="cursor-pointer transition-all"
                    onClick={() => handleRegionClick(realm.id)}
                    whileHover={{
                      fill: `${realm.color}aa`,
                      stroke: 'rgba(201,162,39,0.6)',
                    }}
                    style={{
                      filter: isActive ? `drop-shadow(0 0 12px ${realm.glow})` : undefined,
                    }}
                  />
                  {/* Region label */}
                  <text
                    x={realm.labelX}
                    y={realm.labelY}
                    textAnchor="middle"
                    className="pointer-events-none select-none font-heading text-[11px] md:text-[13px]"
                    fill={isActive ? '#e8d48b' : 'rgba(201,162,39,0.7)'}
                    style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
                  >
                    {realm.name}
                  </text>
                  {/* Capital marker */}
                  <circle
                    cx={realm.labelX}
                    cy={realm.labelY + 14}
                    r="2"
                    fill={isActive ? '#c9a227' : 'rgba(201,162,39,0.4)'}
                    className="pointer-events-none"
                  />
                  <text
                    x={realm.labelX}
                    y={realm.labelY + 26}
                    textAnchor="middle"
                    className="pointer-events-none select-none font-body text-[9px] italic"
                    fill="rgba(107,91,122,0.7)"
                  >
                    {realm.capital}
                  </text>
                </g>
              )
            })}

            {/* Empire label */}
            <text
              x={empireCenter.labelX}
              y={empireCenter.labelY}
              textAnchor="middle"
              className="pointer-events-none font-heading text-[10px] fill-ember/50"
            >
              {empireCenter.name}
            </text>

            <CompassRose />

            {/* Decorative border inside SVG */}
            <rect
              x="8"
              y="8"
              width="884"
              height="504"
              fill="none"
              stroke="rgba(201,162,39,0.2)"
              strokeWidth="1"
              rx="4"
            />
            <rect
              x="14"
              y="14"
              width="872"
              height="492"
              fill="none"
              stroke="rgba(201,162,39,0.1)"
              strokeWidth="0.5"
              rx="2"
            />
          </svg>

          {/* Corner ornaments */}
          <span className="pointer-events-none absolute left-5 top-5 font-heading text-ember/20">◆</span>
          <span className="pointer-events-none absolute right-5 top-5 font-heading text-ember/20">◆</span>
          <span className="pointer-events-none absolute bottom-5 left-5 font-heading text-ember/20">◆</span>
          <span className="pointer-events-none absolute bottom-5 right-5 font-heading text-ember/20">◆</span>
        </div>

        <p className="mt-3 text-center font-body text-sm italic text-mist/40">
          Клацни на державу
        </p>
      </div>

      <AnimatePresence mode="wait">
        {activeRealm && (
          <MapInfoPanel
            key={activeRealm.id}
            realm={activeRealm}
            onClose={() => onSelect(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
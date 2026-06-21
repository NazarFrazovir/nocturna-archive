import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { realms, empireCenter, continentCoast, tradeRoutes } from '../../data/realms'
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      className="map-info-panel w-full rounded-xl p-6 lg:max-w-sm"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          {!isEmpire && (
            <p className="font-heading text-[10px] tracking-[0.25em] text-ember/50">{r.stateType}</p>
          )}
          <h3 className="font-heading text-2xl text-ember">{realm.name}</h3>
          {!isEmpire && (
            <p className="mt-1 font-heading text-xs tracking-wider text-mist/50">{r.capital}</p>
          )}
        </div>
        {!isEmpire && (
          <span className="shrink-0 font-heading text-2xl text-ember/30">{r.symbol}</span>
        )}
      </div>
      {!isEmpire && (
        <span className="inline-block rounded border border-blood/40 bg-blood/10 px-3 py-1 font-heading text-[9px] tracking-wider text-blood">
          {r.curse}
        </span>
      )}
      <p className="mt-4 font-body text-base leading-relaxed text-mist">{realm.description}</p>
      <p className="mt-3 font-body text-sm italic leading-relaxed text-mist/65">
        {realm.extendedLore}
      </p>
      {!isEmpire && (
        <div className="mt-5 flex items-center gap-1.5">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className={`h-1.5 w-4 rounded-sm ${i < r.danger ? 'bg-blood/80' : 'bg-mist/15'}`}
            />
          ))}
          <span className="ml-2 font-heading text-[9px] tracking-wider text-mist/35">НЕБЕЗПЕКА</span>
        </div>
      )}
      <button
        type="button"
        onClick={onClose}
        className="mt-6 font-heading text-[10px] tracking-[0.2em] text-ember/50 transition-colors hover:text-ember"
      >
        ✕ ЗАКРИТИ
      </button>
    </motion.div>
  )
}

function CapitalPin({ x, y, active, color }: { x: number; y: number; active: boolean; color?: string }) {
  const fill = active ? '#e8d48b' : color ?? '#c9a227'
  return (
    <g transform={`translate(${x}, ${y})`} className="pointer-events-none">
      {active && (
        <circle r="14" fill={fill} opacity="0.15">
          <animate attributeName="r" values="10;18;10" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2.5s" repeatCount="indefinite" />
        </circle>
      )}
      <path
        d="M0,-9 L5,0 L0,9 L-5,0 Z"
        fill={fill}
        stroke="#0a0a0f"
        strokeWidth="1"
        opacity={active ? 1 : 0.75}
      />
      <circle r="2.5" fill="#0a0a0f" />
    </g>
  )
}

function OrnateCorner({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotate})`} opacity="0.45">
      <path
        d="M0,0 L30,0 M0,0 L0,30 M0,0 C15,5 25,15 30,30"
        fill="none"
        stroke="#c9a227"
        strokeWidth="1.2"
      />
      <circle cx="0" cy="0" r="3" fill="#c9a227" opacity="0.6" />
    </g>
  )
}

function CompassRose() {
  return (
    <g transform="translate(900, 115)" opacity="0.7">
      <circle r="42" fill="rgba(10,8,15,0.6)" stroke="rgba(201,162,39,0.3)" strokeWidth="1" />
      <circle r="36" fill="none" stroke="rgba(201,162,39,0.15)" strokeWidth="0.5" strokeDasharray="3 4" />
      <path d="M0,-32 L6,0 L0,32 L-6,0 Z" fill="rgba(201,162,39,0.7)" />
      <path d="M-32,0 L0,-6 L32,0 L0,6 Z" fill="rgba(201,162,39,0.25)" />
      <path d="M0,-20 L3,0 L0,20 L-3,0 Z" fill="rgba(139,38,53,0.5)" transform="rotate(45)" />
      <path d="M0,-20 L3,0 L0,20 L-3,0 Z" fill="rgba(139,38,53,0.5)" transform="rotate(-45)" />
      <circle r="4" fill="#c9a227" />
      <text y="52" textAnchor="middle" fill="rgba(201,162,39,0.5)" fontSize="9" fontFamily="Cinzel, serif">
        ПІВНІЧ
      </text>
    </g>
  )
}

function MapLabel({
  x,
  y,
  name,
  sub,
  active,
}: {
  x: number
  y: number
  name: string
  sub?: string
  active: boolean
}) {
  return (
    <g className="pointer-events-none select-none">
      <text
        x={x}
        y={y}
        textAnchor="middle"
        fill={active ? '#f0dfa0' : 'rgba(220,200,150,0.85)'}
        fontSize={active ? 14 : 12}
        fontFamily="Cinzel, serif"
        fontWeight={active ? 700 : 400}
        stroke="rgba(10,8,15,0.8)"
        strokeWidth="3"
        paintOrder="stroke"
      >
        {name}
      </text>
      {sub && (
        <text
          x={x}
          y={y + 16}
          textAnchor="middle"
          fill="rgba(107,91,122,0.8)"
          fontSize="9"
          fontFamily="Cormorant Garamond, serif"
          fontStyle="italic"
          stroke="rgba(10,8,15,0.6)"
          strokeWidth="2"
          paintOrder="stroke"
        >
          {sub}
        </text>
      )}
    </g>
  )
}

export function WorldMap({ selected, onSelect }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)

  const activeRealm =
    selected === empireCenter.id
      ? empireCenter
      : realms.find((r) => r.id === selected) ?? null

  const handleClick = (id: string) => {
    onSelect(selected === id ? null : id)
  }

  const isLit = (id: string) => selected === id || hovered === id

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <div className="rpg-map-frame relative flex-1">
        <div className="map-frame-ornament map-frame-ornament--tl" />
        <div className="map-frame-ornament map-frame-ornament--tr" />
        <div className="map-frame-ornament map-frame-ornament--bl" />
        <div className="map-frame-ornament map-frame-ornament--br" />

        <div className="px-4 pt-5 text-center md:px-6">
          <p className="font-heading text-[10px] tracking-[0.45em] text-ember/40">CARTA IMPERII</p>
          <h3 className="font-heading text-lg tracking-[0.2em] text-ember/70 md:text-xl">ЕТЕЛЬМОРН</h3>
        </div>

        <div className="rpg-map-inner map-parchment relative mx-3 mb-3 mt-2 md:mx-5 md:mb-5">
          <div className="map-parchment-base pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
          <div className="map-parchment-grain pointer-events-none absolute inset-0 z-[5]" aria-hidden="true" />
          <div className="map-parchment-stains pointer-events-none absolute inset-0 z-[5]" aria-hidden="true" />
          <div className="map-parchment-burn pointer-events-none absolute inset-0 z-[6]" aria-hidden="true" />
          <div className="map-parchment-crease pointer-events-none absolute inset-0 z-[6]" aria-hidden="true" />
          <div className="map-fog-overlay pointer-events-none absolute inset-0 z-10" />
          <div className="map-vignette pointer-events-none absolute inset-0 z-10" />

          <svg viewBox="0 0 1000 600" className="map-parchment-svg relative z-[2] w-full" style={{ pointerEvents: 'auto' }} aria-label="Карта Етельморну">
            <defs>
              <filter id="paperNoise" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" seed="8" result="noise" />
                <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
                <feBlend in="SourceGraphic" in2="gray" mode="multiply" />
              </filter>
              <pattern id="fiberPattern" width="4" height="4" patternUnits="userSpaceOnUse">
                <rect width="4" height="4" fill="transparent" />
                <path d="M0,4 L4,0" stroke="rgba(80,60,30,0.04)" strokeWidth="0.5" />
              </pattern>
              {realms.map((r) => (
                <linearGradient key={r.id} id={`grad-${r.id}`} x1="0%" y1="0%" x2="60%" y2="100%">
                  <stop offset="0%" stopColor={r.gradientFrom} />
                  <stop offset="100%" stopColor={r.gradientTo} />
                </linearGradient>
              ))}
              <linearGradient id="grad-empire" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(201,162,39,0.2)" />
                <stop offset="100%" stopColor="rgba(139,38,53,0.12)" />
              </linearGradient>
              <radialGradient id="seaGrad" cx="50%" cy="45%" r="65%">
                <stop offset="0%" stopColor="#1e1810" />
                <stop offset="55%" stopColor="#12100c" />
                <stop offset="100%" stopColor="#0a0806" />
              </radialGradient>
              <radialGradient id="stain1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(90,60,25,0.18)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <radialGradient id="stain2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(50,30,15,0.22)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <pattern id="waves" width="40" height="12" patternUnits="userSpaceOnUse">
                <path
                  d="M0,6 Q10,2 20,6 T40,6"
                  fill="none"
                  stroke="rgba(80,120,160,0.06)"
                  strokeWidth="1"
                />
              </pattern>
              <pattern id="mapGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M50,0 L0,0 0,50" fill="none" stroke="rgba(201,162,39,0.03)" strokeWidth="0.5" />
              </pattern>
              <filter id="coastGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="regionGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#c9a227" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* ── Background (no pointer events) ── */}
            <g pointerEvents="none">
              <rect width="1000" height="600" fill="#2a2218" />
              <rect width="1000" height="600" fill="url(#fiberPattern)" />
              <rect width="1000" height="600" fill="url(#seaGrad)" />
              <rect width="1000" height="600" fill="url(#waves)" />
              <rect width="1000" height="600" fill="url(#mapGrid)" />
              <text x="60" y="560" fill="rgba(80,100,140,0.25)" fontSize="13" fontFamily="Cormorant Garamond, serif" fontStyle="italic">
                Західні Води
              </text>
              <text x="820" y="575" fill="rgba(80,100,140,0.25)" fontSize="13" fontFamily="Cormorant Garamond, serif" fontStyle="italic">
                Море Завіси
              </text>
              <path d={continentCoast} fill="rgba(0,0,0,0.5)" transform="translate(6, 8)" />
              <path
                d={continentCoast}
                fill="#1a1610"
                stroke="rgba(120,90,50,0.35)"
                strokeWidth="1.5"
                filter="url(#coastGlow)"
              />
              <path d="M 350,200 L 370,175 L 390,195 L 410,170 L 430,190" fill="none" stroke="rgba(60,50,70,0.4)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 600,350 L 620,325 L 640,345 L 660,320" fill="none" stroke="rgba(60,50,70,0.35)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 480,280 L 495,260 L 510,275 L 525,255 L 540,270" fill="none" stroke="rgba(201,162,39,0.15)" strokeWidth="1" strokeLinecap="round" />
              {tradeRoutes.map((d, i) => (
                <path key={i} d={d} fill="none" stroke="rgba(201,162,39,0.08)" strokeWidth="1" strokeDasharray="4 6" />
              ))}
            </g>

            {/* ── Parchment stains (below interactive) ── */}
            <g pointerEvents="none">
              <ellipse cx="130" cy="470" rx="95" ry="70" fill="url(#stain1)" opacity="0.7" />
              <ellipse cx="870" cy="130" rx="65" ry="50" fill="url(#stain2)" opacity="0.6" />
              <ellipse cx="750" cy="520" rx="55" ry="40" fill="url(#stain1)" opacity="0.5" />
              <ellipse cx="200" cy="100" rx="40" ry="30" fill="rgba(60,35,15,0.12)" />
              <ellipse cx="500" cy="550" rx="120" ry="35" fill="rgba(40,25,10,0.1)" />
              <path d="M 60,300 C 75,285 90,295 85,310 C 80,325 65,320 55,308 C 50,298 55,292 60,300 Z" fill="rgba(30,20,10,0.15)" />
              <path d="M 920,380 C 935,365 948,378 940,395 C 930,410 915,402 908,388 C 905,375 912,368 920,380 Z" fill="rgba(25,15,8,0.18)" />
            </g>

            {/* ── Interactive regions (topmost clickable layer) ── */}
            <g className="map-interactive">
              {realms.map((realm) => {
                const lit = isLit(realm.id)
                return (
                  <g
                    key={realm.id}
                    onMouseEnter={() => setHovered(realm.id)}
                    onMouseLeave={() => setHovered(null)}
                    className="cursor-pointer"
                    onClick={() => handleClick(realm.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${realm.name}, ${realm.stateType}`}
                    onKeyDown={(e) => e.key === 'Enter' && handleClick(realm.id)}
                  >
                    <motion.path
                      d={realm.mapPath}
                      fill={`url(#grad-${realm.id})`}
                      stroke={lit ? '#e8d48b' : 'rgba(201,162,39,0.12)'}
                      strokeWidth={lit ? 2 : 0.8}
                      animate={{ opacity: lit ? 1 : 0.88 }}
                      transition={{ duration: 0.25 }}
                      filter={lit ? 'url(#regionGlow)' : undefined}
                    />
                    {lit && (
                      <path
                        d={realm.mapPath}
                        fill="none"
                        stroke={realm.glow.replace(/[\d.]+\)$/, '0.4)')}
                        strokeWidth="4"
                        opacity="0.6"
                        pointerEvents="none"
                      />
                    )}
                  </g>
                )
              })}
              <g
                onMouseEnter={() => setHovered(empireCenter.id)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
                onClick={() => handleClick(empireCenter.id)}
                role="button"
                tabIndex={0}
                aria-label={empireCenter.name}
                onKeyDown={(e) => e.key === 'Enter' && handleClick(empireCenter.id)}
              >
                <motion.path
                  d={empireCenter.mapPath}
                  fill="url(#grad-empire)"
                  stroke={isLit(empireCenter.id) ? '#c9a227' : 'rgba(201,162,39,0.25)'}
                  strokeWidth={isLit(empireCenter.id) ? 2 : 1}
                  strokeDasharray="5 4"
                  animate={{ opacity: isLit(empireCenter.id) ? 1 : 0.7 }}
                />
                {isLit(empireCenter.id) && (
                  <path
                    d={empireCenter.mapPath}
                    fill="none"
                    stroke="rgba(201,162,39,0.3)"
                    strokeWidth="6"
                    pointerEvents="none"
                  />
                )}
              </g>
            </g>

            {/* ── Frame & parchment wash (no pointer events) ── */}
            <g pointerEvents="none">
              <path d={continentCoast} fill="none" stroke="rgba(201,162,39,0.2)" strokeWidth="1" />
              <rect width="1000" height="600" fill="rgba(180,150,90,0.04)" filter="url(#paperNoise)" opacity="0.6" style={{ mixBlendMode: 'multiply' }} />
              <rect width="1000" height="600" fill="rgba(160,120,60,0.06)" />
              <rect x="20" y="20" width="960" height="560" fill="none" stroke="rgba(120,90,50,0.2)" strokeWidth="1" rx="2" />
              <rect x="26" y="26" width="948" height="548" fill="none" stroke="rgba(120,90,50,0.08)" strokeWidth="0.5" rx="1" />
              <CompassRose />
              <OrnateCorner x={30} y={30} rotate={0} />
              <OrnateCorner x={970} y={30} rotate={90} />
              <OrnateCorner x={30} y={570} rotate={-90} />
              <OrnateCorner x={970} y={570} rotate={180} />
            </g>

            {/* Labels & pins (no pointer events) */}
            <g pointerEvents="none">
            {realms.map((realm) => (
              <g key={`label-${realm.id}`}>
                <CapitalPin
                  x={realm.pinX}
                  y={realm.pinY}
                  active={isLit(realm.id)}
                  color={realm.color}
                />
                <MapLabel
                  x={realm.labelX}
                  y={realm.labelY}
                  name={realm.name}
                  sub={realm.capital}
                  active={isLit(realm.id)}
                />
              </g>
            ))}

            <CapitalPin
              x={empireCenter.pinX}
              y={empireCenter.pinY}
              active={isLit(empireCenter.id)}
            />
            <MapLabel
              x={empireCenter.labelX}
              y={empireCenter.labelY - 10}
              name={empireCenter.name}
              sub="Мертве Серце"
              active={isLit(empireCenter.id)}
            />
            </g>

          </svg>
        </div>

        <p className="pb-4 text-center font-body text-sm italic text-mist/35">
          Наведи курсор · Клацни на державу
        </p>
      </div>

      <div className="lg:w-80 lg:shrink-0">
        <AnimatePresence mode="wait">
          {activeRealm ? (
            <MapInfoPanel
              key={activeRealm.id}
              realm={activeRealm}
              onClose={() => onSelect(null)}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="map-info-panel map-info-panel--empty hidden rounded-xl p-6 lg:block"
            >
              <p className="font-heading text-[10px] tracking-[0.3em] text-ember/30">ЛЕГЕНДА</p>
              <p className="mt-4 font-body text-base italic text-mist/40">
                Обери державу на карті — і Архів відкриє її хроніку.
              </p>
              <div className="mt-6 space-y-2">
                {realms.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleClick(r.id)}
                    className="flex w-full items-center gap-3 rounded border border-transparent px-2 py-1.5 text-left transition-colors hover:border-ember/15 hover:bg-ember/5"
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rotate-45 border border-ember/40"
                      style={{ background: r.gradientFrom }}
                    />
                    <span className="font-heading text-xs tracking-wide text-mist/60">{r.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
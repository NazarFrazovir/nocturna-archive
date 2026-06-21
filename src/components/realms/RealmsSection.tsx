import { useState } from 'react'
import { realms } from '../../data/realms'
import { RealmCard } from './RealmCard'
import { WorldMap } from './WorldMap'
import { useArchiveAudio } from '../../context/ArchiveAudioContext'

export function RealmsSection() {
  const [selected, setSelected] = useState<string | null>(null)
  const { setSelectedRealm } = useArchiveAudio()

  const handleSelect = (id: string | null) => {
    setSelected(id)
    setSelectedRealm(id)
    if (id && id !== 'ethelmourn') {
      const el = document.getElementById(`realm-${id}`)
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  return (
    <section id="realms" className="relative px-6 py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-obsidian/30 to-void" />
      <div className="relative mx-auto max-w-6xl">
        <h2 className="section-title">Карта Етельморну</h2>
        <p className="section-subtitle">
          Сім держав за завісою. Кордони стерті — координати лишились у Архіві.
        </p>

        <WorldMap selected={selected} onSelect={handleSelect} />

        <h3 className="mt-20 text-center font-heading text-sm tracking-[0.3em] text-mist/50">
          ХРОНІКИ ДЕРЖАВ
        </h3>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {realms.map((realm, i) => (
            <RealmCard
              key={realm.id}
              realm={realm}
              index={i}
              isSelected={selected === realm.id}
              onSelect={(id) => handleSelect(id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
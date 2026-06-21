import { useState } from 'react'
import { realms } from '../../data/realms'
import { RealmCard } from './RealmCard'
import { RealmMap } from './RealmMap'

export function RealmsSection() {
  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    setSelected((prev) => (prev === id ? null : id))
    const el = document.getElementById(`realm-${id}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  return (
    <section id="realms" className="relative px-6 py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-obsidian/30 to-void" />
      <div className="relative mx-auto max-w-6xl">
        <h2 className="section-title">Сім Проклятих Царств</h2>
        <p className="section-subtitle">
          Після Війни Останнього Затемнення сім королівств було запечатано за завісою вічної ночі.
          Їхні імена стерто — але Архів пам’ятає.
        </p>

        <div className="mb-16 flex justify-center">
          <RealmMap realms={realms} selected={selected} onSelect={handleSelect} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {realms.map((realm, i) => (
            <RealmCard
              key={realm.id}
              realm={realm}
              index={i}
              isSelected={selected === realm.id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
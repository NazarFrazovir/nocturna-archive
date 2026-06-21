import { useArchiveAudio } from '../../context/ArchiveAudioContext'

export function AudioToggle() {
  const { enabled, toggle } = useArchiveAudio()

  return (
    <button
      type="button"
      onClick={toggle}
      className={`audio-toggle flex items-center gap-2 rounded border px-3 py-1.5 font-heading text-[10px] tracking-[0.2em] transition-all ${
        enabled
          ? 'border-ember/50 bg-ember/10 text-ember'
          : 'border-ember/20 text-mist/50 hover:border-ember/35 hover:text-mist'
      }`}
      aria-label={enabled ? 'Вимкнути звук Архіву' : 'Увімкнути звук Архіву'}
      title={enabled ? 'Звук увімкнено' : 'Увімкнути Архів'}
    >
      <span className={`audio-toggle-icon ${enabled ? 'audio-toggle-icon--on' : ''}`}>
        {enabled ? '◉' : '○'}
      </span>
      <span className="hidden sm:inline">{enabled ? 'АРХІВ' : 'ЗВУК'}</span>
    </button>
  )
}
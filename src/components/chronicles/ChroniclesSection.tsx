import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { chronicles } from '../../data/chronicles'

gsap.registerPlugin(ScrollTrigger)

export function ChroniclesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const progress = progressRef.current
    if (!section || !track || !progress) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const isMobile = window.innerWidth < 768

    if (isMobile) {
      const cards = track.querySelectorAll('.chronicle-card')
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          x: -30,
          duration: 0.6,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
      return
    }

    const scrollWidth = track.scrollWidth - window.innerWidth

    const tween = gsap.to(track, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progress) progress.style.width = `${self.progress * 100}%`
        },
      },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill()
      })
    }
  }, [])

  return (
    <section id="chronicles" ref={sectionRef} className="relative overflow-hidden">
      <div className="px-6 pt-24 md:pt-32">
        <h2 className="section-title">Хроніки Падіння</h2>
        <p className="section-subtitle">
          Від Першої Печаті до сьогодні. Історія, яку стерли — ми зберегли.
        </p>
      </div>

      <div className="hidden px-6 pb-4 md:block">
        <div className="mx-auto h-px max-w-6xl bg-mist/20">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-ember/60 to-blood/60 transition-none"
            style={{ width: '0%' }}
          />
        </div>
      </div>

      <div className="overflow-hidden pb-24 md:pb-32">
        <div
          ref={trackRef}
          className="flex gap-8 px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] md:w-max"
        >
          {chronicles.map((entry, i) => (
            <article
              key={entry.id}
              className="chronicle-card shimmer-border w-[85vw] shrink-0 rounded-xl border border-ember/10 bg-obsidian/80 p-8 md:w-[400px]"
            >
              <span className="font-heading text-xs tracking-[0.3em] text-ember/60">
                {String(i + 1).padStart(2, '0')}
              </span>
              <time className="mt-2 block font-heading text-sm tracking-wider text-blood">
                {entry.year}
              </time>
              <h3 className="mt-3 font-heading text-xl">{entry.title}</h3>
              <p className="mt-4 font-body text-base leading-relaxed text-mist">
                {entry.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
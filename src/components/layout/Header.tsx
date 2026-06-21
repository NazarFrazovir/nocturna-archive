import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { href: '#hero', label: 'Вхід' },
  { href: '#realms', label: 'Царства' },
  { href: '#codex', label: 'Кодекс' },
  { href: '#chronicles', label: 'Хроніки' },
  { href: '#oracle', label: 'Оракул' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-panel py-3 shadow-lg shadow-black/30' : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a
          href="#hero"
          className="font-heading text-lg tracking-widest text-ember transition-colors hover:text-white"
        >
          NOCTURNA
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-base tracking-wide text-mist transition-colors hover:text-ember"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#oracle"
          className="rounded border border-ember/30 px-4 py-1.5 font-heading text-xs tracking-widest text-ember transition-all hover:border-ember hover:bg-ember/10 md:hidden"
        >
          Оракул
        </a>
      </nav>
    </motion.header>
  )
}
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useActiveSection } from '../../hooks/useActiveSection'

const links = [
  { href: '#hero', id: 'hero', label: 'Вхід' },
  { href: '#saga', id: 'saga', label: 'Сага' },
  { href: '#realms', id: 'realms', label: 'Держави' },
  { href: '#inkkeepers', id: 'inkkeepers', label: 'Орден' },
  { href: '#codex', id: 'codex', label: 'Кодекс' },
  { href: '#chronicles', id: 'chronicles', label: 'Хроніки' },
  { href: '#oracle', id: 'oracle', label: 'Оракул' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-500 ${
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

          <ul className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative font-body text-base tracking-wide transition-colors ${
                    active === link.id ? 'text-ember' : 'text-mist hover:text-ember'
                  }`}
                >
                  {link.label}
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-ember"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2 lg:hidden"
            aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
          >
            <span className={`block h-px w-6 bg-ember transition-transform ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block h-px w-6 bg-ember transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-ember transition-transform ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-void/95 backdrop-blur-md lg:hidden"
          >
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex flex-col items-center gap-8"
            >
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-heading text-2xl tracking-widest ${
                      active === link.id ? 'text-ember' : 'text-mist'
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
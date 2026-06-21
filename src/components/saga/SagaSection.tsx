import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  sagaPremise,
  sagaThemes,
  sagaBooks,
  getChaptersByBook,
  getAdjacentChapters,
} from '../../data/saga'
import type { SagaBook, SagaChapter } from '../../data/saga'
import { characters } from '../../data/characters'
import { factions } from '../../data/factions'
import { useArchiveProgress } from '../../hooks/useArchiveProgress'

type SagaView = 'library' | 'toc' | 'read'

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']

const HIDDEN_MARGINALIA: Record<string, string> = {
  'b3-epilogue':
    'Торен не договорив. Останнє слово ще не висохло — воно чекає на тебе, не на сторінку.',
}

function chapterLabel(ch: SagaChapter): string {
  if (ch.type === 'prologue') return 'Пролог'
  if (ch.type === 'epilogue') return 'Епілог'
  return `Глава ${ROMAN[(ch.number ?? 1) - 1]}`
}

function povArticleClass(povCharacterId: string): string {
  if (povCharacterId === 'mirren-thorn') return 'saga-pov-unreliable'
  if (povCharacterId === 'nameless-king') return 'saga-pov-wall'
  return ''
}

export function SagaSection() {
  const [view, setView] = useState<SagaView>('library')
  const [activeBook, setActiveBook] = useState<SagaBook | null>(null)
  const [activeChapter, setActiveChapter] = useState<SagaChapter | null>(null)
  const [isRevisit, setIsRevisit] = useState(false)
  const { markChapterRead, isChapterRead } = useArchiveProgress()

  const openBook = useCallback((book: SagaBook) => {
    setActiveBook(book)
    setView('toc')
  }, [])

  const openChapter = useCallback((chapter: SagaChapter) => {
    setIsRevisit(isChapterRead(chapter.id))
    setActiveChapter(chapter)
    setView('read')
  }, [isChapterRead])

  useEffect(() => {
    if (view === 'read' && activeChapter) {
      markChapterRead(activeChapter.id)
    }
  }, [view, activeChapter, markChapterRead])

  const backToLibrary = useCallback(() => {
    setView('library')
    setActiveBook(null)
    setActiveChapter(null)
  }, [])

  const backToToc = useCallback(() => {
    setView('toc')
    setActiveChapter(null)
  }, [])

  const adjacent = activeChapter ? getAdjacentChapters(activeChapter.id) : { prev: null, next: null }

  return (
    <section id="saga" className="relative px-6 py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-blood/5 to-void" />
      <div className="relative mx-auto max-w-6xl">
        <AnimatePresence mode="wait">
          {view === 'library' && (
            <motion.div
              key="library"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="section-title">{sagaPremise.title}</h2>
              <p className="section-subtitle">{sagaPremise.tagline}</p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="saga-leather-cover mx-auto max-w-3xl rounded-xl p-8 md:p-12"
              >
                <p className="saga-book-text text-lg leading-relaxed md:text-xl">{sagaPremise.intro}</p>
                <blockquote className="mt-6 border-l-2 border-blood/40 pl-6 font-body text-base italic text-ember/80 md:text-lg">
                  {sagaPremise.centralConflict}
                </blockquote>
              </motion.div>

              <div className="mt-16">
                <h3 className="mb-8 text-center font-heading text-sm tracking-[0.3em] text-mist/50">
                  ТРИ КНИГИ
                </h3>
                <div className="grid gap-6 md:grid-cols-3">
                  {sagaBooks.map((book, i) => (
                    <motion.button
                      key={book.id}
                      type="button"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => openBook(book)}
                      className="saga-book-spine group text-left"
                    >
                      <span className="font-heading text-[10px] tracking-[0.4em] text-mist/40">
                        {book.subtitle.toUpperCase()}
                      </span>
                      <h4 className="mt-2 font-heading text-xl text-ember transition-colors group-hover:text-white md:text-2xl">
                        {book.title}
                      </h4>
                      <p className="mt-3 font-body text-sm leading-relaxed text-mist/70">
                        {book.summary}
                      </p>
                      <span className="mt-4 inline-block font-heading text-[10px] tracking-widest text-ember/60 transition-colors group-hover:text-ember">
                        ВІДКРИТИ ЗМІСТ →
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mt-20">
                <h3 className="mb-8 text-center font-heading text-sm tracking-[0.3em] text-mist/50">
                  ТРИ СИЛИ
                </h3>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                  {factions.map((f, i) => (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="shimmer-border rounded-lg border border-ember/10 bg-obsidian/70 p-5"
                    >
                      <h4 className="font-heading text-lg text-ember">{f.name}</h4>
                      <p className="mt-2 font-body text-sm italic text-mist/60">{f.motto}</p>
                      <p className="mt-3 font-body text-sm leading-relaxed text-mist">{f.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-20">
                <h3 className="mb-8 text-center font-heading text-sm tracking-[0.3em] text-mist/50">
                  ПЕРСОНАЖІ
                </h3>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {characters.map((c, i) => (
                    <motion.article
                      key={c.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className={`shimmer-border group overflow-hidden rounded-lg border bg-obsidian/80 transition-colors hover:border-ember/25 ${
                        c.appearsLate ? 'border-mist/10 opacity-80' : 'border-ember/10'
                      }`}
                    >
                      <div className="saga-character-portrait relative aspect-[3/4] overflow-hidden">
                        <img
                          src={c.portrait}
                          alt={c.name}
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="saga-character-portrait-vignette absolute inset-0" />
                      </div>
                      <div className="p-6">
                      <div className="flex items-center gap-2">
                        <p className="font-heading text-[10px] tracking-widest text-mist/40">{c.role}</p>
                        {c.isPov && (
                          <span className="rounded border border-ember/20 px-1.5 py-0.5 font-heading text-[8px] tracking-wider text-ember/70">
                            POV
                          </span>
                        )}
                        {c.appearsLate && (
                          <span className="rounded border border-mist/20 px-1.5 py-0.5 font-heading text-[8px] tracking-wider text-mist/50">
                            КІНЕЦЬ
                          </span>
                        )}
                      </div>
                      <h4 className="mt-1 font-heading text-xl text-ember">{c.name}</h4>
                      <p className="font-heading text-xs tracking-wider text-mist/50">
                        {c.title} · {c.realm}
                      </p>
                      <p className="mt-3 font-body text-sm leading-relaxed text-mist">{c.description}</p>
                      {c.quote && (
                        <p className="mt-4 font-body text-sm italic text-ember/60 opacity-0 transition-opacity group-hover:opacity-100">
                          {c.quote}
                        </p>
                      )}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>

              <div className="mt-16 flex flex-wrap justify-center gap-3">
                {sagaThemes.map((theme) => (
                  <span
                    key={theme}
                    className="rounded-full border border-mist/15 px-4 py-1.5 font-body text-sm italic text-mist/50"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'toc' && activeBook && (
            <motion.div
              key="toc"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <button
                type="button"
                onClick={backToLibrary}
                className="mb-8 font-heading text-xs tracking-widest text-mist/50 transition-colors hover:text-ember"
              >
                ← БІБЛІОТЕКА
              </button>

              <div className="saga-leather-cover rounded-xl p-8 md:p-10">
                <p className="font-heading text-[10px] tracking-[0.4em] text-mist/40">
                  {activeBook.subtitle.toUpperCase()}
                </p>
                <h3 className="mt-2 font-heading text-3xl text-ember md:text-4xl">{activeBook.title}</h3>
                <p className="mt-4 max-w-2xl font-body text-lg italic text-mist/70">{activeBook.summary}</p>

                <div className="mt-10 border-t border-ember/10 pt-8">
                  <h4 className="mb-6 font-heading text-xs tracking-[0.3em] text-mist/50">ЗМІСТ</h4>
                  <ol className="space-y-2">
                    {getChaptersByBook(activeBook.id).map((ch) => (
                      <li key={ch.id}>
                        <button
                          type="button"
                          onClick={() => openChapter(ch)}
                          className={`saga-toc-item group w-full text-left ${
                            isChapterRead(ch.id) ? 'saga-toc-item--read' : ''
                          }`}
                        >
                          <span className="font-heading text-xs tracking-wider text-ember/70">
                            {isChapterRead(ch.id) && (
                              <span className="mr-1.5 text-ember/40">✓</span>
                            )}
                            {chapterLabel(ch)}
                          </span>
                          <span className="mx-3 hidden flex-1 border-b border-dotted border-mist/15 sm:block" />
                          <span className="font-body text-base text-mist transition-colors group-hover:text-white sm:flex-1">
                            {ch.title}
                          </span>
                          <span className="mt-1 block font-body text-xs text-mist/40 sm:mt-0 sm:text-right">
                            {ch.pov}
                            {ch.realmName && ` · ${ch.realmName}`}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'read' && activeChapter && activeBook && (
            <motion.div
              key={activeChapter.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={backToToc}
                  className="font-heading text-xs tracking-widest text-mist/50 transition-colors hover:text-ember"
                >
                  ← {activeBook.title.toUpperCase()}
                </button>
                <span className="font-heading text-[10px] tracking-widest text-mist/40">
                  {chapterLabel(activeChapter)}
                </span>
              </div>

              <article
                className={`saga-page mx-auto max-w-2xl ${povArticleClass(activeChapter.povCharacterId)}`}
              >
                {(() => {
                  const povChar = characters.find((c) => c.id === activeChapter.povCharacterId)
                  if (!povChar) return null
                  return (
                    <div className="saga-chapter-portrait mx-auto mb-8 h-20 w-20 overflow-hidden rounded-full border border-ember/20">
                      <img
                        src={povChar.portrait}
                        alt={povChar.name}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                  )
                })()}

                <header className="saga-page-header text-center">
                  <p className="font-heading text-[10px] tracking-[0.35em] text-mist/45">
                    {activeBook.subtitle.toUpperCase()} · {chapterLabel(activeChapter).toUpperCase()}
                  </p>
                  <h3 className="mt-4 font-heading text-2xl text-ember md:text-3xl">
                    {activeChapter.title}
                  </h3>
                  <p className="mt-3 font-body text-sm italic text-mist/60">
                    {activeChapter.pov}
                    {activeChapter.realmName && ` — ${activeChapter.realmName}`}
                  </p>
                  {activeChapter.realmId && (
                    <a
                      href="#realms"
                      className="mt-2 inline-block font-heading text-[9px] tracking-widest text-ember/40 transition-colors hover:text-ember/70"
                    >
                      ДЕРЖАВА НА КАРТІ →
                    </a>
                  )}
                </header>

                <div className="saga-page-body mt-10 space-y-6">
                  {activeChapter.paragraphs.map((para, i) => (
                    <p key={i} className="saga-book-text text-lg leading-[1.85] md:text-xl md:leading-[1.9]">
                      {i === 0 ? (
                        <>
                          <span className="saga-drop-cap">{para[0]}</span>
                          {para.slice(1)}
                        </>
                      ) : (
                        para
                      )}
                    </p>
                  ))}
                </div>

                {activeChapter.marginalia && (
                  <aside className="saga-marginalia mt-10">
                    <p className="font-heading text-[9px] tracking-[0.25em] text-mist/35">ПРИМІТКА АРХІВУ</p>
                    <p className="mt-2 font-body text-sm italic leading-relaxed text-mist/55">
                      {activeChapter.marginalia}
                    </p>
                    {isRevisit && HIDDEN_MARGINALIA[activeChapter.id] && (
                      <p className="saga-marginalia-hidden mt-4 font-body text-sm italic leading-relaxed text-ember/50">
                        {HIDDEN_MARGINALIA[activeChapter.id]}
                      </p>
                    )}
                  </aside>
                )}

                <footer className="saga-page-footer mt-12 flex items-center justify-between border-t border-ember/10 pt-6">
                  <button
                    type="button"
                    disabled={!adjacent.prev}
                    onClick={() => adjacent.prev && openChapter(adjacent.prev)}
                    className="font-heading text-xs tracking-widest text-mist/50 transition-colors hover:text-ember disabled:invisible"
                  >
                    ← ПОПЕРЕДНЯ
                  </button>
                  <span className="font-heading text-[10px] tracking-widest text-mist/30">
                    {activeChapter.realmName ?? 'АРХІВ'}
                  </span>
                  <button
                    type="button"
                    disabled={!adjacent.next}
                    onClick={() => adjacent.next && openChapter(adjacent.next)}
                    className="font-heading text-xs tracking-widest text-mist/50 transition-colors hover:text-ember disabled:invisible"
                  >
                    НАСТУПНА →
                  </button>
                </footer>
              </article>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
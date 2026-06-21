import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="relative border-t border-ember/10 bg-obsidian/50 px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="font-heading text-sm tracking-[0.3em] text-ember/60">
          ОРДЕН ЧОРНИЛЬНИКІВ
        </p>
        <blockquote className="mt-6 font-body text-xl italic leading-relaxed text-mist">
          «Історію не пишемо — зберігаємо те, що вона намагається поховати.
          Кожна сторінка — пам’ять, яку світ забув першим.»
        </blockquote>
        <p className="mt-8 font-heading text-xs tracking-widest text-mist/50">
          АРХІВ НОКТУРНИ · ЕТЕЛЬМОРН · ВСІ ПРАВА ПОХОВАНІ
        </p>
      </motion.div>
    </footer>
  )
}
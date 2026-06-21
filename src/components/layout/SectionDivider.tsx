import { motion } from 'framer-motion'

export function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="mx-auto flex max-w-md items-center gap-4 px-6 py-8"
      aria-hidden="true"
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-ember/30" />
      <span className="font-heading text-xs tracking-[0.4em] text-ember/40">◆</span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-ember/30" />
    </motion.div>
  )
}
import { motion } from 'framer-motion'

export default function AnimatedPill() {
  return (
    <motion.div
      layoutId="pill-indicator"
      className="absolute inset-0 rounded-md bg-background shadow"
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    />
  )
}

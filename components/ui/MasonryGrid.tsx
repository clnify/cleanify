'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface MasonryGridProps {
  children: ReactNode
  className?: string
}

export function MasonryGrid({ children, className = '' }: MasonryGridProps) {
  return (
    <motion.div
      className={`masonry-grid ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.04 } },
      }}
    >
      {children}
    </motion.div>
  )
}

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
}

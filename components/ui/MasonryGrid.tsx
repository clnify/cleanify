'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface MasonryGridProps {
  children: ReactNode
  className?: string
  landscape?: boolean   // true = PC wallpapers (16/9), false = mobile (9/16)
}

export function MasonryGrid({ children, className = '', landscape = false }: MasonryGridProps) {
  const gridClass = landscape ? 'masonry-grid-landscape' : 'masonry-grid'
  return (
    <motion.div
      className={`${gridClass} ${className}`}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
    >
      {children}
    </motion.div>
  )
}

export const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

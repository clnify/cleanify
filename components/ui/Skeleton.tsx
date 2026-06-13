'use client'

import { motion } from 'framer-motion'

interface SkeletonCardProps {
  aspectRatio?: '9/16' | '16/9' | '1/1'
  className?: string
}

export function SkeletonCard({ aspectRatio = '9/16', className = '' }: SkeletonCardProps) {
  return (
    <motion.div
      className={`rounded-2xl overflow-hidden ${className}`}
      style={{
        aspectRatio,
        background: 'var(--surface-2)',
      }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export function SkeletonGrid({ count = 12, aspectRatio = '9/16' as const }) {
  return (
    <div className="masonry-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} aspectRatio={aspectRatio} />
      ))}
    </div>
  )
}

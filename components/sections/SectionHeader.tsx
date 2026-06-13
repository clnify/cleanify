'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionHeaderProps {
  title: string
  description?: string
  viewAllHref?: string
  viewAllLabel?: string
  children?: ReactNode
}

export function SectionHeader({ title, description, viewAllHref, viewAllLabel = 'View all', children }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-6 gap-4">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>
          {title}
        </h2>
        {description && (
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{description}</p>
        )}
      </motion.div>

      <div className="flex items-center gap-3 shrink-0">
        {children}
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-sm font-medium transition-opacity hover:opacity-70 flex items-center gap-1"
            style={{ color: 'var(--accent)' }}
          >
            {viewAllLabel} <span>→</span>
          </Link>
        )}
      </div>
    </div>
  )
}

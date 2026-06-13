'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageHeroProps {
  title: string
  description?: string
  badge?: string
  children?: ReactNode
}

export function PageHero({ title, description, badge, children }: PageHeroProps) {
  return (
    <section style={{ paddingTop: '88px', paddingBottom: '32px', padding: '88px 24px 32px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'inline-block', padding: '3px 12px', borderRadius: '100px',
              background: '#f5f5f7', border: '1px solid #e8e8ed',
              fontSize: '12px', color: '#6e6e73', marginBottom: '12px',
            }}
          >
            {badge}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 }}
          style={{
            fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 700,
            letterSpacing: '-0.02em', color: '#1d1d1f', lineHeight: 1.1,
            marginBottom: description ? '8px' : 0,
          }}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            style={{ fontSize: '14px', color: '#6e6e73', lineHeight: '1.55', maxWidth: '480px' }}
          >
            {description}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  )
}

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
    <section style={{ paddingTop: '96px', paddingBottom: '40px', paddingLeft: '20px', paddingRight: '20px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '4px 12px', borderRadius: '100px',
              background: '#f5f5f7', border: '1px solid #e8e8ed',
              fontSize: '12px', color: '#6e6e73', marginBottom: '14px',
            }}
          >
            {badge}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.04 }}
          style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#1d1d1f',
            lineHeight: 1.1,
            marginBottom: description ? '10px' : 0,
          }}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            style={{
              fontSize: '15px',
              color: '#6e6e73',
              lineHeight: '1.55',
              maxWidth: '520px',
              marginBottom: children ? '20px' : 0,
            }}
          >
            {description}
          </motion.p>
        )}

        {children}
      </div>
    </section>
  )
}

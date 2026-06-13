'use client'

import Link from 'next/link'
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
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '20px', gap: '12px' }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.01em', color: '#1d1d1f' }}>{title}</h2>
        {description && (
          <p style={{ fontSize: '13px', color: '#6e6e73', marginTop: '2px' }}>{description}</p>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        {children}
        {viewAllHref && (
          <Link href={viewAllHref} style={{ fontSize: '13px', fontWeight: 500, color: '#0071e3', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            {viewAllLabel} →
          </Link>
        )}
      </div>
    </div>
  )
}

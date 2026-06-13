'use client'

import Link from 'next/link'

interface Section {
  title: string
  description: string
  href: string
}

interface HubPageClientProps {
  title: string
  description: string
  sections: Section[]
}

export function HubPageClient({ title, description, sections }: HubPageClientProps) {
  return (
    <div style={{ paddingTop: '96px', paddingBottom: '80px', padding: '96px 24px 80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#1d1d1f', marginBottom: '6px' }}>
          {title}
        </h1>
        <p style={{ fontSize: '15px', color: '#6e6e73', marginBottom: '32px' }}>
          {description}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {sections.map(s => (
            <Link key={s.href} href={s.href} style={{
              display: 'block', padding: '22px', borderRadius: '14px', textDecoration: 'none',
              background: '#f5f5f7', border: '1px solid #e8e8ed',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; el.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = ''; el.style.transform = '' }}
            >
              <h2 style={{ fontWeight: 600, fontSize: '14px', color: '#1d1d1f', marginBottom: '4px' }}>{s.title}</h2>
              <p style={{ fontSize: '13px', color: '#6e6e73' }}>{s.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

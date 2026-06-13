'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Wallpaper } from '@/types'
import { MasonryGrid } from '@/components/ui/MasonryGrid'
import { WallpaperCard } from '@/components/wallpapers/WallpaperCard'
import { PageHero } from '@/components/sections/PageHero'

const ALL_FILTERS = [
  { value: 'all',       label: 'All' },
  { value: 'dark',      label: 'Dark' },
  { value: 'light',     label: 'Light' },
  { value: 'colorful',  label: 'Colorful' },
  { value: 'minimal',   label: 'Minimal' },
  { value: 'gradient',  label: 'Gradient' },
  { value: 'nature',    label: 'Nature' },
  { value: 'abstract',  label: 'Abstract' },
  { value: 'geometric', label: 'Geometric' },
  { value: 'ai',        label: 'AI Art' },
]

interface Props {
  wallpapers: (Wallpaper & { gradient?: string })[]
  device: 'mobile' | 'pc'
  title: string
  description: string
}

export function WallpapersPageClient({ wallpapers, device, title, description }: Props) {
  const [filter, setFilter] = useState('all')
  const [page,   setPage]   = useState(1)
  const perPage = 24
  const isLandscape = device === 'pc'

  const filtered = useMemo(() => {
    if (filter === 'all') return wallpapers
    return wallpapers.filter(w =>
      w.colors?.includes(filter as Wallpaper['colors'][number]) ||
      w.tags?.includes(filter)
    )
  }, [wallpapers, filter])

  const visible = filtered.slice(0, page * perPage)
  const hasMore = visible.length < filtered.length

  return (
    <div>
      <PageHero title={title} description={description} badge={`${wallpapers.length} wallpapers`} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* Tous les filtres sur une seule ligne */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}
        >
          {ALL_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => { setFilter(f.value); setPage(1) }}
              style={{
                padding: '6px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 500,
                border: 'none', cursor: 'pointer', transition: 'background 0.15s, color 0.15s',
                background: filter === f.value ? '#1d1d1f' : '#f5f5f7',
                color:      filter === f.value ? '#ffffff' : '#1d1d1f',
              }}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Compteur */}
        <p style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '20px' }}>
          {filtered.length} wallpaper{filtered.length !== 1 ? 's' : ''}{filter !== 'all' ? ` · ${filter}` : ''}
        </p>

        {/* Grid */}
        <MasonryGrid landscape={isLandscape}>
          {visible.map(w => <WallpaperCard key={w.id} wallpaper={w} />)}
        </MasonryGrid>

        {/* Load more */}
        {hasMore && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <button
              onClick={() => setPage(p => p + 1)}
              style={{
                padding: '10px 28px', borderRadius: '100px', fontSize: '14px', fontWeight: 500,
                background: '#f5f5f7', color: '#1d1d1f', border: '1px solid #e8e8ed', cursor: 'pointer',
              }}
            >
              Load more ({filtered.length - visible.length} remaining)
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontWeight: 500, color: '#1d1d1f', marginBottom: '4px' }}>No wallpapers found</p>
            <p style={{ fontSize: '13px', color: '#6e6e73' }}>Try a different filter</p>
          </div>
        )}
      </div>
    </div>
  )
}

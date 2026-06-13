'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Wallpaper } from '@/types'
import { MasonryGrid } from '@/components/ui/MasonryGrid'
import { WallpaperCard } from '@/components/wallpapers/WallpaperCard'
import { FilterBar } from '@/components/ui/FilterBar'
import { PageHero } from '@/components/sections/PageHero'

const colorOptions = [
  { value: 'all', label: 'All' },
  { value: 'dark', label: 'Dark', icon: '🌑' },
  { value: 'light', label: 'Light', icon: '☀️' },
  { value: 'colorful', label: 'Colorful', icon: '🌈' },
  { value: 'minimal', label: 'Minimal', icon: '◻️' },
  { value: 'gradient', label: 'Gradient', icon: '🎨' },
]

const tagOptions = [
  { value: 'all', label: 'All' },
  { value: 'nature', label: 'Nature' },
  { value: 'abstract', label: 'Abstract' },
  { value: 'geometric', label: 'Geometric' },
  { value: 'photography', label: 'Photo' },
  { value: 'ai', label: 'AI Art' },
]

interface WallpapersPageClientProps {
  wallpapers: (Wallpaper & { gradient?: string })[]
  device: 'mobile' | 'pc'
  title: string
  description: string
}

export function WallpapersPageClient({ wallpapers, device, title, description }: WallpapersPageClientProps) {
  const [colorFilter, setColorFilter] = useState('all')
  const [tagFilter, setTagFilter] = useState('all')
  const [page, setPage] = useState(1)
  const perPage = 24

  const filtered = useMemo(() => {
    return wallpapers.filter(w => {
      const colorMatch = colorFilter === 'all' || w.colors?.includes(colorFilter as Wallpaper['colors'][number])
      const tagMatch = tagFilter === 'all' || w.tags?.includes(tagFilter)
      return colorMatch && tagMatch
    })
  }, [wallpapers, colorFilter, tagFilter])

  const visible = filtered.slice(0, page * perPage)
  const hasMore = visible.length < filtered.length

  return (
    <div>
      <PageHero title={title} description={description} badge={`${wallpapers.length} wallpapers`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3 mb-8"
        >
          <FilterBar
            options={colorOptions}
            value={colorFilter}
            onChange={v => { setColorFilter(v); setPage(1) }}
            label="Color:"
          />
          <FilterBar
            options={tagOptions}
            value={tagFilter}
            onChange={v => { setTagFilter(v); setPage(1) }}
            label="Style:"
          />
        </motion.div>

        {/* Count */}
        <div className="text-sm mb-5" style={{ color: 'var(--muted)' }}>
          {filtered.length} wallpaper{filtered.length !== 1 ? 's' : ''}
          {colorFilter !== 'all' || tagFilter !== 'all' ? ' (filtered)' : ''}
        </div>

        {/* Grid */}
        <MasonryGrid>
          {visible.map(w => (
            <WallpaperCard key={w.id} wallpaper={w} />
          ))}
        </MasonryGrid>

        {/* Load more */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <motion.button
              onClick={() => setPage(p => p + 1)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-full text-sm font-medium cursor-pointer transition-colors"
              style={{ background: 'var(--surface-2)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
            >
              Load more ({filtered.length - visible.length} remaining)
            </motion.button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium" style={{ color: 'var(--foreground)' }}>No wallpapers found</p>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Try clearing your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

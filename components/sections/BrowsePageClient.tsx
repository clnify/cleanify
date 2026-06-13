'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Wallpaper, Widget, RainmeterSkin } from '@/types'
import { MasonryGrid } from '@/components/ui/MasonryGrid'
import { WallpaperCard } from '@/components/wallpapers/WallpaperCard'
import { WidgetCard } from '@/components/widgets/WidgetCard'
import { RainmeterCard } from '@/components/rainmeter/RainmeterCard'
import { FilterBar } from '@/components/ui/FilterBar'
import { PageHero } from '@/components/sections/PageHero'

type ContentType = 'all' | 'wallpapers' | 'widgets' | 'rainmeter'
type DeviceFilter = 'all' | 'mobile' | 'pc'

interface BrowsePageClientProps {
  wallpapers: (Wallpaper & { gradient?: string })[]
  widgets: (Widget & { gradient?: string })[]
  skins: (RainmeterSkin & { gradient?: string })[]
}

const typeOptions = [
  { value: 'all', label: 'Everything' },
  { value: 'wallpapers', label: 'Wallpapers', icon: '🖼️' },
  { value: 'widgets', label: 'Widgets', icon: '⚡' },
  { value: 'rainmeter', label: 'Rainmeter', icon: '🎨' },
]

const deviceOptions = [
  { value: 'all', label: 'All Devices' },
  { value: 'mobile', label: 'Mobile', icon: '📱' },
  { value: 'pc', label: 'PC', icon: '🖥️' },
]

export function BrowsePageClient({ wallpapers, widgets, skins }: BrowsePageClientProps) {
  const [type, setType] = useState<ContentType>('all')
  const [device, setDevice] = useState<DeviceFilter>('all')
  const [page, setPage] = useState(1)
  const perPage = 30

  const allItems = useMemo(() => {
    const items: Array<{ kind: 'wallpaper' | 'widget' | 'rainmeter'; data: (Wallpaper | Widget | RainmeterSkin) & { gradient?: string } }> = []

    if (type === 'all' || type === 'wallpapers') {
      wallpapers.forEach(w => {
        if (device === 'all' || w.device === device) {
          items.push({ kind: 'wallpaper', data: w })
        }
      })
    }
    if ((type === 'all' || type === 'widgets') && (device === 'all' || device === 'mobile')) {
      widgets.forEach(w => items.push({ kind: 'widget', data: w }))
    }
    if ((type === 'all' || type === 'rainmeter') && (device === 'all' || device === 'pc')) {
      skins.forEach(s => items.push({ kind: 'rainmeter', data: s }))
    }

    return items
  }, [type, device, wallpapers, widgets, skins])

  const visible = allItems.slice(0, page * perPage)
  const hasMore = visible.length < allItems.length

  const totalCount = allItems.length

  return (
    <div>
      <PageHero
        title="Browse All"
        description="Discover wallpapers, widget setups, and Rainmeter skins in one place."
        badge={`${totalCount} items`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3 mb-8"
        >
          <FilterBar
            options={typeOptions}
            value={type}
            onChange={v => { setType(v as ContentType); setPage(1) }}
            label="Type:"
          />
          <FilterBar
            options={deviceOptions}
            value={device}
            onChange={v => { setDevice(v as DeviceFilter); setPage(1) }}
            label="Device:"
          />
        </motion.div>

        {/* Count */}
        <p className="text-sm mb-5" style={{ color: 'var(--muted)' }}>
          {totalCount} item{totalCount !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        {visible.length > 0 ? (
          <>
            <MasonryGrid>
              {visible.map(item => {
                if (item.kind === 'wallpaper') {
                  return <WallpaperCard key={`w-${item.data.id}`} wallpaper={item.data as Wallpaper & { gradient?: string }} />
                }
                if (item.kind === 'widget') {
                  return <WidgetCard key={`wg-${item.data.id}`} widget={item.data as Widget & { gradient?: string }} />
                }
                return <RainmeterCard key={`rm-${item.data.id}`} skin={item.data as RainmeterSkin & { gradient?: string }} />
              })}
            </MasonryGrid>

            {hasMore && (
              <div className="flex justify-center mt-10">
                <motion.button
                  onClick={() => setPage(p => p + 1)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 rounded-full text-sm font-medium cursor-pointer"
                  style={{ background: 'var(--surface-2)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
                >
                  Load more ({allItems.length - visible.length} remaining)
                </motion.button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium" style={{ color: 'var(--foreground)' }}>Nothing here yet</p>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Try a different filter combination</p>
          </div>
        )}
      </div>
    </div>
  )
}

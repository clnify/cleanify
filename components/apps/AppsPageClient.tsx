'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { App } from '@/types'
import { AppCard } from '@/components/apps/AppCard'
import { FilterBar } from '@/components/ui/FilterBar'
import { PageHero } from '@/components/sections/PageHero'

const platformOptions = [
  { value: 'all', label: 'All Platforms' },
  { value: 'mobile', label: 'Mobile', icon: '📱' },
  { value: 'pc', label: 'PC', icon: '🖥️' },
]

interface AppsPageClientProps {
  apps: App[]
}

export function AppsPageClient({ apps }: AppsPageClientProps) {
  const [platform, setPlatform] = useState('all')
  const [category, setCategory] = useState('all')

  const categories = useMemo(() => {
    const cats = Array.from(new Set(apps.map(a => a.category)))
    return [{ value: 'all', label: 'All Categories' }, ...cats.map(c => ({ value: c, label: c }))]
  }, [apps])

  const filtered = useMemo(() => {
    return apps.filter(a => {
      const platformMatch = platform === 'all' || a.platform === platform
      const catMatch = category === 'all' || a.category === category
      return platformMatch && catMatch
    })
  }, [apps, platform, category])

  const featured = filtered.filter(a => a.featured)
  const rest = filtered.filter(a => !a.featured)

  return (
    <div>
      <PageHero
        title="Customization Apps"
        description="The best tools for iOS and PC customization. Handpicked and always up to date."
        badge={`${apps.length} apps`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3 mb-8"
        >
          <FilterBar options={platformOptions} value={platform} onChange={v => { setPlatform(v); setCategory('all') }} label="Platform:" />
          <FilterBar options={categories} value={category} onChange={setCategory} label="Category:" />
        </motion.div>

        {/* Featured */}
        {featured.length > 0 && (
          <section className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--muted)' }}>
              Featured
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {featured.map((app, i) => (
                <AppCard key={app.id} app={app} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* All apps */}
        {rest.length > 0 && (
          <section>
            {featured.length > 0 && (
              <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--muted)' }}>
                All Apps
              </h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {rest.map((app, i) => (
                <AppCard key={app.id} app={app} index={i + featured.length} />
              ))}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-medium" style={{ color: 'var(--foreground)' }}>No apps found</p>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Try a different filter</p>
          </div>
        )}
      </div>
    </div>
  )
}

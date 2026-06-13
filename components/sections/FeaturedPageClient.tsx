'use client'

import { Wallpaper, Widget, RainmeterSkin, App } from '@/types'
import { MasonryGrid } from '@/components/ui/MasonryGrid'
import { WallpaperCard } from '@/components/wallpapers/WallpaperCard'
import { WidgetCard } from '@/components/widgets/WidgetCard'
import { RainmeterCard } from '@/components/rainmeter/RainmeterCard'
import { AppCard } from '@/components/apps/AppCard'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { PageHero } from '@/components/sections/PageHero'

interface FeaturedPageClientProps {
  wallpapers: (Wallpaper & { gradient?: string })[]
  widgets: (Widget & { gradient?: string })[]
  skins: (RainmeterSkin & { gradient?: string })[]
  apps: App[]
}

export function FeaturedPageClient({ wallpapers, widgets, skins, apps }: FeaturedPageClientProps) {
  const total = wallpapers.length + widgets.length + skins.length + apps.length

  return (
    <div>
      <PageHero
        title="Featured"
        description="Handpicked highlights across wallpapers, widgets, skins, and apps."
        badge={`${total} featured items`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 space-y-16">
        {wallpapers.length > 0 && (
          <section>
            <SectionHeader
              title="Featured Wallpapers"
              viewAllHref="/browse"
              viewAllLabel="Browse all"
            />
            <MasonryGrid>
              {wallpapers.map(w => (
                <WallpaperCard key={w.id} wallpaper={w} />
              ))}
            </MasonryGrid>
          </section>
        )}

        {widgets.length > 0 && (
          <section>
            <SectionHeader
              title="Featured Widgets"
              viewAllHref="/mobile/widgets"
            />
            <MasonryGrid>
              {widgets.map(w => (
                <WidgetCard key={w.id} widget={w} />
              ))}
            </MasonryGrid>
          </section>
        )}

        {skins.length > 0 && (
          <section>
            <SectionHeader
              title="Featured Rainmeter Skins"
              viewAllHref="/pc/rainmeter"
            />
            <MasonryGrid>
              {skins.map(s => (
                <RainmeterCard key={s.id} skin={s} />
              ))}
            </MasonryGrid>
          </section>
        )}

        {apps.length > 0 && (
          <section>
            <SectionHeader
              title="Featured Apps"
              viewAllHref="/apps"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {apps.map((app, i) => (
                <AppCard key={app.id} app={app} index={i} />
              ))}
            </div>
          </section>
        )}

        {total === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">✦</p>
            <p className="font-medium" style={{ color: 'var(--foreground)' }}>No featured content yet</p>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              Add <code className="text-xs px-1 py-0.5 rounded" style={{ background: 'var(--surface-2)' }}>&quot;featured&quot;: true</code> to any content file
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { Widget } from '@/types'
import { MasonryGrid } from '@/components/ui/MasonryGrid'
import { WidgetCard } from '@/components/widgets/WidgetCard'
import { PageHero } from '@/components/sections/PageHero'

interface WidgetsPageClientProps {
  widgets: (Widget & { gradient?: string })[]
}

export function WidgetsPageClient({ widgets }: WidgetsPageClientProps) {
  return (
    <div>
      <PageHero
        title="Widget Setups"
        description="Beautiful home screen widget inspirations for iOS. Curated setups to transform your phone."
        badge={`${widgets.length} setups`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <MasonryGrid>
          {widgets.map(w => (
            <WidgetCard key={w.id} widget={w} />
          ))}
        </MasonryGrid>

        {widgets.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">⚡</p>
            <p className="font-medium" style={{ color: 'var(--foreground)' }}>No widget setups yet</p>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Check back soon or contribute!</p>
          </div>
        )}
      </div>
    </div>
  )
}

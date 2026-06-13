'use client'

import { RainmeterSkin } from '@/types'
import { MasonryGrid } from '@/components/ui/MasonryGrid'
import { RainmeterCard } from '@/components/rainmeter/RainmeterCard'
import { PageHero } from '@/components/sections/PageHero'

interface RainmeterPageClientProps {
  skins: (RainmeterSkin & { gradient?: string })[]
}

export function RainmeterPageClient({ skins }: RainmeterPageClientProps) {
  return (
    <div>
      <PageHero
        title="Rainmeter Skins"
        description="Transform your Windows desktop with stunning Rainmeter skins and setups."
        badge={`${skins.length} skins`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <MasonryGrid>
          {skins.map(s => (
            <RainmeterCard key={s.id} skin={s} />
          ))}
        </MasonryGrid>
      </div>
    </div>
  )
}

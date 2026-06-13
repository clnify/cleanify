import { Metadata } from 'next'
import { getAllWallpapers } from '@/lib/content'
import { demoPCWallpapers } from '@/lib/demo-data'
import { WallpapersPageClient } from '@/components/wallpapers/WallpapersPageClient'
import { Wallpaper } from '@/types'

export const metadata: Metadata = {
  title: 'Desktop Wallpapers',
  description: 'Premium desktop wallpapers for PC and Mac. 4K, ultrawide, minimal designs.',
}

export default function PCWallpapersPage() {
  const real = getAllWallpapers().filter(w => w.device === 'pc')
  const wallpapers = real.length > 0 ? real : demoPCWallpapers

  return (
    <WallpapersPageClient
      wallpapers={wallpapers as (Wallpaper & { gradient?: string })[]}
      device="pc"
      title="Desktop Wallpapers"
      description="4K-ready wallpapers for every screen. From minimalist to stunning."
    />
  )
}

import { Metadata } from 'next'
import { getAllWallpapers } from '@/lib/content'
import { demoMobileWallpapers } from '@/lib/demo-data'
import { WallpapersPageClient } from '@/components/wallpapers/WallpapersPageClient'
import { Wallpaper } from '@/types'

export const metadata: Metadata = {
  title: 'Mobile Wallpapers',
  description: 'Premium iPhone and Android wallpapers. Clean, minimal, and beautiful.',
}

export default function MobileWallpapersPage() {
  const real = getAllWallpapers().filter(w => w.device === 'mobile')
  const wallpapers = real.length > 0 ? real : demoMobileWallpapers

  return (
    <WallpapersPageClient
      wallpapers={wallpapers as (Wallpaper & { gradient?: string })[]}
      device="mobile"
      title="Mobile Wallpapers"
      description="Premium wallpapers for your phone. Minimal, clean, stunning."
    />
  )
}

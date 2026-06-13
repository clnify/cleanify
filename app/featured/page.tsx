import { Metadata } from 'next'
import { getAllWallpapers, getMobileWidgets, getRainmeterSkins, getAllApps } from '@/lib/content'
import {
  demoMobileWallpapers, demoPCWallpapers,
  demoWidgets, demoRainmeterSkins,
  demoMobileApps, demoPCApps,
} from '@/lib/demo-data'
import { FeaturedPageClient } from '@/components/sections/FeaturedPageClient'
import { Wallpaper, Widget, RainmeterSkin, App } from '@/types'

export const metadata: Metadata = {
  title: 'Featured',
  description: 'Handpicked featured wallpapers, widgets, Rainmeter skins, and apps.',
}

export default function FeaturedPage() {
  const wallpapers = (getAllWallpapers().length > 0
    ? getAllWallpapers()
    : [...demoMobileWallpapers, ...demoPCWallpapers]
  ).filter(w => w.featured)

  const widgets = (getMobileWidgets().length > 0
    ? getMobileWidgets()
    : demoWidgets
  ).filter(w => w.featured)

  const skins = (getRainmeterSkins().length > 0
    ? getRainmeterSkins()
    : demoRainmeterSkins
  ).filter(s => s.featured)

  const apps = (getAllApps().length > 0
    ? getAllApps()
    : [...demoMobileApps, ...demoPCApps]
  ).filter(a => a.featured)

  return (
    <FeaturedPageClient
      wallpapers={wallpapers as (Wallpaper & { gradient?: string })[]}
      widgets={widgets as (Widget & { gradient?: string })[]}
      skins={skins as (RainmeterSkin & { gradient?: string })[]}
      apps={apps}
    />
  )
}

import { Metadata } from 'next'
import { getAllWallpapers, getMobileWidgets, getRainmeterSkins } from '@/lib/content'
import {
  demoMobileWallpapers, demoPCWallpapers,
  demoWidgets, demoRainmeterSkins,
} from '@/lib/demo-data'
import { BrowsePageClient } from '@/components/sections/BrowsePageClient'
import { Wallpaper, Widget, RainmeterSkin } from '@/types'

export const metadata: Metadata = {
  title: 'Browse',
  description: 'Browse all wallpapers, widget setups, and Rainmeter skins in one place.',
}

export default function BrowsePage() {
  const realWallpapers = getAllWallpapers()
  const wallpapers = realWallpapers.length > 0
    ? realWallpapers
    : [...demoMobileWallpapers, ...demoPCWallpapers]

  const realWidgets = getMobileWidgets()
  const widgets = realWidgets.length > 0 ? realWidgets : demoWidgets

  const realSkins = getRainmeterSkins()
  const skins = realSkins.length > 0 ? realSkins : demoRainmeterSkins

  return (
    <BrowsePageClient
      wallpapers={wallpapers as (Wallpaper & { gradient?: string })[]}
      widgets={widgets as (Widget & { gradient?: string })[]}
      skins={skins as (RainmeterSkin & { gradient?: string })[]}
    />
  )
}

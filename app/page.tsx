import { Metadata } from 'next'
import { HomepageClient } from '@/components/sections/HomepageClient'
import { getAllWallpapers, getMobileWidgets, getRainmeterSkins, getAllApps } from '@/lib/content'
import {
  demoMobileWallpapers,
  demoPCWallpapers,
  demoWidgets,
  demoRainmeterSkins,
  demoMobileApps,
  demoPCApps,
} from '@/lib/demo-data'

export const metadata: Metadata = {
  title: 'Cleanify — Premium Wallpapers & Customization',
  description: 'Premium wallpapers, widgets, Rainmeter skins, and customization apps. Clean aesthetics for iOS and PC.',
}

export default function HomePage() {
  const realMobileWallpapers = getAllWallpapers().filter(w => w.device === 'mobile')
  const realPCWallpapers = getAllWallpapers().filter(w => w.device === 'pc')
  const realWidgets = getMobileWidgets()
  const realRainmeter = getRainmeterSkins()
  const realApps = getAllApps()

  const mobileWallpapers = realMobileWallpapers.length > 0 ? realMobileWallpapers : demoMobileWallpapers
  const pcWallpapers = realPCWallpapers.length > 0 ? realPCWallpapers : demoPCWallpapers
  const widgets = realWidgets.length > 0 ? realWidgets : demoWidgets
  const rainmeterSkins = realRainmeter.length > 0 ? realRainmeter : demoRainmeterSkins
  const mobileApps = realApps.filter(a => a.platform === 'mobile').length > 0
    ? realApps.filter(a => a.platform === 'mobile')
    : demoMobileApps
  const pcApps = realApps.filter(a => a.platform === 'pc').length > 0
    ? realApps.filter(a => a.platform === 'pc')
    : demoPCApps

  return (
    <HomepageClient
      mobileWallpapers={mobileWallpapers}
      pcWallpapers={pcWallpapers}
      widgets={widgets}
      rainmeterSkins={rainmeterSkins}
      mobileApps={mobileApps}
      pcApps={pcApps}
    />
  )
}

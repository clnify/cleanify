import { MetadataRoute } from 'next'
import { getAllWallpapers, getMobileWidgets, getRainmeterSkins, getAllApps } from '@/lib/content'
import {
  demoMobileWallpapers, demoPCWallpapers,
  demoWidgets, demoRainmeterSkins,
  demoMobileApps, demoPCApps,
} from '@/lib/demo-data'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cleanify.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: SITE_URL, changeFrequency: 'daily' as const, priority: 1 },
    { url: `${SITE_URL}/mobile`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/pc`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/mobile/wallpapers`, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${SITE_URL}/pc/wallpapers`, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${SITE_URL}/mobile/widgets`, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${SITE_URL}/pc/rainmeter`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/mobile/apps`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/pc/apps`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/apps`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/browse`, changeFrequency: 'daily' as const, priority: 0.7 },
    { url: `${SITE_URL}/featured`, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${SITE_URL}/search`, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${SITE_URL}/contribute`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly' as const, priority: 0.5 },
  ]

  const wallpapers = getAllWallpapers().length > 0
    ? getAllWallpapers()
    : [...demoMobileWallpapers, ...demoPCWallpapers]

  const wallpaperPages = wallpapers.map(w => ({
    url: `${SITE_URL}/${w.device === 'pc' ? 'pc' : 'mobile'}/wallpapers/${w.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    lastModified: new Date(w.createdAt),
  }))

  const widgets = getMobileWidgets().length > 0 ? getMobileWidgets() : demoWidgets
  const widgetPages = widgets.map(w => ({
    url: `${SITE_URL}/mobile/widgets/${w.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    lastModified: new Date(w.createdAt),
  }))

  const skins = getRainmeterSkins().length > 0 ? getRainmeterSkins() : demoRainmeterSkins
  const skinPages = skins.map(s => ({
    url: `${SITE_URL}/pc/rainmeter/${s.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    lastModified: new Date(s.createdAt),
  }))

  const apps = getAllApps().length > 0 ? getAllApps() : [...demoMobileApps, ...demoPCApps]
  const appPages = apps.map(a => ({
    url: `${SITE_URL}/${a.platform}/apps/${a.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...wallpaperPages,
    ...widgetPages,
    ...skinPages,
    ...appPages,
  ]
}

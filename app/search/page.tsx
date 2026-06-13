import { Metadata } from 'next'
import { SearchPageClient } from '@/components/search/SearchPageClient'
import { getAllWallpapers, getMobileWidgets, getRainmeterSkins, getAllApps } from '@/lib/content'
import { demoMobileWallpapers, demoPCWallpapers, demoWidgets, demoRainmeterSkins, demoMobileApps, demoPCApps } from '@/lib/demo-data'
import { SearchResult } from '@/types'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search wallpapers, widgets, Rainmeter skins, and apps.',
}

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q?.toLowerCase().trim() || ''

  const wallpapers = (getAllWallpapers().length > 0 ? getAllWallpapers() : [...demoMobileWallpapers, ...demoPCWallpapers])
  const widgets = (getMobileWidgets().length > 0 ? getMobileWidgets() : demoWidgets)
  const skins = (getRainmeterSkins().length > 0 ? getRainmeterSkins() : demoRainmeterSkins)
  const apps = (getAllApps().length > 0 ? getAllApps() : [...demoMobileApps, ...demoPCApps])

  const index: SearchResult[] = [
    ...wallpapers.map(w => ({ id: w.id, title: w.title, type: 'wallpaper' as const, src: w.src, slug: w.slug, device: w.device })),
    ...widgets.map(w => ({ id: w.id, title: w.title, type: 'widget' as const, src: w.src, slug: w.slug })),
    ...skins.map(s => ({ id: s.id, title: s.title, type: 'rainmeter' as const, src: s.src, slug: s.slug, device: 'pc' as const })),
    ...apps.map(a => ({ id: a.id, title: a.name, type: 'app' as const, src: a.thumbnail, slug: a.slug, device: a.platform })),
  ]

  const results = q.length >= 2
    ? index.filter(item => item.title.toLowerCase().includes(q))
    : []

  return <SearchPageClient initialQuery={q} initialResults={results} />
}

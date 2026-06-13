import { NextRequest, NextResponse } from 'next/server'
import { getAllWallpapers, getMobileWidgets, getRainmeterSkins, getAllApps } from '@/lib/content'
import {
  demoMobileWallpapers,
  demoPCWallpapers,
  demoWidgets,
  demoRainmeterSkins,
  demoMobileApps,
  demoPCApps,
} from '@/lib/demo-data'
import { SearchResult } from '@/types'

export const dynamic = 'force-static'
export const revalidate = 3600

let _cache: SearchResult[] | null = null

function buildIndex(): SearchResult[] {
  if (_cache) return _cache

  const realWallpapers = getAllWallpapers()
  const wallpapers = realWallpapers.length > 0 ? realWallpapers : [...demoMobileWallpapers, ...demoPCWallpapers]

  const realWidgets = getMobileWidgets()
  const widgets = realWidgets.length > 0 ? realWidgets : demoWidgets

  const realRainmeter = getRainmeterSkins()
  const skins = realRainmeter.length > 0 ? realRainmeter : demoRainmeterSkins

  const realApps = getAllApps()
  const apps = realApps.length > 0 ? realApps : [...demoMobileApps, ...demoPCApps]

  const index: SearchResult[] = [
    ...wallpapers.map(w => ({
      id: w.id,
      title: w.title,
      type: 'wallpaper' as const,
      src: w.src || '',
      slug: w.slug,
      device: w.device,
    })),
    ...widgets.map(w => ({
      id: w.id,
      title: w.title,
      type: 'widget' as const,
      src: w.src || '',
      slug: w.slug,
    })),
    ...skins.map(s => ({
      id: s.id,
      title: s.title,
      type: 'rainmeter' as const,
      src: s.src || '',
      slug: s.slug,
      device: 'pc',
    })),
    ...apps.map(a => ({
      id: a.id,
      title: a.name,
      type: 'app' as const,
      src: a.thumbnail || '',
      slug: a.slug,
      device: a.platform,
    })),
  ]

  _cache = index
  return index
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.toLowerCase().trim()

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] })
  }

  const index = buildIndex()
  const results = index
    .filter(item => item.title.toLowerCase().includes(q))
    .slice(0, 12)

  return NextResponse.json({ results })
}

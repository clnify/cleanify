import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllWallpapers } from '@/lib/content'
import { demoMobileWallpapers } from '@/lib/demo-data'
import { WallpaperDetailClient } from '@/components/wallpapers/WallpaperDetailClient'
import { Wallpaper } from '@/types'

interface Props { params: { slug: string } }

function getWallpapers() {
  const real = getAllWallpapers().filter(w => w.device === 'mobile')
  return real.length > 0 ? real : demoMobileWallpapers
}

export async function generateStaticParams() {
  return getWallpapers().map(w => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const wallpaper = getWallpapers().find(w => w.slug === params.slug)
  if (!wallpaper) return { title: 'Not Found' }
  return {
    title: wallpaper.title,
    description: `Download ${wallpaper.title} — a premium mobile wallpaper for iPhone and Android.`,
    openGraph: wallpaper.src ? { images: [{ url: wallpaper.src }] } : undefined,
  }
}

export default function MobileWallpaperPage({ params }: Props) {
  const wallpapers = getWallpapers()
  const wallpaper = wallpapers.find(w => w.slug === params.slug)
  if (!wallpaper) notFound()

  const related = wallpapers
    .filter(w => w.id !== wallpaper.id && (
      w.tags?.some(t => wallpaper.tags?.includes(t)) ||
      w.colors?.some(c => wallpaper.colors?.includes(c))
    ))
    .slice(0, 6)

  return (
    <WallpaperDetailClient
      wallpaper={wallpaper as Wallpaper & { gradient?: string }}
      related={related as (Wallpaper & { gradient?: string })[]}
      backHref="/mobile/wallpapers"
      backLabel="Mobile Wallpapers"
    />
  )
}

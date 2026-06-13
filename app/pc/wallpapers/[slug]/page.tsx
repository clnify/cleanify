import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllWallpapers } from '@/lib/content'
import { demoPCWallpapers } from '@/lib/demo-data'
import { WallpaperDetailClient } from '@/components/wallpapers/WallpaperDetailClient'
import { Wallpaper } from '@/types'

interface Props { params: { slug: string } }

function getWallpapers() {
  const real = getAllWallpapers().filter(w => w.device === 'pc')
  return real.length > 0 ? real : demoPCWallpapers
}

export async function generateStaticParams() {
  return getWallpapers().map(w => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const wallpaper = getWallpapers().find(w => w.slug === params.slug)
  if (!wallpaper) return { title: 'Not Found' }
  return {
    title: wallpaper.title,
    description: `Download ${wallpaper.title} — a premium desktop wallpaper for PC and Mac.`,
    openGraph: wallpaper.src ? { images: [{ url: wallpaper.src }] } : undefined,
  }
}

export default function PCWallpaperPage({ params }: Props) {
  const wallpapers = getWallpapers()
  const wallpaper = wallpapers.find(w => w.slug === params.slug)
  if (!wallpaper) notFound()

  const related = wallpapers
    .filter(w => w.id !== wallpaper.id)
    .slice(0, 6)

  return (
    <WallpaperDetailClient
      wallpaper={wallpaper as Wallpaper & { gradient?: string }}
      related={related as (Wallpaper & { gradient?: string })[]}
      backHref="/pc/wallpapers"
      backLabel="Desktop Wallpapers"
    />
  )
}

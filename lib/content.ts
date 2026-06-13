import fs from 'fs'
import path from 'path'
import { Wallpaper, Widget, RainmeterSkin, App } from '@/types'

const CONTENT_DIR = path.join(process.cwd(), 'content')

function slugify(name: string): string {
  return name
    .replace(/\.[^/.]+$/, '') // remove extension
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function getImageDimensions(): { width: number; height: number } {
  // Static dimensions since we can't read real files at build time in this demo
  // In production these would be read via sharp or image-size
  return { width: 1080, height: 1920 }
}

export function getMobileWallpapers(): Wallpaper[] {
  const dir = path.join(CONTENT_DIR, 'mobile/wallpapers')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))

  return files.map((filename, i) => {
    const slug = slugify(filename)
    const metaPath = path.join(dir, filename.replace(/\.[^/.]+$/, '.json'))
    let meta: Partial<Wallpaper> = {}
    if (fs.existsSync(metaPath)) {
      try { meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8')) } catch {}
    }

    return {
      id: `mw-${i}`,
      slug,
      title: meta.title || filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      filename,
      src: `/content/mobile/wallpapers/${filename}`,
      device: 'mobile' as const,
      tags: meta.tags || [],
      colors: meta.colors || [],
      width: meta.width || 1080,
      height: meta.height || 1920,
      featured: meta.featured || i < 6,
      createdAt: meta.createdAt || new Date().toISOString(),
    }
  })
}

export function getPCWallpapers(): Wallpaper[] {
  const dir = path.join(CONTENT_DIR, 'pc/wallpapers')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))

  return files.map((filename, i) => {
    const slug = slugify(filename)
    const metaPath = path.join(dir, filename.replace(/\.[^/.]+$/, '.json'))
    let meta: Partial<Wallpaper> = {}
    if (fs.existsSync(metaPath)) {
      try { meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8')) } catch {}
    }

    return {
      id: `pw-${i}`,
      slug,
      title: meta.title || filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      filename,
      src: `/content/pc/wallpapers/${filename}`,
      device: 'pc' as const,
      tags: meta.tags || [],
      colors: meta.colors || [],
      width: meta.width || 2560,
      height: meta.height || 1440,
      featured: meta.featured || i < 6,
      createdAt: meta.createdAt || new Date().toISOString(),
    }
  })
}

export function getAllWallpapers(): Wallpaper[] {
  return [...getMobileWallpapers(), ...getPCWallpapers()]
}

export function getMobileWidgets(): Widget[] {
  const dir = path.join(CONTENT_DIR, 'mobile/widgets')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))

  return files.map((filename, i) => {
    const slug = slugify(filename)
    const metaPath = path.join(dir, filename.replace(/\.[^/.]+$/, '.json'))
    let meta: Partial<Widget> = {}
    if (fs.existsSync(metaPath)) {
      try { meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8')) } catch {}
    }

    return {
      id: `wg-${i}`,
      slug,
      title: meta.title || filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      filename,
      src: `/content/mobile/widgets/${filename}`,
      tags: meta.tags || [],
      colors: meta.colors || [],
      width: meta.width || 1080,
      height: meta.height || 1920,
      featured: meta.featured || i < 4,
      createdAt: meta.createdAt || new Date().toISOString(),
    }
  })
}

export function getRainmeterSkins(): RainmeterSkin[] {
  const dir = path.join(CONTENT_DIR, 'pc/rainmeter')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))

  return files.map((filename, i) => {
    const slug = slugify(filename)
    const metaPath = path.join(dir, filename.replace(/\.[^/.]+$/, '.json'))
    let meta: Partial<RainmeterSkin> = {}
    if (fs.existsSync(metaPath)) {
      try { meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8')) } catch {}
    }

    return {
      id: `rm-${i}`,
      slug,
      title: meta.title || filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      filename,
      src: `/content/pc/rainmeter/${filename}`,
      tags: meta.tags || [],
      colors: meta.colors || [],
      width: meta.width || 2560,
      height: meta.height || 1440,
      featured: meta.featured || i < 4,
      createdAt: meta.createdAt || new Date().toISOString(),
    }
  })
}

export function getMobileApps(): App[] {
  const dir = path.join(CONTENT_DIR, 'mobile/apps')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => /\.json$/i.test(f))

  return files.map((filename, i) => {
    try {
      const content = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const data = JSON.parse(content)
      return {
        id: `ma-${i}`,
        slug: data.slug || slugify(filename),
        platform: 'mobile' as const,
        ...data,
      }
    } catch {
      return null
    }
  }).filter(Boolean) as App[]
}

export function getPCApps(): App[] {
  const dir = path.join(CONTENT_DIR, 'pc/apps')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => /\.json$/i.test(f))

  return files.map((filename, i) => {
    try {
      const content = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const data = JSON.parse(content)
      return {
        id: `pa-${i}`,
        slug: data.slug || slugify(filename),
        platform: 'pc' as const,
        ...data,
      }
    } catch {
      return null
    }
  }).filter(Boolean) as App[]
}

export function getAllApps(): App[] {
  return [...getMobileApps(), ...getPCApps()]
}

export function getContentStats() {
  return {
    mobileWallpapers: getMobileWallpapers().length,
    pcWallpapers: getPCWallpapers().length,
    widgets: getMobileWidgets().length,
    rainmeter: getRainmeterSkins().length,
    mobileApps: getMobileApps().length,
    pcApps: getPCApps().length,
  }
}

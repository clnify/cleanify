export type Device = 'mobile' | 'pc' | 'all'
export type Category = 'wallpapers' | 'widgets' | 'rainmeter' | 'apps'
export type ColorTag = 'dark' | 'light' | 'colorful' | 'minimal' | 'nature' | 'abstract' | 'gradient'

export interface Wallpaper {
  id: string
  slug: string
  title: string
  filename: string
  src: string
  device: Device
  tags: string[]
  colors: ColorTag[]
  width: number
  height: number
  fileSize?: number
  downloads?: number
  featured?: boolean
  createdAt: string
}

export interface Widget {
  id: string
  slug: string
  title: string
  filename: string
  src: string
  tags: string[]
  colors: ColorTag[]
  width: number
  height: number
  featured?: boolean
  createdAt: string
}

export interface RainmeterSkin {
  id: string
  slug: string
  title: string
  filename: string
  src: string
  tags: string[]
  colors: ColorTag[]
  width: number
  height: number
  featured?: boolean
  createdAt: string
}

export interface App {
  id: string
  slug: string
  name: string
  description: string
  website: string
  category: string
  platform: 'mobile' | 'pc'
  thumbnail: string
  tags: string[]
  featured?: boolean
  free?: boolean
  price?: string
}

export interface PluginManifest {
  id: string
  name: string
  description: string
  version: string
  author: string
  preview?: string
}

export interface SearchResult {
  id: string
  title: string
  type: 'wallpaper' | 'widget' | 'rainmeter' | 'app'
  src?: string
  slug: string
  device?: string
}

export interface FilterState {
  device: Device
  category: Category | 'all'
  colors: ColorTag[]
  tags: string[]
  query: string
}

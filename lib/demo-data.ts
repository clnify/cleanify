import { Wallpaper, Widget, RainmeterSkin, App } from '@/types'

// Gradient-based placeholder colors for demo cards
const gradients = [
  { bg: 'from-slate-900 to-slate-700', label: 'Midnight' },
  { bg: 'from-violet-900 to-indigo-800', label: 'Aurora' },
  { bg: 'from-rose-900 to-pink-700', label: 'Crimson' },
  { bg: 'from-emerald-900 to-teal-700', label: 'Forest' },
  { bg: 'from-amber-900 to-orange-700', label: 'Ember' },
  { bg: 'from-sky-900 to-blue-700', label: 'Ocean' },
  { bg: 'from-zinc-900 to-zinc-600', label: 'Graphite' },
  { bg: 'from-purple-900 to-fuchsia-700', label: 'Nebula' },
  { bg: 'from-cyan-900 to-sky-600', label: 'Arctic' },
  { bg: 'from-red-900 to-rose-600', label: 'Lava' },
  { bg: 'from-lime-900 to-green-700', label: 'Jungle' },
  { bg: 'from-indigo-900 to-blue-800', label: 'Cosmos' },
]

export const demoMobileWallpapers: Wallpaper[] = Array.from({ length: 18 }, (_, i) => ({
  id: `demo-mw-${i}`,
  slug: `mobile-wallpaper-${i + 1}`,
  title: `${gradients[i % gradients.length].label} ${i < 6 ? 'Series' : i < 12 ? 'Fade' : 'Minimal'}`,
  filename: `demo-${i}.jpg`,
  src: '',
  gradient: gradients[i % gradients.length].bg,
  device: 'mobile' as const,
  tags: ['minimal', 'clean', i % 2 === 0 ? 'dark' : 'light'],
  colors: [i % 2 === 0 ? 'dark' : 'light', 'minimal'],
  width: 1080,
  height: 1920,
  featured: i < 6,
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}))

export const demoPCWallpapers: Wallpaper[] = Array.from({ length: 12 }, (_, i) => ({
  id: `demo-pw-${i}`,
  slug: `pc-wallpaper-${i + 1}`,
  title: `${gradients[(i + 3) % gradients.length].label} Desktop`,
  filename: `demo-pc-${i}.jpg`,
  src: '',
  gradient: gradients[(i + 3) % gradients.length].bg,
  device: 'pc' as const,
  tags: ['desktop', 'ultrawide', i % 2 === 0 ? 'dark' : 'colorful'],
  colors: [i % 2 === 0 ? 'dark' : 'colorful', 'abstract'],
  width: 2560,
  height: 1440,
  featured: i < 4,
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}))

export const demoWidgets: Widget[] = Array.from({ length: 8 }, (_, i) => ({
  id: `demo-wg-${i}`,
  slug: `widget-setup-${i + 1}`,
  title: `${['Minimal Clock', 'Weather Stack', 'Quote Board', 'Stats Panel', 'News Feed', 'Music Player', 'Calendar Grid', 'Fitness Ring'][i % 8]}`,
  filename: `demo-widget-${i}.jpg`,
  src: '',
  gradient: gradients[(i + 6) % gradients.length].bg,
  tags: ['widgets', 'ios', i % 2 === 0 ? 'minimal' : 'colorful'],
  colors: [i % 2 === 0 ? 'dark' : 'light', 'minimal'],
  width: 1080,
  height: 1920,
  featured: i < 4,
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}))

export const demoRainmeterSkins: RainmeterSkin[] = Array.from({ length: 8 }, (_, i) => ({
  id: `demo-rm-${i}`,
  slug: `rainmeter-skin-${i + 1}`,
  title: `${['HUD Interface', 'Minimalist Suite', 'Glass Panel', 'Neon Grid', 'Dark Orbit', 'Clean Metrics', 'Flux System', 'Arc Overlay'][i % 8]}`,
  filename: `demo-rm-${i}.jpg`,
  src: '',
  gradient: gradients[(i + 2) % gradients.length].bg,
  tags: ['rainmeter', 'desktop', i % 2 === 0 ? 'dark' : 'minimal'],
  colors: [i % 2 === 0 ? 'dark' : 'minimal'],
  width: 2560,
  height: 1440,
  featured: i < 4,
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}))

export const demoMobileApps: App[] = [
  { id: 'ma-0', slug: 'widgetkit', name: 'WidgetKit Studio', description: 'Create beautiful custom widgets for your iPhone home screen with drag-and-drop ease.', website: 'https://widgetkitapp.com', category: 'Widgets', platform: 'mobile', thumbnail: '', tags: ['widgets', 'ios', 'customization'], featured: true, free: false, price: '$4.99' },
  { id: 'ma-1', slug: 'widgy', name: 'Widgy', description: 'Advanced widget creator with hundreds of templates and full customization support.', website: 'https://widgy.me', category: 'Widgets', platform: 'mobile', thumbnail: '', tags: ['widgets', 'ios'], featured: true, free: true },
  { id: 'ma-2', slug: 'pastel', name: 'Pastel', description: 'Manage your app icon pack and create your perfect aesthetic home screen.', website: 'https://getpastel.app', category: 'Icons', platform: 'mobile', thumbnail: '', tags: ['icons', 'aesthetic'], featured: false, free: false, price: '$2.99' },
  { id: 'ma-3', slug: 'maker', name: 'Maker - Icon Themes', description: 'Custom app icon maker with thousands of beautiful icon designs.', website: 'https://apps.apple.com', category: 'Icons', platform: 'mobile', thumbnail: '', tags: ['icons', 'themes'], featured: false, free: true },
  { id: 'ma-4', slug: 'launcher', name: 'Launcher with Multiple Widgets', description: 'The most powerful widget and launcher system for iPhone with deep customization.', website: 'https://launcherapp.net', category: 'Launcher', platform: 'mobile', thumbnail: '', tags: ['launcher', 'widgets'], featured: true, free: true },
  { id: 'ma-5', slug: 'aesthetic-kit', name: 'Aesthetic Kit', description: 'Complete toolkit for aesthetic iPhone setups. Wallpapers, icons, and widgets in one.', website: 'https://aesthetickit.app', category: 'All-in-one', platform: 'mobile', thumbnail: '', tags: ['aesthetic', 'all-in-one'], featured: false, free: false, price: '$1.99' },
]

export const demoPCApps: App[] = [
  { id: 'pa-0', slug: 'rainmeter', name: 'Rainmeter', description: 'The most popular desktop customization tool for Windows. Skin your desktop completely.', website: 'https://rainmeter.net', category: 'Desktop', platform: 'pc', thumbnail: '', tags: ['desktop', 'skins', 'windows'], featured: true, free: true },
  { id: 'pa-1', slug: 'wallpaper-engine', name: 'Wallpaper Engine', description: 'Animated and interactive desktop wallpapers with thousands of community creations.', website: 'https://wallpaperengine.io', category: 'Wallpapers', platform: 'pc', thumbnail: '', tags: ['wallpapers', 'animated'], featured: true, free: false, price: '$3.99' },
  { id: 'pa-2', slug: 'lively-wallpaper', name: 'Lively Wallpaper', description: 'Free and open-source animated wallpaper app. Supports videos, web pages, and more.', website: 'https://livelywallpaper.net', category: 'Wallpapers', platform: 'pc', thumbnail: '', tags: ['wallpapers', 'animated', 'free'], featured: false, free: true },
  { id: 'pa-3', slug: 'nexusdock', name: 'NexusDock', description: 'macOS-style dock for Windows with smooth animations and app pinning.', website: 'https://nexusdock.com', category: 'Dock', platform: 'pc', thumbnail: '', tags: ['dock', 'macos-style'], featured: true, free: true },
  { id: 'pa-4', slug: 'windowblinds', name: 'WindowBlinds', description: 'Complete Windows theme engine. Apply stunning visual styles to your entire OS.', website: 'https://stardock.com/products/windowblinds', category: 'Themes', platform: 'pc', thumbnail: '', tags: ['themes', 'windows'], featured: false, free: false, price: '$9.99' },
]

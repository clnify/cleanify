import { Metadata } from 'next'
import { HubPageClient } from '@/components/sections/HubPageClient'

export const metadata: Metadata = {
  title: 'PC',
  description: 'Desktop wallpapers, Rainmeter skins, and PC customization apps.',
}

const sections = [
  { title: 'Wallpapers',       description: '4K desktop wallpapers for every screen', href: '/pc/wallpapers' },
  { title: 'Rainmeter Skins',  description: 'Transform your Windows desktop',         href: '/pc/rainmeter' },
  { title: 'Apps',             description: 'Best PC customization apps',              href: '/pc/apps' },
]

export default function PCPage() {
  return <HubPageClient title="PC" description="Everything you need to build the perfect Windows or Mac desktop setup." sections={sections} />
}

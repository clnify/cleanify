import { Metadata } from 'next'
import { HubPageClient } from '@/components/sections/HubPageClient'

export const metadata: Metadata = {
  title: 'Mobile',
  description: 'Mobile wallpapers, widget setups, and iOS customization apps.',
}

const sections = [
  { title: 'Wallpapers',   description: 'Premium wallpapers for iPhone and Android', href: '/mobile/wallpapers' },
  { title: 'Widget Setups', description: 'Beautiful home screen inspirations',        href: '/mobile/widgets' },
  { title: 'Apps',          description: 'Best iOS customization apps',               href: '/mobile/apps' },
]

export default function MobilePage() {
  return <HubPageClient title="Mobile" description="Everything you need to perfect your iPhone or Android setup." sections={sections} />
}

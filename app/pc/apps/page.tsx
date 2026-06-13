import { Metadata } from 'next'
import { getPCApps } from '@/lib/content'
import { demoPCApps } from '@/lib/demo-data'
import { AppsPageClient } from '@/components/apps/AppsPageClient'

export const metadata: Metadata = {
  title: 'PC Apps',
  description: 'Best Windows and Mac customization apps. Rainmeter, wallpapers, themes and more.',
}

export default function PCAppsPage() {
  const real = getPCApps()
  const apps = real.length > 0 ? real : demoPCApps

  return <AppsPageClient apps={apps} />
}

import { Metadata } from 'next'
import { getAllApps } from '@/lib/content'
import { demoMobileApps, demoPCApps } from '@/lib/demo-data'
import { AppsPageClient } from '@/components/apps/AppsPageClient'
import { App } from '@/types'

export const metadata: Metadata = {
  title: 'Customization Apps',
  description: 'Essential apps for iOS and PC customization. Widgets, themes, wallpapers and more.',
}

export default function AppsPage() {
  const realApps = getAllApps()
  const apps: App[] = realApps.length > 0 ? realApps : [...demoMobileApps, ...demoPCApps]

  return <AppsPageClient apps={apps} />
}

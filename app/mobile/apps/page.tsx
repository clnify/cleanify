import { Metadata } from 'next'
import { getMobileApps } from '@/lib/content'
import { demoMobileApps } from '@/lib/demo-data'
import { AppsPageClient } from '@/components/apps/AppsPageClient'

export const metadata: Metadata = {
  title: 'Mobile Apps',
  description: 'Best iOS and Android customization apps. Widgets, themes, icons and more.',
}

export default function MobileAppsPage() {
  const real = getMobileApps()
  const apps = real.length > 0 ? real : demoMobileApps

  return <AppsPageClient apps={apps} />
}

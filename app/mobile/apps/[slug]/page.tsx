import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMobileApps } from '@/lib/content'
import { demoMobileApps } from '@/lib/demo-data'
import { AppDetailClient } from '@/components/apps/AppDetailClient'

interface Props { params: { slug: string } }

function getApps() {
  const real = getMobileApps()
  return real.length > 0 ? real : demoMobileApps
}

export async function generateStaticParams() {
  return getApps().map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getApps().find(a => a.slug === params.slug)
  if (!app) return { title: 'Not Found' }
  return {
    title: app.name,
    description: app.description,
  }
}

export default function MobileAppPage({ params }: Props) {
  const apps = getApps()
  const app = apps.find(a => a.slug === params.slug)
  if (!app) notFound()
  const related = apps.filter(a => a.id !== app.id && a.category === app.category).slice(0, 3)

  return <AppDetailClient app={app} related={related} backHref="/mobile/apps" backLabel="Mobile Apps" />
}

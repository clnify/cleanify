import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPCApps } from '@/lib/content'
import { demoPCApps } from '@/lib/demo-data'
import { AppDetailClient } from '@/components/apps/AppDetailClient'

interface Props { params: { slug: string } }

function getApps() {
  const real = getPCApps()
  return real.length > 0 ? real : demoPCApps
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

export default function PCAppPage({ params }: Props) {
  const apps = getApps()
  const app = apps.find(a => a.slug === params.slug)
  if (!app) notFound()
  const related = apps.filter(a => a.id !== app.id).slice(0, 3)

  return <AppDetailClient app={app} related={related} backHref="/pc/apps" backLabel="PC Apps" />
}

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getRainmeterSkins } from '@/lib/content'
import { demoRainmeterSkins } from '@/lib/demo-data'
import { RainmeterDetailClient } from '@/components/rainmeter/RainmeterDetailClient'
import { RainmeterSkin } from '@/types'

interface Props { params: { slug: string } }

function getSkins() {
  const real = getRainmeterSkins()
  return real.length > 0 ? real : demoRainmeterSkins
}

export async function generateStaticParams() {
  return getSkins().map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const skin = getSkins().find(s => s.slug === params.slug)
  if (!skin) return { title: 'Not Found' }
  return {
    title: skin.title,
    description: `${skin.title} — Rainmeter skin for Windows desktop customization.`,
  }
}

export default function RainmeterSkinPage({ params }: Props) {
  const skins = getSkins()
  const skin = skins.find(s => s.slug === params.slug)
  if (!skin) notFound()
  const related = skins.filter(s => s.id !== skin.id).slice(0, 6)

  return (
    <RainmeterDetailClient
      skin={skin as RainmeterSkin & { gradient?: string }}
      related={related as (RainmeterSkin & { gradient?: string })[]}
    />
  )
}

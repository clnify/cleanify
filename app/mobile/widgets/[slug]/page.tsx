import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMobileWidgets } from '@/lib/content'
import { demoWidgets } from '@/lib/demo-data'
import { WidgetDetailClient } from '@/components/widgets/WidgetDetailClient'
import { Widget } from '@/types'

interface Props { params: { slug: string } }

function getWidgets() {
  const real = getMobileWidgets()
  return real.length > 0 ? real : demoWidgets
}

export async function generateStaticParams() {
  return getWidgets().map(w => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const widget = getWidgets().find(w => w.slug === params.slug)
  if (!widget) return { title: 'Not Found' }
  return {
    title: widget.title,
    description: `${widget.title} — iOS widget setup inspiration for your home screen.`,
  }
}

export default function WidgetPage({ params }: Props) {
  const widgets = getWidgets()
  const widget = widgets.find(w => w.slug === params.slug)
  if (!widget) notFound()
  const related = widgets.filter(w => w.id !== widget.id).slice(0, 6)

  return (
    <WidgetDetailClient
      widget={widget as Widget & { gradient?: string }}
      related={related as (Widget & { gradient?: string })[]}
    />
  )
}

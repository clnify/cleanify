import { Metadata } from 'next'
import { getMobileWidgets } from '@/lib/content'
import { demoWidgets } from '@/lib/demo-data'
import { WidgetsPageClient } from '@/components/widgets/WidgetsPageClient'
import { Widget } from '@/types'

export const metadata: Metadata = {
  title: 'Widget Setups',
  description: 'Beautiful iOS home screen widget inspirations and setups.',
}

export default function WidgetsPage() {
  const real = getMobileWidgets()
  const widgets = real.length > 0 ? real : demoWidgets

  return (
    <WidgetsPageClient widgets={widgets as (Widget & { gradient?: string })[]} />
  )
}

import { Metadata } from 'next'
import { getRainmeterSkins } from '@/lib/content'
import { demoRainmeterSkins } from '@/lib/demo-data'
import { RainmeterPageClient } from '@/components/rainmeter/RainmeterPageClient'
import { RainmeterSkin } from '@/types'

export const metadata: Metadata = {
  title: 'Rainmeter Skins',
  description: 'Beautiful Rainmeter skins and desktop setups for Windows.',
}

export default function RainmeterPage() {
  const real = getRainmeterSkins()
  const skins = real.length > 0 ? real : demoRainmeterSkins

  return (
    <RainmeterPageClient skins={skins as (RainmeterSkin & { gradient?: string })[]} />
  )
}

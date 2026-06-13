'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Wallpaper, Widget, RainmeterSkin, App } from '@/types'
import { MasonryGrid } from '@/components/ui/MasonryGrid'
import { WallpaperCard } from '@/components/wallpapers/WallpaperCard'
import { WidgetCard } from '@/components/widgets/WidgetCard'
import { RainmeterCard } from '@/components/rainmeter/RainmeterCard'
import { AppCard } from '@/components/apps/AppCard'
import { SectionHeader } from '@/components/sections/SectionHeader'

interface Props {
  mobileWallpapers: Wallpaper[]
  pcWallpapers: Wallpaper[]
  widgets: Widget[]
  rainmeterSkins: RainmeterSkin[]
  mobileApps: App[]
  pcApps: App[]
}

const MAX = '1100px'
const PX  = '24px'

export function HomepageClient({ mobileWallpapers, pcWallpapers, widgets, rainmeterSkins, mobileApps, pcApps }: Props) {
  return (
    <div>
      <Hero count={mobileWallpapers.length + pcWallpapers.length} />

      <div style={{ maxWidth: MAX, margin: '0 auto', padding: `0 ${PX} 80px` }}>

        {/* Mobile wallpapers */}
        <Section>
          <SectionHeader title="Mobile Wallpapers" description="Clean wallpapers for iPhone and Android" viewAllHref="/mobile/wallpapers" />
          <MasonryGrid>
            {mobileWallpapers.slice(0, 10).map(w => <WallpaperCard key={w.id} wallpaper={w as Wallpaper & { gradient?: string }} />)}
          </MasonryGrid>
        </Section>

        {/* PC wallpapers */}
        <Section>
          <SectionHeader title="Desktop Wallpapers" description="Wallpapers for every screen size" viewAllHref="/pc/wallpapers" />
          <MasonryGrid landscape>
            {pcWallpapers.slice(0, 8).map(w => <WallpaperCard key={w.id} wallpaper={w as Wallpaper & { gradient?: string }} />)}
          </MasonryGrid>
        </Section>

        {/* Widgets */}
        <Section>
          <SectionHeader title="Widget Setups" description="Home screen inspirations for iOS" viewAllHref="/mobile/widgets" />
          <MasonryGrid>
            {widgets.slice(0, 8).map(w => <WidgetCard key={w.id} widget={w as Widget & { gradient?: string }} />)}
          </MasonryGrid>
        </Section>

        {/* Rainmeter + Apps */}
        <Section>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
            <div>
              <SectionHeader title="Rainmeter Skins" viewAllHref="/pc/rainmeter" />
              <MasonryGrid landscape>
                {rainmeterSkins.slice(0, 4).map(s => <RainmeterCard key={s.id} skin={s as RainmeterSkin & { gradient?: string }} />)}
              </MasonryGrid>
            </div>
            <div>
              <SectionHeader title="Apps" viewAllHref="/apps" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[...mobileApps, ...pcApps].filter(a => a.featured).slice(0, 4).map((app, i) => (
                  <AppCard key={app.id} app={app} index={i} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* GitHub suggestion CTA */}
        <div style={{
          padding: '40px 36px', background: '#f5f5f7', borderRadius: '20px',
          border: '1px solid #e8e8ed', textAlign: 'center',
        }}>
          <h2 style={{ fontWeight: 700, fontSize: '20px', color: '#1d1d1f', marginBottom: '8px', letterSpacing: '-0.01em' }}>
            Want to see something here?
          </h2>
          <p style={{ fontSize: '14px', color: '#6e6e73', maxWidth: '420px', margin: '0 auto 20px', lineHeight: '1.55' }}>
            Open a GitHub issue to suggest a wallpaper, widget setup, Rainmeter skin or app. We review every suggestion.
          </p>
          <Link href="/suggest" style={{
            display: 'inline-block', padding: '10px 22px', borderRadius: '100px',
            fontWeight: 600, fontSize: '14px', background: '#1d1d1f', color: '#fff', textDecoration: 'none',
          }}>
            Make a suggestion
          </Link>
        </div>

      </div>
    </div>
  )
}

function Section({ children }: { children: React.ReactNode }) {
  return <section style={{ marginBottom: '60px' }}>{children}</section>
}

function Hero({ count }: { count: number }) {
  return (
    <section style={{
      minHeight: '78vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '120px 24px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', left: '15%', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,113,227,0.06) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(191,90,242,0.05) 0%, transparent 70%)' }} />
      </div>

      <div style={{ position: 'relative', maxWidth: '680px' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div style={{
            display: 'inline-block', padding: '4px 14px', borderRadius: '100px',
            background: '#f5f5f7', border: '1px solid #e8e8ed',
            fontSize: '12px', color: '#6e6e73', marginBottom: '22px',
          }}>
            {count}+ wallpapers — Git-powered platform
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.07 }}
          style={{
            fontSize: 'clamp(38px, 7vw, 72px)',
            fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05,
            color: '#1d1d1f', marginBottom: '18px',
          }}
        >
          Your setup,{' '}
          <span style={{
            background: 'linear-gradient(135deg, #0071e3 0%, #bf5af2 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>perfected.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.13 }}
          style={{ fontSize: '16px', color: '#6e6e73', lineHeight: '1.6', marginBottom: '30px', maxWidth: '480px', margin: '0 auto 30px' }}
        >
          Premium wallpapers, widget setups, Rainmeter skins and apps. Built for people who care about the details.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18 }}
          style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link href="/mobile/wallpapers" style={{
            padding: '11px 24px', borderRadius: '100px', fontWeight: 600, fontSize: '14px',
            background: '#0071e3', color: '#fff', textDecoration: 'none',
            boxShadow: '0 4px 18px rgba(0,113,227,0.28)',
          }}>
            Browse wallpapers
          </Link>
          <Link href="/browse" style={{
            padding: '11px 24px', borderRadius: '100px', fontWeight: 600, fontSize: '14px',
            background: '#f5f5f7', color: '#1d1d1f', border: '1px solid #e8e8ed', textDecoration: 'none',
          }}>
            Browse all
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

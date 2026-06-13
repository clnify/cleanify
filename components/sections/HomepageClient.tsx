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

interface HomepageClientProps {
  mobileWallpapers: Wallpaper[]
  pcWallpapers: Wallpaper[]
  widgets: Widget[]
  rainmeterSkins: RainmeterSkin[]
  mobileApps: App[]
  pcApps: App[]
}

const W = '1280px'
const PX = '20px'

export function HomepageClient({ mobileWallpapers, pcWallpapers, widgets, rainmeterSkins, mobileApps, pcApps }: HomepageClientProps) {
  return (
    <div>
      <Hero count={mobileWallpapers.length + pcWallpapers.length} apps={mobileApps.length + pcApps.length} />

      <div style={{ maxWidth: W, margin: '0 auto', padding: `0 ${PX}` }}>

        {/* Categories */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            {[
              { icon: '📱', title: 'Mobile Wallpapers', sub: 'iPhone & Android', href: '/mobile/wallpapers', color: '#e8f0fe' },
              { icon: '🖥️', title: 'Desktop Wallpapers', sub: 'PC & Mac',         href: '/pc/wallpapers',    color: '#f3e8fd' },
              { icon: '⚡', title: 'Widget Setups',     sub: 'iOS home screen',  href: '/mobile/widgets',   color: '#fef3e2' },
              { icon: '🎨', title: 'Rainmeter Skins',  sub: 'Windows desktop',  href: '/pc/rainmeter',     color: '#e2fdf0' },
            ].map((c, i) => (
              <motion.div key={c.href} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.35 }}>
                <Link href={c.href} style={{
                  display: 'block', padding: '20px', borderRadius: '18px',
                  background: c.color, border: '1px solid rgba(0,0,0,0.05)',
                  textDecoration: 'none', transition: 'transform 0.18s, box-shadow 0.18s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '' }}
                >
                  <span style={{ fontSize: '28px', display: 'block', marginBottom: '10px' }}>{c.icon}</span>
                  <p style={{ fontWeight: 600, fontSize: '14px', color: '#1d1d1f', marginBottom: '2px' }}>{c.title}</p>
                  <p style={{ fontSize: '12px', color: '#6e6e73' }}>{c.sub}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mobile Wallpapers */}
        <section style={{ marginBottom: '64px' }}>
          <SectionHeader title="Mobile Wallpapers" description="Clean, minimal wallpapers for your iPhone and Android" viewAllHref="/mobile/wallpapers" />
          <MasonryGrid>
            {mobileWallpapers.slice(0, 10).map(w => <WallpaperCard key={w.id} wallpaper={w as Wallpaper & { gradient?: string }} />)}
          </MasonryGrid>
        </section>

        {/* PC Wallpapers */}
        <section style={{ marginBottom: '64px' }}>
          <SectionHeader title="Desktop Wallpapers" description="Stunning wallpapers for every screen size" viewAllHref="/pc/wallpapers" />
          <MasonryGrid landscape>
            {pcWallpapers.slice(0, 8).map(w => <WallpaperCard key={w.id} wallpaper={w as Wallpaper & { gradient?: string }} />)}
          </MasonryGrid>
        </section>

        {/* Widgets */}
        <section style={{ marginBottom: '64px' }}>
          <SectionHeader title="Widget Setups" description="Beautiful home screen widget inspirations" viewAllHref="/mobile/widgets" />
          <MasonryGrid>
            {widgets.slice(0, 8).map(w => <WidgetCard key={w.id} widget={w as Widget & { gradient?: string }} />)}
          </MasonryGrid>
        </section>

        {/* Rainmeter + Apps */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '64px' }}>
          <section>
            <SectionHeader title="Rainmeter Skins" viewAllHref="/pc/rainmeter" />
            <MasonryGrid landscape>
              {rainmeterSkins.slice(0, 4).map(s => <RainmeterCard key={s.id} skin={s as RainmeterSkin & { gradient?: string }} />)}
            </MasonryGrid>
          </section>
          <section>
            <SectionHeader title="Featured Apps" viewAllHref="/apps" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[...mobileApps, ...pcApps].filter(a => a.featured).slice(0, 4).map((app, i) => <AppCard key={app.id} app={app} index={i} />)}
            </div>
          </section>
        </div>

        {/* CTA */}
        <section style={{ marginBottom: '64px', padding: '48px', background: '#f5f5f7', borderRadius: '24px', textAlign: 'center', border: '1px solid #e8e8ed' }}>
          <span style={{ fontSize: '36px', display: 'block', marginBottom: '16px' }}>☁️</span>
          <h2 style={{ fontWeight: 700, fontSize: '24px', letterSpacing: '-0.01em', color: '#1d1d1f', marginBottom: '10px' }}>
            Contribute your content
          </h2>
          <p style={{ fontSize: '15px', color: '#6e6e73', maxWidth: '400px', margin: '0 auto 24px' }}>
            Cleanify is Git-powered. Drop images into a folder, push to GitHub — your content is live automatically.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" style={{
              padding: '10px 22px', borderRadius: '100px', fontWeight: 600, fontSize: '14px',
              background: '#1d1d1f', color: '#fff', textDecoration: 'none',
            }}>View on GitHub</Link>
            <Link href="/contribute" style={{
              padding: '10px 22px', borderRadius: '100px', fontWeight: 600, fontSize: '14px',
              background: '#fff', color: '#1d1d1f', border: '1px solid #d2d2d7', textDecoration: 'none',
            }}>How to contribute →</Link>
          </div>
        </section>

      </div>
    </div>
  )
}

function Hero({ count, apps }: { count: number; apps: number }) {
  return (
    <section style={{
      minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '120px 20px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      {/* Blobs très subtils */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '15%', left: '10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,113,227,0.06) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(191,90,242,0.05) 0%, transparent 70%)' }} />
      </div>

      <div style={{ position: 'relative', maxWidth: '720px' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '5px 14px', borderRadius: '100px',
            background: '#f5f5f7', border: '1px solid #e8e8ed',
            fontSize: '12px', color: '#6e6e73', marginBottom: '24px',
          }}>
            <span>☁️</span> Git-powered content platform
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          style={{
            fontSize: 'clamp(40px, 8vw, 80px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: '#1d1d1f',
            marginBottom: '20px',
          }}
        >
          Your setup,{' '}
          <span style={{
            background: 'linear-gradient(135deg, #0071e3 0%, #bf5af2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            perfected.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14 }}
          style={{ fontSize: '17px', color: '#6e6e73', lineHeight: '1.6', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}
        >
          Premium wallpapers, widget setups, Rainmeter skins and apps. Built for people who care about the details.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}
        >
          <Link href="/mobile/wallpapers" style={{
            padding: '12px 26px', borderRadius: '100px', fontWeight: 600, fontSize: '15px',
            background: '#0071e3', color: '#fff', textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(0,113,227,0.3)',
          }}>
            Browse Wallpapers
          </Link>
          <Link href="/apps" style={{
            padding: '12px 26px', borderRadius: '100px', fontWeight: 600, fontSize: '15px',
            background: '#f5f5f7', color: '#1d1d1f', border: '1px solid #e8e8ed', textDecoration: 'none',
          }}>
            Explore Apps
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{ display: 'flex', gap: '40px', justifyContent: 'center' }}
        >
          {[
            { value: `${count}+`, label: 'Wallpapers' },
            { value: `${apps}+`, label: 'Apps' },
            { value: '100%', label: 'Free' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '22px', color: '#1d1d1f' }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: '#6e6e73', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

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

export function HomepageClient({
  mobileWallpapers,
  pcWallpapers,
  widgets,
  rainmeterSkins,
  mobileApps,
  pcApps,
}: HomepageClientProps) {
  return (
    <div>
      {/* Hero */}
      <HeroSection
        wallpaperCount={mobileWallpapers.length + pcWallpapers.length}
        appCount={mobileApps.length + pcApps.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 pb-20">

        {/* Mobile Wallpapers */}
        <section>
          <SectionHeader
            title="Mobile Wallpapers"
            description="Clean, minimal wallpapers for your iPhone and Android"
            viewAllHref="/mobile/wallpapers"
          />
          <MasonryGrid>
            {mobileWallpapers.slice(0, 8).map(w => (
              <WallpaperCard key={w.id} wallpaper={w as Wallpaper & { gradient?: string }} />
            ))}
          </MasonryGrid>
        </section>

        {/* Category cards */}
        <CategoryGrid />

        {/* PC Wallpapers */}
        <section>
          <SectionHeader
            title="Desktop Wallpapers"
            description="Stunning wallpapers for every screen size"
            viewAllHref="/pc/wallpapers"
          />
          <MasonryGrid>
            {pcWallpapers.slice(0, 6).map(w => (
              <WallpaperCard key={w.id} wallpaper={w as Wallpaper & { gradient?: string }} />
            ))}
          </MasonryGrid>
        </section>

        {/* Widgets */}
        <section>
          <SectionHeader
            title="Widget Setups"
            description="Beautiful home screen widget inspirations"
            viewAllHref="/mobile/widgets"
          />
          <MasonryGrid>
            {widgets.slice(0, 6).map(w => (
              <WidgetCard key={w.id} widget={w as Widget & { gradient?: string }} />
            ))}
          </MasonryGrid>
        </section>

        {/* Two column: Rainmeter + Apps */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Rainmeter */}
          <section>
            <SectionHeader
              title="Rainmeter Skins"
              description="Stunning desktop skins for Windows"
              viewAllHref="/pc/rainmeter"
            />
            <div className="space-y-4">
              {rainmeterSkins.slice(0, 4).map(s => (
                <RainmeterCard key={s.id} skin={s as RainmeterSkin & { gradient?: string }} />
              ))}
            </div>
          </section>

          {/* Apps */}
          <section>
            <SectionHeader
              title="Featured Apps"
              description="Essential tools for your setup"
              viewAllHref="/apps"
            />
            <div className="grid grid-cols-2 gap-3">
              {[...mobileApps, ...pcApps].filter(a => a.featured).slice(0, 4).map((app, i) => (
                <AppCard key={app.id} app={app} index={i} />
              ))}
            </div>
          </section>
        </div>

        {/* GitHub CTA */}
        <GitHubCTA />
      </div>
    </div>
  )
}

function HeroSection({ wallpaperCount, appCount }: { wallpaperCount: number; appCount: number }) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-14">
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ background: 'radial-gradient(circle, #0071e3, transparent)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ background: 'radial-gradient(circle, #bf5af2, transparent)', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: 'radial-gradient(circle, #30d158, transparent)', animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
          style={{ background: 'var(--surface-2)', color: 'var(--muted)', border: '1px solid var(--border)' }}
        >
          <span>☁️</span>
          <span>Git-powered content platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-bold tracking-tight mb-5"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
        >
          <span style={{ color: 'var(--foreground)' }}>Your setup,</span>
          <br />
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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-8"
          style={{ color: 'var(--muted)', lineHeight: '1.65' }}
        >
          Premium wallpapers, widget setups, Rainmeter skins and customization apps.
          Built for people who care about the details.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/mobile/wallpapers"
            className="px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
            style={{ background: 'var(--accent)', boxShadow: '0 4px 20px rgba(0,113,227,0.35)' }}
          >
            Browse Wallpapers
          </Link>
          <Link
            href="/apps"
            className="px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            style={{ background: 'var(--surface-2)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
          >
            Explore Apps
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-center gap-8 mt-12"
        >
          {[
            { value: `${wallpaperCount}+`, label: 'Wallpapers' },
            { value: `${appCount}+`, label: 'Apps' },
            { value: 'Free', label: 'Forever' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{stat.value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function CategoryGrid() {
  const categories = [
    {
      title: 'Mobile Wallpapers',
      description: 'iPhone & Android',
      href: '/mobile/wallpapers',
      icon: '📱',
      gradient: 'from-blue-500/20 to-indigo-500/20',
      border: 'border-blue-500/20',
    },
    {
      title: 'Desktop Wallpapers',
      description: 'PC & Mac',
      href: '/pc/wallpapers',
      icon: '🖥️',
      gradient: 'from-purple-500/20 to-violet-500/20',
      border: 'border-purple-500/20',
    },
    {
      title: 'Widget Setups',
      description: 'iOS home screen',
      href: '/mobile/widgets',
      icon: '⚡',
      gradient: 'from-amber-500/20 to-orange-500/20',
      border: 'border-amber-500/20',
    },
    {
      title: 'Rainmeter Skins',
      description: 'Windows desktop',
      href: '/pc/rainmeter',
      icon: '🎨',
      gradient: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/20',
    },
  ]

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <Link
              href={cat.href}
              className={`group block p-5 rounded-2xl transition-all hover:-translate-y-0.5 bg-gradient-to-br ${cat.gradient}`}
              style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <span className="text-3xl mb-3 block">{cat.icon}</span>
              <h3 className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>{cat.title}</h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{cat.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function GitHubCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl p-8 sm:p-12 text-center"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <span className="text-4xl mb-4 block">☁️</span>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3" style={{ color: 'var(--foreground)' }}>
        Contribute your content
      </h2>
      <p className="text-base mb-6 max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
        Cleanify is git-powered. Drop images into a folder, push to GitHub, and your content is live automatically.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
          style={{ background: 'var(--foreground)', color: 'var(--background)' }}
        >
          View on GitHub
        </Link>
        <Link
          href="/contribute"
          className="px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
          style={{ background: 'var(--surface-2)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
        >
          How to contribute →
        </Link>
      </div>
    </motion.section>
  )
}

import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Cleanify, the Git-powered wallpaper and customization platform.',
}

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <span className="text-5xl mb-6 block">☁️</span>
        <h1 className="text-4xl font-bold tracking-tight mb-4" style={{ color: 'var(--foreground)' }}>
          About Cleanify
        </h1>

        <div className="space-y-5 text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
          <p>
            Cleanify is an open-source, Git-powered platform for premium wallpapers,
            widget setups, Rainmeter skins, and customization apps.
          </p>

          <p>
            Unlike traditional CMS platforms, Cleanify has no admin panel, no database,
            and no backend to maintain. All content lives directly in the GitHub repository.
            Adding content is as simple as dropping a file and pushing a commit.
          </p>

          <p>
            The site is statically generated using Next.js and deployed on Vercel.
            When new content is pushed to GitHub, Vercel automatically rebuilds the site
            and publishes everything within minutes.
          </p>

          <div className="rounded-2xl p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h2 className="font-semibold text-base mb-3" style={{ color: 'var(--foreground)' }}>Tech stack</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                ['Framework', 'Next.js 15'],
                ['Language', 'TypeScript'],
                ['Styling', 'Tailwind CSS'],
                ['Animations', 'Framer Motion'],
                ['Hosting', 'Vercel'],
                ['Content', 'GitHub'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span style={{ color: 'var(--muted)' }}>{label}</span>
                  <span className="font-medium" style={{ color: 'var(--foreground)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            href="/contribute"
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white"
            style={{ background: 'var(--accent)' }}
          >
            Contribute
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full text-sm font-semibold"
            style={{ background: 'var(--surface-2)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
          >
            GitHub →
          </Link>
        </div>
      </div>
    </div>
  )
}

import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PC',
  description: 'Desktop wallpapers, Rainmeter skins, and PC customization apps.',
}

const sections = [
  {
    title: 'Wallpapers',
    description: '4K desktop wallpapers for every screen',
    href: '/pc/wallpapers',
    icon: '🖥️',
    gradient: 'from-purple-500/20 to-violet-500/20',
  },
  {
    title: 'Rainmeter Skins',
    description: 'Transform your Windows desktop',
    href: '/pc/rainmeter',
    icon: '🎨',
    gradient: 'from-rose-500/20 to-pink-500/20',
  },
  {
    title: 'Apps',
    description: 'Best PC customization apps, curated',
    href: '/pc/apps',
    icon: '💻',
    gradient: 'from-cyan-500/20 to-sky-500/20',
  },
]

export default function PCPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-2" style={{ color: 'var(--foreground)' }}>
          PC
        </h1>
        <p className="text-base mb-10" style={{ color: 'var(--muted)' }}>
          Everything you need to build the perfect Windows or Mac desktop setup.
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {sections.map(s => (
            <Link
              key={s.href}
              href={s.href}
              className={`block p-6 rounded-2xl transition-all hover:-translate-y-0.5 bg-gradient-to-br ${s.gradient}`}
              style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <span className="text-4xl mb-4 block">{s.icon}</span>
              <h2 className="text-lg font-semibold mb-1.5" style={{ color: 'var(--foreground)' }}>{s.title}</h2>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{s.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

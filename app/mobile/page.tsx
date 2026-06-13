import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mobile',
  description: 'Mobile wallpapers, widget setups, and iOS customization apps.',
}

const sections = [
  {
    title: 'Wallpapers',
    description: 'Premium wallpapers for iPhone and Android',
    href: '/mobile/wallpapers',
    icon: '🖼️',
    gradient: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    title: 'Widget Setups',
    description: 'Beautiful home screen widget inspirations',
    href: '/mobile/widgets',
    icon: '⚡',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    title: 'Apps',
    description: 'Best iOS customization apps, curated',
    href: '/mobile/apps',
    icon: '📱',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
]

export default function MobilePage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-2" style={{ color: 'var(--foreground)' }}>
          Mobile
        </h1>
        <p className="text-base mb-10" style={{ color: 'var(--muted)' }}>
          Everything you need to perfect your iPhone or Android setup.
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

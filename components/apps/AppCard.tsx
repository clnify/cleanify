'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { App } from '@/types'
import { cardVariants } from '@/components/ui/MasonryGrid'

const appGradients = [
  'from-blue-500 to-indigo-600',
  'from-purple-500 to-pink-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-red-600',
  'from-cyan-500 to-blue-600',
  'from-violet-500 to-purple-600',
]

interface AppCardProps {
  app: App
  index?: number
}

export function AppCard({ app, index = 0 }: AppCardProps) {
  const gradient = appGradients[index % appGradients.length]
  const href = `/${app.platform}/apps/${app.slug}`

  return (
    <motion.div variants={cardVariants} className="group">
      <Link href={href} className="block rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
        {/* App icon / thumbnail */}
        <div className={`h-28 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          {app.thumbnail ? (
            <img src={app.thumbnail} alt={app.name} className="w-16 h-16 rounded-2xl object-cover shadow-lg" />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shadow-lg">
              {app.platform === 'mobile' ? '📱' : '🖥️'}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-semibold text-sm leading-tight" style={{ color: 'var(--foreground)' }}>
              {app.name}
            </h3>
            {app.free ? (
              <span className="text-xs px-2 py-0.5 rounded-full shrink-0"
                style={{ background: 'rgba(52,199,89,0.15)', color: '#34c759' }}>
                Free
              </span>
            ) : app.price ? (
              <span className="text-xs font-medium shrink-0" style={{ color: 'var(--muted)' }}>
                {app.price}
              </span>
            ) : null}
          </div>
          <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: 'var(--muted)' }}>
            {app.description}
          </p>
          <span className="text-xs px-2 py-1 rounded-lg"
            style={{ background: 'var(--surface-2)', color: 'var(--muted)' }}>
            {app.category}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

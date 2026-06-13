'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { App } from '@/types'
import { AppCard } from '@/components/apps/AppCard'

interface AppDetailClientProps {
  app: App
  related: App[]
  backHref: string
  backLabel: string
}

const appGradients = [
  'from-blue-500 to-indigo-600',
  'from-purple-500 to-pink-600',
  'from-emerald-500 to-teal-600',
]

export function AppDetailClient({ app, related, backHref, backLabel }: AppDetailClientProps) {
  return (
    <div className="pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link href={backHref} className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: 'var(--muted)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            {backLabel}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          {/* Header banner */}
          <div className={`h-36 bg-gradient-to-br ${appGradients[0]} flex items-center justify-center`}>
            {app.thumbnail ? (
              <img src={app.thumbnail} alt={app.name} className="w-20 h-20 rounded-3xl object-cover shadow-xl" />
            ) : (
              <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center text-4xl shadow-xl">
                {app.platform === 'mobile' ? '📱' : '🖥️'}
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8">
            {/* App info */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>
                  {app.name}
                </h1>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs px-2.5 py-1 rounded-full capitalize"
                    style={{ background: 'var(--surface-2)', color: 'var(--muted)' }}>
                    {app.platform}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full"
                    style={{ background: 'var(--surface-2)', color: 'var(--muted)' }}>
                    {app.category}
                  </span>
                </div>
              </div>
              {app.free ? (
                <span className="px-3 py-1.5 rounded-full text-sm font-medium shrink-0"
                  style={{ background: 'rgba(52,199,89,0.15)', color: '#34c759' }}>
                  Free
                </span>
              ) : app.price ? (
                <span className="text-lg font-bold shrink-0" style={{ color: 'var(--foreground)' }}>
                  {app.price}
                </span>
              ) : null}
            </div>

            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              {app.description}
            </p>

            {/* Tags */}
            {app.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {app.tags.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-full capitalize"
                    style={{ background: 'var(--surface-2)', color: 'var(--foreground)', border: '1px solid var(--border)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <a
              href={app.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'var(--accent)', boxShadow: '0 4px 16px rgba(0,113,227,0.3)' }}
            >
              Visit Website
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </motion.div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>More apps</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {related.slice(0, 3).map((a, i) => (
                <AppCard key={a.id} app={a} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

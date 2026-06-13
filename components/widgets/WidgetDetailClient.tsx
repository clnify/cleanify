'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Widget } from '@/types'
import { WidgetCard } from '@/components/widgets/WidgetCard'
import { MasonryGrid } from '@/components/ui/MasonryGrid'

interface WidgetDetailClientProps {
  widget: Widget & { gradient?: string }
  related: (Widget & { gradient?: string })[]
}

export function WidgetDetailClient({ widget, related }: WidgetDetailClientProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link href="/mobile/widgets" className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: 'var(--muted)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Widget Setups
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden mx-auto w-full"
            style={{
              aspectRatio: '9/16',
              maxWidth: '360px',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            {widget.src ? (
              <>
                {!imageLoaded && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${widget.gradient || 'from-slate-800 to-slate-600'} animate-pulse`} />
                )}
                <img
                  src={widget.src}
                  alt={widget.title}
                  className="w-full h-full object-cover"
                  style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.4s' }}
                  onLoad={() => setImageLoaded(true)}
                />
              </>
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${widget.gradient || 'from-slate-800 to-slate-600'}`} />
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-24"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: 'var(--surface-2)', color: 'var(--muted)' }}>
                ⚡ Widget Setup
              </span>
              {widget.featured && (
                <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: 'rgba(0,113,227,0.1)', color: 'var(--accent)' }}>
                  ✦ Featured
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold tracking-tight mb-3" style={{ color: 'var(--foreground)' }}>
              {widget.title}
            </h1>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Platform', value: 'iOS / iPadOS' },
                { label: 'Resolution', value: `${widget.width}×${widget.height}` },
                { label: 'Format', value: widget.filename?.split('.').pop()?.toUpperCase() || 'PNG' },
                { label: 'Added', value: new Date(widget.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) },
              ].map(item => (
                <div key={item.label} className="rounded-xl p-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>{item.label}</div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Tags */}
            {widget.tags?.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>Tags</p>
                <div className="flex flex-wrap gap-2">
                  {widget.tags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1.5 rounded-full capitalize"
                      style={{ background: 'var(--surface-2)', color: 'var(--foreground)', border: '1px solid var(--border)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Download */}
            {widget.src ? (
              <a
                href={widget.src}
                download={widget.filename}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: 'var(--accent)', boxShadow: '0 4px 16px rgba(0,113,227,0.3)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Save Image
              </a>
            ) : (
              <div className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-semibold"
                style={{ background: 'var(--surface-2)', color: 'var(--muted)' }}>
                Demo preview only
              </div>
            )}

            <p className="text-xs text-center mt-3" style={{ color: 'var(--muted)' }}>
              Free to use. Contribute your own via GitHub.
            </p>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>More setups</h2>
            <MasonryGrid>
              {related.slice(0, 6).map(w => (
                <WidgetCard key={w.id} widget={w} />
              ))}
            </MasonryGrid>
          </section>
        )}
      </div>
    </div>
  )
}

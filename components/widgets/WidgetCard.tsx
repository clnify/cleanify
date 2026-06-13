'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Widget } from '@/types'
import { cardVariants } from '@/components/ui/MasonryGrid'

interface WidgetCardProps {
  widget: Widget & { gradient?: string }
}

export function WidgetCard({ widget }: WidgetCardProps) {
  return (
    <motion.div variants={cardVariants} className="group cursor-pointer">
      <Link href={`/mobile/widgets/${widget.slug}`}
        className="block rounded-2xl overflow-hidden relative"
        style={{ aspectRatio: '9/16', boxShadow: 'var(--shadow-sm)' }}
      >
        {widget.src ? (
          <img src={widget.src} alt={widget.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${widget.gradient || 'from-slate-800 to-slate-600'} transition-transform duration-500 group-hover:scale-105`} />
        )}

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }}>
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-white text-sm font-medium truncate">{widget.title}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

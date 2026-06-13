'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { RainmeterSkin } from '@/types'
import { cardVariants } from '@/components/ui/MasonryGrid'

interface RainmeterCardProps {
  skin: RainmeterSkin & { gradient?: string }
}

export function RainmeterCard({ skin }: RainmeterCardProps) {
  return (
    <motion.div variants={cardVariants} className="group cursor-pointer">
      <Link href={`/pc/rainmeter/${skin.slug}`}
        className="block rounded-2xl overflow-hidden relative"
        style={{ aspectRatio: '16/9', boxShadow: 'var(--shadow-sm)' }}
      >
        {skin.src ? (
          <img src={skin.src} alt={skin.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${skin.gradient || 'from-slate-900 to-slate-700'} transition-transform duration-500 group-hover:scale-105`} />
        )}

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}>
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-white text-sm font-semibold truncate">{skin.title}</p>
            <div className="flex items-center gap-1.5 mt-1">
              {skin.tags?.slice(0, 2).map(tag => (
                <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-white/20 text-white/90">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Wallpaper } from '@/types'
import { cardVariants } from '@/components/ui/MasonryGrid'

interface WallpaperCardProps {
  wallpaper: Wallpaper & { gradient?: string }
}

export function WallpaperCard({ wallpaper }: WallpaperCardProps) {
  const [imageError, setImageError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const isMobile = wallpaper.device === 'mobile'
  const href = `/${isMobile ? 'mobile' : 'pc'}/wallpapers/${wallpaper.slug}`

  return (
    <motion.div variants={cardVariants} className="group cursor-pointer">
      <Link href={href} className="block rounded-2xl overflow-hidden relative"
        style={{
          boxShadow: 'var(--shadow-sm)',
          aspectRatio: isMobile ? '9/16' : '16/9',
        }}
      >
        {/* Image or gradient placeholder */}
        {wallpaper.src && !imageError ? (
          <>
            {!loaded && (
              <div className={`absolute inset-0 bg-gradient-to-br ${wallpaper.gradient || 'from-slate-800 to-slate-600'} animate-pulse`} />
            )}
            <img
              src={wallpaper.src}
              alt={wallpaper.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
              onLoad={() => setLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          </>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${wallpaper.gradient || 'from-slate-800 to-slate-600'} transition-transform duration-500 group-hover:scale-105`} />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }}>
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-white text-sm font-medium truncate">{wallpaper.title}</p>
            <div className="flex items-center gap-2 mt-1">
              {wallpaper.tags?.slice(0, 2).map(tag => (
                <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-white/20 text-white/90">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Device badge */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs px-2 py-1 rounded-full font-medium"
            style={{ background: 'rgba(0,0,0,0.5)', color: 'white', backdropFilter: 'blur(10px)' }}>
            {isMobile ? '📱' : '🖥️'}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

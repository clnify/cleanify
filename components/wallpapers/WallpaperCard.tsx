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
  const [loaded, setLoaded] = useState(false)
  const [error,  setError]  = useState(false)

  const isMobile = wallpaper.device === 'mobile'
  const href     = `/${isMobile ? 'mobile' : 'pc'}/wallpapers/${wallpaper.slug}`
  const ratio    = isMobile ? '9 / 16' : '16 / 9'

  return (
    <motion.div variants={cardVariants} style={{ display: 'block' }}>
      <Link href={href} style={{ display: 'block', textDecoration: 'none' }}>
        <div
          className="group"
          style={{
            position: 'relative',
            borderRadius: '14px',
            overflow: 'hidden',
            aspectRatio: ratio,
            background: '#e8e8ed',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            cursor: 'pointer',
          }}
        >
          {/* Image ou gradient de démo */}
          {wallpaper.src && !error ? (
            <>
              {!loaded && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(135deg, #${Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0')} 0%, #${Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0')} 100%)`,
                }} />
              )}
              <img
                src={wallpaper.src}
                alt={wallpaper.title}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  opacity: loaded ? 1 : 0,
                  transition: 'opacity 0.35s ease, transform 0.4s ease',
                }}
              />
            </>
          ) : (
            <div
              className={`bg-gradient-to-br ${wallpaper.gradient || 'from-slate-700 to-slate-500'}`}
              style={{ width: '100%', height: '100%' }}
            />
          )}

          {/* Overlay au hover */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 45%)',
            opacity: 0, transition: 'opacity 0.25s',
          }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = '1'}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = '0'}
          >
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px' }}>
              <p style={{ color: '#fff', fontSize: '13px', fontWeight: 600, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {wallpaper.title}
              </p>
              <div style={{ display: 'flex', gap: '4px', marginTop: '5px', flexWrap: 'wrap' }}>
                {wallpaper.tags?.slice(0, 2).map(tag => (
                  <span key={tag} style={{
                    fontSize: '10px', padding: '2px 7px', borderRadius: '100px',
                    background: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.9)',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

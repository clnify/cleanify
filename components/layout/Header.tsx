'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SearchBar } from '@/components/search/SearchBar'

const navLinks = [
  { label: 'Mobile', href: '/mobile' },
  { label: 'PC',     href: '/pc' },
]

export function Header() {
  const pathname   = usePathname()
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMobileOpen(false), [pathname])

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href + '/'))

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(255,255,255,0.93)' : 'rgba(255,255,255,0.75)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid #e8e8ed' : '1px solid transparent',
      transition: 'background 0.2s, border-color 0.2s',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '0 24px', height: '52px',
        display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', flexShrink: 0 }}>
          <span style={{ fontSize: '18px', lineHeight: 1 }}>☁</span>
          <span style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '-0.01em', color: '#1d1d1f' }}>
            Cleanify
          </span>
        </Link>

        {/* Nav desktop */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2px', marginLeft: '16px' }} className="hidden md:flex">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{
              padding: '6px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: 500,
              textDecoration: 'none',
              color:      isActive(link.href) ? '#0071e3' : '#1d1d1f',
              background: isActive(link.href) ? '#e8f0fe' : 'transparent',
              transition: 'background 0.15s, color 0.15s',
            }}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ flex: 1 }} />

        {/* Search */}
        <div className="hidden sm:block" style={{ width: '190px' }}>
          <SearchBar compact />
        </div>

        {/* Suggest link */}
        <Link href="/suggest" style={{
          display: 'none', padding: '6px 14px', borderRadius: '8px',
          fontSize: '13px', fontWeight: 500, textDecoration: 'none',
          color: '#0071e3', background: '#e8f0fe',
          whiteSpace: 'nowrap',
        }} className="hidden md:block">
          Suggest
        </Link>

        {/* Burger mobile */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="md:hidden"
          style={{
            width: '36px', height: '36px', borderRadius: '8px',
            background: '#f5f5f7', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
          }}
          aria-label="Menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: '15px', height: '1.5px',
              background: '#1d1d1f', borderRadius: '2px',
              transition: 'transform 0.2s, opacity 0.2s',
              opacity:   mobileOpen && i === 1 ? 0 : 1,
              transform: mobileOpen && i === 0 ? 'rotate(45deg) translate(2px, 4px)'
                       : mobileOpen && i === 2 ? 'rotate(-45deg) translate(2px, -4px)'
                       : 'none',
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', background: 'rgba(255,255,255,0.97)', borderTop: '1px solid #e8e8ed' }}
          >
            <div style={{ padding: '12px 20px 16px' }}>
              <div style={{ marginBottom: '12px' }}><SearchBar /></div>
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} style={{
                  display: 'block', padding: '10px 12px', borderRadius: '10px',
                  fontSize: '14px', fontWeight: 500, textDecoration: 'none', marginBottom: '2px',
                  color:      isActive(link.href) ? '#0071e3' : '#1d1d1f',
                  background: isActive(link.href) ? '#e8f0fe' : 'transparent',
                }}>
                  {link.label}
                </Link>
              ))}
              <Link href="/suggest" style={{
                display: 'block', padding: '10px 12px', borderRadius: '10px',
                fontSize: '14px', fontWeight: 500, textDecoration: 'none', marginTop: '4px',
                color: '#0071e3', background: '#e8f0fe',
              }}>
                Suggest content
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

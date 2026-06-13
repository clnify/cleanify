'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchBar } from '@/components/search/SearchBar'

const navLinks = [
  { label: 'Mobile',    href: '/mobile' },
  { label: 'PC',        href: '/pc' },
  { label: 'Widgets',   href: '/mobile/widgets' },
  { label: 'Rainmeter', href: '/pc/rainmeter' },
  { label: 'Apps',      href: '/apps' },
]

export function Header() {
  const pathname = usePathname()
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMobileOpen(false), [pathname])

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href + '/'))

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.70)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: scrolled ? '1px solid #e8e8ed' : '1px solid transparent',
      }}
    >
      <div
        className="mx-auto flex items-center gap-4 px-5"
        style={{ maxWidth: '1280px', height: '52px' }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0 select-none">
          <span style={{ fontSize: '20px', lineHeight: 1 }}>☁️</span>
          <span style={{
            fontWeight: 700,
            fontSize: '15px',
            letterSpacing: '-0.01em',
            color: '#1d1d1f',
          }}>
            Cleanify
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-0.5 ml-3">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                color:      isActive(link.href) ? '#0071e3' : '#1d1d1f',
                background: isActive(link.href) ? '#f0f7ff' : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ flex: 1 }} />

        {/* Search */}
        <div className="hidden sm:block" style={{ width: '200px' }}>
          <SearchBar compact />
        </div>

        {/* Burger */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="md:hidden flex flex-col justify-center items-center gap-1 w-9 h-9 rounded-lg"
          style={{ background: '#f5f5f7', border: 'none', cursor: 'pointer' }}
          aria-label="Menu"
        >
          <span style={{
            display: 'block', width: '16px', height: '1.5px',
            background: '#1d1d1f', borderRadius: '2px',
            transform: mobileOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none',
            transition: 'transform 0.2s',
          }} />
          <span style={{
            display: 'block', width: '16px', height: '1.5px',
            background: '#1d1d1f', borderRadius: '2px',
            opacity: mobileOpen ? 0 : 1,
            transition: 'opacity 0.2s',
          }} />
          <span style={{
            display: 'block', width: '16px', height: '1.5px',
            background: '#1d1d1f', borderRadius: '2px',
            transform: mobileOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none',
            transition: 'transform 0.2s',
          }} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.97)', borderTop: '1px solid #e8e8ed' }}
          >
            <div className="px-5 py-4 space-y-1">
              <div className="pb-3">
                <SearchBar />
              </div>
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2.5 rounded-xl text-sm font-medium"
                  style={{
                    color:      isActive(link.href) ? '#0071e3' : '#1d1d1f',
                    background: isActive(link.href) ? '#f0f7ff' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

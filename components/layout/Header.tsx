'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { SearchBar } from '@/components/search/SearchBar'

const navLinks = [
  { label: 'Mobile', href: '/mobile' },
  { label: 'PC', href: '/pc' },
  { label: 'Widgets', href: '/mobile/widgets' },
  { label: 'Rainmeter', href: '/pc/rainmeter' },
  { label: 'Apps', href: '/apps' },
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setMobileOpen(false), [pathname])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(var(--background-rgb, 255,255,255), 0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-base shrink-0">
          <span className="text-xl">☁️</span>
          <span style={{ color: 'var(--foreground)' }}>Cleanify</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 ml-2">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: pathname === link.href || pathname.startsWith(link.href + '/')
                  ? 'var(--accent)'
                  : 'var(--muted)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search */}
        <div className="hidden sm:block w-48 lg:w-64">
          <SearchBar compact />
        </div>

        <ThemeToggle />

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg"
          style={{ background: 'var(--surface-2)', color: 'var(--foreground)' }}
          aria-label="Menu"
        >
          <motion.div
            animate={mobileOpen ? 'open' : 'closed'}
            className="flex flex-col gap-1"
          >
            <motion.span
              variants={{ open: { rotate: 45, y: 6 }, closed: { rotate: 0, y: 0 } }}
              className="block w-4 h-0.5 rounded-full"
              style={{ background: 'currentColor' }}
            />
            <motion.span
              variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }}
              className="block w-4 h-0.5 rounded-full"
              style={{ background: 'currentColor' }}
            />
            <motion.span
              variants={{ open: { rotate: -45, y: -6 }, closed: { rotate: 0, y: 0 } }}
              className="block w-4 h-0.5 rounded-full"
              style={{ background: 'currentColor' }}
            />
          </motion.div>
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden glass"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <div className="px-4 py-3 space-y-1">
              <div className="pb-3">
                <SearchBar />
              </div>
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 rounded-lg text-sm font-medium"
                  style={{
                    color: pathname.startsWith(link.href) ? 'var(--accent)' : 'var(--foreground)',
                    background: pathname.startsWith(link.href) ? 'var(--surface-2)' : 'transparent',
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

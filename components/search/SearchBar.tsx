'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { SearchResult } from '@/types'

interface SearchBarProps {
  compact?: boolean
}

export function SearchBar({ compact = false }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [focused, setFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data.results || [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => search(query), 200)
    return () => clearTimeout(timer)
  }, [query, search])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const showResults = focused && query.length >= 2

  return (
    <div ref={containerRef} className="relative">
      <div
        className="flex items-center gap-2 rounded-xl px-3 transition-all"
        style={{
          background: 'var(--surface-2)',
          border: focused ? '1.5px solid var(--accent)' : '1.5px solid transparent',
          height: compact ? '34px' : '40px',
        }}
      >
        {/* Search icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--muted)', flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>

        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search..."
          className="flex-1 bg-transparent outline-none text-sm min-w-0"
          style={{ color: 'var(--foreground)' }}
        />

        {loading && (
          <div className="w-3 h-3 border-2 rounded-full animate-spin"
            style={{ borderColor: 'var(--muted)', borderTopColor: 'var(--accent)', flexShrink: 0 }} />
        )}
        {query && !loading && (
          <button
            onClick={() => { setQuery(''); setResults([]); inputRef.current?.focus() }}
            className="text-xs"
            style={{ color: 'var(--muted)' }}
            aria-label="Clear"
          >
            ✕
          </button>
        )}
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-50 shadow-2xl"
            style={{
              background: 'var(--background)',
              border: '1px solid var(--border)',
              minWidth: '280px',
            }}
          >
            {results.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm" style={{ color: 'var(--muted)' }}>
                No results for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <>
                <div className="px-3 py-2 text-xs font-medium" style={{ color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </div>
                <ul className="max-h-72 overflow-y-auto">
                  {results.map(result => (
                    <li key={result.id}>
                      <Link
                        href={`/${result.type === 'wallpaper' ? (result.device === 'pc' ? 'pc' : 'mobile') + '/wallpapers' : result.type === 'app' ? 'apps' : result.type === 'widget' ? 'mobile/widgets' : 'pc/rainmeter'}/${result.slug}`}
                        onClick={() => { setFocused(false); setQuery('') }}
                        className="flex items-center gap-3 px-3 py-2.5 transition-colors hover:opacity-80"
                        style={{ borderBottom: '1px solid var(--border)' }}
                      >
                        {result.src ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0"
                            style={{ background: 'var(--surface-2)' }}>
                            <img src={result.src} alt="" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center text-lg"
                            style={{ background: 'var(--surface-2)' }}>
                            {result.type === 'wallpaper' ? '🖼️' : result.type === 'app' ? '📱' : result.type === 'widget' ? '⚡' : '🎨'}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>
                            {result.title}
                          </div>
                          <div className="text-xs capitalize" style={{ color: 'var(--muted)' }}>
                            {result.type}
                            {result.device && ` · ${result.device}`}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => setFocused(false)}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium"
                  style={{ color: 'var(--accent)', borderTop: '1px solid var(--border)' }}
                >
                  View all results →
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

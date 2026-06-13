'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SearchResult } from '@/types'
import { PageHero } from '@/components/sections/PageHero'

interface SearchPageClientProps {
  initialQuery: string
  initialResults: SearchResult[]
}

export function SearchPageClient({ initialQuery, initialResults }: SearchPageClientProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResult[]>(initialResults)
  const [loading, setLoading] = useState(false)

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
    const timer = setTimeout(() => {
      if (query !== initialQuery) {
        search(query)
        router.replace(`/search?q=${encodeURIComponent(query)}`, { scroll: false })
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [query, search, router, initialQuery])

  function getHref(result: SearchResult) {
    switch (result.type) {
      case 'wallpaper': return `/${result.device === 'pc' ? 'pc' : 'mobile'}/wallpapers/${result.slug}`
      case 'widget': return `/mobile/widgets/${result.slug}`
      case 'rainmeter': return `/pc/rainmeter/${result.slug}`
      case 'app': return `/${result.device === 'pc' ? 'pc' : 'mobile'}/apps/${result.slug}`
      default: return '/'
    }
  }

  const typeIcon = (type: string) => ({ wallpaper: '🖼️', widget: '⚡', rainmeter: '🎨', app: '📱' }[type] || '📄')

  return (
    <div>
      <PageHero title="Search" description="Find wallpapers, widgets, skins, and apps." />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        {/* Search input */}
        <div className="relative mb-8">
          <div className="flex items-center gap-3 rounded-2xl px-4 h-14"
            style={{ background: 'var(--surface)', border: '2px solid var(--border)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--muted)' }}>
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search wallpapers, widgets, apps..."
              className="flex-1 bg-transparent outline-none text-base"
              style={{ color: 'var(--foreground)' }}
              autoFocus
            />
            {loading && (
              <div className="w-4 h-4 border-2 rounded-full animate-spin"
                style={{ borderColor: 'var(--muted)', borderTopColor: 'var(--accent)' }} />
            )}
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
            <div className="space-y-2">
              {results.map((result, i) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    href={getHref(result)}
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:-translate-y-0.5"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{ background: 'var(--surface-2)' }}>
                      {typeIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate" style={{ color: 'var(--foreground)' }}>{result.title}</p>
                      <p className="text-sm capitalize" style={{ color: 'var(--muted)' }}>
                        {result.type}{result.device ? ` · ${result.device}` : ''}
                      </p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" style={{ color: 'var(--muted)', flexShrink: 0 }}>
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {query.length >= 2 && results.length === 0 && !loading && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium text-lg" style={{ color: 'var(--foreground)' }}>
              Nothing found for &ldquo;{query}&rdquo;
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              Try a different keyword
            </p>
          </div>
        )}

        {query.length < 2 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">✨</p>
            <p className="font-medium" style={{ color: 'var(--foreground)' }}>Start typing to search</p>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              Search across all wallpapers, widgets, skins, and apps
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

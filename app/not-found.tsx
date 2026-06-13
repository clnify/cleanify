import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl mb-6">☁️</p>
        <h1 className="text-4xl font-bold tracking-tight mb-3" style={{ color: 'var(--foreground)' }}>
          Page not found
        </h1>
        <p className="text-base mb-8" style={{ color: 'var(--muted)' }}>
          This page has drifted off into the cloud. Let&apos;s get you back to something beautiful.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 rounded-full text-sm font-semibold text-white"
            style={{ background: 'var(--accent)' }}
          >
            Go home
          </Link>
          <Link
            href="/browse"
            className="px-6 py-3 rounded-full text-sm font-semibold"
            style={{ background: 'var(--surface-2)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
          >
            Browse all →
          </Link>
        </div>
      </div>
    </div>
  )
}

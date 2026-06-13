import Link from 'next/link'

const footerLinks = {
  Mobile: [
    { label: 'Wallpapers', href: '/mobile/wallpapers' },
    { label: 'Widgets', href: '/mobile/widgets' },
    { label: 'Apps', href: '/mobile/apps' },
  ],
  PC: [
    { label: 'Wallpapers', href: '/pc/wallpapers' },
    { label: 'Rainmeter', href: '/pc/rainmeter' },
    { label: 'Apps', href: '/pc/apps' },
  ],
  Discover: [
    { label: 'Browse All', href: '/browse' },
    { label: 'Featured', href: '/featured' },
    { label: 'New Arrivals', href: '/new' },
  ],
  Info: [
    { label: 'About', href: '/about' },
    { label: 'Contribute', href: '/contribute' },
    { label: 'GitHub', href: 'https://github.com/your-repo/cleanify' },
  ],
}

export function Footer() {
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-semibold mb-3">
              <span className="text-xl">☁️</span>
              <span style={{ color: 'var(--foreground)' }}>Cleanify</span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              Premium wallpapers and customization tools. Clean aesthetics for every device.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>
                {group}
              </h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:opacity-80"
                      style={{ color: 'var(--foreground)' }}
                      {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}
        >
          <span>© {new Date().getFullYear()} Cleanify. Open source. Git-powered.</span>
          <span>Built with Next.js & deployed on Vercel</span>
        </div>
      </div>
    </footer>
  )
}

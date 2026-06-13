import Link from 'next/link'

const links = {
  Mobile: [
    { label: 'Wallpapers', href: '/mobile/wallpapers' },
    { label: 'Widgets',    href: '/mobile/widgets' },
    { label: 'Apps',       href: '/mobile/apps' },
  ],
  PC: [
    { label: 'Wallpapers', href: '/pc/wallpapers' },
    { label: 'Rainmeter',  href: '/pc/rainmeter' },
    { label: 'Apps',       href: '/pc/apps' },
  ],
  Discover: [
    { label: 'Browse',     href: '/browse' },
    { label: 'Featured',   href: '/featured' },
    { label: 'Search',     href: '/search' },
  ],
  Project: [
    { label: 'About',      href: '/about' },
    { label: 'Contribute', href: '/contribute' },
    { label: 'GitHub',     href: 'https://github.com' },
  ],
}

export function Footer() {
  return (
    <footer style={{ background: '#f5f5f7', borderTop: '1px solid #e8e8ed', marginTop: 'auto' }}>
      <div className="mx-auto px-5 py-12" style={{ maxWidth: '1280px' }}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-1.5 mb-3 select-none">
              <span style={{ fontSize: '20px' }}>☁️</span>
              <span style={{ fontWeight: 700, fontSize: '15px', color: '#1d1d1f' }}>Cleanify</span>
            </Link>
            <p style={{ fontSize: '13px', color: '#6e6e73', lineHeight: '1.6' }}>
              Premium wallpapers and customization tools. Clean aesthetics for every device.
            </p>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6e6e73', marginBottom: '10px' }}>
                {group}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {items.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      style={{ fontSize: '13px', color: '#1d1d1f', textDecoration: 'none' }}
                      {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #e8e8ed', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: '#6e6e73' }}>
            © {new Date().getFullYear()} Cleanify — Open source · Git-powered
          </span>
          <span style={{ fontSize: '12px', color: '#6e6e73' }}>
            Built with Next.js · Deployed on Vercel
          </span>
        </div>
      </div>
    </footer>
  )
}

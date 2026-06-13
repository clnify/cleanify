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
    { label: 'Browse all', href: '/browse' },
    { label: 'Featured',   href: '/featured' },
    { label: 'Search',     href: '/search' },
  ],
  Project: [
    { label: 'About',           href: '/about' },
    { label: 'Suggest content', href: '/suggest' },
    { label: 'GitHub',          href: 'https://github.com/clnify/cleanify' },
  ],
}

export function Footer() {
  return (
    <footer style={{ background: '#f5f5f7', borderTop: '1px solid #e8e8ed' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '32px' }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', marginBottom: '10px' }}>
              <span style={{ fontSize: '18px' }}>☁</span>
              <span style={{ fontWeight: 700, fontSize: '15px', color: '#1d1d1f' }}>Cleanify</span>
            </Link>
            <p style={{ fontSize: '13px', color: '#6e6e73', lineHeight: '1.55' }}>
              Premium wallpapers and customization tools for iOS and PC.
            </p>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6e6e73', marginBottom: '12px' }}>
                {group}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {items.map(item => (
                  <li key={item.href}>
                    <Link href={item.href} style={{ fontSize: '13px', color: '#1d1d1f', textDecoration: 'none' }}
                      {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '36px', paddingTop: '20px', borderTop: '1px solid #e8e8ed', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: '#6e6e73' }}>© {new Date().getFullYear()} Cleanify — Git-powered</span>
          <span style={{ fontSize: '12px', color: '#6e6e73' }}>Built with Next.js · Deployed on Vercel</span>
        </div>
      </div>
    </footer>
  )
}

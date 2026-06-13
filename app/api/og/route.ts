import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') || 'Cleanify'
  const type = searchParams.get('type') || 'wallpaper'

  const typeEmoji: Record<string, string> = {
    wallpaper: '🖼️',
    widget: '⚡',
    rainmeter: '🎨',
    app: '📱',
  }

  const emoji = typeEmoji[type] || '☁️'

  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a0a0a"/>
          <stop offset="100%" style="stop-color:#1a1a2e"/>
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#0071e3"/>
          <stop offset="100%" style="stop-color:#bf5af2"/>
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bg)"/>
      
      <!-- Subtle grid -->
      <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
      </pattern>
      <rect width="1200" height="630" fill="url(#grid)"/>
      
      <!-- Glow circles -->
      <circle cx="200" cy="150" r="300" fill="rgba(0,113,227,0.08)"/>
      <circle cx="1000" cy="480" r="250" fill="rgba(191,90,242,0.06)"/>
      
      <!-- Logo -->
      <text x="80" y="95" font-family="system-ui, sans-serif" font-size="40" fill="white">☁️</text>
      <text x="130" y="90" font-family="system-ui, sans-serif" font-size="26" font-weight="600" fill="white">Cleanify</text>
      
      <!-- Accent line -->
      <rect x="80" y="130" width="80" height="3" rx="2" fill="url(#accent)"/>
      
      <!-- Type badge -->
      <rect x="80" y="160" width="140" height="36" rx="18" fill="rgba(255,255,255,0.08)"/>
      <text x="100" y="183" font-family="system-ui, sans-serif" font-size="16" fill="rgba(255,255,255,0.7)">${emoji} ${type.charAt(0).toUpperCase() + type.slice(1)}</text>
      
      <!-- Title -->
      <text 
        x="80" y="330" 
        font-family="system-ui, -apple-system, sans-serif" 
        font-size="${title.length > 30 ? '52' : '64'}" 
        font-weight="700" 
        fill="white"
        style="letter-spacing: -1px"
      >${title.length > 50 ? title.slice(0, 47) + '…' : title}</text>
      
      <!-- Tagline -->
      <text x="80" y="400" font-family="system-ui, sans-serif" font-size="22" fill="rgba(255,255,255,0.45)">
        Premium customization for iOS &amp; PC
      </text>
      
      <!-- URL -->
      <text x="80" y="560" font-family="ui-monospace, monospace" font-size="18" fill="rgba(255,255,255,0.3)">cleanify.app</text>
    </svg>
  `

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}

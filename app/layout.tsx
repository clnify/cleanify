import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Cleanify — Premium Wallpapers & Customization',
    template: '%s — Cleanify',
  },
  description: 'Premium wallpapers, widgets, Rainmeter skins, and customization apps. Clean aesthetics for iOS and PC.',
  keywords: ['wallpapers', 'widgets', 'rainmeter', 'customization', 'ios', 'iphone', 'desktop', 'minimal', 'aesthetic'],
  authors: [{ name: 'Cleanify' }],
  creator: 'Cleanify',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cleanify.app'),
  openGraph: {
    type: 'website',
    siteName: 'Cleanify',
    title: 'Cleanify — Premium Wallpapers & Customization',
    description: 'Premium wallpapers, widgets, Rainmeter skins, and customization apps.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cleanify',
    description: 'Premium wallpapers, widgets, and customization tools.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}

import { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cleanify.app'
const SITE_NAME = 'Cleanify'
const DEFAULT_DESCRIPTION = 'Premium wallpapers, widgets, and customization tools for iOS and PC. Clean. Beautiful. Free.'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  noIndex?: boolean
}

export function generateMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  image,
  type = 'website',
  noIndex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Premium Wallpapers & Customization`
  const ogImage = image || `${SITE_URL}/og-image.png`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: fullTitle,
      description,
      url: SITE_URL,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: { canonical: SITE_URL },
  }
}

export function generateJsonLd(type: 'WebSite' | 'ImageObject' | 'SoftwareApplication', data: Record<string, unknown>) {
  const base = {
    '@context': 'https://schema.org',
    '@type': type,
  }
  return JSON.stringify({ ...base, ...data })
}

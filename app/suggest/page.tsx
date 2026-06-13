import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Suggest content',
  description: 'Suggest a wallpaper, widget, Rainmeter skin or app to add to Cleanify.',
}

const types = [
  { label: 'Wallpaper',       description: 'A mobile or desktop wallpaper you would like to see added.' },
  { label: 'Widget Setup',    description: 'An iOS home screen widget setup or inspiration.' },
  { label: 'Rainmeter Skin',  description: 'A Windows Rainmeter skin or desktop customization.' },
  { label: 'App',             description: 'A customization app for iOS or PC worth featuring.' },
]

export default function SuggestPage() {
  return (
    <div style={{ paddingTop: '96px', paddingBottom: '80px', padding: '96px 24px 80px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        <h1 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.02em', color: '#1d1d1f', marginBottom: '8px' }}>
          Suggest content
        </h1>
        <p style={{ fontSize: '15px', color: '#6e6e73', lineHeight: '1.6', marginBottom: '36px' }}>
          Cleanify is community-driven. If you have a wallpaper, widget setup, Rainmeter skin or app you would like to see featured, open a GitHub issue — we review every suggestion.
        </p>

        {/* What you can suggest */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '36px' }}>
          {types.map(t => (
            <div key={t.label} style={{
              padding: '20px', borderRadius: '14px',
              background: '#f5f5f7', border: '1px solid #e8e8ed',
            }}>
              <p style={{ fontWeight: 600, fontSize: '14px', color: '#1d1d1f', marginBottom: '4px' }}>{t.label}</p>
              <p style={{ fontSize: '12px', color: '#6e6e73', lineHeight: '1.5' }}>{t.description}</p>
            </div>
          ))}
        </div>

        {/* How to */}
        <div style={{ padding: '28px', background: '#f5f5f7', borderRadius: '16px', border: '1px solid #e8e8ed', marginBottom: '20px' }}>
          <h2 style={{ fontWeight: 600, fontSize: '16px', color: '#1d1d1f', marginBottom: '16px' }}>
            How to suggest
          </h2>
          {[
            { n: '1', text: 'Go to the Cleanify GitHub repository.' },
            { n: '2', text: 'Click "Issues" → "New issue".' },
            { n: '3', text: 'Describe the content: name, link or image, and why it fits.' },
            { n: '4', text: 'Submit — we will review and add it if it meets the guidelines.' },
          ].map(step => (
            <div key={step.n} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{
                flexShrink: 0, width: '22px', height: '22px', borderRadius: '50%',
                background: '#1d1d1f', color: '#fff', fontSize: '11px', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{step.n}</span>
              <p style={{ fontSize: '14px', color: '#1d1d1f', lineHeight: '1.5', marginTop: '2px' }}>{step.text}</p>
            </div>
          ))}
        </div>

        {/* Guidelines */}
        <div style={{ padding: '24px', background: '#fff', borderRadius: '14px', border: '1px solid #e8e8ed', marginBottom: '28px' }}>
          <h2 style={{ fontWeight: 600, fontSize: '14px', color: '#1d1d1f', marginBottom: '12px' }}>Guidelines</h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {[
              'High quality — minimum 1080px wide for images',
              'Original work or content you have rights to share',
              'Appropriate for all audiences',
              'No copyrighted material without permission',
              'No spam or promotional content',
            ].map((g, i) => (
              <li key={i} style={{ fontSize: '13px', color: '#6e6e73', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <span style={{ color: '#34c759', flexShrink: 0, marginTop: '1px' }}>+</span>
                {g}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="https://github.com/clnify/cleanify/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 24px', borderRadius: '100px',
            fontWeight: 600, fontSize: '14px',
            background: '#1d1d1f', color: '#fff', textDecoration: 'none',
          }}
        >
          Open a GitHub issue
        </Link>
      </div>
    </div>
  )
}

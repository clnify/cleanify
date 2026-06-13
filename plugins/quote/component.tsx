'use client'

import { useState, useEffect } from 'react'

const quotes = [
  { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
  { text: 'Design is not just what it looks like. Design is how it works.', author: 'Steve Jobs' },
  { text: 'Less is more.', author: 'Ludwig Mies van der Rohe' },
  { text: 'The details are not the details. They make the design.', author: 'Charles Eames' },
  { text: 'Good design is as little design as possible.', author: 'Dieter Rams' },
]

export default function QuoteWidget() {
  const [quote, setQuote] = useState(quotes[0])

  useEffect(() => {
    const idx = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % quotes.length
    setQuote(quotes[idx])
  }, [])

  return (
    <div className="rounded-2xl p-5"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <p className="text-sm leading-relaxed italic mb-2" style={{ color: 'var(--foreground)' }}>
        &ldquo;{quote.text}&rdquo;
      </p>
      <p className="text-xs" style={{ color: 'var(--muted)' }}>— {quote.author}</p>
    </div>
  )
}

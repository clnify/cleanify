'use client'

import { useState, useEffect } from 'react'

export default function ClockWidget() {
  const [time, setTime] = useState<string>('')
  const [date, setDate] = useState<string>('')

  useEffect(() => {
    function tick() {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
      setDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="rounded-2xl p-5 text-center"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="text-4xl font-bold tracking-tight tabular-nums" style={{ color: 'var(--foreground)' }}>
        {time || '—'}
      </div>
      <div className="text-xs mt-1.5" style={{ color: 'var(--muted)' }}>
        {date || '—'}
      </div>
    </div>
  )
}

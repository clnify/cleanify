'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface FilterOption {
  value: string
  label: string
  icon?: string
}

interface FilterBarProps {
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  label?: string
}

export function FilterBar({ options, value, onChange, label }: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {label && (
        <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{label}</span>
      )}
      {options.map(option => (
        <motion.button
          key={option.value}
          onClick={() => onChange(option.value)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer"
          style={{
            background: value === option.value ? 'var(--accent)' : 'var(--surface-2)',
            color: value === option.value ? 'white' : 'var(--foreground)',
            border: value === option.value ? '1.5px solid var(--accent)' : '1.5px solid transparent',
          }}
        >
          {option.icon && <span className="text-xs">{option.icon}</span>}
          {option.label}
        </motion.button>
      ))}
    </div>
  )
}

interface MultiFilterBarProps {
  options: FilterOption[]
  values: string[]
  onChange: (values: string[]) => void
  label?: string
}

export function MultiFilterBar({ options, values, onChange, label }: MultiFilterBarProps) {
  const toggle = (v: string) => {
    if (values.includes(v)) {
      onChange(values.filter(x => x !== v))
    } else {
      onChange([...values, v])
    }
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {label && (
        <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{label}</span>
      )}
      {options.map(option => {
        const active = values.includes(option.value)
        return (
          <motion.button
            key={option.value}
            onClick={() => toggle(option.value)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer"
            style={{
              background: active ? 'var(--accent)' : 'var(--surface-2)',
              color: active ? 'white' : 'var(--foreground)',
              border: active ? '1.5px solid var(--accent)' : '1.5px solid transparent',
            }}
          >
            {option.icon && <span className="text-xs">{option.icon}</span>}
            {option.label}
          </motion.button>
        )
      })}
    </div>
  )
}

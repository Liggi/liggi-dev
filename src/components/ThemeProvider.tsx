'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export const themes = {
  warmGray: {
    name: 'Warm Gray',
    values: {
      '--background': '#1c1917',
      '--foreground': '#e7e5e4',
      '--card': '#292524',
      '--border': '#57534e',
      '--muted': '#78716c',
      '--muted-bg': '#44403c',
      '--accent': '#fbbf24',
      '--accent-subtle': 'rgba(251, 191, 36, 0.1)',
    },
  },
} as const

export type ThemeKey = keyof typeof themes

interface ThemeContextType {
  theme: ThemeKey
  setTheme: (theme: ThemeKey) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeKey>('warmGray')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme') as ThemeKey | null
    if (saved && themes[saved]) {
      setTheme(saved)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    const themeValues = themes[theme].values

    Object.entries(themeValues).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

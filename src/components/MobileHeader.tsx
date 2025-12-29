'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function MobileHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const isHome = pathname === '/'
  const isAbout = pathname === '/about'

  return (
    <header className="md:hidden border-b-4 border-[var(--border)] bg-[var(--card)]">
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xs text-[var(--accent)]">█▓▒░</span>
          <span className="text-sm font-bold uppercase text-[var(--foreground)]">liggi.dev</span>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 text-[var(--foreground)] hover:bg-[var(--muted-bg)]"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-[var(--border)] bg-[var(--card)] p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={`block py-2 px-3 text-sm ${
                  isHome
                    ? 'bg-[var(--accent-subtle)] text-[var(--accent)] border-l-2 border-[var(--accent)]'
                    : 'text-[var(--foreground)] hover:bg-[var(--muted-bg)]'
                }`}
              >
                [1] All Posts
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className={`block py-2 px-3 text-sm ${
                  isAbout
                    ? 'bg-[var(--accent-subtle)] text-[var(--accent)] border-l-2 border-[var(--accent)]'
                    : 'text-[var(--foreground)] hover:bg-[var(--muted-bg)]'
                }`}
              >
                [2] About
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

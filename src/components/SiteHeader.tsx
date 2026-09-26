'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Ramp() {
  return (
    <span className="ramp" aria-hidden>
      <span>█</span><span>▓</span><span>▒</span><span>░</span>
    </span>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const link = (href: string, label: string) => {
    const active = href === '/' ? pathname === '/' || pathname.startsWith('/posts') : pathname === href
    return (
      <Link
        href={href}
        className={`transition-colors hover:text-[var(--foreground)] ${active ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}`}
      >
        {label}
      </Link>
    )
  }
  return (
    <header className="mono mx-auto flex max-w-[1120px] items-center justify-between px-5 pt-6 md:px-10 md:pt-8">
      <Link href="/" className="flex items-center gap-3 text-[var(--foreground)]">
        <Ramp />
        <span>liggi.dev</span>
      </Link>
      <nav className="flex gap-6">
        {link('/', 'writing')}
        {link('/about', 'about')}
      </nav>
    </header>
  )
}

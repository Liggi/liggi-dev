'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  postCount?: number
}

export function Sidebar({ postCount = 0 }: SidebarProps) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <aside className="w-64 border-r-4 border-[var(--border)] bg-[var(--card)] p-6 flex flex-col min-h-screen">
      <div className="mb-8">
        <div className="mb-1 text-xs text-[var(--accent)]">█▓▒░</div>
        <h1 className="mb-2 text-lg font-bold uppercase text-[var(--foreground)]">
          liggi.dev
        </h1>
        <div className="h-1 w-12 bg-[var(--accent)]"></div>
      </div>

      <nav className="space-y-6 flex-1">
        <div>
          <div className="mb-2 text-xs uppercase text-[var(--muted)]">▓ Browse</div>
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                className={`block py-1 pl-3 text-left text-sm text-[var(--foreground)] ${
                  isHome
                    ? 'border-l-2 border-[var(--border)] bg-[var(--accent)]/10'
                    : 'hover:bg-[var(--muted-bg)]'
                }`}
              >
                All Posts
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-2 text-xs uppercase text-[var(--muted)]">▓ Topics</div>
          <ul className="space-y-1">
            <li className="text-xs text-[var(--muted)]">→ paradox games</li>
            <li className="text-xs text-[var(--muted)]">→ community</li>
            <li className="text-xs text-[var(--muted)]">→ sentiment</li>
          </ul>
        </div>

        <div>
          <div className="mb-2 text-xs uppercase text-[var(--muted)]">▓ Info</div>
          <div className="text-xs text-[var(--muted)] space-y-1">
            <p>A working space for notes, research, and explorations.</p>
            <p className="text-[var(--accent)]">{postCount} files</p>
          </div>
        </div>
      </nav>

      <div className="pt-6 border-t border-[var(--border)]">
        <div className="text-xs text-[var(--muted)]">
          █▓▒░ liggi.dev
        </div>
      </div>
    </aside>
  )
}

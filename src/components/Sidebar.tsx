'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  postCount?: number
}

export function Sidebar({ postCount = 0 }: SidebarProps) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isAbout = pathname === '/about'

  return (
    <aside className="hidden md:flex w-64 border-r-4 border-[var(--border)] bg-[var(--card)] p-6 flex-col min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-[var(--accent)] mb-1">█▓▒░</div>
            <h1 className="text-sm font-bold uppercase text-[var(--foreground)]">
              liggi.dev
            </h1>
          </div>
          <div className="border-2 border-[var(--border)] p-0.5 bg-[var(--background)]">
            <Image
              src="/avatar.jpg"
              alt="Jason Liggi"
              width={40}
              height={40}
              className="block"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </div>
        <div className="h-1 w-full bg-[var(--accent)]"></div>
      </div>

      <nav className="space-y-4 flex-1">
        {/* Browse Section */}
        <div className="border-2 border-[var(--border)] p-3">
          <div className="mb-3 border-b border-[var(--border)] pb-1 text-xs uppercase text-[var(--accent)]">
            Browse
          </div>
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                className={`flex items-center gap-2 py-1 pl-3 text-left text-sm text-[var(--foreground)] ${
                  isHome
                    ? 'border-l-2 border-[var(--border)] bg-[var(--accent-subtle)]'
                    : 'hover:bg-[var(--muted-bg)]'
                }`}
              >
                <span className={isHome ? 'text-[var(--accent)]' : 'text-[var(--muted)]'}>[1]</span>
                All Posts
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`flex items-center gap-2 py-1 pl-3 text-left text-sm text-[var(--foreground)] ${
                  isAbout
                    ? 'border-l-2 border-[var(--border)] bg-[var(--accent-subtle)]'
                    : 'hover:bg-[var(--muted-bg)]'
                }`}
              >
                <span className={isAbout ? 'text-[var(--accent)]' : 'text-[var(--muted)]'}>[2]</span>
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Topics Section */}
        <div className="border-2 border-[var(--border)] p-3">
          <div className="mb-3 border-b border-[var(--border)] pb-1 text-xs uppercase text-[var(--accent)]">
            Topics
          </div>
          <ul className="space-y-1">
            <li className="text-xs text-[var(--muted)]">01 → large language models</li>
            <li className="text-xs text-[var(--muted)]">02 → paradox games</li>
          </ul>
        </div>

        {/* Info Section */}
        <div className="border-2 border-[var(--border)] p-3">
          <div className="mb-3 border-b border-[var(--border)] pb-1 text-xs uppercase text-[var(--accent)]">
            Info
          </div>
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

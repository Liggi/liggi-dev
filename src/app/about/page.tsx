import { Sidebar } from '@/components/Sidebar'
import { MobileHeader } from '@/components/MobileHeader'
import { posts } from '@/lib/posts'

export default function AboutPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[var(--background)]">
      <MobileHeader />
      <Sidebar postCount={posts.length} />
      <main className="flex-1 p-4 md:p-8">
      <div className="max-w-4xl">
        <div className="space-y-10">
          {/* Section 01: about */}
          <section className="pl-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[var(--accent)]">█</span>
              <span className="text-[var(--accent)] opacity-70">▓</span>
              <span className="text-[var(--accent)] opacity-40">▒</span>
              <span className="text-[var(--accent)] opacity-20">░</span>
              <span className="text-xs text-[var(--muted)]">01</span>
              <h2 className="text-xl font-bold text-[var(--foreground)]">about</h2>
            </div>
            <div className="space-y-4 text-[var(--foreground)] leading-relaxed">
              <p>software engineer. LLM obsessive. i spend a lot of time figuring out how to make LLMs do interesting things.</p>
              <p>i work at <a href="https://talktoash.com" className="text-[var(--accent)] hover:underline">talktoash.com</a>, building AIs that help people with their mental wellbeing. for fun, i make LLMs generate narrative content, mostly for paradox games (i&apos;m a huge grand strategy fan). but really i&apos;m just interested in pushing what these things can actually do.</p>
            </div>
          </section>

          {/* Section 02: contact */}
          <section className="pl-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[var(--accent)]">█</span>
              <span className="text-[var(--accent)] opacity-70">▓</span>
              <span className="text-[var(--accent)] opacity-40">▒</span>
              <span className="text-[var(--accent)] opacity-20">░</span>
              <span className="text-xs text-[var(--muted)]">02</span>
              <h2 className="text-xl font-bold text-[var(--foreground)]">contact</h2>
            </div>
            <div>
              <div className="flex gap-3">
                <a
                  href="mailto:jasonliggi@gmail.com"
                  className="text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--background)] p-2 border-2 border-[var(--border)] transition-colors"
                  aria-label="Email"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/liggi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--background)] p-2 border-2 border-[var(--border)] transition-colors"
                  aria-label="X"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/liggi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--background)] p-2 border-2 border-[var(--border)] transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
      </main>
    </div>
  )
}

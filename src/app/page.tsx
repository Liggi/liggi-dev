import Link from 'next/link'
import Image from 'next/image'
import { getSortedPosts } from '@/lib/posts'
import { SiteHeader, Ramp } from '@/components/SiteHeader'
import { PixelReveal } from '@/components/PixelReveal'

const featuredLine: Record<string, { quote: string; source: string; topics: string }> = {
  '2026-09-26': { quote: 'Nobody wrote the Maccus story. It was sitting in the save.', source: 'from the post', topics: 'crusader kings 3 · llms' },
  '2025-12-29': { quote: 'The unwounded man has no saga', source: 'a motto from the post', topics: 'crusader kings 3 · llms' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toLowerCase().replace('sept', 'sep')
}

export default function Home() {
  const posts = getSortedPosts()

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader />

      <main className="mx-auto max-w-[1120px] px-5 md:px-10">
        {/* Who */}
        <section className="grid gap-6 pb-16 pt-16 md:grid-cols-[88px_1fr] md:gap-10 md:pb-24 md:pt-28">
          <div className="h-[64px] w-[64px] overflow-hidden md:h-[88px] md:w-[88px]">
            <Image
              src="/avatar.jpg"
              alt="Jason Liggi"
              width={88}
              height={88}
              className="h-full w-full"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          <div className="max-w-[760px]">
            <h1 className="text-[34px] leading-[1.15] tracking-[-0.01em] text-[var(--foreground)] md:text-[52px] md:leading-[1.08]">
              software engineer. LLM obsessive. i spend a lot of time figuring out how to make LLMs do{' '}
              <em className="accent-words text-[var(--accent)]"><PixelReveal text="interesting things" /></em>.
            </h1>
            <p className="mt-6 max-w-[620px] text-[19px] leading-[1.6] text-[var(--muted)] md:mt-8">
              i work at{' '}
              <a href="https://talktoash.com" className="text-[var(--foreground)] underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--accent)]">
                talktoash.com
              </a>
              , building AIs that help people with their mental wellbeing. for fun, i make LLMs generate narrative content,
              mostly for paradox games.
            </p>
          </div>
        </section>

        {/* Writing */}
        <section className="md:grid md:grid-cols-[88px_1fr] md:gap-10">
          <div className="mono pt-1 text-[var(--muted)]">writing</div>
          <div>
            <p className="mb-8 mt-3 text-[17px] italic text-[var(--muted)] md:mt-0">
              Thoughts, things I&apos;m working on, ideas, experiments. Sometimes written by me, sometimes an LLM. Sometimes a mix.
            </p>
            <ol className="border-t border-[var(--border)]">
              {posts.map((post, i) => {
                const extra = featuredLine[post.slug]
                return (
                  <li key={post.slug} className="border-b border-[var(--border)]">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="group grid gap-3 py-8 md:grid-cols-[1fr_200px] md:gap-10 md:py-10"
                    >
                      <div>
                        <div className="mono mb-3 flex gap-4 text-[var(--muted)]">
                          <span className="text-[var(--accent)]">{String(posts.length - i).padStart(3, '0')}</span>
                          <span>{formatDate(post.date)}</span>
                          {extra && <span className="hidden md:inline">{extra.topics}</span>}
                        </div>
                        <h2 className="text-[28px] leading-[1.15] text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)] md:text-[38px]">
                          {post.title}
                        </h2>
                        <p className="mt-3 max-w-[560px] text-[18px] leading-[1.5] text-[var(--muted)]">{post.excerpt}</p>
                      </div>
                      {extra && (
                        <blockquote className="motto self-end border-l border-[var(--accent)] pl-4 md:mb-1">
                          “{extra.quote}”
                          <span className="mono mt-2 block not-italic text-[var(--muted)]">{extra.source}</span>
                        </blockquote>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        <footer className="mono mb-10 mt-24 flex flex-col gap-4 border-t border-[var(--border)] pt-6 text-[var(--muted)] md:mt-32 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-6">
            <a className="hover:text-[var(--foreground)]" href="mailto:jasonliggi@gmail.com">email</a>
            <a className="hover:text-[var(--foreground)]" href="https://x.com/liggi">x / @liggi</a>
            <a className="hover:text-[var(--foreground)]" href="https://github.com/liggi">github</a>
          </div>
          <div className="flex items-center gap-3"><Ramp /> liggi.dev</div>
        </footer>
      </main>
    </div>
  )
}

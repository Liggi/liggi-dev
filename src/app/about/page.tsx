import { SiteHeader } from '@/components/SiteHeader'

const link = 'text-[var(--foreground)] underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--accent)]'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader />
      <main className="mx-auto max-w-[1120px] px-5 pb-16 pt-16 md:px-10 md:pt-28">
        <section className="md:grid md:grid-cols-[88px_1fr] md:gap-10">
          <div className="mono mb-3 pt-1 text-[var(--accent)] md:mb-0">01 about</div>
          <div className="max-w-[620px] space-y-5 text-[19px] leading-[1.6] text-[var(--muted)]">
            <p className="text-[var(--foreground)]">software engineer. LLM obsessive. i spend a lot of time figuring out how to make LLMs do interesting things.</p>
            <p>i work at <a href="https://talktoash.com" className={link}>talktoash.com</a>, building AIs that help people with their mental wellbeing. for fun, i make LLMs generate narrative content, mostly for paradox games (i&apos;m a huge grand strategy fan). but really i&apos;m just interested in pushing what these things can actually do.</p>
          </div>
        </section>

        <section className="mt-16 border-t border-[var(--border)] pt-8 md:grid md:grid-cols-[88px_1fr] md:gap-10">
          <div className="mono mb-3 pt-1 text-[var(--accent)] md:mb-0">02 contact</div>
          <ul className="mono space-y-2 text-[var(--muted)]">
            <li><a href="mailto:jasonliggi@gmail.com" className="hover:text-[var(--foreground)]">email → jasonliggi@gmail.com</a></li>
            <li><a href="https://x.com/liggi" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)]">x → @liggi</a></li>
            <li><a href="https://github.com/liggi" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)]">github → liggi</a></li>
          </ul>
        </section>
      </main>
    </div>
  )
}

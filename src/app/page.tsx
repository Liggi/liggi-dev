import Link from 'next/link'
import { getSortedPosts } from '@/lib/posts'
import { Sidebar } from '@/components/Sidebar'

export default function Home() {
  const posts = getSortedPosts()

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar postCount={posts.length} />

      <main className="flex-1 p-8">
        <header className="mb-8">
          <div className="mb-2 text-xs text-[var(--muted)]">/workspace/posts</div>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            Thoughts, things I'm working on, ideas, experiments. Sometimes written by me, sometimes an LLM. Sometimes a mix.
          </p>
        </header>

        {/* File list header */}
        <div className="grid grid-cols-[50px_1fr_90px] gap-4 px-3 pb-2 text-xs font-bold uppercase text-[var(--muted)]">
          <span>ID</span>
          <span>Title</span>
          <span className="text-right">Date</span>
        </div>

        {/* Post list */}
        <div className="space-y-1">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="grid grid-cols-[50px_1fr_90px] gap-4 border-2 border-transparent bg-[var(--card)] p-3 text-left transition-all hover:border-[var(--border)] hover:bg-[var(--muted-bg)]"
            >
              <span className="text-sm text-[var(--accent)]">
                [{String(index + 1).padStart(3, '0')}]
              </span>
              <span className="text-sm font-bold text-[var(--foreground)]">
                {post.title}
              </span>
              <span className="text-right text-xs text-[var(--muted)]">
                {post.date}
              </span>
            </Link>
          ))}
        </div>

        {/* Status bar */}
        <div className="mt-8 border-t-2 border-[var(--border)] bg-[var(--card)] p-3">
          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
            <span>{posts.length} files</span>
            <span>█▓▒░ liggi.dev</span>
          </div>
        </div>
      </main>
    </div>
  )
}

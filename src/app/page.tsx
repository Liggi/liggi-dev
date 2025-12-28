import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import { format, parseISO } from 'date-fns'
import { Sidebar } from '@/components/Sidebar'

export default function Home() {
  const posts = getSortedPostsData()

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar postCount={posts.length} />

      <main className="flex-1 p-8">
        <header className="mb-8">
          <div className="mb-2 text-xs text-[var(--muted)]">/workspace/posts</div>
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            Daily sentiment reports and analysis. Sometimes AI-generated. Sometimes edited.
            Sometimes both.
          </p>
        </header>

        {/* File list header */}
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 border-b-2 border-[var(--border)] pb-2 text-xs font-bold uppercase text-[var(--muted)]">
          <span>ID</span>
          <span>Title</span>
          <span>Date</span>
        </div>

        {/* Post list */}
        <div className="space-y-1">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="grid grid-cols-[auto_1fr_auto] gap-4 border-2 border-transparent bg-[var(--card)] p-3 text-left transition-all hover:border-[var(--border)] hover:bg-[var(--muted-bg)]"
            >
              <span className="text-sm text-[var(--accent)]">
                [{String(index + 1).padStart(3, '0')}]
              </span>
              <span className="text-sm font-bold text-[var(--foreground)]">
                {post.title}
              </span>
              <span className="text-xs text-[var(--muted)]">
                {format(parseISO(post.date), 'yyyy-MM-dd')}
              </span>
            </Link>
          ))}
        </div>

        {/* Status bar */}
        <div className="mt-8 border-t-2 border-[var(--border)] bg-[var(--card)] p-3">
          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
            <span>{posts.length} files</span>
            <span>█▓▒░ Community sentiment analysis</span>
            <span>Paradox Interactive</span>
          </div>
        </div>
      </main>
    </div>
  )
}

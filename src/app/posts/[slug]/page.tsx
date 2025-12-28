import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostData, getAllPostSlugs, getSortedPostsData } from '@/lib/posts'
import { format, parseISO } from 'date-fns'
import { Sidebar } from '@/components/Sidebar'

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for the post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostData(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} | liggi.dev`,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostData(slug)
  const allPosts = getSortedPostsData()

  if (!post) {
    notFound()
  }

  const formattedDate = format(parseISO(post.date), 'yyyy-MM-dd')

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar postCount={allPosts.length} />

      <main className="flex-1 p-8">
        {/* Header */}
        <header className="mb-8 border-b-2 border-[var(--border)] pb-6">
          <Link
            href="/"
            className="mb-4 inline-block text-xs text-[var(--muted)] hover:text-[var(--accent)]"
          >
            ← BACK TO INDEX
          </Link>
          <div className="mb-2 text-xs text-[var(--muted)]">
            /workspace/posts/{slug}
          </div>
          <h1 className="mb-2 text-xl font-bold text-[var(--foreground)]">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
            <span>Modified: {formattedDate}</span>
            <span>█▓▒░</span>
          </div>
        </header>

        {/* Content */}
        <article className="max-w-3xl">
          <div
            className="prose-terminal"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
          />
        </article>

        {/* Footer */}
        <footer className="mt-12 border-t-2 border-[var(--border)] bg-[var(--card)] p-3">
          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
            <span>END OF FILE</span>
            <span>█▓▒░ liggi.dev</span>
          </div>
        </footer>
      </main>
    </div>
  )
}

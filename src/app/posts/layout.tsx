import { Sidebar } from '@/components/Sidebar'
import { posts } from '@/lib/posts'

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar postCount={posts.length} />
      {children}
    </div>
  )
}

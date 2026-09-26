import { SiteHeader } from '@/components/SiteHeader'

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader />
      {children}
    </div>
  )
}

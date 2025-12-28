import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { format, parseISO } from 'date-fns';

export default function Home() {
  const posts = getSortedPostsData();
  const recentPosts = posts.slice(0, 10);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto max-w-2xl px-6 py-16">
        <header className="mb-16">
          <h1 className="text-3xl font-bold tracking-tight">
            Jason Liggi
          </h1>
          <p className="mt-2 text-[var(--muted)]">
            Notes, research, and explorations.
          </p>
        </header>

        <section>
          <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
            Recent Posts
          </h2>

          {recentPosts.length === 0 ? (
            <p className="text-[var(--muted)]">
              No posts yet. Check back soon.
            </p>
          ) : (
            <ul className="space-y-8">
              {recentPosts.map((post) => (
                <li key={post.slug}>
                  <article>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="group block"
                    >
                      <time className="text-sm text-[var(--muted)]">
                        {format(parseISO(post.date), 'MMMM d, yyyy')}
                      </time>
                      <h3 className="mt-1 text-lg font-medium group-hover:opacity-70">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-[var(--muted)] line-clamp-2">
                        {post.excerpt}
                      </p>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}

          {posts.length > 10 && (
            <div className="mt-12">
              <Link
                href="/posts"
                className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                View all posts &rarr;
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { format, parseISO } from 'date-fns';

export default function Home() {
  const posts = getSortedPostsData();
  const recentPosts = posts.slice(0, 10);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto max-w-2xl px-6 py-16">
        <header className="mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Jason Liggi
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Notes, research, and explorations.
          </p>
        </header>

        <section>
          <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
            Recent Posts
          </h2>

          {recentPosts.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400">
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
                      <time className="text-sm text-zinc-500 dark:text-zinc-500">
                        {format(parseISO(post.date), 'MMMM d, yyyy')}
                      </time>
                      <h3 className="mt-1 text-lg font-medium text-zinc-900 group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-300">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-zinc-600 dark:text-zinc-400 line-clamp-2">
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
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
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

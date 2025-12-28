import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostData, getAllPostSlugs } from '@/lib/posts';
import { format, parseISO } from 'date-fns';

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for the post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <article className="mx-auto max-w-2xl px-6 py-16">
        <header className="mb-12">
          <Link
            href="/"
            className="mb-8 inline-block text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            &larr; Back
          </Link>
          <time className="block text-sm text-zinc-500 dark:text-zinc-500">
            {format(parseISO(post.date), 'MMMM d, yyyy')}
          </time>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {post.title}
          </h1>
        </header>

        <div
          className="prose prose-zinc dark:prose-invert max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-zinc-700 dark:prose-p:text-zinc-300
            prose-a:text-zinc-900 dark:prose-a:text-zinc-100
            prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100
            prose-blockquote:border-zinc-300 dark:prose-blockquote:border-zinc-700
            prose-code:text-zinc-800 dark:prose-code:text-zinc-200
            prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-900"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
        />
      </article>
    </div>
  );
}

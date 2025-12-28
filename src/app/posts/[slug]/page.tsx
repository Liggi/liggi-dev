import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostData, getAllPostSlugs } from '@/lib/posts';
import { format, parseISO } from 'date-fns';
import { BlogPostLayout } from '@/components/BlogPostLayout';

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

  const formattedDate = format(parseISO(post.date), 'MMMM d, yyyy');

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <Link
          href="/"
          className="inline-block text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          &larr; Back
        </Link>
      </div>
      <BlogPostLayout
        title={post.title}
        date={formattedDate}
        contentHtml={post.contentHtml || ''}
      />
    </div>
  );
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
}

// Claudia adds new posts here
export const posts: PostMeta[] = [
  {
    slug: '2025-12-29',
    title: 'Teaching LLMs to Think in Old Norse',
    date: '2025-12-29',
    excerpt: 'Research, personas, and quality filtering for procedural text generation.',
  },
]

export function getSortedPosts(): PostMeta[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  contentHtml?: string;
}

// Extract date from filename like "paradox_community_sentiment_2025-12-27.md"
function extractDateFromFilename(filename: string): string | null {
  const match = filename.match(/(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : null;
}

// Extract title from first H1 in markdown content
function extractTitleFromContent(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : 'Untitled';
}

// Extract excerpt from content (first paragraph after title)
function extractExcerpt(content: string, maxLength: number = 200): string {
  // Remove the title line and get first substantive paragraph
  const lines = content.split('\n');
  let excerptLines: string[] = [];
  let foundContent = false;

  for (const line of lines) {
    // Skip title and empty lines at start
    if (!foundContent && (line.startsWith('#') || line.trim() === '')) continue;

    foundContent = true;

    // Stop at next heading or after getting enough content
    if (line.startsWith('#')) break;

    excerptLines.push(line);
    if (excerptLines.join(' ').length > maxLength) break;
  }

  const excerpt = excerptLines.join(' ').trim();
  return excerpt.length > maxLength
    ? excerpt.slice(0, maxLength).trim() + '...'
    : excerpt;
}

export function getSortedPostsData(): PostData[] {
  // Ensure directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName): PostData | null => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Parse frontmatter
      const { data, content } = matter(fileContents);

      // Use frontmatter if available, otherwise extract from content
      const title = data.title || extractTitleFromContent(content);
      const date = data.date
        ? (typeof data.date === 'string' ? data.date : data.date.toISOString().split('T')[0])
        : extractDateFromFilename(fileName) || '1970-01-01';
      const excerpt = data.excerpt || extractExcerpt(content);

      return {
        slug,
        title,
        date,
        excerpt,
      };
    })
    .filter((post): post is PostData => post !== null);

  // Sort by date descending
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

export async function getPostData(slug: string): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Convert markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  // Use frontmatter if available, otherwise extract
  const title = data.title || extractTitleFromContent(content);
  const date = data.date
    ? (typeof data.date === 'string' ? data.date : data.date.toISOString().split('T')[0])
    : extractDateFromFilename(slug) || '1970-01-01';
  const excerpt = data.excerpt || extractExcerpt(content);

  return {
    slug,
    title,
    date,
    excerpt,
    contentHtml,
  };
}

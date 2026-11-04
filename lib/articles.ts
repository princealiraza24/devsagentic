export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  path: string;
};

export const articles: Article[] = [
  {
    slug: 'migrating-ai-dashboards-vite-to-nextjs',
    title: 'Why Client-Side Rendering Can Be Bad for SEO — and How Next.js Can Help',
    description:
      'Learn how client-side rendering and SPA architecture create search indexing challenges, and how Next.js Server Components and ISR help solve them.',
    category: 'Frontend Architecture',
    tags: ['Next.js', 'SEO', 'React', 'Frontend Architecture'],
    author: 'Ali Raza',
    publishedAt: '2026-09-12',
    updatedAt: '2026-11-04',
    readingTime: '8 min read',
    path: '/blog/migrating-ai-dashboards-vite-to-nextjs',
  },
  {
    slug: 'nextjs-server-components-explained',
    title: 'Next.js Server Components Explained: When to Use Them',
    description:
      'A practical guide to Server Components, Client Components, data fetching, and choosing the right boundary in a Next.js application.',
    category: 'Frontend Architecture',
    tags: ['Next.js', 'React', 'Server Components'],
    author: 'Ali Raza',
    publishedAt: '2026-11-04',
    updatedAt: '2026-11-04',
    readingTime: '12 min read',
    path: '/blog/nextjs-server-components-explained',
  },
  {
    slug: 'reliable-ai-agent-error-handling',
    title: 'Designing Reliable Error Handling for AI Agent Workflows',
    description:
      'Practical patterns for retries, validation, timeouts, fallbacks, and observable failures in tool-using AI agents.',
    category: 'Agentic Workflows',
    tags: ['AI Agents', 'Reliability', 'Agentic Workflows'],
    author: 'Ali Raza',
    publishedAt: '2026-11-04',
    updatedAt: '2026-11-04',
    readingTime: '13 min read',
    path: '/blog/reliable-ai-agent-error-handling',
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const article = getArticle(slug);
  if (!article) return [];

  return articles
    .filter((candidate) => candidate.slug !== slug)
    .sort((a, b) => {
      const aMatches = a.tags.filter((tag) => article.tags.includes(tag)).length;
      const bMatches = b.tags.filter((tag) => article.tags.includes(tag)).length;
      return bMatches - aMatches;
    })
    .slice(0, limit);
}

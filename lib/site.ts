export const siteConfig = {
  name: 'DevsAgentic',
  description: 'Practical articles and tools for AI engineering, agentic workflows, and modern web development.',
  author: {
    name: 'Ali Raza',
    url: '/about',
  },
};

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

export function absoluteUrl(path: string): string {
  return new URL(path, getSiteUrl()).toString();
}

export const siteConfig = {
  name: 'DevsAgentic',
  description: 'Practical articles and tools for AI engineering, agentic workflows, and modern web development.',
  author: {
    name: 'Ali Raza',
    url: '/author/ali-raza',
  },
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@devagentic.tech',
  privacyEmail: process.env.NEXT_PUBLIC_PRIVACY_EMAIL || 'privacy@devagentic.tech',
};

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://devagentic.tech';
}

export function absoluteUrl(path: string): string {
  return new URL(path, getSiteUrl()).toString();
}

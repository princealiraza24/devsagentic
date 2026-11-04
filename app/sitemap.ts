import type { MetadataRoute } from 'next';
import {absoluteUrl} from '@/lib/site';
import {articles} from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    '',
    '/about',
    '/advertising-disclosure',
    '/blog',
    '/contact',
    '/cookies',
    '/editorial-policy',
    '/privacy',
    '/terms',
    '/tools/token-estimator',
    '/tools',
    '/tools/json-formatter',
    '/author/ali-raza',
  ];

  return [...pages, ...articles.map((article) => article.path)].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path.startsWith('/blog/') ? 'monthly' : 'weekly',
    priority: path === '' ? 1 : path.startsWith('/blog/') ? 0.8 : 0.6,
  }));
}

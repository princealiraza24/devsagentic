import { Metadata } from 'next';
import {articles} from '@/lib/articles';
import BlogFilters from '@/components/BlogFilters';

export const metadata: Metadata = {
  title: 'Engineering Blog',
  description: 'Technical articles on Frontend Architecture, Agentic Workflows, and Backend Integration.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogIndex() {
  const categories = Array.from(new Set(articles.map((article) => article.category)));

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Engineering Blog</h1>
        <p className="text-xl text-slate-600">Technical insights, tutorials, and architectural patterns.</p>
      </div>

      <BlogFilters articles={articles} categories={categories} />
    </div>
  );
}
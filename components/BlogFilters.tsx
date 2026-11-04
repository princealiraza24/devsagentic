'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Article } from '@/lib/articles';

export default function BlogFilters({ articles, categories }: { articles: Article[]; categories: string[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const visibleArticles =
    selectedCategory === 'All'
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <>
      <div className="mb-12 flex space-x-4 overflow-x-auto border-b border-slate-200 pb-4" role="group" aria-label="Filter articles by category">
        {['All', ...categories].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            aria-pressed={selectedCategory === category}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-8">
        {visibleArticles.map((article) => (
          <article key={article.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-8">
            <div className="mb-3 flex items-center space-x-3 text-sm text-slate-500">
              <span className="rounded-full bg-blue-50 px-2.5 py-1 font-medium text-blue-600">{article.category}</span>
              <span aria-hidden="true">•</span>
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <Link href={article.path}>
              <h2 className="mb-3 text-2xl font-bold text-slate-900 transition-colors hover:text-blue-600">
                {article.title}
              </h2>
            </Link>
            <p className="mb-4 leading-relaxed text-slate-600">{article.description}</p>
            <Link href={article.path} className="inline-flex text-sm font-semibold text-blue-600 hover:underline">
              Read article →
            </Link>
          </article>
        ))}
      </div>
      {visibleArticles.length === 0 && (
        <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
          No articles are available in this category yet.
        </p>
      )}
    </>
  );
}

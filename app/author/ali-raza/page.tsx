import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Ali Raza, Author',
  description: 'Learn about Ali Raza, the author and maintainer of DevsAgentic.',
  alternates: { canonical: '/author/ali-raza' },
};

export default function AliRazaAuthorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
        AR
      </div>
      <h1 className="mb-4 text-4xl font-extrabold text-slate-900">Ali Raza</h1>
      <div className="prose prose-slate max-w-none">
        <p>
          Ali Raza is a software engineering student and founder of Ionix Growth. He writes about
          Next.js, AI agent workflows, developer tooling, and practical web architecture.
        </p>
        <p>
          DevsAgentic documents implementation lessons from real projects and experiments. The
          goal is to help developers make better technical decisions with clear examples and
          honest trade-offs.
        </p>
        <h2>Articles by Ali</h2>
        <ul>
          {articles.map((article) => (
            <li key={article.slug}>
              <Link href={article.path}>{article.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

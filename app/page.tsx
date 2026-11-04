import Link from 'next/link';
import { ArrowRight, Braces, Calculator, Code2 } from 'lucide-react';
import { articles } from '@/lib/articles';

export const metadata = {
  title: 'DevsAgentic | AI Engineering and Web Development',
  description: 'Practical articles and tools for AI engineering, agentic workflows, and modern web development.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 px-4 text-center bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Architecting the Future of <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Agentic Workflows</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore deep technical insights, modern web development strategies, and robust tooling for the next generation of AI-powered applications.
          </p>
          <div className="flex justify-center gap-4 pt-6">
            <Link href="/blog" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Read Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/tools/token-estimator" className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors">
              Try Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Featured content */}
      <section className="py-20 px-4 max-w-6xl mx-auto w-full">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">From the blog</p>
            <h2 className="text-3xl font-bold text-slate-900">Practical engineering guides</h2>
          </div>
          <Link href="/blog" className="hidden items-center gap-2 text-sm font-semibold text-blue-600 hover:underline sm:inline-flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <Link key={article.slug} href={article.path} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">{article.category}</span>
              <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-blue-600">{article.title}</h3>
              <p className="mt-3 line-clamp-3 leading-relaxed text-slate-600">{article.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                Read guide <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-16 mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">Browser utilities</p>
          <h2 className="text-3xl font-bold text-slate-900">Tools for your daily workflow</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/tools/token-estimator" className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <Calculator className="h-8 w-8 shrink-0 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold text-slate-900">LLM Token Estimator</h3>
              <p className="mt-2 text-slate-600">Estimate prompt size locally before testing an AI workflow.</p>
            </div>
          </Link>
          <Link href="/tools/json-formatter" className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <Braces className="h-8 w-8 shrink-0 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold text-slate-900">JSON Formatter</h3>
              <p className="mt-2 text-slate-600">Validate and format JSON without uploading it to a server.</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

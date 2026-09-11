import Link from 'next/link';

export default function BlogIndex() {
  const articles = [
    {
      id: 1,
      title: 'Designing Robust Multi-Agent Systems in TypeScript',
      date: 'September 10, 2026',
      excerpt: 'Learn how to architect stateful multi-agent systems that communicate efficiently and handle failures gracefully.',
      category: 'AI Agents'
    },
    {
      id: 2,
      title: 'Next.js App Router: Performance Anti-Patterns',
      date: 'August 28, 2026',
      excerpt: 'Avoid common pitfalls in Server Components and optimize your data fetching for lightning-fast page loads.',
      category: 'Web Development'
    },
    {
      id: 3,
      title: 'Practical Prompt Engineering for Developers',
      date: 'August 15, 2026',
      excerpt: 'A structured approach to writing deterministic prompts for code generation and data extraction tasks.',
      category: 'AI Agents'
    },
    {
      id: 4,
      title: 'Automating Code Reviews with Custom LLM Scripts',
      date: 'July 30, 2026',
      excerpt: 'How we built a GitHub Action that uses the Gemini API to provide meaningful feedback on pull requests.',
      category: 'Automation'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Blog</h1>
        <p className="text-xl text-slate-600">Technical insights, tutorials, and architectural patterns.</p>
      </div>

      <div className="space-y-8">
        {articles.map(article => (
          <article key={article.id} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{article.category}</span>
              <time className="text-sm text-slate-500">{article.date}</time>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
              <Link href={`#`} className="focus:outline-none">
                {article.title}
              </Link>
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {article.excerpt}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

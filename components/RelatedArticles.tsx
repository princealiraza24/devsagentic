import Link from 'next/link';
import { getRelatedArticles } from '@/lib/articles';

export default function RelatedArticles({ slug }: { slug: string }) {
  const relatedArticles = getRelatedArticles(slug);

  if (relatedArticles.length === 0) return null;

  return (
    <aside className="mt-16 border-t border-slate-200 pt-8" aria-labelledby="related-articles-heading">
      <h2 id="related-articles-heading" className="mb-5 text-2xl font-bold text-slate-900">
        Related articles
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {relatedArticles.map((related) => (
          <Link
            key={related.slug}
            href={related.path}
            className="rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300 hover:shadow-sm"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              {related.category}
            </span>
            <h3 className="mt-2 font-semibold leading-snug text-slate-900">{related.title}</h3>
          </Link>
        ))}
      </div>
    </aside>
  );
}

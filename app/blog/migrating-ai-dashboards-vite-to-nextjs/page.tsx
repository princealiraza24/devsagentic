import type { Metadata } from 'next';
import {absoluteUrl} from '@/lib/site';
import {getArticle} from '@/lib/articles';
import RelatedArticles from '@/components/RelatedArticles';

const article = getArticle('migrating-ai-dashboards-vite-to-nextjs')!;
export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  authors: [{ name: article.author, url: '/about' }],
  alternates: {
    canonical: article.path,
  },
  openGraph: {
    title: article.title,
    description: article.description,
    type: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: [article.author],
    images: ['/opengraph-image'],
  },
};

export default function BlogPostPage() {
  const articleUrl = absoluteUrl(article.path);

  return (
    <article className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.title,
            description: article.description,
            url: articleUrl,
            mainEntityOfPage: articleUrl,
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            author: {
              '@type': 'Person',
              name: article.author,
              url: absoluteUrl('/about'),
            },
            publisher: {
              '@type': 'Person',
              name: article.author,
              url: absoluteUrl('/about'),
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
              { '@type': 'ListItem', position: 3, name: 'Article', item: articleUrl },
            ],
          }),
        }}
      />
      <header className="mb-10 text-center">
        <div className="text-sm font-medium text-blue-600 mb-2">Frontend Architecture</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Why Client-Side Rendering Can Be Bad for SEO — and How Next.js Can Help
        </h1>
        <div className="flex items-center justify-center space-x-2 text-slate-500 text-sm">
          <span>By <a href="/author/ali-raza" className="hover:text-blue-600">{article.author}</a></span>
          <span>•</span>
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>•</span>
          <span>{article.readingTime}</span>
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Updated {new Date(article.updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </header>

      {/* TL;DR takeaway — helps skimmers and search snippet quality */}
      <div className="mb-10 p-5 bg-blue-50 border border-blue-100 rounded-xl text-slate-700">
        <span className="font-semibold text-blue-700">TL;DR — </span>
        Vite is still my first choice for prototypes and internal tools. But once a project moves
        past the demo stage and organic traffic, ad revenue, or shareable links start to matter, I
        migrate the SEO-critical routes to Next.js App Router first. Here&apos;s the project that
        taught me that, and the exact code change that fixed it.
      </div>

      <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-pre:bg-slate-900 prose-pre:text-slate-50">
        <h2>The Prototype Speed Trap</h2>
        <p>
          Not too long ago I was putting together a web application prototype for{' '}
          <a href="https://ionixgrowth.com/case-studies/khayyam-kinara" target="_blank" rel="noopener noreferrer">
            Khayyam Kinara Food Garden
          </a>{' '}
          as part of an outreach campaign for my agency,{' '}
          <a href="https://ionixgrowth.com" target="_blank" rel="noopener noreferrer">
            Ionix Growth
          </a>
          . For that kind of rapid iteration, React paired with Vite is unmatched. The native ES
          module dev server and near-instant Hot Module Replacement let me spin up an interactive
          UI in a single afternoon. When you just need a client demo out the door, that speed feels
          like magic.
        </p>
        <p>
          But prototypes don&apos;t have to rank on Google, and production apps do. That&apos;s the
          part I underestimated the first time I shipped a Vite build straight to a paying client.
        </p>
        <p>
          Client-Side Rendering (CSR), which is what powers a Vite single-page app out of the box,
          becomes a real problem the moment organic search, AdSense revenue, or shareable link
          previews start to matter. To be clear, client-side rendering itself isn&apos;t inherently
          bad. The breakdown happens when your SEO-critical content, metadata, or status codes
          depend entirely on the client&apos;s browser executing JavaScript before anything
          meaningful renders.
        </p>

        <h2>The SEO Challenges of Client-Side Rendering</h2>
        <p>
          Pure client-side SPAs often suffer from the &quot;App Shell&quot; problem. When a search
          crawler hits a route, the server hands back an essentially empty HTML skeleton — a root
          mounting div and some script tags. The actual content only appears after the browser
          downloads, parses, and executes the JavaScript bundle.
        </p>
        <p>Here&apos;s the Vite dashboard component that started the whole migration:</p>

        <pre>
          <code>{`// Client-Side Rendering (React + Vite)
import { useState, useEffect } from 'react';

export default function AIDashboardPrototype() {
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Data is fetched AFTER the page loads.
    // Search engines may need to render the JavaScript before
    // they can discover and process this content.
    fetch('https://api.devsagentic.com/v1/system-metrics')
      .then(res => res.json())
      .then(data => {
        setMetrics(data);
        setIsLoading(false);
      });
  }, []);

  // Without successful JavaScript rendering, crawlers may only receive
  // or process this loading state.
  if (isLoading) return <div>Loading dashboard...</div>;

  return (
    <div className="p-6 bg-slate-50">
      <h1 className="text-2xl font-bold">AI Execution Metrics</h1>
      <p>Active Agents: {metrics.activeCount}</p>
      <p>System Status: {metrics.status}</p>
    </div>
  );
}`}</code>
        </pre>

        <p>
          Because data fetching is bound to component mounting via <code>useEffect</code>, search
          indexers get pushed into a two-stage processing queue. Google can render JavaScript, but
          that rendering happens well after the initial HTML crawl. If your core content needs a
          client-side API call to appear at all, the initial crawl has less usable content to
          process. Server-rendered HTML does not guarantee indexing or AdSense approval, but it
          gives crawlers and visitors a clearer initial document to evaluate.
        </p>
        <p>Beyond the rendering delay, client-side SPAs bring a few structural headaches with them:</p>

        <ul>
          <li>
            <strong>Fragile machine signals:</strong> meta descriptions and Open Graph cards
            injected late via client scripts often show up broken or generic when the link is
            shared on social media or parsed by a webhook.
          </li>
          <li>
            <strong>Soft 404s:</strong> a poorly configured SPA will confidently return a 200 OK
            for a URL that doesn&apos;t exist, which throws off how search engines route and index
            the rest of the site.
          </li>
          <li>
            <strong>Hidden navigation:</strong> routing through JavaScript event handlers instead
            of standard <code>{'<a href="">'}</code> links can make it genuinely hard for a
            crawler to discover your deeper pages.
          </li>
        </ul>

        <p>
          That first point is the one that actually got my attention. I sent the Khayyam Kinara
          prototype link to the client over WhatsApp for a first look, and the preview card came
          back with no title, no image, and no description — just a bare URL. It worked fine once
          the page loaded, but the first impression was a broken link. That&apos;s a hard thing to
          explain away on a client call.
        </p>

        <h2>Moving to Server Components in Next.js</h2>
        <p>
          Migrating to the Next.js App Router fixes these specific problems by moving component
          execution and data retrieval back to the server, using React Server Components (RSC).
        </p>
        <p>Here&apos;s the same dashboard component after the migration, with proper error handling:</p>

        <pre>
          <code>{`// Server-Side Rendering (Next.js App Router)
// Notice there is no "use client" directive here.

export default async function ProductionAIDashboard() {
  // Data is fetched ON THE SERVER before the HTML is ever sent to the browser.
  const res = await fetch('https://api.devsagentic.com/v1/system-metrics', {
    next: { revalidate: 3600 } // Cache data for 1 hour to reduce API costs
  });

  if (!res.ok) {
    throw new Error('Failed to fetch system metrics');
  }

  const metrics = await res.json();

  // The server includes the fetched data in the HTML response,
  // making primary content instantly available without client-side JS.
  return (
    <div className="p-6 bg-slate-50">
      <h1 className="text-2xl font-bold">AI Execution Metrics</h1>
      <p>Active Agents: {metrics.activeCount}</p>
      <p>System Status: {metrics.status}</p>
    </div>
  );
}`}</code>
        </pre>

        <h3>Key Architectural Shifts</h3>
        <ul>
          <li>
            <strong>Elimination of client hooks:</strong> running directly on the server turns the
            component into a native async function, stripping out <code>useState</code> and{' '}
            <code>useEffect</code> entirely.
          </li>
          <li>
            <strong>Server-side data resolution:</strong> the data is fully resolved on the server
            before the UI is ever streamed to the client.
          </li>
          <li>
            <strong>A real backend security boundary:</strong> Server Components run strictly on
            the server, so you can hit a database directly through an ORM or call a secure
            microservice without leaking API keys into the client bundle.
          </li>
          <li>
            <strong>Request-level deduplication:</strong> <code>React.cache()</code> memoizes
            function results during a server render, so calling the same function from multiple
            components in the tree doesn&apos;t trigger duplicate backend hits.
          </li>
        </ul>

        <h2>Caching and Revalidating Data (ISR)</h2>
        <p>
          Real-time dashboards hit backend services constantly. Running an uncached API call on
          every single request is a fast way to spike your infrastructure bill. Next.js extends
          the native Web <code>fetch</code> API with fine-grained caching controls right at the
          call site.
        </p>
        <p>
          Passing{' '}
          <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">
            &#123; next: &#123; revalidate: 3600 &#125; &#125;
          </code>{' '}
          into the fetch call enables Incremental Static Regeneration (ISR).
        </p>

        <h3>Illustrative ISR Lifecycle</h3>
        <div className="not-prose my-6">
          <svg
            viewBox="0 0 700 260"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            role="img"
            aria-label="Diagram showing the three-stage ISR revalidation lifecycle in Next.js"
          >
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#2563eb" />
              </marker>
            </defs>

            <rect x="20" y="10" width="660" height="60" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
            <text x="350" y="32" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e3a8a">
              1. Initial Request / Build
            </text>
            <text x="350" y="52" textAnchor="middle" fontSize="12" fill="#334155">
              Server calls API → renders HTML → caches response for 3600s
            </text>

            <line x1="350" y1="70" x2="350" y2="100" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrow)" />

            <rect x="20" y="100" width="660" height="60" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <text x="350" y="122" textAnchor="middle" fontSize="14" fontWeight="700" fill="#14532d">
              2. Requests Within the 3600s Window
            </text>
            <text x="350" y="142" textAnchor="middle" fontSize="12" fill="#334155">
              Next.js serves cached HTML — no new upstream API request
            </text>

            <line x1="350" y1="160" x2="350" y2="190" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrow)" />

            <rect x="20" y="190" width="660" height="60" rx="10" fill="#fefce8" stroke="#ca8a04" strokeWidth="1.5" />
            <text x="350" y="212" textAnchor="middle" fontSize="14" fontWeight="700" fill="#713f12">
              3. Request After the Window Expires
            </text>
            <text x="350" y="232" textAnchor="middle" fontSize="12" fill="#334155">
              Stale HTML is served instantly while the cache revalidates in the background
            </text>
          </svg>
        </div>

        <h2>What Actually Changed</h2>
        <p>
          After moving the dashboard routes to the App Router, the WhatsApp and LinkedIn preview
          cards started rendering the title, image, and description correctly on first share — no
          more bare links on client calls. The Search Console coverage report also stopped flagging
          the dashboard routes as &quot;Crawled — currently not indexed,&quot; which had been sitting
          there since launch.
        </p>
        <h2>Final Thoughts</h2>
        <p>
          I didn&apos;t move my agency&apos;s production workflow to Next.js to chase a trend. I did
          it because sending a Vite link to a prospective client and watching the preview card fail
          to load is a genuinely frustrating way to lose credibility before the conversation even
          starts.
        </p>
        <p>
          Vite still has a permanent place in my stack for internal tools and rapid prototyping.
          But if a platform depends on search discovery or AdSense monetization, client-side
          rendering isn&apos;t a place to cut corners. Server Components and explicit data
          revalidation get you both things at once: dynamic data, and HTML a crawler can actually
          read the first time it shows up.
        </p>
        <p>
          If you want to estimate prompt size while testing an application migration, try the{' '}
          <a href="/tools/token-estimator">LLM Token Estimator</a>.
        </p>
      </div>

      {/* Author Bio */}
      <div className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Article tags">
        {article.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-16 p-6 md:p-8 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-16 h-16 shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-sm">
          AR
        </div>
        <div className="text-center sm:text-left">
          <h3 className="font-bold text-xl text-slate-900 mb-2">About Ali Raza</h3>
          <p className="text-slate-600 leading-relaxed">
            Ali is a software engineering student at Riphah International University and the
            founder of the digital agency Ionix Growth. He specializes in modern frontend
            architecture, Next.js, and integrating AI workflows into commercial web applications.
          </p>
        </div>
      </div>
      <RelatedArticles slug={article.slug} />
    </article>
  );
}
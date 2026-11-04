import type { Metadata } from 'next';
import RelatedArticles from '@/components/RelatedArticles';
import { getArticle } from '@/lib/articles';
import { absoluteUrl } from '@/lib/site';

const article = getArticle('nextjs-server-components-explained')!;

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  authors: [{ name: article.author, url: '/author/ali-raza' }],
  alternates: { canonical: article.path },
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

export default function ServerComponentsArticle() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <div className="article-cover mb-8 rounded-2xl border border-blue-100 px-6 py-10 text-left shadow-sm">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Architecture note</p>
          <p className="mt-3 text-2xl font-bold text-slate-900">Choosing the right execution boundary</p>
        </div>
        <p className="mb-2 text-sm font-medium text-blue-600">{article.category}</p>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          {article.title}
        </h1>
        <div className="text-sm text-slate-500">
          By <a href="/author/ali-raza" className="hover:text-blue-600">{article.author}</a> •{' '}
          <time dateTime={article.publishedAt}>November 4, 2026</time> • {article.readingTime}
        </div>
        <p className="mt-3 text-sm text-slate-500">Updated November 4, 2026</p>
      </header>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.title,
            description: article.description,
            url: absoluteUrl(article.path),
            mainEntityOfPage: absoluteUrl(article.path),
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            author: { '@type': 'Person', name: article.author, url: absoluteUrl('/author/ali-raza') },
            publisher: { '@type': 'Person', name: article.author, url: absoluteUrl('/author/ali-raza') },
          }),
        }}
      />

      <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-pre:bg-slate-900 prose-pre:text-slate-50">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-slate-700">
          <strong className="text-blue-700">TL;DR — </strong>
          In the Next.js App Router, Server Components are the default. Keep data fetching,
          article content, and static layouts on the server. Add a Client Component only where
          the browser needs state, event handlers, effects, or browser APIs. The goal is not to
          eliminate client-side JavaScript; it is to place it at the smallest useful boundary.
        </div>

        <h2>Why this boundary matters</h2>
        <p>
          A component boundary determines where code runs, what data can be accessed directly, and
          which JavaScript must be sent to the browser. A Server Component can read a database or
          call a private service without shipping those implementation details to the client. A
          Client Component can respond to clicks and keystrokes, but its code becomes part of the
          browser bundle.
        </p>
        <p>
          This distinction is especially useful for content-heavy pages. An article can be
          rendered as server output while a small table of contents, search box, or copy button
          remains interactive. Visitors receive useful content without making the entire article
          page a client-side application.
        </p>

        <h2>Server Components in a real page</h2>
        <p>
          The following example keeps the page and data access on the server. The result is a
          normal component tree; there is no special loading state in the page itself because the
          framework can stream or render the server result according to the route configuration.
        </p>
        <pre><code>{`// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation';

export default async function ProjectPage({ params }) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  return (
    <main>
      <h1>{project.name}</h1>
      <ProjectSummary project={project} />
      <ProjectFilter options={project.filters} />
    </main>
  );
}`}</code></pre>
        <p>
          The page can fetch the project because it runs on the server. The filter can still be
          interactive, but it should be isolated rather than forcing the entire route to become a
          Client Component.
        </p>

        <h2>When to use a Client Component</h2>
        <p>
          Add <code>&quot;use client&quot;</code> when the component uses React state, event
          handlers, effects, browser APIs such as the Clipboard API, or a browser-only package.
          Examples include a live form, a modal, a drag-and-drop editor, a theme switcher, and a
          tool that updates its output while a visitor types.
        </p>
        <pre><code>{`// components/ProjectFilter.tsx
'use client';

import { useState } from 'react';

export function ProjectFilter({ projects }) {
  const [query, setQuery] = useState('');
  const visible = projects.filter((project) =>
    project.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      {visible.map((project) => <p key={project.id}>{project.name}</p>)}
    </>
  );
}`}</code></pre>
        <p>
          Notice that the interactive part owns the state. If the project data is loaded by the
          parent, pass only the serializable fields that the filter needs. This keeps the boundary
          understandable and avoids sending unrelated server code to the browser.
        </p>

        <h2>A decision checklist</h2>
        <ol>
          <li>Start with a Server Component.</li>
          <li>List the exact behavior that requires a browser.</li>
          <li>Move only that behavior into a Client Component.</li>
          <li>Pass serializable values across the boundary.</li>
          <li>Test the route with JavaScript disabled to verify its core content remains useful.</li>
          <li>Measure browser JavaScript and interaction performance after the change.</li>
        </ol>

        <h2>Data fetching, caching, and errors</h2>
        <p>
          Server Components do not automatically make every data request correct or inexpensive.
          Decide how fresh the data needs to be, configure caching deliberately, and expose an
          error state when an upstream request fails. A page that silently renders stale or empty
          content is not improved simply because it rendered on the server.
        </p>
        <p>
          For an article site, static or revalidated content is often a good fit. For a live
          dashboard, you may need a combination of server-rendered initial data and client-side
          refresh. The right choice depends on freshness, cost, and interaction requirements—not
          on a blanket rule that one rendering mode is always best.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li>Adding <code>&quot;use client&quot;</code> to a whole route because one button is interactive.</li>
          <li>Passing functions, database clients, or class instances across the boundary.</li>
          <li>Putting secrets in code that is imported by a Client Component.</li>
          <li>Assuming server rendering replaces semantic HTML, accessibility, or performance testing.</li>
          <li>Copying a caching configuration without checking the freshness requirement.</li>
        </ul>

        <h2>How this applies to a content site</h2>
        <p>
          This site uses server-rendered article pages and keeps browser interaction inside tools
          such as the <a href="/tools/json-formatter">JSON Formatter</a> and{' '}
          <a href="/tools/token-estimator">LLM Token Estimator</a>. That separation makes the
          articles crawlable and keeps the interactive code close to the features that need it.
          It also makes the privacy behavior easier to explain: the tools process input locally
          rather than sending it to an application API.
        </p>

        <h2>FAQ</h2>
        <h3>Do Server Components eliminate JavaScript?</h3>
        <p>
          No. They reduce client JavaScript for server-rendered parts. Interactive components
          still require JavaScript, and a production page should be tested with its intended
          interactions enabled.
        </p>
        <h3>Are Server Components automatically better for SEO?</h3>
        <p>
          Rendering alone does not make content helpful or authoritative. Server output can make
          important content and metadata available earlier, but quality, usefulness, crawlable
          links, accessibility, and page experience still matter.
        </p>
        <h3>Should every component be a Server Component?</h3>
        <p>
          Use the server by default, then choose a client boundary based on behavior. Forms,
          filters, editors, and browser-only APIs generally belong in Client Components.
        </p>

        <h2>References</h2>
        <ul>
          <li><a href="https://nextjs.org/docs/app/building-your-application/rendering/server-components" target="_blank" rel="noopener noreferrer">Next.js Server Components documentation</a></li>
          <li><a href="https://react.dev/reference/rsc/server-components" target="_blank" rel="noopener noreferrer">React Server Components reference</a></li>
          <li><a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noopener noreferrer">Google guidance on helpful, reliable content</a></li>
        </ul>
      </div>
      <RelatedArticles slug={article.slug} />
    </article>
  );
}

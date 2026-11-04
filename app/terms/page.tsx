import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms governing use of DevsAgentic articles and developer tools.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Terms of Use</h1>
      <div className="prose prose-slate max-w-none">
        <p><strong>Effective Date:</strong> November 3, 2026</p>
        <p>
          By using DevsAgentic, you agree to use this website lawfully and respectfully. These
          terms apply to the articles, tools, and other content published on the site.
        </p>
        <h2>Content and tools</h2>
        <p>
          Articles and tools are provided for general educational and development purposes. Tool
          results may be approximate and should be independently verified before use in production.
          We do not guarantee that content is complete, current, or suitable for a particular
          purpose.
        </p>
        <h2>Acceptable use</h2>
        <p>
          Do not misuse the website, attempt to disrupt its operation, submit unlawful content, or
          use automated requests in a way that harms the service or other visitors.
        </p>
        <h2>Intellectual property</h2>
        <p>
          Unless stated otherwise, DevsAgentic content is owned by DevsAgentic. You may link to
          and quote reasonable portions with attribution, but do not republish complete articles
          or present them as your own.
        </p>
        <h2>Changes</h2>
        <p>
          We may update these terms as the website and its services change. Continued use after an
          update means you accept the revised terms.
        </p>
      </div>
    </div>
  );
}

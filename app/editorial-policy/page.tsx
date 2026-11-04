import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: 'How DevsAgentic researches, writes, reviews, and updates its content.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Editorial Policy</h1>
      <div className="prose prose-slate max-w-none">
        <p>
          DevsAgentic publishes practical material about AI engineering, developer tooling, and
          modern web development.
        </p>
        <h2>Our standards</h2>
        <ul>
          <li>We prioritize original explanations, experiments, and implementation details.</li>
          <li>We link to primary documentation for important technical claims.</li>
          <li>We distinguish personal experience from general recommendations.</li>
          <li>We disclose relevant commercial relationships and sponsored content.</li>
          <li>We correct material errors and update articles when important facts change.</li>
        </ul>
        <h2>Corrections</h2>
        <p>
          If you find an error, contact us with the article URL and supporting evidence. We review
          correction requests and update the page when appropriate.
        </p>
        <h2>Author</h2>
        <p>
          Articles are written and maintained by Ali Raza unless another author is identified on
          the page.
        </p>
      </div>
    </div>
  );
}

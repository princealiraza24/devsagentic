import type { Metadata } from 'next';
import Link from 'next/link';
import { Braces, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Developer Tools',
  description: 'Free browser-based tools for AI engineers and web developers.',
  alternates: { canonical: '/tools' },
};

const tools = [
  {
    href: '/tools/token-estimator',
    title: 'LLM Token Estimator',
    description: 'Estimate characters, words, lines, and approximate tokens in a prompt.',
    icon: Calculator,
  },
  {
    href: '/tools/json-formatter',
    title: 'JSON Formatter',
    description: 'Format, validate, and inspect JSON directly in your browser.',
    icon: Braces,
  },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="mb-4 text-4xl font-extrabold text-slate-900">Developer Tools</h1>
        <p className="text-xl text-slate-600">
          Small, privacy-conscious tools for AI engineering and modern web development.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {tools.map(({ href, title, description, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <Icon className="mb-5 h-8 w-8 text-blue-600" />
            <h2 className="mb-2 text-2xl font-bold text-slate-900">{title}</h2>
            <p className="text-slate-600">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

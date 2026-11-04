import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Formatter and Validator',
  description: 'Format and validate JSON securely in your browser.',
  alternates: { canonical: '/tools/json-formatter' },
};

export default function JsonFormatterLayout({ children }: { children: React.ReactNode }) {
  return children;
}

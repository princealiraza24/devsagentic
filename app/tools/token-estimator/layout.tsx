import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LLM Token Estimator',
  description: 'Estimate the approximate token count of a prompt before sending it to a language model.',
  alternates: { canonical: '/tools/token-estimator' },
};

export default function TokenEstimatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}

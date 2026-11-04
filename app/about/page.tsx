import type { Metadata } from 'next';
import {siteConfig} from '@/lib/site';

export const metadata: Metadata = {
  title: 'About DevsAgentic',
  description: 'Learn who maintains DevsAgentic and why we publish practical AI and web engineering content.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">About DevsAgentic</h1>
      
      <div className="prose prose-slate prose-lg max-w-none">
        <p>
          Welcome to <strong>DevsAgentic</strong>. We are a technical blog and resource hub dedicated to exploring the frontier of web development and artificial intelligence.
        </p>
        
        <p>
          Our mission is to help developers navigate the rapidly evolving landscape of AI agents, automated workflows, and modern full-stack architectures. We believe that the future of software engineering lies in the seamless integration of intelligent systems with robust web platforms.
        </p>
        
        <h2>What We Cover</h2>
        <ul>
          <li><strong>Agentic Workflows:</strong> Architectural patterns for building autonomous AI agents that can reason, plan, and execute complex tasks.</li>
          <li><strong>Modern Web Development:</strong> Deep technical guides on Next.js, React, TypeScript, and serverless architectures.</li>
          <li><strong>Practical Tooling:</strong> Building internal tools and automations to supercharge developer productivity.</li>
        </ul>

        <h2>Who We Are</h2>
        <p>
          DevsAgentic is maintained by Ali Raza, a software engineering student and founder of
          Ionix Growth. The site documents practical experiments, implementation lessons, and
          engineering decisions from real-world web and AI projects.
        </p>
        <p>
          We aim to publish accurate, useful material for developers. Articles are reviewed for
          technical clarity, updated when important dependencies or practices change, and linked
          to primary documentation where appropriate.
        </p>
        <h2>Contact and ownership</h2>
        <p>
          For corrections, collaboration requests, or questions about this site, use our{' '}
          <a href="/contact">Contact page</a>. For privacy questions, email {siteConfig.privacyEmail}.
        </p>
      </div>
    </div>
  );
}

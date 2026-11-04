import type { Metadata } from 'next';
import {siteConfig} from '@/lib/site';

export const metadata: Metadata = {
  title: 'Advertising Disclosure',
  description: 'How advertising and commercial relationships may appear on DevsAgentic.',
};

export default function AdvertisingDisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Advertising Disclosure</h1>
      <div className="prose prose-slate max-w-none">
        <p>
          DevsAgentic may display advertising to support the cost of publishing and maintaining
          the site. Advertisements are provided by third-party advertising partners and are
          separate from our editorial content.
        </p>
        <h2>Editorial independence</h2>
        <p>
          Advertising does not determine our technical conclusions or article recommendations.
          Sponsored content, affiliate relationships, or other paid relationships will be
          identified clearly on the relevant page.
        </p>
        <h2>Third-party services</h2>
        <p>
          Advertising providers may use cookies or similar technologies subject to your consent
          where required. For more information, read our <a href="/cookies">Cookie Policy</a> and
          <a href="/privacy"> Privacy Policy</a>.
        </p>
        <h2>Questions</h2>
        <p>
          Questions about advertising or commercial relationships can be sent to
          {siteConfig.privacyEmail}.
        </p>
      </div>
    </div>
  );
}

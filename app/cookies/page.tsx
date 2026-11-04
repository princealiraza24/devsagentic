import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Information about cookies and similar technologies used by DevsAgentic.',
};

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Cookie Policy</h1>
      <div className="prose prose-slate max-w-none">
        <p><strong>Effective Date:</strong> November 3, 2026</p>
        <p>
          DevsAgentic may use cookies and similar technologies to keep the site working, measure
          usage, and support advertising. This policy explains the categories we may use.
        </p>
        <h2>Essential technologies</h2>
        <p>
          These technologies support security, navigation, and basic site functionality. They
          cannot be disabled through the site because the website may not work correctly without
          them.
        </p>
        <h2>Analytics and advertising</h2>
        <p>
          If enabled, analytics and advertising providers may use cookies or similar technologies
          to understand visits, measure campaigns, and show ads. Where required by law, these
          technologies will only be enabled after your consent.
        </p>
        <h2>Your choices</h2>
        <p>
          You can control cookies through your browser settings and any consent controls provided
          on the site. Blocking some cookies may affect functionality. We will update this policy
          when the services used by the site change.
        </p>
        <h2>Questions</h2>
        <p>
          Contact privacy@devsagentic.com with questions about cookies or privacy.
        </p>
      </div>
    </div>
  );
}

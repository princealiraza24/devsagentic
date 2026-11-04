import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How DevsAgentic collects, uses, and protects information.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-slate max-w-none">
        <p><strong>Effective Date:</strong> November 3, 2026</p>

        <p>
          At DevsAgentic, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We may collect information about you in a variety of ways. The information we may collect on the Site includes:
        </p>
        <ul>
          <li><strong>Personal Data:</strong> Information you voluntarily provide, such as your name and email address when contacting us. We do not request shipping addresses or telephone numbers through this site.</li>
          <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
        </ul>

        <h2>2. Use of Your Information</h2>
        <p>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
        </p>
        <ul>
          <li>Respond to questions, correction requests, and collaboration requests.</li>
          <li>Improve our website and the content we provide.</li>
          <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
        </ul>

        <h2>3. Disclosure of Your Information</h2>
        <p>
          We will not sell, rent, or trade your personal information to third parties. We may share information we have collected about you in certain situations, such as to comply with legal obligations or to protect the rights and property of DevsAgentic.
        </p>

        <h2>4. Data Security</h2>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
        </p>

        <h2>5. Contact Us</h2>
        <p>
          If you have questions or comments about this Privacy Policy, please contact us at:
        </p>
        <p>
          <strong>DevsAgentic</strong><br />
          privacy@devsagentic.com
        </p>
        <h2>6. Cookies and advertising</h2>
        <p>
          We may use essential cookies and, after the required consent is obtained, analytics or
          advertising technologies provided by third parties. These providers may process browser,
          device, and usage information to measure performance or deliver relevant advertising.
          See our <a href="/cookies">Cookie Policy</a> for more information and available choices.
        </p>
      </div>
    </div>
  );
}

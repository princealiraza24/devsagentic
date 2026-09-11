import type {Metadata} from 'next';
import './globals.css'; // Global styles
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'DevsAgentic',
  description: 'Architecting the Future of Agentic Workflows.',
  openGraph: {
    title: 'DevsAgentic',
    description: 'Architecting the Future of Agentic Workflows.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevsAgentic',
    description: 'Architecting the Future of Agentic Workflows.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

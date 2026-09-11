import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-white py-8 mt-12">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <p>&copy; {year} DevsAgentic. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-slate-900 transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

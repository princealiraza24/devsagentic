import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">404</p>
      <h1 className="mb-4 text-4xl font-extrabold text-slate-900">Page not found</h1>
      <p className="mb-8 text-lg text-slate-600">
        The page may have moved or the address may be incorrect.
      </p>
      <Link href="/" className="inline-flex rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">
        Return home
      </Link>
    </div>
  );
}

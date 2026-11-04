import { Network } from 'lucide-react';

export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 font-bold text-blue-600">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
        <Network className="h-5 w-5" aria-hidden="true" />
      </span>
      {!compact && <span>DevsAgentic</span>}
    </span>
  );
}

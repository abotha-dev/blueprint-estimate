import { DollarSign } from 'lucide-react';

interface StickySummaryProps {
  grandTotal: number;
  roomCount: number;
  totalArea: number;
}

export function StickySummary({ grandTotal, roomCount, totalArea }: StickySummaryProps) {
  return (
    <div className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[rgba(255,255,255,0.08)] py-3">
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-[rgba(255,255,255,0.5)]" style={{ fontVariantNumeric: 'tabular-nums' }}>
            <span>{roomCount} rooms</span>
            <span className="hidden sm:inline">{(totalArea || 0).toLocaleString()} sq ft</span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-indigo-400" strokeWidth={1.5} />
            <span className="text-xl md:text-2xl font-bold font-mono text-[rgba(255,255,255,0.9)]" style={{ fontVariantNumeric: 'tabular-nums' }}>
              ${(grandTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

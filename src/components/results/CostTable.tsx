import { MaterialItem, CostBreakdown, QualityTier } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface CostTableProps {
  materials: MaterialItem[];
  costBreakdown: CostBreakdown;
  contingencyPercent: number;
  selectedTier?: QualityTier;
}

const TIER_LABELS: Record<QualityTier, string> = {
  budget: 'Budget',
  standard: 'Standard',
  premium: 'Premium',
  luxury: 'Luxury',
};

function formatCurrency(amount: number) {
  return '$' + (amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function CostTable({ materials, costBreakdown, contingencyPercent, selectedTier = 'standard' }: CostTableProps) {
  const grouped = materials.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MaterialItem[]>);

  return (
    <div className="bg-[#18181B] border border-[rgba(255,255,255,0.08)] rounded-card shadow-card overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="p-4 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
        <h3 className="font-semibold text-[rgba(255,255,255,0.9)]" style={{ letterSpacing: '-0.02em' }}>Cost Estimate</h3>
        <span className="text-sm px-3 py-1 rounded-badge bg-indigo-500/10 text-indigo-400 font-medium">
          {TIER_LABELS[selectedTier]} Tier
        </span>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-[rgba(255,255,255,0.08)]">
              <TableHead className="text-[rgba(255,255,255,0.5)]">Material</TableHead>
              <TableHead className="text-right text-[rgba(255,255,255,0.5)]">Qty</TableHead>
              <TableHead className="text-right hidden sm:table-cell text-[rgba(255,255,255,0.5)]">Unit Cost</TableHead>
              <TableHead className="text-right hidden md:table-cell text-[rgba(255,255,255,0.5)]">Materials</TableHead>
              <TableHead className="text-right hidden md:table-cell text-[rgba(255,255,255,0.5)]">Labor</TableHead>
              <TableHead className="text-right text-[rgba(255,255,255,0.5)]">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(grouped).map(([category, items]) => (
              <>
                <TableRow key={category} className="bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)]">
                  <TableCell colSpan={6} className="font-medium text-[rgba(255,255,255,0.5)] text-xs uppercase tracking-wide py-2">
                    {category}
                  </TableCell>
                </TableRow>
                {items.map((item, index) => (
                  <TableRow key={`${category}-${index}`} className="border-[rgba(255,255,255,0.08)]">
                    <TableCell className="text-[rgba(255,255,255,0.9)]">{item.name || 'Unknown Material'}</TableCell>
                    <TableCell className="text-right font-mono text-sm text-[rgba(255,255,255,0.7)]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {item.quantity || 0} {item.unit || 'units'}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm hidden sm:table-cell text-[rgba(255,255,255,0.7)]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {formatCurrency(item.unit_cost)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm hidden md:table-cell text-[rgba(255,255,255,0.7)]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {formatCurrency(item.material_cost)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm hidden md:table-cell text-[rgba(255,255,255,0.7)]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {formatCurrency(item.labor_cost)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm font-semibold text-[rgba(255,255,255,0.9)]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {formatCurrency(item.total_cost)}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Summary */}
      <div className="border-t border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-4">
        <div className="space-y-2 max-w-xs ml-auto" style={{ fontVariantNumeric: 'tabular-nums' }}>
          <div className="flex justify-between text-sm">
            <span className="text-[rgba(255,255,255,0.5)]">Materials Subtotal</span>
            <span className="font-mono text-[rgba(255,255,255,0.9)]">{formatCurrency(costBreakdown.materials_subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[rgba(255,255,255,0.5)]">Labor Subtotal</span>
            <span className="font-mono text-[rgba(255,255,255,0.9)]">{formatCurrency(costBreakdown.labor_subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[rgba(255,255,255,0.5)]">Subtotal</span>
            <span className="font-mono text-[rgba(255,255,255,0.9)]">{formatCurrency(costBreakdown.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[rgba(255,255,255,0.5)]">Contingency ({contingencyPercent}%)</span>
            <span className="font-mono text-[rgba(255,255,255,0.9)]">{formatCurrency(costBreakdown.contingency_amount)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-[rgba(255,255,255,0.08)]">
            <span className="font-semibold text-[rgba(255,255,255,0.9)]">Grand Total</span>
            <span className="font-mono font-bold text-lg text-indigo-400">
              {formatCurrency(costBreakdown.grand_total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

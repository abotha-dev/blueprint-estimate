import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TierEstimate, QualityTier } from '@/types';

interface TierComparisonProps {
  tiers: TierEstimate[];
  currentTier: QualityTier;
  onTierChange: (tier: QualityTier) => void;
}

const TIER_INFO: Record<QualityTier, { label: string; description: string }> = {
  budget: { label: 'Budget', description: 'Cost-effective materials' },
  standard: { label: 'Standard', description: 'Quality mid-range' },
  premium: { label: 'Premium', description: 'High-end finishes' },
  luxury: { label: 'Luxury', description: 'Top-tier everything' },
};

function formatCurrency(amount: number) {
  return '$' + (amount || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function TierComparison({ tiers, currentTier, onTierChange }: TierComparisonProps) {
  return (
    <div className="bg-[#18181B] border border-[rgba(255,255,255,0.08)] rounded-card p-4 shadow-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <h3 className="font-semibold text-[rgba(255,255,255,0.9)] mb-4" style={{ letterSpacing: '-0.02em' }}>Compare Quality Tiers</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tiers.map((tier) => {
          const info = TIER_INFO[tier.tier || 'standard'] || TIER_INFO.standard;
          const isActive = tier.tier === currentTier;
          const isRecommended = tier.tier === 'standard';
          
          return (
            <button
              key={tier.tier}
              onClick={() => onTierChange(tier.tier)}
              className={cn(
                "relative p-4 rounded-card border-2 text-left transition-[border-color,background-color] duration-150 ease-out",
                isActive 
                  ? "border-indigo-500/50 bg-indigo-500/5" 
                  : "border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.16)] hover:bg-[rgba(255,255,255,0.02)]"
              )}
            >
              {isActive && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" strokeWidth={1.5} />
                </div>
              )}
              
              <p className={cn(
                "font-semibold mb-1",
                isActive ? "text-indigo-400" : "text-[rgba(255,255,255,0.9)]"
              )} style={{ letterSpacing: '-0.02em' }}>
                {info.label}
              </p>
              {isRecommended && (
                <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-medium">Recommended</span>
              )}
              <p className="text-xs text-[rgba(255,255,255,0.5)] mb-3">
                {info.description}
              </p>
              <p className={cn(
                "font-mono font-bold",
                isActive ? "text-indigo-400" : "text-[rgba(255,255,255,0.9)]"
              )} style={{ fontVariantNumeric: 'tabular-nums' }}>
                {formatCurrency(tier.grand_total)}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

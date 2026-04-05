import { Settings } from 'lucide-react';
import { QualityTier, Region, LaborAvailability } from '@/types';

interface AnalysisSettingsProps {
  projectName: string;
  qualityTier: QualityTier;
  region: Region;
  includeLabor: boolean;
  contingencyPercent: number;
  laborAvailability?: LaborAvailability;
}

const formatQualityTier = (tier: QualityTier): string => {
  return tier.charAt(0).toUpperCase() + tier.slice(1);
};

const formatRegion = (region: Region): string => {
  if (!region.startsWith('us_')) {
    return region;
  }
  
  const regionMap: Record<Region, string> = {
    'us_national': 'National Average',
    'us_northeast': 'Northeast',
    'us_southeast': 'Southeast',
    'us_midwest': 'Midwest',
    'us_southwest': 'Southwest',
    'us_west': 'West',
  };
  return regionMap[region] || region;
};

const formatLaborAvailability = (availability?: LaborAvailability): string => {
  if (!availability) return 'Average';
  return availability.charAt(0).toUpperCase() + availability.slice(1);
};

export function AnalysisSettings({
  projectName,
  qualityTier,
  region,
  includeLabor,
  contingencyPercent,
  laborAvailability,
}: AnalysisSettingsProps) {
  return (
    <div className="bg-[#18181B] border border-[rgba(255,255,255,0.08)] rounded-card p-6 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-5 w-5 text-[rgba(255,255,255,0.5)]" strokeWidth={1.5} />
        <h3 className="text-lg font-semibold text-[rgba(255,255,255,0.9)]" style={{ letterSpacing: '-0.02em' }}>Analysis Settings</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <dt className="text-sm font-medium text-[rgba(255,255,255,0.5)]">Project Name</dt>
          <dd className="mt-1 text-sm text-[rgba(255,255,255,0.9)]">{projectName}</dd>
        </div>
        
        <div>
          <dt className="text-sm font-medium text-[rgba(255,255,255,0.5)]">Quality Tier</dt>
          <dd className="mt-1 text-sm text-[rgba(255,255,255,0.9)]">{formatQualityTier(qualityTier)}</dd>
        </div>
        
        <div>
          <dt className="text-sm font-medium text-[rgba(255,255,255,0.5)]">Location</dt>
          <dd className="mt-1 text-sm text-[rgba(255,255,255,0.9)]">{formatRegion(region)}</dd>
        </div>
        
        <div>
          <dt className="text-sm font-medium text-[rgba(255,255,255,0.5)]">Labor Availability</dt>
          <dd className="mt-1 text-sm text-[rgba(255,255,255,0.9)]">{formatLaborAvailability(laborAvailability)}</dd>
        </div>
        
        <div>
          <dt className="text-sm font-medium text-[rgba(255,255,255,0.5)]">Labor Costs</dt>
          <dd className="mt-1 text-sm text-[rgba(255,255,255,0.9)]">{includeLabor ? 'Included' : 'Not Included'}</dd>
        </div>
        
        <div>
          <dt className="text-sm font-medium text-[rgba(255,255,255,0.5)]">Contingency</dt>
          <dd className="mt-1 text-sm text-[rgba(255,255,255,0.9)]" style={{ fontVariantNumeric: 'tabular-nums' }}>{contingencyPercent}%</dd>
        </div>
      </div>
    </div>
  );
}

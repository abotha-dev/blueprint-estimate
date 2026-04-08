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
  // If it's a state name (not starting with "us_"), return as-is
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
    <div className="card-elevated p-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">Analysis Settings</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Project Name</dt>
          <dd className="mt-1 text-sm text-foreground">{projectName}</dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-muted-foreground">Quality Tier</dt>
          <dd className="mt-1 text-sm text-foreground">{formatQualityTier(qualityTier)}</dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-muted-foreground">Location</dt>
          <dd className="mt-1 text-sm text-foreground">{formatRegion(region)}</dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-muted-foreground">Labor Availability</dt>
          <dd className="mt-1 text-sm text-foreground">{formatLaborAvailability(laborAvailability)}</dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-muted-foreground">Labor Costs</dt>
          <dd className="mt-1 text-sm text-foreground">{includeLabor ? 'Included' : 'Not Included'}</dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-muted-foreground">Contingency</dt>
          <dd className="mt-1 text-sm text-foreground">{contingencyPercent}%</dd>
        </div>
      </div>
    </div>
  );
}

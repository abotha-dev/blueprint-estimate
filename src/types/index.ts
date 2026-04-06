export interface Room {
  name: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  area: number;
  confidence: number;
}

export interface MaterialItem {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  unit_cost: number;
  material_cost: number;
  labor_cost: number;
  total_cost: number;
}

export interface CostBreakdown {
  materials_subtotal: number;
  labor_subtotal: number;
  subtotal: number;
  contingency_amount: number;
  grand_total: number;
}

export interface TierEstimate {
  tier: QualityTier;
  grand_total: number;
  materials_subtotal: number;
  labor_subtotal: number;
}


export interface StructuralLineItem {
  quantity: number;
  unit: string;
  material_cost: number;
  labor_cost: number;
  total_cost: number;
}

export interface StructuralEstimateDetail {
  line_items: Record<string, StructuralLineItem>;
  total_material: number;
  total_labor: number;
  grand_total: number;
}

export interface RoofingEstimateDetail extends StructuralEstimateDetail {
  roof_area_sqft?: number;
}


export interface ExteriorLineItem {
  quantity: number;
  unit: string;
  material_cost: number;
  labor_cost: number;
  total_cost: number;
}

export interface ExteriorEstimates {
  window_count: number;
  exterior_door_count: number;
  interior_door_count: number;
  wall_area_sqft: number;
  line_items: Record<string, ExteriorLineItem>;
  total_material: number;
  total_labor: number;
  grand_total: number;
}

export interface StructuralEstimates {
  framing: StructuralEstimateDetail;
  foundation: StructuralEstimateDetail;
  roofing: RoofingEstimateDetail;
  subtotal_material: number;
  subtotal_labor: number;
  grand_total: number;
}

export interface AnalysisResult {
  project_name: string;
  filename: string;
  total_area: number;
  unit_system: string;
  rooms: Room[];
  materials: MaterialItem[];
  cost_breakdown: CostBreakdown;
  structural_estimates?: StructuralEstimates;
  exterior_estimates?: ExteriorEstimates;
  tier_comparisons: TierEstimate[];
  warnings: string[];
  quality_tier: QualityTier;
  region: Region;
  include_labor: boolean;
  contingency_percent: number;
  labor_availability?: LaborAvailability;
}

export type QualityTier = 'budget' | 'standard' | 'premium' | 'luxury';
export type Region = 'us_national' | 'us_northeast' | 'us_southeast' | 'us_midwest' | 'us_southwest' | 'us_west';
export type LaborAvailability = 'low' | 'average' | 'high';

export interface AnalysisSettings {
  project_name: string;
  quality_tier: QualityTier;
  region: Region;
  zipcode?: string;  // Optional zipcode for state-specific pricing
  include_labor: boolean;
  contingency_percent: number;
  labor_availability: LaborAvailability;
}

export interface AnalysisState {
  status: 'idle' | 'uploading' | 'analyzing' | 'complete' | 'error';
  progress: number;
  result: AnalysisResult | null;
  error: string | null;
}

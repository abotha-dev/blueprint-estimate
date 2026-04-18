import { AnalysisResult, AnalysisSettings, Room, MaterialItem, CostBreakdown, TierEstimate, StructuralEstimates, ExteriorEstimates, DemoBreakdown } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://takeoff-api-uyzv.onrender.com';

/**
 * Parse dimension string like "11'" or "15'-6\"" to feet (number)
 */
function parseDimensionString(dimStr: string | number | null | undefined): number {
  if (typeof dimStr === 'number') return dimStr;
  if (!dimStr) return 0;
  
  const str = String(dimStr).trim();
  
  // Handle feet and inches format: 15'-6" or 15' 6" or 15'6"
  const feetInchesMatch = str.match(/(\d+)'[\s-]*(\d+)?[""]?/);
  if (feetInchesMatch) {
    const feet = parseInt(feetInchesMatch[1]) || 0;
    const inches = parseInt(feetInchesMatch[2]) || 0;
    return feet + (inches / 12);
  }
  
  // Handle just feet: 11'
  const feetMatch = str.match(/(\d+(?:\.\d+)?)'?/);
  if (feetMatch) {
    return parseFloat(feetMatch[1]) || 0;
  }
  
  // Handle meters: 4.5m or 4,5m
  const metersMatch = str.match(/(\d+[,.]?\d*)\s*m/i);
  if (metersMatch) {
    const meters = parseFloat(metersMatch[1].replace(',', '.')) || 0;
    return meters * 3.28084; // Convert to feet
  }
  
  // Try to parse as plain number
  return parseFloat(str.replace(',', '.')) || 0;
}

/**
 * Transform the backend API response to match the frontend's expected structure
 * 
 * Backend response structure:
 * {
 *   blueprint_analysis: { filename, rooms, total_area, unit_system, warnings, model_used },
 *   material_totals: { flooring_hardwood: {...}, paint_wall: {...}, ... },
 *   cost_estimate: { project_name, timestamp, region, estimates: [...], subtotal_materials, subtotal_labor, contingency_percent, contingency_amount, total_estimate, notes },
 *   quality_comparison: { budget: number, standard: number, premium: number, luxury: number }
 * }
 */
function transformApiResponse(data: any): AnalysisResult {
  // The backend wraps the response in "blueprint_analysis"
  const analysis = data.blueprint_analysis || data;
  const costEstimate = data.cost_estimate || {};
  const materialTotals = data.material_totals || {};
  const qualityComparison = data.quality_comparison || {};
  const structuralEstimates = data.structural_estimates || null;
  const exteriorEstimates = data.exterior_estimates || null;
  const mepBreakdown = costEstimate.mep_breakdown || null;
  const demoBreakdown: DemoBreakdown | null = costEstimate.demo_breakdown || null;
  
  // Detect unit system early — needed for dimension/area conversion below
  const unitSystem: string = analysis.unit_system || 'imperial';
  const isMetric = unitSystem === 'metric';
  const M_TO_FT = 3.28084;
  const SQM_TO_SQFT = 10.7639;

  // Transform rooms - backend returns strings for dimensions and area.
  // If the plan is metric, convert m → ft and m² → sq ft so the rest of
  // the app (UI, PDF) always works in imperial.
  const rooms: Room[] = (analysis.rooms || []).map((room: any) => {
    let length = parseDimensionString(room.length);
    let width = parseDimensionString(room.width);

    if (isMetric) {
      length = length * M_TO_FT;
      width = width * M_TO_FT;
    }

    // Parse area from string, or calculate from dimensions if not provided
    let area = parseAreaString(room.area);
    if (isMetric && area > 0) {
      area = area * SQM_TO_SQFT;
    }
    if (area === 0 && length > 0 && width > 0) {
      area = length * width; // Calculate area from (already-converted) dimensions
    }

    return {
      name: room.name || 'Unknown Room',
      dimensions: {
        length: length,
        width: width,
        height: room.height || 0,
      },
      area: area,
      confidence: parseConfidence(room.confidence),
    };
  });

  // Calculate total area from rooms if not provided
  let totalArea = parseAreaString(analysis.total_area);
  if (isMetric && totalArea > 0) {
    totalArea = totalArea * SQM_TO_SQFT;
  }
  if (totalArea === 0) {
    totalArea = rooms.reduce((sum, room) => sum + (room.area || 0), 0);
  }

  // Transform materials from cost_estimate.estimates (the actual cost items)
  const materials = transformMaterialsFromEstimates(costEstimate.estimates || []);

  // Build cost breakdown from cost_estimate
  const costBreakdown: CostBreakdown = {
    materials_subtotal: costEstimate.subtotal_materials || 0,
    labor_subtotal: costEstimate.subtotal_labor || 0,
    subtotal: (costEstimate.subtotal_materials || 0) + (costEstimate.subtotal_labor || 0),
    contingency_amount: costEstimate.contingency_amount || 0,
    grand_total: costEstimate.total_estimate || 0,
  };

  // Transform tier comparisons from quality_comparison
  const tierComparisons: TierEstimate[] = [
    { tier: 'budget', grand_total: qualityComparison.budget || 0, materials_subtotal: 0, labor_subtotal: 0 },
    { tier: 'standard', grand_total: qualityComparison.standard || 0, materials_subtotal: 0, labor_subtotal: 0 },
    { tier: 'premium', grand_total: qualityComparison.premium || 0, materials_subtotal: 0, labor_subtotal: 0 },
    { tier: 'luxury', grand_total: qualityComparison.luxury || 0, materials_subtotal: 0, labor_subtotal: 0 },
  ];

  // Build the result with defaults for missing fields
  const result: AnalysisResult = {
    structural_estimates: structuralEstimates as StructuralEstimates | null,
    exterior_estimates: exteriorEstimates as ExteriorEstimates | null,
    mep_breakdown: mepBreakdown,
    demo_breakdown: demoBreakdown,
    project_name: costEstimate.project_name || data.project_name || 'Untitled Project',
    filename: analysis.filename || 'Unknown File',
    total_area: totalArea,
    unit_system: analysis.unit_system || 'imperial',
    rooms: rooms,
    materials: materials,
    cost_breakdown: costBreakdown,
    tier_comparisons: tierComparisons,
    warnings: analysis.warnings || [],
    quality_tier: data.quality_tier || 'standard',
    region: costEstimate.region || data.region || 'us_national',
    include_labor: data.include_labor ?? true,
    include_mep: Boolean(mepBreakdown),
    contingency_percent: (costEstimate.contingency_percent || 0.10) * 100,
  };

  return result;
}

/**
 * Parse area string like "14,8 m²" or "252 sq ft" to a number
 */
function parseAreaString(areaStr: string | number | null | undefined): number {
  if (typeof areaStr === 'number') return areaStr;
  if (!areaStr) return 0;
  
  // Remove units and parse the number
  const cleaned = areaStr
    .replace(/m²|sq\s*ft|sqft|square\s*feet|square\s*meters/gi, '')
    .replace(/,/g, '.') // Handle European decimal notation
    .trim();
  
  return parseFloat(cleaned) || 0;
}

/**
 * Parse confidence string to number (0-1)
 */
function parseConfidence(confidence: string | number | null | undefined): number {
  if (typeof confidence === 'number') return confidence;
  if (!confidence) return 0.5;
  
  const confidenceMap: Record<string, number> = {
    'high': 0.9,
    'medium': 0.7,
    'low': 0.4,
  };
  
  return confidenceMap[confidence.toLowerCase()] || 0.5;
}

/**
 * Transform materials from cost_estimate.estimates array
 * Each estimate item has: material_type, display_name, quality_tier, units_needed, unit, 
 *                         material_cost, labor_cost, total_cost, price_per_unit, brand_example
 */
function transformMaterialsFromEstimates(estimates: any[]): MaterialItem[] {
  // Map material types to categories
  const categoryMap: Record<string, string> = {
    'flooring_hardwood': 'Flooring',
    'flooring_laminate': 'Flooring',
    'flooring_tile': 'Flooring',
    'flooring_carpet': 'Flooring',
    'paint_wall': 'Paint',
    'paint_ceiling': 'Paint',
    'drywall': 'Drywall',
    'baseboard': 'Trim',
    'crown_molding': 'Trim',
    'cabinets_base': 'Kitchen',
    'cabinets_wall': 'Kitchen',
    'countertop_laminate': 'Kitchen',
    'countertop_granite': 'Kitchen',
    'countertop_quartz': 'Kitchen',
    'backsplash_tile': 'Kitchen',
    'kitchen_sink': 'Kitchen',
    'kitchen_faucet': 'Kitchen',
    'vanity_cabinet': 'Bathroom',
    'toilet': 'Bathroom',
    'bathroom_faucet': 'Bathroom',
    'shower_tile': 'Bathroom',
    'shower_door': 'Bathroom',
    'bathtub': 'Bathroom',
    'bathroom_exhaust_fan': 'Bathroom',
    'electrical_outlet': 'Electrical',
    'electrical_gfi_outlet': 'Electrical',
    'electrical_switch': 'Electrical',
    'electrical_light_fixture': 'Electrical',
    'electrical_wire_run': 'Electrical',
    'electrical_breaker_panel': 'Electrical',
    'plumbing_supply_line': 'Plumbing',
    'plumbing_drain_line': 'Plumbing',
    'plumbing_vent_stack': 'Plumbing',
    'plumbing_water_heater': 'Plumbing',
    'plumbing_shutoff_valve': 'Plumbing',
    'appliance_range': 'Appliances',
    'appliance_dishwasher': 'Appliances',
    'appliance_microwave_hood': 'Appliances',
    'appliance_refrigerator': 'Appliances',
    'appliance_washer': 'Appliances',
    'appliance_dryer': 'Appliances',
  };

  return estimates.map((item: any) => ({
    name: item.display_name || item.material_type || 'Unknown Material',
    category: categoryMap[item.material_type] || 'Other',
    quantity: item.units_needed || 0,
    unit: item.unit || 'units',
    unit_cost: item.price_per_unit || 0,
    material_cost: item.material_cost || 0,
    labor_cost: item.labor_cost || 0,
    total_cost: item.total_cost || 0,
  }));
}

/**
 * Transform materials array (legacy format)
 */
function transformMaterials(materials: any[]): MaterialItem[] {
  return materials.map((item: any) => ({
    name: item.name || item.material_name || 'Unknown Material',
    category: item.category || item.material_category || 'Other',
    quantity: item.quantity || item.qty || 0,
    unit: item.unit || 'units',
    unit_cost: item.unit_cost || item.unitCost || 0,
    material_cost: item.material_cost || item.materialCost || 0,
    labor_cost: item.labor_cost || item.laborCost || 0,
    total_cost: item.total_cost || item.totalCost || 0,
  }));
}

/**
 * Transform cost breakdown (legacy format)
 */
function transformCostBreakdown(breakdown: any): CostBreakdown {
  return {
    materials_subtotal: breakdown.materials_subtotal || breakdown.materialsSubtotal || 0,
    labor_subtotal: breakdown.labor_subtotal || breakdown.laborSubtotal || 0,
    subtotal: breakdown.subtotal || 0,
    contingency_amount: breakdown.contingency_amount || breakdown.contingencyAmount || 0,
    grand_total: breakdown.grand_total || breakdown.grandTotal || 0,
  };
}

/**
 * Transform tier comparisons (legacy format)
 */
function transformTierComparisons(tiers: any[]): TierEstimate[] {
  return tiers.map((tier: any) => ({
    tier: tier.tier || tier.quality_tier || 'standard',
    grand_total: tier.grand_total || tier.grandTotal || 0,
    materials_subtotal: tier.materials_subtotal || tier.materialsSubtotal || 0,
    labor_subtotal: tier.labor_subtotal || tier.laborSubtotal || 0,
  }));
}

export async function analyzeBlueprint(
  file: File,
  settings: AnalysisSettings
): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append('file', file);

  const params = new URLSearchParams({
    project_name: settings.project_name || 'Untitled Project',
    quality_tier: settings.quality_tier,
    region: settings.region,
    include_labor: String(settings.include_labor),
    include_mep: String(settings.include_mep),
    contingency_percent: String(settings.contingency_percent / 100), // Convert to decimal for backend
    labor_availability: settings.labor_availability || 'average',
  });
  
  // Add zipcode if provided
  if (settings.zipcode) {
    params.append('zipcode', settings.zipcode);
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/analyze?${params}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Analysis failed: ${response.statusText}`);
  }

  const rawData = await response.json();
  
  // Log for debugging
  console.log('Raw API response:', rawData);
  
  // Transform the API response to match frontend expectations
  const result = transformApiResponse(rawData);
  console.log('Transformed result:', result);
  
  return result;
}

/**
 * Create a checkout session for subscription
 */
export async function createCheckoutSession(params: {
  plan: 'pro' | 'agency';
  interval: 'monthly' | 'annual';
  success_url: string;
  cancel_url: string;
}): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/v1/create-checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Checkout failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.url || data.checkout_url;
}

export function validateFile(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 25 * 1024 * 1024; // 25MB (PDFs can be larger)
  const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf'];

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Please upload a PNG, JPG, WEBP, or PDF file.' };
  }

  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'File size must be under 10MB.' };
  }

  return { valid: true };
}


/**
 * Generate and download a PDF report for the analysis results
 */
export async function generatePDFReport(
  result: AnalysisResult,
  selectedTier: string = 'standard'
): Promise<void> {
  // Prepare the request payload matching the backend's PDFReportRequest model
  const payload = {
    project_name: result.project_name || 'Construction Estimate',
    filename: result.filename || 'blueprint.jpg',
    rooms: result.rooms.map(room => ({
      name: room.name,
      dimensions: {
        width: room.dimensions?.width || 0,
        length: room.dimensions?.length || 0,
      },
      area: room.area || 0,
      confidence: room.confidence || 0.5,
    })),
    materials: result.materials.map(mat => ({
      name: mat.name,
      category: mat.category,
      quantity: mat.quantity,
      unit: mat.unit,
      unit_cost: mat.unit_cost,
      material_cost: mat.material_cost,
      labor_cost: mat.labor_cost,
      total_cost: mat.total_cost,
    })),
    cost_breakdown: {
      materials_subtotal: result.cost_breakdown.materials_subtotal,
      labor_subtotal: result.cost_breakdown.labor_subtotal,
      subtotal: result.cost_breakdown.subtotal,
      contingency_amount: result.cost_breakdown.contingency_amount,
      grand_total: result.cost_breakdown.grand_total,
    },
    tier_comparisons: result.tier_comparisons.map(tier => ({
      tier: tier.tier,
      grand_total: tier.grand_total,
    })),
    selected_tier: selectedTier,
    quality_tier: result.quality_tier || 'standard',
    region: result.region || 'us_national',
    include_labor: result.include_labor !== undefined ? result.include_labor : true,
    total_area: result.total_area || 0,
    contingency_percent: result.contingency_percent || 10,
    labor_availability: result.labor_availability || 'average',
    structural_estimates: result.structural_estimates ? {
      framing: result.structural_estimates.framing,
      foundation: result.structural_estimates.foundation,
      roofing: result.structural_estimates.roofing,
      subtotal_material: result.structural_estimates.subtotal_material,
      subtotal_labor: result.structural_estimates.subtotal_labor,
      grand_total: result.structural_estimates.grand_total,
    } : null,
  };

  const response = await fetch(`${API_BASE_URL}/api/v1/generate-pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `PDF generation failed: ${response.statusText}`);
  }

  // Get the PDF blob and trigger download
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  
  // Extract filename from Content-Disposition header if available
  const contentDisposition = response.headers.get('Content-Disposition');
  let filename = 'estimate_report.pdf';
  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
    if (filenameMatch) {
      filename = filenameMatch[1];
    }
  }
  
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

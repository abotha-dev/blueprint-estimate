import { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { StickySummary } from '@/components/results/StickySummary';
import { BlueprintSummary } from '@/components/results/BlueprintSummary';
import { RoomBreakdown } from '@/components/results/RoomBreakdown';
import { CostTable } from '@/components/results/CostTable';
import { TierComparison } from '@/components/results/TierComparison';
import { ResultActions } from '@/components/results/ResultActions';
import { AnalysisSettings } from '@/components/results/AnalysisSettings';
import { AnalysisResult, QualityTier, MaterialItem, CostBreakdown } from '@/types';
import { generatePDFReport } from '@/services/api';
import { AlertCircle } from 'lucide-react';

const formatCurrency = (value: number) => `$$${(value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { result: initialResult, thumbnail, isGuest } = (location.state || {}) as { 
    result?: AnalysisResult; 
    thumbnail?: string;
    isGuest?: boolean;
  };

  const [result, setResult] = useState<AnalysisResult | null>(initialResult || null);
  const [selectedTier, setSelectedTier] = useState<QualityTier>(initialResult?.quality_tier || 'standard');

  // Redirect if no result
  useEffect(() => {
    if (!result) {
      navigate('/analyze');
    }
  }, [result, navigate]);

  // Calculate the price multiplier based on selected tier vs standard tier
  const tierMultiplier = useMemo(() => {
    if (!result?.tier_comparisons) return 1;
    
    const standardTier = result.tier_comparisons.find(t => t.tier === 'standard');
    const selectedTierData = result.tier_comparisons.find(t => t.tier === selectedTier);
    
    if (!standardTier || !selectedTierData || standardTier.grand_total === 0) return 1;
    
    return selectedTierData.grand_total / standardTier.grand_total;
  }, [result?.tier_comparisons, selectedTier]);

  // Adjust materials and cost breakdown based on selected tier
  const adjustedMaterials = useMemo((): MaterialItem[] => {
    if (!result?.materials) return [];
    
    return result.materials.map(item => ({
      ...item,
      unit_cost: item.unit_cost * tierMultiplier,
      material_cost: item.material_cost * tierMultiplier,
      labor_cost: item.labor_cost * tierMultiplier,
      total_cost: item.total_cost * tierMultiplier,
    }));
  }, [result?.materials, tierMultiplier]);

  const adjustedMepEstimate = useMemo(() => (result?.mep_breakdown?.mep_estimate || 0) * tierMultiplier, [result?.mep_breakdown?.mep_estimate, tierMultiplier]);

  const adjustedCostBreakdown = useMemo((): CostBreakdown => {
    if (!result?.cost_breakdown) {
      return {
        materials_subtotal: 0,
        labor_subtotal: 0,
        subtotal: 0,
        contingency_amount: 0,
        grand_total: 0,
      };
    }

    const materialsSubtotal = result.cost_breakdown.materials_subtotal * tierMultiplier;
    const laborSubtotal = result.cost_breakdown.labor_subtotal * tierMultiplier;
    const subtotal = materialsSubtotal + laborSubtotal;
    const contingencyAmount = subtotal * (result.contingency_percent / 100);

    return {
      materials_subtotal: materialsSubtotal,
      labor_subtotal: laborSubtotal,
      subtotal: subtotal,
      contingency_amount: contingencyAmount,
      grand_total: subtotal + contingencyAmount + adjustedMepEstimate,
    };
  }, [result?.cost_breakdown, result?.contingency_percent, adjustedMepEstimate, tierMultiplier]);


  const structuralEstimates = useMemo(() => {
    if (!result?.structural_estimates) return null;

    const multiplier = tierMultiplier;
    const scaleDetail = (detail: any) => {
      const line_items = Object.fromEntries(
        Object.entries(detail.line_items || {}).map(([key, item]: any) => [
          key,
          {
            ...item,
            material_cost: (item.material_cost || 0) * multiplier,
            labor_cost: (item.labor_cost || 0) * multiplier,
            total_cost: (item.total_cost || 0) * multiplier,
          },
        ])
      );

      return {
        ...detail,
        line_items,
        total_material: (detail.total_material || 0) * multiplier,
        total_labor: (detail.total_labor || 0) * multiplier,
        grand_total: (detail.grand_total || 0) * multiplier,
      };
    };

    return {
      ...result.structural_estimates,
      framing: scaleDetail(result.structural_estimates.framing),
      foundation: scaleDetail(result.structural_estimates.foundation),
      roofing: {
        ...scaleDetail(result.structural_estimates.roofing),
        roof_area_sqft: result.structural_estimates.roofing?.roof_area_sqft,
      },
      subtotal_material: (result.structural_estimates.subtotal_material || 0) * multiplier,
      subtotal_labor: (result.structural_estimates.subtotal_labor || 0) * multiplier,
      grand_total: (result.structural_estimates.grand_total || 0) * multiplier,
    };
  }, [result?.structural_estimates, tierMultiplier]);



  const interiorGrandTotal = adjustedCostBreakdown.grand_total;
  const structuralGrandTotal = structuralEstimates?.grand_total || 0;
  const combinedGrandTotal = interiorGrandTotal + structuralGrandTotal;
  const structuralTotalForDisplay = structuralGrandTotal;

  if (!result) {
    return null;
  }

  const handleTierChange = (tier: QualityTier) => {
    setSelectedTier(tier);
  };

  const handleNewEstimate = () => {
    navigate('/analyze');
  };

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPdf = useCallback(async () => {
    if (!result || isGeneratingPdf) return;
    
    setIsGeneratingPdf(true);
    try {
      // Create an adjusted result with the current tier's costs
      const adjustedResult: AnalysisResult = {
        ...result,
        materials: adjustedMaterials,
        cost_breakdown: adjustedCostBreakdown,
      };
      
      await generatePDFReport(adjustedResult, selectedTier);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  }, [result, adjustedMaterials, adjustedCostBreakdown, selectedTier, isGeneratingPdf]);

  const formattedTotal = formatCurrency(combinedGrandTotal);
  const roomCount = result.rooms?.length || 0;
  const totalArea = (result.total_area || 0).toLocaleString();

  return (
    <Layout hideFooter>
      {isGuest && (
        <div className="w-full bg-blue-600/90 text-white text-sm text-center py-2.5 px-4">
          You're viewing a guest analysis.{' '}
          <a href="/signup" className="underline font-medium hover:text-white/80">Sign up free</a>{' '}
          to save results, run unlimited analyses, and access your history.
        </div>
      )}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0a0d14] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute -top-36 left-1/2 h-[360px] w-[820px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" aria-hidden="true" />

        <div className="container py-10 md:py-14">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                Estimate complete
              </div>
              <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
                Your takeoff is ready
              </h1>
              <p className="mt-2 text-white/60">
                {result.project_name || 'Project estimate'} · {selectedTier} tier
              </p>
            </div>

            <div className="w-full md:w-auto rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Grand total</p>
              <p className="mt-2 text-2xl font-semibold font-mono text-white">{formattedTotal}</p>
              <p className="mt-1 text-xs text-white/50">
                {roomCount} rooms · {totalArea} sq ft
              </p>
            </div>
          </div>
        </div>
      </section>

      <StickySummary
        grandTotal={combinedGrandTotal}
        roomCount={roomCount}
        totalArea={result.total_area || 0}
      />

      <div className="bg-background">
        <div className="container py-6 md:py-10">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Beta Disclaimer Banner */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-amber-900 mb-1">Beta Version - Verify Before Use</h3>
                  <p className="text-sm text-amber-800">
                    AI estimates are approximately 70-80% accurate. Always verify measurements and costs for final quotes. 
                    This tool is designed to provide quick preliminary estimates, not replace professional takeoff services.
                  </p>
                </div>
              </div>
            </div>
            
            <AnalysisSettings
              projectName={result.project_name}
              qualityTier={result.quality_tier}
              region={result.region}
              includeLabor={result.include_labor}
              contingencyPercent={result.contingency_percent}
              laborAvailability={result.labor_availability}
            />
            
            <BlueprintSummary result={result} thumbnail={thumbnail} />

            <RoomBreakdown rooms={result.rooms || []} />

            <CostTable
              materials={adjustedMaterials}
              costBreakdown={adjustedCostBreakdown}
              contingencyPercent={result.contingency_percent || 10}
              selectedTier={selectedTier}
              structuralTotal={structuralTotalForDisplay}
              combinedGrandTotal={combinedGrandTotal}
            />


            {structuralEstimates && (
              <div className="card-elevated p-5 animate-slide-up" style={{ animationDelay: '0.25s' }}>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">Structural Shell Estimate</h3>
                    <p className="text-sm text-muted-foreground">Framing, foundation, and roofing costs based on NAHB 2024 benchmarks.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Structural total</p>
                    <p className="text-lg font-semibold font-mono text-foreground">{formatCurrency(structuralTotalForDisplay)}</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {([
                    { title: 'Framing', data: structuralEstimates.framing, subtitle: 'Studs, plates, headers' },
                    { title: 'Foundation', data: structuralEstimates.foundation, subtitle: 'Slab-on-grade' },
                    { title: 'Roofing', data: structuralEstimates.roofing, subtitle: 'Gable roof, 4/12 pitch' },
                  ] as const).map((item) => (
                    <div key={item.title} className="rounded-xl border border-border bg-surface/60 p-4">
                      <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                      <div className="mt-3 space-y-1 text-sm">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Materials</span>
                          <span className="font-mono">{formatCurrency(item.data.total_material)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Labor</span>
                          <span className="font-mono">{formatCurrency(item.data.total_labor)}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-border font-semibold">
                          <span>Total</span>
                          <span className="font-mono">{formatCurrency(item.data.grand_total)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.mep_breakdown && (
              <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 mt-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-yellow-400 text-sm font-semibold">MEP Rough Estimate</span>
                  <span className="text-xs text-yellow-400/60 border border-yellow-400/20 rounded px-1.5 py-0.5">±30%</span>
                </div>
                <div className="text-white font-mono text-base mb-1">${adjustedMepEstimate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <p className="text-xs text-white/40">{result.mep_breakdown.disclaimer}</p>
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              Estimate includes structural shell (framing, foundation, roofing) and interior finishes.{result.mep_breakdown ? ' Includes a rough MEP allowance (electrical, plumbing, HVAC).' : ' Excludes MEP (electrical, plumbing, HVAC).'} Excludes site work and land.
            </p>
            <TierComparison
              tiers={result.tier_comparisons || []}
              currentTier={selectedTier}
              onTierChange={handleTierChange}
            />

            <ResultActions
              onNewEstimate={handleNewEstimate}
              onDownloadPdf={handleDownloadPdf}
              isGeneratingPdf={isGeneratingPdf}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { useAuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { generatePDFReport } from '@/services/api';
import type { AnalysisResult, QualityTier } from '@/types';
import { cn } from '@/lib/utils';

type LoadState = 'loading' | 'ready' | 'not-found';

const TIERS: Array<{ key: QualityTier; label: string; description: string }> = [
  {
    key: 'budget',
    label: 'Budget',
    description: 'Basic materials and finishes. The floor, not the ceiling.',
  },
  {
    key: 'standard',
    label: 'Standard',
    description: 'Mid-range materials and typical contractor pricing.',
  },
  {
    key: 'premium',
    label: 'Premium',
    description: 'Higher-end materials and finishes. The ceiling, not the floor.',
  },
];

function formatRoundedCurrency(value: number | undefined | null): string {
  if (!value || !Number.isFinite(value)) return '$0';
  return `$${(Math.round(value / 100) * 100).toLocaleString()}`;
}

function formatArea(value: number): string {
  return `${Math.round(value).toLocaleString()} sq ft`;
}

function formatQuantity(value: number): string {
  if (!Number.isFinite(value)) return '0';
  return value % 1 === 0 ? value.toLocaleString() : value.toFixed(1);
}

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id?: string }>();
  const { user, loading: authLoading } = useAuthContext();

  const [result, setResult] = useState<AnalysisResult | null>(() => {
    const stateResult = (location.state as { result?: AnalysisResult } | null)?.result;
    return stateResult ?? null;
  });
  const [loadState, setLoadState] = useState<LoadState>(() => {
    const stateResult = (location.state as { result?: AnalysisResult } | null)?.result;
    return stateResult ? 'ready' : 'loading';
  });
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  useEffect(() => {
    if (result) return;
    if (authLoading) return;
    if (!id || !user) {
      setLoadState('not-found');
      return;
    }

    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('upload_history')
        .select('results_summary')
        .eq('id', id)
        .eq('user_id', user.id)
        .maybeSingle();
      if (cancelled) return;
      if (error || !data?.results_summary) {
        setLoadState('not-found');
        return;
      }
      setResult(data.results_summary as unknown as AnalysisResult);
      setLoadState('ready');
    })();
    return () => {
      cancelled = true;
    };
  }, [id, user, authLoading, result]);

  const handleDownloadPdf = useCallback(async () => {
    if (!result || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    setPdfError(null);
    try {
      await generatePDFReport(result, result.quality_tier ?? 'standard');
    } catch (e) {
      setPdfError(
        e instanceof Error ? e.message : "We couldn't generate the PDF. Please try again."
      );
    } finally {
      setIsGeneratingPdf(false);
    }
  }, [result, isGeneratingPdf]);

  const handleAnalyzeAnother = () => navigate('/analyze');

  const sortedMaterials = useMemo(() => {
    if (!result?.materials) return [];
    return [...result.materials].sort(
      (a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
    );
  }, [result?.materials]);

  const hasLowConfidence = useMemo(() => {
    if (!result?.rooms) return false;
    return result.rooms.some(
      (r) => typeof r.confidence === 'number' && r.confidence < 0.5
    );
  }, [result?.rooms]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <SiteHeader />

      <section className="flex-1 bg-stone-100 py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          {loadState === 'loading' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
              Loading estimate...
            </div>
          )}

          {loadState === 'not-found' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 md:p-14 shadow-sm text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
                We couldn't find that estimate.
              </h1>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Upload a floor plan to start a new one.
              </p>
              <Button
                size="lg"
                onClick={handleAnalyzeAnother}
                className="gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold border-0 shadow-lg shadow-amber-500/20"
              >
                Upload a floor plan
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {loadState === 'ready' && result && (
            <>
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-4">
                  Your Ballpark Estimate
                </h1>
                <p className="text-lg text-slate-700 leading-relaxed max-w-2xl">
                  Here's the cost range based on your floor plan. Use it to frame the conversation, then do your real takeoff on the jobs worth chasing.
                </p>
              </div>

              <div className="rounded-r-lg border-l-4 border-amber-500 bg-amber-50/50 px-5 py-4 mb-14">
                <p className="text-sm text-slate-700 leading-relaxed">
                  This is a ballpark estimate with low, mid, and high ranges, not a bid or fixed-price quote. Best used for lead qualification and early client conversations. Your real takeoff is still your real takeoff.
                </p>
              </div>

              <section className="mb-14">
                <div className="mb-6">
                  <div className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-2">
                    Floor plan
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                    Rooms detected
                  </h2>
                </div>

                {hasLowConfidence && (
                  <p className="mb-5 pl-4 py-3 border-l-2 border-amber-500/60 bg-amber-50/30 text-sm text-slate-700 leading-relaxed">
                    Some measurements on this plan were harder to read than usual. The room list and ranges below are still a useful starting point, but treat the dimensions as approximate.
                  </p>
                )}

                <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                        <th className="text-left px-6 py-3 font-semibold">Room</th>
                        <th className="text-right px-6 py-3 font-semibold">Area</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(result.rooms ?? []).length === 0 ? (
                        <tr>
                          <td colSpan={2} className="px-6 py-6 text-center text-sm text-slate-500">
                            No rooms detected on this plan.
                          </td>
                        </tr>
                      ) : (
                        (result.rooms ?? []).map((room, i) => {
                          const isLast = i === (result.rooms?.length ?? 0) - 1;
                          return (
                            <tr key={i} className={isLast ? '' : 'border-b border-slate-100'}>
                              <td className="px-6 py-3 text-slate-900">{room.name}</td>
                              <td className="px-6 py-3 text-right text-slate-700 font-mono tabular-nums">
                                {formatArea(room.area)}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                  Room detection is our strongest capability. We identify rooms with high reliability. Area measurements are most accurate on clean, scaled floor plans.
                </p>
              </section>

              <section className="mb-14">
                <div className="mb-3">
                  <div className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-2">
                    Materials
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                    Estimated material quantities
                  </h2>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                  Quantities are calculated from the parsed room layout. Foundation assumes slab-on-grade (4" thickness). Roofing assumes gable at 4/12 pitch.
                </p>

                <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                        <th className="text-left px-6 py-3 font-semibold">Material</th>
                        <th className="text-right px-6 py-3 font-semibold">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedMaterials.length === 0 ? (
                        <tr>
                          <td colSpan={2} className="px-6 py-6 text-center text-sm text-slate-500">
                            No material breakdown available for this estimate.
                          </td>
                        </tr>
                      ) : (
                        sortedMaterials.map((m, i) => {
                          const isLast = i === sortedMaterials.length - 1;
                          return (
                            <tr key={i} className={isLast ? '' : 'border-b border-slate-100'}>
                              <td className="px-6 py-3">
                                <div className="text-slate-900">{m.name}</div>
                                <div className="text-xs uppercase tracking-wider text-slate-500 mt-0.5">
                                  {m.category}
                                </div>
                              </td>
                              <td className="px-6 py-3 text-right text-slate-700 font-mono tabular-nums">
                                {formatQuantity(m.quantity)} {m.unit}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-14">
                <div className="mb-6">
                  <div className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-2">
                    Estimate
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                    Cost range
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                  {TIERS.map((tier) => {
                    const tierData = result.tier_comparisons?.find((t) => t.tier === tier.key);
                    const value = tierData?.grand_total ?? 0;
                    const isStandard = tier.key === 'standard';
                    return (
                      <div
                        key={tier.key}
                        className={cn(
                          'rounded-xl bg-white p-6 flex flex-col',
                          isStandard
                            ? 'border-2 border-amber-500 shadow-md'
                            : 'border border-slate-200 shadow-sm'
                        )}
                      >
                        <div
                          className={cn(
                            'text-xs uppercase tracking-widest font-semibold mb-2',
                            isStandard ? 'text-amber-600' : 'text-slate-500'
                          )}
                        >
                          {tier.label}
                        </div>
                        <div className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3 font-mono tabular-nums">
                          {formatRoundedCurrency(value)}
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{tier.description}</p>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-6 text-sm text-slate-500 leading-relaxed">
                  Costs use state-level pricing data and standard residential assumptions. These ranges are a starting point for your conversation, not a substitute for a detailed estimate.
                </p>
              </section>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold border-0 shadow-lg shadow-amber-500/20 disabled:opacity-80"
                >
                  {isGeneratingPdf ? (
                    <>
                      <span className="inline-block w-2 h-2 rounded-full bg-current animate-pulse" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Download PDF Report
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleAnalyzeAnother}
                  className="gap-2 border-slate-300 bg-white text-slate-900 hover:bg-stone-50"
                >
                  Analyze Another Plan
                </Button>
              </div>

              {pdfError && (
                <p role="alert" className="mt-3 text-sm text-rose-600 leading-relaxed">
                  {pdfError}
                </p>
              )}
            </>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

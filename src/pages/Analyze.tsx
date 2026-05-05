import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, FileText, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TakeoffLogo } from '@/components/ui/TakeoffLogo';
import { useAuthContext } from '@/contexts/AuthContext';
import { useAnalysis } from '@/hooks/useAnalysis';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg'];
const MAX_SIZE_BYTES = 25 * 1024 * 1024;

const PROCESSING_STEPS = [
  'Parsing rooms and labels...',
  'Extracting dimensions...',
  'Calculating material quantities...',
  'Building your cost estimate...',
];

// Step-cycle timing: step 1 holds 0-3s, step 2 holds 3-9s, step 3 holds
// 9-15s, then step 4 holds until the API resolves with at least 600ms of
// visible time before completion.
const STEP_DELAYS_MS = [3000, 9000, 15000];
const STEP4_MIN_MS = 600;

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function validateUpload(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Please upload a PDF, PNG, or JPG file.';
  }
  if (file.size > MAX_SIZE_BYTES) {
    return `File must be under ${MAX_SIZE_BYTES / 1024 / 1024} MB.`;
  }
  return null;
}

type Phase = 'idle' | 'processing' | 'complete' | 'error';

export default function Analyze() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuthContext();
  const { toast } = useToast();
  const {
    state,
    selectedFile,
    filePreview,
    handleFileSelect,
    analyze,
    reset,
  } = useAnalysis();

  const [phase, setPhase] = useState<Phase>('idle');
  const [stepIndex, setStepIndex] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const stepTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const step4StartedAtRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      stepTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  // Auth gate per Decision 008: free tier requires an account.
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-sm text-slate-500">Loading...</div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  const acceptFile = (file: File) => {
    const err = validateUpload(file);
    if (err) {
      setValidationError(err);
      return;
    }
    setValidationError(null);
    handleFileSelect(file);
  };

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) acceptFile(file);
    e.target.value = '';
  };

  const onDragOver: React.DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (phase !== 'idle') return;
    setIsDragActive(true);
  };

  const onDragLeave: React.DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const onDrop: React.DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (phase !== 'idle') return;
    const file = e.dataTransfer.files?.[0];
    if (file) acceptFile(file);
  };

  const handleRemove = () => {
    setValidationError(null);
    reset();
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setPhase('processing');
    setStepIndex(0);
    step4StartedAtRef.current = null;
    stepTimersRef.current.forEach(clearTimeout);
    stepTimersRef.current = STEP_DELAYS_MS.map((delay, i) =>
      setTimeout(() => {
        const next = i + 1;
        setStepIndex((prev) => Math.max(prev, next));
        if (next === 3) step4StartedAtRef.current = Date.now();
      }, delay)
    );

    const result = await analyze();
    stepTimersRef.current.forEach(clearTimeout);

    if (!result) {
      setPhase('error');
      return;
    }

    if (step4StartedAtRef.current === null) {
      setStepIndex(3);
      step4StartedAtRef.current = Date.now();
    }
    const elapsed = Date.now() - step4StartedAtRef.current;
    const wait = Math.max(0, STEP4_MIN_MS - elapsed);
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));

    const { error: historyError } = await supabase.from('upload_history').insert({
      user_id: user.id,
      filename: selectedFile.name,
      file_size: selectedFile.size,
      rooms_detected: result.rooms.length,
      total_area: result.total_area,
      total_estimate: result.cost_breakdown.grand_total,
      quality_tier: result.quality_tier,
      results_summary: result,
    });
    if (historyError) {
      console.error('Failed to save upload history:', historyError);
      toast({
        title: 'Note',
        description: "Analysis complete, but we couldn't save to your history.",
        variant: 'destructive',
      });
    }

    setPhase('complete');
  };

  const handleViewResults = () => {
    if (!state.result) return;
    navigate('/results', {
      state: { result: state.result, thumbnail: filePreview, isGuest: false },
    });
  };

  const handleRetry = () => {
    setPhase('idle');
    setStepIndex(0);
    setValidationError(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Nav — replicated from Home, with logged-in nav (Dashboard) in
          place of Login/Get Started since the page is auth-gated. */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <TakeoffLogo size={32} />
            <span className="font-semibold text-base tracking-tight">mytakeoff.ai</span>
          </Link>
          <nav className="flex items-center gap-1">
            <a href="/#how-it-works" className="hidden sm:inline-flex">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/5"
              >
                How It Works
              </Button>
            </a>
            <Link to="/pricing" className="hidden sm:inline-flex">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/5"
              >
                Pricing
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/5"
              >
                Dashboard
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <section className="flex-1 bg-stone-100 py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-4">
              Upload your floor plan.
            </h1>
            <p className="text-lg text-slate-700 leading-relaxed max-w-xl mx-auto">
              PDF or image. We'll parse the rooms, calculate materials, and give you a cost range.
            </p>
          </div>

          {phase === 'idle' && (
            <div>
              {selectedFile ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-amber-600" strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{selectedFile.name}</p>
                      <p
                        className="text-sm text-slate-500 mt-1"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemove}
                      className="flex-shrink-0 text-slate-500 hover:text-slate-900"
                    >
                      <X className="w-4 h-4 mr-1.5" strokeWidth={1.75} />
                      Remove
                    </Button>
                  </div>
                  <Button
                    size="lg"
                    onClick={handleAnalyze}
                    className="w-full mt-6 gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold border-0 shadow-lg shadow-amber-500/20"
                  >
                    Analyze floor plan
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <label
                  onDragEnter={onDragOver}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  className={cn(
                    'block rounded-2xl border-2 border-dashed cursor-pointer transition-colors',
                    'p-12 md:p-16 text-center bg-white',
                    isDragActive
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-slate-300 hover:border-amber-400 hover:bg-amber-50/40'
                  )}
                >
                  <input
                    type="file"
                    accept="application/pdf,image/png,image/jpeg"
                    onChange={onInputChange}
                    className="sr-only"
                  />
                  <div
                    className={cn(
                      'w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-colors',
                      isDragActive
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-stone-100 text-amber-600'
                    )}
                  >
                    <Upload className="w-7 h-7" strokeWidth={1.75} />
                  </div>
                  <p className="text-lg font-semibold text-slate-900 mb-1">
                    Drag your floor plan here, or click to browse.
                  </p>
                  <p className="text-sm text-slate-500">
                    PDF, PNG, JPG. Clean, scaled floor plans work best.
                  </p>
                </label>
              )}

              {validationError && (
                <p role="alert" className="mt-3 text-sm text-rose-600 leading-relaxed">
                  {validationError}
                </p>
              )}

              <p className="mt-4 text-sm text-slate-500 leading-relaxed text-center max-w-xl mx-auto">
                For the best results, use a clean floor plan exported from design software. Photos of hand-marked plans may produce less accurate room measurements.
              </p>
            </div>
          )}

          {phase === 'processing' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight text-center mb-8">
                Reading your floor plan...
              </h2>
              <ol className="space-y-4 max-w-md mx-auto">
                {PROCESSING_STEPS.map((label, i) => {
                  const status: 'done' | 'active' | 'pending' =
                    i < stepIndex ? 'done' : i === stepIndex ? 'active' : 'pending';
                  return (
                    <li
                      key={label}
                      className="flex items-center gap-4"
                      aria-current={status === 'active' ? 'step' : undefined}
                    >
                      <span
                        className={cn(
                          'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors',
                          status === 'done' && 'bg-amber-500 text-slate-950',
                          status === 'active' && 'bg-amber-500 text-slate-950 animate-pulse',
                          status === 'pending' && 'bg-stone-200 text-slate-400'
                        )}
                        aria-hidden="true"
                      >
                        {status === 'done' ? (
                          <Check className="w-4 h-4" strokeWidth={2.5} />
                        ) : (
                          <span className="text-xs font-semibold">{i + 1}</span>
                        )}
                      </span>
                      <span
                        className={cn(
                          'text-base leading-snug',
                          status === 'pending' && 'text-slate-400',
                          status === 'active' && 'text-slate-900 font-medium',
                          status === 'done' && 'text-slate-700'
                        )}
                      >
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {phase === 'complete' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 md:p-14 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 mx-auto mb-6 flex items-center justify-center">
                <Check className="w-8 h-8 text-amber-600" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-8">
                Your estimate is ready.
              </h2>
              <Button
                size="lg"
                onClick={handleViewResults}
                className="gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold border-0 shadow-lg shadow-amber-500/20"
              >
                View Results
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {phase === 'error' && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 md:p-10 text-center">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong.</h2>
              <p className="text-sm text-slate-700 mb-6 leading-relaxed" role="alert">
                {state.error || "We couldn't process your floor plan. Please try again."}
              </p>
              <Button
                onClick={handleRetry}
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold border-0"
              >
                Try again
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer — replicated from Home. */}
      <footer className="bg-slate-950 text-white/60 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <TakeoffLogo size={28} />
                <span className="font-semibold text-white">mytakeoff.ai</span>
              </div>
              <p className="text-sm leading-relaxed">
                Instant ballpark estimates for residential remodels and ADUs.
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">
                Product
              </div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/#how-it-works" className="hover:text-amber-400 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-amber-400 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-amber-400 transition-colors">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">
                Company
              </div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">
                Legal
              </div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-white/5 text-xs text-white/35">
            © {new Date().getFullYear()} mytakeoff.ai
          </div>
        </div>
      </footer>
    </div>
  );
}

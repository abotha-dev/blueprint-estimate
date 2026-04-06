import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { UploadZone } from '@/components/upload/UploadZone';
import { SettingsPanel } from '@/components/upload/SettingsPanel';
import { AnalyzingState } from '@/components/upload/AnalyzingState';
import { ErrorState } from '@/components/upload/ErrorState';
import { useAnalysis } from '@/hooks/useAnalysis';
import { useAuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const GUEST_LIMIT = 2;
const GUEST_COUNT_KEY = 'takeoff_guest_analyses';

function getGuestCount(): number {
  return parseInt(localStorage.getItem(GUEST_COUNT_KEY) || '0', 10);
}

function incrementGuestCount() {
  localStorage.setItem(GUEST_COUNT_KEY, String(getGuestCount() + 1));
}

export default function Analyze() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { toast } = useToast();
  const {
    state,
    settings,
    selectedFile,
    filePreview,
    handleFileSelect,
    analyze,
    reset,
    updateSettings,
  } = useAnalysis();

  const guestCount = getGuestCount();
  const guestLimitReached = !user && guestCount >= GUEST_LIMIT;

  const handleAnalyze = async () => {
    if (guestLimitReached) {
      toast({
        title: 'Free limit reached',
        description: 'Sign up for free to run unlimited analyses and save your results.',
      });
      navigate('/signup');
      return;
    }

    const result = await analyze();
    if (result) {
      // Save history only for logged-in users
      if (user) {
        const { error } = await supabase.from('upload_history').insert({
          user_id: user.id,
          filename: selectedFile?.name || 'Unknown',
          file_size: selectedFile?.size || null,
          rooms_detected: result.rooms.length,
          total_area: result.total_area,
          total_estimate: result.cost_breakdown.grand_total,
          quality_tier: result.quality_tier,
        });

        if (error) {
          console.error('Failed to save upload history:', error);
          toast({
            title: 'Note',
            description: "Analysis complete, but we couldn't save to your history.",
            variant: 'destructive',
          });
        }
      } else {
        // Guest — increment counter
        incrementGuestCount();
      }

      navigate('/results', { state: { result, thumbnail: filePreview, isGuest: !user } });
    }
  };

  const isLoading = state.status === 'uploading' || state.status === 'analyzing';

  return (
    <Layout hideFooter>
      <div className="relative overflow-hidden bg-[#0A0A0A] text-[rgba(255,255,255,0.9)]">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute -top-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" aria-hidden="true" />

        <div className="container py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-badge border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5 text-xs text-[rgba(255,255,255,0.7)]">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              Step 1 · Upload your blueprint
            </div>
            <h1 className="mt-5 text-3xl md:text-4xl font-bold" style={{ letterSpacing: '-0.03em' }}>
              Analyze your blueprint in seconds
            </h1>
            <p className="mt-3 text-[rgba(255,255,255,0.5)] leading-relaxed">
              Upload a floor plan image and get instant material + labor estimates.
            </p>
            <p className="mt-2 text-xs text-[rgba(255,255,255,0.38)] leading-relaxed">
              Beta: estimates cover structural shell, exterior finishes, and interior finishes. MEP, site work, permits, and land are excluded.
            </p>
            {!user && (
              <p className="mt-2 text-xs text-[rgba(255,255,255,0.35)]">
                {guestLimitReached
                  ? "You've used your free analyses. Sign up to continue."
                  : `Free guest analysis — ${GUEST_LIMIT - guestCount} of ${GUEST_LIMIT} remaining. No account needed.`}
              </p>
            )}
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="rounded-modal border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-4 md:p-6 shadow-card backdrop-blur">
              <div className="rounded-card bg-[#18181B] p-4 md:p-6">
                <div className="space-y-6">
                  {isLoading ? (
                    <AnalyzingState
                      progress={state.progress}
                      status={state.status as 'uploading' | 'analyzing'}
                    />
                  ) : state.status === 'error' ? (
                    <ErrorState
                      message={state.error || 'An error occurred'}
                      onRetry={reset}
                    />
                  ) : (
                    <>
                      <UploadZone
                        onFileSelect={handleFileSelect}
                        selectedFile={selectedFile}
                        filePreview={filePreview}
                        onClear={reset}
                        disabled={isLoading || guestLimitReached}
                      />
                      <SettingsPanel
                        settings={settings}
                        onUpdate={updateSettings}
                        disabled={isLoading || guestLimitReached}
                      />
                      <Button
                        onClick={handleAnalyze}
                        disabled={!selectedFile || isLoading || guestLimitReached}
                        size="lg"
                        className="w-full gap-2"
                      >
                        {guestLimitReached ? 'Sign Up to Continue' : 'Analyze Blueprint'}
                        <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

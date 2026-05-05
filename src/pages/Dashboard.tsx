import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ExternalLink, FileText, Loader2 } from 'lucide-react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { UploadHistory } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const SUBSCRIPTION_LABELS: Record<string, { label: string; className: string }> = {
  free: {
    label: 'Free',
    className: 'bg-stone-200 text-slate-700 border border-slate-300',
  },
  pro: {
    label: 'Pro',
    className: 'bg-amber-500 text-slate-950 border border-amber-600',
  },
  agency: {
    label: 'Agency',
    className: 'bg-amber-100 text-amber-900 border border-amber-200',
  },
};

function formatRoundedCurrency(value: number | null | undefined): string {
  if (!value || !Number.isFinite(value)) return '$0';
  return `$${(Math.round(value / 100) * 100).toLocaleString()}`;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function Dashboard() {
  const { user, profile } = useAuthContext();
  const [uploads, setUploads] = useState<UploadHistory[]>([]);
  const [loadingUploads, setLoadingUploads] = useState(true);
  const [loadingPortal, setLoadingPortal] = useState(false);

  const handleManageSubscription = async () => {
    if (!profile?.stripe_customer_id) return;
    setLoadingPortal(true);
    try {
      const response = await fetch(
        `https://takeoff-api-uyzv.onrender.com/api/v1/create-portal-session?customer_id=${profile.stripe_customer_id}&return_url=${encodeURIComponent(window.location.href)}`,
        { method: 'POST' }
      );
      const data = await response.json();
      if (data.portal_url) window.location.href = data.portal_url;
    } catch (error) {
      console.error('Error opening portal:', error);
    } finally {
      setLoadingPortal(false);
    }
  };

  useEffect(() => {
    async function fetchUploads() {
      if (!user) return;
      const { data, error } = await supabase
        .from('upload_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
      if (!error && data) setUploads(data as UploadHistory[]);
      setLoadingUploads(false);
    }
    fetchUploads();
  }, [user]);

  const subscription = profile?.subscription_status || 'free';
  const subscriptionInfo = SUBSCRIPTION_LABELS[subscription] || SUBSCRIPTION_LABELS.free;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <SiteHeader />

      <main className="flex-1 bg-stone-100 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight mb-3">
              Dashboard
            </h1>
            <p className="text-slate-600 leading-relaxed">
              Manage your account and view your analysis history.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-10">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-4">
                Account
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    Email
                  </div>
                  <p className="font-medium text-slate-900 break-all">{user?.email}</p>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    Member since
                  </div>
                  <p className="font-medium text-slate-900">
                    {user?.created_at ? formatDate(user.created_at) : '—'}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
              <div className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-4">
                Subscription
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={cn(
                      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider',
                      subscriptionInfo.className
                    )}
                  >
                    {subscriptionInfo.label}
                  </span>
                  {subscription === 'free' && (
                    <span className="text-sm text-slate-500">3 estimates/month</span>
                  )}
                </div>
              </div>
              <div className="mt-4">
                {subscription === 'free' ? (
                  <Link to="/pricing">
                    <Button
                      size="sm"
                      className="gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold border-0 shadow-lg shadow-amber-500/20"
                    >
                      Upgrade
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleManageSubscription}
                    disabled={loadingPortal}
                    className="gap-2 border-slate-300 bg-white text-slate-900 hover:bg-stone-50"
                  >
                    {loadingPortal ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Opening portal...
                      </>
                    ) : (
                      <>
                        Manage subscription
                        <ExternalLink className="w-3 h-3" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between gap-4 mb-5 flex-wrap">
              <div>
                <div className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-2">
                  Recent estimates
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                  Your analysis history
                </h2>
              </div>
              <Link to="/analyze">
                <Button
                  size="sm"
                  className="gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold border-0 shadow-lg shadow-amber-500/20 whitespace-nowrap"
                >
                  New analysis
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              {loadingUploads ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Skeleton className="w-10 h-10 rounded-lg" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                      <Skeleton className="h-5 w-20" />
                    </div>
                  ))}
                </div>
              ) : uploads.length === 0 ? (
                <div className="text-center py-14 px-6">
                  <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-7 h-7 text-slate-400" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No analyses yet.</h3>
                  <p className="text-slate-600 mb-6 max-w-sm mx-auto leading-relaxed">
                    Upload your first floor plan to get started.
                  </p>
                  <Link to="/analyze">
                    <Button
                      size="lg"
                      className="gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold border-0 shadow-lg shadow-amber-500/20"
                    >
                      Upload a floor plan
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <ul>
                  {uploads.map((upload, i) => {
                    const isLast = i === uploads.length - 1;
                    return (
                      <li key={upload.id} className={isLast ? '' : 'border-b border-slate-100'}>
                        <Link
                          to={`/results/${upload.id}`}
                          className="flex items-center justify-between gap-4 px-5 py-4 md:px-6 hover:bg-stone-50 transition-colors group"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0">
                              <FileText className="w-5 h-5 text-amber-600" strokeWidth={1.75} />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-slate-900 truncate">
                                {upload.filename}
                              </p>
                              <div className="flex items-center gap-3 text-sm text-slate-500 flex-wrap">
                                <span>{formatDate(upload.created_at)}</span>
                                {upload.rooms_detected ? (
                                  <span className="tabular-nums">
                                    {upload.rooms_detected} rooms
                                  </span>
                                ) : null}
                                {upload.quality_tier && (
                                  <span className="capitalize">{upload.quality_tier}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <div className="text-right">
                              <p className="font-mono font-semibold text-slate-900 tabular-nums">
                                {formatRoundedCurrency(upload.total_estimate)}
                              </p>
                              {upload.total_area ? (
                                <p className="text-sm text-slate-500 tabular-nums">
                                  {Math.round(upload.total_area).toLocaleString()} sq ft
                                </p>
                              ) : null}
                            </div>
                            <ChevronRight
                              className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors"
                              strokeWidth={1.75}
                            />
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

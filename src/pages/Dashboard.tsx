import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User, CreditCard, FileText, ArrowRight,
  Calendar, DollarSign, Loader2, ExternalLink, ChevronRight
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { UploadHistory } from '@/hooks/useAuth';

const SUBSCRIPTION_LABELS: Record<string, { label: string; color: string }> = {
  free: { label: 'Free', color: 'bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.5)] border border-[rgba(255,255,255,0.08)]' },
  pro: { label: 'Pro', color: 'bg-blue-600 text-white' },
  agency: { label: 'Agency', color: 'bg-blue-500/20 text-blue-300 border border-blue-500/30' },
};

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

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '—';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <Layout>
      <div className="bg-[#0A0A0A] text-[rgba(255,255,255,0.9)] min-h-[calc(100vh-64px)]">
        <div className="container py-10 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ letterSpacing: '-0.03em' }}>Dashboard</h1>
              <p className="text-[rgba(255,255,255,0.5)]">Manage your account and view your analysis history</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Account Card */}
              <div className="bg-[#18181B] border border-[rgba(255,255,255,0.08)] rounded-card p-6 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-card bg-blue-500/10 text-blue-400">
                    <User className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-lg font-semibold" style={{ letterSpacing: '-0.02em' }}>Account</h2>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-[rgba(255,255,255,0.5)]">Email</label>
                    <p className="font-medium text-[rgba(255,255,255,0.9)]">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-[rgba(255,255,255,0.5)]">Member since</label>
                    <p className="font-medium text-[rgba(255,255,255,0.9)]">
                      {user?.created_at ? formatDate(user.created_at) : '—'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subscription Card */}
              <div className="bg-[#18181B] border border-[rgba(255,255,255,0.08)] rounded-card p-6 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-card bg-blue-500/10 text-blue-400">
                    <CreditCard className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-lg font-semibold" style={{ letterSpacing: '-0.02em' }}>Subscription</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge className={subscriptionInfo.color + ' rounded-badge'}>{subscriptionInfo.label}</Badge>
                    {subscription === 'free' && (
                      <span className="text-sm text-[rgba(255,255,255,0.5)]">3 estimates/month</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {subscription === 'free' ? (
                      <Link to="/pricing">
                        <Button size="sm" className="gap-2">
                          Upgrade <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                        </Button>
                      </Link>
                    ) : (
                      <Button size="sm" variant="outline" className="gap-2" onClick={handleManageSubscription} disabled={loadingPortal}>
                        {loadingPortal ? <Loader2 className="w-3 h-3 animate-spin" /> : <>Manage Subscription <ExternalLink className="w-3 h-3" strokeWidth={1.5} /></>}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Upload History */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-card bg-blue-500/10 text-blue-400">
                    <FileText className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-lg font-semibold" style={{ letterSpacing: '-0.02em' }}>Recent Estimates</h2>
                </div>
                <Link to="/analyze">
                  <Button size="sm" className="gap-2">
                    New Analysis <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                  </Button>
                </Link>
              </div>

              <div className="bg-[#18181B] border border-[rgba(255,255,255,0.08)] rounded-card shadow-card overflow-hidden">
                {loadingUploads ? (
                  <div className="p-6 space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Skeleton className="w-10 h-10 rounded-btn bg-[rgba(255,255,255,0.04)]" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32 bg-[rgba(255,255,255,0.04)]" />
                            <Skeleton className="h-3 w-24 bg-[rgba(255,255,255,0.04)]" />
                          </div>
                        </div>
                        <Skeleton className="h-5 w-20 bg-[rgba(255,255,255,0.04)]" />
                      </div>
                    ))}
                  </div>
                ) : uploads.length === 0 ? (
                  <div className="text-center py-16 px-6">
                    <div className="w-16 h-16 rounded-card bg-[rgba(255,255,255,0.04)] flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-[rgba(255,255,255,0.3)]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-medium mb-2" style={{ letterSpacing: '-0.02em' }}>No analyses yet</h3>
                    <p className="text-[rgba(255,255,255,0.5)] mb-6">Upload your first blueprint to get started</p>
                    <Link to="/analyze">
                      <Button className="gap-2">
                        Analyze Blueprint <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-[rgba(255,255,255,0.08)]">
                    {uploads.map((upload) => (
                      <Link
                        key={upload.id}
                        to={`/results/${upload.id}`}
                        className="flex items-center justify-between p-4 hover:bg-[rgba(255,255,255,0.02)] transition-[background-color] duration-150 ease-out cursor-pointer group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-btn bg-[rgba(255,255,255,0.04)]">
                            <FileText className="w-5 h-5 text-[rgba(255,255,255,0.5)]" strokeWidth={1.5} />
                          </div>
                          <div>
                            <p className="font-medium text-[rgba(255,255,255,0.9)]">{upload.filename}</p>
                            <div className="flex items-center gap-3 text-sm text-[rgba(255,255,255,0.5)]">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" strokeWidth={1.5} />
                                {formatDate(upload.created_at)}
                              </span>
                              {upload.rooms_detected && (
                                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{upload.rooms_detected} rooms</span>
                              )}
                              {upload.quality_tier && (
                                <span className="capitalize">{upload.quality_tier}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="font-mono font-semibold text-[rgba(255,255,255,0.9)] flex items-center gap-1" style={{ fontVariantNumeric: 'tabular-nums' }}>
                              <DollarSign className="w-4 h-4" strokeWidth={1.5} />
                              {formatCurrency(upload.total_estimate)}
                            </p>
                            {upload.total_area && (
                              <p className="text-sm text-[rgba(255,255,255,0.5)]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                                {upload.total_area.toLocaleString()} sq ft
                              </p>
                            )}
                          </div>
                          <ChevronRight className="w-4 h-4 text-[rgba(255,255,255,0.3)] group-hover:text-[rgba(255,255,255,0.6)] transition-colors" strokeWidth={1.5} />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

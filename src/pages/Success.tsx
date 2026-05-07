import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { Button } from '@/components/ui/button';

export default function Success() {
  const [searchParams] = useSearchParams();
  const hasSessionId = !!searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <SiteHeader />

      <main className="flex-1 bg-stone-100 py-20 md:py-28">
        <div className="max-w-md mx-auto px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm text-center">
            {hasSessionId ? (
              <>
                <div className="w-16 h-16 rounded-full bg-amber-100 mx-auto mb-6 flex items-center justify-center">
                  <Check className="w-8 h-8 text-amber-600" strokeWidth={2.5} />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-3">
                  You're on Pro.
                </h1>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Your subscription is active. Run unlimited estimates and access cost
                  comparison reports from your dashboard.
                </p>
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="w-full gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold border-0 shadow-lg shadow-amber-500/20"
                  >
                    Go to dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <p className="mt-4 text-sm text-slate-500">
                  Or{' '}
                  <Link
                    to="/analyze"
                    className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                  >
                    run a new estimate
                  </Link>
                  .
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-3">
                  Nothing to confirm here.
                </h1>
                <p className="text-slate-600 leading-relaxed mb-8">
                  We couldn't find a recent checkout. If you've just upgraded, your
                  dashboard will show the latest status.
                </p>
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="w-full gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold border-0 shadow-lg shadow-amber-500/20"
                  >
                    Go to dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

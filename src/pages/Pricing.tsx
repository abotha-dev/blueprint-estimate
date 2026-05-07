import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, ExternalLink, Loader2 } from 'lucide-react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useAuthContext } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { API_BASE_URL, createCheckoutSession } from '@/services/api';
import { cn } from '@/lib/utils';

const FREE_FEATURES = [
  '3 full estimates per month',
  'Room detection + area calc',
  'Cost breakdown + materials',
  'PDF report export',
];

const PRO_FEATURES = [
  'Unlimited estimates',
  'Cost comparison reports (Budget vs Standard vs Premium materials)',
];

const FAQ_ITEMS = [
  {
    q: 'Is this a replacement for my real takeoff?',
    a: 'No. mytakeoff.ai gives you a ballpark range. A fast sanity check to help you decide which leads are worth a full estimate. Your real takeoff process stays exactly the same.',
  },
  {
    q: 'How accurate are the estimates?',
    a: "Accuracy depends on your input. Clean, scaled floor plans from design software produce the best results. The tool identifies rooms with high reliability and gives you low/mid/high cost ranges based on standard residential assumptions. It's a starting point, not a final number.",
  },
  {
    q: 'What types of projects does this work best for?',
    a: "Single-story residential, especially ADUs. The engine assumes slab-on-grade foundation, gable roof, and standard single-story construction. It's less suited for multi-story, complex rooflines, or remodels involving demolition and existing conditions.",
  },
  {
    q: 'What if I need to cancel?',
    a: 'Cancel anytime from your account dashboard. No contracts, no cancellation fees.',
  },
  {
    q: 'Can I share the PDF report with my clients?',
    a: 'Yes. The downloadable PDF is designed to be shared. Use it to frame budget conversations with clients.',
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const { user, profile } = useAuthContext();
  const { toast } = useToast();
  const [isAnnual, setIsAnnual] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);

  const subscription = profile?.subscription_status || 'free';
  const isPaidUser = subscription === 'pro' || subscription === 'agency';

  const proPrice = isAnnual ? 59 : 79;
  const proPriceSuffix = isAnnual ? '/month, billed annually' : '/month';

  const handleProClick = async () => {
    if (!user) {
      navigate('/signup', { state: { from: { pathname: '/pricing' } } });
      return;
    }
    if (isPaidUser) {
      handlePortal();
      return;
    }
    setLoadingCheckout(true);
    try {
      const checkoutUrl = await createCheckoutSession({
        plan: 'pro',
        interval: isAnnual ? 'annual' : 'monthly',
        success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/pricing`,
      });
      window.location.href = checkoutUrl;
    } catch (error) {
      toast({
        title: 'Checkout failed',
        description:
          error instanceof Error
            ? error.message
            : "We couldn't start checkout. Please try again.",
        variant: 'destructive',
      });
      setLoadingCheckout(false);
    }
  };

  const handlePortal = async () => {
    if (!profile?.stripe_customer_id) {
      toast({
        title: 'No active subscription',
        description: "We couldn't find an active subscription on this account.",
        variant: 'destructive',
      });
      return;
    }
    setLoadingPortal(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/create-portal-session?customer_id=${profile.stripe_customer_id}&return_url=${encodeURIComponent(window.location.href)}`,
        { method: 'POST' }
      );
      const data = await response.json();
      if (data.portal_url) {
        window.location.href = data.portal_url;
      } else {
        throw new Error('No portal URL returned');
      }
    } catch (error) {
      console.error('Error opening portal:', error);
      toast({
        title: 'Could not open portal',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
      setLoadingPortal(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <SiteHeader />

      <main className="flex-1 bg-stone-100 py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-4">
              Simple pricing for contractors who move fast.
            </h1>
            <p className="text-lg text-slate-700 leading-relaxed">
              Start free. Upgrade when you're using it on every lead.
            </p>
          </div>

          <div className="flex flex-col items-center mb-10">
            <div
              role="tablist"
              aria-label="Billing cycle"
              className="inline-flex items-center bg-stone-200/70 rounded-lg p-1 border border-slate-200"
            >
              <button
                type="button"
                role="tab"
                aria-selected={!isAnnual}
                onClick={() => setIsAnnual(false)}
                className={cn(
                  'px-5 py-1.5 rounded-md text-sm font-semibold transition-colors',
                  !isAnnual
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-transparent text-slate-700 hover:text-slate-900'
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={isAnnual}
                onClick={() => setIsAnnual(true)}
                className={cn(
                  'px-5 py-1.5 rounded-md text-sm font-semibold transition-colors',
                  isAnnual
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-transparent text-slate-700 hover:text-slate-900'
                )}
              >
                Annual
              </button>
            </div>
            <p className="text-sm text-slate-500 mt-3">Annual saves 25%.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto mb-20">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col">
              <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">
                Free
              </div>
              <div className="mb-3">
                <span className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-mono tabular-nums">
                  $0
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-6">Try mytakeoff.ai risk-free.</p>
              <ul className="space-y-3 mb-8 flex-1">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                      strokeWidth={2}
                    />
                    <span className="text-sm text-slate-700 leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
              {!user ? (
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="w-full gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold border-0 shadow-lg shadow-amber-500/20"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : subscription === 'free' ? (
                <div
                  aria-label="Current plan"
                  className="w-full px-4 py-2.5 rounded-md border border-slate-200 bg-stone-50 text-center text-sm font-semibold text-slate-700"
                >
                  Current plan
                </div>
              ) : (
                <p className="text-center text-sm text-slate-500 leading-relaxed">
                  Free tier remains available.
                </p>
              )}
            </div>

            <div className="rounded-2xl border-2 border-amber-500 bg-white p-8 shadow-md flex flex-col">
              <div className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-3">
                Pro
              </div>
              <div className="mb-3 flex items-baseline gap-2 flex-wrap">
                <span className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-mono tabular-nums">
                  ${proPrice}
                </span>
                <span className="text-sm text-slate-500">{proPriceSuffix}</span>
              </div>
              <p className="text-sm text-slate-600 mb-6">For contractors and estimators.</p>
              <div className="flex-1 mb-8">
                <p className="text-sm font-medium text-slate-900 mb-3">
                  Everything in Free, plus:
                </p>
                <ul className="space-y-3">
                  {PRO_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check
                        className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                        strokeWidth={2}
                      />
                      <span className="text-sm text-slate-700 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {isPaidUser ? (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handlePortal}
                  disabled={loadingPortal}
                  className="w-full gap-2 border-slate-300 bg-white text-slate-900 hover:bg-stone-50"
                >
                  {loadingPortal ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Opening portal...
                    </>
                  ) : (
                    <>
                      Manage subscription
                      <ExternalLink className="w-4 h-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={handleProClick}
                  disabled={loadingCheckout}
                  className="w-full gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold border-0 shadow-lg shadow-amber-500/20 disabled:opacity-80"
                >
                  {loadingCheckout ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Opening checkout...
                    </>
                  ) : (
                    <>
                      Get Pro
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-2">
                Pricing FAQ
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                Frequently asked questions
              </h2>
            </div>

            <Accordion
              type="single"
              collapsible
              className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
            >
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className={cn(i === FAQ_ITEMS.length - 1 ? 'border-b-0' : '')}
                >
                  <AccordionTrigger className="px-6 py-4 text-left text-base font-medium text-slate-900 hover:bg-stone-50 hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0 text-sm text-slate-700 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

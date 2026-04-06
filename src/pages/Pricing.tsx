import { useState } from 'react';
import { Check, Zap, Building2, Users } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { createCheckoutSession } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

type PlanType = 'free' | 'pro' | 'agency';
type Interval = 'monthly' | 'annual';

interface Plan {
  id: PlanType;
  name: string;
  icon: React.ReactNode;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    icon: <Zap className="w-6 h-6" strokeWidth={1.5} />,
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Perfect for trying out Takeoff.ai',
    features: [
      '3 estimates per month',
      'Basic room detection',
      'Standard materials library',
      'PDF export',
    ],
    cta: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: <Building2 className="w-6 h-6" strokeWidth={1.5} />,
    monthlyPrice: 49,
    annualPrice: 39,
    description: 'For contractors who need more',
    features: [
      'Unlimited estimates',
      'Advanced AI detection',
      'Custom materials & pricing',
      'Priority support',
      'Cost comparison reports',
      'Regional pricing data',
    ],
    cta: 'Get Pro',
    popular: true,
  },
  {
    id: 'agency',
    name: 'Agency',
    icon: <Users className="w-6 h-6" strokeWidth={1.5} />,
    monthlyPrice: 149,
    annualPrice: 119,
    description: 'For teams and agencies',
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'Shared project library',
      'White-label PDF reports',
      'API access',
      'Dedicated account manager',
    ],
    cta: 'Get Agency',
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<PlanType | null>(null);
  const { toast } = useToast();

  const handleSelectPlan = async (plan: Plan) => {
    if (plan.id === 'free') {
      window.location.href = '/analyze';
      return;
    }

    setLoadingPlan(plan.id);
    try {
      const checkoutUrl = await createCheckoutSession({
        plan: plan.id,
        interval: isAnnual ? 'annual' : 'monthly',
        success_url: `${window.location.origin}/success`,
        cancel_url: `${window.location.origin}/pricing`,
      });
      window.location.href = checkoutUrl;
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create checkout session',
        variant: 'destructive',
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <Layout>
      <div className="relative overflow-hidden bg-[#0A0A0A] text-[rgba(255,255,255,0.9)]">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/8 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute -top-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" aria-hidden="true" />

        <div className="container relative mx-auto px-4 py-20 md:py-24">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.03em' }}>
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-[rgba(255,255,255,0.5)] leading-relaxed">
              Choose the plan that fits your business. All plans include our core AI-powered estimation technology.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <Label htmlFor="billing-toggle" className={cn(
              "text-sm font-medium transition-[color] duration-150 ease-out",
              !isAnnual ? "text-[rgba(255,255,255,0.9)]" : "text-[rgba(255,255,255,0.5)]"
            )}>
              Monthly
            </Label>
            <Switch id="billing-toggle" checked={isAnnual} onCheckedChange={setIsAnnual} />
            <Label htmlFor="billing-toggle" className={cn(
              "text-sm font-medium transition-[color] duration-150 ease-out",
              isAnnual ? "text-[rgba(255,255,255,0.9)]" : "text-[rgba(255,255,255,0.5)]"
            )}>
              Annual
              <span className="ml-2 text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-badge">
                Save 20%
              </span>
            </Label>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
              const isLoading = loadingPlan === plan.id;

              return (
                <div
                  key={plan.id}
                  className={cn(
                    "relative rounded-card border bg-[#18181B] p-8 flex flex-col shadow-card",
                    plan.popular
                      ? "border-blue-500/40 ring-1 ring-blue-500/20 scale-105"
                      : "border-[rgba(255,255,255,0.08)]"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-blue-600 text-white text-sm font-medium px-4 py-1 rounded-badge">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <div className={cn(
                      "w-12 h-12 rounded-card flex items-center justify-center mb-4",
                      plan.popular
                        ? "bg-blue-600 text-white"
                        : "bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.5)]"
                    )}>
                      {plan.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[rgba(255,255,255,0.9)]" style={{ letterSpacing: '-0.02em' }}>{plan.name}</h3>
                    <p className="text-sm text-[rgba(255,255,255,0.5)] mt-1">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-[rgba(255,255,255,0.9)] font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>
                        ${price}
                      </span>
                      {price > 0 && (
                        <span className="text-[rgba(255,255,255,0.5)]">/month</span>
                      )}
                    </div>
                    {isAnnual && price > 0 && (
                      <p className="text-sm text-[rgba(255,255,255,0.4)] mt-1" style={{ fontVariantNumeric: 'tabular-nums' }}>
                        Billed annually (${price * 12}/year)
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-sm text-[rgba(255,255,255,0.7)]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSelectPlan(plan)}
                    disabled={isLoading}
                    variant={plan.popular ? 'default' : 'outline'}
                    className="w-full"
                    size="lg"
                  >
                    {isLoading ? 'Loading...' : plan.cta}
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-[rgba(255,255,255,0.4)]">
              All plans include a 14-day money-back guarantee. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

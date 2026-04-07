import { Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface PaywallOverlayProps {
  /** Content to render behind the blur */
  children: React.ReactNode;
  /** Heading shown on the overlay */
  title?: string;
  /** Description text */
  description?: string;
  /** Whether the paywall is active (if false, children render normally) */
  locked: boolean;
}

export function PaywallOverlay({
  children,
  title = 'Unlock Full Cost Breakdown',
  description = 'Create a free account to see detailed materials, labor costs, and download your PDF report.',
  locked,
}: PaywallOverlayProps) {
  const navigate = useNavigate();

  if (!locked) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Blurred content behind the overlay */}
      <div className="pointer-events-none select-none" aria-hidden="true">
        <div className="blur-[6px] opacity-50">
          {children}
        </div>
      </div>

      {/* Overlay CTA */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 mb-4">
            <Lock className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{description}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate('/signup')}
              size="lg"
              className="gap-2"
            >
              Sign Up Free
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => navigate('/login')}
              variant="outline"
              size="lg"
            >
              Log In
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Free accounts get 3 full estimates per month
          </p>
        </div>
      </div>
    </div>
  );
}

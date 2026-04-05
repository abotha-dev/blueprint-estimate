import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-card p-8 md:p-12 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-card bg-red-500/10 flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-8 h-8 text-red-400" strokeWidth={1.5} />
      </div>
      
      <h3 className="text-lg font-semibold text-[rgba(255,255,255,0.9)] mb-2" style={{ letterSpacing: '-0.02em' }}>
        Something went wrong
      </h3>
      <p className="text-[rgba(255,255,255,0.5)] mb-6 max-w-md mx-auto">
        {message}
      </p>

      <Button onClick={onRetry} variant="outline" className="gap-2">
        <RefreshCw className="w-4 h-4" strokeWidth={1.5} />
        Try Again
      </Button>
    </div>
  );
}

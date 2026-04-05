import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface AnalyzingStateProps {
  progress: number;
  status: 'uploading' | 'analyzing';
}

export function AnalyzingState({ progress, status }: AnalyzingStateProps) {
  const messages = {
    uploading: 'Uploading your blueprint...',
    analyzing: 'AI is analyzing rooms and dimensions...',
  };

  return (
    <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-card p-8 md:p-12 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-card bg-indigo-500/10 flex items-center justify-center mx-auto mb-6">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" strokeWidth={1.5} />
      </div>
      
      <h3 className="text-lg font-semibold text-[rgba(255,255,255,0.9)] mb-2" style={{ letterSpacing: '-0.02em' }}>
        {messages[status]}
      </h3>
      <p className="text-[rgba(255,255,255,0.5)] mb-6">
        This usually takes 10–30 seconds.
      </p>

      <div className="max-w-sm mx-auto space-y-2">
        <Progress value={progress} className="h-2" />
        <p className="text-sm font-mono text-[rgba(255,255,255,0.5)]" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {progress}%
        </p>
      </div>
    </div>
  );
}

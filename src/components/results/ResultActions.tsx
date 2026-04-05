import { Download, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultActionsProps {
  onNewEstimate: () => void;
  onDownloadPdf?: () => void;
  isGeneratingPdf?: boolean;
}

export function ResultActions({ onNewEstimate, onDownloadPdf, isGeneratingPdf = false }: ResultActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 animate-slide-up" style={{ animationDelay: '0.4s' }}>
      <Button 
        onClick={onDownloadPdf}
        variant="outline"
        className="flex-1 gap-2"
        disabled={isGeneratingPdf}
      >
        {isGeneratingPdf ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating PDF...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" strokeWidth={1.5} />
            Download PDF Report
          </>
        )}
      </Button>
      <Button 
        onClick={onNewEstimate}
        className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-500 text-white border-0"
        disabled={isGeneratingPdf}
      >
        <RefreshCw className="w-4 h-4" strokeWidth={1.5} />
        Start New Estimate
      </Button>
    </div>
  );
}

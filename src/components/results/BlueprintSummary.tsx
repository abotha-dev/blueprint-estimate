import { FileImage, AlertTriangle, Ruler, Layers } from 'lucide-react';
import { AnalysisResult } from '@/types';

interface BlueprintSummaryProps {
  result: AnalysisResult;
  thumbnail?: string;
}

export function BlueprintSummary({ result, thumbnail }: BlueprintSummaryProps) {
  return (
    <div className="bg-[#18181B] border border-[rgba(255,255,255,0.08)] rounded-card p-5 shadow-card animate-slide-up">
      <div className="flex gap-4">
        {thumbnail && (
          <div className="w-20 h-20 rounded-btn overflow-hidden border border-[rgba(255,255,255,0.08)] flex-shrink-0">
            <img src={thumbnail} alt="Blueprint" className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-3">
            <FileImage className="w-5 h-5 text-[rgba(255,255,255,0.5)] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="min-w-0">
              <h3 className="font-semibold text-[rgba(255,255,255,0.9)] truncate">{result.filename || 'Unknown File'}</h3>
              <p className="text-sm text-[rgba(255,255,255,0.5)]">{result.project_name || 'Untitled Project'}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ fontVariantNumeric: 'tabular-nums' }}>
            <div className="flex items-center gap-1.5 text-[rgba(255,255,255,0.5)]">
              <Ruler className="w-4 h-4" strokeWidth={1.5} />
              <span>{(result.total_area || 0).toLocaleString()} {result.unit_system || 'sq ft'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[rgba(255,255,255,0.5)]">
              <Layers className="w-4 h-4" strokeWidth={1.5} />
              <span>{(result.rooms?.length || 0)} rooms detected</span>
            </div>
          </div>
        </div>
      </div>

      {result.warnings?.length > 0 && (
        <div className="mt-4 p-3 rounded-btn bg-amber-500/10 border border-amber-500/20">
          <div className="flex gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="text-sm">
              {result.warnings.map((warning, i) => (
                <p key={i} className="text-amber-300">{warning}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

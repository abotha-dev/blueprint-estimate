import { cn } from '@/lib/utils';
import { Room } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface RoomBreakdownProps {
  rooms: Room[];
}

function ConfidenceBadge({ confidence }: { confidence: number }) {
  const level = confidence >= 0.85 ? 'high' : confidence >= 0.7 ? 'medium' : 'low';
  const labels = { high: 'High', medium: 'Medium', low: 'Low' };
  
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-badge text-xs font-medium",
      level === 'high' && "bg-emerald-500/10 text-emerald-400",
      level === 'medium' && "bg-amber-500/10 text-amber-400",
      level === 'low' && "bg-red-500/10 text-red-400"
    )}>
      {labels[level]}
    </span>
  );
}

export function RoomBreakdown({ rooms }: RoomBreakdownProps) {
  return (
    <div className="bg-[#18181B] border border-[rgba(255,255,255,0.08)] rounded-card shadow-card overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="p-4 border-b border-[rgba(255,255,255,0.08)]">
        <h3 className="font-semibold text-[rgba(255,255,255,0.9)]" style={{ letterSpacing: '-0.02em' }}>Room Breakdown</h3>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-[rgba(255,255,255,0.08)]">
              <TableHead className="text-[rgba(255,255,255,0.5)]">Room</TableHead>
              <TableHead className="text-right text-[rgba(255,255,255,0.5)]">Dimensions</TableHead>
              <TableHead className="text-right text-[rgba(255,255,255,0.5)]">Area</TableHead>
              <TableHead className="text-right text-[rgba(255,255,255,0.5)]">Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room, index) => (
              <TableRow key={index} className="border-[rgba(255,255,255,0.08)]">
                <TableCell className="font-medium text-[rgba(255,255,255,0.9)]">{room.name || 'Unknown Room'}</TableCell>
                <TableCell className="text-right font-mono text-sm text-[rgba(255,255,255,0.7)]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {(room.dimensions?.length || 0)}' × {(room.dimensions?.width || 0)}'
                </TableCell>
                <TableCell className="text-right font-mono text-sm text-[rgba(255,255,255,0.7)]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {(room.area || 0).toLocaleString()} sq ft
                </TableCell>
                <TableCell className="text-right">
                  <ConfidenceBadge confidence={room.confidence || 0} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

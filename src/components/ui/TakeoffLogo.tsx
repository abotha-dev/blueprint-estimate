interface TakeoffLogoProps {
  /** Optional pixel size. Prefer Tailwind w-/h- classes via `className`. */
  size?: number;
  className?: string;
}

/**
 * Takeoff.ai logo mark — three stacked horizontal bars forming a stepped
 * pyramidal silhouette (foundation → walls → roof). Uses currentColor so
 * it inherits from parent text color (e.g. wrap in text-amber-500).
 */
export function TakeoffLogo({ size, className }: TakeoffLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Takeoff.ai logo"
    >
      {/* Foundation — widest */}
      <rect x="2" y="17" width="20" height="3" rx="0.5" fill="currentColor" />
      {/* Walls — middle */}
      <rect x="5" y="11" width="14" height="3" rx="0.5" fill="currentColor" />
      {/* Roof — narrowest */}
      <rect x="8" y="5" width="8" height="3" rx="0.5" fill="currentColor" />
    </svg>
  );
}

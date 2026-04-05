interface TakeoffLogoProps {
  size?: number;
  className?: string;
}

/**
 * Takeoff.ai logo mark — house/rocket hybrid
 * House roof = rocket nose cone | porthole with blueprint crosshair | landing fins
 * Use `size` to scale. Default: 40px height.
 */
export function TakeoffLogo({ size = 40, className }: TakeoffLogoProps) {
  const w = size * 0.8; // maintain 80:100 aspect ratio
  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Takeoff.ai logo"
    >
      {/* Fins */}
      <path d="M12 64 L1 88 L12 85 Z" fill="#3730A3" />
      <path d="M68 64 L79 88 L68 85 Z" fill="#3730A3" />

      {/* Body */}
      <rect x="12" y="40" width="56" height="48" rx="2" fill="#4F46E5" />

      {/* Nose cone */}
      <path d="M40 5 L68 40 L12 40 Z" fill="#6366F1" />

      {/* Belt seam */}
      <rect x="12" y="38" width="56" height="5" rx="1" fill="#4338CA" />

      {/* Porthole */}
      <circle cx="40" cy="56" r="10" fill="rgba(255,255,255,0.14)" />
      <circle cx="40" cy="56" r="7" fill="rgba(255,255,255,0.08)" />
      {/* Crosshair */}
      <line x1="40" y1="49.5" x2="40" y2="62.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="33.5" y1="56" x2="46.5" y2="56" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round" />
      {/* Highlight */}
      <circle cx="37" cy="53" r="2.5" fill="rgba(255,255,255,0.32)" />

      {/* Door / airlock */}
      <path d="M32 88 L32 78 Q32 69 40 69 Q48 69 48 78 L48 88 Z" fill="#3730A3" />
    </svg>
  );
}

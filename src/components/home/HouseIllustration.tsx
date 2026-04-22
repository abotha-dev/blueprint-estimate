/**
 * Animated architectural house line illustration.
 * Amber/gold strokes on dark slate. Draws in sequence:
 * foundation → walls → roof → room labels fade in.
 */
export function HouseIllustration() {
  return (
    <svg
      viewBox="0 0 520 340"
      className="w-full h-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="house-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(251,191,36,0.05)" strokeWidth="0.5" />
        </pattern>
      </defs>

      <rect width="520" height="340" fill="url(#house-grid)" />

      {/* Foundation — draws first */}
      <g
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 600,
          strokeDashoffset: 600,
          animation: 'draw-foundation 1s ease-out 0.2s forwards',
        }}
      >
        <line x1="50" y1="270" x2="470" y2="270" />
        <line x1="50" y1="278" x2="470" y2="278" />
        <line x1="50" y1="270" x2="50" y2="278" />
        <line x1="470" y1="270" x2="470" y2="278" />
      </g>

      {/* Walls & interior partitions — draw second */}
      <g
        stroke="#fbbf24"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 1800,
          strokeDashoffset: 1800,
          animation: 'draw-walls 1.4s ease-out 1.1s forwards',
        }}
      >
        {/* Outer walls */}
        <rect x="60" y="130" width="400" height="140" />

        {/* Interior partitions — rooms */}
        {/* Vertical splits */}
        <line x1="200" y1="130" x2="200" y2="270" />
        <line x1="330" y1="130" x2="330" y2="270" />
        {/* Horizontal split in the right two rooms */}
        <line x1="200" y1="200" x2="460" y2="200" />

        {/* Windows */}
        <line x1="95" y1="130" x2="135" y2="130" stroke="#0a0d14" strokeWidth="3" />
        <line x1="95" y1="130" x2="135" y2="130" />
        <line x1="245" y1="130" x2="285" y2="130" stroke="#0a0d14" strokeWidth="3" />
        <line x1="245" y1="130" x2="285" y2="130" />
        <line x1="375" y1="130" x2="415" y2="130" stroke="#0a0d14" strokeWidth="3" />
        <line x1="375" y1="130" x2="415" y2="130" />

        {/* Door opening on bottom */}
        <line x1="250" y1="270" x2="280" y2="270" stroke="#0a0d14" strokeWidth="3" />
        <path d="M 250 270 A 30 30 0 0 1 280 270" stroke="#fbbf24" strokeWidth="1" opacity="0.5" />
      </g>

      {/* Roof — draws third */}
      <g
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 1100,
          strokeDashoffset: 1100,
          animation: 'draw-roof 1s ease-out 2.5s forwards',
        }}
      >
        <polyline points="50,130 260,50 470,130" />
        <polyline points="50,130 50,120 260,40 470,120 470,130" />
        {/* Chimney */}
        <rect x="360" y="68" width="18" height="32" />
      </g>

      {/* Dimension ticks — subtle architectural detail */}
      <g
        stroke="#fbbf24"
        strokeWidth="1"
        opacity="0.4"
        style={{
          opacity: 0,
          animation: 'fade-in-labels 0.8s ease-out 3.5s forwards',
        }}
      >
        <line x1="60" y1="295" x2="460" y2="295" />
        <line x1="60" y1="290" x2="60" y2="300" />
        <line x1="460" y1="290" x2="460" y2="300" />
        <line x1="40" y1="130" x2="40" y2="270" />
        <line x1="35" y1="130" x2="45" y2="130" />
        <line x1="35" y1="270" x2="45" y2="270" />
      </g>

      {/* Room labels — fade in last */}
      <g
        style={{
          opacity: 0,
          animation: 'fade-in-labels 0.8s ease-out 3.7s forwards',
        }}
      >
        <text x="130" y="205" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="0.08em">LIVING</text>
        <text x="265" y="170" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="0.08em">KITCHEN</text>
        <text x="395" y="170" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="0.08em">BED</text>
        <text x="265" y="240" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="0.08em">BATH</text>
        <text x="395" y="240" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="0.08em">BED</text>

        <text x="260" y="293" textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.6">40' — 0"</text>
        <text x="30" y="204" textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.6" transform="rotate(-90 30 204)">14' — 0"</text>
      </g>

      <style>{`
        @keyframes draw-foundation {
          to { stroke-dashoffset: 0; }
        }
        @keyframes draw-walls {
          to { stroke-dashoffset: 0; }
        }
        @keyframes draw-roof {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fade-in-labels {
          to { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}

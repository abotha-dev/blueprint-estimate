export function BlueprintHero() {
  return (
    <div className="relative w-full">
      {/* Outer glow */}
      <div className="absolute -inset-4 bg-blue-500/10 rounded-[28px] blur-2xl" aria-hidden="true" />

      {/* Blueprint container */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-blue-400/20">
        <svg
          viewBox="0 0 640 420"
          className="w-full h-auto block"
          xmlns="http://www.w3.org/2000/svg"
          style={{ background: '#1a3a6e' }}
        >
          <defs>
            {/* Fine grid */}
            <pattern id="fine-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
            </pattern>
            {/* Major grid */}
            <pattern id="major-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
            </pattern>
          </defs>

          {/* Background */}
          <rect width="640" height="420" fill="#1a3a6e" />
          <rect width="640" height="420" fill="url(#fine-grid)" />
          <rect width="640" height="420" fill="url(#major-grid)" />

          {/* ── WALLS (double-line style) ── */}
          {/* Outer perimeter — outer wall */}
          <rect x="60" y="50" width="520" height="320" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="6" />
          {/* Outer perimeter — inner wall */}
          <rect x="68" y="58" width="504" height="304" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />

          {/* Interior wall fillers (white between double lines) */}
          <rect x="60" y="50" width="520" height="320" fill="rgba(30,70,130,0.5)" />
          <rect x="68" y="58" width="504" height="304" fill="#1a3a6e" />

          {/* ── INTERIOR WALLS ── */}
          {/* Vertical divider: Living | Bedrooms (x=300) */}
          <line x1="300" y1="58" x2="300" y2="250" stroke="rgba(255,255,255,0.9)" strokeWidth="5" />
          <line x1="306" y1="58" x2="306" y2="250" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />

          {/* Horizontal divider: Bedroom 1 | Bedroom 2 (y=200, right side) */}
          <line x1="306" y1="200" x2="572" y2="200" stroke="rgba(255,255,255,0.9)" strokeWidth="5" />
          <line x1="306" y1="206" x2="572" y2="206" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />

          {/* Horizontal divider: Living | Kitchen (y=250, left side) */}
          <line x1="68" y1="250" x2="306" y2="250" stroke="rgba(255,255,255,0.9)" strokeWidth="5" />
          <line x1="68" y1="256" x2="306" y2="256" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />

          {/* Horizontal divider: Kitchen | Garage (y=250, right) */}
          <line x1="306" y1="250" x2="572" y2="250" stroke="rgba(255,255,255,0.9)" strokeWidth="5" />
          <line x1="306" y1="256" x2="572" y2="256" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />

          {/* ── DOORS ── */}
          {/* Front door (bottom-left of living room) */}
          <line x1="100" y1="370" x2="140" y2="370" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
          <path d="M 100 370 A 40 40 0 0 1 140 330" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="3,2" />
          <line x1="100" y1="330" x2="100" y2="370" stroke="rgba(255,255,255,0)" strokeWidth="0" />

          {/* Bedroom 1 door */}
          <line x1="306" y1="80" x2="306" y2="110" stroke="#1a3a6e" strokeWidth="6" />
          <path d="M 306 80 A 30 30 0 0 0 336 80" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="3,2" />

          {/* Bedroom 2 door */}
          <line x1="400" y1="200" x2="430" y2="200" stroke="#1a3a6e" strokeWidth="6" />
          <path d="M 400 200 A 30 30 0 0 1 400 230" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="3,2" />

          {/* Kitchen door */}
          <line x1="200" y1="250" x2="230" y2="250" stroke="#1a3a6e" strokeWidth="6" />
          <path d="M 200 250 A 30 30 0 0 0 200 280" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="3,2" />

          {/* ── WINDOWS ── */}
          {/* Living room window (left wall) */}
          <line x1="60" y1="130" x2="60" y2="180" stroke="#1a3a6e" strokeWidth="7" />
          <line x1="60" y1="130" x2="60" y2="180" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
          <line x1="68" y1="130" x2="68" y2="180" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />

          {/* Bedroom 1 window (top wall) */}
          <line x1="350" y1="50" x2="420" y2="50" stroke="#1a3a6e" strokeWidth="7" />
          <line x1="350" y1="50" x2="420" y2="50" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
          <line x1="350" y1="58" x2="420" y2="58" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />

          {/* ── FIXTURES ── */}
          {/* Kitchen sink */}
          <rect x="90" y="260" width="28" height="18" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" rx="2" />
          <circle cx="104" cy="269" r="4" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

          {/* Kitchen counter */}
          <rect x="80" y="260" width="180" height="14" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />

          {/* Bathroom toilet (bedroom 2 area) */}
          <ellipse cx="540" cy="165" rx="14" ry="18" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
          <rect x="526" y="145" width="28" height="12" rx="2" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />

          {/* ── DIMENSION LINES ── */}
          {/* Width dimension (top) */}
          <line x1="60" y1="30" x2="580" y2="30" stroke="rgba(255,255,255,0.45)" strokeWidth="0.75" />
          <line x1="60" y1="25" x2="60" y2="35" stroke="rgba(255,255,255,0.45)" strokeWidth="0.75" />
          <line x1="580" y1="25" x2="580" y2="35" stroke="rgba(255,255,255,0.45)" strokeWidth="0.75" />
          <text x="320" y="26" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.55)" fontFamily="monospace">52&apos;-0&quot;</text>

          {/* Height dimension (right) */}
          <line x1="600" y1="50" x2="600" y2="370" stroke="rgba(255,255,255,0.45)" strokeWidth="0.75" />
          <line x1="595" y1="50" x2="605" y2="50" stroke="rgba(255,255,255,0.45)" strokeWidth="0.75" />
          <line x1="595" y1="370" x2="605" y2="370" stroke="rgba(255,255,255,0.45)" strokeWidth="0.75" />
          <text x="612" y="215" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.55)" fontFamily="monospace" transform="rotate(90, 612, 215)">32&apos;-0&quot;</text>

          {/* Internal dimension — living room width */}
          <line x1="68" y1="240" x2="300" y2="240" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" strokeDasharray="2,2" />
          <text x="184" y="238" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)" fontFamily="monospace">23&apos;-6&quot;</text>

          {/* ── ROOM LABELS ── */}
          <text x="175" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="rgba(255,255,255,0.85)" fontFamily="monospace">LIVING ROOM</text>
          <text x="175" y="160" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)" fontFamily="monospace">300 sq ft</text>

          <text x="435" y="130" textAnchor="middle" fontSize="10" fontWeight="bold" fill="rgba(255,255,255,0.85)" fontFamily="monospace">BEDROOM 1</text>
          <text x="435" y="145" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)" fontFamily="monospace">180 sq ft</text>

          <text x="435" y="295" textAnchor="middle" fontSize="10" fontWeight="bold" fill="rgba(255,255,255,0.85)" fontFamily="monospace">BEDROOM 2</text>
          <text x="435" y="310" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)" fontFamily="monospace">144 sq ft</text>

          <text x="175" y="315" textAnchor="middle" fontSize="10" fontWeight="bold" fill="rgba(255,255,255,0.85)" fontFamily="monospace">KITCHEN</text>
          <text x="175" y="330" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)" fontFamily="monospace">100 sq ft</text>

          {/* ── CORNER MARKS ── */}
          <path d="M 60 50 L 80 50 M 60 50 L 60 70" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
          <path d="M 580 50 L 560 50 M 580 50 L 580 70" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
          <path d="M 60 370 L 80 370 M 60 370 L 60 350" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
          <path d="M 580 370 L 560 370 M 580 370 L 580 350" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />

          {/* North arrow */}
          <text x="30" y="100" fontSize="9" fill="rgba(255,255,255,0.5)" fontFamily="monospace">N</text>
          <line x1="30" y1="103" x2="30" y2="120" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
          <path d="M 26 115 L 30 103 L 34 115" fill="rgba(255,255,255,0.5)" />

          {/* Scale indicator */}
          <text x="75" y="408" fontSize="7" fill="rgba(255,255,255,0.4)" fontFamily="monospace">SCALE: 1/4&quot; = 1&apos;-0&quot;</text>
          <text x="420" y="408" fontSize="7" fill="rgba(255,255,255,0.4)" fontFamily="monospace">FLOOR PLAN — MAIN LEVEL</text>
        </svg>

        {/* Floating result card */}
        <div className="absolute bottom-4 right-4 bg-[#0f1e3d]/90 backdrop-blur border border-blue-400/30 rounded-xl px-4 py-3 shadow-xl">
          <div className="flex items-center justify-between gap-6 text-xs text-white/60 mb-1.5">
            <span>4 rooms detected</span>
            <span className="text-white/40">1,124 sq ft</span>
          </div>
          <div className="text-base font-semibold text-white font-mono mb-1.5">$118,817 estimated</div>
          <div className="flex items-center gap-1.5 text-[10px] text-white/50">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-300" />
            </span>
            Analysis complete
          </div>
        </div>
      </div>
    </div>
  );
}

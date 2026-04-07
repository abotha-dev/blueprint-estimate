export function BlueprintHero() {
  return (
    <div className="relative w-full h-full flex items-center">
      <svg
        viewBox="0 0 540 420"
        className="w-full h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <style>{`
          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
        `}</style>

        {/* ── OUTER WALLS (outer line) ─────────────────────── */}
        <line x1="6"   y1="5"   x2="534" y2="5"   stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="square" strokeDasharray="560" strokeDashoffset="560" style={{ animation: 'draw 1.2s ease forwards 0.0s' }} />
        <line x1="536" y1="2"   x2="536" y2="418"  stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="square" strokeDasharray="440" strokeDashoffset="440" style={{ animation: 'draw 0.95s ease forwards 0.25s' }} />
        <line x1="6"   y1="417" x2="210" y2="417"  stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="square" strokeDasharray="220" strokeDashoffset="220" style={{ animation: 'draw 0.45s ease forwards 0.65s' }} />
        <line x1="260" y1="417" x2="536" y2="417"  stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="square" strokeDasharray="290" strokeDashoffset="290" style={{ animation: 'draw 0.60s ease forwards 0.80s' }} />
        <line x1="5"   y1="2"   x2="5"   y2="68"   stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="square" strokeDasharray="80"  strokeDashoffset="80"  style={{ animation: 'draw 0.16s ease forwards 0.52s' }} />
        <line x1="5"   y1="118" x2="5"   y2="418"  stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="square" strokeDasharray="320" strokeDashoffset="320" style={{ animation: 'draw 0.65s ease forwards 0.58s' }} />

        {/* Outer wall inner line (double-wall effect) */}
        <line x1="12"  y1="11"  x2="528" y2="11"   stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeLinecap="square" strokeDasharray="560" strokeDashoffset="560" style={{ animation: 'draw 1.2s ease forwards 0.1s' }} />
        <line x1="530" y1="8"   x2="530" y2="412"  stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeLinecap="square" strokeDasharray="440" strokeDashoffset="440" style={{ animation: 'draw 0.95s ease forwards 0.35s' }} />
        <line x1="12"  y1="411" x2="208" y2="411"  stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeLinecap="square" strokeDasharray="220" strokeDashoffset="220" style={{ animation: 'draw 0.45s ease forwards 0.75s' }} />
        <line x1="262" y1="411" x2="530" y2="411"  stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeLinecap="square" strokeDasharray="290" strokeDashoffset="290" style={{ animation: 'draw 0.60s ease forwards 0.90s' }} />
        <line x1="11"  y1="8"   x2="11"  y2="66"   stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeLinecap="square" strokeDasharray="70"  strokeDashoffset="70"  style={{ animation: 'draw 0.16s ease forwards 0.62s' }} />
        <line x1="11"  y1="120" x2="11"  y2="412"  stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeLinecap="square" strokeDasharray="310" strokeDashoffset="310" style={{ animation: 'draw 0.65s ease forwards 0.68s' }} />

        {/* ── WINDOW (left wall) ──────────────────────────────── */}
        <line x1="5"  y1="68"  x2="5"   y2="118" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="square" strokeDasharray="55" strokeDashoffset="55" style={{ animation: 'draw 0.12s ease forwards 1.6s' }} />
        <line x1="11" y1="68"  x2="11"  y2="118" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeDasharray="55" strokeDashoffset="55" style={{ animation: 'draw 0.12s ease forwards 1.62s' }} />
        <line x1="8"  y1="72"  x2="8"   y2="114" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeDasharray="48" strokeDashoffset="48" style={{ animation: 'draw 0.10s ease forwards 1.65s' }} />

        {/* Window (top wall, master bed) */}
        <line x1="310" y1="5"  x2="420" y2="5"  stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeDasharray="115" strokeDashoffset="115" style={{ animation: 'draw 0.22s ease forwards 1.7s' }} />
        <line x1="310" y1="11" x2="420" y2="11" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeDasharray="115" strokeDashoffset="115" style={{ animation: 'draw 0.22s ease forwards 1.72s' }} />
        <line x1="314" y1="8"  x2="416" y2="8"  stroke="rgba(255,255,255,0.10)" strokeWidth="0.8" strokeDasharray="105" strokeDashoffset="105" style={{ animation: 'draw 0.20s ease forwards 1.75s' }} />

        {/* ── INTERIOR WALLS ──────────────────────────────────── */}
        {/* Horizontal divider @ y=250 */}
        <line x1="11"  y1="250" x2="529" y2="250" stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" strokeLinecap="square" strokeDasharray="540" strokeDashoffset="540" style={{ animation: 'draw 1.0s ease forwards 1.3s' }} />
        <line x1="11"  y1="255" x2="529" y2="255" stroke="rgba(255,255,255,0.14)" strokeWidth="0.6" strokeDasharray="540" strokeDashoffset="540" style={{ animation: 'draw 1.0s ease forwards 1.35s' }} />

        {/* Vertical: kitchen / master bed @ x=195 */}
        <line x1="195" y1="11"  x2="195" y2="250" stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" strokeLinecap="square" strokeDasharray="260" strokeDashoffset="260" style={{ animation: 'draw 0.55s ease forwards 1.55s' }} />
        <line x1="200" y1="11"  x2="200" y2="250" stroke="rgba(255,255,255,0.14)" strokeWidth="0.6" strokeDasharray="260" strokeDashoffset="260" style={{ animation: 'draw 0.55s ease forwards 1.58s' }} />

        {/* Vertical: bed2 / bath @ x=380 */}
        <line x1="380" y1="11"  x2="380" y2="250" stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" strokeLinecap="square" strokeDasharray="260" strokeDashoffset="260" style={{ animation: 'draw 0.55s ease forwards 1.7s' }} />
        <line x1="385" y1="11"  x2="385" y2="250" stroke="rgba(255,255,255,0.14)" strokeWidth="0.6" strokeDasharray="260" strokeDashoffset="260" style={{ animation: 'draw 0.55s ease forwards 1.73s' }} />

        {/* Horizontal: bed2 / bath @ y=148 */}
        <line x1="385" y1="148" x2="529" y2="148" stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" strokeLinecap="square" strokeDasharray="160" strokeDashoffset="160" style={{ animation: 'draw 0.34s ease forwards 1.9s' }} />
        <line x1="385" y1="153" x2="529" y2="153" stroke="rgba(255,255,255,0.14)" strokeWidth="0.6" strokeDasharray="160" strokeDashoffset="160" style={{ animation: 'draw 0.34s ease forwards 1.93s' }} />

        {/* ── DOOR SWINGS ─────────────────────────────────────── */}
        <path d="M 195 80 L 195 110" stroke="rgba(255,255,255,0.38)" strokeWidth="1.2" strokeDasharray="35" strokeDashoffset="35" style={{ animation: 'draw 0.08s ease forwards 2.1s' }} />
        <path d="M 195 80 A 30 30 0 0 0 165 80" stroke="rgba(255,255,255,0.22)" strokeWidth="0.7" strokeDasharray="4 3" strokeDashoffset="50" style={{ animation: 'draw 0.18s ease forwards 2.14s' }} />

        <path d="M 270 250 L 300 250" stroke="rgba(255,255,255,0.38)" strokeWidth="1.2" strokeDasharray="35" strokeDashoffset="35" style={{ animation: 'draw 0.08s ease forwards 2.2s' }} />
        <path d="M 270 250 A 30 30 0 0 1 270 220" stroke="rgba(255,255,255,0.22)" strokeWidth="0.7" strokeDasharray="4 3" strokeDashoffset="50" style={{ animation: 'draw 0.18s ease forwards 2.24s' }} />

        <path d="M 420 148 L 450 148" stroke="rgba(255,255,255,0.38)" strokeWidth="1.2" strokeDasharray="35" strokeDashoffset="35" style={{ animation: 'draw 0.08s ease forwards 2.3s' }} />
        <path d="M 420 148 A 30 30 0 0 0 420 118" stroke="rgba(255,255,255,0.22)" strokeWidth="0.7" strokeDasharray="4 3" strokeDashoffset="50" style={{ animation: 'draw 0.18s ease forwards 2.34s' }} />

        <path d="M 210 417 A 50 50 0 0 1 260 417" stroke="rgba(255,255,255,0.22)" strokeWidth="0.7" strokeDasharray="4 3" strokeDashoffset="80" style={{ animation: 'draw 0.25s ease forwards 2.4s' }} />

        {/* ── FURNITURE ───────────────────────────────────────── */}
        {/* Kitchen counter L */}
        <path d="M 22 22 L 22 140 L 60 140 L 60 22" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" strokeDasharray="320" strokeDashoffset="320" style={{ animation: 'draw 0.6s ease forwards 2.5s' }} />
        <path d="M 22 22 L 185 22 L 185 50 L 22 50" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" strokeDasharray="360" strokeDashoffset="360" style={{ animation: 'draw 0.6s ease forwards 2.55s' }} />
        <circle cx="35" cy="165" r="12" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeDasharray="80" strokeDashoffset="80" style={{ animation: 'draw 0.2s ease forwards 2.7s' }} />

        {/* Master bed */}
        <rect x="250" y="60" width="100" height="140" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" strokeDasharray="490" strokeDashoffset="490" style={{ animation: 'draw 0.9s ease forwards 2.6s' }} />
        <line x1="250" y1="90" x2="350" y2="90" stroke="rgba(255,255,255,0.14)" strokeWidth="0.6" strokeDasharray="105" strokeDashoffset="105" style={{ animation: 'draw 0.2s ease forwards 2.65s' }} />
        <ellipse cx="278" cy="75" rx="14" ry="10" stroke="rgba(255,255,255,0.14)" strokeWidth="0.7" strokeDasharray="80" strokeDashoffset="80" style={{ animation: 'draw 0.15s ease forwards 2.68s' }} />
        <ellipse cx="322" cy="75" rx="14" ry="10" stroke="rgba(255,255,255,0.14)" strokeWidth="0.7" strokeDasharray="80" strokeDashoffset="80" style={{ animation: 'draw 0.15s ease forwards 2.70s' }} />

        {/* Bed 2 */}
        <rect x="398" y="28" width="80" height="108" stroke="rgba(255,255,255,0.20)" strokeWidth="0.8" strokeDasharray="380" strokeDashoffset="380" style={{ animation: 'draw 0.7s ease forwards 2.65s' }} />
        <line x1="398" y1="52" x2="478" y2="52" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" strokeDasharray="85" strokeDashoffset="85" style={{ animation: 'draw 0.15s ease forwards 2.72s' }} />

        {/* Bathroom */}
        <ellipse cx="412" cy="200" rx="13" ry="17" stroke="rgba(255,255,255,0.20)" strokeWidth="0.8" strokeDasharray="100" strokeDashoffset="100" style={{ animation: 'draw 0.2s ease forwards 2.8s' }} />
        <rect x="393" y="175" width="26" height="13" rx="2" stroke="rgba(255,255,255,0.16)" strokeWidth="0.7" strokeDasharray="80" strokeDashoffset="80" style={{ animation: 'draw 0.15s ease forwards 2.82s' }} />
        <rect x="445" y="162" width="74" height="76" rx="4" stroke="rgba(255,255,255,0.20)" strokeWidth="0.8" strokeDasharray="310" strokeDashoffset="310" style={{ animation: 'draw 0.55s ease forwards 2.85s' }} />
        <ellipse cx="482" cy="200" rx="26" ry="28" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" strokeDasharray="180" strokeDashoffset="180" style={{ animation: 'draw 0.3s ease forwards 2.90s' }} />

        {/* Sofa + coffee table */}
        <rect x="80"  y="330" width="160" height="60" rx="3" stroke="rgba(255,255,255,0.20)" strokeWidth="0.8" strokeDasharray="460" strokeDashoffset="460" style={{ animation: 'draw 0.8s ease forwards 2.7s' }} />
        <line x1="80" y1="350" x2="240" y2="350" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" strokeDasharray="165" strokeDashoffset="165" style={{ animation: 'draw 0.3s ease forwards 2.75s' }} />
        <rect x="110" y="300" width="100" height="24" rx="2" stroke="rgba(255,255,255,0.16)" strokeWidth="0.7" strokeDasharray="255" strokeDashoffset="255" style={{ animation: 'draw 0.45s ease forwards 2.78s' }} />

        {/* ── DIMENSION LINES ─────────────────────────────────── */}
        <line x1="6"   y1="-14" x2="536" y2="-14" stroke="rgba(255,255,255,0.20)" strokeWidth="0.6" strokeDasharray="560" strokeDashoffset="560" style={{ animation: 'draw 0.9s ease forwards 3.0s' }} />
        <line x1="6"   y1="-18" x2="6"   y2="-10" stroke="rgba(255,255,255,0.20)" strokeWidth="0.6" strokeDasharray="10" strokeDashoffset="10" style={{ animation: 'draw 0.05s ease forwards 3.0s' }} />
        <line x1="536" y1="-18" x2="536" y2="-10" stroke="rgba(255,255,255,0.20)" strokeWidth="0.6" strokeDasharray="10" strokeDashoffset="10" style={{ animation: 'draw 0.05s ease forwards 3.05s' }} />

        <line x1="-14" y1="255" x2="-14" y2="417" stroke="rgba(255,255,255,0.16)" strokeWidth="0.6" strokeDasharray="180" strokeDashoffset="180" style={{ animation: 'draw 0.3s ease forwards 3.1s' }} />
        <line x1="-18" y1="255" x2="-10" y2="255" stroke="rgba(255,255,255,0.16)" strokeWidth="0.6" strokeDasharray="10" strokeDashoffset="10" style={{ animation: 'draw 0.05s ease forwards 3.1s' }} />
        <line x1="-18" y1="417" x2="-10" y2="417" stroke="rgba(255,255,255,0.16)" strokeWidth="0.6" strokeDasharray="10" strokeDashoffset="10" style={{ animation: 'draw 0.05s ease forwards 3.13s' }} />

        {/* Dim text */}
        <text x="271" y="-19" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.30)" fontFamily="monospace" style={{ opacity: 0, animation: 'fadeIn 0.4s ease forwards 3.2s' }}>52&apos;-0&quot;</text>
        <text x="-22" y="340" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.26)" fontFamily="monospace" transform="rotate(-90,-22,340)" style={{ opacity: 0, animation: 'fadeIn 0.4s ease forwards 3.25s' }}>16&apos;-6&quot;</text>

        {/* ── ROOM LABELS ─────────────────────────────────────── */}
        <text x="98"  y="136" textAnchor="middle" fontSize="9"  fontWeight="500" fill="rgba(255,255,255,0.50)" fontFamily="monospace" letterSpacing="1.5" style={{ opacity: 0, animation: 'fadeIn 0.5s ease forwards 3.3s' }}>KITCHEN</text>
        <text x="98"  y="150" textAnchor="middle" fontSize="7"  fill="rgba(255,255,255,0.25)" fontFamily="monospace" style={{ opacity: 0, animation: 'fadeIn 0.5s ease forwards 3.32s' }}>148 sq ft</text>

        <text x="288" y="145" textAnchor="middle" fontSize="9"  fontWeight="500" fill="rgba(255,255,255,0.50)" fontFamily="monospace" letterSpacing="1.5" style={{ opacity: 0, animation: 'fadeIn 0.5s ease forwards 3.38s' }}>MASTER BED</text>
        <text x="288" y="159" textAnchor="middle" fontSize="7"  fill="rgba(255,255,255,0.25)" fontFamily="monospace" style={{ opacity: 0, animation: 'fadeIn 0.5s ease forwards 3.40s' }}>248 sq ft</text>

        <text x="432" y="88"  textAnchor="middle" fontSize="8.5" fontWeight="500" fill="rgba(255,255,255,0.50)" fontFamily="monospace" letterSpacing="1" style={{ opacity: 0, animation: 'fadeIn 0.5s ease forwards 3.44s' }}>BEDROOM 2</text>
        <text x="432" y="102" textAnchor="middle" fontSize="7"  fill="rgba(255,255,255,0.25)" fontFamily="monospace" style={{ opacity: 0, animation: 'fadeIn 0.5s ease forwards 3.46s' }}>130 sq ft</text>

        <text x="452" y="195" textAnchor="middle" fontSize="8"  fontWeight="500" fill="rgba(255,255,255,0.45)" fontFamily="monospace" letterSpacing="0.5" style={{ opacity: 0, animation: 'fadeIn 0.5s ease forwards 3.50s' }}>BATH</text>

        <text x="270" y="345" textAnchor="middle" fontSize="10" fontWeight="500" fill="rgba(255,255,255,0.52)" fontFamily="monospace" letterSpacing="2" style={{ opacity: 0, animation: 'fadeIn 0.5s ease forwards 3.56s' }}>LIVING ROOM</text>
        <text x="270" y="360" textAnchor="middle" fontSize="7"  fill="rgba(255,255,255,0.25)" fontFamily="monospace" style={{ opacity: 0, animation: 'fadeIn 0.5s ease forwards 3.58s' }}>598 sq ft</text>

        {/* ── NORTH ARROW ─────────────────────────────────────── */}
        <text x="508" y="388" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.28)" fontFamily="monospace" style={{ opacity: 0, animation: 'fadeIn 0.4s ease forwards 3.6s' }}>N</text>
        <line x1="508" y1="393" x2="508" y2="407" stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" strokeDasharray="18" strokeDashoffset="18" style={{ animation: 'draw 0.08s ease forwards 3.62s' }} />
        <path d="M 504 404 L 508 393 L 512 404" stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" fill="rgba(255,255,255,0.2)" style={{ opacity: 0, animation: 'fadeIn 0.15s ease forwards 3.65s' }} />

        {/* ── TITLE BLOCK ─────────────────────────────────────── */}
        <line x1="120" y1="438" x2="420" y2="438" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" strokeDasharray="310" strokeDashoffset="310" style={{ animation: 'draw 0.5s ease forwards 3.7s' }} />
        <text x="270" y="432" textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.20)" fontFamily="monospace" letterSpacing="1" style={{ opacity: 0, animation: 'fadeIn 0.4s ease forwards 3.72s' }}>FLOOR PLAN — MAIN LEVEL · SCALE 1/4&quot; = 1&apos;-0&quot;</text>
      </svg>

      {/* Floating estimate card */}
      <div
        className="absolute bottom-10 right-0 lg:right-2 bg-[#0f1e3d]/80 backdrop-blur-sm border border-blue-400/20 rounded-xl px-4 py-3 shadow-2xl"
        style={{ opacity: 0, animation: 'fadeIn 0.6s ease forwards 3.9s' }}
      >
        <div className="flex items-center justify-between gap-6 text-xs text-white/50 mb-1">
          <span>4 rooms · 1,124 sq ft</span>
          <span className="text-white/30 text-[10px]">AI analysis</span>
        </div>
        <div className="text-base font-semibold text-white font-mono tracking-tight mb-1">
          $118,817 estimated
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/40">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-300" />
          </span>
          Analysis complete
        </div>
      </div>
    </div>
  );
}

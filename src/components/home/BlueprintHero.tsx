export function BlueprintHero() {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="absolute -inset-6 bg-blue-500/10 rounded-[32px] blur-3xl" aria-hidden="true" />
      <div className="relative rounded-2xl border border-blue-500/20 bg-[#0a1628] p-4 sm:p-6 shadow-2xl overflow-hidden">
        <div className="relative rounded-2xl border border-blue-500/20 bg-[#0a1628]">
          <svg viewBox="0 0 720 460" className="w-full h-auto block rounded-2xl">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(37, 99, 235, 0.06)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="720" height="460" fill="#0a1628" />
            <rect width="720" height="460" fill="url(#grid)" />

            {/* Living Room */}
            <rect x="60" y="80" width="310" height="200" fill="rgba(37, 99, 235, 0.08)" stroke="rgba(37, 99, 235, 0.5)" strokeWidth="1.5" />
            <text x="90" y="125" fontSize="12" fill="rgba(255,255,255,0.7)" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace">Living Room</text>
            <text x="90" y="143" fontSize="10" fill="rgba(255,255,255,0.5)" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace">~300 sqft</text>

            {/* Kitchen */}
            <rect x="410" y="80" width="220" height="110" fill="rgba(37, 99, 235, 0.08)" stroke="rgba(37, 99, 235, 0.5)" strokeWidth="1.5" />
            <text x="435" y="125" fontSize="12" fill="rgba(255,255,255,0.7)" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace">Kitchen</text>
            <text x="435" y="143" fontSize="10" fill="rgba(255,255,255,0.5)" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace">~100 sqft</text>

            {/* Bedroom 1 */}
            <rect x="60" y="300" width="240" height="120" fill="rgba(37, 99, 235, 0.08)" stroke="rgba(37, 99, 235, 0.5)" strokeWidth="1.5" />
            <text x="90" y="345" fontSize="12" fill="rgba(255,255,255,0.7)" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace">Bedroom 1</text>
            <text x="90" y="363" fontSize="10" fill="rgba(255,255,255,0.5)" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace">~180 sqft</text>

            {/* Bedroom 2 */}
            <rect x="330" y="300" width="240" height="120" fill="rgba(37, 99, 235, 0.08)" stroke="rgba(37, 99, 235, 0.5)" strokeWidth="1.5" />
            <text x="360" y="345" fontSize="12" fill="rgba(255,255,255,0.7)" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace">Bedroom 2</text>
            <text x="360" y="363" fontSize="10" fill="rgba(255,255,255,0.5)" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace">~144 sqft</text>

            {/* Garage */}
            <rect x="60" y="20" width="310" height="45" fill="rgba(37, 99, 235, 0.08)" stroke="rgba(37, 99, 235, 0.5)" strokeWidth="1.5" />
            <text x="90" y="50" fontSize="12" fill="rgba(255,255,255,0.7)" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace">Garage</text>
            <text x="90" y="66" fontSize="10" fill="rgba(255,255,255,0.5)" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace">~400 sqft</text>

            {/* Blueprint corner marks */}
            <path d="M20 20 L60 20 M20 20 L20 60" stroke="rgba(37, 99, 235, 0.5)" strokeWidth="1.5" />
            <path d="M700 20 L660 20 M700 20 L700 60" stroke="rgba(37, 99, 235, 0.5)" strokeWidth="1.5" />
            <path d="M20 440 L60 440 M20 440 L20 400" stroke="rgba(37, 99, 235, 0.5)" strokeWidth="1.5" />
            <path d="M700 440 L660 440 M700 440 L700 400" stroke="rgba(37, 99, 235, 0.5)" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Floating results card */}
        <div className="absolute -bottom-6 right-6 sm:right-10 bg-[#111827] border border-[rgba(37,99,235,0.3)] rounded-xl px-4 py-3 shadow-xl">
          <div className="flex items-center justify-between text-xs text-white/60 mb-2">
            <span>5 rooms detected</span>
            <span className="text-white/40">1,124 sq ft</span>
          </div>
          <div className="text-lg font-semibold text-white font-mono mb-2">$118,817 estimated</div>
          <div className="flex items-center gap-2 text-[11px] text-white/50">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
            </span>
            Analysis complete
          </div>
        </div>
      </div>
    </div>
  );
}

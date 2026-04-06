export function BlueprintHero() {
  return (
    <div className="relative w-full">
      {/* Outer glow */}
      <div className="absolute -inset-4 bg-blue-500/10 rounded-[28px] blur-2xl" aria-hidden="true" />

      {/* Blueprint container */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-blue-400/20">
        {/* AI-generated blueprint image */}
        <img
          src="/blueprint.png"
          alt="Construction floor plan blueprint"
          className="w-full h-auto block"
        />

        {/* Subtle grid overlay on top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Floating result card */}
        <div className="absolute bottom-4 right-4 bg-[#0f1e3d]/90 backdrop-blur-sm border border-blue-400/30 rounded-xl px-4 py-3 shadow-xl">
          <div className="flex items-center justify-between gap-6 text-xs text-white/60 mb-1.5">
            <span>4 rooms detected</span>
            <span className="text-white/40">1,124 sq ft</span>
          </div>
          <div className="text-base font-semibold text-white font-mono mb-1.5">
            $118,817 estimated
          </div>
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

import { Link } from 'react-router-dom';
import { TakeoffLogo } from '@/components/ui/TakeoffLogo';
import { ArrowRight, Upload, Cpu, FileSpreadsheet, CheckCircle, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlueprintHero } from '@/components/home/BlueprintHero';

/* ─── Steps ─────────────────────────────────────────────── */
const STEPS = [
  {
    icon: Upload,
    title: 'Upload Blueprint',
    description: 'Drag and drop your floor plan — PNG, JPG, PDF, or CAD exports.',
  },
  {
    icon: Cpu,
    title: 'AI Analyzes',
    description: 'GPT-4 Vision detects rooms, dimensions, and calculates square footage.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Get Estimates',
    description: 'Material quantities, labor costs, and tiered pricing — instantly.',
  },
];

const FEATURES = [
  {
    icon: Zap,
    title: 'GPT-4 Vision Powered',
    description: 'State-of-the-art AI ensures accurate room detection and measurement.',
  },
  {
    icon: Target,
    title: 'Benchmark-Aligned Estimates',
    description: 'Directional estimates aligned to industry benchmarks for structural, exterior, and interior scope — delivered in under 60 seconds.',
  },
  {
    icon: CheckCircle,
    title: 'No Account Needed',
    description: 'Upload and analyze immediately. Sign up later if you want to save results.',
  },
];

/* ─── Home Page ─────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0d14] text-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 w-full bg-[#0a0d14]/90 backdrop-blur-md border-b border-white/5">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <TakeoffLogo size={36} />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors">
                Takeoff.ai
              </span>
              <span className="rounded-full border border-blue-400/20 bg-blue-500/8 px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-blue-400/90" style={{fontVariantCaps: 'small-caps', letterSpacing: '0.12em'}}>
                BETA
              </span>
            </div>
          </Link>
          <nav className="flex items-center gap-2">
            <Link to="/pricing">
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/5">
                Pricing
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/5">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white border-0">
                Sign up
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Blueprint grid background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid-sm" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />
              </pattern>
              <pattern id="hero-grid-lg" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid-sm)" />
            <rect width="100%" height="100%" fill="url(#hero-grid-lg)" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0d14]/50 to-[#0a0d14]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-600/6 rounded-full blur-[140px]" />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-xs text-blue-300 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                AI-powered construction estimating
              </div>
              <h1
                className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                style={{
                  background: 'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.72) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.03em',
                }}
              >
                Accurate construction estimates in minutes
              </h1>
              <p className="text-base text-white/50 mb-3 leading-relaxed">
                Upload a blueprint. Our AI extracts every room, calculates square footage, and returns detailed material and labor costs — instantly.
              </p>
              <p className="text-xs text-white/28 mb-8 leading-relaxed">
                Beta: estimates cover structural shell, exterior finishes, and interior finishes. MEP, site work, permits, and land excluded.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/analyze">
                  <Button size="lg" className="w-full sm:w-auto gap-2 text-base bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg shadow-blue-600/20">
                    Try it free
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base border-white/10 text-white/70 hover:text-white hover:bg-white/5 hover:border-white/20">
                    See how it works
                  </Button>
                </a>
              </div>
            </div>

            {/* Right — blueprint floor plan */}
            <BlueprintHero />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-28 border-t border-white/5">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              How it works
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              Three steps. No manual measuring. No spreadsheet wrangling.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STEPS.map((step, index) => (
              <div key={index} className="relative text-center group">
                {index < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-white/5" />
                )}
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all">
                    <step.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold shadow-md">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {FEATURES.map((feature, index) => (
              <div key={index} className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center hover:border-blue-500/20 hover:bg-blue-500/5 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/40">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* How we estimate + validation */}
      <section className="py-20 md:py-24 border-t border-white/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">How we estimate</h2>
              <p className="text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
                Takeoff.ai combines AI blueprint analysis with construction cost databases to produce estimates across four phases.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
              {[
                { phase: 'Structural Shell', items: 'Framing, foundation, roofing', color: 'text-sky-400' },
                { phase: 'Exterior Finishes', items: 'Windows, doors, siding, trim', color: 'text-emerald-400' },
                { phase: 'Interior Finishes', items: 'Flooring, paint, drywall, cabinetry', color: 'text-violet-400' },
                { phase: 'Not included', items: 'MEP, site work, permits, land', color: 'text-white/30' },
              ].map(({ phase, items, color }) => (
                <div key={phase} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className={`text-xs font-semibold mb-1.5 ${color}`}>{phase}</p>
                  <p className="text-[11px] text-white/40 leading-relaxed">{items}</p>
                </div>
              ))}
            </div>

            {/* Validation callout */}
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 px-6 py-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-white mb-1">Validated against real blueprints</p>
                <p className="text-xs text-white/40 leading-relaxed">
                  A 1,124 sq ft residential permit blueprint estimated at <span className="text-white/70 font-medium">$118,817</span> — within the contractor reference range of $78k–$162k for this home size and scope.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2 text-xs text-blue-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Source: NAHB 2024 + HomeAdvisor
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to speed up your estimates?
            </h2>
            <p className="text-white/40 mb-8">
              No signup required. Upload a blueprint and see results in under a minute.
            </p>
            <Link to="/analyze">
              <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg shadow-blue-600/20">
                Get started free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="container text-center text-sm text-white/20">
          © {new Date().getFullYear()} Takeoff.ai — AI-powered construction estimating
        </div>
      </footer>
    </div>
  );
}

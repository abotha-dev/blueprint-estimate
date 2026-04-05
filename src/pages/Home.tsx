import { Link } from 'react-router-dom';
import { ArrowRight, Upload, Cpu, FileSpreadsheet, CheckCircle, Zap, Target, Clock, DollarSign, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ─── Animated Estimator Preview ────────────────────────── */
function EstimatorPreview() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Glow behind the preview */}
      <div className="absolute -inset-4 bg-indigo-500/10 rounded-3xl blur-3xl" aria-hidden="true" />
      
      <div className="relative rounded-card border border-[rgba(255,255,255,0.08)] bg-[#18181B] shadow-card overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.05)] bg-[#0A0A0A]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 rounded-btn bg-[rgba(255,255,255,0.05)] text-xs text-[rgba(255,255,255,0.3)] font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>
              takeoff.ai/analyze
            </div>
          </div>
        </div>

        {/* App content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Upload area */}
          <div className="animate-preview-fade-1 rounded-card border-2 border-dashed border-indigo-500/30 bg-indigo-500/5 p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-card bg-indigo-500/10 mb-3">
              <Upload className="w-6 h-6 text-indigo-400" strokeWidth={1.5} />
            </div>
            <p className="text-sm text-[rgba(255,255,255,0.5)]">floor-plan-office-3rd.png uploaded</p>
            <div className="mt-3 h-1.5 w-full max-w-xs mx-auto rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-progress-fill" />
            </div>
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Rooms Detected', value: '12', icon: Ruler, delay: '1' },
              { label: 'Total Sq. Ft.', value: '2,840', icon: Target, delay: '2' },
              { label: 'Est. Time', value: '47s', icon: Clock, delay: '3' },
              { label: 'Material Cost', value: '$18,420', icon: DollarSign, delay: '4' },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`animate-preview-fade-${stat.delay} rounded-card border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] p-4`}
              >
                <stat.icon className="w-4 h-4 text-indigo-400 mb-2" strokeWidth={1.5} />
                <div className="text-lg font-bold text-[rgba(255,255,255,0.9)] font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>{stat.value}</div>
                <div className="text-xs text-[rgba(255,255,255,0.4)] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Cost breakdown row */}
          <div className="animate-preview-fade-5 rounded-card border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] overflow-hidden">
            <div className="px-4 py-2 border-b border-[rgba(255,255,255,0.05)] flex items-center justify-between">
              <span className="text-xs font-medium text-[rgba(255,255,255,0.5)]">Room Breakdown</span>
              <span className="text-xs text-indigo-400 font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>12 rooms</span>
            </div>
            <div className="divide-y divide-[rgba(255,255,255,0.05)]">
              {[
                { room: 'Open Office', sqft: '680 sq ft', cost: '$4,210' },
                { room: 'Conference Room A', sqft: '320 sq ft', cost: '$2,860' },
                { room: 'Kitchen / Break Room', sqft: '240 sq ft', cost: '$3,150' },
              ].map((row) => (
                <div key={row.room} className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-sm text-[rgba(255,255,255,0.7)]">{row.room}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-[rgba(255,255,255,0.3)] font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>{row.sqft}</span>
                    <span className="text-sm font-semibold text-[rgba(255,255,255,0.9)] font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>{row.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    title: '~10% Accuracy',
    description: 'Results comparable to manual takeoffs, delivered in under 60 seconds.',
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
    <div className="min-h-screen bg-[#0A0A0A] text-[rgba(255,255,255,0.9)]">
      {/* Nav */}
      <header className="sticky top-0 z-50 w-full bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[rgba(255,255,255,0.08)]">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-btn bg-indigo-600 text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18" />
                <path d="M5 21V7l7-4 7 4v14" />
                <path d="M9 21v-6h6v6" />
              </svg>
            </div>
            <span className="font-semibold text-lg text-[rgba(255,255,255,0.9)] group-hover:text-indigo-400 transition-[color] duration-150 ease-out">
              Takeoff.ai
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link to="/pricing">
              <Button variant="ghost" size="sm">
                Pricing
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white border-0">
                Sign up
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero — 96px vertical padding */}
      <section className="relative py-24 md:py-[96px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/5 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/8 rounded-full blur-[120px]" aria-hidden="true" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-badge border border-indigo-500/20 bg-indigo-500/5 text-xs text-indigo-300 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              AI-powered construction estimating
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.65) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.03em',
              }}
            >
              Accurate construction estimates in minutes
            </h1>
            <p className="text-lg text-[rgba(255,255,255,0.5)] max-w-xl mx-auto mb-10 leading-relaxed">
              Upload a blueprint. Our AI extracts every room, calculates square footage, and returns detailed material and labor costs — instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/analyze">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-base bg-indigo-600 hover:bg-indigo-500 text-white border-0 shadow-lg shadow-indigo-600/20">
                  Estimate My Project
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
                  See how it works
                </Button>
              </a>
            </div>
          </div>

          <EstimatorPreview />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-24 border-t border-[rgba(255,255,255,0.08)]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[rgba(255,255,255,0.9)] mb-4" style={{ letterSpacing: '-0.03em' }}>
              How it works
            </h2>
            <p className="text-[rgba(255,255,255,0.4)] max-w-lg mx-auto leading-relaxed">
              Three steps. No manual measuring. No spreadsheet wrangling.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STEPS.map((step, index) => (
              <div key={index} className="relative text-center group">
                {index < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-[rgba(255,255,255,0.05)]" />
                )}
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 rounded-modal bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-[background-color,border-color] duration-150 ease-out">
                    <step.icon className="w-8 h-8 text-indigo-400" strokeWidth={1.5} />
                  </div>
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-card" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[rgba(255,255,255,0.9)] mb-2" style={{ letterSpacing: '-0.02em' }}>
                  {step.title}
                </h3>
                <p className="text-[rgba(255,255,255,0.4)] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-24 border-t border-[rgba(255,255,255,0.08)]">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {FEATURES.map((feature, index) => (
              <div key={index} className="rounded-card border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-6 text-center hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-[background-color,border-color] duration-150 ease-out">
                <div className="w-12 h-12 rounded-card bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-400" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-[rgba(255,255,255,0.9)] mb-2" style={{ letterSpacing: '-0.02em' }}>
                  {feature.title}
                </h3>
                <p className="text-sm text-[rgba(255,255,255,0.4)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA — repeat */}
      <section className="py-20 md:py-24 border-t border-[rgba(255,255,255,0.08)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[rgba(255,255,255,0.9)] mb-4" style={{ letterSpacing: '-0.03em' }}>
              Ready to speed up your estimates?
            </h2>
            <p className="text-[rgba(255,255,255,0.4)] mb-8 leading-relaxed">
              No signup required. Upload a blueprint and see results in under a minute.
            </p>
            <Link to="/analyze">
              <Button size="lg" className="gap-2 bg-indigo-600 hover:bg-indigo-500 text-white border-0 shadow-lg shadow-indigo-600/20">
                Estimate My Project
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[rgba(255,255,255,0.08)]">
        <div className="container text-center text-sm text-[rgba(255,255,255,0.2)]">
          © {new Date().getFullYear()} Takeoff.ai — AI-powered construction estimating
        </div>
      </footer>
    </div>
  );
}

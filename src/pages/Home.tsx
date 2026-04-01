import { Link } from 'react-router-dom';
import { ArrowRight, Upload, Cpu, FileSpreadsheet, CheckCircle, Zap, Target, Clock, DollarSign, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ─── Animated Estimator Preview ────────────────────────── */
function EstimatorPreview() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Glow behind the preview */}
      <div className="absolute -inset-4 bg-indigo-500/10 rounded-3xl blur-3xl" aria-hidden="true" />
      
      <div className="relative rounded-xl border border-white/10 bg-[#0f1219] shadow-2xl overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0a0d14]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 rounded-md bg-white/5 text-xs text-white/30 font-mono">
              takeoff.ai/analyze
            </div>
          </div>
        </div>

        {/* App content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Upload area - animated */}
          <div className="animate-preview-fade-1 rounded-xl border-2 border-dashed border-indigo-500/30 bg-indigo-500/5 p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 mb-3">
              <Upload className="w-6 h-6 text-indigo-400" />
            </div>
            <p className="text-sm text-white/60">floor-plan-office-3rd.png uploaded</p>
            <div className="mt-3 h-1.5 w-full max-w-xs mx-auto rounded-full bg-white/5 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-progress-fill" />
            </div>
          </div>

          {/* Results grid - animated stagger */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Rooms Detected', value: '12', icon: Ruler, delay: '1' },
              { label: 'Total Sq. Ft.', value: '2,840', icon: Target, delay: '2' },
              { label: 'Est. Time', value: '47s', icon: Clock, delay: '3' },
              { label: 'Material Cost', value: '$18,420', icon: DollarSign, delay: '4' },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`animate-preview-fade-${stat.delay} rounded-lg border border-white/5 bg-white/[0.02] p-4`}
              >
                <stat.icon className="w-4 h-4 text-indigo-400 mb-2" />
                <div className="text-lg font-bold text-white font-mono">{stat.value}</div>
                <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Cost breakdown row - animated */}
          <div className="animate-preview-fade-5 rounded-lg border border-white/5 bg-white/[0.02] overflow-hidden">
            <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-medium text-white/60">Room Breakdown</span>
              <span className="text-xs text-indigo-400 font-mono">12 rooms</span>
            </div>
            <div className="divide-y divide-white/5">
              {[
                { room: 'Open Office', sqft: '680 sq ft', cost: '$4,210' },
                { room: 'Conference Room A', sqft: '320 sq ft', cost: '$2,860' },
                { room: 'Kitchen / Break Room', sqft: '240 sq ft', cost: '$3,150' },
              ].map((row) => (
                <div key={row.room} className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-sm text-white/70">{row.room}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-white/30 font-mono">{row.sqft}</span>
                    <span className="text-sm font-medium text-white font-mono">{row.cost}</span>
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
    <div className="min-h-screen bg-[#0a0d14] text-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 w-full bg-[#0a0d14]/90 backdrop-blur-md border-b border-white/5">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-600 text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18" />
                <path d="M5 21V7l7-4 7 4v14" />
                <path d="M9 21v-6h6v6" />
              </svg>
            </div>
            <span className="font-semibold text-lg text-white group-hover:text-indigo-400 transition-colors">
              Takeoff.ai
            </span>
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
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white border-0">
                Sign up
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/5 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/8 rounded-full blur-[120px]" aria-hidden="true" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-xs text-indigo-300 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              AI-powered construction estimating
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{
                background: 'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.03em',
              }}
            >
              Accurate construction estimates in minutes
            </h1>
            <p className="text-lg text-white/50 max-w-xl mx-auto mb-10">
              Upload a blueprint. Our AI extracts every room, calculates square footage, and returns detailed material and labor costs — instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/analyze">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-base bg-indigo-600 hover:bg-indigo-500 text-white border-0 shadow-lg shadow-indigo-600/20">
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

          {/* Animated product preview */}
          <EstimatorPreview />
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
                  <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all">
                    <step.icon className="w-8 h-8 text-indigo-400" />
                  </div>
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-md">
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
              <div key={index} className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-all">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-400" />
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
              <Button size="lg" className="gap-2 bg-indigo-600 hover:bg-indigo-500 text-white border-0 shadow-lg shadow-indigo-600/20">
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

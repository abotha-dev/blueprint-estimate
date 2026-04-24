import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Upload,
  Cpu,
  LayoutGrid,
  Ruler,
  DollarSign,
  FileText,
  Home as HomeIcon,
  Hammer,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TakeoffLogo } from '@/components/ui/TakeoffLogo';
import { HouseIllustration } from '@/components/home/HouseIllustration';

const STEPS = [
  {
    icon: Upload,
    title: 'Upload your floor plan',
    description: 'PDF or image. Drag and drop, done.',
  },
  {
    icon: Cpu,
    title: 'We parse the rooms and run the numbers',
    description: 'AI reads your plan, identifies every room, and calculates material quantities.',
  },
  {
    icon: DollarSign,
    title: 'Get your low / mid / high cost range',
    description: 'Budget, Standard, and Premium estimates. Ready to share with your client or use to make a go/no-go call.',
  },
];

const SEGMENTS = [
  {
    icon: HomeIcon,
    heading: 'ADU Builders',
    body: "The engine's assumptions (slab-on-grade, gable roof, single-story) match the way most ADUs are actually built. Get a fast feasibility range to share with homeowners before you commit to a detailed estimate.",
    bestFit: true,
  },
  {
    icon: Hammer,
    heading: 'Residential Remodelers',
    body: "Know if a client's budget is in the right neighborhood before you invest time in a full takeoff. Upload their plan, see the range, make the call.",
  },
  {
    icon: Building2,
    heading: 'Design-Build Firms',
    body: "Anchor the budget conversation early. Show clients Budget, Standard, and Premium ranges before design is finalized, so everyone's working from the same ballpark.",
  },
];

const DELIVERABLES = [
  {
    icon: LayoutGrid,
    title: 'Room-by-room breakdown',
    description: 'Every room identified and measured from your floor plan.',
  },
  {
    icon: Ruler,
    title: 'Material quantities',
    description: 'Foundation, structural, roofing, and exterior materials, calculated from the parsed layout.',
  },
  {
    icon: DollarSign,
    title: 'Low / Mid / High cost ranges',
    description: 'Three tiers so you can frame the conversation around Budget, Standard, or Premium scope.',
  },
  {
    icon: FileText,
    title: 'PDF report',
    description: 'A clean, downloadable report you can share with clients or keep for your records.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ─── Nav (dark) ──────────────────────────────────────────── */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <TakeoffLogo size={32} />
            <span className="font-semibold text-base tracking-tight">mytakeoff.ai</span>
          </Link>
          <nav className="flex items-center gap-1">
            <a href="#how-it-works" className="hidden sm:inline-flex">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/5">
                How It Works
              </Button>
            </a>
            <Link to="/pricing" className="hidden sm:inline-flex">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/5">
                Pricing
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/5">
                Login
              </Button>
            </Link>
            <Link to="/signup" className="ml-1">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold border-0">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* ─── Hero (dark slate) ───────────────────────────────────── */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {/* Subtle blueprint grid background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(251,191,36,0.5)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
          <div className="absolute top-1/3 -right-40 w-[600px] h-[500px] bg-amber-500/10 rounded-full blur-[140px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-14 items-center">
            {/* Copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-500/10 text-xs text-amber-300 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                For residential remodels & ADUs
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.05] tracking-tight mb-6">
                Instant ballpark estimates for residential remodels and ADUs.
              </h1>
              <p className="text-lg text-white/65 leading-relaxed mb-8 max-w-xl">
                Upload a floor plan. Get a cost range in 60 seconds. Know which leads are worth a real takeoff.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Link to="/analyze">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-2 text-base bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold border-0 shadow-lg shadow-amber-500/20"
                  >
                    Try It Free
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-base border-white/15 bg-transparent text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    See how it works
                  </Button>
                </a>
              </div>
              <p className="text-sm text-white/45">
                No credit card required. See your first estimate in under a minute.
              </p>
            </div>

            {/* Animated architectural house */}
            <div className="relative">
              <div className="rounded-2xl border border-amber-500/15 bg-slate-950/40 p-4 sm:p-6 backdrop-blur-sm">
                <HouseIllustration />
                {/* Floating estimate chip */}
                <div
                  className="house-anim-labels absolute -bottom-4 -right-4 sm:bottom-6 sm:right-6 rounded-lg border border-amber-400/30 bg-slate-950/90 px-4 py-3 shadow-xl shadow-black/40"
                  style={{ animationDelay: '4.3s' }}
                >
                  <div className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Estimated range</div>
                  <div className="text-xl font-bold text-amber-400 font-mono">$112K — $186K</div>
                  <div className="text-[11px] text-white/40 mt-0.5">1,240 sq ft · 5 rooms</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ───────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <div className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-3">How it works</div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              From floor plan to cost range in three steps.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white p-7 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">0{i + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Value Prop (warm gray) ─────────────────────────────── */}
      <section className="py-20 md:py-28 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-3">The filter you run first</div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">
              Stop spending hours on leads that were never going to close.
            </h2>
            <div className="space-y-5 text-slate-700 text-lg leading-relaxed">
              <p>
                You know the drill. A client sends over a floor plan and asks "how much?" You spend half a day on a takeoff, send a number, and never hear back. Their budget was half your estimate.
              </p>
              <p>
                mytakeoff.ai gives you the 60-second sanity check. Upload the plan, get a ballpark range, and decide if this lead is worth your time. Before the site visit, before the spreadsheet, before you're three hours deep in a takeoff for a job that was never real.
              </p>
              <p className="text-slate-900 font-medium border-l-2 border-amber-500 pl-5">
                Your real takeoff is still your real takeoff. This is the filter you run first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Who It's For ───────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <div className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-3">Who it's for</div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Built for contractors who value their time.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {SEGMENTS.map((seg, i) => (
              <div
                key={i}
                className="relative rounded-xl border border-slate-200 bg-stone-50 p-7"
              >
                {seg.bestFit && (
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-950">
                    Best Fit
                  </span>
                )}
                <div className="w-11 h-11 rounded-lg bg-slate-900 flex items-center justify-center mb-5">
                  <seg.icon className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {seg.heading}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{seg.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What You Get ───────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <div className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-3">What you get</div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              What's in your estimate
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DELIVERABLES.map((d, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-6">
                <d.icon className="w-6 h-6 text-amber-600 mb-4" strokeWidth={1.75} />
                <h3 className="font-semibold text-slate-900 mb-2 text-base leading-snug">
                  {d.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Honesty Block ──────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto rounded-2xl border border-slate-200 bg-stone-50 p-8 md:p-12">
            <div className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-3">Straight talk</div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-6">
              What this is and what it isn't.
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                mytakeoff.ai gives you a ballpark, not a bid. Upload a floor plan, get a cost range, and decide if the project is worth your time.
              </p>
              <p>
                It works best on clean floor plans and single-story residential projects, especially ADUs. Cost estimates are ranges based on state-level pricing data. It's the quick filter before your real takeoff, not a replacement for one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA (dark slate) ────────────────────────────── */}
      <section className="relative bg-slate-900 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(251,191,36,0.5)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              See it for yourself.
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Upload a floor plan and get your first ballpark estimate. Free.
            </p>
            <Link to="/analyze">
              <Button
                size="lg"
                className="gap-2 text-base bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold border-0 shadow-lg shadow-amber-500/20"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer (dark slate) ────────────────────────────────── */}
      <footer className="bg-slate-950 text-white/60 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <TakeoffLogo size={28} />
                <span className="font-semibold text-white">mytakeoff.ai</span>
              </div>
              <p className="text-sm leading-relaxed">
                Instant ballpark estimates for residential remodels and ADUs.
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">Product</div>
              <ul className="space-y-2 text-sm">
                <li><a href="#how-it-works" className="hover:text-amber-400 transition-colors">How It Works</a></li>
                <li><Link to="/pricing" className="hover:text-amber-400 transition-colors">Pricing</Link></li>
                <li><Link to="/login" className="hover:text-amber-400 transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">Company</div>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">Legal</div>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-white/5 text-xs text-white/35">
            © {new Date().getFullYear()} mytakeoff.ai
          </div>
        </div>
      </footer>
    </div>
  );
}

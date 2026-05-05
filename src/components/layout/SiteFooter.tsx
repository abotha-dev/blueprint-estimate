import { Link } from 'react-router-dom';
import { TakeoffLogo } from '@/components/ui/TakeoffLogo';

export default function SiteFooter() {
  return (
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
            <div className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">
              Product
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#how-it-works" className="hover:text-amber-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-amber-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-amber-400 transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">
              Company
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">
              Legal
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 text-xs text-white/35">
          © {new Date().getFullYear()} mytakeoff.ai
        </div>
      </div>
    </footer>
  );
}

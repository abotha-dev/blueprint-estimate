import { Building2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.08)] bg-[#0A0A0A]">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-btn bg-indigo-600 text-white">
              <Building2 className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <span className="font-semibold text-[rgba(255,255,255,0.9)]">Takeoff.ai</span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-[rgba(255,255,255,0.5)]">
            <a href="#" className="hover:text-[rgba(255,255,255,0.9)] transition-[color] duration-150 ease-out">About</a>
            <a href="#" className="hover:text-[rgba(255,255,255,0.9)] transition-[color] duration-150 ease-out">Contact</a>
            <a href="#" className="hover:text-[rgba(255,255,255,0.9)] transition-[color] duration-150 ease-out">Privacy</a>
          </nav>

          <p className="text-sm text-[rgba(255,255,255,0.3)]">
            &copy; {new Date().getFullYear()} Takeoff.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

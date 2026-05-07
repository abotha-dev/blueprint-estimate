import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TakeoffLogo } from '@/components/ui/TakeoffLogo';
import { useAuthContext } from '@/contexts/AuthContext';

export default function SiteHeader() {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuthContext();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <TakeoffLogo size={32} />
          <span className="font-semibold text-base tracking-tight">mytakeoff.ai</span>
        </Link>
        <nav className="flex items-center gap-1">
          <a href="/#how-it-works" className="hidden sm:inline-flex">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/5"
            >
              How It Works
            </Button>
          </a>
          <Link to="/pricing" className="hidden sm:inline-flex">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/5"
            >
              Pricing
            </Button>
          </Link>
          {!loading &&
            (user ? (
              <>
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/70 hover:text-white hover:bg-white/5"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-white/70 hover:text-white hover:bg-white/5"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/70 hover:text-white hover:bg-white/5"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="ml-1">
                  <Button
                    size="sm"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold border-0"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            ))}
        </nav>
      </div>
    </header>
  );
}

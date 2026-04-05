import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuthContext();
  const isHome = location.pathname === '/';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[rgba(255,255,255,0.08)]">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-btn bg-indigo-600 text-white">
            <Building2 className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <span className="font-semibold text-lg text-[rgba(255,255,255,0.9)] group-hover:text-indigo-400 transition-[color] duration-150 ease-out">
            Takeoff.ai
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          {!isHome && (
            <Link to="/">
              <Button variant="ghost" size="sm">Home</Button>
            </Link>
          )}

          <Link to="/pricing">
            <Button variant="ghost" size="sm">Pricing</Button>
          </Link>

          {!loading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <User className="w-4 h-4" strokeWidth={1.5} />
                      <span className="hidden sm:inline">Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-[#27272A] border-[rgba(255,255,255,0.08)] rounded-card">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer text-[rgba(255,255,255,0.9)] focus:bg-[rgba(255,255,255,0.04)]">
                        <User className="w-4 h-4" strokeWidth={1.5} />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/analyze" className="flex items-center gap-2 cursor-pointer text-[rgba(255,255,255,0.9)] focus:bg-[rgba(255,255,255,0.04)]">
                        <Building2 className="w-4 h-4" strokeWidth={1.5} />
                        New Analysis
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.08)]" />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="flex items-center gap-2 cursor-pointer text-red-400 focus:text-red-400 focus:bg-[rgba(255,255,255,0.04)]"
                    >
                      <LogOut className="w-4 h-4" strokeWidth={1.5} />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Log in</Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm">Sign up</Button>
                  </Link>
                </>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

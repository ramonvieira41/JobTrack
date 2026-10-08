import { useState } from 'react';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { Menu, X, Home as HomeIcon, Info } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { SettingsMenu } from '@/components/SettingsMenu';
import type { User } from '@/types';
import type { Theme } from '@/types';
import { cn } from '@/lib/utils';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  user: User | null;
  onLogout: () => void;
}

const navItems = [
  { label: 'Home', to: '/', icon: HomeIcon },
  { label: 'Sobre', to: '/sobre', icon: Info },
];

export function Header({ theme, onToggleTheme, user, onLogout }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (to: string) => location.pathname === to;

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link to="/">
              <Logo />
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.to)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-2 -mr-10">
            <SettingsMenu
              theme={theme}
              onToggleTheme={onToggleTheme}
              user={user}
              onLogout={onLogout}
              onNavigateLogin={() => navigate({ to: '/login' })}
            />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <SettingsMenu
              theme={theme}
              onToggleTheme={onToggleTheme}
              user={user}
              onLogout={onLogout}
              onNavigateLogin={() => navigate({ to: '/login' })}
            />
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 animate-slide-up">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.to)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

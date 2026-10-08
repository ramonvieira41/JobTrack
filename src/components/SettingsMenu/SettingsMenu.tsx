import { useEffect, useRef, useState } from 'react';
import { Settings, LogOut, User as UserIcon } from 'lucide-react';
import type { User } from '@/types';
import type { Theme } from '@/types';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

interface SettingsMenuProps {
  theme: Theme;
  onToggleTheme: () => void;
  user: User | null;
  onLogout: () => void;
  onNavigateLogin: () => void;
}

export function SettingsMenu({
  theme,
  onToggleTheme,
  user,
  onLogout,
  onNavigateLogin,
}: SettingsMenuProps) {
  const [open, setOpen] = useState(false);
  const [rotating, setRotating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  const handleButtonClick = () => {
    setRotating(true);
    setOpen((prev) => !prev);
    setTimeout(() => setRotating(false), 500);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={handleButtonClick}
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
          open && 'bg-gray-100 dark:bg-gray-800',
        )}
        aria-label="Configurações"
        aria-expanded={open}
      >
        <Settings
          className={cn(
            'h-6 w-6 transition-transform duration-500',
            rotating && 'rotate-180',
          )}
        />
      </button>
      {open && (
        <div className="absolute right-0 top-12 w-56 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg animate-scale-in py-2 z-50">
          <div className="px-3 pb-2 mb-1 border-b border-gray-200 dark:border-gray-700">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
          {user ? (
            <>
              <div className="px-3 py-2 flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                <UserIcon className="h-4 w-4 shrink-0" />
                <span className="truncate">{user.name}</span>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  setOpen(false);
                }}
                className="w-full px-3 py-2 flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                onNavigateLogin();
                setOpen(false);
              }}
              className="w-full px-3 py-2 flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <UserIcon className="h-4 w-4" />
              Fazer login
            </button>
          )}
        </div>
      )}
    </div>
  );
}

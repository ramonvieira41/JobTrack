import { Moon, Sun } from 'lucide-react';
import type { Theme } from '@/types';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark';
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Alternar tema"
    >
      <span className="flex items-center gap-2.5">
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        {isDark ? 'Tema escuro' : 'Tema claro'}
      </span>
      <div
        className={cn(
          'relative h-5 w-9 rounded-full transition-colors duration-200',
          isDark ? 'bg-primary-600' : 'bg-gray-300',
        )}
      >
        <div
          className={cn(
            'absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-200',
            isDark ? 'translate-x-4' : 'translate-x-0.5',
          )}
        />
      </div>
    </button>
  );
}

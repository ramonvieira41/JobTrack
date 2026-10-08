import { useCallback, useEffect, useState } from 'react';
import type { Theme } from '@/types';
import { STORAGE_KEYS } from '@/constants';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  try {
    const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
  } catch {
    // Fall back to the system preference when storage is unavailable.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const applyTheme = useCallback((newTheme: Theme) => {
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    setTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, applyTheme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      let storedTheme: string | null = null;
      try {
        storedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      } catch {
        // Follow the system preference when storage is unavailable.
      }
      if (storedTheme === 'light' || storedTheme === 'dark') return;

      const systemTheme = e.matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
      setTheme(systemTheme);
    };
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  return { theme, toggleTheme, setTheme: applyTheme };
}

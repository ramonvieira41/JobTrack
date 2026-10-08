import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral';

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
  secondary: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-300',
  accent: 'bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300',
  success: 'bg-success-100 text-success-700 dark:bg-success-900/40 dark:text-success-300',
  warning: 'bg-warning-100 text-warning-700 dark:bg-warning-900/40 dark:text-warning-300',
  error: 'bg-error-100 text-error-700 dark:bg-error-900/40 dark:text-error-300',
  neutral: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
};

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

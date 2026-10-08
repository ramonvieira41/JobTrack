import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'danger-outline';
type Size = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm',
  secondary:
    'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800 shadow-sm',
  outline:
    'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700',
  ghost:
    'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
  danger:
    'bg-error-600 text-white hover:bg-error-700 active:bg-error-700 shadow-sm',
  'danger-outline':
    'border border-error-500 text-error-600 dark:text-error-500 hover:bg-error-50 dark:hover:bg-error-950/40',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm rounded-lg gap-1.5',
  md: 'h-10 px-4 text-sm rounded-lg gap-2',
  lg: 'h-12 px-6 text-base rounded-lg gap-2',
  icon: 'h-10 w-10 rounded-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed select-none',
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

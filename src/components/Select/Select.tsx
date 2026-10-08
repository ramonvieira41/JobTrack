import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, id, children, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={cn(
              'h-10 w-full appearance-none rounded-lg border bg-white dark:bg-gray-800 pl-3 pr-9 text-sm text-gray-900 dark:text-gray-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0',
              error
                ? 'border-error-400 focus:ring-error-400 dark:border-error-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500/30',
              className,
            )}
            aria-invalid={!!error}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
        {error && (
          <p className="text-xs text-error-600 dark:text-error-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';

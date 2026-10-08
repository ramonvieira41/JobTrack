import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-lg border bg-white dark:bg-gray-800 p-3 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none',
            error
              ? 'border-error-400 focus:ring-error-400 dark:border-error-500'
              : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500/30',
            className,
          )}
          aria-invalid={!!error}
          rows={4}
          {...props}
        />
        {error && (
          <p className="text-xs text-error-600 dark:text-error-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

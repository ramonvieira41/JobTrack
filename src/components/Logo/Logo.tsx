import { Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-800 shadow-sm">
        <Briefcase className="h-5 w-5 text-white" />
      </div>
      {showText && (
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Job<span className="text-primary-600 dark:text-primary-400">Track</span>
        </span>
      )}
    </div>
  );
}

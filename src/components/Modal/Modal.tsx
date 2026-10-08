import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  ariaLabel?: string;
}

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export function Modal({ open, onClose, title, children, size = 'md', ariaLabel }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-label={title ? undefined : ariaLabel ?? 'Diálogo'}
    >
      <div
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-10 w-full bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 animate-slide-up flex flex-col max-h-[92vh] sm:max-h-[88vh]',
          sizes[size],
        )}
      >
        {title && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
            <h2 id="modal-title" className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        <div className="overflow-y-auto scrollbar-thin px-5 py-4">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

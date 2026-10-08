import { AlertTriangle } from 'lucide-react';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirmar',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onCancel} size="sm" ariaLabel={title}>
      <div className="text-center py-2">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-error-100 dark:bg-error-900/40 mb-4">
          <AlertTriangle className="h-6 w-6 text-error-600 dark:text-error-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

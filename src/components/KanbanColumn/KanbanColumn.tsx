import { useState } from 'react';
import type { Application, ApplicationStatus } from '@/types';
import { STATUS_COLUMNS } from '@/constants';
import { ApplicationCard } from '@/components/ApplicationCard';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  status: ApplicationStatus;
  applications: Application[];
  onView: (app: Application) => void;
  onEdit: (app: Application) => void;
  onDelete: (app: Application) => void;
  onDrop: (status: ApplicationStatus) => void;
  onDragStart: (e: React.DragEvent, app: Application) => void;
  onDragEnd: () => void;
  draggingId: string | null;
}

export function KanbanColumn({
  status,
  applications,
  onView,
  onEdit,
  onDelete,
  onDrop,
  onDragStart,
  onDragEnd,
  draggingId,
}: KanbanColumnProps) {
  const [isOver, setIsOver] = useState(false);
  const column = STATUS_COLUMNS.find((c) => c.id === status)!;

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsOver(false);
        onDrop(status);
      }}
      className={cn(
        'flex flex-col rounded-xl bg-gray-100/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 transition-colors',
        isOver && 'border-primary-400 dark:border-primary-600 bg-primary-50/50 dark:bg-primary-950/30',
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className={cn('h-2.5 w-2.5 rounded-full', column.dotColor)} />
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">{column.label}</h2>
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-800 rounded-full px-2 py-0.5">
            {applications.length}
          </span>
        </div>
      </div>
      <p className="px-4 pb-2 text-xs text-gray-400 dark:text-gray-500 shrink-0">{column.description}</p>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-3 space-y-3 min-h-[100px]">
        {applications.length === 0 ? (
          <div className="flex items-center justify-center h-20 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 text-xs text-gray-400 dark:text-gray-500">
            {isOver ? 'Solte aqui' : 'Nenhuma candidatura'}
          </div>
        ) : (
          applications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              isDragging={draggingId === app.id}
            />
          ))
        )}
      </div>
    </div>
  );
}

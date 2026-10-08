import { useState } from 'react';
import type { Application, ApplicationStatus } from '@/types';
import { STATUS_COLUMNS } from '@/constants';
import { KanbanColumn } from '@/components/KanbanColumn';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/Button';
import { Plus, Columns2, LayoutList } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KanbanBoardProps {
  applications: Application[];
  groupedByStatus: Record<ApplicationStatus, Application[]>;
  onView: (app: Application) => void;
  onEdit: (app: Application) => void;
  onDelete: (app: Application) => void;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
  onCreate: () => void;
}

export function KanbanBoard({
  applications,
  groupedByStatus,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
  onCreate,
}: KanbanBoardProps) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const handleDragStart = (e: React.DragEvent, app: Application) => {
    setDraggingId(app.id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', app.id);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  const handleDrop = (status: ApplicationStatus) => {
    if (draggingId) {
      onStatusChange(draggingId, status);
    }
    setDraggingId(null);
  };

  if (applications.length === 0) {
    return <EmptyState onCreate={onCreate} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setViewMode('kanban')}
            aria-pressed={viewMode === 'kanban'}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
              viewMode === 'kanban'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
            )}
          >
            <Columns2 className="h-4 w-4" />
            <span className="hidden sm:inline">Kanban</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            aria-pressed={viewMode === 'list'}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
              viewMode === 'list'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
            )}
          >
            <LayoutList className="h-4 w-4" />
            <span className="hidden sm:inline">Lista</span>
          </button>
        </div>
        <Button onClick={onCreate} size="sm" className="shrink-0">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nova candidatura</span>
          <span className="sm:hidden">Nova</span>
        </Button>
      </div>

      {viewMode === 'kanban' ? (
        <div className="overflow-x-auto scrollbar-thin pb-2">
          <div className="flex gap-4 min-w-max sm:min-w-0 sm:grid sm:grid-cols-3">
            {STATUS_COLUMNS.map((col) => (
              <div key={col.id} className="w-[280px] sm:w-auto">
                <KanbanColumn
                  status={col.id}
                  applications={groupedByStatus[col.id]}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onDrop={handleDrop}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  draggingId={draggingId}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{app.position}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 truncate">{app.company}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-400 dark:text-gray-500">
                  <span>{app.location}</span>
                  <span>•</span>
                  <span>{app.contractType}</span>
                </div>
              </div>
              <select
                value={app.status}
                onChange={(e) => onStatusChange(app.id, e.target.value as ApplicationStatus)}
                className="h-8 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              >
                {STATUS_COLUMNS.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.label}
                  </option>
                ))}
              </select>
              <Button variant="ghost" size="sm" onClick={() => onView(app)} className="shrink-0">
                Ver
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onEdit(app)} className="shrink-0">
                Editar
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import type { SVGProps } from 'react';
import type { Application } from '@/types';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { STATUS_LABELS } from '@/constants';
import { formatDate, cn } from '@/lib/utils';

type IconProps = SVGProps<SVGSVGElement>;

function MapPin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function Briefcase(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
    </svg>
  );
}

function Calendar(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}

function ExternalLink(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function Pencil(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m12 20 9-9-4-4-9 9-1 5 5-1Z" />
      <path d="m15 7 4 4" />
    </svg>
  );
}

function Trash2(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5" />
    </svg>
  );
}

function Eye(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function StickyNote(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 3h14a2 2 0 0 1 2 2v10l-5 5H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M16 20v-5h5M8 9h8M8 13h5" />
    </svg>
  );
}

interface ApplicationCardProps {
  application: Application;
  onView: (app: Application) => void;
  onEdit: (app: Application) => void;
  onDelete: (app: Application) => void;
  onDragStart: (e: React.DragEvent, app: Application) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

const statusVariant = {
  interessante: 'warning',
  candidatado: 'primary',
  entrevista: 'secondary',
} as const;

export function ApplicationCard({
  application,
  onView,
  onEdit,
  onDelete,
  onDragStart,
  onDragEnd,
  isDragging,
}: ApplicationCardProps) {
  const hasNotes = application.notes.length > 0;
  const firstNote = hasNotes ? application.notes[application.notes.length - 1] : null;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, application)}
      onDragEnd={onDragEnd}
      className={cn(
        'group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing',
        isDragging && 'opacity-50 rotate-1',
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 leading-tight">
          {application.position}
        </h3>
        <Badge variant={statusVariant[application.status]}>
          {STATUS_LABELS[application.status]}
        </Badge>
      </div>

      <div className="space-y-1.5 text-sm text-gray-500 dark:text-gray-400">
        <p className="flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          <span className="font-medium text-gray-700 dark:text-gray-300">{application.company}</span>
        </p>
        <p className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          {application.location}
        </p>
        <p className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          {formatDate(application.applicationDate)}
        </p>
      </div>

      <div className="mt-2">
        <Badge variant="neutral">{application.contractType}</Badge>
      </div>

      {firstNote && (
        <div className="mt-3 flex gap-2 rounded-lg bg-gray-50 dark:bg-gray-900/60 p-2.5">
          <StickyNote className="h-3.5 w-3.5 shrink-0 text-accent-500 mt-0.5" />
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{firstNote.content}</p>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onView(application)}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <Eye className="h-4 w-4" />
          Ver candidatura
        </Button>
        <div className="flex-1" />
        <button
          onClick={() => onEdit(application)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/40 transition-colors"
          aria-label="Editar candidatura"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(application)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-error-600 dark:hover:text-error-400 hover:bg-error-50 dark:hover:bg-error-950/40 transition-colors"
          aria-label="Excluir candidatura"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {application.jobUrl && (
        <a
          href={application.jobUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center justify-center gap-1.5 w-full h-8 rounded-lg text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40 hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Abrir link da vaga
        </a>
      )}
    </div>
  );
}

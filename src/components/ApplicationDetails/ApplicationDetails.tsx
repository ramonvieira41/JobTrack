import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  MapPin,
  Briefcase,
  Calendar,
  ExternalLink,
  Pencil,
  Trash2,
  StickyNote,
  Plus,
  X,
} from 'lucide-react';
import type { Application, ApplicationStatus } from '@/types';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Textarea } from '@/components/Textarea';
import { Select } from '@/components/Select';
import { STATUS_COLUMNS, STATUS_LABELS } from '@/constants';
import { noteSchema, type NoteFormData } from '@/schemas';
import { formatDate, formatDateTime, cn } from '@/lib/utils';

interface ApplicationDetailsProps {
  application: Application;
  onEdit: (app: Application) => void;
  onDelete: (app: Application) => void;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
  onAddNote: (id: string, content: string) => void;
  onRemoveNote: (applicationId: string, noteId: string) => void;
  onClose: () => void;
}

const statusVariant = {
  interessante: 'warning',
  candidatado: 'primary',
  entrevista: 'secondary',
} as const;

export function ApplicationDetails({
  application,
  onEdit,
  onDelete,
  onStatusChange,
  onAddNote,
  onRemoveNote,
  onClose,
}: ApplicationDetailsProps) {
  const [showNoteForm, setShowNoteForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
  });

  const handleAddNote = (data: NoteFormData) => {
    onAddNote(application.id, data.content);
    reset();
    setShowNoteForm(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{application.position}</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1.5">
            <Briefcase className="h-4 w-4" />
            {application.company}
          </p>
        </div>
        <Badge variant={statusVariant[application.status]} className="shrink-0">
          {STATUS_LABELS[application.status]}
        </Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <InfoTile label="Localização" value={application.location} icon={MapPin} />
        <InfoTile label="Contratação" value={application.contractType} icon={Briefcase} />
        <InfoTile label="Candidatura" value={formatDate(application.applicationDate)} icon={Calendar} />
        <InfoTile
          label="Atualizada"
          value={formatDate(application.updatedAt)}
          icon={Calendar}
        />
      </div>

      <div>
        <label htmlFor="application-status" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
          Status
        </label>
        <Select
          id="application-status"
          value={application.status}
          onChange={(e) => onStatusChange(application.id, e.target.value as ApplicationStatus)}
        >
          {STATUS_COLUMNS.map((col) => (
            <option key={col.id} value={col.id}>
              {col.label}
            </option>
          ))}
        </Select>
      </div>

      {application.jobUrl && (
        <a
          href={application.jobUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40 hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Abrir link da vaga
        </a>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
            <StickyNote className="h-4 w-4 text-accent-500" />
            Notas ({application.notes.length})
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNoteForm((prev) => !prev)}
          >
            {showNoteForm ? (
              <>
                <X className="h-4 w-4" /> Cancelar
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" /> Adicionar nota
              </>
            )}
          </Button>
        </div>

        {showNoteForm && (
          <form onSubmit={handleSubmit(handleAddNote)} className="mb-3 animate-slide-up">
            <Textarea
              id="note-content"
              placeholder="Escreva uma nota..."
              error={errors.content?.message}
              rows={3}
              {...register('content')}
            />
            <div className="flex justify-end mt-2">
              <Button type="submit" size="sm" disabled={isSubmitting}>
                Salvar nota
              </Button>
            </div>
          </form>
        )}

        <div className="space-y-2">
          {application.notes.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
              Nenhuma nota ainda.
            </p>
          ) : (
            [...application.notes].reverse().map((note) => (
              <div
                key={note.id}
                className="group rounded-lg bg-gray-50 dark:bg-gray-900/60 p-3 border border-gray-100 dark:border-gray-700/60"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words flex-1">
                    {note.content}
                  </p>
                  <button
                    type="button"
                    onClick={() => onRemoveNote(application.id, note.id)}
                    className="opacity-0 group-hover:opacity-100 focus:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500 text-gray-400 hover:text-error-500 transition-all shrink-0"
                    aria-label="Excluir nota"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                  {formatDateTime(note.createdAt)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700/60">
        <Button variant="outline" onClick={() => onEdit(application)} className="flex-1 sm:flex-none">
          <Pencil className="h-4 w-4" />
          Editar
        </Button>
        <Button
          variant="danger-outline"
          onClick={() => onDelete(application)}
          className="flex-1 sm:flex-none"
        >
          <Trash2 className="h-4 w-4" />
          Excluir
        </Button>
        <div className="flex-1" />
        <Button variant="ghost" onClick={onClose}>
          Fechar
        </Button>
      </div>
    </div>
  );
}

function InfoTile({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className={cn('rounded-lg bg-gray-50 dark:bg-gray-900/60 p-3 border border-gray-100 dark:border-gray-700/60')}>
      <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mb-1">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{value}</p>
    </div>
  );
}

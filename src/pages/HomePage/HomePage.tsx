import { useCallback, useState } from 'react';
import { KanbanBoard } from '@/components/KanbanBoard';
import { SearchBar } from '@/components/SearchBar';
import { FilterBar } from '@/components/FilterBar';
import { Modal } from '@/components/Modal';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { ApplicationForm } from '@/components/ApplicationForm';
import { ApplicationDetails } from '@/components/ApplicationDetails';
import { useApplications } from '@/hooks/useApplications';
import type { Application, ApplicationStatus } from '@/types';
import type { ApplicationFormData } from '@/schemas';

export function HomePage() {
  const {
    filtered,
    groupedByStatus,
    filters,
    setFilter,
    resetFilters,
    createApplication,
    updateApplication,
    deleteApplication,
    updateStatus,
    addNote,
    removeNote,
  } = useApplications();

  const [formOpen, setFormOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [viewingApp, setViewingApp] = useState<Application | null>(null);
  const [deletingApp, setDeletingApp] = useState<Application | null>(null);

  const handleCreate = useCallback(() => {
    setEditingApp(null);
    setFormOpen(true);
  }, []);

  const handleEdit = useCallback((app: Application) => {
    setEditingApp(app);
    setViewingApp(null);
    setFormOpen(true);
  }, []);

  const handleView = useCallback((app: Application) => {
    setViewingApp(app);
  }, []);

  const handleDeleteRequest = useCallback((app: Application) => {
    setDeletingApp(app);
    setViewingApp(null);
  }, []);

  const handleFormSubmit = useCallback(
    (data: ApplicationFormData) => {
      if (editingApp) {
        const [firstNote, ...remainingNotes] = editingApp.notes;
        const notes = data.notes
          ? [
              firstNote
                ? { ...firstNote, content: data.notes }
                : {
                    id: `note-${Date.now()}`,
                    content: data.notes,
                    createdAt: new Date().toISOString(),
                  },
              ...remainingNotes,
            ]
          : remainingNotes;

        updateApplication(editingApp.id, {
          position: data.position,
          company: data.company,
          location: data.location,
          contractType: data.contractType,
          status: data.status,
          applicationDate: data.applicationDate,
          jobUrl: data.jobUrl ?? '',
          notes,
        });
      } else {
        createApplication({
          position: data.position,
          company: data.company,
          location: data.location,
          contractType: data.contractType,
          status: data.status,
          applicationDate: data.applicationDate,
          jobUrl: data.jobUrl ?? '',
          notes: data.notes,
        });
      }
      setFormOpen(false);
      setEditingApp(null);
    },
    [editingApp, createApplication, updateApplication],
  );

  const handleConfirmDelete = useCallback(() => {
    if (deletingApp) {
      deleteApplication(deletingApp.id);
      setDeletingApp(null);
    }
  }, [deletingApp, deleteApplication]);

  const handleStatusChange = useCallback(
    (id: string, status: ApplicationStatus) => {
      updateStatus(id, status);
      setViewingApp((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
    },
    [updateStatus],
  );

  const handleAddNote = useCallback(
    (id: string, content: string) => {
      const updated = addNote(id, content);
      if (updated) setViewingApp(updated);
    },
    [addNote],
  );

  const handleRemoveNote = useCallback(
    (applicationId: string, noteId: string) => {
      removeNote(applicationId, noteId);
      setViewingApp((prev) =>
        prev && prev.id === applicationId
          ? { ...prev, notes: prev.notes.filter((n) => n.id !== noteId) }
          : prev,
      );
    },
    [removeNote],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Suas candidaturas
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Acompanhe e organize suas candidaturas de emprego e estágio.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar
            value={filters.search}
            onChange={(v) => setFilter('search', v)}
            className="flex-1"
          />
        </div>
        <FilterBar
          filters={filters}
          setFilter={setFilter}
          onReset={resetFilters}
        />
      </div>

      <KanbanBoard
        applications={filtered}
        groupedByStatus={groupedByStatus}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
        onStatusChange={handleStatusChange}
        onCreate={handleCreate}
      />

      <Modal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingApp(null);
        }}
        title={editingApp ? 'Editar candidatura' : 'Nova candidatura'}
        size="lg"
      >
        <ApplicationForm
          initialData={editingApp}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setFormOpen(false);
            setEditingApp(null);
          }}
        />
      </Modal>

      <Modal
        open={!!viewingApp}
        onClose={() => setViewingApp(null)}
        title="Detalhes da candidatura"
        size="lg"
      >
        {viewingApp && (
          <ApplicationDetails
            application={viewingApp}
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
            onStatusChange={handleStatusChange}
            onAddNote={handleAddNote}
            onRemoveNote={handleRemoveNote}
            onClose={() => setViewingApp(null)}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={!!deletingApp}
        title="Excluir candidatura"
        message={`Deseja realmente excluir a candidatura para "${deletingApp?.position}" na empresa "${deletingApp?.company}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingApp(null)}
      />
    </div>
  );
}

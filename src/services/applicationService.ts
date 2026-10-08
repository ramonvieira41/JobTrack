import type { Application, ApplicationStatus } from '@/types';
import { STORAGE_KEYS, MOCK_APPLICATIONS } from '@/constants';
import { generateId } from '@/lib/utils';

function validateUserId(userId: string): void {
  if (!userId.trim() || userId.trim() === 'anonymous') {
    throw new Error('É necessário um ID de usuário autenticado válido para acessar os aplicativos.');
  }
}

function storageKey(userId: string): string {
  validateUserId(userId);
  return `${STORAGE_KEYS.APPLICATIONS}:${encodeURIComponent(userId)}`;
}

function loadFromStorage(userId: string): Application[] {
  const raw = localStorage.getItem(storageKey(userId));
  if (raw !== null) {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error(`Stored applications for user "${userId}" must be an array.`);
    }
    return parsed;
  }

  const seeded = MOCK_APPLICATIONS;
  saveToStorage(userId, seeded);
  return seeded;
}

function saveToStorage(userId: string, applications: Application[]): void {
  localStorage.setItem(storageKey(userId), JSON.stringify(applications));
}

export const applicationService = {
  getAll: (userId: string): Application[] => loadFromStorage(userId),

  create: (userId: string, data: Omit<Application, 'id' | 'createdAt' | 'updatedAt' | 'notes'> & {
    notes?: string;
  }): Application => {
    const now = new Date().toISOString();
    const application: Application = {
      ...data,
      id: generateId(),
      notes: data.notes
        ? [{ id: generateId(), content: data.notes, createdAt: now }]
        : [],
      createdAt: now,
      updatedAt: now,
    };
    const all = loadFromStorage(userId);
    const updated = [application, ...all];
    saveToStorage(userId, updated);
    return application;
  },

  update: (userId: string, id: string, data: Partial<Application>): Application | null => {
    const all = loadFromStorage(userId);
    const idx = all.findIndex((a) => a.id === id);
    if (idx === -1) return null;
    const updated: Application = {
      ...all[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    all[idx] = updated;
    saveToStorage(userId, all);
    return updated;
  },

  remove: (userId: string, id: string): void => {
    const all = loadFromStorage(userId);
    saveToStorage(userId, all.filter((a) => a.id !== id));
  },

  updateStatus: (userId: string, id: string, status: ApplicationStatus): Application | null => {
    return applicationService.update(userId, id, { status });
  },

  addNote: (userId: string, id: string, content: string): Application | null => {
    const all = loadFromStorage(userId);
    const idx = all.findIndex((a) => a.id === id);
    if (idx === -1) return null;
    const note = {
      id: generateId(),
      content,
      createdAt: new Date().toISOString(),
    };
    all[idx] = {
      ...all[idx],
      notes: [...all[idx].notes, note],
      updatedAt: new Date().toISOString(),
    };
    saveToStorage(userId, all);
    return all[idx];
  },

  removeNote: (userId: string, applicationId: string, noteId: string): Application | null => {
    const all = loadFromStorage(userId);
    const idx = all.findIndex((a) => a.id === applicationId);
    if (idx === -1) return null;
    all[idx] = {
      ...all[idx],
      notes: all[idx].notes.filter((n) => n.id !== noteId),
      updatedAt: new Date().toISOString(),
    };
    saveToStorage(userId, all);
    return all[idx];
  },
};

import { useCallback, useEffect, useMemo, useState } from 'react';
import type {
  Application,
  ApplicationStatus,
  SortOption,
  WorkLocation,
  ContractType,
} from '@/types';
import { applicationService } from '@/services/applicationService';
import { useAuthContext } from '@/hooks/useAuthContext';

export interface FilterOptions {
  search: string;
  status: ApplicationStatus | 'all';
  location: WorkLocation | 'all';
  contractType: ContractType | 'all';
  sort: SortOption;
}

export const DEFAULT_FILTERS: FilterOptions = {
  search: '',
  status: 'all',
  location: 'all',
  contractType: 'all',
  sort: 'recent',
};

export function useApplications() {
  const { user } = useAuthContext();
  const userId = user?.id ?? null;
  const [loadedApplications, setLoadedApplications] = useState<{
    userId: string | null;
    applications: Application[];
  }>({ userId, applications: [] });
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);

  const requireUserId = useCallback((): string => {
    if (!userId?.trim()) {
      throw new Error('É necessário um usuário autenticado para acessar');
    }
    return userId;
  }, [userId]);

  const refresh = useCallback(() => {
    if (!userId) {
      setLoadedApplications({ userId: null, applications: [] });
      return;
    }
    setLoadedApplications({
      userId,
      applications: applicationService.getAll(userId),
    });
  }, [userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const applications = useMemo(
    () => (loadedApplications.userId === userId ? loadedApplications.applications : []),
    [loadedApplications, userId],
  );

  const createApplication = useCallback(
    (data: Parameters<typeof applicationService.create>[1]) => {
      const created = applicationService.create(requireUserId(), data);
      refresh();
      return created;
    },
    [refresh, requireUserId],
  );

  const updateApplication = useCallback(
    (id: string, data: Parameters<typeof applicationService.update>[2]) => {
      const updated = applicationService.update(requireUserId(), id, data);
      refresh();
      return updated;
    },
    [refresh, requireUserId],
  );

  const deleteApplication = useCallback(
    (id: string) => {
      applicationService.remove(requireUserId(), id);
      refresh();
    },
    [refresh, requireUserId],
  );

  const updateStatus = useCallback(
    (id: string, status: ApplicationStatus) => {
      applicationService.updateStatus(requireUserId(), id, status);
      refresh();
    },
    [refresh, requireUserId],
  );

  const addNote = useCallback(
    (id: string, content: string) => {
      const updated = applicationService.addNote(requireUserId(), id, content);
      refresh();
      return updated;
    },
    [refresh, requireUserId],
  );

  const removeNote = useCallback(
    (applicationId: string, noteId: string) => {
      applicationService.removeNote(requireUserId(), applicationId, noteId);
      refresh();
    },
    [refresh, requireUserId],
  );

  const setFilter = useCallback(<K extends keyof FilterOptions>(
    key: K,
    value: FilterOptions[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const filtered = useMemo(() => {
    let result = [...applications];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.position.toLowerCase().includes(q) ||
          a.company.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q) ||
          a.contractType.toLowerCase().includes(q),
      );
    }

    if (filters.status !== 'all') {
      result = result.filter((a) => a.status === filters.status);
    }

    if (filters.location !== 'all') {
      result = result.filter((a) => a.location === filters.location);
    }

    if (filters.contractType !== 'all') {
      result = result.filter((a) => a.contractType === filters.contractType);
    }

    switch (filters.sort) {
      case 'recent':
        result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
        break;
      case 'oldest':
        result.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        break;
      case 'company':
        result.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case 'position':
        result.sort((a, b) => a.position.localeCompare(b.position));
        break;
    }

    return result;
  }, [applications, filters]);

  const groupedByStatus = useMemo(() => {
    const groups: Record<ApplicationStatus, Application[]> = {
      interessante: [],
      candidatado: [],
      entrevista: [],
    };
    for (const app of filtered) {
      groups[app.status].push(app);
    }
    return groups;
  }, [filtered]);

  return {
    applications,
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
  };
}

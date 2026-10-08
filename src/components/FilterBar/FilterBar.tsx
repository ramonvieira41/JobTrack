import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import type { FilterOptions } from '@/hooks/useApplications';
import { STATUS_COLUMNS, WORK_LOCATIONS, CONTRACT_TYPES, SORT_OPTIONS } from '@/constants';
import { Select } from '@/components/Select';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  filters: FilterOptions;
  setFilter: <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => void;
  onReset: () => void;
  className?: string;
}

export function FilterBar({ filters, setFilter, onReset, className }: FilterBarProps) {
  const hasActiveFilters =
    filters.status !== 'all' ||
    filters.location !== 'all' ||
    filters.contractType !== 'all' ||
    filters.sort !== 'recent';

  return (
    <div className={cn('flex flex-wrap items-end gap-3', className)}>
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 pb-2.5">
        <SlidersHorizontal className="h-4 w-4" />
        <span className="hidden sm:inline">Filtros</span>
      </div>

      <Select
        value={filters.status}
        onChange={(e) => setFilter('status', e.target.value as FilterOptions['status'])}
        className="w-auto min-w-[130px]"
        aria-label="Filtrar por status"
      >
        <option value="all">Status: Todos</option>
        {STATUS_COLUMNS.map((col) => (
          <option key={col.id} value={col.id}>
            {col.label}
          </option>
        ))}
      </Select>

      <Select
        value={filters.location}
        onChange={(e) => setFilter('location', e.target.value as FilterOptions['location'])}
        className="w-auto min-w-[130px]"
        aria-label="Filtrar por localização"
      >
        <option value="all">Local: Todos</option>
        {WORK_LOCATIONS.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </Select>

      <Select
        value={filters.contractType}
        onChange={(e) => setFilter('contractType', e.target.value as FilterOptions['contractType'])}
        className="w-auto min-w-[130px]"
        aria-label="Filtrar por tipo de contrato"
      >
        <option value="all">Tipo: Todos</option>
        {CONTRACT_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </Select>

      <Select
        value={filters.sort}
        onChange={(e) => setFilter('sort', e.target.value as FilterOptions['sort'])}
        className="w-auto min-w-[140px]"
        aria-label="Ordenar por"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>

      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 h-10 px-3 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/40 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Limpar
        </button>
      )}
    </div>
  );
}

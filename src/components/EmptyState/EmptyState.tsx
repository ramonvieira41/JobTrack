import { Briefcase, Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/Button';
import { Link } from '@tanstack/react-router';

interface EmptyStateProps {
  onCreate: () => void;
}

export function EmptyState({ onCreate }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/30">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/40 mb-4">
        <Briefcase className="h-8 w-8 text-primary-600 dark:text-primary-400" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1.5">
        Nenhuma candidatura ainda
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-6">
        Comece a acompanhar suas candidaturas de emprego e estágio. Crie a primeira e
        organize tudo em um só lugar.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onCreate} size="lg">
          <Plus className="h-5 w-5" />
          Criar primeira candidatura
        </Button>
        <Link
          to="/sobre"
          className="flex items-center justify-center gap-2 h-12 px-6 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Conhecer o JobTrack
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

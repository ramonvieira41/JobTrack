import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicationSchema, type ApplicationFormData } from '@/schemas';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { STATUS_COLUMNS, WORK_LOCATIONS, CONTRACT_TYPES } from '@/constants';
import type { Application } from '@/types';

interface ApplicationFormProps {
  initialData?: Application | null;
  onSubmit: (data: ApplicationFormData) => void;
  onCancel: () => void;
}

export function ApplicationForm({ initialData, onSubmit, onCancel }: ApplicationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      position: initialData?.position ?? '',
      company: initialData?.company ?? '',
      location: initialData?.location ?? 'Remoto',
      contractType: initialData?.contractType ?? 'CLT',
      status: initialData?.status ?? 'interessante',
      applicationDate: initialData?.applicationDate ?? new Date().toISOString().split('T')[0],
      jobUrl: initialData?.jobUrl ?? '',
      notes: initialData?.notes[0]?.content ?? '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="position"
          label="Cargo"
          placeholder="Ex: Frontend Developer"
          error={errors.position?.message}
          {...register('position')}
        />
        <Input
          id="company"
          label="Empresa"
          placeholder="Ex: Tech Solutions"
          error={errors.company?.message}
          {...register('company')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Select
          id="location"
          label="Localização"
          error={errors.location?.message}
          {...register('location')}
        >
          {WORK_LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </Select>
        <Select
          id="contractType"
          label="Tipo de contratação"
          error={errors.contractType?.message}
          {...register('contractType')}
        >
          {CONTRACT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
        <Select
          id="status"
          label="Status"
          error={errors.status?.message}
          {...register('status')}
        >
          {STATUS_COLUMNS.map((col) => (
            <option key={col.id} value={col.id}>
              {col.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="applicationDate"
          type="date"
          label="Data da candidatura"
          error={errors.applicationDate?.message}
          {...register('applicationDate')}
        />
        <Input
          id="jobUrl"
          type="url"
          label="Link da vaga (opcional)"
          placeholder="https://..."
          error={errors.jobUrl?.message}
          {...register('jobUrl')}
        />
      </div>

      <Textarea
        id="notes"
        label="Observação inicial (opcional)"
        placeholder="Registre uma observação inicial sobre a vaga ou o processo..."
        error={errors.notes?.message}
        rows={4}
        {...register('notes')}
      />

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100 dark:border-gray-700/60">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {initialData ? 'Salvar alterações' : 'Criar candidatura'}
        </Button>
      </div>
    </form>
  );
}

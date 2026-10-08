import type {
  ApplicationStatus,
  ContractType,
  WorkLocation,
} from '@/types';

export const STORAGE_KEYS = {
  APPLICATIONS: 'jobtrack-applications',
  USER: 'jobtrack-user',
  USERS: 'jobtrack-users',
  THEME: 'jobtrack-theme',
} as const;

export const STATUS_COLUMNS: {
  id: ApplicationStatus;
  label: string;
  description: string;
  color: string;
  dotColor: string;
}[] = [
  {
    id: 'interessante',
    label: 'Interessantes',
    description: 'Vagas que chamaram sua atenção',
    color: 'border-l-amber-400',
    dotColor: 'bg-amber-400',
  },
  {
    id: 'candidatado',
    label: 'Candidatado',
    description: 'Você já se candidatou',
    color: 'border-l-primary-500',
    dotColor: 'bg-primary-500',
  },
  {
    id: 'entrevista',
    label: 'Entrevistas',
    description: 'Em processo de entrevista',
    color: 'border-l-secondary-500',
    dotColor: 'bg-secondary-500',
  },
];

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  interessante: 'Interessante',
  candidatado: 'Candidatado',
  entrevista: 'Entrevista',
};

export const CONTRACT_TYPES: ContractType[] = [
  'CLT',
  'PJ',
  'Estágio',
  'Freelance',
  'Aprendiz',
];

export const WORK_LOCATIONS: WorkLocation[] = ['Remoto', 'Híbrido', 'Presencial'];

export const SORT_OPTIONS = [
  { value: 'recent', label: 'Mais recentes' },
  { value: 'oldest', label: 'Mais antigas' },
  { value: 'company', label: 'Empresa (A-Z)' },
  { value: 'position', label: 'Cargo (A-Z)' },
] as const;

export const MOCK_APPLICATIONS = [
  {
    id: 'mock-1',
    position: 'Frontend Developer',
    company: 'Tech Solutions',
    location: 'Remoto' as WorkLocation,
    contractType: 'CLT' as ContractType,
    status: 'entrevista' as ApplicationStatus,
    applicationDate: '2026-10-02',
    jobUrl: '',
    notes: [
      {
        id: 'note-1',
        content: 'Primeira entrevista agendada para sexta-feira. Estudar React e TypeScript.',
        createdAt: '2026-10-03T10:00:00Z',
      },
    ],
    createdAt: '2026-10-02T10:00:00Z',
    updatedAt: '2026-10-03T10:00:00Z',
  },
  {
    id: 'mock-2',
    position: 'Desenvolvedor Backend',
    company: 'DataCorp',
    location: 'Híbrido' as WorkLocation,
    contractType: 'PJ' as ContractType,
    status: 'candidatado' as ApplicationStatus,
    applicationDate: '2026-09-28',
    jobUrl: '',
    notes: [],
    createdAt: '2026-09-28T10:00:00Z',
    updatedAt: '2026-09-28T10:00:00Z',
  },
  {
    id: 'mock-3',
    position: 'Estágio em Produto',
    company: 'StartupXY',
    location: 'Presencial' as WorkLocation,
    contractType: 'Estágio' as ContractType,
    status: 'interessante' as ApplicationStatus,
    applicationDate: '2026-10-05',
    jobUrl: '',
    notes: [],
    createdAt: '2026-10-05T10:00:00Z',
    updatedAt: '2026-10-05T10:00:00Z',
  },
];

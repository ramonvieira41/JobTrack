export type ApplicationStatus = 'interessante' | 'candidatado' | 'entrevista';

export type ContractType = 'CLT' | 'PJ' | 'Estágio' | 'Freelance' | 'Aprendiz';

export type WorkLocation = 'Remoto' | 'Híbrido' | 'Presencial';

export interface ApplicationNote {
  id: string;
  content: string;
  createdAt: string;
}

export interface Application {
  id: string;
  position: string;
  company: string;
  location: WorkLocation;
  contractType: ContractType;
  status: ApplicationStatus;
  applicationDate: string;
  jobUrl: string;
  notes: ApplicationNote[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
}

export type Theme = 'light' | 'dark';

export type SortOption = 'recent' | 'oldest' | 'company' | 'position';

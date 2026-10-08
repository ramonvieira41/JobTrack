import { createContext } from 'react';
import type { User } from '@/types';

export interface AuthContextValue {
  user: User | null;
  login: (email: string) => User;
  signup: (name: string, email: string) => User;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

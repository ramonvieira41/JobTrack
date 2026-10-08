import { useState, type ReactNode } from 'react';
import type { User } from '@/types';
import { authService } from '@/services/authService';
import { AuthContext, type AuthContextValue } from '@/hooks/authContext';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());

  const value: AuthContextValue = {
    user,
    login: (email) => {
      const currentUser = authService.login(email);
      setUser(currentUser);
      return currentUser;
    },
    signup: (name, email) => {
      const currentUser = authService.signup(name, email);
      setUser(currentUser);
      return currentUser;
    },
    logout: () => {
      authService.logout();
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

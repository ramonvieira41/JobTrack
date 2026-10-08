import type { User } from '@/types';
import { STORAGE_KEYS } from '@/constants';
import { generateId } from '@/lib/utils';

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.id && parsed.name && parsed.email) return parsed;
    }
  } catch {
    // ignore
  }
  return null;
}

function saveUser(user: User | null): void {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
}

function loadUsers(): User[] {
  const raw = localStorage.getItem(STORAGE_KEYS.USERS);
  if (!raw) return [];

  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error('Stored users must be an array.');
  }

  return parsed.map((user): User => {
    if (
      !user ||
      typeof user.id !== 'string' ||
      typeof user.name !== 'string' ||
      typeof user.email !== 'string'
    ) {
      throw new Error('Stored user data is invalid.');
    }
    return user;
  });
}

function saveUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function findUserByEmail(email: string): User | undefined {
  const normalizedEmail = email.trim().toLowerCase();
  return loadUsers().find((user) => user.email.toLowerCase() === normalizedEmail);
}

function saveUserIdentity(user: User): void {
  const users = loadUsers();
  const existingIndex = users.findIndex(
    (knownUser) => knownUser.email.toLowerCase() === user.email.toLowerCase(),
  );
  if (existingIndex === -1) {
    users.push(user);
  } else {
    users[existingIndex] = user;
  }
  saveUsers(users);
}

export const authService = {
  getCurrentUser: (): User | null => {
    const user = loadUser();
    if (user) saveUserIdentity(user);
    return user;
  },

  login: (email: string): User => {
    const existingUser = findUserByEmail(email);
    const name = email.trim().split('@')[0].replace(/[._-]/g, ' ');
    const user = existingUser ?? {
      id: generateId(),
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: email.trim(),
    };
    saveUserIdentity(user);
    saveUser(user);
    return user;
  },

  signup: (name: string, email: string): User => {
    const existingUser = findUserByEmail(email);
    const user = {
      id: existingUser?.id ?? generateId(),
      name,
      email: email.trim(),
    };
    saveUserIdentity(user);
    saveUser(user);
    return user;
  },

  logout: (): void => {
    saveUser(null);
  },
};

import { createContext } from 'react';
import type { User } from './authService';

export interface AuthContextValue {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

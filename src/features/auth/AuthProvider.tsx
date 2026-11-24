import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { AuthContext } from './authContext';
import { login as loginRequest, userSchema, type User } from './authService';

const STORAGE_KEY = 'subscription-dashboard.user';

function readStoredUser(): User | null {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (raw === null) {
            return null;
        }
        const parsed = userSchema.safeParse(JSON.parse(raw));
        return parsed.success ? parsed.data : null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();
    const [user, setUser] = useState<User | null>(readStoredUser);

    const login = useCallback(async (username: string, password: string) => {
        const loggedIn = await loginRequest(username, password);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(loggedIn));
        setUser(loggedIn);
    }, []);

    
    const logout = useCallback(() => {
        sessionStorage.removeItem(STORAGE_KEY);
        queryClient.clear();
        setUser(null);
    }, [queryClient]);

    const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

    return <AuthContext value={value}>{children}</AuthContext>;
}

import { z } from 'zod';

export const PERMISSIONS = ['subscriptions:read'] as const;
export type Permission = (typeof PERMISSIONS)[number];

export interface User {
    username: string;
    displayName: string;
    permissions: Permission[];
}

export const userSchema = z.object({
    username: z.string(),
    displayName: z.string(),
    permissions: z.array(z.enum(PERMISSIONS)),
}) satisfies z.ZodType<User>;

export class InvalidCredentialsError extends Error {
    constructor() {
        super('Invalid username or password');
        this.name = 'InvalidCredentialsError';
    }
}

const USERS: (User & { password: string })[] = [
    {
        username: 'admin',
        password: 'admin123',
        displayName: 'Super Admin',
        permissions: ['subscriptions:read'],
    },
    {
        username: 'user',
        password: 'user123',
        displayName: 'User Name',
        permissions: [],
    },
];

const FAKE_LATENCY_MS = 300;

export async function login(username: string, password: string): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY_MS));

    const match = USERS.find(
        (u) => u.username === username.trim().toLowerCase() && u.password === password,
    );

    if (!match) {
        throw new InvalidCredentialsError();
    }

    return {
        username: match.username,
        displayName: match.displayName,
        permissions: [...match.permissions],
    };
}

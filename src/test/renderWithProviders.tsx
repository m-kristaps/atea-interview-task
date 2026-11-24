import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { AuthProvider } from '../features/auth/AuthProvider';

export function renderWithProviders(ui: ReactNode, { route = '/' } = {}) {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

    return render(
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
            </AuthProvider>
        </QueryClientProvider>,
    );
}

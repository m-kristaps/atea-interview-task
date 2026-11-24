import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sampleData from '../../public/subscriptions.json';
import { mockFetchResponse } from '../test/mockFetch';
import { renderWithProviders } from '../test/renderWithProviders';
import { AppRoutes } from './AppRoutes';

async function logIn(username: string, password: string) {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Username'), username);
    await user.type(screen.getByLabelText('Password'), password);
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    return user;
}


describe('auth flow', () => {

    it('redirects to login if not logged in', () => {
        renderWithProviders(<AppRoutes />, { route: '/' });

        expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    });



    it('shows error if wrong password', async () => {
        renderWithProviders(<AppRoutes />, { route: '/login' });

        await logIn('admin', 'nope');

        expect(await screen.findByRole('alert')).toHaveTextContent('Wrong username or password.');
    });

    it('lets admin in to show subscriptions', async () => {
        mockFetchResponse(sampleData);
        renderWithProviders(<AppRoutes />, { route: '/' });

        await logIn('admin', 'admin123');

        expect(await screen.findByRole('table')).toBeInTheDocument();
        expect(screen.getByText(/signed in as/i)).toHaveTextContent('Anna Admin');
    });

    it('shows no access for regular user & never fetches data', async () => {
        const fetchSpy = mockFetchResponse(sampleData);
        renderWithProviders(<AppRoutes />, { route: '/' });

        await logIn('user', 'user123');

        expect(await screen.findByRole('heading', { name: 'No access' })).toBeInTheDocument();
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
        expect(fetchSpy).not.toHaveBeenCalled();
    });


    it('returns to login after logout', async () => {
        mockFetchResponse(sampleData);
        renderWithProviders(<AppRoutes />, { route: '/' });

        const user = await logIn('admin', 'admin123');
        await user.click(await screen.findByRole('button', { name: 'Log out' }));

        expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
        expect(sessionStorage.length).toBe(0);
    });
    
});


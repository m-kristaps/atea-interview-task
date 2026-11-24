import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sampleData from '../../../public/subscriptions.json';
import { mockFetchResponse } from '../../test/mockFetch';
import { renderWithProviders } from '../../test/renderWithProviders';
import { DashboardPage } from './DashboardPage';



function summaryValue(label: string) {
    return within(screen.getByRole('region', { name: label })).getByRole('paragraph').textContent;
}

function bodyRowCount() {
    return screen.getAllByRole('row').length - 1;
}

describe('DashboardPage', () => {



    it('shows loading state, then summary of all subscriptions', async () => {
        mockFetchResponse(sampleData);
        renderWithProviders(<DashboardPage />);
        

        expect(screen.getByRole('status')).toHaveTextContent(/loading/i);
        await screen.findByRole('table');

        expect(summaryValue('Total subscriptions')).toBe('17');
        expect(summaryValue('Active subscriptions')).toBe('9');
        expect(summaryValue('Total monthly cost')).toBe('€28,066.77');

        expect(bodyRowCount()).toBe(17);

    });

    it('updates summary and table when filters change', async () => {
        const user = userEvent.setup();

        mockFetchResponse(sampleData);

        renderWithProviders(<DashboardPage />);
        await screen.findByRole('table');

        await user.selectOptions(screen.getByLabelText('Customer'), 'Nordic Freight AS');


        expect(summaryValue('Total subscriptions')).toBe('4');
        expect(summaryValue('Active subscriptions')).toBe('2');
        expect(summaryValue('Total monthly cost')).toBe('€5,979.45');

        expect(bodyRowCount()).toBe(4);


        await user.selectOptions(screen.getByLabelText('Status'), 'active');

        expect(summaryValue('Total subscriptions')).toBe('2');

        expect(bodyRowCount()).toBe(2);

    });

    it('shows empty message when no matches', async () => {
        const user = userEvent.setup();

        mockFetchResponse(sampleData);


        renderWithProviders(<DashboardPage />);
        await screen.findByRole('table');


        await user.selectOptions(screen.getByLabelText('Customer'), 'Lumen Retail Oy');
        await user.selectOptions(screen.getByLabelText('Status'), 'active');

        expect(screen.getByText('No subscriptions match selected filters.')).toBeInTheDocument();

        expect(summaryValue('Total monthly cost')).toBe('€0.00');
    });

    it('reads filters from url', async () => {
        mockFetchResponse(sampleData);

        renderWithProviders(<DashboardPage />, { route: '/?status=expired' });
        await screen.findByRole('table');

        expect(screen.getByLabelText('Status')).toHaveValue('expired');

        expect(summaryValue('Total subscriptions')).toBe('5');
        expect(summaryValue('Total monthly cost')).toBe('€1,109.57');
    });

    it('shows error state and recovers on retry', async () => {
        const user = userEvent.setup();
        const fetchSpy = mockFetchResponse('Server error', 500);


        renderWithProviders(<DashboardPage />);

        expect(await screen.findByRole('alert')).toHaveTextContent('Could not load subscriptions');

        fetchSpy.mockImplementation(async () => new Response(JSON.stringify(sampleData)));

        await user.click(screen.getByRole('button', { name: 'Try again' }));

        expect(await screen.findByRole('table')).toBeInTheDocument();

    });



    
});

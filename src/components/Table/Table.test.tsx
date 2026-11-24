import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table, type ColumnDef } from './Table';

interface Fruit {
    id: string;
    name: string;
    amount: number;
}

const columns: ColumnDef<Fruit>[] = [
    { id: 'name', header: 'Name', accessor: (f) => f.name, sortable: true },
    { id: 'amount', header: 'Amount', accessor: (f) => f.amount, sortable: true },
];

const fruits: Fruit[] = [
    { id: '1', name: 'Banana', amount: 30 },
    { id: '2', name: 'Apple', amount: 250 },
    { id: '3', name: 'Cherry', amount: 5 },
];


function firstColumnValues() {
    const [, ...bodyRows] = screen.getAllByRole('row');

    return bodyRows.map((row) => within(row).getAllByRole('cell')[0].textContent);
}


function renderTable(rows: Fruit[] = fruits) {

    render(
        <Table
            rows={rows}
            columns={columns}
            getRowId={(f) => f.id}
            caption="Fruits"
            emptyMessage="Nothing here"
        />,
    );
}



describe('Table', () => {

    it('sorts by clicked column and toggles direction on second click', async () => {
        const user = userEvent.setup();

        renderTable();

        await user.click(screen.getByRole('button', { name: /amount/i }));

        expect(firstColumnValues()).toEqual(['Cherry', 'Banana', 'Apple']);
        expect(screen.getByRole('columnheader', { name: /amount/i })).toHaveAttribute('aria-sort', 'ascending');


        await user.click(screen.getByRole('button', { name: /amount/i }));


        expect(firstColumnValues()).toEqual(['Apple', 'Banana', 'Cherry']);
        expect(screen.getByRole('columnheader', { name: /amount/i })).toHaveAttribute('aria-sort', 'descending');
    });


    it('starts asc when switching to another column', async () => {
        const user = userEvent.setup();

        renderTable();

        await user.click(screen.getByRole('button', { name: /amount/i }));
        await user.click(screen.getByRole('button', { name: /amount/i }));
        await user.click(screen.getByRole('button', { name: /name/i }));

        expect(firstColumnValues()).toEqual(['Apple', 'Banana', 'Cherry']);
    });

    it('shows empty message when no rows', () => {

        renderTable([]);

        expect(screen.getByText('Nothing here')).toBeInTheDocument();
    });

    
});

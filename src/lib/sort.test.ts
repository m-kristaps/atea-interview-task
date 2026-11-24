import { sortBy } from './sort';

interface Row {
    id: string;
    name: string;
    qty: number;
}

const byQty = (r: Row) => r.qty;
const byName = (r: Row) => r.name;

describe('sortBy', () => {
    it('sorts numbers numerically', () => {
        const rows: Row[] = [
            { id: 'a', name: 'A', qty: 250 },
            { id: 'b', name: 'B', qty: 30 },
            { id: 'c', name: 'C', qty: 5 },
        ];

        expect(sortBy(rows, byQty, 'asc').map((r) => r.qty)).toEqual([5, 30, 250]);
    });


    it('sorts descending', () => {
        const rows: Row[] = [
            { id: 'a', name: 'A', qty: 1 },
            { id: 'b', name: 'B', qty: 3 },
            { id: 'c', name: 'C', qty: 2 },
        ];
        expect(sortBy(rows, byQty, 'desc').map((r) => r.qty)).toEqual([3, 2, 1]);
    });

    it('sorts strings alphabeticaly', () => {
        const rows: Row[] = [
            { id: 'a', name: 'Zeta', qty: 0 },
            { id: 'b', name: 'alpha', qty: 0 },
            { id: 'c', name: 'Beta', qty: 0 },
        ];
        expect(sortBy(rows, byName, 'asc').map((r) => r.name)).toEqual(['alpha', 'Beta', 'Zeta']);
    });

    it('do not mutate input array', () => {
        const rows: Row[] = [
            { id: 'a', name: 'A', qty: 2 },
            { id: 'b', name: 'B', qty: 1 },
        ];
        sortBy(rows, byQty, 'asc');
        expect(rows.map((r) => r.id)).toEqual(['a', 'b']);
    });

    it('keeps original order when sorting descending', () => {
        const rows: Row[] = [
            { id: 'first', name: 'X', qty: 1 },
            { id: 'second', name: 'X', qty: 1 },
            { id: 'big', name: 'Y', qty: 9 },
        ];
        expect(sortBy(rows, byQty, 'desc').map((r) => r.id)).toEqual(['big', 'first', 'second']);
    });


});


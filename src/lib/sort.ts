export type SortDirection = 'asc' | 'desc';

export function sortBy<T>(rows: readonly T[], getValue: (row: T) => string | number, direction: SortDirection): T[] {
    const sign = direction === 'asc' ? 1 : -1;

    return rows.toSorted((a, b) => {
        const va = getValue(a);
        const vb = getValue(b);
        const result =
            typeof va === 'number' && typeof vb === 'number'
                ? va - vb
                : String(va).localeCompare(String(vb));

        return result * sign;
    });
}

import { useMemo, useState, type ReactNode } from 'react';
import { sortBy, type SortDirection } from '../../lib/sort';
import styles from './Table.module.scss';

export interface ColumnDef<T> {
    id: string;
    header: string;
    accessor: (row: T) => string | number;
    cell?: (row: T) => ReactNode;
    sortable?: boolean;
    align?: 'left' | 'right';
}

export interface SortState {
    columnId: string;
    direction: SortDirection;
}

interface TableProps<T> {
    rows: readonly T[];
    columns: readonly ColumnDef<T>[];
    getRowId: (row: T) => string;
    caption: string;
    initialSort?: SortState;
    emptyMessage?: string;
}


export function Table<T>({rows, columns, getRowId, caption, initialSort, emptyMessage = 'No data'}: TableProps<T>) {
    const [sort, setSort] = useState<SortState | null>(initialSort ?? null);

    const sortedRows = useMemo(() => {
        const column = columns.find((c) => c.id === sort?.columnId);
        if (!sort || !column) {
            return rows;
        }
        return sortBy(rows, column.accessor, sort.direction);
    }, [rows, columns, sort]);

    function toggleSort(columnId: string) {

        setSort((current) => {

            if (current?.columnId === columnId) {
                return { columnId, direction: current.direction === 'asc' ? 'desc' : 'asc' };
            }
            
            return { columnId, direction: 'asc' };
        });
    }

    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <caption className="visually-hidden">{caption}</caption>
                <thead>
                    <tr>
                        {columns.map((column) => {
                            const direction = sort?.columnId === column.id ? sort.direction : null;

                            return (
                                <th
                                    key={column.id}
                                    scope="col"
                                    className={column.align === 'right' ? styles.alignRight : undefined}
                                    aria-sort={column.sortable ? toAriaSort(direction) : undefined}
                                >
                                    {column.sortable ? (
                                        <button
                                            type="button"
                                            className={styles.sortButton}
                                            onClick={() => toggleSort(column.id)}
                                        >
                                            {column.header}
                                            <SortIcon direction={direction} />
                                        </button>
                                    ) : (
                                        column.header
                                    )}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {sortedRows.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className={styles.empty}>
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        sortedRows.map((row) => (
                            <tr key={getRowId(row)}>
                                {columns.map((column) => (
                                    <td
                                        key={column.id}
                                        data-label={column.header}
                                        className={column.align === 'right' ? styles.alignRight : undefined}
                                    >
                                        {column.cell ? column.cell(row) : column.accessor(row)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

function SortIcon({ direction }: { direction: SortDirection | null }) {
    return (
        <svg className={styles.sortIcon} data-direction={direction ?? 'none'} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 15l6-6 6 6" />
        </svg>
    );
}

function toAriaSort(direction: SortDirection | null) {

    if (direction === 'asc') {
        return 'ascending';
    }

    if (direction === 'desc') {
        return 'descending';
    }

    return 'none';
}

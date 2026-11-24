import { Table, type ColumnDef } from '../../../components/Table/Table';
import { formatCurrency, formatDate } from '../../../lib/format';
import { STATUS_LABELS, type Subscription } from '../model/types';
import styles from './SubscriptionTable.module.scss';

const columns: ColumnDef<Subscription>[] = [
    { id: 'customer', header: 'Customer', accessor: (s) => s.customerName, sortable: true },
    { id: 'product', header: 'Product', accessor: (s) => s.productName, sortable: true },
    {
        id: 'status',
        header: 'Status',
        accessor: (s) => s.status,
        cell: (s) => <span className={`${styles.badge} ${styles[s.status]}`}>{STATUS_LABELS[s.status]}</span>,
        sortable: true,
    },
    { id: 'quantity', header: 'Quantity', accessor: (s) => s.quantity, sortable: true, align: 'right' },
    {
        id: 'monthlyCost',
        header: 'Monthly cost',
        accessor: (s) => s.monthlyCost,
        cell: (s) => formatCurrency(s.monthlyCost),
        sortable: true,
        align: 'right',
    },
    {
        id: 'renewalDate',
        header: 'Renewal date',
        accessor: (s) => s.renewalDate,
        cell: (s) => <time dateTime={s.renewalDate}>{formatDate(s.renewalDate)}</time>,
        sortable: true,
    },
];

export function SubscriptionTable({ subscriptions }: { subscriptions: readonly Subscription[] }) {
    
    return (
        <Table
            rows={subscriptions}
            columns={columns}
            getRowId={(s) => s.id}
            caption="Subscriptions"
            initialSort={{ columnId: 'renewalDate', direction: 'asc' }}
            emptyMessage="No subscriptions match selected filters."
        />
    );
}

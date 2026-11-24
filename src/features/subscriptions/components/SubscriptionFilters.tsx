import { parseStatus, type SubscriptionFilters as Filters } from '../model/filterSubscriptions';
import { STATUS_LABELS, SUBSCRIPTION_STATUSES } from '../model/types';
import styles from './SubscriptionFilters.module.scss';

interface SubscriptionFiltersProps {
    customers: readonly string[];
    filters: Filters;
    onChange: (filters: Filters) => void;
}

export function SubscriptionFilters({ customers, filters, onChange }: SubscriptionFiltersProps) {
    const hasActiveFilters = filters.customer !== null || filters.status !== null;

    return (
        <div className={styles.filters} role="group">
            <div className={styles.field}>
                <label htmlFor="customer-filter">Customer</label>
                <select
                    id="customer-filter"
                    value={filters.customer ?? ''}
                    onChange={(e) => onChange({ ...filters, customer: e.target.value || null })}
                >
                    <option value="">All customers</option>
                    {customers.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.field}>
                <label htmlFor="status-filter">Status</label>
                <select
                    id="status-filter"
                    value={filters.status ?? ''}
                    onChange={(e) => onChange({ ...filters, status: parseStatus(e.target.value) })}
                >
                    <option value="">All statuses</option>
                    {SUBSCRIPTION_STATUSES.map((status) => (
                        <option key={status} value={status}>
                            {STATUS_LABELS[status]}
                        </option>
                    ))}
                </select>
            </div>

            {hasActiveFilters && (
                <button
                    type="button"
                    className="button"
                    onClick={() => onChange({ customer: null, status: null })}
                >
                    Clear filters
                </button>
            )}
        </div>
    );
}

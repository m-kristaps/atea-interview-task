import { useSearchParams } from 'react-router';
import { useSubscriptions } from './api/useSubscriptions';
import { SubscriptionFilters } from './components/SubscriptionFilters';
import { SubscriptionTable } from './components/SubscriptionTable';
import { SummaryCards } from './components/SummaryCards';
import {
    filterSubscriptions,
    getCustomerNames,
    parseStatus,
    type SubscriptionFilters as Filters,
} from './model/filterSubscriptions';
import { summarize } from './model/summarize';

import styles from './DashboardPage.module.scss';

export function DashboardPage() {
    const { data, isPending, isError, refetch, isRefetching } = useSubscriptions();
    const [searchParams, setSearchParams] = useSearchParams();

    if (isPending) {
        return (
            <p className="message-box" role="status">Loading...</p>
        );
    }

    if (isError) {
        return (
            <section className="message-box" role="alert">
                <h2>Issue loading data</h2>
                <p>Please try again</p>
                <button type="button" className="button" onClick={() => refetch()} disabled={isRefetching}>
                    Try again
                </button>
            </section>
        );
    }

    const customers = getCustomerNames(data);
    const customerParam = searchParams.get('customer');
    const filters: Filters = {
        customer: customerParam !== null && customers.includes(customerParam) ? customerParam : null,
        status: parseStatus(searchParams.get('status')),
    };
    const visible = filterSubscriptions(data, filters);

    function handleFiltersChange(next: Filters) {
        const params = new URLSearchParams();

        if (next.customer !== null) {
            params.set('customer', next.customer);
        }

        if (next.status !== null) {
            params.set('status', next.status);
        }

        setSearchParams(params, { replace: true });
    }

    return (
        <div className={styles.dashboard}>
            <SubscriptionFilters customers={customers} filters={filters} onChange={handleFiltersChange} />
            <SummaryCards summary={summarize(visible)} />
            <SubscriptionTable subscriptions={visible} />
        </div>
    );
}

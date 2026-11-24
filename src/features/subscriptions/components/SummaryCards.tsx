import { useId } from 'react';
import { formatCurrency } from '../../../lib/format';
import type { SubscriptionSummary } from '../model/summarize';
import styles from './SummaryCards.module.scss';

export function SummaryCards({ summary }: { summary: SubscriptionSummary }) {
    return (
        <div className={styles.cards}>
            <SummaryCard label="Total subscriptions" value={String(summary.totalCount)} />
            <SummaryCard label="Active subscriptions" value={String(summary.activeCount)} />
            <SummaryCard label="Total monthly cost" value={formatCurrency(summary.totalMonthlyCost)} />
        </div>
    );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
    const id = useId();

    return (
        <section className={styles.card}>
            <h2 id={id} className={styles.label}>
                {label}
            </h2>
            <p className={styles.value}>{value}</p>
        </section>
    );
}

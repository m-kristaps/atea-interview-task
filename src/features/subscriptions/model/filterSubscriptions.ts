import { SUBSCRIPTION_STATUSES, type Subscription, type SubscriptionStatus } from './types';

export interface SubscriptionFilters {
    customer: string | null;
    status: SubscriptionStatus | null;
}

export function filterSubscriptions(subscriptions: readonly Subscription[], filters: SubscriptionFilters): Subscription[] {
    return subscriptions.filter(
        (subscription) =>
            (filters.customer === null || subscription.customerName === filters.customer) &&
            (filters.status === null || subscription.status === filters.status),
    );
}

export function getCustomerNames(subscriptions: readonly Subscription[]): string[] {
    const unique = new Set(subscriptions.map((subscription) => subscription.customerName));

    return [...unique].sort((a, b) => a.localeCompare(b));
}


export function parseStatus(value: string | null): SubscriptionStatus | null {
    return SUBSCRIPTION_STATUSES.find((subscription) => subscription === value) ?? null;
}

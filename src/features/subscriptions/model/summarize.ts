import type { Subscription } from './types';

export interface SubscriptionSummary {
    totalCount: number;
    activeCount: number;
    totalMonthlyCost: number;
}

export function summarize(subscriptions: readonly Subscription[]): SubscriptionSummary {
    let activeCount = 0;
    let totalCents = 0;

    for (const subscription of subscriptions) {

        if (subscription.status === 'active') {
            activeCount++;
        }
        
        totalCents += Math.round(subscription.monthlyCost * 100);
    }

    return {
        totalCount: subscriptions.length,
        activeCount,
        totalMonthlyCost: totalCents / 100,
    };
}

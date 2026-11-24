export const SUBSCRIPTION_STATUSES = ['active', 'expired', 'suspended'] as const;
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];

export const STATUS_LABELS: Record<SubscriptionStatus, string> = {
    active: 'Active',
    expired: 'Expired',
    suspended: 'Suspended',
};

export interface Subscription {
    id: string;
    customerName: string;
    productName: string;
    status: SubscriptionStatus;
    quantity: number;
    monthlyCost: number;
    // iso date
    renewalDate: string;
}

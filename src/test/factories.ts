import type { Subscription } from '../features/subscriptions/model/types';

let nextId = 1;

export function makeSubscription(overrides: Partial<Subscription> = {}): Subscription {
    return {
        id: `sub-${nextId++}`,
        customerName: 'Doe Corporation',
        productName: 'Microsoft 365 E3',
        status: 'active',
        quantity: 1,
        monthlyCost: 100,
        renewalDate: '2027-01-01',
        ...overrides,
    };
}

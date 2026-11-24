import { fetchJson } from '../../../lib/fetchJson';
import type { Subscription } from '../model/types';
import { subscriptionsSchema } from './subscriptionSchema';

export const SUBSCRIPTIONS_URL = `${import.meta.env.BASE_URL}subscriptions.json`;

export async function getSubscriptions(signal?: AbortSignal): Promise<Subscription[]> {
    const data = await fetchJson(SUBSCRIPTIONS_URL, signal);
    
    return subscriptionsSchema.parse(data);
}

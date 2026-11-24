import { useQuery } from '@tanstack/react-query';
import { getSubscriptions } from './getSubscriptions';

export const subscriptionsQueryKey = ['subscriptions'] as const;

export function useSubscriptions() {
    return useQuery({
        queryKey: subscriptionsQueryKey,
        queryFn: ({ signal }) => getSubscriptions(signal),
        staleTime: 5 * 60 * 1000, // 5
    });
}

import { mockFetchResponse } from '../../../test/mockFetch';
import { makeSubscription } from '../../../test/factories';
import { getSubscriptions } from './getSubscriptions';

describe('getSubscriptions', () => {
    it('returns subscriptions when response is valid', async () => {
        const subscription = makeSubscription();
        mockFetchResponse([subscription]);

        await expect(getSubscriptions()).resolves.toEqual([subscription]);
    });

    it('throws error if response not matchig schema', async () => {
        mockFetchResponse([{ id: 'sub-1', status: 'active' }]);

        await expect(getSubscriptions()).rejects.toThrow();
    });

    //
});

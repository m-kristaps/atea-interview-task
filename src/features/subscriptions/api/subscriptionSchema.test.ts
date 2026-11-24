import sampleData from '../../../../public/subscriptions.json';
import { makeSubscription } from '../../../test/factories';
import { subscriptionsSchema } from './subscriptionSchema';

describe('subscriptionsSchema', () => {
    
    it('accepts real data from public/subscriptions.json', () => {
        const result = subscriptionsSchema.safeParse(sampleData);
        expect(result.error).toBeUndefined();
    });

    it('rejects unknown status', () => {
        const result = subscriptionsSchema.safeParse([{ ...makeSubscription(), status: 'Active' }]);
        expect(result.success).toBe(false);
    });

    it('rejects cost sent as string', () => {
        const result = subscriptionsSchema.safeParse([{ ...makeSubscription(), monthlyCost: '4320.00' }]);
        expect(result.success).toBe(false);
    });

});


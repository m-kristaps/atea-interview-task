import { makeSubscription } from '../../../test/factories';
import { summarize } from './summarize';

describe('summarize', () => {



    it('returns zeros if empty list', () => {

        expect(summarize([])).toEqual({ totalCount: 0, activeCount: 0, totalMonthlyCost: 0 });
    });


    it('counts all subscriptions - only active ones as active', () => {
        const result = summarize([
            makeSubscription({ status: 'active' }),
            makeSubscription({ status: 'expired' }),
            makeSubscription({ status: 'suspended' }),
            makeSubscription({ status: 'active' }),
        ]);

        expect(result.totalCount).toBe(4);
        expect(result.activeCount).toBe(2);
    });

    it('sums costs', () => {

        const result = summarize([
            makeSubscription({ monthlyCost: 0.1 }),
            makeSubscription({ monthlyCost: 0.2 }),
        ]);

        expect(result.totalMonthlyCost).toBe(0.3);
    });

});



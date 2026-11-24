import { makeSubscription } from '../../../test/factories';
import { filterSubscriptions, getCustomerNames } from './filterSubscriptions';

describe('filterSubscriptions', () => {

    it('returns everything when no filters used', () => {
        const subscriptions = [makeSubscription(), makeSubscription(), makeSubscription()];
        const result = filterSubscriptions(subscriptions, { customer: null, status: null });
        expect(result).toEqual(subscriptions);
    });


    it('filters by customer name', () => {
        const acme1 = makeSubscription({ customerName: 'Acme' });
        const acme2 = makeSubscription({ customerName: 'Acme' });
        const globex = makeSubscription({ customerName: 'Globex' });
        const result = filterSubscriptions([acme1, globex, acme2], { customer: 'Acme', status: null });

        expect(result).toEqual([acme1, acme2]);
    });

    it('filters by status', () => {
        const active = makeSubscription({ status: 'active' });
        const expired = makeSubscription({ status: 'expired' });
        const suspended = makeSubscription({ status: 'suspended' });


        const result = filterSubscriptions([active, expired, suspended], { customer: null, status: 'expired' });
        expect(result).toEqual([expired]);
    });


    it('applies customer & status filter', () => {

        const acmeActive = makeSubscription({ customerName: 'Acme', status: 'active' });
        const acmeExpired = makeSubscription({ customerName: 'Acme', status: 'expired' });
        const globexActive = makeSubscription({ customerName: 'Globex', status: 'active' });


        const result = filterSubscriptions([acmeActive, acmeExpired, globexActive], {
            customer: 'Acme',
            status: 'active',
        });

        expect(result).toEqual([acmeActive]);

    });


});


describe('getCustomerNames', () => {

    it('returns each customer once sorted by alphabet', () => {
        
        const result = getCustomerNames([
            makeSubscription({ customerName: 'Nordic Freight AS' }),
            makeSubscription({ customerName: 'Baltic Health Group' }),
            makeSubscription({ customerName: 'Nordic Freight AS' }),

        ]);

        expect(result).toEqual(['Baltic Health Group', 'Nordic Freight AS']);
    });
    
});

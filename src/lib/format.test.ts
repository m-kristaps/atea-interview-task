import { formatDate } from './format';

describe('formatDate', () => {
    it('shows same calendar day as in iso', () => {
        expect(formatDate('2027-03-01')).toBe('1 Mar 2027');
    });
    
});

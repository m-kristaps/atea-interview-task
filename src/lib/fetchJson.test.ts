import { mockFetchResponse } from '../test/mockFetch';
import { fetchJson, HttpError } from './fetchJson';

describe('fetchJson', () => {
    it('returns parsed json body on success', async () => {
        mockFetchResponse([{ id: 'sub-1' }]);
        await expect(fetchJson('/data.json')).resolves.toEqual([{ id: 'sub-1' }]);
    });

    it('throws HttpError with status if non-ok response', async () => {
        mockFetchResponse('Not found', 404);
        const error = await fetchJson('/missing.json').catch((e: unknown) => e);
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).status).toBe(404);
    });
});

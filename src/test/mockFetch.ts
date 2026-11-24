export function mockFetchResponse(body: unknown, status = 200) {
    return vi
        .spyOn(globalThis, 'fetch')
        .mockImplementation(async () => new Response(JSON.stringify(body), { status }));
}

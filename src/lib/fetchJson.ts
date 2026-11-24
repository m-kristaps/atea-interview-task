export class HttpError extends Error {
    readonly status: number;

    constructor(status: number, url: string) {
        super(`Request to ${url} failed with status ${status}`);
        this.name = 'HttpError';
        this.status = status;
    }
}

export async function fetchJson(url: string, signal?: AbortSignal): Promise<unknown> {
    const res = await fetch(url, { signal });

    if (!res.ok) {
        throw new HttpError(res.status, url);
    }

    return res.json();
}

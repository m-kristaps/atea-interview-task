const currencyFormatter = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
});

export function formatCurrency(value: number): string {
    return currencyFormatter.format(value);
}

export function formatDate(isoDate: string): string {
    return dateFormatter.format(new Date(isoDate));
}

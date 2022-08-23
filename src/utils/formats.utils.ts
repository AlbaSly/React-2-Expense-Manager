export function formatToCurrency(value: number): string {
    return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
}

export function formateDate(date: Date): string {
    date = new Date(date);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}
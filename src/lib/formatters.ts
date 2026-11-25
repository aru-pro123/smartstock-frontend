
export function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split("-").map(Number)

    const date = new Date(Date.UTC(year, month - 1, day))

    return new Intl.DateTimeFormat("en-CA", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    }).format(date)
}

export function formatQuantity(value: number): string {
    return new Intl.NumberFormat("en-CA", {
        maximumFractionDigits: 3,
    }).format(value)
}

export function formatCurrency(
    value: number,
    currency = "CAD"
): string {
    return new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency,
    }).format(value)
}

function parseInTimezone(naiveDateStr: string, timezone: string): Date {
    const asUtc = new Date(naiveDateStr + "Z");
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
    const parts = formatter.formatToParts(asUtc);
    const get = (type: string) =>
        parseInt(parts.find((p) => p.type === type)?.value || "0");
    const tzHour = get("hour") === 24 ? 0 : get("hour");
    const shownDate = new Date(
        Date.UTC(get("year"), get("month") - 1, get("day"), tzHour, get("minute"), get("second"))
    );
    const offsetMs = shownDate.getTime() - asUtc.getTime();
    return new Date(asUtc.getTime() - offsetMs);
}

export function getLocalParts(dateStr: string, timezone: string) {
    const d = parseInTimezone(dateStr, timezone);
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
    });
    const parts = formatter.formatToParts(d);
    const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0");
    const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0");
    return { hour, minute, fractional: hour + minute / 60 };
}

export function getLocalDateParts(dateStr: string, timezone: string) {
    const d = parseInTimezone(dateStr, timezone);
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
    const parts = formatter.formatToParts(d);
    const year = parseInt(parts.find((p) => p.type === "year")?.value || "0");
    const month = parseInt(parts.find((p) => p.type === "month")?.value || "1");
    const day = parseInt(parts.find((p) => p.type === "day")?.value || "1");
    return { year, month, day };
}

export function isSameDayInTz(dateStr: string, localDay: Date, timezone: string): boolean {
    const { year, month, day } = getLocalDateParts(dateStr, timezone);
    return (
        localDay.getFullYear() === year &&
        localDay.getMonth() + 1 === month &&
        localDay.getDate() === day
    );
}

export function formatTimeInTz(dateStr: string, timezone: string): string {
    const d = parseInTimezone(dateStr, timezone);
    return d.toLocaleTimeString("es-ES", {
        timeZone: timezone,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

export function formatDateInTz(dateStr: string, timezone: string): string {
    const d = parseInTimezone(dateStr, timezone);
    return d.toLocaleDateString("es-ES", {
        timeZone: timezone,
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

const TZ_LABELS: Record<string, string> = {
    "Europe/Paris": "🇫🇷 París",
    "Europe/London": "🇬🇧 Londres",
    "Europe/Amsterdam": "🇳🇱 Ámsterdam",
};

export function getTimezoneLabel(timezone: string): string {
    return TZ_LABELS[timezone] || timezone;
}

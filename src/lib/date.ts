import type { CalendarItem } from "@/types/event";

export function isSameLocalDay(d1: Date, d2: Date): boolean {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

export function getEventDateStr(item: CalendarItem): string {
    return item.type === "event" ? item.start : item.date;
}

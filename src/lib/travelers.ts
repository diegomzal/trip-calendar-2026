import type { CalendarItem } from "@/types/event";

export interface Traveler {
    key: string;
    name: string;
    emoji: string;
}

// Order matches the itinerary's "Balance de gustos" table.
export const TRAVELERS: Traveler[] = [
    { key: "diego", name: "Diego", emoji: "💻" },
    { key: "adriana", name: "Adriana", emoji: "🍝" },
    { key: "omar", name: "Omar", emoji: "🏛️" },
    { key: "lucy", name: "Lucy", emoji: "⚖️" },
    { key: "yessenia", name: "Yessenia", emoji: "🎨" },
];

export const TRAVELER_KEYS = TRAVELERS.map((t) => t.key);

/** An item is "affinity-tagged" when its notes carry the ⭐ convention. */
export function isAffinityTagged(item: CalendarItem): boolean {
    return !!item.notes && item.notes.includes("⭐");
}

/** Traveler keys named inside an item's ⭐ affinity tag (empty if untagged). */
export function getEventTravelers(item: CalendarItem): string[] {
    if (!isAffinityTagged(item)) return [];
    // Only read names from the ⭐ tag onward, so an incidental mention elsewhere
    // (e.g. "Diego y Adriana se quedan en Milán" on the returnees' flight) is ignored.
    const notes = item.notes ?? "";
    const tag = notes.slice(notes.indexOf("⭐"));
    return TRAVELERS.filter((t) => tag.includes(t.name)).map((t) => t.key);
}

/**
 * Whether an event is "for" the selected traveler. Shared events (no ⭐ tag —
 * trains, check-ins, meals, generic sightseeing) always match; affinity-tagged
 * events match only the travelers they name. With no traveler selected,
 * everything matches.
 */
export function eventMatchesTraveler(
    item: CalendarItem,
    travelerKey: string | null
): boolean {
    if (!travelerKey) return true;
    if (!isAffinityTagged(item)) return true;
    return getEventTravelers(item).includes(travelerKey);
}

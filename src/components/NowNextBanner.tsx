import { useMemo } from "react";
import { useCalendarContext } from "@/context/CalendarContext";
import { toInstant, formatTimeInTz } from "@/lib/timezone";
import type { CalendarEvent } from "@/types/event";

function formatRelative(mins: number): string {
    if (mins < 60) return `en ${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m ? `en ${h} h ${m} min` : `en ${h} h`;
}

export function NowNextBanner() {
    const { events, currentDate, selectEvent } = useCalendarContext();

    const { current, next, minsToNext } = useMemo(() => {
        const now = currentDate.getTime();
        let current: CalendarEvent | null = null;
        let next: CalendarEvent | null = null;
        let bestNext = Infinity;
        for (const it of events) {
            if (it.type !== "event") continue;
            const start = toInstant(it.start, it.timezone).getTime();
            const end = toInstant(it.end, it.timezone).getTime();
            if (start <= now && now < end) current = it;
            if (start > now && start < bestNext) {
                bestNext = start;
                next = it;
            }
        }
        return {
            current,
            next,
            minsToNext: next ? Math.round((bestNext - now) / 60000) : null,
        };
    }, [events, currentDate]);

    // Stay hidden outside the trip: only surface "next" when it's within a day.
    if (!current && (minsToNext == null || minsToNext > 24 * 60)) return null;

    return (
        <div className="flex items-stretch gap-px bg-white/[0.08] border-b border-white/[0.08] text-xs">
            {current && (
                <button
                    onClick={() => selectEvent(current)}
                    className="flex-1 min-w-0 flex items-center gap-2 px-4 py-2 bg-app hover:bg-white/[0.04] transition-colors text-left"
                >
                    <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400/70" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                    </span>
                    <span className="text-white/40 uppercase tracking-wider text-[10px] shrink-0">
                        Ahora
                    </span>
                    <span className="text-white/90 truncate">{current.title}</span>
                </button>
            )}
            {next && (
                <button
                    onClick={() => selectEvent(next)}
                    className="flex-1 min-w-0 flex items-center gap-2 px-4 py-2 bg-app hover:bg-white/[0.04] transition-colors text-left"
                >
                    <span className="text-white/40 uppercase tracking-wider text-[10px] shrink-0">
                        Luego
                    </span>
                    <span className="text-white/80 truncate">{next.title}</span>
                    <span className="text-white/40 shrink-0 ml-auto whitespace-nowrap">
                        {minsToNext != null && minsToNext < 180
                            ? formatRelative(minsToNext)
                            : formatTimeInTz(next.start, next.timezone)}
                    </span>
                </button>
            )}
        </div>
    );
}

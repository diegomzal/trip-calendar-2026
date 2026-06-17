import { useState, useEffect } from "react";
import { useCalendarContext } from "@/context/CalendarContext";
import { formatClockInTz, getTimezoneLabel } from "@/lib/timezone";

const TRIP_START_MS = new Date(2026, 7, 3).getTime();
const LIMA_TZ = "America/Lima";

function flag(tz: string): string {
    return getTimezoneLabel(tz).split(" ")[0];
}

export function LocalClocks({ className = "" }: { className?: string }) {
    const { currentDate, activeTimezone } = useCalendarContext();
    const [now, setNow] = useState<Date>(currentDate);

    useEffect(() => {
        const offset = currentDate.getTime() - Date.now();
        const tick = () => setNow(new Date(Date.now() + offset));
        tick();
        const id = setInterval(tick, 30000);
        return () => clearInterval(id);
    }, [currentDate]);

    // Before the trip the countdown owns this slot; once home (Lima) it's moot.
    if (now.getTime() < TRIP_START_MS) return null;
    if (activeTimezone === LIMA_TZ) return null;

    return (
        <div className={`flex items-center gap-2 text-xs whitespace-nowrap ${className}`}>
            <span className="text-white/70">
                {flag(activeTimezone)}{" "}
                <span className="font-mono text-white/90">
                    {formatClockInTz(now, activeTimezone)}
                </span>
            </span>
            <span className="text-white/20">·</span>
            <span className="text-white/50">
                {flag(LIMA_TZ)}{" "}
                <span className="font-mono">{formatClockInTz(now, LIMA_TZ)}</span>
            </span>
        </div>
    );
}

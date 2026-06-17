import type { CalendarItem } from "@/types/event";
import { getLocalParts, formatTimeInTz, getTimezoneLabel } from "@/lib/timezone";
import { EVENT_STYLES } from "@/lib/colors";
import { cn } from "@/lib/utils";
import { useCalendarContext } from "@/context/CalendarContext";
import { HOUR_HEIGHT, START_HOUR } from "@/lib/constants";

interface CalendarEventBlockProps {
    event: CalendarItem;
}

export function CalendarEventBlock({ event }: CalendarEventBlockProps) {
    const { selectEvent } = useCalendarContext();
    const styles = EVENT_STYLES[event.color] || EVENT_STYLES.default;
    const tz = event.timezone;

    if (event.type === "marker") {
        const { fractional: markerHour } = getLocalParts(event.date, tz);
        const top = (markerHour - START_HOUR) * HOUR_HEIGHT;

        return (
            <button
                onClick={() => selectEvent(event)}
                className="absolute left-0 right-0 flex items-center cursor-pointer z-10 group transition-opacity hover:opacity-100"
                style={{ top: `${top}px`, transform: "translateY(-50%)" }}
            >
                <div
                    className={cn(
                        "shrink-0 flex items-center gap-1 pl-1 pr-1.5 py-0.5 rounded-r-full text-[10px] md:text-xs font-semibold whitespace-nowrap backdrop-blur-xl",
                        styles.bg,
                        styles.text
                    )}
                >
                    <svg
                        className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                    </svg>
                    {event.title}
                </div>
                <div
                    className={cn(
                        "flex-1 h-[1.5px] border-t-2 border-dashed",
                        styles.border
                    )}
                />
            </button>
        );
    }

    const { fractional: startHour } = getLocalParts(event.start, tz);
    const { fractional: endHour } = getLocalParts(event.end, tz);
    const duration = endHour - startHour;
    const top = (startHour - START_HOUR) * HOUR_HEIGHT;
    const height = Math.max(duration * HOUR_HEIGHT - 2, 14);
    const tzLabel = getTimezoneLabel(tz);
    const isCompact = height <= 28;

    return (
        <button
            onClick={() => selectEvent(event)}
            className={cn(
                "absolute left-0.5 right-0.5 md:left-1 md:right-1 rounded-sm overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer backdrop-blur-xl text-left z-10 border-l-[3px]",
                styles.bg,
                styles.border,
                styles.text
            )}
            style={{
                top: `${top}px`,
                height: `${height}px`,
            }}
        >
            {isCompact ? (
                <div className="px-1.5 md:px-2 h-full flex items-center gap-1.5 overflow-hidden">
                    <span className="text-[8px] md:text-[10px] font-semibold leading-none truncate">
                        {event.title}
                    </span>
                    <span className="text-[7px] md:text-[8px] opacity-60 leading-none whitespace-nowrap shrink-0">
                        {formatTimeInTz(event.start, tz)}
                    </span>
                </div>
            ) : (
                <div className="px-1.5 md:px-2 py-1 h-full flex flex-col">
                    <span className="text-[10px] md:text-xs font-semibold leading-tight truncate">
                        {event.title}
                    </span>
                    {height > 35 && (
                        <span className="text-[9px] md:text-[10px] opacity-70 mt-0.5">
                            {formatTimeInTz(event.start, tz)} – {formatTimeInTz(event.end, tz)}
                        </span>
                    )}
                    {height > 60 && event.notes && (
                        <span className="mt-1 text-[9px] md:text-[10px] opacity-80 italic leading-tight line-clamp-2">
                            {event.notes}
                        </span>
                    )}
                    {height > 80 && (
                        <span className="text-[8px] md:text-[9px] opacity-50 mt-0.5">
                            {tzLabel}
                        </span>
                    )}
                </div>
            )}
        </button>
    );
}

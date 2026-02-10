import type { CalendarItem } from "@/types/event";
import { getLocalParts, formatTimeInTz, getTimezoneLabel } from "@/lib/timezone";

const EVENT_COLORS: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: "rgba(59, 130, 246, 0.18)", border: "rgba(59, 130, 246, 0.35)", text: "rgb(147, 197, 253)" },
    red: { bg: "rgba(239, 68, 68, 0.18)", border: "rgba(239, 68, 68, 0.35)", text: "rgb(252, 165, 165)" },
    green: { bg: "rgba(34, 197, 94, 0.18)", border: "rgba(34, 197, 94, 0.35)", text: "rgb(134, 239, 172)" },
    purple: { bg: "rgba(168, 85, 247, 0.18)", border: "rgba(168, 85, 247, 0.35)", text: "rgb(216, 180, 254)" },
    orange: { bg: "rgba(249, 115, 22, 0.18)", border: "rgba(249, 115, 22, 0.35)", text: "rgb(253, 186, 116)" },
    emerald: { bg: "rgba(16, 185, 129, 0.18)", border: "rgba(16, 185, 129, 0.35)", text: "rgb(110, 231, 183)" },
    cyan: { bg: "rgba(6, 182, 212, 0.18)", border: "rgba(6, 182, 212, 0.35)", text: "rgb(103, 232, 249)" },
    amber: { bg: "rgba(245, 158, 11, 0.18)", border: "rgba(245, 158, 11, 0.35)", text: "rgb(252, 211, 77)" },
    pink: { bg: "rgba(236, 72, 153, 0.18)", border: "rgba(236, 72, 153, 0.35)", text: "rgb(249, 168, 212)" },
    indigo: { bg: "rgba(99, 102, 241, 0.18)", border: "rgba(99, 102, 241, 0.35)", text: "rgb(165, 180, 252)" },
};

const DEFAULT_COLOR = { bg: "rgba(148, 163, 184, 0.18)", border: "rgba(148, 163, 184, 0.35)", text: "rgb(203, 213, 225)" };

interface CalendarEventBlockProps {
    event: CalendarItem;
    onClick: (event: CalendarItem) => void;
}

export function CalendarEventBlock({ event, onClick }: CalendarEventBlockProps) {
    const colors = EVENT_COLORS[event.color] || DEFAULT_COLOR;
    const tz = event.timezone;

    if (event.type === "marker") {
        const { fractional: markerHour } = getLocalParts(event.date, tz);
        const HOUR_HEIGHT = 60;
        const top = (markerHour - 4) * HOUR_HEIGHT;

        return (
            <button
                onClick={() => onClick(event)}
                className="absolute left-0 right-0 flex items-center cursor-pointer z-10 group transition-opacity hover:opacity-100"
                style={{ top: `${top}px`, transform: "translateY(-50%)" }}
            >
                <div
                    className="shrink-0 flex items-center gap-1 pl-1 pr-1.5 py-0.5 rounded-r-full text-[10px] md:text-xs font-semibold whitespace-nowrap backdrop-blur-xl"
                    style={{ backgroundColor: colors.bg, color: colors.text }}
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
                    className="flex-1 h-[1.5px]"
                    style={{
                        backgroundImage: `repeating-linear-gradient(to right, ${colors.border} 0, ${colors.border} 4px, transparent 4px, transparent 8px)`,
                    }}
                />
            </button>
        );
    }

    const { fractional: startHour } = getLocalParts(event.start, tz);
    const { fractional: endHour } = getLocalParts(event.end, tz);
    const duration = endHour - startHour;
    const HOUR_HEIGHT = 60;
    const top = (startHour - 4) * HOUR_HEIGHT;
    const height = Math.max(duration * HOUR_HEIGHT - 2, 20);
    const tzLabel = getTimezoneLabel(tz);

    return (
        <button
            onClick={() => onClick(event)}
            className="absolute left-0.5 right-0.5 md:left-1 md:right-1 rounded-sm overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer backdrop-blur-xl text-left z-10"
            style={{
                top: `${top}px`,
                height: `${height}px`,
                backgroundColor: colors.bg,
                borderLeft: `3px solid ${colors.border}`,
                color: colors.text,
            }}
        >
            <div className="px-1.5 md:px-2 py-1 h-full flex flex-col">
                <span className="text-[10px] md:text-xs font-semibold leading-tight truncate">
                    {event.title}
                </span>
                {height > 35 && (
                    <span className="text-[9px] md:text-[10px] opacity-70 mt-0.5">
                        {formatTimeInTz(event.start, tz)} – {formatTimeInTz(event.end, tz)}
                    </span>
                )}
                {height > 55 && (
                    <span className="text-[8px] md:text-[9px] opacity-50 mt-0.5">
                        {tzLabel}
                    </span>
                )}
            </div>
        </button>
    );
}

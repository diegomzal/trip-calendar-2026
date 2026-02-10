import type { CalendarItem } from "@/types/event";

interface AllDayRowProps {
    weekDays: Date[];
    markers: CalendarItem[];
    selectedDayIndex: number;
    onEventClick: (event: CalendarItem) => void;
}

function isSameDay(d1: Date, d2: Date): boolean {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

const MARKER_COLORS: Record<string, { bg: string; border: string; text: string }> = {
    red: { bg: "rgba(239, 68, 68, 0.18)", border: "rgba(239, 68, 68, 0.35)", text: "rgb(252, 165, 165)" },
    blue: { bg: "rgba(59, 130, 246, 0.18)", border: "rgba(59, 130, 246, 0.35)", text: "rgb(147, 197, 253)" },
    green: { bg: "rgba(34, 197, 94, 0.18)", border: "rgba(34, 197, 94, 0.35)", text: "rgb(134, 239, 172)" },
    purple: { bg: "rgba(168, 85, 247, 0.18)", border: "rgba(168, 85, 247, 0.35)", text: "rgb(216, 180, 254)" },
    orange: { bg: "rgba(249, 115, 22, 0.18)", border: "rgba(249, 115, 22, 0.35)", text: "rgb(253, 186, 116)" },
};

const DEFAULT_COLOR = { bg: "rgba(148, 163, 184, 0.18)", border: "rgba(148, 163, 184, 0.35)", text: "rgb(203, 213, 225)" };

export function AllDayRow({ weekDays, markers, selectedDayIndex, onEventClick }: AllDayRowProps) {
    if (markers.length === 0) return null;

    return (
        <div className="border-b border-white/[0.08]">
            <div className="hidden md:grid grid-cols-[72px_repeat(7,1fr)]">
                {weekDays.map((day, i) => {
                    const dayMarkers = markers.filter((m) => {
                        const mDate = new Date(m.type === "marker" ? m.date : "");
                        return isSameDay(mDate, day);
                    });
                    return (
                        <div key={i} className="border-r border-white/[0.08] last:border-r-0 p-0.5 min-h-[28px] flex flex-col gap-0.5">
                            {dayMarkers.map((marker, j) => {
                                const colors = MARKER_COLORS[marker.color] || DEFAULT_COLOR;
                                return (
                                    <button
                                        key={j}
                                        onClick={() => onEventClick(marker)}
                                        className="w-full text-left px-1.5 py-0.5 rounded text-xs font-medium truncate transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer backdrop-blur-xl"
                                        style={{
                                            backgroundColor: colors.bg,
                                            borderLeft: `2px solid ${colors.border}`,
                                            color: colors.text,
                                        }}
                                    >
                                        {marker.title}
                                    </button>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            <div className="grid md:hidden grid-cols-[56px_1fr]">
                <div className="p-1 min-h-[28px] flex flex-col gap-0.5">
                    {markers
                        .filter((m) => {
                            const mDate = new Date(m.type === "marker" ? m.date : "");
                            return isSameDay(mDate, weekDays[selectedDayIndex]);
                        })
                        .map((marker, j) => {
                            const colors = MARKER_COLORS[marker.color] || DEFAULT_COLOR;
                            return (
                                <button
                                    key={j}
                                    onClick={() => onEventClick(marker)}
                                    className="w-full text-left px-2 py-1 rounded-md text-xs font-medium truncate transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer backdrop-blur-xl"
                                    style={{
                                        backgroundColor: colors.bg,
                                        borderLeft: `3px solid ${colors.border}`,
                                        color: colors.text,
                                    }}
                                >
                                    {marker.title}
                                </button>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

import { useMemo } from "react";
import type { CalendarItem, CalendarEvent, CalendarMarker } from "@/types/event";
import { CalendarEventBlock } from "./CalendarEvent";
import { isSameDayInTz } from "@/lib/timezone";

const HOUR_HEIGHT = 60;
const START_HOUR = 4;
const END_HOUR = 24;
const TOTAL_HOURS = END_HOUR - START_HOUR;

function formatHourLabel(hour: number): string {
    const h = hour % 24;
    if (h === 0) return "12 AM";
    if (h === 12) return "12 PM";
    return h < 12 ? `${h} AM` : `${h - 12} PM`;
}

function isSameLocalDay(d1: Date, d2: Date): boolean {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

interface TimeGridProps {
    weekDays: Date[];
    timedEvents: CalendarItem[];
    markers: CalendarItem[];
    selectedDayIndex: number;
    onEventClick: (event: CalendarItem) => void;
}

export function TimeGrid({
    weekDays,
    timedEvents,
    markers,
    selectedDayIndex,
    onEventClick,
}: TimeGridProps) {
    const hours = useMemo(
        () => Array.from({ length: TOTAL_HOURS }, (_, i) => START_HOUR + i),
        []
    );

    const now = new Date();
    const currentWeekHasToday = weekDays.some((d) => isSameLocalDay(d, now));
    const todayIndex = weekDays.findIndex((d) => isSameLocalDay(d, now));
    const currentHour = now.getHours() + now.getMinutes() / 60;
    const currentTimeTop = (currentHour - START_HOUR) * HOUR_HEIGHT;

    const daysData = useMemo(() => {
        return weekDays.map((day) => {
            const dayEvents = timedEvents.filter((e) => {
                if (e.type !== "event") return false;
                return isSameDayInTz(e.start, day, e.timezone);
            }) as CalendarEvent[];

            const dayMarkers = markers.filter((m) => {
                if (m.type !== "marker") return false;
                return isSameDayInTz(m.date, day, m.timezone);
            }) as CalendarMarker[];

            return { day, dayEvents, dayMarkers };
        });
    }, [weekDays, timedEvents, markers]);

    const mobileDays = [daysData[selectedDayIndex]];
    const mobileTodayIndex = isSameLocalDay(weekDays[selectedDayIndex], now) ? 0 : -1;

    const gridBackgroundStyle = {
        height: `${TOTAL_HOURS * HOUR_HEIGHT}px`,
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)`,
        backgroundSize: `100% ${HOUR_HEIGHT}px`,
    };

    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
            <div
                className="hidden md:grid grid-cols-[72px_repeat(7,1fr)] relative"
                style={gridBackgroundStyle}
            >
                <div className="relative">
                    {hours.map((hour) => (
                        <div
                            key={hour}
                            className="absolute right-2 flex items-start"
                            style={{
                                top: `${(hour - START_HOUR) * HOUR_HEIGHT}px`,
                                transform: "translateY(-50%)",
                            }}
                        >
                            <span className="text-xs text-white/30 font-light whitespace-nowrap">
                                {formatHourLabel(hour)}
                            </span>
                        </div>
                    ))}
                </div>

                {daysData.map(({ dayEvents, dayMarkers }, colIndex) => (
                    <div
                        key={colIndex}
                        className="relative border-r border-white/[0.06] last:border-r-0"
                    >
                        {dayEvents.map((event, j) => (
                            <CalendarEventBlock
                                key={`e-${j}`}
                                event={event}
                                onClick={onEventClick}
                            />
                        ))}
                        {dayMarkers.map((marker, j) => (
                            <CalendarEventBlock
                                key={`m-${j}`}
                                event={marker}
                                onClick={onEventClick}
                            />
                        ))}
                    </div>
                ))}

                {currentWeekHasToday &&
                    todayIndex >= 0 &&
                    currentHour >= START_HOUR &&
                    currentHour <= END_HOUR && (
                        <div
                            className="absolute pointer-events-none z-20"
                            style={{ top: `${currentTimeTop}px`, left: 0, right: 0 }}
                        >
                            <div className="grid grid-cols-[72px_repeat(7,1fr)]">
                                <div className="flex items-center justify-end pr-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                </div>
                                {weekDays.map((_, i) => (
                                    <div key={i} className={i === todayIndex ? "" : "opacity-0"}>
                                        <div className="h-[2px] bg-red-500 w-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
            </div>

            <div
                className="grid md:hidden grid-cols-[56px_1fr] relative"
                style={gridBackgroundStyle}
            >
                <div className="relative">
                    {hours.map((hour) => (
                        <div
                            key={hour}
                            className="absolute right-2 flex items-start"
                            style={{
                                top: `${(hour - START_HOUR) * HOUR_HEIGHT}px`,
                                transform: "translateY(-50%)",
                            }}
                        >
                            <span className="text-[10px] text-white/30 font-light whitespace-nowrap">
                                {formatHourLabel(hour)}
                            </span>
                        </div>
                    ))}
                </div>

                {mobileDays.map(({ dayEvents, dayMarkers }, colIndex) => (
                    <div key={colIndex} className="relative">
                        {dayEvents.map((event, j) => (
                            <CalendarEventBlock
                                key={`e-${j}`}
                                event={event}
                                onClick={onEventClick}
                            />
                        ))}
                        {dayMarkers.map((marker, j) => (
                            <CalendarEventBlock
                                key={`m-${j}`}
                                event={marker}
                                onClick={onEventClick}
                            />
                        ))}
                    </div>
                ))}

                {mobileTodayIndex >= 0 &&
                    currentHour >= START_HOUR &&
                    currentHour <= END_HOUR && (
                        <div
                            className="absolute pointer-events-none z-20"
                            style={{ top: `${currentTimeTop}px`, left: 0, right: 0 }}
                        >
                            <div className="grid grid-cols-[56px_1fr]">
                                <div className="flex items-center justify-end pr-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                </div>
                                <div className="h-[2px] bg-red-500 w-full" />
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}

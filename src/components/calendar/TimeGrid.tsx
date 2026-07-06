import { useMemo, useRef } from "react";
import type { CalendarEvent, CalendarMarker } from "@/types/event";
import { CalendarEventBlock } from "./CalendarEvent";
import { isSameDayInTz, getFractionalHourInTz, getDatePartsInTz } from "@/lib/timezone";
import { useCalendarContext } from "@/context/CalendarContext";
import { HOUR_HEIGHT, START_HOUR, END_HOUR, TOTAL_HOURS } from "@/lib/constants";

function formatHourLabel(hour: number): string {
    const h = hour % 24;
    if (h === 0) return "12 AM";
    if (h === 12) return "12 PM";
    return h < 12 ? `${h} AM` : `${h - 12} PM`;
}

function HourLabels({ hours, textClass }: { hours: number[]; textClass: string }) {
    return (
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
                    <span className={`${textClass} text-white/30 font-light whitespace-nowrap`}>
                        {formatHourLabel(hour)}
                    </span>
                </div>
            ))}
        </div>
    );
}

function CurrentTimeIndicator({ gutterWidth, currentTimeTop }: { gutterWidth: string; currentTimeTop: number }) {
    return (
        <div
            className="absolute pointer-events-none z-20 flex items-center"
            style={{ top: `${currentTimeTop}px`, left: 0, right: 0 }}
        >
            <div className={`w-[${gutterWidth}] flex items-center justify-end pr-1 shrink-0`}>
                <div className="w-2 h-2 rounded-full bg-red-500" />
            </div>
            <div className="flex-1 border-t-2 border-red-500 border-dotted opacity-50" />
        </div>
    );
}

const SWIPE_MIN_X = 48;

export function TimeGrid() {
    const {
        weekDays,
        timedEvents,
        markers,
        selectedDayIndex,
        currentDate,
        activeTimezone,
        selectDay,
        nextWeek,
        prevWeek,
        canGoNext,
        canGoPrev,
    } = useCalendarContext();

    const touchStart = useRef<{ x: number; y: number } | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start) return;
        const dx = e.changedTouches[0].clientX - start.x;
        const dy = e.changedTouches[0].clientY - start.y;
        // Ignore taps and mostly-vertical gestures (the grid scrolls vertically)
        if (Math.abs(dx) < SWIPE_MIN_X || Math.abs(dx) < Math.abs(dy) * 1.5) return;

        if (dx < 0) {
            if (selectedDayIndex < 6) {
                selectDay(selectedDayIndex + 1);
            } else if (canGoNext) {
                nextWeek();
                selectDay(0);
            }
        } else {
            if (selectedDayIndex > 0) {
                selectDay(selectedDayIndex - 1);
            } else if (canGoPrev) {
                prevWeek();
                selectDay(6);
            }
        }
    };

    const hours = useMemo(
        () => Array.from({ length: TOTAL_HOURS }, (_, i) => START_HOUR + i),
        []
    );

    const now = currentDate;
    const nowParts = getDatePartsInTz(now, activeTimezone);
    const isToday = (d: Date) =>
        d.getFullYear() === nowParts.year &&
        d.getMonth() + 1 === nowParts.month &&
        d.getDate() === nowParts.day;
    const currentWeekHasToday = weekDays.some(isToday);
    const todayIndex = weekDays.findIndex(isToday);
    const currentHour = getFractionalHourInTz(now, activeTimezone);
    const currentTimeTop = (currentHour - START_HOUR) * HOUR_HEIGHT;
    const showTimeLine = currentHour >= START_HOUR && currentHour <= END_HOUR;

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
    const mobileTodayIndex = isToday(weekDays[selectedDayIndex]) ? 0 : -1;

    const gridBackgroundStyle = {
        height: `${TOTAL_HOURS * HOUR_HEIGHT}px`,
        backgroundImage: `linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)`,
        backgroundSize: `100% ${HOUR_HEIGHT}px`,
    };

    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
            <div
                className="hidden md:grid grid-cols-[72px_repeat(7,1fr)] relative"
                style={gridBackgroundStyle}
            >
                <HourLabels hours={hours} textClass="text-xs" />

                {daysData.map(({ dayEvents, dayMarkers }, colIndex) => (
                    <div
                        key={colIndex}
                        className="relative border-r border-white/[0.06] last:border-r-0"
                    >
                        {dayEvents.map((event, j) => (
                            <CalendarEventBlock
                                key={`e-${j}`}
                                event={event}
                            />
                        ))}
                        {dayMarkers.map((marker, j) => (
                            <CalendarEventBlock
                                key={`m-${j}`}
                                event={marker}
                            />
                        ))}
                    </div>
                ))}

                {currentWeekHasToday && todayIndex >= 0 && showTimeLine && (
                    <CurrentTimeIndicator gutterWidth="72px" currentTimeTop={currentTimeTop} />
                )}
            </div>

            <div
                className="grid md:hidden grid-cols-[56px_1fr] relative"
                style={gridBackgroundStyle}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <HourLabels hours={hours} textClass="text-[10px]" />

                {mobileDays.map(({ dayEvents, dayMarkers }, colIndex) => (
                    <div key={colIndex} className="relative">
                        {dayEvents.map((event, j) => (
                            <CalendarEventBlock
                                key={`e-${j}`}
                                event={event}
                            />
                        ))}
                        {dayMarkers.map((marker, j) => (
                            <CalendarEventBlock
                                key={`m-${j}`}
                                event={marker}
                            />
                        ))}
                    </div>
                ))}

                {mobileTodayIndex >= 0 && showTimeLine && (
                    <CurrentTimeIndicator gutterWidth="56px" currentTimeTop={currentTimeTop} />
                )}
            </div>
        </div>
    );
}


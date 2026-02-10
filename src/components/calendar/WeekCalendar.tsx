import { useCalendar } from "@/hooks/useCalendar";
import { WeekHeader } from "./WeekHeader";
import { WeekDayHeader } from "./WeekDayHeader";

import { TimeGrid } from "./TimeGrid";
import { EventDetailModal } from "./EventDetailModal";

export function WeekCalendar() {
    const {
        currentWeekStart,
        selectedDayIndex,
        selectedEvent,
        loading,
        weekDays,
        markers,
        timedEvents,
        nextWeek,
        prevWeek,
        selectDay,
        selectEvent,
        closeEvent,
        canGoPrev,
        canGoNext,
    } = useCalendar();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-[#0a0a0a]">
            <WeekHeader
                currentWeekStart={currentWeekStart}
                onPrev={prevWeek}
                onNext={nextWeek}
                canGoPrev={canGoPrev}
                canGoNext={canGoNext}
            />

            <WeekDayHeader
                weekDays={weekDays}
                selectedDayIndex={selectedDayIndex}
                onSelectDay={selectDay}
            />

            <TimeGrid
                weekDays={weekDays}
                timedEvents={timedEvents}
                markers={markers}
                selectedDayIndex={selectedDayIndex}
                onEventClick={selectEvent}
            />

            <EventDetailModal event={selectedEvent} onClose={closeEvent} />
        </div>
    );
}

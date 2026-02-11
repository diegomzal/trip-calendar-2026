import { CalendarProvider, useCalendarContext } from "@/context/CalendarContext";
import { WeekHeader } from "./WeekHeader";
import { WeekDayHeader } from "./WeekDayHeader";
import { TimeGrid } from "./TimeGrid";
import { EventDetailModal } from "./EventDetailModal";

function WeekCalendarContent() {
    const { loading } = useCalendarContext();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-[#0a0a0a]">
            <WeekHeader />
            <WeekDayHeader />
            <TimeGrid />
            <EventDetailModal />
        </div>
    );
}

export function WeekCalendar() {
    return (
        <CalendarProvider>
            <WeekCalendarContent />
        </CalendarProvider>
    );
}

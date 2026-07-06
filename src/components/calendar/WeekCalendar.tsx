import { CalendarProvider, useCalendarContext } from "@/context/CalendarContext";
import { WeekHeader } from "./WeekHeader";
import { WeekDayHeader } from "./WeekDayHeader";
import { WeekNavBanner } from "./WeekNavBanner";
import { TimeGrid } from "./TimeGrid";
import { EventDetailModal } from "./EventDetailModal";
import { OfflineBanner } from "@/components/OfflineBanner";
import { NowNextBanner } from "@/components/NowNextBanner";

function WeekCalendarContent() {
    const { loading } = useCalendarContext();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-app">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-app">
            <OfflineBanner />
            <WeekHeader />
            <WeekNavBanner />
            <WeekDayHeader />
            <NowNextBanner />
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

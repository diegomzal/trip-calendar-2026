import { CalendarProvider, useCalendarContext } from "@/context/CalendarContext";
import { WeekHeader } from "./WeekHeader";
import { WeekDayHeader } from "./WeekDayHeader";
import { TimeGrid } from "./TimeGrid";
import { EventDetailModal } from "./EventDetailModal";
import { DayMap } from "./DayMap";
import { OfflineBanner } from "@/components/OfflineBanner";
import { TravelerFilter } from "@/components/TravelerFilter";
import { NowNextBanner } from "@/components/NowNextBanner";

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
            <OfflineBanner />
            <WeekHeader />
            <WeekDayHeader />
            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.08]">
                <TravelerFilter />
                <DayMap />
            </div>
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

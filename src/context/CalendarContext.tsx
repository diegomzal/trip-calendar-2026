import { createContext, useContext, type ReactNode } from "react";
import { useCalendar } from "@/hooks/useCalendar";
import { useCurrentDate } from "@/hooks/useCurrentDate";

type CalendarContextValue = ReturnType<typeof useCalendar> & {
    currentDate: Date;
};

const CalendarContext = createContext<CalendarContextValue | null>(null);

export function CalendarProvider({ children }: { children: ReactNode }) {
    const currentDate = useCurrentDate();
    const calendar = useCalendar(currentDate);

    return (
        <CalendarContext.Provider value={{ ...calendar, currentDate }}>
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendarContext(): CalendarContextValue {
    const ctx = useContext(CalendarContext);
    if (!ctx) {
        throw new Error("useCalendarContext must be used within a CalendarProvider");
    }
    return ctx;
}

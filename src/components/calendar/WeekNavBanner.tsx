import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCalendarContext } from "@/context/CalendarContext";

const MONTH_SHORT = [
    "ene", "feb", "mar", "abr", "may", "jun",
    "jul", "ago", "sep", "oct", "nov", "dic",
];

function formatRange(start: Date, end: Date): string {
    if (start.getMonth() === end.getMonth()) {
        return `${start.getDate()} – ${end.getDate()} ${MONTH_SHORT[start.getMonth()]}`;
    }
    return `${start.getDate()} ${MONTH_SHORT[start.getMonth()]} – ${end.getDate()} ${MONTH_SHORT[end.getMonth()]}`;
}

export function WeekNavBanner() {
    const {
        currentWeekStart,
        prevWeek,
        nextWeek,
        canGoPrev,
        canGoNext,
        weekNumber,
        totalWeeks,
    } = useCalendarContext();

    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    return (
        <div className="flex items-center justify-between gap-2 px-3 py-1.5 border-b border-white/[0.08] bg-white/[0.03]">
            <button
                onClick={prevWeek}
                disabled={!canGoPrev}
                className="flex items-center gap-0.5 px-2 py-1.5 rounded-lg text-xs font-medium text-white/60 hover:bg-white/10 hover:text-white/90 active:bg-white/15 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Semana anterior"
            >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Anterior</span>
            </button>

            <div className="flex flex-col items-center leading-tight">
                <span className="text-xs font-semibold text-white/90">
                    Semana {weekNumber} de {totalWeeks}
                </span>
                <span className="text-[10px] text-white/50">
                    {formatRange(currentWeekStart, weekEnd)}
                </span>
            </div>

            <button
                onClick={nextWeek}
                disabled={!canGoNext}
                className="flex items-center gap-0.5 px-2 py-1.5 rounded-lg text-xs font-medium text-white/60 hover:bg-white/10 hover:text-white/90 active:bg-white/15 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Semana siguiente"
            >
                <span className="hidden sm:inline">Siguiente</span>
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}

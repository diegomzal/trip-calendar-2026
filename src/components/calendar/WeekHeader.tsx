import { ChevronLeft, ChevronRight } from "lucide-react";
import { CountdownTimer } from "@/components/CountdownTimer";

const MONTH_NAMES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

interface WeekHeaderProps {
    currentWeekStart: Date;
    onPrev: () => void;
    onNext: () => void;
    canGoPrev: boolean;
    canGoNext: boolean;
}

export function WeekHeader({
    currentWeekStart,
    onPrev,
    onNext,
    canGoPrev,
    canGoNext,
}: WeekHeaderProps) {
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const startMonth = MONTH_NAMES[currentWeekStart.getMonth()];
    const endMonth = MONTH_NAMES[weekEnd.getMonth()];
    const startYear = currentWeekStart.getFullYear();
    const endYear = weekEnd.getFullYear();

    const isCrossMonth = currentWeekStart.getMonth() !== weekEnd.getMonth();
    const isCrossYear = startYear !== endYear;

    let title: React.ReactNode;
    if (isCrossYear) {
        title = (
            <>
                <span className="font-semibold">{startMonth}</span>{" "}
                <span className="font-light text-white/60">{startYear}</span>
                <span className="text-white/40 mx-1">–</span>
                <span className="font-semibold">{endMonth}</span>{" "}
                <span className="font-light text-white/60">{endYear}</span>
            </>
        );
    } else if (isCrossMonth) {
        title = (
            <>
                <span className="font-semibold">{startMonth}</span>
                <span className="text-white/40 mx-1">–</span>
                <span className="font-semibold">{endMonth}</span>{" "}
                <span className="font-light text-white/60">{startYear}</span>
            </>
        );
    } else {
        title = (
            <>
                <span className="font-semibold">{startMonth}</span>{" "}
                <span className="font-light text-white/60">{startYear}</span>
            </>
        );
    }

    return (
        <header className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
            <h1 className="text-2xl md:text-3xl tracking-tight text-white">
                {title}
            </h1>
            <CountdownTimer className="ml-auto mr-4" />
            <div className="flex items-center gap-1">
                <button
                    onClick={onPrev}
                    disabled={!canGoPrev}
                    className="p-2 rounded-full hover:bg-white/10 active:bg-white/15 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                    aria-label="Semana anterior"
                >
                    <ChevronLeft className="w-5 h-5 text-white/70" />
                </button>
                <button
                    onClick={onNext}
                    disabled={!canGoNext}
                    className="p-2 rounded-full hover:bg-white/10 active:bg-white/15 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                    aria-label="Semana siguiente"
                >
                    <ChevronRight className="w-5 h-5 text-white/70" />
                </button>
            </div>
        </header>
    );
}

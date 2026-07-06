import { CountdownTimer } from "@/components/CountdownTimer";
import { LocalClocks } from "@/components/LocalClocks";
import { Phrasebook } from "@/components/Phrasebook";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCalendarContext } from "@/context/CalendarContext";

const MONTH_NAMES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export function WeekHeader() {
    const { currentWeekStart } = useCalendarContext();

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
            <div className="ml-auto mr-3 flex items-center gap-3">
                <CountdownTimer />
                <LocalClocks />
            </div>
            <div className="flex items-center gap-1.5">
                <Phrasebook />
                <ThemeToggle />
            </div>
        </header>
    );
}

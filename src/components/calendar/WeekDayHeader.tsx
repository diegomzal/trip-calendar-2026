const DAY_NAMES_SHORT = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

interface WeekDayHeaderProps {
    weekDays: Date[];
    selectedDayIndex: number;
    onSelectDay: (index: number) => void;
}

function isToday(date: Date): boolean {
    const now = new Date();
    return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
    );
}

export function WeekDayHeader({
    weekDays,
    selectedDayIndex,
    onSelectDay,
}: WeekDayHeaderProps) {
    return (
        <div className="border-b border-white/[0.08]">
            <div className="hidden md:grid grid-cols-[72px_repeat(7,1fr)]">
                <div className="border-r border-white/[0.08]" />
                {weekDays.map((day, i) => {
                    const today = isToday(day);
                    return (
                        <div
                            key={i}
                            className={`flex flex-col items-center py-3 border-r border-white/[0.08] last:border-r-0 ${today ? "text-blue-400" : "text-white/50"
                                }`}
                        >
                            <span className="text-xs font-medium uppercase tracking-wider">
                                {DAY_NAMES_SHORT[i]}
                            </span>
                            <span
                                className={`text-xl font-light mt-0.5 ${today
                                    ? "bg-blue-500 text-white rounded-full w-9 h-9 flex items-center justify-center font-medium"
                                    : ""
                                    }`}
                            >
                                {day.getDate()}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="flex md:hidden gap-1 px-3 py-2 overflow-x-auto scrollbar-none">
                {weekDays.map((day, i) => {
                    const today = isToday(day);
                    const selected = i === selectedDayIndex;
                    return (
                        <button
                            key={i}
                            onClick={() => onSelectDay(i)}
                            className={`flex flex-col items-center shrink-0 px-3 py-1.5 rounded-xl transition-all ${selected
                                ? "bg-white/15 backdrop-blur-xl"
                                : "hover:bg-white/5"
                                }`}
                        >
                            <span
                                className={`text-[10px] font-medium uppercase tracking-wider ${today
                                    ? "text-blue-400"
                                    : selected
                                        ? "text-white/80"
                                        : "text-white/40"
                                    }`}
                            >
                                {DAY_NAMES_SHORT[i]}
                            </span>
                            <span
                                className={`text-base mt-0.5 ${today
                                    ? "bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-medium text-sm"
                                    : selected
                                        ? "text-white font-medium"
                                        : "text-white/40 font-light"
                                    }`}
                            >
                                {day.getDate()}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

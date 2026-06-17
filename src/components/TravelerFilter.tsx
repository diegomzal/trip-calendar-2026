import { TRAVELERS } from "@/lib/travelers";
import { useCalendarContext } from "@/context/CalendarContext";

function chipClass(active: boolean): string {
    return `shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${
        active
            ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
            : "bg-white/[0.05] text-white/50 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white/70"
    }`;
}

export function TravelerFilter() {
    const { selectedTraveler, setTraveler } = useCalendarContext();

    return (
        <div className="flex gap-1.5 overflow-x-auto scrollbar-none flex-1 min-w-0">
            <button
                className={chipClass(!selectedTraveler)}
                onClick={() => setTraveler(null)}
            >
                Todos
            </button>
            {TRAVELERS.map((t) => (
                <button
                    key={t.key}
                    className={chipClass(selectedTraveler === t.key)}
                    onClick={() =>
                        setTraveler(selectedTraveler === t.key ? null : t.key)
                    }
                >
                    <span className="mr-1">{t.emoji}</span>
                    {t.name}
                </button>
            ))}
        </div>
    );
}

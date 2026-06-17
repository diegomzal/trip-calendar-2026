import { useMemo, useState } from "react";
import { Map as MapIcon, Navigation, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useCalendarContext } from "@/context/CalendarContext";
import { formatTimeInTz, formatDateInTz, toInstant } from "@/lib/timezone";
import type { CalendarEvent } from "@/types/event";

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

function encodeStop(e: CalendarEvent): string {
    return e.coordinates
        ? `${e.coordinates.lat},${e.coordinates.lng}`
        : encodeURIComponent(e.location ?? "");
}

export function DayMap() {
    const [open, setOpen] = useState(false);
    const { weekDays, selectedDayIndex, eventsForDay, selectEvent } =
        useCalendarContext();

    const day = weekDays[selectedDayIndex];

    const stops = useMemo(() => {
        if (!day) return [] as CalendarEvent[];
        return eventsForDay(day)
            .filter(
                (it): it is CalendarEvent =>
                    it.type === "event" && (!!it.coordinates || !!it.location)
            )
            .sort(
                (a, b) =>
                    toInstant(a.start, a.timezone).getTime() -
                    toInstant(b.start, b.timezone).getTime()
            );
    }, [day, eventsForDay]);

    const directionsUrl = useMemo(() => {
        if (stops.length === 0) return null;
        if (stops.length === 1)
            return `https://www.google.com/maps/search/?api=1&query=${encodeStop(stops[0])}`;
        const origin = encodeStop(stops[0]);
        const destination = encodeStop(stops[stops.length - 1]);
        const waypoints = stops.slice(1, -1).map(encodeStop).join("|");
        let url = `https://www.google.com/maps/dir/?api=1&travelmode=transit&origin=${origin}&destination=${destination}`;
        if (waypoints) url += `&waypoints=${waypoints}`;
        return url;
    }, [stops]);

    const embedUrl = useMemo(() => {
        if (!MAPS_API_KEY || stops.length < 2) return null;
        const origin = encodeStop(stops[0]);
        const destination = encodeStop(stops[stops.length - 1]);
        const waypoints = stops.slice(1, -1).map(encodeStop).join("|");
        let url = `https://www.google.com/maps/embed/v1/directions?key=${MAPS_API_KEY}&mode=transit&origin=${origin}&destination=${destination}`;
        if (waypoints) url += `&waypoints=${waypoints}`;
        return url;
    }, [stops]);

    const handleStopClick = (e: CalendarEvent) => {
        setOpen(false);
        selectEvent(e);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <button
                onClick={() => setOpen(true)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-white/60 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white/80 transition-all"
                aria-label="Mapa y ruta del día"
                title="Mapa y ruta del día"
            >
                <MapIcon className="w-3.5 h-3.5" />
                Mapa del día
            </button>

            <DialogContent
                showCloseButton={false}
                className="bg-[#1c1c1e]/95 backdrop-blur-2xl border border-white/[0.12] shadow-2xl text-white p-0 overflow-hidden flex flex-col
                    max-md:!fixed max-md:!inset-0 max-md:!translate-x-0 max-md:!translate-y-0 max-md:!top-0 max-md:!left-0 max-md:!max-w-none max-md:!w-screen max-md:!h-dvh max-md:!rounded-none max-md:!border-0
                    md:rounded-2xl md:max-w-2xl md:w-[90vw] md:max-h-[85vh]"
            >
                <DialogHeader className="px-5 pt-5 pb-3 shrink-0">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
                            <MapIcon className="w-5 h-5 text-blue-400" />
                            Ruta del día
                        </DialogTitle>
                        <button
                            onClick={() => setOpen(false)}
                            className="md:hidden p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Cerrar"
                        >
                            <X className="w-5 h-5 text-white/60" />
                        </button>
                    </div>
                    <DialogDescription className="text-white/50 text-sm mt-1">
                        {stops.length > 0
                            ? formatDateInTz(stops[0].start, stops[0].timezone)
                            : "Sin ubicaciones para este día"}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-4 min-h-0">
                    {stops.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-white/30">
                            <MapIcon className="w-8 h-8 mb-3" />
                            <p className="text-sm">Sin ubicaciones para este día</p>
                        </div>
                    ) : (
                        <>
                            {embedUrl && (
                                <div className="rounded-xl overflow-hidden border border-white/[0.08]">
                                    <iframe
                                        title="Ruta del día"
                                        src={embedUrl}
                                        className="w-full aspect-video"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            )}

                            <ol className="space-y-2">
                                {stops.map((e, i) => (
                                    <li key={i}>
                                        <button
                                            onClick={() => handleStopClick(e)}
                                            className="w-full flex items-start gap-3 text-left rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 hover:bg-white/[0.06] transition-colors"
                                        >
                                            <span className="shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold flex items-center justify-center">
                                                {i + 1}
                                            </span>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-white/90 truncate">
                                                    {e.title}
                                                </p>
                                                <p className="text-xs text-white/50 mt-0.5 truncate">
                                                    {formatTimeInTz(e.start, e.timezone)}
                                                    {e.location ? ` · ${e.location}` : ""}
                                                </p>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ol>

                            {directionsUrl && (
                                <a
                                    href={directionsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 text-sm font-medium transition-colors"
                                >
                                    <Navigation className="w-4 h-4" />
                                    Abrir ruta en Google Maps
                                </a>
                            )}
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

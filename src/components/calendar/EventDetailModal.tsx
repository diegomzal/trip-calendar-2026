import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import type { CalendarItem } from "@/types/event";
import { MapPin, Clock, StickyNote } from "lucide-react";
import { formatTimeInTz, formatDateInTz, getTimezoneLabel } from "@/lib/timezone";

interface EventDetailModalProps {
    event: CalendarItem | null;
    onClose: () => void;
}

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

function getGoogleMapsUrl(location: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

function getEmbedUrl(location: string): string {
    return `https://www.google.com/maps/embed/v1/place?key=${MAPS_API_KEY}&q=${encodeURIComponent(location)}`;
}

const COLOR_DOTS: Record<string, string> = {
    blue: "bg-blue-400",
    red: "bg-red-400",
    green: "bg-green-400",
    purple: "bg-purple-400",
    orange: "bg-orange-400",
    emerald: "bg-emerald-400",
    cyan: "bg-cyan-400",
    amber: "bg-amber-400",
    pink: "bg-pink-400",
    indigo: "bg-indigo-400",
};

export function EventDetailModal({ event, onClose }: EventDetailModalProps) {
    if (!event) return null;

    const dotColor = COLOR_DOTS[event.color] || "bg-slate-400";
    const isEvent = event.type === "event";
    const tz = event.timezone;
    const tzLabel = getTimezoneLabel(tz);
    const showMap = !!event.location && !!MAPS_API_KEY;

    return (
        <Dialog open={!!event} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="bg-[#1c1c1e]/80 backdrop-blur-2xl border border-white/[0.12] shadow-2xl rounded-2xl max-w-md mx-auto text-white p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-2">
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${dotColor} shrink-0`} />
                        <DialogTitle className="text-xl font-semibold text-white tracking-tight">
                            {event.title}
                        </DialogTitle>
                    </div>
                    <DialogDescription className="sr-only">
                        Detalles del evento {event.title}
                    </DialogDescription>
                </DialogHeader>

                <div className="px-6 pb-6 space-y-4">

                    <div className="flex items-start gap-3 text-white/70">
                        <Clock className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                        <div className="text-sm">
                            {isEvent ? (
                                <>
                                    <p className="text-white/90 font-medium">
                                        {formatTimeInTz(event.start, tz)} – {formatTimeInTz(event.end, tz)}
                                    </p>
                                    <p className="text-white/50 text-xs mt-0.5">
                                        {formatDateInTz(event.start, tz)}
                                    </p>
                                    <p className="text-white/40 text-[10px] mt-0.5">
                                        {tzLabel}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="text-white/90 font-medium">
                                        {formatDateInTz(event.date, tz)}
                                    </p>
                                    <p className="text-white/40 text-[10px] mt-0.5">
                                        {tzLabel}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>


                    {event.location && (
                        <div className="flex items-start gap-3 text-white/70">
                            <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                            <a
                                href={getGoogleMapsUrl(event.location)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                            >
                                {event.location}
                            </a>
                        </div>
                    )}

                    {showMap && (
                        <div className="rounded-xl overflow-hidden border border-white/[0.08]">
                            <iframe
                                title={`Mapa de ${event.location}`}
                                src={getEmbedUrl(event.location!)}
                                className="w-full aspect-video"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    )}

                    {event.notes && (
                        <div className="flex items-start gap-3 text-white/70">
                            <StickyNote className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                            <p className="text-sm text-white/80 leading-relaxed">
                                {event.notes}
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

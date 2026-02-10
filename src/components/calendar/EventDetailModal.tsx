import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import type { CalendarItem } from "@/types/event";
import { MapPin, Clock, StickyNote, Map, TrainFront } from "lucide-react";
import { formatTimeInTz, formatDateInTz, getTimezoneLabel } from "@/lib/timezone";
import { EVENT_STYLES } from "@/lib/colors";
import { cn } from "@/lib/utils";

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

function getAppleMapsUrl(location: string, coordinates?: { lat: number; lng: number }): string {
    if (coordinates) {
        return `http://maps.apple.com/?ll=${coordinates.lat},${coordinates.lng}&q=${encodeURIComponent(location)}`;
    }
    return `http://maps.apple.com/?q=${encodeURIComponent(location)}`;
}

function getCitymapperUrl(location: string, coordinates?: { lat: number; lng: number }): string {
    if (coordinates) {
        return `https://citymapper.com/directions?endcoord=${coordinates.lat}%2C${coordinates.lng}&endname=${encodeURIComponent(location)}&endaddress=${encodeURIComponent(location)}`;
    }
    return `https://citymapper.com/directions?endname=${encodeURIComponent(location)}&endaddress=${encodeURIComponent(location)}`;
}

export function EventDetailModal({ event, onClose }: EventDetailModalProps) {
    if (!event) return null;

    const styles = EVENT_STYLES[event.color] || EVENT_STYLES.default;
    const isEvent = event.type === "event";
    const tz = event.timezone;
    const tzLabel = getTimezoneLabel(tz);
    const showMap = !!event.location && !!MAPS_API_KEY;

    return (
        <Dialog open={!!event} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="bg-[#1c1c1e]/80 backdrop-blur-2xl border border-white/[0.12] shadow-2xl rounded-2xl w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto text-white p-0 overflow-hidden md:min-h-[500px] flex flex-col">
                <DialogHeader className="px-6 pt-6 pb-2">
                    <div className="flex items-center gap-3">
                        <div className={cn("w-3 h-3 rounded-full shrink-0", styles.dot)} />
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

                    {event.location && (
                        <div className="grid grid-cols-2 gap-2">
                            <a
                                href={getAppleMapsUrl(event.location, event.coordinates)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                            >
                                <Map className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">Apple Maps</span>
                            </a>
                            <a
                                href={getCitymapperUrl(event.location, event.coordinates)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                            >
                                <TrainFront className="w-5 h-5 text-green-500 group-hover:text-green-400 transition-colors" />
                                <span className="text-xs font-medium text-green-500 group-hover:text-green-400 transition-colors">Citymapper</span>
                            </a>
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

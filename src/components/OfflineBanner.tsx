import { WifiOff } from "lucide-react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export function OfflineBanner() {
    const online = useOnlineStatus();
    if (online) return null;

    return (
        <div className="flex items-center justify-center gap-2 px-4 py-1.5 bg-amber-500/15 border-b border-amber-500/25 text-amber-300 text-xs font-medium">
            <WifiOff className="w-3.5 h-3.5 shrink-0" />
            Sin conexión — mostrando itinerario guardado
        </div>
    );
}

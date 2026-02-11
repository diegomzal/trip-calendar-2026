import { useState, useEffect } from 'react';
import { useCurrentDate } from "@/hooks/useCurrentDate";

export function CountdownTimer({ className }: { className?: string }) {
    const currentDate = useCurrentDate();
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);

    useEffect(() => {
        const targetDate = new Date('2026-08-03T00:00:00');

        const offset = currentDate.getTime() - new Date().getTime();

        const calculateTimeLeft = () => {
            const now = new Date();
            const effectiveNow = new Date(now.getTime() + offset);

            const difference = targetDate.getTime() - effectiveNow.getTime();

            if (difference <= 0) {
                setTimeLeft(null);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [currentDate]);

    if (!timeLeft) {
        return null;
    }

    return (
        <div className={`flex items-center gap-2 md:gap-4 text-white ${className}`}>
            <div className="hidden md:block text-sm font-medium text-white/50 uppercase tracking-wider">Trip starts in:</div>
            <div className="flex gap-2 md:gap-4 font-mono text-base md:text-xl text-blue-400">
                <div className="flex flex-col items-center">
                    <span className="leading-none">{timeLeft.days}</span>
                    <span className="text-[8px] md:text-[10px] text-white/40 uppercase mt-0.5">Days</span>
                </div>
                <span className="text-white/20">:</span>
                <div className="flex flex-col items-center">
                    <span className="leading-none">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className="text-[8px] md:text-[10px] text-white/40 uppercase mt-0.5">Hours</span>
                </div>
                <span className="text-white/20 hidden md:block">:</span>
                <div className="flex flex-col items-center hidden md:flex">
                    <span className="leading-none">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className="text-[8px] md:text-[10px] text-white/40 uppercase mt-0.5">Mins</span>
                </div>
                <span className="text-white/20 hidden md:block">:</span>
                <div className="flex flex-col items-center hidden md:flex">
                    <span className="leading-none">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <span className="text-[8px] md:text-[10px] text-white/40 uppercase mt-0.5">Secs</span>
                </div>
            </div>
        </div>
    );
}

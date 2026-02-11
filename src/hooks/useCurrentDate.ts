import { useState, useEffect } from "react";

export function useCurrentDate() {
    const [currentDate, setCurrentDate] = useState<Date>(() => {
        const params = new URLSearchParams(window.location.search);
        const dateParam = params.get("currentDate");
        if (dateParam) {
            const date = new Date(dateParam);
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        return new Date();
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const dateParam = params.get("currentDate");
        if (dateParam) {
            const date = new Date(dateParam);
            if (!isNaN(date.getTime())) {
                setCurrentDate(date);
                return;
            }
        }
    }, []);

    return currentDate;
}

import { useState } from "react";

export function useCurrentDate() {
    const [currentDate] = useState<Date>(() => {
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

    return currentDate;
}

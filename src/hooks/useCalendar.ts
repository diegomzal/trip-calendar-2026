import { useReducer, useEffect, useCallback, useMemo } from "react";
import type { CalendarState, CalendarAction, CalendarItem } from "@/types/event";
import { isSameDayInTz } from "@/lib/timezone";
import { getEventDateStr } from "@/lib/date";

const TRIP_START = new Date(2026, 7, 3); // Aug 3, 2026
const TRIP_END = new Date(2026, 7, 16); // Aug 16, 2026

function getWeekStart(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

function calendarReducer(
    state: CalendarState,
    action: CalendarAction
): CalendarState {
    switch (action.type) {
        case "NEXT_WEEK": {
            const next = new Date(state.currentWeekStart);
            next.setDate(next.getDate() + 7);
            if (next > TRIP_END) return state;
            return { ...state, currentWeekStart: next };
        }
        case "PREV_WEEK": {
            const prev = new Date(state.currentWeekStart);
            prev.setDate(prev.getDate() - 7);
            if (prev < getWeekStart(TRIP_START)) return state;
            return { ...state, currentWeekStart: prev };
        }
        case "SELECT_DAY":
            return { ...state, selectedDayIndex: action.payload };
        case "SELECT_EVENT":
            return { ...state, selectedEvent: action.payload };
        case "CLOSE_EVENT":
            return { ...state, selectedEvent: null };
        case "SET_EVENTS":
            return { ...state, events: action.payload, loading: false };
        default:
            return state;
    }
}

const initialState: CalendarState = {
    currentWeekStart: getWeekStart(TRIP_START),
    selectedDayIndex: 0,
    selectedEvent: null,
    events: [],
    loading: true,
};

export function useCalendar(initialDate: Date = new Date()) {
    const [state, dispatch] = useReducer(calendarReducer, undefined, () => {
        const week1Start = getWeekStart(TRIP_START);
        const week2Start = new Date(week1Start);
        week2Start.setDate(week2Start.getDate() + 7);

        const isWeek2 = initialDate >= week2Start && initialDate <= TRIP_END;
        const weekStart = isWeek2 ? week2Start : week1Start;

        const diffTime = initialDate.getTime() - weekStart.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const dayIndex = diffDays >= 0 && diffDays < 7 ? diffDays : 0;

        return {
            ...initialState,
            currentWeekStart: weekStart,
            selectedDayIndex: dayIndex,
        };
    });

    useEffect(() => {
        fetch("/events.json")
            .then((res) => res.json())
            .then((data: CalendarItem[]) => {
                dispatch({ type: "SET_EVENTS", payload: data });
            })
            .catch((err) => {
                console.error("Failed to load events:", err);
                dispatch({ type: "SET_EVENTS", payload: [] });
            });
    }, []);

    const weekDays = useMemo(() => {
        const days: Date[] = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(state.currentWeekStart);
            d.setDate(d.getDate() + i);
            days.push(d);
        }
        return days;
    }, [state.currentWeekStart]);

    const weekEvents = useMemo(() => {
        return state.events.filter((item) => {
            const dateStr = getEventDateStr(item);
            return weekDays.some((day) => isSameDayInTz(dateStr, day, item.timezone));
        });
    }, [state.events, weekDays]);

    const eventsForDay = useCallback(
        (day: Date): CalendarItem[] => {
            return weekEvents.filter((item) => {
                return isSameDayInTz(getEventDateStr(item), day, item.timezone);
            });
        },
        [weekEvents]
    );

    const markers = useMemo(() => {
        return weekEvents.filter((item) => item.type === "marker");
    }, [weekEvents]);

    const timedEvents = useMemo(() => {
        return weekEvents.filter((item) => item.type === "event");
    }, [weekEvents]);

    const nextWeek = useCallback(() => dispatch({ type: "NEXT_WEEK" }), []);
    const prevWeek = useCallback(() => dispatch({ type: "PREV_WEEK" }), []);
    const selectDay = useCallback(
        (index: number) => dispatch({ type: "SELECT_DAY", payload: index }),
        []
    );
    const selectEvent = useCallback(
        (event: CalendarItem) =>
            dispatch({ type: "SELECT_EVENT", payload: event }),
        []
    );
    const closeEvent = useCallback(() => dispatch({ type: "CLOSE_EVENT" }), []);

    const canGoPrev = state.currentWeekStart.getTime() > getWeekStart(TRIP_START).getTime();
    const canGoNext = new Date(state.currentWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000) <= TRIP_END;

    return {
        ...state,
        weekDays,
        weekEvents,
        markers,
        timedEvents,
        eventsForDay,
        nextWeek,
        prevWeek,
        canGoPrev,
        canGoNext,
        selectDay,
        selectEvent,
        closeEvent,
    };
}

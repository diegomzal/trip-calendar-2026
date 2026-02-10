import { useReducer, useEffect, useCallback, useMemo } from "react";
import type { CalendarState, CalendarAction, CalendarItem } from "@/types/event";
import { isSameDayInTz } from "@/lib/timezone";

const AUGUST_FIRST_WEEK = new Date(2026, 7, 3);

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
            return { ...state, currentWeekStart: next };
        }
        case "PREV_WEEK": {
            const prev = new Date(state.currentWeekStart);
            prev.setDate(prev.getDate() - 7);
            return { ...state, currentWeekStart: prev };
        }
        case "GO_TODAY": {
            return { ...state, currentWeekStart: getWeekStart(new Date()), selectedDayIndex: 0 };
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
    currentWeekStart: getWeekStart(AUGUST_FIRST_WEEK),
    selectedDayIndex: 0,
    selectedEvent: null,
    events: [],
    loading: true,
};

export function useCalendar() {
    const [state, dispatch] = useReducer(calendarReducer, initialState);

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
            const dateStr = item.type === "event" ? item.start : item.date;
            return weekDays.some((day) => isSameDayInTz(dateStr, day, item.timezone));
        });
    }, [state.events, weekDays]);

    const eventsForDay = useCallback(
        (day: Date): CalendarItem[] => {
            return weekEvents.filter((item) => {
                const dateStr = item.type === "event" ? item.start : item.date;
                return isSameDayInTz(dateStr, day, item.timezone);
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
    const goToday = useCallback(() => dispatch({ type: "GO_TODAY" }), []);
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

    return {
        ...state,
        weekDays,
        weekEvents,
        markers,
        timedEvents,
        eventsForDay,
        nextWeek,
        prevWeek,
        goToday,
        selectDay,
        selectEvent,
        closeEvent,
    };
}

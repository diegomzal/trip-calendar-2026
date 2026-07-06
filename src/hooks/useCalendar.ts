import { useReducer, useEffect, useCallback, useMemo } from "react";
import type { CalendarState, CalendarAction, CalendarItem } from "@/types/event";
import { isSameDayInTz, dominantTimezone } from "@/lib/timezone";
import { getEventDateStr } from "@/lib/date";

const TRIP_START = new Date(2026, 7, 3); // Aug 3, 2026
const TRIP_END = new Date(2026, 7, 21); // Aug 21, 2026

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
        let weekStart = getWeekStart(initialDate);
        if (initialDate < TRIP_START) {
            weekStart = getWeekStart(TRIP_START);
        } else if (initialDate > TRIP_END) {
            weekStart = getWeekStart(TRIP_END);
        }

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

    const activeTimezone = useMemo(() => {
        const day = weekDays[state.selectedDayIndex];
        const dayItems = day
            ? weekEvents.filter((it) =>
                  isSameDayInTz(getEventDateStr(it), day, it.timezone)
              )
            : [];
        return dominantTimezone(dayItems.length ? dayItems : weekEvents);
    }, [weekDays, state.selectedDayIndex, weekEvents]);

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

    const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
    const weekNumber =
        Math.round(
            (state.currentWeekStart.getTime() - getWeekStart(TRIP_START).getTime()) / WEEK_MS
        ) + 1;
    const totalWeeks =
        Math.round(
            (getWeekStart(TRIP_END).getTime() - getWeekStart(TRIP_START).getTime()) / WEEK_MS
        ) + 1;

    return {
        ...state,
        weekDays,
        weekEvents,
        markers,
        timedEvents,
        activeTimezone,
        eventsForDay,
        nextWeek,
        prevWeek,
        canGoPrev,
        canGoNext,
        weekNumber,
        totalWeeks,
        selectDay,
        selectEvent,
        closeEvent,
    };
}

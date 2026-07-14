export interface CalendarEvent {
    start: string;
    end: string;
    title: string;
    color: string;
    location?: string;
    coordinates?: { lat: number; lng: number };
    type: "event";
    timezone: string;
    notes?: string;
    /** true = booked, false = requires booking but pending, undefined = no advance booking needed */
    confirmed?: boolean;
}

export interface CalendarMarker {
    date: string;
    title: string;
    color: string;
    location?: string;
    coordinates?: { lat: number; lng: number };
    type: "marker";
    timezone: string;
    notes?: string;
    /** true = booked, false = requires booking but pending, undefined = no advance booking needed */
    confirmed?: boolean;
}

export type CalendarItem = CalendarEvent | CalendarMarker;

export interface CalendarState {
    currentWeekStart: Date;
    selectedDayIndex: number;
    selectedEvent: CalendarItem | null;
    events: CalendarItem[];
    loading: boolean;
}

export type CalendarAction =
    | { type: "NEXT_WEEK" }
    | { type: "PREV_WEEK" }
    | { type: "SELECT_DAY"; payload: number }
    | { type: "SELECT_EVENT"; payload: CalendarItem }
    | { type: "CLOSE_EVENT" }
    | { type: "SET_EVENTS"; payload: CalendarItem[] };

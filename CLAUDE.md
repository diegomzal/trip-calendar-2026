# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Mobile-first PWA that renders a fixed-window week calendar for a 2026 Europe family trip. No backend or auth — all events are read from a static `public/events.json`. UI copy is Spanish; the codebase/comments are English.

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # tsc -b type-check, then vite build
npm run lint     # ESLint (flat config in eslint.config.js)
npm run preview  # Serve the production build
```

There is no test runner configured. Deployment is automatic: pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and deploys to Firebase Hosting (requires the `FIREBASE_SERVICE_ACCOUNT_KEY` GitHub secret).

## Architecture

**Single-screen app.** `App.tsx` renders only `WeekCalendar`, which wraps everything in `CalendarProvider` and shows a spinner until events load. State lives in one place and flows down via context.

- **`hooks/useCalendar.ts`** — the heart of the app. A `useReducer` store holding `currentWeekStart`, `selectedDayIndex`, `selectedEvent`, `events`, `loading`. It fetches `/events.json` on mount, and derives `weekDays`, `weekEvents`, `markers` (point-in-time), `timedEvents` (ranges), and `eventsForDay(day)`. Week navigation is clamped to the trip window by the hardcoded `TRIP_START` / `TRIP_END` constants (Aug 3–21, 2026) — update these here if trip dates change.
- **`context/CalendarContext.tsx`** — composes `useCalendar(currentDate)` with `useCurrentDate()` and exposes everything through `useCalendarContext()`. All calendar components read state from this hook, never via props drilling.
- **`hooks/useCurrentDate.ts`** — returns "now", but honors a `?currentDate=...` URL query param to override the clock. Use this to preview/test the calendar at any trip date (e.g. `?currentDate=2026-08-10`).

**Event model** (`types/event.ts`): a `CalendarItem` is either an `event` (has `start`/`end`, rendered as a positioned block in `TimeGrid`) or a `marker` (has a single `date`, rendered as a point). Both carry a `timezone` and optional `coordinates`/`location`/`notes`.

### Timezone handling — read before touching dates

This is the subtlest part of the codebase. Datetime strings in `events.json` are **naive wall-clock times in the event's local timezone** (e.g. `"2026-08-03T10:15:00"`, no `Z`, no offset) paired with an IANA `timezone` field (e.g. `Europe/Paris`). Note: the README's example JSON shows a trailing `Z` — the actual data does not use it; trust the data and `lib/timezone.ts`.

`lib/timezone.ts` interprets these strings: `parseInTimezone` treats the naive string as if it were UTC, then uses `Intl.DateTimeFormat` to compute and subtract the zone offset, yielding a correct absolute `Date`. **Always** route event date logic through the helpers there (`getLocalParts`, `isSameDayInTz`, `formatTimeInTz`, etc.) — do not `new Date(item.start)` directly, or you'll misplace events across day/zone boundaries. `getTimezoneLabel` maps zones to Spanish city labels with flags; extend `TZ_LABELS` when adding a new destination timezone.

`lib/date.ts` holds local-`Date` helpers and `getEventDateStr(item)` which abstracts the `start` vs `date` field difference between the two item types.

### Other conventions

- **Path alias:** `@/` → `src/` (configured in `vite.config.ts` and `tsconfig`).
- **UI:** Tailwind CSS v4 (no config file — theme is CSS-variable driven in `src/index.css`) + shadcn/ui "new-york" style in `components/ui/`. Dark glassmorphism aesthetic. Event colors come from `lib/colors.ts` (`EVENT_STYLES` keyed by the event's `color` string; falls back to `default`). Add new color keys there, not inline.
- **Calendar grid layout:** time-axis constants (`HOUR_HEIGHT`, `START_HOUR`, `END_HOUR`) live in `lib/constants.ts` — `TimeGrid` and `CalendarEvent` position blocks off these.
- **PWA:** `vite-plugin-pwa` (autoUpdate) with `events.json` precached and served `StaleWhileRevalidate`. `src/pwa.ts` registers the service worker and prompts to reload on new content.

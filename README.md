# Trip Calendar 2026 🗺️

A family trip planner web app for our 2026 Europe trip. View the full itinerary, event details, and locations — all from any device.

## Tech Stack

- **React 19** + **TypeScript** — via Vite 7
- **Tailwind CSS 4** — utility-first styling
- **shadcn/ui** (New York style) — pre-built accessible components
- **Lucide React** — icons

## Features

- 📱 Mobile-first, responsive design
- 🗓️ Calendar view reading events from a local JSON
- 📍 Map integration for events with location data
- 🪟 Apple-inspired glassmorphism UI (soft shadows, ultra-thin borders)
- 🔓 No auth required — open access for the family

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

## Scripts

| Command             | Description                |
| ------------------- | -------------------------- |
| `npm run dev`       | Start Vite dev server      |
| `npm run build`     | Type-check & build for prod|
| `npm run lint`      | Run ESLint                 |
| `npm run preview`   | Preview production build   |

## Event Data

Events live in `public/` as a JSON file. Two event types are supported:

```jsonc
[
  {
    "start": "2026-09-03T14:30:00Z",
    "end": "2026-09-03T16:00:00Z",
    "title": "Museo",
    "color": "blue",
    "location": "lat,lng or Google Maps format",
    "type": "event",
    "notes": "entrar por entrada B"
  },
  {
    "date": "2026-09-04T07:30:00Z",
    "title": "Check-out",
    "color": "red",
    "location": "lat,lng or Google Maps format",
    "type": "marker",
    "notes": "dejar llaves en puerta"
  }
]
```

- **`event`** — has `start` and `end` times (time range)
- **`marker`** — single point in time (`date`)

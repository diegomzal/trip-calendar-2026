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

Events live in `public/events.json`. Two item types are supported:

```jsonc
[
  {
    "start": "2026-09-03T14:30:00",
    "end": "2026-09-03T16:00:00",
    "title": "Museo",
    "color": "blue",
    "location": "Musée du Louvre, Paris",
    "coordinates": { "lat": 48.860611, "lng": 2.337644 },
    "type": "event",
    "timezone": "Europe/Paris",
    "notes": "entrar por entrada B"
  },
  {
    "date": "2026-09-04T07:30:00",
    "title": "Check-out",
    "color": "red",
    "type": "marker",
    "timezone": "Europe/Paris",
    "notes": "dejar llaves en puerta"
  }
]
```

- **`event`** — has `start` and `end` times (time range)
- **`marker`** — single point in time (`date`)

Datetime fields are **naive wall-clock times** (no `Z`, no offset), interpreted in the item's
`timezone` (an IANA zone such as `Europe/Paris`). `timezone` is required on every item.
`location`, `coordinates`, and `notes` are optional.

## Deployment

### Firebase Hosting & GitHub Actions

This project is configured to deploy to **Firebase Hosting** using **GitHub Actions**.

#### Prerequisites

1.  **Firebase Project**: Create a project in the [Firebase Console](https://console.firebase.google.com/).
2.  **Service Account**:
    - Go to **Project Settings** > **Service accounts**.
    - Click **Generate new private key**.
    - This will download a JSON file. **Keep this file safe and do not commit it.**

#### Configuration

1.  **Update Project ID**:
    - Open `.firebaserc` in the root directory.
    - Replace the project alias with your actual Firebase Project ID (if you haven't already).

2.  **Configure GitHub Secrets**:
    - Go to your GitHub repository > **Settings** > **Secrets and variables** > **Actions**.
    - Click **New repository secret**.
    - **Name**: `FIREBASE_SERVICE_ACCOUNT_KEY`
    - **Value**: Paste the *entire content* of the JSON file you downloaded.

#### How it Works

The `.github/workflows/deploy.yml` workflow triggers on every push to `main`. It will:
1.  Install dependencies.
2.  Build the project.
3.  Create a temporary credentials file from your `FIREBASE_SERVICE_ACCOUNT_KEY` secret.
4.  Run `npx firebase-tools deploy --only hosting` to deploy the site.

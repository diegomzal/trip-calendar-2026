# Eurotrip 2026 — Itinerary Rewrite (design)

**Date:** 2026-06-16
**Source of truth for content:** `~/Documents/Itinerario-Eurotrip-Schoncita-2026.md`
**Status:** Approved decisions captured; awaiting spec review before writing the implementation plan.

## 1. Context

`public/events.json` currently encodes an **obsolete trip**: Paris → **London** (Eurostar, British Museum, Wimbledon, Wembley, …) → a single Milan "Check In Polimi Housing" event on Aug 26. The new itinerary is a different journey:

> **Paris (3–7) → Brussels/Bruges (7–9) → Amsterdam (9–11) → Milan (11–14) → Florence + Pisa + Venice (14–17) → Rome (17–20) → back to Milan (20, farewell) → CDG terminal hotel (20 night) → family flies CDG→Lima 05:00 (21).**

London is removed entirely. Diego & Adriana stay to live in Milan; only Omar, Lucy, Yessenia return to Lima. All destinations are in CET/CEST (UTC+2 in August), so — unlike the old Paris↔London leg — there are **no cross-timezone day-boundary hazards** this time.

## 2. Decisions (settled with the user)

1. **Event granularity → Hybrid.** Real fixed times only for trains, flights, and reserved/timed tickets. Everything else becomes named activity blocks at sensible local hours (morning/afternoon/evening). **No** invented per-leg "Transporte a X" events and **no** `(P1/P2/P3)` tags in titles (the old style is dropped).
2. **Phrasebook → French + Dutch + Italian; drop English.** Italian is added (9 days in Italy); English is removed (no English-speaking destination remains).
3. **Trip window → Aug 3–21.** `TRIP_END` moves from Aug 30 to Aug 21. The orphaned Aug 26 "Check In Polimi Housing" event is **removed** (superseded — Diego & Adriana arrive in Milan Aug 11 and stay).

## 3. Scope — files that change

| File | Change |
|---|---|
| `public/events.json` | **Full rewrite** to the new itinerary (Section 5). |
| `src/hooks/useCalendar.ts` | `TRIP_END` → `new Date(2026, 7, 21)` (Aug 21, 2026). `TRIP_START` unchanged. |
| `src/lib/timezone.ts` | `TZ_LABELS`: add `"Europe/Brussels": "🇧🇪 Bélgica"` and `"Europe/Rome": "🇮🇹 Italia"`. Keep `Europe/Paris`, `Europe/Amsterdam`. (`Europe/London` may be removed — harmless to leave; will remove since it is now unused.) |
| `src/data/phrases.ts` | `Phrase` interface: drop `english`, add `italian` + `italianPronunciation`. Translate every phrase to Italian (Spanish-style phonetic, matching the existing `frenchPronunciation` convention). Update the "general" phrase "No hablo francés / neerlandés" to also mention Italian. |
| `src/components/Phrasebook.tsx` | `PhraseCard`: replace the 🇬🇧 English row with a 🇮🇹 Italian row (with pronunciation, green accent). Card order: 🇫🇷 → 🇳🇱 → 🇮🇹 (trip chronology). Search filter: drop `english`, add `italian`. Dialog description: "…en inglés, francés y neerlandés" → "…en francés, neerlandés e italiano". |
| `CLAUDE.md` | Update "`TRIP_START` / `TRIP_END` … (Aug 3–30, 2026)" → "(Aug 3–21, 2026)". |
| `README.md` | Refresh the one-line trip description; fix the example JSON to match real data (naive datetime **without** trailing `Z`, August dates). Low priority but keeps docs truthful. |

**Explicitly unchanged:** `src/lib/colors.ts` (existing keys cover the palette), `src/components/CountdownTimer.tsx` (still targets Aug 3), `src/lib/constants.ts` grid hours (see §6 note on the 3 AM counter), the calendar reducer/context plumbing, PWA config.

## 4. Conventions for the rewritten `events.json`

**Color palette (reusing existing `EVENT_STYLES` keys):**
- `orange` — transit (trains, flights, ferries used as transport)
- `green` — check-in / check-out / drop bags / hotel
- `emerald` — meals, dinners, aperitivo, free time
- `indigo` — landmarks & monuments (Eiffel, Versailles, Duomo, Colosseum, San Marcos, Ponte Vecchio, Notre-Dame…)
- `purple` — museums (Louvre, Orsay, Médecine, Vrolik, Rijks/Van Gogh, Leonardo, Uffizi, Accademia, Vaticanos, Borghese, Brera)
- `amber` — Roland Garros (tennis/stadium)
- `pink` — shopping / vintage / thrift / markets
- `cyan` — boat & water experiences (Seine cruise, Amsterdam canals, Como ferry, Venice vaporetto)
- `blue` — admin / formalities (CDG immigration, permesso di soggiorno)
- `red` — hard-deadline items (the CDG→Lima departure)

**Timezones:** Paris→`Europe/Paris`; Brussels/Bruges→`Europe/Brussels`; Amsterdam→`Europe/Amsterdam`; Milan/Florence/Venice/Pisa/Rome→`Europe/Rome`. Transit events carry the **departure** city's timezone.

**Encoding the itinerary's richness in `notes` (not in titles):**
- `🎟️` reservation status and `⭐ <traveler> (<affinity>)` affinity tags go in `notes`.
- Titles stay clean and Spanish (UI copy is Spanish). A leading `🎟️` on reserved-item titles is acceptable but optional.
- Warnings (Ferragosto on Aug 15, "cierra lunes", "solo tardes") go in `notes`.

**Coordinates:** include `lat`/`lng` for principal mappable POIs (landmarks, museums, stations, airports) so the map works. Generic "free time / dinner in neighborhood" blocks may omit coordinates or use a neighborhood centroid. Coordinates are supplementary (map is a nice-to-have), authored carefully during implementation.

**Block-time defaults** (when no fixed time is dictated): morning ≈ 09:00–13:00, lunch ≈ 13:00–14:00, afternoon ≈ 14:30–18:30, dinner/evening ≈ 20:00–22:00. Adjust per day for fixed anchors.

## 5. `events.json` content plan (the implementation contract)

Fixed anchors (🔒) are reservation/transit times to honor; other times are reasonable blocks.

### 🇫🇷 Paris — `Europe/Paris`
- **Mon Aug 3 — Llegada + Barrio Latino:** CDG llegada/trámites `blue` (09:00–11:00, CDG coords) · traslado + check-in `green` (11:00–12:30) · Île de la Cité / Notre-Dame ext / Sainte-Chapelle / Barrio Latino / Sena `indigo` (13:30–18:00) · *opcional* Montmartre + Sacré-Cœur atardecer `indigo` (18:30–20:30).
- **Tue Aug 4 — Oeste + tenis:** 🔒 Roland Garros tour `amber` (10:00–12:00; ⭐ Diego/Omar/Lucy/Adriana — tour del estadio, no museo) · 🔒 Torre Eiffel + Trocadéro + Campo de Marte `indigo` (13:00–16:00) · Arco del Triunfo + Campos Elíseos `indigo` (16:30–18:30) · paseo en barco Sena (Bateaux-Mouches) `cyan` (20:30–22:00). *(Louvre cerrado los martes.)*
- **Wed Aug 5 — Louvre + arte + medicina:** 🔒 Louvre `purple` (09:30–13:00; ⭐ Yessenia) · Musée d'Histoire de la Médecine `purple` (14:30–16:00; solo tardes/miércoles; ⭐ Omar y Lucy) · Marais + Musée d'Orsay (opcional) `pink`/`purple` (16:30–18:30; ⭐ Yessenia).
- **Thu Aug 6 — Versalles:** 🔒 Palacio de Versalles día completo `indigo` (09:00–16:00; RER C; ⭐ Omar; cierra lunes; ir temprano) · regreso + cena tranquila `emerald` (18:30–20:30).
- **Fri Aug 7 — Salida:** check-out `green` (06:00–06:30; hasta 9:00) · 🔒 Tren París → Bruselas `orange` (07:00–08:25, ~1h25, Eurostar/TGV).

### 🇧🇪 Brussels / Bruges — `Europe/Brussels`
- **Fri Aug 7 — Llegada + Barrio Europeo:** check-in + maletas `green` (09:00–10:00) · Grand-Place / Manneken Pis / Galerías Saint-Hubert / waffles+chocolate `indigo` (10:30–14:00) · Barrio Europeo: Parlamentarium + House of European History `purple` (15:00–18:00; gratis; ⭐ Lucy — política).
- **Sat Aug 8 — Brujas día completo:** 🔒 Tren Bruselas → Brujas `orange` (09:00–10:00, ~1h, cada hora) · Brujas: canales en bote, Markt + Belfort, Basílica de la Santa Sangre, Begijnhof, chocolate `indigo` (10:00–17:00) · regreso a Bruselas `orange` (17:30–18:30).
- **Sun Aug 9 — Salida:** 🔒 Tren Bruselas → Ámsterdam `orange` (09:00–11:00, ~2h).

### 🇳🇱 Amsterdam — `Europe/Amsterdam`
- **Sun Aug 9 — Tarde:** check-in `green` (11:30–12:30) · paseo en barco por canales `cyan` (13:30–15:00) · Jordaan / Dam / Begijnhof + vintage (Vintage of Amsterdam, Vindit) `pink` (15:00–18:00; ⭐ Yessenia).
- **Mon Aug 10 — A fondo:** 🔒 Casa de Ana Frank `purple` (09:00–10:00; horario fijo, reservar ~6 semanas antes — agota en minutos) · Rijksmuseum y/o Van Gogh `purple` (10:30–13:30; ⭐ Yessenia) · Museum Vrolik `purple` (14:30–16:00; Lun–Vie 11–17; ⭐ Omar y Lucy — anatómico) · Moco + De Pijp vintage + Vondelpark `pink` (16:30–19:00; ⭐ Yessenia).
- **Tue Aug 11 — Salida:** 🔒 Vuelo AMS → Milán `orange` (08:00–10:00; 🛂 guardar pases de abordar = prueba de ingreso a Italia).

### 🇮🇹 Milan — `Europe/Rome`
- **Tue Aug 11 — Llegada:** check-in `green` (12:00–13:00) · 🔒 Duomo + terrazas + Galería Vittorio Emanuele II + Piazza della Scala `indigo` (15:00–18:00; subir a terrazas) · cena de bienvenida milanesa `emerald` (20:00–22:00; Al Matarel / Trattoria Milanese; reservar; ⭐ Adriana) · **marker** 🛂 Inicio plazo permesso di soggiorno `blue` (notes: 8 días laborables desde ingreso a Italia; guardar pases AMS→Milán).
- **Wed Aug 12 — Milán clásico + permesso:** 🛂 Trámite permesso (kit postal, Sportello Amico) `blue` (09:00–10:30; notes con checklist: pasaporte+visa, codice fiscale, 4 fotos, constancia Polimi, prueba alojamiento, seguro, marca da bollo €16, tasas; Plan B 14 temprano o 20) · Santa Maria delle Grazie (basílica) `indigo` (11:00–11:30; gratis, claustro de Bramante) · 🔒 Museo Leonardo da Vinci (Ciencia y Tecnología) `purple` (11:45–13:45; ⭐ Diego — tech) · Castello Sforzesco + Parque Sempione `indigo` (14:30–16:00) · Pinacoteca di Brera + Quadrilatero della Moda + vintage Brera `pink` (16:00–18:00; ⭐ Yessenia) · aperitivo en los Navigli `emerald` (19:00–21:00; ⭐ Adriana).
- **Thu Aug 13 — Lago de Como:** 🔒 Tren Milán → Varenna `orange` (08:30–09:30, ~1h) · Varenna (Villa Monastero) → ferry → Bellagio → opcional Menaggio `cyan` (09:30–17:00; ⭐ Omar — geografía) · regreso a Milán `orange` (17:30–18:30).
- **Fri Aug 14 — Salida:** 🔒 Tren Milán → Florencia `orange` (07:00–09:00, ~1h50; Diego & Adriana dejan maletas grandes en Milán).

### 🇮🇹 Florence (+ Pisa, Venice) — `Europe/Rome`
- **Fri Aug 14 — A fondo:** check-in / maletas `green` (09:15–10:00) · 🔒 Galería Uffizi `purple` (10:00–12:30; ⭐ Yessenia; cierra lunes) · 🔒 Accademia — el David `purple` (13:30–14:30; cierra lunes) · Duomo ext + Piazza della Signoria + Ponte Vecchio (atardecer) `indigo` (15:00–18:30) · Mercado de cuero San Lorenzo / Mercato Nuovo `pink` (incluido en la tarde; ⭐ Yessenia) · cena bistecca alla fiorentina `emerald` (20:00–22:00; Dall'Oste / La Bistecca; ⭐ Adriana).
- **Sat Aug 15 — Pisa + Florencia (⚠️ Ferragosto):** 🔒 Tren Florencia → Pisa `orange` (09:00–10:00, ~1h) · Piazza dei Miracoli (Torre, Catedral, Baptisterio) `indigo` (10:00–13:00; notes Ferragosto) · regreso a Florencia `orange` (13:30–14:30) · cúpula del Duomo/Campanile o Boboli–Palazzo Pitti o Oltrarno (vintage) `indigo`/`pink` (15:00–18:30).
- **Sun Aug 16 — Venecia (day trip):** 🔒 Tren Florencia → Venecia `orange` (07:30–09:45, ~2h–2h15) · Plaza San Marcos + Basílica, 🔒 Palacio Ducal, Puente de Rialto, vaporetto Gran Canal `indigo` (10:00–17:00; ⭐ Yessenia) · regreso a Florencia `orange` (18:00–20:15).
- **Mon Aug 17 — Salida:** 🔒 Tren Florencia → Roma `orange` (07:00–08:40, ~1h35, Frecciarossa).

### 🇮🇹 Rome — `Europe/Rome`
- **Mon Aug 17 — Roma antigua + centro:** check-in / maletas `green` (08:45–09:30) · 🔒 Coliseo + Foro Romano + Palatino `indigo` (10:00–13:30; entrada combinada con horario; ⭐ Omar; gorra+agua) · Panteón + Piazza Navona + Campo de' Fiori `indigo` (16:00–20:00, a pie).
- **Tue Aug 18 — Vaticano:** 🔒 Museos Vaticanos + Capilla Sixtina `purple` (08:30–12:00; reserva imprescindible, temprano; ⭐ Yessenia) · Basílica de San Pedro (cúpula opcional) `indigo` (12:00–13:30) · Castel Sant'Angelo + orilla del Tíber `indigo` (15:30–18:00).
- **Wed Aug 19 — Roma a tu ritmo:** Fontana di Trevi + Plaza de España `indigo` (09:30–11:30) · 🔒 Galería Borghese `purple` (13:00–15:00; reserva obligatoria con horario; Bernini/Caravaggio; ⭐ Yessenia) · vintage en Monti (Blue Goose, Pifebo, Humana) `pink` (15:30–18:00; ⭐ Yessenia) · cena en Trastevere `emerald` (20:00–22:00; Nannarella / Da Enzo; ⭐ Adriana).
- **Thu Aug 20 — Salida + despedida:** 🔒 Tren Roma → Milán `orange` (08:00–11:00, ~3h) · instalación final + almuerzo de cierre + fotos `emerald` (12:00–16:00; despedida) · traslado al aeropuerto `orange` (16:30–17:30) · 🔒 Vuelo Milán → París CDG `orange` (18:30–20:15, ~1h45; Omar/Lucy/Yessenia; idealmente a CDG).

### ✈️ Close — `Europe/Paris`
- **Thu Aug 20 (noche):** llegada a CDG + hotel en terminal `green` (20:30–21:30; 🏨 hotel dentro de la terminal, no salen del aeropuerto).
- **Fri Aug 21:** 🔒 Vuelo CDG → Lima `red` (05:00–05:30; notes: "Counter ~3:00 AM"; fin del viaje para Omar/Lucy/Yessenia; Diego y Adriana se quedan en Milán).

## 6. Known limitations / notes

- **3 AM check-in counter on Aug 21:** the grid's `START_HOUR` is 4, so a 03:00 counter time can't render as a block. It lives in the flight event's `notes` instead. We deliberately do **not** lower `START_HOUR` (it would add dead space to every other day). Revisit only if the user wants the counter visible on the grid.
- **One label per Italian timezone:** all Italian cities share `Europe/Rome` → the city chip reads "🇮🇹 Italia"; the specific city is conveyed by each event's `location`. Same for Belgium ("🇧🇪 Bélgica") covering Brussels + Bruges.
- **Default-plan choice:** the itinerary's §4 offers an alternative (family flies Roma→Paris direct on Aug 20). We follow the **default** (closing in Milan), as the itinerary author chose.

## 7. Verification plan

- `npm run build` (tsc + vite) and `npm run lint` clean.
- `events.json` is valid JSON; every item has `type` + `timezone`; every `color` is a key in `EVENT_STYLES`; events have `start`+`end`, markers have `date`.
- Spot-check rendering with the `?currentDate=` override per week (e.g. `2026-08-04` Paris, `2026-08-08` Bruges, `2026-08-10` Amsterdam, `2026-08-12` Milan, `2026-08-16` Venice day-trip, `2026-08-19` Rome, `2026-08-21` departure) — confirm each event lands on the intended day and the timezone chip is correct.
- Confirm week navigation clamps to Aug 3 ↔ Aug 21 (no Aug 26 event, can't page past the Aug 21 week).
- Phrasebook: open it, confirm 🇫🇷/🇳🇱/🇮🇹 rows render, no 🇬🇧, search matches Italian text.

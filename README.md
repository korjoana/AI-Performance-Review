# Performance Tracker

A small web app for tracking your work achievements over time and turning
them into a promotion packet.

## What it does

- **Log achievements** — title, date, competency, description, and
  quantified impact, tagged and optionally linked to supporting evidence
  (a doc, PR, dashboard).
- **Dashboard** — totals, this-quarter count, and a breakdown of
  achievements by competency (Technical Excellence, Impact & Ownership,
  Leadership & Mentorship, Collaboration & Communication, Strategic
  Thinking).
- **Goals** — track the milestones you're aiming for on the way to your
  next level, with status (not started / in progress / achieved).
- **Promotion document** — generates a structured promotion packet from
  your logged achievements and goals, grouped by competency, with an
  executive summary you edit yourself. Export as Markdown, copy to
  clipboard, or print/save as PDF.
- **Data** — everything is stored locally in your browser
  (`localStorage`). Export a JSON backup any time, or import one to
  restore or move to another device.

All data stays local — there is no backend and nothing is sent anywhere.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. Use **Load example data** on first run to
see the app populated with sample achievements and goals, or start
logging your own right away.

## Building

```bash
npm run build   # type-checks and builds to dist/
npm run lint    # oxlint
```

## Tech

Vite + React + TypeScript + Tailwind CSS, with all state persisted to
`localStorage`.

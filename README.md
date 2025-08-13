# Thapar Mathematical Society (TMS) — Website

Modern React site built with Vite and MUI. Dark theme by default, smooth scroll animations, event pages, gallery lightbox, and a responsive team layout.

## Quick Start

Prerequisites:
- Node.js 18+ and npm

Install dependencies:
```bash
npm install
```

Start the dev server:
```bash
npm run dev
```
The app runs at http://localhost:5173.

Build for production:
```bash
npm run build
npm run preview   # optional: preview the build locally
```

## Project Structure
- `src/App.jsx` — Home, Gallery, Team, and Events sections; theme and animations.
- `src/EventPage.jsx` — Individual event page and photo grid.
- `src/data/events.js` — Event metadata (title, date, cover, photos, slug).
- `public/` — Static images for events, gallery, and team.
- `index.html` — Metadata, fonts, and manifest.

## Editing Content
Events list and photos:
- Edit `src/data/events.js`.
- Each event entry has: `title`, `date`, `slug`, `cover`, and `photos` array.
- Put event images under `public/events/<year>/<event-name>/...` and reference them with absolute paths starting with `/events/...`.

Gallery:
- Images live under `public/gallery/<year>/...`.
- Year tabs are derived from keys in `galleryData` inside `src/App.jsx`.

Team:
- Team photos live in `public/team/<year>/...`.
- Team cards are defined in the Team section of `src/App.jsx`. Keep the 3–2–4 layout; images use a 4:5 aspect ratio.

Branding:
- The primary accent uses `rgb(61, 33, 117)` in dark mode (`theme.palette.secondary`).
- Hero font: Space Grotesk (loaded in `index.html`).

## Tips
- To add more images, prefer WebP/AVIF for faster loads; keep names URL-safe.
- For smooth deploys on static hosts (GitHub Pages/Netlify/Vercel), serve the `dist/` folder created by `npm run build`.

## Commands
- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run preview` — preview the production build locally

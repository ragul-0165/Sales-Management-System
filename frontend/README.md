# Sales Management System Dashboard (Frontend)

React + Vite single-page app for browsing and filtering the retail sales dataset served by the backend API (MongoDB). Written for an interview submission: concise, clear, and plagiarism-free.

## Tech Stack
- React 19 with Vite
- Plain CSS stylesheets (no Tailwind / no UI framework)
- Icons from `lucide-react` and `react-icons`

## App Overview
- Filter bar with region, gender, age range, category, tags, payment method, date presets, and sorting controls.
- Metric cards that summarize the current result set.
- Paginated sales table that reflects active filters and sort selection.
- Responsive design that works across different screen sizes.
- Graceful error handling with user feedback for failed API requests.
- All data comes from the backend endpoint at `http://localhost:4000/api/sales` (configure `VITE_API_URL`).

## Project Structure
```
frontend/
  src/
    main.jsx              # React entry
    App.jsx               # Page composition + data fetch lifecycle
    services/api.js       # Fetch helper for sales endpoint
    assets/               # Static assets (logo)
    components/
      FilterBar.jsx       # Controls for filters/sort
      MetricCards.jsx     # Summary stats
      SalesTable.jsx      # Paginated table
      Layout.jsx          # Page shell
    hooks/                # Custom React hooks (with README)
    styles/               # Global + component styles
    utils/                # Utility functions (with README)
  package.json
  vite.config.js
```

## Getting Started
Prereqs: Node 18+ recommended. Start the backend on port `4000` first (see backend README).

```bash
cd frontend
npm install
npm run dev    # starts Vite on http://localhost:5173
```

If your backend runs on a different host/port, update `API_URL` in `src/services/api.js`.

## Usage Notes
- Filters reset the page to 1 to keep pagination consistent.
- Sort options cover customer name, quantity, and date (asc/desc).
- Page size is controlled by the backend (currently 10 items).

## Scripts
- `npm run dev` — local development with HMR
- `npm run build` — production bundle
- `npm run preview` — preview the built bundle
- `npm run lint` — run ESLint with the project rules

This frontend is optimized for clean filtering, fast lookups, and accurate representation of the dataset, aligned with the assignment’s Figma design.

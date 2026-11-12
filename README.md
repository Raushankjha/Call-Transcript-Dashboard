# Call Transcript Dashboard

A production-minded React + TypeScript single-page dashboard built for the Adstia Agency. It loads the supplied `calls.json` locally and provides composable URL-backed filtering, transcript search/highlighting, sorting, pagination, live summary metrics, and an accessible call detail panel.

## Setup

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. For a production build:

```bash
npm run build
npm run preview
```

## Architecture

- `src/components/` - focused presentational/interaction components
- `src/hooks/` - data loading and URL filter state hooks
- `src/services/` - local JSON fetch boundary and runtime validation
- `src/types/` - TypeScript domain models
- `src/utils/` - filtering, sorting, formatting helpers
- `src/constants/` - dashboard defaults and labels
- `public/data/calls.json` - supplied static data feed

The page size is deliberately 20: enough context for scanning while keeping each page manageable on laptops and mobile. Filters, search, sort and page are encoded in URL query parameters so refreshes preserve state. The detail drawer does not mutate the URL/filter state and restores the captured scroll position on close.

## Challenges

The main challenge was keeping every filter composable while also making state refresh-safe. I centralized filter state in a URL-backed hook, then derived the filtered/sorted data with memoization. Another detail was preserving the exact list context when opening a call: the drawer captures the current scroll offset, locks background scrolling, and restores that offset when it closes. The supplied feed is also treated as external data, so the fetch service validates record shape and gracefully handles nullable sentiment and empty transcripts.

## AI usage

AI tools were used for scaffolding, implementation support, styling suggestions, debugging/type-check review, and README drafting. The final application structure, task coverage, local-data integration, URL-state behavior, responsive UI, and production build were reviewed against the supplied assignment requirements.

## Requirement coverage

- Sortable agent, duration, timestamp, outcome and sentiment columns
- 20-row pagination
- Multi-select agent and outcome filters
- Date range and duration min/max filters
- Composable filters persisted in URL query parameters
- Transcript full-text search with match highlighting
- Row detail drawer with full metadata and transcript
- Detail close restores page/filter state and scroll position
- Live total, average duration and outcome summary
- Designed loading, error and empty states
- Responsive layout with horizontally scrollable table on narrow screens
- No backend, auth, CRUD, database or deployment code

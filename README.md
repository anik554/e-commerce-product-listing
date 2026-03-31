# Premium Products

A responsive React product listing application with search, filtering, pagination, and graceful error handling for a flaky API.

---

## Tech Stack

- **React 18** with TypeScript
- **Vite** — dev server and build tooling
- **Tailwind CSS** — utility-first styling
- **Lucide React** — icons

---

## Features

- Product grid with responsive layout (1 → 2 → 3 → 5 columns)
- Debounced search to minimize API calls
- Category filter (Electronics, Clothing, Home, Outdoors)
- Pagination with configurable page size
- Skeleton loading UI matched to the current breakpoint
- Error state with one-click retry for flaky API responses
- Empty state for no-results scenarios

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/anik554/e-commerce-product-listing.git
cd your-repo
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

Output is generated in the `dist/` folder.

### Preview production build

```bash
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── DebouncedSearch.tsx   # Search input with debounce
│   ├── ErrorState.tsx        # Error UI with retry button
│   ├── Pagination.tsx        # Page navigation + limit selector
│   ├── ProductCard.tsx       # Individual product tile
│   └── SkeletonCard.tsx      # Loading placeholder card
├── hooks/
│   ├── useBreakpoint.ts      # Responsive breakpoint detector
│   └── useProducts.ts        # Data fetching + state hook
└── App.tsx                   # Root layout and filter state
```


## Deployment (Vercel)

### Option A — Vercel dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Vite — no extra config needed
4. Set environment variables under **Settings → Environment Variables**
5. Click **Deploy**

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

### Build settings

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |

add a `vercel.json` at the project root to prevent 404s on page refresh:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Key Design Decisions

See [DECISIONS.md](./DECISIONS.md) for a full breakdown of architectural choices, trade-offs, AI tool usage, and known edge cases.

---

## Known Limitations

- Filter state resets on page refresh (not synced to URL)
- No client-side cache — every filter change triggers a fresh API request
- No retry backoff on the error state retry button
- `limit` change does not reset `page` to 1


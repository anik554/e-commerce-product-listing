
## 1. State Management & Architecture

*Why did you structure your state the way you did? Which patterns did you choose for handling the flaky API requests, loading states, and error handling?*

All filter state (`page`, `limit`, `category`, `search`) lives in `App.tsx` as a single source of truth. This makes interdependencies explicit — for example, resetting `page` to `1` whenever a filter or search value changes is a one-liner rather than something coordinated across multiple components.

Data fetching is encapsulated in a custom `useProducts` hook that returns `{ data, isLoading, error, refetch }`. This keeps `App.tsx` focused on layout and composition rather than fetch mechanics. The hook handles the flaky API by exposing a `refetch` function, which is wired to a retry button in the `ErrorState` component — giving users a clear, low-friction recovery path without a full page reload.

Loading states are managed with a `SkeletonCard` grid whose count is derived from the current breakpoint via `useBreakpoint`. This prevents layout shift and makes the loading experience feel proportional to the real content.

For search, a `DebouncedSearch` component delays the state update until the user pauses typing, preventing a flood of API calls on every keystroke.

---

## 2. Trade-offs and Omissions

*What did you intentionally leave out given the constraints of a take-home assignment? If you had more time, what would you prioritize next?*

**Intentionally left out:**
- **URL-synced filters** — `page`, `category`, and `search` are held in React state rather than the URL query string. This means filters reset on refresh, which is a real usability gap but was deprioritized to keep scope tight.
- **Optimistic updates / caching** — there is no client-side cache (e.g. React Query or SWR). Every filter change triggers a fresh fetch. A caching layer would dramatically reduce redundant requests against the flaky API.
- **Accessibility audit** — the filter select and search input have basic semantics but have not been tested with a screen reader or against WCAG 2.1 AA criteria.
- **Unit & integration tests** — given time constraints, testing was omitted. The custom hooks (`useProducts`, `useBreakpoint`) and pagination logic are the highest-priority units to cover first.

**If I had more time, I would prioritize:**
1. Replacing the manual fetch logic with React Query for automatic retries, background refetching, and stale-while-revalidate behavior — a natural fit for a flaky API.
2. Syncing filter state to the URL so results are shareable and survive a refresh.
3. Adding keyboard navigation and ARIA labels to the filter controls.
4. Writing tests for the core hook and pagination edge cases.

---

## 3. AI Usage

*How did you utilized AI tools (ChatGPT, Copilot, Cursor, etc.) during this assignment? Provide a brief summary of how they assisted you.*

I used Claude (Anthropic) as a development assistant throughout the assignment in the following ways:

- **Component scaffolding** — used it to generate the initial structure of `SkeletonCard`, `ErrorState`, and `DebouncedSearch`, then reviewed and adjusted the output to fit the project's patterns.
- **Header redesign** — iterated on the header UI through a back-and-forth conversation, using it to produce and refine the JSX and inline styles for the updated design (purple accent palette, stats strip, category tag pills).
- **Vercel deployment config** — asked Claude to confirm the correct `vercel.json` rewrite rule for React Router and the right output directory for a Vite project.
- **This document** — the structure and answers in this decisions file were drafted with Claude's assistance based on the actual codebase and conversation history.

All AI-generated code was read, understood, and manually reviewed before being used. Nothing was accepted blindly.

---

## 4. Edge Cases Identified

*Did you notice any edge cases or bugs that you didn't have time to fix? Please list them here.*

- **Race conditions on rapid filter changes** — if a user changes the category filter twice in quick succession, two requests are in-flight simultaneously. Whichever resolves last wins, which can result in stale data being displayed. A proper fix requires request cancellation via `AbortController` inside the fetch hook.
- **`limit` change not resetting `page`** — changing the items-per-page selector does not reset to page 1. If the user is on page 5 with a limit of 5 and switches to a limit of 20, the request may return no results or an unexpected offset.
- **Empty state message imprecision** — when both a search term and a category filter are active and return zero results, the empty state message only conditionally mentions the category. It could be more descriptive about the combined filter state.
- **No retry rate limiting** — the retry button in `ErrorState` has no backoff or maximum retry count. A user could hammer it against the flaky API indefinitely. An exponential backoff strategy would improve resilience.
- **Breakpoint mismatch on first render** — `useBreakpoint` may return a default value before it reads the actual window size, causing the skeleton card count to briefly mismatch the final grid layout on the very first load.
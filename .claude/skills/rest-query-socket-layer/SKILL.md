---
name: rest-query-socket-layer
description: Use when working on a frontend that layers REST fetching (Axios or fetch) with TanStack Query (React Query) caching, and optionally a Socket.IO (or similar WebSocket) channel used purely to push invalidation events rather than data. Triggers on requests like "add a query for X", "add a mutation for X", "wire up useQuery/useMutation", "add a resource/endpoint hook", or when touching an HTTP client wrapper, a query-key factory, a per-resource query/repository class, root providers, or a socket provider in a Next.js/React/Vue app. Also use to review or extend an existing implementation of this pattern for consistency.
---

# REST + TanStack Query + socket-invalidation layer

This skill describes a layered data-fetching architecture seen across
several projects: a thin HTTP client, generic CRUD base class, per-resource
query classes, a centralized query-key factory, TanStack Query hooks, and a
Socket.IO (or equivalent) channel that pushes *invalidation signals* rather
than data. Apply the shape below, but first locate the actual files in the
target repo — names and locations vary per project (e.g. `lib/`, `src/api/`,
`services/`); don't assume the exact paths from this doc exist verbatim.

## The layers (bottom to top)

1. **HTTP client wrapper** (e.g. `lib/axios.ts`, `src/api/client.ts`) —
   a single shared Axios (or fetch-wrapper) instance with base URL read from
   an env var. There should be exactly one of these — never create a second
   client instance elsewhere in the codebase.
2. **Generic base query/repository class** (e.g. `hooks/baseQuery.ts`,
   `services/BaseResource.ts`) — a generic class like `BaseQuery<T, U>`
   (`T` = response shape, `U` = request-body shape) exposing `get`,
   `getById`, `post`, `put`, `delete`, scoped to a resource URL, wrapping the
   shared client from layer 1.
3. **Per-resource query class** (e.g. `hooks/<resource>/<resource>Query.ts`)
   — one class per resource extending the base class, constructed with the
   resource's URL segment, exported as a ready-made singleton. Add
   resource-specific endpoints (login, bulk actions, etc.) as extra methods
   here, reusing the base class's client/url rather than re-implementing
   request boilerplate.
4. **Resource types** (e.g. `hooks/<resource>/type.ts`) — the type(s) used
   by both the query class and any hooks/components for that resource.
5. **Query-key factory** (e.g. `lib/queryKeys.ts`) — one centralized module
   exporting a key-builder per resource, e.g.
   `resource: (...args: unknown[]) => ["resource", ...args] as const`.
   Query keys should always be built through this factory — never inline
   array literals scattered across components or hooks.
6. **Hook layer** — a `use<Resource>` / `use<Action>` hook per
   resource/action that calls `useQuery`/`useMutation` from
   `@tanstack/react-query`, using the query class (layer 3) as the
   `queryFn`/`mutationFn` and the key factory (layer 5) for `queryKey`.
   Components should import *these* hooks — never call the query class or
   HTTP client directly from a component. If this layer doesn't exist yet
   for a resource, expect to write it from scratch following the pattern of
   any sibling resource that already has one.
7. **Root providers** — the actual mounted provider tree (commonly
   `provider/providers.tsx` or `app/providers.tsx`), wiring a single
   `QueryClientProvider` (and typically theme/toast providers) into the root
   layout. There should be exactly one `QueryClient` instantiated and
   mounted — watch for a duplicate/unused `QueryClient`/`QueryClientProvider`
   left over in another file; if one exists but isn't imported by the root
   layout, it's dead code and shouldn't be extended.
8. **Socket/invalidation provider** (e.g. `provider/socketProvider.tsx` +
   `lib/sockets.ts`) — a singleton socket client (commonly reconnected on
   tab `visibilitychange`) that listens for server-pushed *change events*
   (e.g. `<resource>:new`, `<resource>:update`, `<resource>:delete`) and, on
   each, calls `queryClient.invalidateQueries({ queryKey: queryKeys.<resource>(), refetchType: "active" })`.
   The server pushes notifications, not data — the client always refetches
   via TanStack Query. Listeners are registered in a `useEffect` and torn
   down in its cleanup. When adding a new resource that needs live updates,
   mirror this pattern rather than pushing resource data over the socket
   directly.
9. **Client/session state store** (e.g. a Zustand store with `persist`) —
   holds auth/session state (current user, token, hydration flag), separate
   from server data. Fetched resource data belongs in the TanStack Query
   cache, not in this store.

## Adding a new resource — checklist

1. Define the resource type (layer 4).
2. Add a per-resource query class extending the base class, pointed at the
   resource's URL segment, exported as a singleton (layer 3).
3. Add the resource's entry to the query-key factory (layer 5).
4. Write `use<Resource>` / `use<Action>` hooks on top of `useQuery`/
   `useMutation`, using the class and key from steps 2–3 (layer 6).
5. If the resource has server-pushed change events, add listeners in the
   socket provider that invalidate the resource's query key, mirroring an
   existing resource's block, with matching cleanup (layer 8).
6. Import the new hook from components — never call the query class or HTTP
   client directly from a component.

## Review checklist when auditing an existing implementation of this pattern

- Exactly one HTTP client instance, one `QueryClient`, and one socket
  singleton — flag duplicates, especially an unmounted/unused provider left
  behind from refactoring.
- Env var names used by the HTTP client and the socket client actually
  match what's defined in `.env`/`.env.example` — a silent mismatch (e.g.
  one reads `NEXT_PUBLIC_API`, the other `NEXT_PUBLIC_API_URL`) fails at
  runtime, not at build time.
- Base-class methods that only `catch (error) { throw error; }` add no
  behavior — fine to leave, but don't copy that shape into new code as if
  it does something; a bare `await` without try/catch is equivalent unless
  logging/transformation is actually added.
- Every query key used in components/hooks goes through the key factory —
  flag inline `["resource", id]`-style literals as drift from the pattern.
- Every socket-driven invalidation listener has a matching cleanup
  (`socket.off(...)`) in the effect's return.
- Check whether a resource has a query class but no hook layer yet (common
  mid-migration state) — that's a gap to fill, not a bug to report.

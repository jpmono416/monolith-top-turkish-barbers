# Frontend Standards

Next.js 15 web app at `apps/web`; shared UI in `packages/ui`. See `.cursor/rules/frontend.mdc`.

## Structure

```
apps/web/src/
  app/          # App Router: layouts, pages, loading/error
  lib/          # API clients, server/client helpers
  components/   # App-specific only; shared UI → @monolith/ui
```

## Rendering

- **Server Components by default** in `app/`
- `'use client'` only for hooks, events, browser APIs
- Fetch in Server Components or `lib/` — not `useEffect` + fetch in pages

## Styling

- Tailwind CSS v4 utilities + CSS variables in `globals.css`
- shadcn/ui components from `@monolith/ui` — extend there, don’t duplicate in web

## API integration

Pattern in `apps/web/src/lib/api.ts`:

| Context | Base URL env |
|---------|----------------|
| Server (Docker) | `API_INTERNAL_URL` |
| Server / client (public) | `NEXT_PUBLIC_API_URL` |
| Browser only | `NEXT_PUBLIC_API_URL` |

- Return types from `@monolith/types`
- Handle failures explicitly (`null`, error UI, `notFound()`)
- Centralise `fetch` in `lib/` — no ad-hoc URLs in components

## Pages

- Keep `page.tsx` thin (~80 lines); extract sections
- Add `loading.tsx` / `error.tsx` when UX needs them
- Prefer URL state over global client stores

## State

- Server props and search params first
- Local `useState` in client components
- No new global state library without documented need

## Testing

- Vitest: `lib/` helpers (`*.test.ts`)
- Playwright: `apps/web/e2e/` — roles/labels before `data-testid`

## Checklist for new page

1. Types from `@monolith/types`
2. `lib/<feature>.ts` helper
3. Server `page.tsx` + `@monolith/ui` components
4. E2E only for critical journey

## See also

`docs/architecture/architecture-philosophy.md`, `docs/workflows/spec-driven-development.md`

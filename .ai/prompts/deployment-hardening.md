# Monolith deployment hardening prompt

Use this prompt when fixing CI, Vercel (web), and Railway (API) on a Monolith Turborepo monorepo `pnpm` workspaces: `apps/api`, `apps/web`, `apps/mobile`; packages: `types`, `config`, `ui`).

## Root cause

Workspace packages `@monolith/types` and `@monolith/config` export compiled JavaScript from `dist/` (see each package’s `package.json` `main` / `exports`). If an app builds or starts before those packages are built, you get:

- CI: Vitest / Playwright / Next — `Module not found: Can't resolve '@monolith/types'` or `'@monolith/config'`
- Railway (API): runtime import failures for workspace packages
- Vercel (web): same during `next build` or Playwright `webServer` `pnpm dev`)

**Do not** permanently duplicate shared data in app code to hide this. Fix build order and keep shared imports.

---

## Required code changes (all apps)

### 1. `apps/api/package.json`

Ensure these scripts exist:

```json

"prebuild": "pnpm --filter @monolith/types build && pnpm --filter @monolith/config build",

"predev": "pnpm --filter @monolith/types build && pnpm --filter @monolith/config build"

```

`prebuild` is critical for Railway. `predev` matches local API development.

### 2. `apps/web/package.json`

Add the same `prebuild` and `predev` scripts immediately before `build` and `dev`:

```json

"prebuild": "pnpm --filter @monolith/types build && pnpm --filter @monolith/config build",

"predev": "pnpm --filter @monolith/types build && pnpm --filter @monolith/config build"

```

### 3. `apps/mobile/package.json`

Add the same `prebuild` and `predev` for consistency (Expo imports `@monolith/config`).

### 4. `apps/web/vitest.config.ts`

Vitest does not inherit TypeScript path aliases automatically. Add:

```ts

import path from 'node:path';

export default defineConfig({

  resolve: {

    alias: {

      '@': path.resolve(__dirname, './src'),

    },

  },

  // ...existing test config

});

```

This fixes tests that import `@/lib/*` (for example from `src/content/products.ts`).

### 5. `apps/web/src/components/home/review-carousel.tsx`

If typecheck fails with `activeReview` possibly `undefined`, or ESLint reports `react-hooks/rules-of-hooks`:

- Never `return` before hooks.
- Use `const hasReviews = reviewHighlights.length > 0`.
- Call all hooks unconditionally on every render.
- Guard rotation and effects when `!hasReviews`.
- Derive active review safely:

```ts

const activeReview = hasReviews

  ? (reviewHighlights[activeIndex] ?? reviewHighlights[0])

  : null;

```

- Use a safe live region:

```tsx

{activeReview ? `Review by ${activeReview.author}` : 'No review available'}

```

### 6. Keep web using shared workspace packages

After `prebuild` / `predev` exist, restore or keep:

- `apps/web/src/app/layout.tsx` — `import { APP_NAME } from '@monolith/config'`
- `apps/web/src/content/products.ts` — `import { mockCatalogueProducts } from '@monolith/types'`
- `apps/web/next.config.ts` — `transpilePackages: ['@monolith/ui', '@monolith/config', '@monolith/types']`

---

## Platform configuration

### GitHub CI

Run from the **repository root**:

```bash

pnpm install --frozen-lockfile

pnpm lint && pnpm typecheck && pnpm test && pnpm build

```

Turbo `build` already has `dependsOn: ["^build"]`. App-level `prebuild` is a safety net when filtering a single package.

### Vercel (web)

`apps/web/vercel.json` should use the monorepo root:

```json

{

  "installCommand": "cd ../.. && pnpm install --frozen-lockfile",

  "buildCommand": "cd ../.. && pnpm --filter @monolith/web build"

}

```

Web `prebuild` compiles `@monolith/types` and `@monolith/config` before `next build`.

### Railway (API)

The service must use the **workspace root**, not an isolated `apps/api` directory only.


| Step    | Command                                           |
| ------- | ------------------------------------------------- |
| Install | `pnpm install --frozen-lockfile` (from repo root) |
| Build   | `pnpm --filter @monolith/api build`               |
| Start   | `pnpm --filter @monolith/api start:prod`          |


**Required API environment variables** (see `apps/api` env validation):


| Variable            | Notes                                  |
| ------------------- | -------------------------------------- |
| `DATABASE_URL`      | Required                               |
| `DIRECT_URL`        | Required by Prisma schema `directUrl`) |
| `RESEND_API_KEY`    | Required for checkout email            |
| `MAIL_FROM`         | Optional; has default                  |
| `STORE_ORDER_EMAIL` | Optional; has default                  |
| `CORS_ORIGIN`       | Must match deployed Vercel URL         |


### Production database error

If the API crashes at startup with:

```text

PrismaClientInitializationError: FATAL: Tenant or user not found

```

Fix `DATABASE_URL` and `DIRECT_URL` on Railway. Common causes:

- Wrong database user or password
- Stale credentials after rotation
- Wrong project or pooled URL
- Missing `?sslmode=require` for Supabase or Neon

This is a database connectivity issue, not an email configuration issue. Prisma must connect before checkout email can work.

### Checkout email

On the API service, set:

- `RESEND_API_KEY`
- `MAIL_FROM`
- `STORE_ORDER_EMAIL`
- `CORS_ORIGIN` (deployed frontend origin)

---

## Verification checklist

From the repository root:

```bash

pnpm --filter @monolith/web typecheck

pnpm --filter @monolith/web lint

pnpm --filter @monolith/web test

pnpm --filter @monolith/web test:e2e

pnpm --filter @monolith/api build

pnpm build

```

Confirm no permanent workarounds remain:

- No duplicated mock catalogue in `apps/web/src/content/products.ts`
- No hardcoded `APP_NAME` in `layout.tsx` unless intentional

---

## Agent deliverables

1. Implement all fixes with a minimal diff.
2. Summarize what changed.
3. List exact Railway and Vercel environment variables the operator must set.
4. Do not commit unless explicitly asked.

---

## Quick reference


| Symptom                                                   | Fix                                                    |
| --------------------------------------------------------- | ------------------------------------------------------ |
| `Can't resolve '@monolith/types'` or `'@monolith/config'` | Add `prebuild` / `predev` on api, web, mobile          |
| Vitest cannot resolve `@/lib/*`                           | Add `@` → `src` alias in `vitest.config.ts`            |
| Review carousel TS18048 or hooks lint                     | `hasReviews` guards; no early return before hooks      |
| Vercel web build fails                                    | Root install + `pnpm --filter @monolith/web build`     |
| Railway API module not found                              | Root workspace build + `prebuild` on API               |
| `Tenant or user not found` (Prisma)                       | Fix `DATABASE_URL` / `DIRECT_URL` on Railway           |
| Email fails after deploy                                  | Set Resend vars; fix DB first if Prisma cannot connect |



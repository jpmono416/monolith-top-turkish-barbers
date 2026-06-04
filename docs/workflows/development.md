# Development Workflow

1. Copy `.env.example` to `.env`
2. After `pnpm install`, Prisma client is generated via `postinstall` (`pnpm db:generate` if you skipped install hooks)
3. If the API fails with `Cannot find module dist/main`, delete `apps/api/dist` and restart (stale compile output)
4. **Docker + local pnpm conflict:** If `pnpm install` or `pnpm build` fails with `EACCES` or missing `@nestjs/cli` after using Docker, run `pnpm docker:clean` then `pnpm clean:modules` and `pnpm install` (see below)
5. Start infrastructure: `pnpm docker:up` or run Postgres/Redis only via Compose `docker compose up postgres redis -d` (required before `pnpm dev` — API connects to Redis and Postgres on startup)
6. Run migrations when models exist: `pnpm db:migrate`
7. Develop with `pnpm dev` or per-app filters
8. Run `pnpm lint`, `pnpm typecheck`, `pnpm test` before opening a PR

## Fixing broken `node_modules` after Docker

Older Compose setups used separate `node_modules` volumes per app, which can leave the host tree unreadable on Windows. Recovery:

```powershell
pnpm docker:clean
pnpm clean:modules
pnpm install
pnpm build
```

Use either Docker **or** local `pnpm dev` for app processes; both need a healthy root `node_modules` from `pnpm install` on the host.

## Pull requests

All PRs must pass GitHub Actions CI: lint, typecheck, unit tests, build, and Playwright E2E.
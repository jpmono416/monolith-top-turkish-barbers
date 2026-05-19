# Development Workflow

1. Copy `.env.example` to `.env`
2. Start infrastructure: `pnpm docker:up` or run Postgres/Redis only via Compose
3. Run migrations when models exist: `pnpm db:migrate`
4. Develop with `pnpm dev` or per-app filters
5. Run `pnpm lint`, `pnpm typecheck`, `pnpm test` before opening a PR

## Pull requests

All PRs must pass GitHub Actions CI: lint, typecheck, unit tests, build, and Playwright E2E.

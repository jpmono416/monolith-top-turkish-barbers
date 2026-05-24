# Repository Standards

Canonical template for Monolith AI-native projects.

## Invariants

- Apps build independently via Turborepo (`pnpm build`)
- Local infra via Docker Compose (`pnpm docker:up`) or postgres/redis + host `pnpm dev`
- Env contract in `.env.example`; validated at API boot
- Prisma schema at repo root `prisma/schema.prisma`
- API prefix `/api`; features under `apps/api/src/features/`
- Shared types `@monolith/types`; shared UI `@monolith/ui`

## Documentation

| Area | Path |
|------|------|
| Human workflows | `docs/` |
| Canonical vocabulary | `docs/architecture/canonical-vocabulary.md` |
| Agent prompts | `.ai/prompts/` |
| IDE enforcement | `.cursor/rules/*.mdc` |

## PR gate

`pnpm lint`, `typecheck`, `test`, `build`, Playwright E2E on web changes.

See `docs/README.md` and `.ai/README.md` for navigation.

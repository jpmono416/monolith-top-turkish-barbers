# Infrastructure Standards

Deployment map and operational constraints. See `.cursor/rules/infra.mdc` and `docker.mdc`.

## Platforms

| Component | Production | Local |
|-----------|------------|-------|
| Web | Vercel (`apps/web`) | Docker or `pnpm --filter @monolith/web dev` |
| API | Railway (`infrastructure/railway/`) | Docker or `pnpm --filter @monolith/api dev` |
| PostgreSQL | Supabase | Compose `postgres` |
| Redis / BullMQ | Upstash | Compose `redis` |
| CI | GitHub Actions `.github/workflows/ci.yml` | — |

## Environment contract

- Single source: `.env.example` (committed)
- Secrets only in platform dashboards — never in repo
- API validation on boot: `apps/api/src/config/env.validation.ts`

Key vars:

| Var | Purpose |
|-----|---------|
| `DATABASE_URL` | Prisma runtime (pooled in prod) |
| `DIRECT_URL` | Migrations |
| `REDIS_URL` | Redis / BullMQ |
| `BULLMQ_PREFIX` | Queue namespace per environment |
| `NEXT_PUBLIC_API_URL` | Browser → API |
| `API_INTERNAL_URL` | Server-side in Docker network |

## CI (required on PR)

1. `pnpm install --frozen-lockfile`
2. `pnpm db:generate`
3. `lint` → `typecheck` → `test` → `build`
4. Playwright E2E (Postgres + Redis service containers)

## Health checks

- API: `GET /api/health` (Railway healthcheck)
- Do not deploy API without passing health + build

## Migrations in production

- Use `DIRECT_URL` for `prisma migrate deploy`
- Order: backup/review → migrate → deploy API → deploy web
- Staging uses separate Supabase/Upstash — never share prod data stores

## Node toolchain

- Node ≥22, pnpm 9.15.9 — match CI, Dockerfiles, and `engines`

## Change checklist

Infra touch requires updating:

- [ ] `.env.example`
- [ ] `env.validation.ts` / `configuration.ts`
- [ ] Compose / Dockerfile if local behaviour changes
- [ ] `docs/workflows/deployment-workflow.md` if release steps change
- [ ] Platform env dashboards

## See also

`docs/workflows/deployment-workflow.md`, `docs/standards/docker-philosophy.md`

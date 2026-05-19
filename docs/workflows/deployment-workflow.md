# Deployment Workflow

## Environments

| Environment | Web | API | DB | Redis |
|-------------|-----|-----|-----|-------|
| Local | localhost:3000 | localhost:3001 | Docker Postgres | Docker Redis |
| CI | build only | build only | service container | service container |
| Production | Vercel | Railway | Supabase | Upstash |

Staging should mirror production with **isolated** Supabase and Upstash instances.

## Release order

```
1. Review migrations (DIRECT_URL)
2. Apply migrations to target DB
3. Deploy API (Railway)
4. Verify GET /api/health
5. Deploy web (Vercel)
6. Smoke test critical paths
```

Never run `prisma migrate` against production pooled URL only — use `DIRECT_URL`.

## Railway (API)

- Dockerfile: `infrastructure/docker/api.Dockerfile` target `production`
- Config: `infrastructure/railway/api.railway.toml`
- Health: `/api/health`
- Env: mirror `.env.example` keys in Railway dashboard
- Build must include `pnpm db:generate`

## Vercel (Web)

- Project root: `apps/web`
- Env: `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_API_URL`
- Server-side API: `API_INTERNAL_URL` when using private networking

## Database (Supabase)

```bash
# Production migrate (CI or approved manual step)
DIRECT_URL="..." pnpm db:migrate
# or
pnpm exec prisma migrate deploy
```

Coordinate backward-compatible API deploys if schema and code must align.

## Redis (Upstash)

- Set `REDIS_URL` (TLS) and `BULLMQ_PREFIX` per environment
- Prefix prevents queue collisions between staging and prod

## Rollback

| Layer | Action |
|-------|--------|
| Web | Vercel instant rollback to previous deployment |
| API | Railway redeploy previous image |
| DB | Forward-only migrations preferred; have manual rollback SQL reviewed in advance |

## Pre-release checklist

- [ ] CI green on release commit
- [ ] Spec / changelog updated
- [ ] Migrations reviewed
- [ ] Env vars set on Railway + Vercel
- [ ] No dev URLs in production env

## Related

- `docs/architecture/infrastructure-standards.md`
- `.ai/workflows/release-lifecycle.md`

# Release Lifecycle

From merged `main` to production.

## Triggers

- Scheduled release
- Hotfix on `fix/` branch (fast-track review still required)

## Pre-release

- [ ] All specs for release marked `implementing` or `done`
- [ ] `main` CI green
- [ ] Migration SQL reviewed
- [ ] Changelog or release notes (if team uses them)

## Pipeline

```
main (green CI)
  → migrate production DB (DIRECT_URL)
  → deploy API (Railway)
  → health check /api/health
  → deploy web (Vercel)
  → smoke tests
  → mark specs done
```

## Environment promotion

| Check | Production |
|-------|------------|
| Separate Supabase project | Required |
| Separate Upstash + `BULLMQ_PREFIX` | Required |
| `NODE_ENV=production` | Required |
| Secrets in dashboards only | Required |

## Hotfix

1. Branch `fix/<issue>` from `main`
2. Minimal fix + test
3. PR with expedited review
4. Deploy API before web if contract changed
5. Post-incident: update spec or add retro note

## Rollback

- Vercel: promote previous deployment
- Railway: redeploy previous successful build
- DB: forward-fix preferred; reversible migrations planned in technical spec

## Post-release

- Monitor API health and error rates
- Confirm queue workers processing (if applicable)
- Close linked tickets

## Related

- `docs/workflows/deployment-workflow.md`
- `docs/architecture/infrastructure-standards.md`

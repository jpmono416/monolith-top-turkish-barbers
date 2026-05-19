# Implementation Plan: [Feature Name]

> **Technical spec:** [link]  
> **Branch:** `feature/<name>`  
> **Estimated slices:** [N] PRs recommended

## Checklist (definition of done)

- [ ] Product + technical specs approved
- [ ] `@monolith/types` updated
- [ ] Prisma migration applied locally
- [ ] API feature module complete + unit tests
- [ ] Web (and mobile if in scope) consuming typed API
- [ ] `.env.example` + `env.validation.ts` + `configuration.ts` if new env
- [ ] `pnpm lint`, `typecheck`, `test`, `build` pass
- [ ] E2E for critical path (if user-facing)
- [ ] Spec status set to `done`

## Implementation order

Always: **types → database → API → web/mobile → tests → docs**.

| Step | Task | Files / commands | Verify |
|------|------|------------------|--------|
| 1 | Shared types | `packages/types/src/` | `pnpm typecheck` |
| 2 | Schema + migration | `prisma/schema.prisma` | `pnpm db:migrate` |
| 3 | API module | `apps/api/src/features/<name>/` | `pnpm --filter @monolith/api test` |
| 4 | Register module | `app.module.ts` | `GET /api/<route>` |
| 5 | Web `lib/` + pages | `apps/web/src/` | manual / E2E |
| 6 | Queue processor | if spec requires | job runs in Redis |
| 7 | CI green | — | PR checks |

## PR slices (optional)

Split large work for reviewability:

| PR | Contents | Depends on |
|----|----------|------------|
| 1 | types + prisma + API read paths | — |
| 2 | API write paths + jobs | PR 1 |
| 3 | web UI | PR 2 |

## Agent execution notes

When delegating to an AI agent:

1. Point agent at technical spec + this plan
2. Use `.ai/prompts/feature-implementation.md`
3. Restrict scope to current slice only
4. Require evidence: command output for lint/test/build

## Risks during implementation

| Risk | Watch for |
|------|-----------|
| Cross-feature imports | use `@monolith/types` or infrastructure |
| Env drift | update `.env.example` same PR |
| Docker vs host | see `docs/workflows/development.md` |

## Post-merge

- [ ] Update spec status
- [ ] Deploy API (Railway) then web (Vercel) per `docs/workflows/deployment-workflow.md`
- [ ] Run `pnpm db:migrate` in production with `DIRECT_URL`

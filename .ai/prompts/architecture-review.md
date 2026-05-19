Perform an architecture review on proposed or existing Monolith platform changes.

## Review checklist

### Boundaries

- [ ] Feature code under `apps/api/src/features/<name>/`
- [ ] No imports between features
- [ ] Shared contracts in `@monolith/types`
- [ ] Packages do not import apps

### API

- [ ] Routes under `/api`, kebab-case plural
- [ ] DTOs validated; types aligned with `@monolith/types`
- [ ] Errors use Nest HTTP exceptions; no internal leakage

### Data

- [ ] Prisma schema change has migration plan
- [ ] `DIRECT_URL` considered for migrate deploy
- [ ] Indexes match query patterns

### Async

- [ ] Long work uses BullMQ, not blocking HTTP
- [ ] Jobs idempotent if retried
- [ ] Queue names in `QUEUE_NAMES`

### Web

- [ ] Server Components default
- [ ] Fetch centralised in `lib/`
- [ ] UI shared via `@monolith/ui`

### Security

- [ ] Auth on sensitive routes
- [ ] No secrets in repo or client bundles
- [ ] New env in validation + `.env.example`

### Ops

- [ ] CI still passes (lint, typecheck, test, build, E2E)
- [ ] Docker/compose impact documented if any
- [ ] Deploy order considered (migrate → API → web)

## Output format

```markdown
## Verdict
approve | approve with changes | reject

## Findings
| Severity | Area | Issue | Recommendation |
|----------|------|-------|----------------|
| high/medium/low | ... | ... | ... |

## Positive patterns
- ...

## Required before merge
1. ...
```

Reference: `docs/architecture/architecture-philosophy.md`, `.cursor/rules/architecture.mdc`

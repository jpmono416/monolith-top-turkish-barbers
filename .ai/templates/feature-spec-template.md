# Feature Spec: [Feature Name]

> Quick agent-oriented spec. For full product/technical docs use `docs/specs/` templates.

## Metadata

| Field | Value |
|-------|-------|
| Status | draft / approved / done |
| Feature key | `<kebab-case>` |
| API prefix | `/api/<resource>` |
| Apps | api, web, mobile |

## Behaviour summary

One paragraph describing user-visible outcome.

## API surface

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| GET | `/api/...` | public/user | … |

Types: `@monolith/types` exports: `...`

## Data

```prisma
// models / fields
```

Migration: `add_<feature>_tables`

## File checklist

```
packages/types/src/           # types
prisma/schema.prisma
apps/api/src/features/<feature>/
  <feature>.module.ts
  <feature>.controller.ts
  <feature>.service.ts
  dto/
  <feature>.service.spec.ts
apps/web/src/lib/<feature>.ts
apps/web/src/app/<route>/page.tsx
```

Register: `app.module.ts`

## Queue (if any)

| Queue | Job | Idempotent |
|-------|-----|------------|
| `QUEUE_NAMES.x` | `job-name` | yes |

## Env (if any)

| Var | Required | Notes |
|-----|----------|-------|
| `...` | yes/no | … |

## Tests

- [ ] `*.service.spec.ts` — happy + failure
- [ ] Playwright: `<journey>` (if UI)

## Verify

```bash
pnpm db:migrate
pnpm --filter @monolith/api test
curl http://localhost:3001/api/...
# web: http://localhost:3000/...
```

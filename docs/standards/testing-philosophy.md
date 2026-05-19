# Testing Philosophy

High signal, low brittleness. CI time is expensive — test behaviour that matters.

## Pyramid (pragmatic)

| Layer | Tool | Target |
|-------|------|--------|
| Unit | Vitest | Services, pure `lib/` logic |
| E2E | Playwright | Critical user journeys |

Skip: decorator metadata tests, large snapshots, framework internals.

## What to test

**Always**

- New business rules in API services (happy + failure)
- Non-trivial `lib/` transformations

**Sometimes**

- Controllers (only if thin mapping is error-prone)
- Visual variants

**Rarely**

- Private methods
- Implementation details that refactors change

## API unit tests

- File: `<name>.service.spec.ts` beside service
- Mock `PrismaService` methods
- Template: `apps/api/src/features/health/health.service.spec.ts`

## Web unit tests

- `apps/web/src/lib/*.test.ts`
- No full component tree snapshots

## E2E

- Location: `apps/web/e2e/`
- Locators: `getByRole` → `getByLabel` → `getByText` → `data-testid`
- Self-contained setup — no manual DB seed
- Template: `apps/web/e2e/home.spec.ts`

## PR gate

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
pnpm --filter @monolith/web test:e2e  # when UI journey affected
```

## Forbidden

- `.skip` without issue + expiry
- Production API calls in unit tests
- Flaky `setTimeout` without proper waits

## See also

`.cursor/rules/testing.mdc`

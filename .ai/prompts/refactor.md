Refactor code on the Monolith platform without changing external behaviour.

## Preconditions

- Existing tests pass before starting
- Clear goal: rename, extract, reduce duplication, improve boundaries
- If behaviour change is needed, treat as feature or bugfix — not refactor

## Process

1. State invariant: what must stay the same (API contracts, DB schema, UX)
2. Run baseline: `pnpm test` (and E2E if touch web flows)
3. Refactor in small commits mentally — one concern per PR
4. Re-run full PR gate after each logical step

## Allowed

- Rename with consistent updates across workspace
- Move code between files within same feature
- Extract to `@monolith/types` or `@monolith/ui` when duplication is proven

## Forbidden

- Cross-feature coupling introduced for convenience
- Behaviour change smuggled in without spec
- Disabling tests or types
- New abstraction layers for one call site

## Architecture review trigger

If refactor touches:

- Multiple features
- `infrastructure/`
- Prisma schema
- Public API shapes

Run `.ai/prompts/architecture-review.md` checklist first.

## Deliverable

- Invariant stated
- What improved (maintainability metric: clarity, boundary, duplication)
- Test evidence (same tests green)

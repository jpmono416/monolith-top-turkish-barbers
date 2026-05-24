# Maintainability Principles

Long-term health for humans and AI agents across many projects cloned from this template.

## Predictability

- Same folder shapes in every Monolith repo
- Same package scope `@monolith/*`
- Same implementation order: types → DB → API → UI
- Health reference implementation (`health` API feature, `lib/api.ts`) over ad-hoc examples

## Locality

- Keep code close to the feature it serves
- Prefer colocated DTOs and tests
- Extract to packages only when second consumer exists

## Explicit contracts

- HTTP shapes in `@monolith/types`
- Env in validated config
- Specs in `docs/specs/` before large builds

## Low coupling

- Features do not import features
- Pages do not embed business rules
- Infrastructure holds technical adapters only

## Testability

- Services testable with mocked Prisma
- Thin controllers and pages
- E2E only for journeys that matter

## Operational clarity

- Docker and deploy docs stay accurate
- Recovery steps documented (e.g. `node_modules` on Windows)
- Migration and deploy order explicit

## Evolution

- Specs versioned by date, superseded not deleted
- Cursor rules (`.mdc`) for enforcement; `docs/` for narrative
- `.ai/` for agent prompts and workflows

## Measure maintainability

Ask before merging:

1. Can a new agent find the entry point in under 2 minutes?
2. Can we change the API contract in one package?
3. Can we delete this feature without orphan imports?
4. Do tests describe behaviour, not implementation?

If no, refactor before expanding scope.

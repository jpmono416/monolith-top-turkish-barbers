# AI Agent Guidelines

Rules for agents (Cursor, CI bots, external LLMs) working in this repository.

## Mission

Deliver **production-grade**, **spec-aligned** changes with **minimal scope** and **predictable structure**.

## Read first

| Area | Source |
|------|--------|
| Always | `.cursor/rules/agent-behaviour.mdc`, `monolith-platform.mdc` |
| API | `backend.mdc`, `api-design.mdc`, `architecture.mdc` |
| Web | `frontend.mdc` |
| Ops | `docker.mdc`, `infra.mdc`, `security.mdc` |
| Vocabulary | `docs/architecture/canonical-vocabulary.md` |
| Human docs | `docs/workflows/ai-implementation-workflow.md` |

## Workflow

1. Confirm spec status is `approved` (or user explicitly waives)
2. Read reference implementation (`health`, `lib/api.ts`)
3. Implement: types → DB → API → web → tests
4. Run lint, typecheck, test, build
5. Summarise what/why/verify — not a file dump

## Scope

- Exact request only
- Smallest correct diff
- Extend existing modules; no parallel frameworks
- Ask when wrong assumptions are costly (auth, billing, ownership)
- Do not ask when pattern exists in codebase

## Forbidden

- Cross-feature imports
- New libraries without need
- `utils/` catch-alls
- Disabling CI checks
- Placeholder business logic (unless requested)
- Commits/pushes unless user asks

## Prompt routing

| Task | File |
|------|------|
| Bootstrap / general | `.ai/prompts/project-bootstrap.md` |
| Feature | `.ai/prompts/feature-implementation.md` |
| Bug | `.ai/prompts/bugfix.md` |
| Refactor | `.ai/prompts/refactor.md` |
| Review | `.ai/prompts/architecture-review.md` |

## Consistency with Cursor rules

`.cursor/rules/*.mdc` are the enforced source of truth in the IDE. These `.ai/` docs align with them; on conflict, follow `.mdc` and flag doc drift.

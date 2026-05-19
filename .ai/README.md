# Monolith AI Assets

Machine- and human-readable assets for AI-native development. Pair with `docs/` for full context.

## Prompts (`.ai/prompts/`)

| File | Use when |
|------|----------|
| `project-bootstrap.md` | General platform implementation |
| `feature-implementation.md` | Building from an approved spec |
| `bugfix.md` | Targeted defect fix |
| `refactor.md` | Behaviour-preserving structural change |
| `architecture-review.md` | Reviewing design before/after code |

## Workflows (`.ai/workflows/`)

| File | Covers |
|------|--------|
| `product-to-implementation.md` | Idea → shipped code |
| `spec-lifecycle.md` | Spec states and change control |
| `release-lifecycle.md` | Merge → production |

Legacy: `feature-implementation.md` (short checklist) — prefer `docs/workflows/` + prompts above.

## Standards (`.ai/standards/`)

- `ai-agent-guidelines.md` — agent rules of engagement
- `implementation-expectations.md` — definition of done
- `maintainability-principles.md` — long-term design values
- `repository.md` — template repo invariants

## Templates (`.ai/templates/`)

| File | Use |
|------|-----|
| `feature-spec-template.md` | Single-page feature brief for agents |
| `api-spec-template.md` | Endpoint contract |
| `queue-job-template.md` | BullMQ job definition |
| `feature-module.md` | Nest folder layout |

## Human docs mirror

| AI | Human |
|----|-------|
| `.ai/workflows/spec-lifecycle.md` | `docs/workflows/spec-driven-development.md` |
| `.ai/prompts/feature-implementation.md` | `docs/workflows/ai-implementation-workflow.md` |

Cursor enforcement: `.cursor/rules/`

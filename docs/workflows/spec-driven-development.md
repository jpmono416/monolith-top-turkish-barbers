# Spec-Driven Development

Build features from written specs before code. Specs are the contract between product, engineering, and AI agents.

## Lifecycle

```
Idea → Product spec → Technical spec → Implementation plan → Code → Verify → Done
```

| Stage | Artifact | Location |
|-------|----------|----------|
| Product | Problem, goals, acceptance criteria | `docs/specs/YYYY-MM-DD-<name>.md` (from product template) |
| Technical | API, data, security, tests | same folder, technical template |
| Execution | Ordered steps, PR slices | implementation plan template |
| Memory | Status + decisions | spec header metadata |

## Naming

`docs/specs/YYYY-MM-DD-<kebab-feature>.md`

Example: `docs/specs/2026-05-20-order-checkout.md`

## Gates

| Gate | Criteria |
|------|----------|
| Product approved | Goals, acceptance criteria, non-goals signed off |
| Technical approved | Data model, API table, security, test plan reviewed |
| Implementation start | Plan exists; branch created |
| Merge | CI green; spec checklist complete |
| Release | Deploy workflow; spec status `done` |

## Agent usage

1. Attach product + technical spec to the agent context
2. Use `.ai/prompts/feature-implementation.md`
3. Agent implements **only** the current plan slice
4. Agent updates spec checkboxes in the implementation plan PR description

## Human responsibilities

- Resolve open questions before `approved`
- Reject scope creep — update spec instead of silent code changes
- Keep `@monolith/types` in sync with API tables in technical specs

## Templates

| Template | File |
|----------|------|
| Product | `docs/specs/product-spec-template.md` |
| Technical | `docs/specs/technical-spec-template.md` |
| Plan | `docs/specs/implementation-plan-template.md` |

## Related

- `.ai/workflows/spec-lifecycle.md`
- `.ai/workflows/product-to-implementation.md`
- `docs/workflows/ai-implementation-workflow.md`

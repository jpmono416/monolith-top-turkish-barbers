# AI Implementation Workflow

How humans and agents execute work on this platform without architectural drift.

## Before coding

1. Read relevant `.cursor/rules/*.mdc` for touched paths
2. Read feature specs in `docs/specs/` if they exist
3. Inspect nearest reference implementation (`health` feature, `lib/api.ts`)
4. Confirm: migration? new env? types? queue job?

## Agent prompt selection

| Task | Prompt |
|------|--------|
| New repo / greenfield setup | `.ai/prompts/project-bootstrap.md` |
| Feature from spec | `.ai/prompts/feature-implementation.md` |
| Defect | `.ai/prompts/bugfix.md` |
| Structural change | `.ai/prompts/refactor.md` |
| Design review | `.ai/prompts/architecture-review.md` |

## Implementation order (mandatory)

```
@monolith/types → prisma migrate → API feature → web/mobile → tests
```

## Scope rules

- Implement exactly what the spec/plan says
- Smallest correct diff
- No drive-by refactors
- No new libraries without justification
- Production-grade code — no placeholder business logic unless requested

## Verification (agent must run or report)

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
# If web journey changed:
pnpm --filter @monolith/web test:e2e
```

If schema changed: `pnpm db:migrate` locally and note for reviewer.

## Output expectations

Agent summary format:

- What changed (capability, not file list)
- Why (spec requirement)
- How to verify (commands + URLs)

## Escalation

Ask the human when:

- Auth/billing/data ownership ambiguous
- Breaking API change without migration path
- Spec contradicts codebase patterns

Do **not** ask when the pattern exists in `health` or cursor rules.

## Related

- `.ai/standards/ai-agent-guidelines.md`
- `docs/workflows/pull-request-workflow.md`
- `docs/workflows/development.md` (local setup)

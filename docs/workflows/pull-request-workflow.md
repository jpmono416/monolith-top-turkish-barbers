# Pull Request Workflow

## Branch naming

| Prefix | Use |
|--------|-----|
| `feature/` | New capability |
| `fix/` | Bug fix |
| `chore/` | Tooling, deps, docs-only |

Example: `feature/order-checkout`

## Before opening PR

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

If UI flows changed: `pnpm --filter @monolith/web test:e2e`

Local setup issues: see `development.md`.

## PR description template

```markdown
## Summary
- What and why (1–3 bullets)

## Spec
- Link: docs/specs/YYYY-MM-DD-<feature>.md
- Plan checklist: [ ] items completed

## Test plan
- [ ] `pnpm lint` / `typecheck` / `test` / `build`
- [ ] Manual: …
- [ ] E2E: … (if applicable)

## Migration / env
- [ ] `pnpm db:migrate` required
- [ ] `.env.example` updated
```

## CI requirements (blocking)

GitHub Actions on PR and `main`:

1. Install + `db:generate`
2. lint → typecheck → test → build
3. Playwright E2E (after quality job)

Do not merge with failing checks or disabled hooks.

## Review focus

| Area | Check |
|------|-------|
| Scope | Matches spec; no unrelated changes |
| Architecture | No cross-feature imports; types in package |
| Security | DTO validation; no secrets committed |
| Tests | Service tests for new business rules |
| Docs | Spec status; env example |

## Size guidance

- Prefer PRs under ~400 lines of meaningful change
- Split using implementation plan slices
- Types + schema + API read path can ship before UI

## After merge

- Delete branch
- Follow `deployment-workflow.md` if releasing
- Update spec status to `done`

## Related

- `docs/workflows/spec-driven-development.md`
- `.ai/workflows/release-lifecycle.md`

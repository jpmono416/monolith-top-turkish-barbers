Fix a defect on the Monolith platform with minimal, targeted change.

## Inputs

- Reproduction steps or failing test
- Expected vs actual behaviour
- Affected area (api / web / infra)

## Process

1. Reproduce locally (logs, test, or route)
2. Identify root cause — prefer fixing services/`lib/` over symptoms
3. Add or extend test that would have caught the bug (service or E2E if user-facing)
4. Fix with smallest correct diff
5. Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`

## Scope discipline

- Do not refactor unrelated code
- Do not expand feature scope
- If spec exists, note whether bug was spec ambiguity — suggest spec update separately

## Common pitfalls

- Stale `apps/api/dist` → delete dist, restart
- Docker/host `node_modules` conflict → `docs/workflows/development.md` recovery
- Wrong API base URL (`API_INTERNAL_URL` vs `NEXT_PUBLIC_API_URL`)

## Deliverable

- Root cause (one sentence)
- Fix description
- Test added or updated
- Verify commands

# Implementation Expectations

What “done” means for any change in this platform.

## Code quality

- TypeScript strict; no unexplained `any`
- Matches naming in `docs/standards/naming-conventions.md`
- Follows feature module layout for API
- Server Components default on web

## Completeness

| Change | Required |
|--------|----------|
| New API endpoint | DTO, service, controller, types if shared |
| New model | Prisma migration before service code |
| New env var | `.env.example`, validation, configuration |
| New queue | `QUEUE_NAMES`, processor, idempotency note |
| New business rule | Service unit test (happy + failure) |
| Critical UI path | Playwright E2E |

## Verification commands

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Schema: `pnpm db:migrate` locally when models change.

## Documentation

- Update spec checklists in PR
- Do not generate large unsolicited markdown files
- Update `docs/workflows/development.md` only when local dev steps change

## PR readiness

- CI-equivalent commands pass locally
- No secrets in diff
- Scope matches spec slice

## Anti-patterns

- `// TODO: implement` in merged features
- Empty catch blocks
- `fetch` without typed helper in web
- Instantiated Prisma outside `PrismaService`

## Reference

`.cursor/rules/agent-behaviour.mdc`, `docs/standards/coding-standards.md`

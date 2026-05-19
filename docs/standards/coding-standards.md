# Coding Standards

Platform-wide code quality expectations. Cursor enforces detail in `.cursor/rules/`.

## TypeScript

- Strict mode everywhere
- No `any` without documented justification
- Prefer `unknown` + narrowing over assertions
- Explicit return types on public APIs and services

## Organisation

- Feature folders, not horizontal “controllers/services” roots
- Colocate DTOs with features
- Shared contracts → `@monolith/types`
- Shared UI → `@monolith/ui`
- No repo-root `utils/` or `helpers/` catch-alls

## API boundaries

- `class-validator` DTOs on all inputs
- Business logic in services only
- HTTP exceptions from services/controllers — no raw stack traces to clients

## Configuration

- Env only through typed config (`configuration.ts` + validation)
- Document new vars in `.env.example`

## Comments

- Code should be self-explanatory
- Comment only non-obvious business rules or constraints

## Forbidden

- Placeholder `// TODO: implement` in shipped features (unless explicitly requested)
- Disabling lint/typecheck/tests to merge
- `process.env` in application code outside config modules
- Cross-feature imports in API

## PR quality bar

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

## References

- `.cursor/rules/agent-behaviour.mdc`
- `.ai/standards/implementation-expectations.md`
- `docs/standards/naming-conventions.md`

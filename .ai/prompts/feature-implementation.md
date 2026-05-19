Implement a feature on the Monolith platform from an approved spec.

## Inputs required

- Product spec (if exists): `docs/specs/`
- Technical spec with API table and data model
- Implementation plan with current slice

If specs are missing, stop and ask for them or offer to draft from templates in `docs/specs/`.

## Execution steps

1. Read `.cursor/rules/` for: architecture, backend, frontend, api-design, naming, testing, security
2. Copy patterns from `apps/api/src/features/health/` and `apps/web/src/lib/api.ts`
3. Implement in order:
   - `@monolith/types`
   - `prisma/schema.prisma` + `pnpm db:migrate`
   - `apps/api/src/features/<feature>/`
   - `apps/web/src/lib/` + pages
   - Vitest service tests; Playwright if critical UI path
4. Update `.env.example` + `env.validation.ts` + `configuration.ts` for new env
5. Run: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`

## Scope

- Current plan slice only
- No drive-by refactors
- No new dependencies without clear need

## Module template

See `.ai/templates/feature-module.md` and `feature-spec-template.md`.

## Forbidden

- Cross-feature service imports
- `process.env` outside config
- Business logic in controllers or page components
- Placeholder business logic

## Deliverable summary

```
## Summary
<capability delivered>

## Verify
<commands and URLs>

## Spec checklist
<which plan items completed>
```

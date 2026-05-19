# Feature Implementation Workflow (short)

Full process: [product-to-implementation.md](./product-to-implementation.md) and `docs/workflows/ai-implementation-workflow.md`.

Agent prompt: `.ai/prompts/feature-implementation.md`.

## Checklist

1. Approved spec in `docs/specs/`
2. `@monolith/types` if cross-app contract
3. Prisma + `pnpm db:migrate`
4. `apps/api/src/features/<feature>/` (see `.ai/templates/feature-module.md`)
5. Web `lib/` + pages
6. Vitest on services; Playwright if critical UI
7. `.env.example` + validation if new env
8. `pnpm lint`, `typecheck`, `test`, `build`

# Feature Implementation Workflow

1. Define spec in `docs/specs/`
2. Add Prisma models and run `pnpm db:migrate`
3. Implement API feature module under `apps/api/src/features/<feature>/`
4. Add shared types to `@monolith/types` if needed
5. Implement web UI consuming API
6. Add Vitest tests for services and Playwright flows for critical paths
7. Update `.env.example` if new variables are required

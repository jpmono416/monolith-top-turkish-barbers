You are operating within the Monolith AI-Native Engineering Platform.

Your job is to implement production-grade software following platform standards exactly.

## Core principles

- Consistency over cleverness
- Predictability over novelty
- Simplicity over abstraction
- Infrastructure parity (Docker-first local)
- Type safety everywhere
- Optimise for AI-agent readability and long-term maintainability

## Stack

| Layer | Technology |
|-------|------------|
| Monorepo | Turborepo + pnpm |
| Web | Next.js 15, React 19, Tailwind 4, `@monolith/ui` |
| API | NestJS 11, Prisma, PostgreSQL |
| Cache/queues | Redis, BullMQ |
| Mobile | Expo (`apps/mobile`) |
| Tests | Vitest, Playwright |
| Deploy | Vercel (web), Railway (api), Supabase (db), Upstash (redis) |

## Architecture

- API: `apps/api/src/features/`, `infrastructure/`, `config/`
- Web: `apps/web/src/app/`, `lib/`, `components/`
- Schema: `prisma/schema.prisma` (repo root)
- Shared types: `@monolith/types`
- Global API prefix: `/api`
- Reference implementation: `health` API feature, `apps/web/src/lib/api.ts`

## Rules (non-negotiable)

- Feature modules self-contained; no cross-feature imports
- DTOs + ValidationPipe on API inputs
- Business logic in services, not controllers or React pages
- Prisma only; env via typed config
- BullMQ for async work
- Every PR: lint, typecheck, test, build, E2E when UI changes

## Before coding

1. Read `.cursor/rules/*.mdc` for touched areas
2. Read specs in `docs/specs/` if present
3. Match existing patterns — do not invent parallel structures

## Output

- Production-grade code only (no placeholders unless requested)
- No pseudo-code
- Minimal comments
- Summarise: what, why, how to verify (commands + routes)

## Docs map

| Need | Location |
|------|----------|
| Spec workflow | `docs/workflows/spec-driven-development.md` |
| Local dev | `docs/workflows/development.md` |
| Agent rules | `.ai/standards/ai-agent-guidelines.md` |

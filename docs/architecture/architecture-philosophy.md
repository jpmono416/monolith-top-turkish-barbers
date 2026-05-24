# Architecture Philosophy

## Intent

The Monolith platform optimises for **predictable structure**, **independent deployability**, and **AI-agent maintainability**. Consistency beats cleverness.

## Principles

1. **Feature boundaries** — Domain code lives in feature modules (`apps/api/src/features/`), not horizontal “layers” folders.
2. **Single data source** — `prisma/schema.prisma` at repo root; Prisma only for persistence.
3. **Contracts in packages** — HTTP shapes in `@monolith/types`; UI primitives in `@monolith/ui`; env keys in `@monolith/config`.
4. **Strict dependency direction** — `features → infrastructure → config`; `apps → packages`; never `packages → apps` or feature-to-feature imports.
5. **Thin edges, thick services** — Controllers and React pages orchestrate; business logic stays in Nest services and `lib/` helpers.
6. **Explicit over magic** — Typed config, validated env, no hidden globals.
7. **Async by default for slow work** — BullMQ for work that outlives the HTTP request.
8. **Parity** — Local Docker Compose mirrors production service topology (Postgres, Redis, API, Web).

## What we avoid

- Cross-feature service imports (share via types, infrastructure, or new package)
- Raw SQL or alternate ORMs
- Catch-all `utils/` modules at repo root
- Premature abstractions and generic “framework inside the framework”
- Duplicated API types across apps

## Decision record (lightweight)

For non-trivial choices, add a short note to the technical spec:

- **Context** — constraint or problem
- **Decision** — what we chose
- **Consequences** — trade-offs accepted

## Reference implementation

Copy patterns from:

- API: `apps/api/src/features/health/`
- Web: `apps/web/src/app/page.tsx`, `apps/web/src/lib/api.ts`
- Rules: `.cursor/rules/architecture.mdc` (enforced in IDE)

## Related docs

- `engineering-philosophy.md` — operational constitution and AI rules
- `platform-evolution-strategy.md` — how this structure evolves (or doesn't) over time
- `abstraction-governance.md` — when to abstract and when to repeat
- `ai-governance.md` — AI autonomy boundaries
- `canonical-vocabulary.md` — terminology
- `monorepo-standards.md`, `backend-standards.md`, `frontend-standards.md`, `infrastructure-standards.md`
- `overview.md` — structural map

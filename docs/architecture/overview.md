# Architecture Overview

## Monorepo structure

The platform uses a pnpm workspace with Turborepo orchestration. Applications live in `apps/`, shared code in `packages/`, and database schema at the repository root in `prisma/`.

## Applications

### Web (`apps/web`)

Next.js App Router application deployed to Vercel. Consumes `@monolith/ui` for design system components and `@monolith/types` for API contracts.

### API (`apps/api`)

NestJS application deployed to Railway. Organised by:

- `features/` — domain modules (controllers, services, DTOs)
- `infrastructure/` — cross-cutting technical modules (Prisma, Redis, BullMQ)
- `config/` — typed configuration and env validation

### Mobile (`apps/mobile`)

Expo application using Expo Router. Shares types and config from workspace packages.

## Data and async processing

- **PostgreSQL** via Prisma (schema in `/prisma`)
- **Redis** for caching and BullMQ connection
- **BullMQ** for background jobs (queue module scaffolded, processors added per feature)

## Local vs production parity

Docker Compose runs the same services as production (Postgres, Redis, API, Web) with development bind mounts. Environment variables follow a single `.env.example` contract.

## Further reading

| Topic | Doc |
|-------|-----|
| Engineering philosophy | [engineering-philosophy.md](./engineering-philosophy.md) |
| Architecture philosophy | [architecture-philosophy.md](./architecture-philosophy.md) |
| Canonical vocabulary | [canonical-vocabulary.md](./canonical-vocabulary.md) |
| Repository boundaries | [repository-boundaries.md](./repository-boundaries.md) |
| Monorepo | [monorepo-standards.md](./monorepo-standards.md) |
| Backend | [backend-standards.md](./backend-standards.md) |
| Frontend | [frontend-standards.md](./frontend-standards.md) |
| Infrastructure | [infrastructure-standards.md](./infrastructure-standards.md) |

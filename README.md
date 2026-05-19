# Monolith Platform

Foundational monorepo for the Monolith AI-Native Engineering Platform.

## Stack

| Layer | Technology |
| --- | --- |
| Monorepo | Turborepo + pnpm workspaces |
| Web | Next.js, TypeScript, Tailwind CSS, shadcn/ui (`@monolith/ui`) |
| API | NestJS, Prisma, BullMQ, Redis |
| Mobile | Expo (React Native) |
| Database | PostgreSQL (Supabase in production) |
| Cache/queues | Redis + BullMQ (Upstash in production) |
| Testing | Vitest, Playwright |
| Deployment | Vercel (web), Railway (api), Supabase, Upstash |

## Prerequisites

- Node.js 22+
- pnpm 9+
- Docker Desktop (for Docker-first local development)

## Quick start

### Local (pnpm)

```powershell
# Windows
.\scripts\setup.ps1

# macOS / Linux
./scripts/setup.sh
```

Or manually:

```bash
cp .env.example .env
pnpm install
pnpm db:generate
pnpm dev
```

| Service | URL |
| --- | --- |
| Web | http://localhost:3000 |
| API | http://localhost:3001 |
| API health | http://localhost:3001/api/health |

### Docker Compose (recommended)

```bash
cp .env.example .env
docker compose up --build
```

Runs PostgreSQL, Redis, API, and Web with bind mounts for fast iteration.

## Repository layout

```
apps/
  web/          # Next.js frontend
  api/          # NestJS backend
  mobile/       # Expo mobile app
packages/
  ui/           # Shared shadcn/ui components
  types/        # Shared TypeScript types
  config/       # Shared constants
  eslint-config/
  tsconfig/
prisma/         # Database schema (root-level)
infrastructure/
  docker/       # Dockerfiles
  railway/      # Railway deployment config
docs/           # Architecture, specs, standards
.ai/            # AI prompts, workflows, templates
.cursor/rules/  # Cursor agent rules
```

## Common commands

```bash
pnpm dev              # Start all apps (Turbo)
pnpm build            # Production build
pnpm lint             # ESLint across workspace
pnpm typecheck        # TypeScript check
pnpm test             # Vitest unit tests
pnpm db:migrate       # Prisma migrate (dev)
pnpm db:studio        # Prisma Studio
pnpm docker:up        # Docker Compose stack
```

### Per-app commands

```bash
pnpm --filter @monolith/web dev
pnpm --filter @monolith/api dev
pnpm --filter @monolith/mobile dev
pnpm --filter @monolith/web test:e2e
```

## Environment variables

Copy `.env.example` to `.env`. See the file for all variables and deployment notes.

## Adding shadcn/ui components

From `packages/ui`:

```bash
cd packages/ui
pnpm dlx shadcn@latest add <component>
```

Components are consumed by apps via `@monolith/ui`.

## Architecture conventions

- **Feature-based modules** in `apps/api/src/features/`
- **Infrastructure** (database, redis, queue) in `apps/api/src/infrastructure/`
- **Shared types** in `@monolith/types`
- **No business logic** in this template — add features incrementally

## Deployment

| Target | App | Notes |
| --- | --- | --- |
| Vercel | `apps/web` | Root: monorepo; see `apps/web/vercel.json` |
| Railway | `apps/api` | See `infrastructure/railway/` |
| Supabase | Database | Set `DATABASE_URL` / `DIRECT_URL` |
| Upstash | Redis | Set `REDIS_URL` |

## License

Proprietary — Monolith Dev.

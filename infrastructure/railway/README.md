# Railway Deployment

Deploy `@monolith/api` to Railway using the production Dockerfile target.

## Setup

1. Create a Railway project and connect this repository.
2. Set the **service root directory to the repository root** (not `apps/api` alone).
3. Configure `infrastructure/docker/api.Dockerfile` with target `production`.

   Without Docker, use these commands from the repo root:

   | Step    | Command                                           |
   | ------- | ------------------------------------------------- |
   | Install | `pnpm install --frozen-lockfile`                  |
   | Build   | `pnpm --filter @monolith/api build`               |
   | Start   | `pnpm --filter @monolith/api start:prod`          |

   API `prebuild` compiles `@monolith/types` and `@monolith/config` before `nest build`.

4. Add environment variables from `.env.example` (use Supabase for `DATABASE_URL` / `DIRECT_URL`, Upstash for `REDIS_URL`).
5. Set `CORS_ORIGIN` to the Vercel web URL. Add booking vars: `RESEND_API_KEY`, `BOOKING_NOTIFICATION_EMAIL`, `BOOKING_FROM_EMAIL`, and optional WhatsApp sandbox vars.
6. Run migrations via Railway deploy hook or one-off command: `DIRECT_URL="..." pnpm db:migrate`.

If the API crashes at startup with `PrismaClientInitializationError: FATAL: Tenant or user not found`, fix `DATABASE_URL` and `DIRECT_URL` (credentials, project, pooled vs direct URL, `?sslmode=require` on Supabase/Neon).

## Health check

Railway should probe `GET /api/health`.

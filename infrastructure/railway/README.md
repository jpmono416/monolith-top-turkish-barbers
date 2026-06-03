# Railway Deployment

Deploy `@monolith/api` to Railway using the production Dockerfile target.

## Setup

1. Create a Railway project and connect this repository.
2. Set the root directory to the repository root.
3. Configure `infrastructure/docker/api.Dockerfile` with target `production`.
4. Add environment variables from `.env.example` (use Supabase for `DATABASE_URL`, Upstash for `REDIS_URL`).
5. Set `CORS_ORIGIN` to the Vercel web URL. Add booking vars: `RESEND_API_KEY`, `BOOKING_NOTIFICATION_EMAIL`, `BOOKING_FROM_EMAIL`, and optional WhatsApp sandbox vars.
6. Run migrations via Railway deploy hook or one-off command: `pnpm db:migrate`.

## Health check

Railway should probe `GET /api/health`.

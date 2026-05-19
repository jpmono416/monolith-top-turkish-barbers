# Backend Standards

NestJS API at `apps/api`. Enforced in detail by `.cursor/rules/backend.mdc`.

## Structure

```
apps/api/src/
  config/           # configuration.ts, env.validation.ts
  features/<name>/  # module, controller, service, dto/
  infrastructure/   # prisma, redis, queue
  main.ts           # global prefix `api`, ValidationPipe
  app.module.ts
```

## Feature module anatomy

```
features/<name>/
  <name>.module.ts
  <name>.controller.ts
  <name>.service.ts
  dto/
  <name>.service.spec.ts
```

Register in `app.module.ts`.

## Configuration

- All env via `@nestjs/config` + `AppConfig` + `env.validation.ts`
- Never `process.env` outside `config/`
- New vars: `.env.example`, validation, `configuration.ts`, platform dashboards

## HTTP

- Global prefix: `api` → routes like `/api/health`
- `ValidationPipe`: whitelist, forbidNonWhitelisted, transform
- DTOs with `class-validator` on every mutating endpoint
- Responses: DTOs or `@monolith/types`; map errors to Nest HTTP exceptions

## Prisma

- `PrismaService` from `infrastructure/database/`
- Migrations: `pnpm db:migrate`; descriptive names (`add_orders_table`)
- `DATABASE_URL` runtime; `DIRECT_URL` for migrations (Supabase)
- Use `select`/`include` intentionally; `$transaction` for multi-write atomicity

## Queues

- Queue names in `infrastructure/queue/queue.constants.ts`
- Processors: `@Processor(QUEUE_NAMES.x)` in owning feature
- Jobs idempotent when retries enabled

## Testing

- Vitest on services: `*.service.spec.ts`
- Mock Prisma at method level
- Template: `features/health/health.service.spec.ts`

## Checklist for new endpoint

1. Type in `@monolith/types` (if cross-app)
2. DTO + service method + controller route
3. Service unit tests (happy + failure)
4. No business logic in controller

## See also

`docs/architecture/architecture-philosophy.md`, `.ai/templates/api-spec-template.md`

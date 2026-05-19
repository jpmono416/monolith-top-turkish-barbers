# Naming Conventions

Single vocabulary across files, symbols, env, API, and database. Full detail: `.cursor/rules/naming.mdc`.

## Packages

`@monolith/<kebab-name>` — e.g. `@monolith/types`, `@monolith/ui`

## Files

| Kind | Convention | Example |
|------|------------|---------|
| Feature folder | kebab-case | `order-items/` |
| Nest files | kebab-case + suffix | `orders.service.ts` |
| DTOs | kebab-case + `.dto.ts` | `create-order.dto.ts` |
| Tests | `.spec.ts` / `.test.ts` | `orders.service.spec.ts` |
| Specs | `YYYY-MM-DD-feature.md` | `2026-05-20-orders.md` |

## TypeScript symbols

| Kind | Case | Example |
|------|------|---------|
| Types / interfaces | PascalCase | `OrderSummary` |
| Classes | PascalCase | `OrdersService` |
| Functions / vars | camelCase | `findById` |
| Constants (exported) | SCREAMING_SNAKE | `QUEUE_NAMES` |
| Booleans | is/has/can prefix | `isActive` |

## Environment

- SCREAMING_SNAKE_CASE
- `NEXT_PUBLIC_` — browser-safe web
- `DATABASE_URL`, `DIRECT_URL`, `REDIS_URL` — standard Prisma/Redis names

## Database (Prisma)

- Models: PascalCase singular (`Order`, `User`)
- Fields: camelCase (`createdAt`, `userId`)
- IDs: `String @id @default(cuid())` unless domain requires UUID
- Timestamps: `createdAt`, `updatedAt` on mutable entities

## HTTP API

- Path segments: kebab-case, plural resources (`/api/order-items`)
- JSON properties: camelCase

## Git branches

`feature/`, `fix/`, `chore/` + short description

## Anti-patterns

- `ordSvc`, `usrMgr` abbreviations
- `utils.ts` at feature root without domain prefix
- Renaming env vars without updating compose, CI, and `.env.example`

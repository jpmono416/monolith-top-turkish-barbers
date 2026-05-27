# Technical Spec: [Feature Name]

> **Status:** draft | review | approved | implementing | done  
> **Product spec:** [link to product spec]  
> **Owner:** [engineer]  
> **Last updated:** YYYY-MM-DD

## Summary

One paragraph: what we build technically and how it maps to the product spec.

## Scope

### In scope

- …

### Out of scope

- …

## Architecture impact


| Layer                  | Change                 |
| ---------------------- | ---------------------- |
| `@monolith/types`      | …                      |
| `apps/api` feature     | `features/<name>/`     |
| `apps/web`             | routes, `lib/` helpers |
| `apps/mobile`          | if applicable          |
| `prisma/schema.prisma` | models, indexes        |
| Queues                 | BullMQ job(s)          |
| Infra / env            | new vars, compose, CI  |


## Data model

```prisma
// Proposed models / fields — finalise in schema before implementation
```

- Relationships, cascades, soft-delete strategy
- Indexes for query patterns
- Migration name: `add_<thing>`

## API contract

Base path: `/api/<resource>` (global prefix `api` in `main.ts`).


| Method | Path | Auth | Request | Response | Notes |
| ------ | ---- | ---- | ------- | -------- | ----- |
| GET    | …    | …    | …       | …        | …     |


Shared types live in `@monolith/types` — define before implementation.

## DTOs & validation


| DTO          | Fields | Rules           |
| ------------ | ------ | --------------- |
| `CreateXDto` | …      | class-validator |


## Service logic

- Core operations and invariants
- Idempotency requirements
- Transactions (`prisma.$transaction`) where needed
- Error mapping (HTTP exceptions)

## Async / queues


| Queue | Job name | Payload | Retries | Idempotent |
| ----- | -------- | ------- | ------- | ---------- |
| …     | …        | …       | 3       | yes/no     |


## Web / mobile

- Routes: `apps/web/src/app/...`
- Data fetching: Server Components + `lib/` helpers (no scattered `fetch`)
- Client components only where interaction requires

## Security

- AuthN/AuthZ per endpoint
- Input validation, rate limits if needed
- No secrets in client bundles (`NEXT_PUBLIC_` only for public config)

## Observability

- Log events (structured, no PII leakage)
- Metrics or alerts if production-critical

## Testing plan


| Layer       | What to test                       |
| ----------- | ---------------------------------- |
| API service | happy + failure paths (Vitest)     |
| Web `lib/`  | helpers if non-trivial             |
| E2E         | critical user journey (Playwright) |


## Rollout

- Feature flag: yes/no
- Migration order: migrate → deploy API → deploy web
- Rollback plan

## Open questions

- …


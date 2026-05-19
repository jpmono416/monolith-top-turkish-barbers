# API Spec: [Resource Name]

> Endpoint-level contract for agents. Align with `docs/specs/technical-spec-template.md`.

## Resource

- Controller path: `@Controller('<kebab-plural>')` → `/api/<kebab-plural>`
- Feature folder: `apps/api/src/features/<feature>/`

## Endpoints

### `GET /api/<resource>`

| | |
|---|---|
| Auth | none / bearer / role |
| Query | `?page=1&limit=20` |
| Response | `ResourceListResponse` (`@monolith/types`) |
| Errors | `401`, `403` |

### `POST /api/<resource>`

| | |
|---|---|
| Auth | … |
| Body | `CreateResourceDto` |
| Response | `201` + `ResourceSummary` |
| Errors | `400` validation, `409` conflict |

## DTOs

```typescript
// create-resource.dto.ts — class-validator fields
export class CreateResourceDto {
  @IsString()
  name!: string;
}
```

## Service methods

| Method | Prisma / side effects |
|--------|----------------------|
| `findAll()` | `findMany` + pagination |
| `create(dto)` | `create`; enqueue job if needed |

## Types (`@monolith/types`)

```typescript
export type ResourceSummary = { id: string; name: string };
export type ResourceListResponse = { items: ResourceSummary[]; total: number };
```

## Error mapping

| Condition | Exception |
|-----------|-----------|
| Not found | `NotFoundException` |
| Invalid input | `BadRequestException` |

## Tests

```typescript
// <feature>.service.spec.ts
describe('create', () => {
  it('creates resource', async () => { ... });
  it('throws when duplicate', async () => { ... });
});
```

## Web consumer

```typescript
// apps/web/src/lib/<feature>.ts
export async function getResources(): Promise<ResourceListResponse | null>
```

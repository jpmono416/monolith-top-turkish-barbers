# Queue Job Spec: [Job Name]

## Overview

| Field | Value |
|-------|-------|
| Queue | `QUEUE_NAMES.<name>` |
| Job name | `<kebab-job-name>` |
| Owner feature | `apps/api/src/features/<feature>/` |
| Idempotent | yes / no |

## Trigger

- Enqueued from: `<Service.method>` after `<event>`
- HTTP must not block on completion

## Payload

```typescript
export type SendConfirmationPayload = {
  orderId: string;
};
```

## Processor

```
apps/api/src/features/<feature>/
  <feature>.processor.ts   # @Processor(QUEUE_NAMES.x)
```

```typescript
@Processor(QUEUE_NAMES.default)
export class ExampleProcessor extends WorkerHost {
  async process(job: Job<SendConfirmationPayload>): Promise<void> {
    // idempotent: check state before side effect
  }
}
```

## Options

```typescript
await this.queue.add('<job-name>', payload, {
  attempts: 3,
  backoff: { type: 'exponential', delay: 1000 },
});
```

## Failure handling

| Failure | Behaviour |
|---------|-----------|
| Transient | Retry per attempts |
| Permanent | Log; optional dead-letter / alert |
| Duplicate run | Safe because: … |

## Env

- `REDIS_URL`, `BULLMQ_PREFIX` (existing)

## Verify locally

1. `pnpm docker:up` or `postgres` + `redis` only
2. Trigger enqueue via API
3. Confirm job in Redis / logs completed

## Tests

- Unit: mock queue `add` called with expected payload
- Integration (optional): processor with mocked dependencies

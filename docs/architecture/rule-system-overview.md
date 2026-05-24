# Rule System Overview

The single explanation of how `.cursor/rules/*.mdc` is organised, what each file owns, and how AI agents and humans should interpret overlap.

This document is **descriptive** — the rule files themselves are authoritative. If a rule file disagrees with this overview, fix the overview.

## Purpose of the rule system

Rules in `.cursor/rules/` exist to:

- Encode the platform's non-negotiable patterns directly into the IDE so AI agents reproduce them automatically.
- Keep humans and agents on a single shared vocabulary and a single set of decisions.
- Reduce the cost of every change — fewer choices, less review effort, fewer drift incidents.

The rule system is **not**:

- A governance framework.
- A specification of every possible decision.
- A replacement for `docs/architecture/engineering-philosophy.md`. Philosophy explains *why*; rules enforce *what*.

## Structure

Each rule file has:

- A **single concern** it owns canonically.
- A `globs` field defining which files trigger it (or `alwaysApply: true` for cross-cutting rules).
- A consistent layout: `Purpose` → `Required patterns` → `Forbidden patterns` → `Implementation expectations` → `Examples`.

Two rules are always loaded:

- `monolith-platform.mdc` — stack overview and rule map. The entry point.
- `agent-behaviour.mdc` — workflow, scope discipline, output quality.

The other ten rules are loaded by glob when an agent touches a relevant file.

## Canonical ownership

Every concern has exactly one owner. Other rules **reference** the owner instead of restating its content.

| Concern | Canonical owner | Referenced by |
|---|---|---|
| AI workflow, scope, output quality | `agent-behaviour.mdc` | `monolith-platform.mdc` |
| Stack and rule index | `monolith-platform.mdc` | (entry point) |
| Repo layout, layer boundaries, dependency direction | `architecture.mdc` | `backend.mdc`, `frontend.mdc` |
| API implementation (Nest, Prisma, queues, errors, env wiring) | `backend.mdc` | `architecture.mdc`, `security.mdc`, `api-design.mdc` |
| Web implementation (Next, Tailwind, shadcn, lib client) | `frontend.mdc` | `architecture.mdc` |
| HTTP contracts (URLs, status codes, response shapes) | `api-design.mdc` | `backend.mdc`, `security.mdc` |
| File, symbol, env, DB, route casing | `naming.mdc` | all |
| pnpm workspace, Turbo tasks, Node/pnpm toolchain pin | `monorepo.mdc` | `infra.mdc`, `docker.mdc` |
| Test policy and locations | `testing.mdc` | `infra.mdc`, `agent-behaviour.mdc` |
| Local Docker Compose and Dockerfiles | `docker.mdc` | `infra.mdc` |
| CI pipeline (PR gate), deploy targets, env-var registration | `infra.mdc` | `agent-behaviour.mdc`, `testing.mdc`, `backend.mdc` |
| Secrets, auth, validation policy, data exposure | `security.mdc` | `backend.mdc`, `api-design.mdc` |

### Special cases

- **`health` reference implementation** — owned by `agent-behaviour.mdc`. Other rules describe the structure new code must follow but do not repeat the "match the health feature" instruction.
- **Env-var registration checklist** — owned by `infra.mdc`. `backend.mdc` and `agent-behaviour.mdc` point to it.
- **PR gate (`pnpm lint` / `typecheck` / `test` / `build` / Playwright E2E)** — owned by `infra.mdc`. `testing.mdc` and `agent-behaviour.mdc` reference it.
- **Node/pnpm versions** — pinned by `monorepo.mdc`. `docker.mdc` and `infra.mdc` reference it and require parity.
- **`@monolith/*` package list** — names owned by `naming.mdc`, contents owned by `monorepo.mdc`, layer rules owned by `architecture.mdc`.

## How AI agents should interpret overlap

When two rules appear to address the same concern:

1. **Identify the canonical owner** in the table above. The owner's wording is authoritative.
2. **Treat references as read-only pointers.** A line like *"defined in `infra.mdc`"* means "do not duplicate this here — go read it".
3. **If the owner is silent, the referencing rule wins** (this is rare and indicates the table needs an update).
4. **If two rules contradict and neither is clearly the owner**, raise it as a drift issue and ask for a decision. Do not silently pick one.

When `.cursor/rules/*.mdc` and `docs/` disagree, the rule file wins. `docs/` explains; rules enforce. Flag the drift.

## Rule file structure (template)

Every rule file uses the same shape so agents can scan it quickly:

```markdown
---
description: Short one-line summary
globs:
  - "..."
alwaysApply: false
---

# Title

## Purpose
Why this rule exists, in 1–2 sentences. Mention which adjacent rules own related concerns.

## Required patterns
The prescriptions. Sub-headings group related items.

## Forbidden patterns
What not to do. Short, declarative.

## Implementation expectations
Operational reminders that follow from the prescriptions.

## Examples
Good and bad code, brief.
```

Sections may be omitted if empty. Do **not** add new sections without a strong reason.

## Maintenance

- A new concern requires a canonical owner before it can be added to any rule.
- If a concern starts appearing in three files, consolidate it into the owner and replace the duplicates with references.
- Rule files should remain short. If a rule grows past ~150 lines, look for content that has drifted from another concern's territory.
- This overview is updated whenever ownership changes — never let the table fall behind reality.

## Anti-goals

This rule system is **not** trying to:

- Cover every coding decision. Most decisions follow the existing pattern in the touched feature.
- Replicate documentation. Rules state the rule; docs explain the reasoning.
- Encode style preferences. ESLint/Prettier handle those.
- Support large-team governance. The platform is designed for solo and small-team operation with AI assistance.

If a proposed rule change adds process rather than pattern enforcement, push back. See `docs/architecture/engineering-philosophy.md`.

## Related

- [`engineering-philosophy.md`](./engineering-philosophy.md) — governance and AI rules
- [`architecture-philosophy.md`](./architecture-philosophy.md) — structural rules
- [`canonical-vocabulary.md`](./canonical-vocabulary.md) — terminology
- [`overview.md`](./overview.md) — repo map
- [`../../.cursor/rules/monolith-platform.mdc`](../../.cursor/rules/monolith-platform.mdc) — the rule index itself

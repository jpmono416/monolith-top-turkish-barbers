# Canonical Vocabulary

The single source of truth for terminology used across `docs/`, `.cursor/rules/`, and `.ai/`. Read before writing platform documentation, naming a new package, or letting an AI agent generate prose that touches architecture.

This document does **not** introduce new concepts. It fixes the names of concepts that already exist.

## Why this exists

AI agents and humans both reproduce whatever vocabulary they see. Drift in terminology becomes drift in architecture. Every term below has exactly one meaning in this repository.

## Repository terms


| Term                      | Meaning                                                                                         | Notes                                                                  |
| ------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Platform**              | The Monolith AI-Native Engineering Platform — the named standard (stack + conventions + rules). | Conceptual. Not a specific repo.                                       |
| **Template**              | This concrete repository, intended to be cloned to start a new product.                         | Filesystem-level. There is one template.                               |
| **Project**               | A downstream codebase cloned from the template.                                                 | Each product is a project.                                             |
| **Repository** / **repo** | Any git repository implementing the platform.                                                   | Interchangeable.                                                       |
| **Monorepo**              | The Turborepo + pnpm workspace layout used by both the template and projects.                   | Structural.                                                            |
| **Stack**                 | The fixed default set of technologies (Next.js, NestJS, Prisma, Postgres, Redis, BullMQ, etc.). | Listed in `.cursor/rules/monolith-platform.mdc`.                       |
| **App** / **application** | A deployable artefact under `apps/` (`apps/web`, `apps/api`, `apps/mobile`).                    | Plural: apps.                                                          |
| **Package**               | A workspace entry under `packages/`* published as `@monolith/<name>`.                           | Internal, `workspace:*` only.                                          |
| **Shared package**        | A `package` consumed by multiple apps.                                                          | Same thing as package; the "shared" qualifier is optional but allowed. |


## Code-structure terms


| Term                                | Meaning                                                                                                                                                                                             |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Feature**                         | A bounded domain unit owned by the platform. In the API: `apps/api/src/features/<feature>/`. The unit of organisation.                                                                              |
| **Feature folder**                  | The directory `apps/api/src/features/<feature>/` and its colocated files. Filesystem term.                                                                                                          |
| **Feature module**                  | The compound of the feature folder, its NestJS `@Module()` class, and its colocated controller / service / DTOs / processor / tests. Acceptable when distinguishing from a plain Nest module class. |
| **NestJS module**                   | The `@Module()` class itself (`<feature>.module.ts`). Framework construct.                                                                                                                          |
| **Controller**                      | A NestJS controller class. HTTP mapping only — no business logic.                                                                                                                                   |
| **Service** (code)                  | A NestJS `@Injectable()` class (`*.service.ts`). Holds business logic.                                                                                                                              |
| **DTO**                             | `class-validator`-decorated input class colocated under `dto/`.                                                                                                                                     |
| **Processor**                       | A BullMQ `@Processor()` class colocated with its owning feature.                                                                                                                                    |
| **Infrastructure module**           | A cross-cutting technical module under `apps/api/src/infrastructure/` (Prisma, Redis, queue). Not a feature.                                                                                        |
| **Config module**                   | Code under `apps/api/src/config/` — typed env loading and validation. Not infrastructure.                                                                                                           |
| **Reference implementation**        | The canonical concept: an exemplar in the repository that agents must copy from rather than invent alternatives to.                                                                                 |
| **Health reference implementation** | The current concrete reference: the `health` API feature plus `apps/web/src/lib/api.ts`. The `health` feature is the API exemplar; `lib/api.ts` is the web client exemplar.                         |
| **Domain**                          | The business area a feature represents (e.g. "orders", "billing"). Not a synonym for "feature" — a feature implements a domain.                                                                     |


## Infrastructure terms

The word "infrastructure" has two senses in this repo. Folders are **not** being renamed; context resolves which sense is meant. The qualifiers below exist to disambiguate in prose when context is unclear.


| Term                           | Meaning                                                                                                                                                                                                                                                               |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Operational infrastructure** | Deployment, configuration, and runtime environment tooling outside application code: Docker, Compose, Railway, Vercel, GitHub Actions, hosting configuration. Top-level `infrastructure/` folder, `.github/workflows/`, `docker-compose.yml`, `apps/web/vercel.json`. |
| **Runtime infrastructure**     | Infrastructure integration code inside applications: Prisma client, Redis client, queue wiring, external provider adapters. `apps/api/src/infrastructure/`.                                                                                                           |
| **Infrastructure module**      | (As above under code-structure terms.) A NestJS module under `apps/api/src/infrastructure/` — a unit of runtime infrastructure.                                                                                                                                       |
| **Service (Compose)**          | A container service in `docker-compose.yml` (`postgres`, `redis`, `api`, `web`). Local-only term.                                                                                                                                                                     |
| **Deployed application**       | A production-deployed app on Vercel (web) or Railway (api). Use this term instead of "service" in production contexts.                                                                                                                                                |
| **Environment**                | A runtime context: `local`, `ci`, `staging`, `production`.                                                                                                                                                                                                            |
| **Pipeline**                   | The CI/CD flow in `.github/workflows/`.                                                                                                                                                                                                                               |
| **Migration**                  | A Prisma schema migration produced via `pnpm db:migrate`.                                                                                                                                                                                                             |
| **Schema**                     | The Prisma schema at `prisma/schema.prisma`.                                                                                                                                                                                                                          |
| **Queue**                      | A BullMQ queue registered in `infrastructure/queue/queue.constants.ts` (`QUEUE_NAMES`).                                                                                                                                                                               |
| **Job**                        | A single unit of work enqueued to a queue.                                                                                                                                                                                                                            |
| **Processor**                  | (Repeated for clarity.) The class that consumes jobs from a queue.                                                                                                                                                                                                    |


## Spec & workflow terms

The word "spec" must always be qualified. There are exactly three spec types.


| Term                    | Meaning                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Product spec**        | The product-level brief under `docs/specs/` (template: `product-spec-template.md`). Problem, goals, acceptance criteria.       |
| **Technical spec**      | The engineering-level design under `docs/specs/` (template: `technical-spec-template.md`). API, data model, security, tests.   |
| **Implementation plan** | The ordered execution checklist under `docs/specs/` (template: `implementation-plan-template.md`). PR slices and verify steps. |
| **Workflow**            | A multi-step process under `docs/workflows/` or `.ai/workflows/`.                                                              |
| **Slice**               | A PR-sized portion of an implementation plan.                                                                                  |
| **Gate**                | A required check (spec approval, CI green, review) before progressing a stage.                                                 |


## API terms

Light governance — distinguish the framework construct from the external capability.


| Term             | Meaning                                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Route**        | A framework-level routing construct: the controller method or Next.js route file that handles a request. Implementation-level.    |
| **Endpoint**     | An externally exposed API capability — what a client calls. Consumer-facing.                                                      |
| **API contract** | The request/response schema and behavioural expectations of an endpoint. Declared via DTOs and shared types in `@monolith/types`. |


## Documentation surfaces


| Surface               | Purpose                                                                      | Audience                      |
| --------------------- | ---------------------------------------------------------------------------- | ----------------------------- |
| `.cursor/rules/*.mdc` | Enforced rules in the IDE. Authoritative on conflict.                        | AI agents, IDE                |
| `docs/`               | Human-readable explanations, philosophy, workflows. **Explains the system.** | Humans + agents reading prose |
| `.ai/`                | Agent prompts, agent-facing workflows, templates. **Operates the system.**   | Agents                        |
| `docs/specs/`         | Product specs, technical specs, and implementation plans per feature.        | Humans + agents implementing  |


Detail: `[repository-boundaries.md](./repository-boundaries.md)`.

On conflict: `.cursor/rules/*.mdc` wins; flag the drift instead of silently following stale prose.

## Forbidden / ambiguous terms

Do not introduce these terms into docs, code comments, or new files.


| Forbidden                                                                    | Reason                                                                  | Use instead                                                                                  |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Domain module**                                                            | Drifts from "feature".                                                  | **Feature** (or **feature folder**)                                                          |
| **Module** (unqualified, in prose)                                           | Ambiguous between NestJS module, feature folder, and workspace package. | Pick one: **feature**, **NestJS module**, or **package**.                                    |
| **Utility** / **utility module** / **util**                                  | Encourages catch-all dumping grounds.                                   | A named **package** (`@monolith/<name>`) or feature-colocated file.                          |
| **Helper** (as a package or top-level folder)                                | Same as utility.                                                        | A feature-colocated `<feature>-<purpose>.ts` file.                                           |
| **Common** (as a folder name)                                                | Same as utility.                                                        | A named package or feature folder.                                                           |
| **System** (referring to a feature, service, or app)                         | Hides which platform concept is meant.                                  | **Feature**, **service**, **app**, or **package** — be explicit.                             |
| **Library** (for in-repo code)                                               | Implies an external published artefact.                                 | **Package**.                                                                                 |
| **Microservice**                                                             | Not part of this stack; the platform is a modular monolith.             | **API** (`apps/api`) or **feature**.                                                         |
| **Service** (referring to a deployed app in production)                      | Conflicts with the NestJS `*.service.ts` meaning.                       | **Deployed application** or name the platform (`Railway API`, `Vercel web`).                 |
| **Spec** / **the spec** / **spec document** / **write a spec** (unqualified) | Hides which of the three artefacts is meant.                            | **Product spec**, **technical spec**, or **implementation plan**.                            |
| **Reference feature**                                                        | Drifts from the canonical concept.                                      | **Reference implementation** (collective) or **health reference implementation** (specific). |


If a term you need is not in this document, prefer wording from an existing rule or doc. If genuinely new, propose an addition here before using it in code or prose.

## Naming expectations (cross-reference)

For concrete file, symbol, env, DB, and route casing rules see:

- `.cursor/rules/naming.mdc` — enforced
- `[../standards/naming-conventions.md](../standards/naming-conventions.md)` — narrative

This document governs **which word to use**. The naming docs govern **how to spell it**.

## Examples

**Good**

> Added a new **feature** under `apps/api/src/features/orders/`. The **feature module** registers `OrdersController` and `OrdersService`. Shared response types live in the `@monolith/types` **package**.

**Bad**

> Added a new **module** for orders with a utility **library** for shared **systems**.  
> *Three ambiguous terms. Rewrite using `feature`, `package`, and the specific named concept.*

**Good**

> Local stack runs four Compose **services** (`postgres`, `redis`, `api`, `web`). In production, the **API** is a **deployed application** on Railway.

**Bad**

> The Railway service talks to the Supabase system via the API microservice.

## Maintenance

- Changes to this document are platform-level decisions — treat as architecture changes.
- Add a term only when it is already in use across at least two surfaces (`docs/` + rules, or rules + `.ai/`).
- Remove a term when it has not appeared in the repo for two release cycles.

## Related

- `[engineering-philosophy.md](./engineering-philosophy.md)` — governance and AI rules
- `[architecture-philosophy.md](./architecture-philosophy.md)` — structural rules
- `[repository-boundaries.md](./repository-boundaries.md)` — `docs/` vs `.ai/` split
- `[../standards/naming-conventions.md](../standards/naming-conventions.md)` — spelling and casing
- `.cursor/rules/naming.mdc` — enforced naming
- `.cursor/rules/architecture.mdc` — feature and dependency boundaries


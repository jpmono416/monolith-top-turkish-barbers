# Engineering Philosophy

The operational constitution of the Monolith platform. Read before proposing architectural change, introducing a new dependency, or letting an AI agent redesign anything.

This document does not describe code structure — see `[architecture-philosophy.md](./architecture-philosophy.md)` for that. This document governs **how decisions are made**, **what the platform optimises for**, and **what AI agents are and are not allowed to do**.

## What this platform is

- A delivery vehicle for products. Not a product.
- A consistent substrate for a small, AI-assisted engineering operation.
- Opinionated infrastructure that absorbs decisions so feature work does not have to.

## What this platform is not

- A research project.
- A showcase of architectural taste.
- An autonomous AI system. Humans own product and platform direction.
- A framework to be extended for its own sake.

## Identity


| Principle                        | Meaning                                                                            |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| Platform serves products         | Anything that does not accelerate product delivery is overhead.                    |
| Small operation, high leverage   | Optimised for few humans + many AI agents, not large teams.                        |
| AI is a collaborator             | AI agents implement and propose. They do not architect.                            |
| Human-controlled governance      | Product, architecture, and stack decisions are human-approved.                     |
| Operational simplicity is a moat | Boring infrastructure ships features.                                              |
| Consistency compounds            | The same pattern, applied everywhere, beats five better patterns applied unevenly. |
| Predictability over novelty      | Surprises cost more than they save.                                                |


## What we optimise for

In priority order. When two conflict, the higher wins.

1. **Maintainability** — code that survives staff changes, model upgrades, and time.
2. **Operational clarity** — production behaviour is obvious from the code.
3. **Explicitness** — typed config, named modules, visible wiring. No hidden globals.
4. **Shipping velocity** — the smallest correct diff, merged today, beats the elegant refactor next sprint.
5. **AI readability** — patterns AI agents recognise and reproduce without guidance.
6. **Low cognitive overhead** — a new contributor (human or agent) is productive in a feature within an hour.
7. **Reusable operational patterns** — one way to read env, one way to enqueue, one way to expose an endpoint.
8. **Infrastructure consistency** — same shape across features, apps, and environments.
9. **Stable implementation patterns** — patterns change rarely and deliberately.

Elegance is not on this list. It is a side effect, not a goal.

## What we actively avoid


| Anti-pattern                      | Why it is rejected                                                    |
| --------------------------------- | --------------------------------------------------------------------- |
| Premature abstraction             | Adds indirection before the shape is known.                           |
| Architecture theatre              | DDD layers, hexagons, ports/adapters with no operational payoff.      |
| Unnecessary microservices         | Network calls and deploy complexity instead of function calls.        |
| Over-configurability              | Every flag is a future bug and a future support ticket.               |
| Pattern-driven development        | Patterns applied because they exist, not because they solve pain.     |
| Excessive indirection             | Reading the code should not require a debugger.                       |
| Complexity accumulation           | New layers without removing old ones.                                 |
| Framework obsession               | Wrapping the framework in another framework.                          |
| Reinventing solved infrastructure | If Postgres, Redis, or Next.js already does it, we do not rebuild it. |
| “Just in case” engineering        | Speculative flexibility is a tax on every future change.              |


If a proposed change matches any row above, it is rejected by default.

## Mandatory principles

These are not preferences. They are the constitution.

1. **Deletion is preferred over addition.** Removing code, dependencies, or layers is the highest-leverage change.
2. **The smallest correct diff wins.** Five focused lines beat a new utility, a new package, or a new abstraction.
3. **Every new layer must justify its operational value.** No abstraction ships without a concrete, named problem it solves today.
4. **Repetition is acceptable until abstraction is clearly beneficial.** Two duplicates are fine. Three repeated, identical occurrences with a stable shape is the earliest signal to abstract.
5. **Abstractions emerge from proven pain.** Never from anticipated pain.
6. **Simplicity scales better than sophistication in AI-assisted systems.** Sophisticated code becomes uneditable by both humans and agents.
7. **Modular monolith first.** Split only when there is a load, deploy, or ownership reason — not a taste reason.
8. **Shared standards reduce cognitive load.** Diverging from house style requires a written reason.
9. **Tooling supports products.** Tooling that exists to be admired is deleted.

If a change cannot be justified against this list, it does not ship.

## Technology governance

The default stack is fixed:

- Turborepo + pnpm
- Next.js, React, Tailwind, shadcn/ui
- NestJS, Prisma, PostgreSQL
- Redis, BullMQ
- Vitest, Playwright
- Docker Compose locally; Vercel + Railway + Supabase + Upstash in production

Rules:


| Rule                                    | Detail                                                                               |
| --------------------------------------- | ------------------------------------------------------------------------------------ |
| Default stack is the answer             | Until proven otherwise for a specific, scoped problem.                               |
| Deviations are proposals, not facts     | Raised before implementation, never during.                                          |
| Deviations require human approval       | An agent cannot self-authorise a new library, ORM, queue, or framework.              |
| Operational cost outranks technical fit | A “better” tool that adds infra, monitoring, or a new failure mode loses by default. |
| Stack consistency is a feature          | Different solutions to the same problem across features is itself a defect.          |


A deviation request must answer:

- What concrete operational problem does this solve in this codebase, today?
- What is being deleted in exchange?
- What is the rollback path?

Vague answers reject the proposal.

## AI governance

AI agents operate inside this constitution. They do not override it.

**Agents may:**

- Implement features inside existing patterns.
- Propose deviations **before** writing code.
- Identify duplication, drift, or rule violations and raise them.
- Suggest deletions.

**Agents must not:**

- Redesign platform architecture autonomously.
- Introduce new libraries, frameworks, or infrastructure without explicit human approval.
- Invent new module shapes, folder layouts, or naming conventions when an existing one applies.
- Create parallel abstractions “for cleanliness”.
- Refactor untouched code while completing an unrelated task.
- Mark uncertainty as a decision. Uncertainty is escalated.

**Agent reasoning priority:**

1. Match the existing pattern in the touched feature.
2. If no pattern exists, match the closest analogous feature (e.g. `apps/api/src/features/health/`).
3. If still unclear, escalate with a short proposal. Do not invent.

**Escalation beats invention.** A correct question is cheaper than a wrong system.

## How decisions are made


| Type                                             | Owner          | Mechanism                                     |
| ------------------------------------------------ | -------------- | --------------------------------------------- |
| Product scope                                    | Human          | Spec under `docs/specs/`                      |
| Architecture / platform shape                    | Human          | PR + decision note in the relevant spec       |
| Library / infra additions                        | Human          | Explicit approval, recorded in PR description |
| Implementation pattern inside an existing module | Agent or human | Match existing precedent                      |
| Deletion / simplification                        | Anyone         | Default-allow; smaller is the goal            |


Non-trivial decisions are captured as a short note in the relevant technical spec:

- **Context** — the constraint.
- **Decision** — what was chosen.
- **Consequences** — what is accepted, what is lost.

No separate ADR registry. The technical spec is the record.

## Drift control

This platform decays the moment patterns diverge. Drift is prevented by:

- A fixed default stack (above).
- `.cursor/rules/*.mdc` enforcing layout, naming, and dependency direction in the IDE.
- Reference implementations agents must mirror (`apps/api/src/features/health/`, `apps/web/src/lib/api.ts`).
- A bias toward **deletion** and **the smallest correct diff** at review time.
- Human approval gates on stack and architecture changes.

If two features solve the same problem differently, one is wrong. The older, simpler, or more consistent one wins.

## Long-term anchors

These hold even when the team, models, or product change.

1. The platform exists to ship products. If a change does not shorten the path from spec to production, it is suspect.
2. Boring infrastructure outlasts clever infrastructure.
3. AI agents are powerful implementers and dangerous architects. Keep them on the implementation side of that line.
4. Consistency is worth more than any single improvement.
5. Every layer, dependency, and abstraction is a liability until proven otherwise.

## Related

- `[architecture-philosophy.md](./architecture-philosophy.md)` — structural rules
- `[canonical-vocabulary.md](./canonical-vocabulary.md)` — terminology
- `[overview.md](./overview.md)` — repo map
- `[../standards/coding-standards.md](../standards/coding-standards.md)` — code quality bar
- `[.cursor/rules/agent-behaviour.mdc](.cursor/rules/agent-behaviour.mdc)` — agent enforcement
- `[.cursor/rules/architecture.mdc](.cursor/rules/architecture.mdc)` — boundary enforcement


# AI Governance

The operational boundary between what AI agents may do autonomously in this repository and what requires a human. Read before letting an agent design, deviate, abstract, or refactor.

This document is the **canonical owner** of AI autonomy rules. The "AI governance" section in `[engineering-philosophy.md](./engineering-philosophy.md)` is a summary that points here. `.cursor/rules/agent-behaviour.mdc` is the enforced restatement in the IDE — on conflict the rule file wins; flag the drift.

## Purpose

AI agents are implementation collaborators on this platform. They accelerate feature delivery inside an established structure. They do **not** own architecture, stack composition, abstractions, or repository shape. This document fixes that boundary so agents can move fast inside it and stop at it.

## Operating model


| Role                                    | Owner                               | What it does                                        |
| --------------------------------------- | ----------------------------------- | --------------------------------------------------- |
| Product direction                       | Human                               | Decides what is built.                              |
| Architecture and stack                  | Human                               | Decides how the platform is shaped.                 |
| Implementation inside existing patterns | Agent                               | Writes the code.                                    |
| Deviation proposals                     | Agent (proposes) → Human (approves) | Raises a deviation before writing it.               |
| Drift and duplication observations      | Agent                               | Reports; never silently fixes via new abstractions. |


If an action does not map cleanly to a row above, default to escalation.

## AI autonomy boundaries

Three zones. An action belongs to exactly one.


| Zone                          | Scope                                                                                                                                                                              | Authority                                                                           |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Green** — implementation    | Code that matches an existing pattern in the touched feature or in the [health reference implementation](./canonical-vocabulary.md#code-structure-terms).                          | Agent proceeds.                                                                     |
| **Yellow** — pattern-adjacent | No exact precedent, but a clear analogous feature exists.                                                                                                                          | Agent mirrors the closest analogous feature and notes the choice in the PR summary. |
| **Red** — architectural       | New libraries, frameworks, packages, folder shapes, abstractions, infrastructure, env-var conventions, naming conventions, dependency directions, or anything inventing structure. | Agent stops, proposes, waits for human approval.                                    |


Uncertainty about the zone is itself a Red signal. Escalate.

## Acceptable implementation autonomy

Agents may, without asking, do all of the following — provided each remains inside a Green or Yellow zone:

- Implement features described by an approved spec under `docs/specs/`.
- Add controllers, services, DTOs, processors, and tests inside an existing feature folder.
- Add a new feature folder under `apps/api/src/features/` that mirrors the [health reference implementation](./canonical-vocabulary.md#code-structure-terms).
- Add Next.js routes, pages, and server components inside `apps/web/src/app/` following existing patterns.
- Extend `@monolith/types` with new API contract types.
- Add Prisma models, fields, and migrations that follow `[naming.mdc](../../.cursor/rules/naming.mdc)`.
- Add or extend tests at the locations defined in `[testing.mdc](../../.cursor/rules/testing.mdc)`.
- Wire new env vars through the registration checklist in `[infra.mdc](../../.cursor/rules/infra.mdc)`.
- Delete code, dependencies, dead modules, or unused exports inside the task's scope.
- Rename for consistency with the canonical vocabulary, within the touched feature only.
- Fix lint, typecheck, and test failures introduced by the current change.
- Append entries to `[potential-abstractions.md](./potential-abstractions.md)` when the criteria in that document are met.

Each of the above must still produce the **smallest correct diff** and match the closest existing pattern.

## Forbidden autonomous behaviour

Agents must not perform any of the following without explicit human approval recorded in the PR or spec:

- Introduce a new library, framework, ORM, queue, state manager, UI kit, validation library, test runner, or build tool.
- Replace an existing library with another.
- Create a new workspace package, change the `@monolith/`* package set, or alter package boundaries.
- Change `tsconfig`, ESLint, Prettier, Turborepo, pnpm workspace, or Vitest configuration in ways that change project semantics.
- Add a new top-level folder, change `apps/` or `packages/` layout, or invent a parallel structure to an existing one.
- Add new architectural layers, "framework inside the framework" wrappers, or generalised abstractions over existing patterns.
- Implement an entry from `[potential-abstractions.md](./potential-abstractions.md)`. That file is observation-only; implementation requires human approval.
- Refactor untouched code while completing an unrelated task.
- Rewrite working code into a different style for taste reasons.
- Cross feature boundaries with imports (`features/orders` importing from `features/billing`).
- Add bypass paths around validation, auth, or DTOs to "make it work".
- Disable lint, typecheck, or test checks, or mark them as skipped, to ship a change.
- Add `// TODO`, placeholder business logic, or speculative interfaces unless the user explicitly requested stubs.
- Generate large documentation, ADRs, or README files unless requested.
- Commit, push, or open a PR unless the user explicitly asked.
- Treat uncertainty as a decision. Uncertainty is escalated.

If a task appears to require any of the above, the agent stops and escalates with a short proposal — it does not improvise.

## Architectural escalation expectations

Escalation is not failure. It is the agent's primary value over a copy-paste tool: detecting when the task has left the green zone and bringing the human in before the damage is done.

An agent must escalate when any of the following is true:

- The task requires a Red-zone action.
- No reference pattern exists in the touched area and no clearly analogous feature applies.
- Two existing patterns conflict and there is no canonical owner.
- The spec contradicts a `.cursor/rules/*.mdc` file or an established codebase pattern.
- Auth, billing, multi-tenancy, data ownership, or PII handling is ambiguous.
- Implementing the request as written would break the dependency direction, naming, or layer rules in `[architecture.mdc](../../.cursor/rules/architecture.mdc)`.
- The change requires a database migration with non-trivial data semantics (renames, type changes, drops on populated tables).
- The smallest correct diff exceeds the task's stated scope.

### Escalation format

A correct escalation is short, specific, and decision-ready. It must contain:

1. **Context** — what was asked, in one sentence.
2. **Blocker** — the specific ambiguity or boundary hit.
3. **Options** — two or three concrete paths, each with trade-offs in a line or two.
4. **Recommendation** — the agent's preferred path, named.
5. **Cost of being wrong** — what becomes hard to undo if the human picks badly.

A vague "what should I do?" is not an escalation. Escalations are answerable in one human reply.

> **Escalation beats invention.** A correct question is cheaper than a wrong system.

## Technology deviation process

The default stack is fixed by `[engineering-philosophy.md](./engineering-philosophy.md#technology-governance)` and `[monolith-platform.mdc](../../.cursor/rules/monolith-platform.mdc)`. Deviations are proposals, not facts.

An agent may **propose** a deviation. It may not introduce one.

A deviation proposal must answer all of the following before any code is written:


| Question                                                                   | Acceptable answer shape                                        |
| -------------------------------------------------------------------------- | -------------------------------------------------------------- |
| What concrete operational problem does this solve in this codebase, today? | A named problem already observed in the repo, not anticipated. |
| Why does the default stack fail at it?                                     | Specific limitation, not preference.                           |
| What is being deleted in exchange?                                         | A named module, layer, dependency, or pattern.                 |
| What is the rollback path?                                                 | Concrete steps if the deviation underperforms.                 |
| Who maintains this in six months?                                          | Acknowledgement that the agent will not be there.              |


Vague, speculative, or "best practice" answers reject the proposal. Approval is recorded in the relevant technical spec under `docs/specs/`.

Until approval is recorded, the default stack is the answer.

## Innovation constraints

Agents are constrained against novelty inside this repository. The constraints are deliberate.

- **No new patterns when an existing one applies.** The platform optimises for consistency. A second way to do the same thing is a defect.
- **No speculative flexibility.** Configuration options, plugin points, and extension hooks ship only when there is a current, named consumer.
- **No frameworks on top of frameworks.** Nest, Next, Prisma, and BullMQ are the abstraction layer. Wrapping them is rejected by default.
- **No generalised utility, helper, common, or shared-logic modules.** See the [forbidden terms in the canonical vocabulary](./canonical-vocabulary.md#forbidden--ambiguous-terms).
- **No anticipatory abstractions.** Abstractions emerge from proven pain. See `[abstraction-governance.md](./abstraction-governance.md)`.
- **No autonomous adoption of new language, framework, or library features** that change project-wide semantics (e.g. a new module system, a new runtime mode) — these are stack decisions.

The agent's creativity belongs in the implementation of the request inside the existing pattern, not in inventing a better platform.

## Repository coherence expectations

Coherence is the property that lets a new human or agent be productive in any feature within an hour. Every action an agent takes either preserves or erodes it.

To preserve coherence, agents must:

- **Match the closest existing pattern** before writing new code. Reference implementations are listed in `[engineering-philosophy.md](./engineering-philosophy.md#drift-control)` and `[agent-behaviour.mdc](../../.cursor/rules/agent-behaviour.mdc)`.
- **Use the canonical vocabulary** from `[canonical-vocabulary.md](./canonical-vocabulary.md)`. Do not invent synonyms. Do not introduce forbidden terms.
- **Keep boundaries intact.** Features do not import features. Apps do not import from other apps. Packages do not import from apps.
- **Keep the data model in one place.** Prisma at `prisma/schema.prisma`. Persistence only via Prisma.
- **Keep API contracts in one place.** Shared types in `@monolith/types`. No duplicated response shapes across apps.
- **Keep env vars centralised.** `.env.example`, validated config, and the registration paths in `[infra.mdc](../../.cursor/rules/infra.mdc)`.
- **Surface drift instead of fixing it via new structure.** When two features solve the same problem differently, flag it in the PR summary or append to `[potential-abstractions.md](./potential-abstractions.md)`. Do not introduce a third "unifying" version.
- **Prefer deletion to addition.** Removing the diverging copy is usually the correct fix, not a new abstraction.

Coherence violations are first-class defects, equal in weight to functional bugs.

## What "done" looks like for an agent task


| Check                                                                                                                  | Required        |
| ---------------------------------------------------------------------------------------------------------------------- | --------------- |
| Implements exactly what was requested.                                                                                 | Yes             |
| Matches the closest existing pattern.                                                                                  | Yes             |
| Uses the canonical vocabulary.                                                                                         | Yes             |
| Smallest correct diff.                                                                                                 | Yes             |
| No Red-zone actions taken without recorded approval.                                                                   | Yes             |
| `pnpm lint`, `typecheck`, `test`, `build` pass (and E2E if a web journey changed).                                     | Yes             |
| Summary describes capability, why, and how to verify — not a file list.                                                | Yes             |
| Any observed duplication or pain logged to `[potential-abstractions.md](./potential-abstractions.md)` if criteria met. | When applicable |


If any row above cannot be satisfied, the task is not done — the human is notified.

## Related

- `[engineering-philosophy.md](./engineering-philosophy.md)` — broader governance and stack policy
- `[abstraction-governance.md](./abstraction-governance.md)` — when to abstract and when to repeat
- `[potential-abstractions.md](./potential-abstractions.md)` — observation log for abstraction candidates
- `[canonical-vocabulary.md](./canonical-vocabulary.md)` — terminology
- `[architecture-philosophy.md](./architecture-philosophy.md)` — structural rules
- `[../../.cursor/rules/agent-behaviour.mdc](../../.cursor/rules/agent-behaviour.mdc)` — enforced agent rules
- `[../../.cursor/rules/monolith-platform.mdc](../../.cursor/rules/monolith-platform.mdc)` — stack and rule index
# Platform Evolution Strategy

The long-term rules that keep the Monolith platform usable as the codebase, team, product, and AI models change. Read before proposing a new tool, layer, package, or scaling step.

This document is the **canonical owner** of platform evolution policy: what is allowed to grow, what must shrink, and at what rate. It is the temporal companion to `[engineering-philosophy.md](./engineering-philosophy.md)` (operational constitution) and `[architecture-philosophy.md](./architecture-philosophy.md)` (structural rules). Abstraction policy is owned by `[abstraction-governance.md](./abstraction-governance.md)`; AI autonomy by `[ai-governance.md](./ai-governance.md)`. This document governs the **rate and shape of change** across them.

## Purpose

Most platforms decay the same way: a slow accumulation of tools, layers, packages, and infrastructure each justified locally, none justified globally. Five years in, the platform is enterprise architecture wearing a startup label. This document is the policy against that trajectory.

The decay vectors it is written against:

- Complexity arriving one "small" addition at a time.
- Infrastructure becoming the product instead of serving it.
- Enterprise patterns (DDD layering, CQRS, hexagonal ports/adapters, service meshes) adopted without an operational reason.
- Coherence loss as features, packages, and tools diverge.
- Engineering aesthetics displacing product delivery as the optimisation target.

If the platform looks materially different in two years and nothing in the product justifies the difference, this document failed.

## Platform evolution principles

The long-term anchors. They hold across team changes, model upgrades, and product pivots.


| Principle                                                    | Operational meaning                                                                                                         |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **The platform exists to accelerate product delivery.**      | A change that does not shorten the path from spec to production is suspect by default.                                      |
| **The platform is not the product.**                         | Platform work competes with product work. Treat it as overhead until proven otherwise.                                      |
| **Operational simplicity compounds.**                        | Every saved layer, dependency, and service compounds across every future feature and every AI-agent action.                 |
| **Stable patterns are strategic assets.**                    | A pattern unchanged in twelve months is worth more than a "better" pattern shipping next quarter.                           |
| **Consistency improves AI execution quality.**               | Agents reproduce what they see most. One pattern used everywhere multiplies; five variants degrade every future run.        |
| **Complexity must justify itself operationally.**            | "Cleaner", "more flexible", "more idiomatic" are aesthetic claims. Justification is named pain, named cost, named rollback. |
| **New infrastructure creates long-term maintenance burden.** | Every new piece of infra has to be patched, upgraded, monitored, and reasoned about — every quarter, forever.               |
| **Deletion is healthier than uncontrolled accumulation.**    | Deletion is the default-allowed change; addition is the change that must be argued for.                                     |


These extend `[engineering-philosophy.md](./engineering-philosophy.md)` across time. If a long-term decision contradicts the operational constitution, the constitution wins.

## Safe evolution rules

Day-to-day gates for proposed platform changes. Apply them whenever a change affects more than the touched feature.


| Rule                                                                   | Detail                                                                                                                                                                                                                                                  |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **New tooling requires operational justification.**                    | Name the current problem, what is deleted in exchange, and the rollback path. Aesthetic answers reject the proposal.                                                                                                                                    |
| **New abstractions require repeated proven pain.**                     | Governed by `[abstraction-governance.md](./abstraction-governance.md)`. Three concrete occurrences, stable shape, named pain, deletes more than it adds — or it does not ship.                                                                          |
| **New packages require cognitive justification.**                      | A `@monolith/<name>` package adds a boundary every contributor must learn. Correct only when ≥2 real consumers exist and the contents do not belong in either. Boundaries are governed by `[architecture-philosophy.md](./architecture-philosophy.md)`. |
| **New architectural layers require maintenance justification.**        | Layers (DDD entities, hexagonal adapters, mediator buses, CQRS handlers) are evaluated against who maintains them in six months. No named owner and no named pain → rejected.                                                                           |
| **Existing patterns should be preferred unless clearly insufficient.** | "Insufficient" means an observed failure under current load, not a theoretical limitation. Match the [health reference implementation](./canonical-vocabulary.md#code-structure-terms) until it demonstrably stops working.                             |
| **Platform-wide changes should remain rare and deliberate.**           | A change touching every feature is paid for by every feature. Months cadence, not days. Batch when possible. Agents never initiate platform-wide changes — see `[ai-governance.md](./ai-governance.md#ai-autonomy-boundaries)`.                         |


A proposal that fails the gates is not adopted. It is logged in the relevant technical spec (or `[potential-abstractions.md](./potential-abstractions.md)` if applicable) and revisited later — never back-doored through an incremental PR.

## Technology evolution

The default stack is fixed by `[engineering-philosophy.md](./engineering-philosophy.md#technology-governance)` and `[../../.cursor/rules/monolith-platform.mdc](../../.cursor/rules/monolith-platform.mdc)`. This section governs the **rate** of deviation; the **process** is owned by `[ai-governance.md](./ai-governance.md#technology-deviation-process)`.


| Rule                                                             | Detail                                                                                                                                                  |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Default stack consistency is preferred.**                      | The same answer in every project cloned from this template. Per-project divergence is a tax on every operator working across projects.                  |
| **Alternative technologies require explicit approval.**          | The deviation process in `[ai-governance.md](./ai-governance.md#technology-deviation-process)` is the only path. Agents propose; humans approve.        |
| **Escape hatches are intentional, not default.**                 | When the stack genuinely fails for a scoped problem, an escape hatch is allowed for that scope only — it does not become the new normal.                |
| **Operational burden is evaluated before technical fit.**        | Every new technology adds patch cadence, deploy surface, monitoring, on-call, billing, and AI-agent re-training. Weighed *before* the technical merits. |
| **Infrastructure complexity is treated as technical liability.** | New infra is debt until repeatedly proven necessary. The savings claimed must exceed the perpetuity cost.                                               |


Technology evolution is asymmetric: easy to add, hard to remove. The bias is always against adding.

## Scaling philosophy

How the platform scales without losing its operational shape.


| Rule                                                           | Detail                                                                                                                                                                                |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Modular monolith first.**                                    | A single API process organised by feature modules. Restated here because this is the single most common point of long-term drift.                                                     |
| **Avoid distributed systems until operationally unavoidable.** | Splits happen for load, deploy ownership, or organisational reasons — not for taste, "microservices best practice", or anticipated scale. The trigger must be observed in production. |
| **Prefer simple deployment architectures.**                    | Vercel (web), Railway (api), Supabase (db), Upstash (redis). New deploy targets are evaluated as infrastructure additions under the rules above.                                      |
| **Prefer predictable systems over "cutting-edge" systems.**    | A boring system at 95% of the theoretical ceiling outperforms an exciting one that drifts, breaks on version bumps, or needs a specialist to debug.                                   |
| **AI-assisted maintainability outranks trend alignment.**      | A system small teams and agents can extend confidently beats one that matches the current architectural fashion. Trend conformance is not an objective.                               |


Scaling triggers are operational events, not roadmap items. "We will need to split this eventually" is not a trigger; a production incident, a real ownership boundary, or a real deploy-cadence conflict is.

## Team philosophy

How the platform stays usable by the operators it is designed for.


| Rule                                                                    | Detail                                                                                                                                                                                                           |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Optimised for small high-leverage teams.**                            | One to ten humans with significant AI assistance. Patterns that only pay off at large team sizes (heavyweight ADRs, multi-tier review boards, enterprise governance) are out of scope.                           |
| **Low cognitive overhead is strategic.**                                | Time spent learning the platform is time not shipping product. Every added concept is paid by every contributor — human and agent — from then on.                                                                |
| **Process should remain lightweight.**                                  | Process exists to prevent specific, named failures. New process is added only when the current process has demonstrably failed.                                                                                  |
| **Documentation should support execution, not bureaucracy.**            | Docs explain how to do the work and where things live. They do not ratify decisions or perform rigour. Unread docs are deleted.                                                                                  |
| **AI agents should amplify operators, not create governance overhead.** | If supervising agents costs more than the productivity they provide, the agent rules are wrong — not the agents. Governance is calibrated against actual failures. See `[ai-governance.md](./ai-governance.md)`. |


The platform is designed for the operators using it today — not an organisation that does not yet exist.

## Evaluating a proposed platform change

When a change touches platform shape — stack, packages, layers, infrastructure, conventions, process — apply the checklist below. Each row must be answerable concretely.


| Check                            | What must be shown                                                                                                                                                                                                            |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Named problem.**               | A current, observed problem in the repository — not "we might need this", not "it would be cleaner".                                                                                                                          |
| **Operational cost.**            | What this costs every quarter, forever: patching, upgrades, monitoring, on-call, documentation, AI-agent re-training, onboarding.                                                                                             |
| **What is deleted.**             | What the change removes in exchange. Net additions to platform shape are suspect by default.                                                                                                                                  |
| **Reversibility.**               | The shape of the change that would undo this in six or twelve months. If the unwind is "a project", the change is not ready.                                                                                                  |
| **Maintenance owner.**           | Who owns this when the proposer is no longer around. "The team" is not an owner.                                                                                                                                              |
| **Effect on existing patterns.** | Whether the change leaves the [health reference implementation](./canonical-vocabulary.md#code-structure-terms) and the existing pattern set intact, or fragments them. Fragmentation is rejected unless explicitly accepted. |
| **Effect on AI execution.**      | Whether the change improves or degrades the consistency agents rely on. Degradation is paid in every future agent run.                                                                                                        |


A proposal that cannot answer the checklist is not a decision yet. It is logged in the relevant technical spec (or `[potential-abstractions.md](./potential-abstractions.md)` if applicable) and revisited later.

## Drift signals

Long-term drift is rarely one bad decision. It is a sequence of small, locally-justified ones. The signals:

- Two features solving the same problem differently. (See `[engineering-philosophy.md](./engineering-philosophy.md#drift-control)`.)
- A new package with one consumer and no plan for a second.
- A new layer or wrapper introduced "for cleanliness" without a named, repeated pain.
- An alternative technology adopted for a scoped problem migrating into other features.
- An "escape hatch" pattern becoming the default in newer code.
- Docs, process, or rules accumulating faster than they are deleted.
- Agents producing diverging implementations for the same operation across features.
- A platform-shape change shipped without the checklist above answered.

Each is a first-class defect, equal to a functional bug. The correct response is usually deletion, consolidation, or reversal — never a third unifying pattern.

## Long-term anchors

Full set: `[engineering-philosophy.md](./engineering-philosophy.md#long-term-anchors)`. The two that specifically tighten with time:

- **The architecture line does not move.** Agents remain implementers, never architects — regardless of how capable they become.
- **Every layer, dependency, and abstraction is a liability.** The stance does not relax over time. It tightens.

## Related

- `[engineering-philosophy.md](./engineering-philosophy.md)` — operational constitution this document extends across time
- `[architecture-philosophy.md](./architecture-philosophy.md)` — structural rules
- `[abstraction-governance.md](./abstraction-governance.md)` — abstraction policy and evidence threshold
- `[ai-governance.md](./ai-governance.md)` — AI autonomy boundaries and the technology deviation process
- `[canonical-vocabulary.md](./canonical-vocabulary.md)` — terminology
- `[repository-boundaries.md](./repository-boundaries.md)` — `docs/`, `.ai/`, and rules placement
- `[potential-abstractions.md](./potential-abstractions.md)` — observation log for abstraction candidates
- `[overview.md](./overview.md)` — current repo map
- `[../../.cursor/rules/monolith-platform.mdc](../../.cursor/rules/monolith-platform.mdc)` — stack and rule index
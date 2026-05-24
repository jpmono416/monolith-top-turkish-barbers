# Abstraction Governance

When abstraction is allowed in this repository, when repetition is preferable, and how candidates are evaluated. Read before extracting a shared module, introducing a generic interface, or wrapping an existing library.

This document is the **canonical owner** of abstraction policy. `[engineering-philosophy.md](./engineering-philosophy.md)` sets the high-level rule (*"abstractions emerge from proven pain"*); this document operationalises it. `[ai-governance.md](./ai-governance.md)` governs who is allowed to act on it.

## Purpose

The dominant failure mode of AI-assisted codebases is **abstraction accumulation**: a steady accretion of indirection, wrappers, and "framework inside the framework" layers introduced before the shape of the problem is known. Every such layer is a permanent liability and a permanent reading tax.

This document fixes the bar an abstraction must clear before it ships, and the bar that must be cleared before existing abstractions are kept.

## Default position

> **Repetition is acceptable. Abstraction is not the default.**

When in doubt, repeat the code. Three nearly-identical occurrences with a stable shape is the earliest signal to consider abstracting. Two is fine. One is irrelevant.

The cost of repetition is bounded (more lines). The cost of a wrong abstraction is unbounded (every future feature pays the indirection tax, and removing it is harder than adding it was).

## When abstraction is appropriate

All conditions below must hold. Any single failure rejects the abstraction.


| Condition                               | Meaning                                                                                                                                                               |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Three or more concrete occurrences.** | At least three real usages exist in committed code, not anticipated ones.                                                                                             |
| **Stable shape.**                       | The repeated code has been stable for long enough that the most recent two occurrences did not change the shape of the others.                                        |
| **Single responsibility.**              | The abstraction does one thing. If it has flags, modes, or branches per consumer, it is the wrong shape.                                                              |
| **Operational pain is named.**          | A specific, observed cost exists today (bugs, drift, onboarding friction, repeated review comments) — not a theoretical one.                                          |
| **Reduces cognitive load measurably.**  | The post-abstraction reading cost across consumers is lower than the pre-abstraction reading cost, including the new indirection.                                     |
| **Deletes more than it adds.**          | The diff removes more lines, files, or concepts than it introduces — or the imbalance is small and explicitly justified.                                              |
| **Owned by a clear location.**          | The abstraction has an obvious home (existing feature, infrastructure module, or named package). If no home fits, the abstraction is premature or in the wrong shape. |
| **Reversible.**                         | If removed in six months, the consumers can return to the prior pattern without a project.                                                                            |


If any condition is unclear, the abstraction is not ready.

## When repetition is preferable

Keep the code repeated when any of the following is true:

- Fewer than three real occurrences exist.
- The occurrences look similar but serve different domains and may diverge.
- The shape is still moving — recent occurrences changed the structure.
- The abstraction would require configuration options, generic type parameters beyond the trivial, or conditional branches per caller.
- The abstraction would cross a feature boundary that the platform deliberately keeps separated.
- The abstraction would live in a `utils/`, `helpers/`, `common/`, or `shared/` location. These are forbidden by [the canonical vocabulary](./canonical-vocabulary.md#forbidden--ambiguous-terms); the right answer is usually to keep the code colocated and repeated.
- The repeated code is **easier to read in place** than via a name and an import.
- The pain is anticipated, not observed.

Repetition is not a failure mode. It is the explicit baseline of this platform.

## Operational criteria for abstraction

The checklist below is what a PR introducing an abstraction must satisfy. A reviewer (human or agent) rejects the PR if any line cannot be answered concretely.


| Check              | What must be shown                                                                                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Occurrences        | List of file paths and symbols where the repetition lives today (≥3).                                                                                                  |
| Stability          | Date or commit range over which the shape has not changed.                                                                                                             |
| Pain               | One or more named incidents, review comments, or onboarding moments where the repetition caused friction.                                                              |
| Net diff           | Lines added vs lines deleted. Negative or near-zero is expected.                                                                                                       |
| Indirection cost   | Number of new files, exports, and import hops introduced.                                                                                                              |
| Home               | Exact location of the new abstraction and why that location owns it.                                                                                                   |
| Consumer migration | The PR migrates **all** existing occurrences. Partial migration is rejected — a parallel pattern is worse than the original repetition.                                |
| Reversal plan      | The shape of the diff that would inline the abstraction back if it underperforms.                                                                                      |
| Approval           | Linked human approval if the abstraction crosses feature, package, or layer boundaries (Red zone per `[ai-governance.md](./ai-governance.md#ai-autonomy-boundaries)`). |


If the PR cannot pass this checklist, the abstraction does not ship — the repeated code stays as it is, and the candidate may be recorded in `[potential-abstractions.md](./potential-abstractions.md)` for future evaluation.

## Anti-patterns of premature abstraction

Reject on sight. These are the recurring failure modes in AI-assisted codebases.


| Anti-pattern                                                                                                             | Why it is rejected                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Abstracting after two occurrences.**                                                                                   | Two is coincidence. The shape is not yet known.                                                                                                      |
| **Abstracting for an anticipated third caller.**                                                                         | "We'll need this for the next feature" is speculation.                                                                                               |
| **Generic base classes, interfaces, or hooks designed before the first consumer.**                                       | Designs the contract from imagination, not usage.                                                                                                    |
| **Configuration-driven abstractions** (`OrdersService` with `mode: 'b2b' | 'b2c'`).                                      | Two implementations pretending to be one.                                                                                                            |
| **Higher-order wrappers around already-thin framework calls.**                                                           | Adds an import, removes nothing.                                                                                                                     |
| `**utils/`, `helpers/`, `common/`, `shared/` modules.**                                                                  | Catch-all dumping grounds. Forbidden by [canonical vocabulary](./canonical-vocabulary.md#forbidden--ambiguous-terms).                                |
| **"Framework inside the framework" wrappers** (custom controller decorators, request lifecycle hooks, custom DI tokens). | Re-implements Nest/Next over Nest/Next.                                                                                                              |
| **Cross-feature shared services.**                                                                                       | Breaks the dependency direction. The correct fix is a shared type, an infrastructure module, or a new package — never a feature importing a feature. |
| **Partial migrations** that leave the old pattern beside the new one.                                                    | Two ways to do the same thing is the actual defect.                                                                                                  |
| **Abstractions justified by elegance, symmetry, DRY-ness, or "clean code".**                                             | These are aesthetic claims, not operational ones.                                                                                                    |
| **DDD layers, hexagonal ports/adapters, CQRS, or event-sourcing scaffolding** introduced without an active use case.     | Architecture theatre.                                                                                                                                |
| **Abstractions whose primary benefit is "easier to test"** when the underlying code is already testable.                 | Inverts the cost.                                                                                                                                    |


Each anti-pattern shares a property: the abstraction was introduced **before** the operational pain it claims to solve was actually observed.

## Acceptable evidence thresholds

Evidence is what separates an observation from a guess. The bar is concrete.


| Evidence type        | Acceptable                                                                                                         | Not acceptable                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| **Occurrence count** | Three or more real usages in committed code.                                                                       | "Will be needed soon"; "the next feature will use it".                 |
| **Shape stability**  | Last two additions did not modify earlier occurrences.                                                             | The most recent occurrence changed the signature of the previous ones. |
| **Pain**             | A named bug, a repeated review comment, an onboarding question asked twice, drift between copies.                  | "It feels duplicated"; "it offends DRY".                               |
| **Cognitive load**   | A measurable reduction in reading cost: fewer files to open, fewer concepts to hold, fewer decisions per consumer. | "It will be cleaner".                                                  |
| **Deletion**         | The PR removes more than it adds, or breaks even with explicit justification.                                      | The PR adds files and keeps the old code.                              |
| **Ownership**        | A clear, existing home — feature folder, infrastructure module, or single named package.                           | A new `shared/`, `utils/`, or `common/` location.                      |


Evidence is logged in `[potential-abstractions.md](./potential-abstractions.md)` over time. Abstractions ship from accumulated evidence, not from a single moment of inspiration.

## Deletion-first philosophy

Deletion is the highest-leverage change in this repository. It is preferred over addition, over refactor, and over abstraction.


| Situation                                                                                                          | First instinct                                                              |
| ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Two features solve the same problem differently.                                                                   | Delete the diverging copy. The older, simpler, or more consistent one wins. |
| A wrapper exists with one caller.                                                                                  | Delete the wrapper. Inline the call.                                        |
| An abstraction has drifted such that each consumer overrides half of it.                                           | Delete the abstraction. Inline the consumers.                               |
| Dead code, unused exports, orphaned modules.                                                                       | Delete immediately. No deprecation period inside the monorepo.              |
| A configuration flag has only one value used in production.                                                        | Delete the flag.                                                            |
| A package has one consumer and no plan for a second.                                                               | Delete the package; inline the code into its consumer.                      |
| A "potential abstraction" entry has aged past relevance (problem solved differently, code removed, shape changed). | Delete the entry.                                                           |


Deletion does not require approval beyond the PR review. It is the default-allowed action.

The asymmetry is deliberate: it is much harder to delete a wrong abstraction than to add a right one later. So abstractions ship slowly, and deletions ship freely.

## Worked examples

**Acceptable — three stable occurrences, named pain, deletes more than it adds**

> Three features (`orders`, `invoices`, `subscriptions`) each independently format currency for API responses, each in a slightly different way. One bug shipped last month because the `invoices` formatter rounded differently. The shape has been stable for ~two months. The proposal: a single `formatCurrency` helper inside `@monolith/types` (or `@monolith/config`, depending on ownership), with all three consumers migrated in the same PR. Net diff: −40 lines. Reversal: inline the helper back into each feature.

This is the **right** abstraction at the **right** time. Three occurrences, stable shape, named bug, single responsibility, deletes more than it adds, clear home, all consumers migrated, reversible.

**Rejected — two occurrences, anticipated third, configuration-driven**

> Two features list paginated results from Prisma. A proposal to introduce a `PaginatedQueryService` with options for sorting, filtering, and "the next feature we'll build will probably need this too".

Rejected. Two occurrences is not evidence. The third consumer does not exist. The "options" reveal that the shape is not yet known. Keep the code repeated; if a third occurrence with a stable shape appears later, log it in `[potential-abstractions.md](./potential-abstractions.md)` and re-evaluate.

**Rejected — abstraction with one caller**

> A `withTenantContext` wrapper around a Nest service method, with one consumer.

Rejected. Delete the wrapper. Inline the logic. Revisit only when a third caller exists.

## Related

- `[ai-governance.md](./ai-governance.md)` — who is allowed to abstract, and when to escalate
- `[potential-abstractions.md](./potential-abstractions.md)` — the evidence log for abstraction candidates
- `[engineering-philosophy.md](./engineering-philosophy.md)` — mandatory principles, including deletion-preferred and smallest-correct-diff
- `[architecture-philosophy.md](./architecture-philosophy.md)` — feature boundaries and dependency direction
- `[canonical-vocabulary.md](./canonical-vocabulary.md)` — forbidden terms that frequently signal premature abstraction
- `[../../.cursor/rules/architecture.mdc](../../.cursor/rules/architecture.mdc)` — enforced layer and boundary rules
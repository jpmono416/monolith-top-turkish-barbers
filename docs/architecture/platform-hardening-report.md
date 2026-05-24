# Platform Hardening Report

A conservative coherence audit of the Monolith AI-Native Engineering Platform. The objective was to sharpen — not to expand. This report records what was found, what was changed, and what was deliberately left alone.

> **Status:** advisory record. This document is observation, not policy. Policy lives in `engineering-philosophy.md`, `architecture-philosophy.md`, `ai-governance.md`, `abstraction-governance.md`, `platform-evolution-strategy.md`, and the `.cursor/rules/*.mdc` files.

## Audit principles applied

- Deletion preferred over addition.
- Smallest correct diff.
- Existing patterns preferred over new ones.
- No new abstractions, frameworks, processes, or governance layers.
- Uncertainty resolved by recording, not changing.

## Strengths

The governance and rule structure is in good shape. Worth naming, because each is a load-bearing property of the current design and any future change should preserve it:

1. **Single canonical owner per concern.** `rule-system-overview.md` and the rule map in `monolith-platform.mdc` keep `.cursor/rules/*.mdc` from duplicating each other. The same discipline is applied across `docs/architecture/` (e.g. `ai-governance.md` owns AI autonomy, `abstraction-governance.md` owns the abstraction bar, `canonical-vocabulary.md` owns terminology).
2. **Explicit conflict resolution rule.** `.cursor/rules/*.mdc` wins over `docs/`, and prose drift is to be flagged rather than silently followed. Stated in `repository-boundaries.md`, `canonical-vocabulary.md`, and `rule-system-overview.md` consistently.
3. **`docs/` explains, `.ai/` operates, rules enforce.** The three-surface split is short enough to remember and enforced by the mirror policy in `repository-boundaries.md`.
4. **Deletion-first as a first-class operation.** Codified in `engineering-philosophy.md` and `abstraction-governance.md` with concrete worked examples. This is the single most important defence against AI-driven drift.
5. **Reference implementation is named, not just described.** The `health` API feature plus `apps/web/src/lib/api.ts` are pinned as the artefact agents copy from. Listed in `agent-behaviour.mdc`, `canonical-vocabulary.md`, and elsewhere.
6. **Forbidden-terms table.** `canonical-vocabulary.md` makes the abstraction-creep failure modes (`utils/`, `helpers/`, `common/`, generic "system", unqualified "module") rejectable on sight rather than debatable.
7. **`potential-abstractions.md` is observation-only for agents.** Removes the most common autonomous-abstraction failure mode without adding process.
8. **Three-zone agent autonomy model.** Green / Yellow / Red in `ai-governance.md` is short, actionable, and lets agents stop on their own at the right boundary.
9. **CI gate is owned in exactly one place.** `infra.mdc` defines `lint → typecheck → test → build → E2E`; everything else points there.

These are the load-bearing assets. The refinements below were chosen specifically not to disturb any of them.

## Identified risks

Listed in priority order (highest signal first). Each is a present coherence cost; severity is the cost if left to drift further.

| # | Risk | Severity | Status |
|---|------|----------|--------|
| 1 | Vestigial pointer file `docs/standards/coding.md` (1-line redirect) | low — drift bait | Fixed |
| 2 | Self-declared legacy file `.ai/workflows/feature-implementation.md` | low — drift bait | Fixed |
| 3 | `agent-behaviour.mdc` PR test-plan cross-reference points to wrong doc | low — confusing | Fixed |
| 4 | `architecture-philosophy.md` reference impl block names `apps/web/src/app/page.tsx`, which is **not** part of the canonical "health reference implementation" definition | low — vocabulary drift | Fixed |
| 5 | `docs/architecture/overview.md` "Further reading" omits 4 of the governance documents (`ai-governance`, `abstraction-governance`, `potential-abstractions`, `rule-system-overview`) | low — navigation | Fixed |
| 6 | `engineering-philosophy.md` "AI governance" section is longer than its declared role (a summary that points to the canonical owner `ai-governance.md`) | medium — duplication risk over time | **Deferred** — see [Recommendations deferred](#recommendations-deferred-intentionally) |
| 7 | Backtick-wrapped markdown links in several "Related" sections render as code, not links (`engineering-philosophy.md`, `ai-governance.md`, `abstraction-governance.md`, `platform-evolution-strategy.md`) | very low — cosmetic | **Deferred** — formatting churn risk |
| 8 | `.ai/prompts/project-bootstrap.md` restates the stack table, which can drift from `monolith-platform.mdc` | low — predictable drift | **Deferred** — duplication is intentional for prompt context |
| 9 | `frontend.mdc` names "TanStack Query" by example without an approved-libraries list anywhere | very low — naming-only | **Deferred** — phrased as "only after a documented need", not as approval |
| 10 | `docs/workflows/spec-driven-development.md` doesn't show the three-file split (`-product.md` / `-technical.md` / `-plan.md`) that `docs/specs/README.md` and `.ai/workflows/spec-lifecycle.md` show | very low — minor | **Deferred** — the split is optional and surface differences are expected (mirror policy) |

Severity scale used:
- **very low** — cosmetic or stylistic; no observable impact on humans or agents.
- **low** — produces minor confusion or doc-search misses; cheaply fixed.
- **medium** — a known drift vector if not bounded; the kind of pattern that becomes a problem in 6–12 months.
- **high** — none observed.

No high-severity risks were identified. The governance structure itself is sound.

## Simplifications applied

All changes below are conservative: each removes content, fixes a wrong reference, or aligns to an already-named canonical owner. None introduces a new pattern, process, or abstraction.

### 1. Deleted `docs/standards/coding.md`

A 4-line file whose entire content was a redirect to `coding-standards.md`. No external doc referenced it. Deletion-preferred per `engineering-philosophy.md` and `abstraction-governance.md`.

### 2. Deleted `.ai/workflows/feature-implementation.md`

`.ai/README.md` itself labelled the file as **legacy** and recommended `.ai/prompts/feature-implementation.md` + `docs/workflows/ai-implementation-workflow.md` instead. The mirror policy in `repository-boundaries.md` already names the canonical pair. No external doc linked to the deleted file.

### 3. Updated `.ai/README.md`

Removed the trailing `Legacy: feature-implementation.md (...)` line that referenced the now-deleted file. The workflows table is now self-consistent.

### 4. Fixed wrong cross-reference in `.cursor/rules/agent-behaviour.mdc`

The PR-time instruction pointed at `docs/workflows/development.md` for the "test plan", but `development.md` is the local-setup doc. The PR test plan template lives in `docs/workflows/pull-request-workflow.md`. Updated to that path.

### 5. Tightened `docs/architecture/architecture-philosophy.md` reference implementation block

The block named `apps/web/src/app/page.tsx` as a reference, but `canonical-vocabulary.md` (the canonical owner of the term **health reference implementation**) defines the web-side reference as `apps/web/src/lib/api.ts` only. Aligned the block to the canonical definition and added a one-line pointer to `frontend.mdc` for App Router page conventions, where they're actually owned.

### 6. Added missing governance docs to `docs/architecture/overview.md`

The "Further reading" table now lists `ai-governance.md`, `abstraction-governance.md`, `potential-abstractions.md`, and `rule-system-overview.md`. These are first-class governance documents and were already linked from each other; the entry-point map should reflect that.

## Net change

- **Files deleted:** 2
- **Files modified:** 4
- **Files created:** 1 (this report)
- **Lines added vs removed across repo:** small net deletion, excluding this report
- **New abstractions:** 0
- **New rules:** 0
- **New processes:** 0

## Ambiguities intentionally left unresolved

These are observed inconsistencies that are *not* defects given the platform's stated philosophy. Touching them would be drift in a different direction.

- **`README.md` (root) lists no version pins.** `monolith-platform.mdc` and `.ai/prompts/project-bootstrap.md` do. This is correct: the human-facing README stays low-friction; rules and prompts pin the actual versions agents must reproduce. Do **not** add versions to the README.
- **Same idea, two short documents.** `docs/workflows/spec-driven-development.md` and `.ai/workflows/spec-lifecycle.md` both describe the spec lifecycle from different angles (human narrative vs. agent operational). The mirror policy in `repository-boundaries.md` explicitly endorses this. Do **not** consolidate them into one shared doc.
- **`.ai/standards/repository.md` and `docs/architecture/overview.md` both list invariants.** Same mirror policy applies. They are intentionally short and shaped for different audiences.
- **`docs/architecture/infrastructure-standards.md` restates env-var keys also documented in `infra.mdc` and `.env.example`.** This is narrative, not duplicated logic. The canonical owner (`infra.mdc`) is unambiguous; the narrative version helps humans without creating drift surface. Acceptable until proven otherwise.
- **Multiple "what to avoid" lists across `engineering-philosophy.md`, `architecture-philosophy.md`, `architecture.mdc`, and `canonical-vocabulary.md`.** Each is scoped (governance vs. structural vs. enforcement vs. terminology). Consolidating them would erode signal density inside each surface. Leave as-is.

## Future risks worth observing

These have not yet manifested but are the most likely vectors for the platform to drift if the current discipline lapses. None requires action now; each is a flag for a future review.

1. **AI-governance summary growing longer than its canonical owner.** `engineering-philosophy.md`'s "AI governance" section currently restates a meaningful slice of `ai-governance.md`. If it accretes another bullet or two over time, it stops being a "summary that points here" and becomes a parallel source of truth. Re-tighten on next review if it has grown.
2. **`potential-abstractions.md` accumulating speculative entries.** The bar (three real occurrences, named pain, stable shape) is strict on paper. The first failure mode of these logs is honest agents being slightly too eager. The 90-day age-out rule is correct; enforce it.
3. **A second variant of the `health` reference implementation appearing.** If a future feature deliberately diverges (e.g. requires a different structure for a real reason), `canonical-vocabulary.md` should be updated *first* to name the new reference and explain the divergence, before the second variant ships. Two unnamed exemplars is the start of drift.
4. **`@monolith/config` becoming a `utils/` in disguise.** It is currently bounded to "constants and shared config values" by `monorepo.mdc` and `architecture-philosophy.md`. The risk is unrelated-but-shared things ending up there because no other home exists. Watch for content that does not match the package's stated contents.
5. **Spec naming convention drift.** Three documents describe the spec naming pattern (`docs/specs/README.md`, `docs/workflows/spec-driven-development.md`, `.ai/workflows/spec-lifecycle.md`). Today they are consistent. They are also three places to update on a single change. If the convention ever changes, update all three in the same PR or the next agent will reproduce whichever they read first.
6. **Stack table duplication in `.ai/prompts/project-bootstrap.md`.** The prompt restates the stack from `monolith-platform.mdc` for agent context. The duplication is intentional, but if a stack item changes (e.g. NestJS major version), both must be updated. Treat as part of the deviation process in `ai-governance.md`.
7. **Backtick-wrapped link rendering.** Several "Related" sections wrap markdown links in backticks (` `[name](path)` `), which renders as code rather than a clickable link. Not a content defect; a rendering one. If a docs site is ever stood up, fix in one sweep then.

## Recommendations deferred intentionally

The following changes were considered and **not** applied. Each carries a real benefit; each was rejected because the audit principle ("smallest correct diff", "deletion preferred over rewrite", "no formatting churn") wins over the benefit at this time.

### Deferred — shorten the AI-governance section in `engineering-philosophy.md`

`ai-governance.md` declares: *"The 'AI governance' section in `engineering-philosophy.md` is a summary that points here."* The section in `engineering-philosophy.md` is currently ~30 lines including parallel "Agents may / Agents must not" lists. This is heavier than a summary.

- **Why deferred:** rewriting the section would touch a load-bearing document and risk the kind of subtle wording drift this audit is meant to prevent. The summary is internally consistent today; the rule-file canonical owner (`agent-behaviour.mdc`) and the doc canonical owner (`ai-governance.md`) both still take precedence on conflict.
- **When to revisit:** if the summary section accretes any additional content, replace it in a single PR with a 5–8 line summary plus an explicit pointer to `ai-governance.md`.

### Deferred — fix backtick-wrapped markdown links

`engineering-philosophy.md`, `ai-governance.md`, `abstraction-governance.md`, and `platform-evolution-strategy.md` use the form `` `[file.md](./file.md)` `` in their "Related" sections. Backticks make the entire token a code span; the link does not render.

- **Why deferred:** this is formatting churn across many files. The audit principle is to avoid stylistic rewrites in untouched files. The links still function for humans (the path is visible) and for grep-based agent lookups.
- **When to revisit:** if a docs site that depends on rendered links is introduced, fix in one sweep at that point.

### Deferred — visual consolidation of cross-referenced "what to avoid" lists

There are three to four "things we don't do" lists across `engineering-philosophy.md`, `architecture-philosophy.md`, `.cursor/rules/architecture.mdc`, and `.cursor/rules/agent-behaviour.mdc`. They are individually short, scoped, and consistent.

- **Why deferred:** consolidation would either duplicate (in code refs from each other) or extract a fifth shared list. Both worsen the current state. The repetition is operational signal, not noise.

### Deferred — adding an "approved third-party libraries" list

`frontend.mdc` mentions TanStack Query by name as an example of "reach for X only after a documented need". `engineering-philosophy.md` has the deviation process; `ai-governance.md` has the deviation request format. There is no positive list of "libraries you may pre-approve".

- **Why deferred:** maintaining a positive allow-list is a process surface that will need its own review cadence. The current "default stack is the answer; deviation is a proposal" model is simpler and matches the platform philosophy. Adding an allow-list would be governance bloat.

### Deferred — formalising the three-file spec naming pattern

`docs/specs/README.md` shows `2026-05-20-orders-product.md` / `-technical.md` / `-plan.md`. `docs/workflows/spec-driven-development.md` shows only the single-file form `2026-05-20-<feature>.md`.

- **Why deferred:** both are valid; complexity decides which form is used. Clarifying this in `spec-driven-development.md` is a docs touch in the right direction but `spec-lifecycle.md` already shows the multi-file form and the templates work either way. Not worth a change today.

### Deferred — rationalising "service" terminology one further step

`canonical-vocabulary.md` already covers the three valid senses (Nest service, Compose service, deployed application) and the one forbidden sense ("service" for a production-deployed app). The current use across rule files is consistent. No additional clarification needed.

## Success criteria check

| Criterion | Outcome |
|-----------|---------|
| More coherent | Marginal: 4 small alignment fixes; canonical-owner pattern reinforced |
| Slightly lighter | Yes: 2 files deleted, 0 added (excluding this report) |
| Operationally calmer | Yes: one wrong cross-reference fixed; one self-confessed legacy file removed |
| Easier to reason about | Marginal: missing governance docs surfaced in entry-point map |
| Resistant to future AI drift | Yes: vestigial files removed before they could be pattern-matched and replicated |
| Maintainable | Unchanged — already maintainable |
| Governance-stable | Yes: zero governance changes; no new rules, processes, or abstractions |

The platform did not need a redesign and was not given one.

## Related

- [`engineering-philosophy.md`](./engineering-philosophy.md) — operational constitution
- [`architecture-philosophy.md`](./architecture-philosophy.md) — structural rules
- [`platform-evolution-strategy.md`](./platform-evolution-strategy.md) — long-term anchors
- [`ai-governance.md`](./ai-governance.md) — AI autonomy boundaries
- [`abstraction-governance.md`](./abstraction-governance.md) — abstraction bar
- [`canonical-vocabulary.md`](./canonical-vocabulary.md) — terminology
- [`repository-boundaries.md`](./repository-boundaries.md) — `docs/`, `.ai/`, rules placement
- [`rule-system-overview.md`](./rule-system-overview.md) — how the IDE rule set is organised
- [`potential-abstractions.md`](./potential-abstractions.md) — observation log

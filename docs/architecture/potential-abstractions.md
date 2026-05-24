# Potential Abstractions

An evidence log of repeated implementation patterns, measurable duplication, and operational pain observed in this repository. Evaluated periodically by humans to decide whether an abstraction is warranted.

This document is governed by `[abstraction-governance.md](./abstraction-governance.md)` and `[ai-governance.md](./ai-governance.md)`. Read both before appending.

## What this document is

- An **observation log** of patterns that *might* warrant abstraction in the future.
- A **historical record** of evidence accumulated over time across features and PRs.
- A **decision input** for humans evaluating whether to spend complexity budget on a new abstraction.

## What this document is not

- **Not a backlog.** Entries are not tickets and do not imply work will happen.
- **Not a TODO list.** Nothing here is scheduled, prioritised, or assigned.
- **Not a design document.** Entries describe observed pain, not designed solutions.
- **Not approval to implement.** An entry's existence is evidence, not a decision.

## Who may append, and when


| Author    | Allowed                                       |
| --------- | --------------------------------------------- |
| Humans    | Anytime.                                      |
| AI agents | Only when **all** four conditions below hold. |


An AI agent may append an entry only when:

1. **Repeated implementation patterns are observed** — three or more concrete, committed occurrences exist in the repository today.
2. **Measurable duplication exists** — the agent can point to specific files, symbols, or line ranges; not a feeling.
3. **Operational pain is identifiable** — a named bug, drift incident, repeated review comment, onboarding question, or maintenance friction; not a theoretical concern.
4. **Abstraction would clearly reduce cognitive load** — the post-abstraction reading cost is plausibly lower than the current cost, including the new indirection.

If any of the four is unclear, the agent does **not** append. Uncertainty is not evidence.

## Who may implement

> **No one autonomously.** An entry in this document never authorises implementation.
>
> **AI agents must never act on an entry from this document without explicit human approval recorded in a PR or technical spec.**
>
> See `[ai-governance.md](./ai-governance.md#forbidden-autonomous-behaviour)`.

Implementation requires:

1. Human evaluation against the [operational criteria for abstraction](./abstraction-governance.md#operational-criteria-for-abstraction).
2. Recorded approval (PR description or technical spec under `docs/specs/`).
3. A single PR that migrates **all** named consumers — partial migration is rejected.
4. The entry below being updated to `implemented` or `rejected` and dated.

## Entry format

Every entry must include every field below. Entries that omit a field are removed.

```markdown
### [short name in Title Case]

- **Date observed:** YYYY-MM-DD
- **Observed by:** human name or `ai-agent`
- **Observed pattern:** one or two sentences describing the repeated code or behaviour.
- **Repeated occurrences:** bullet list of concrete file paths and symbols (≥3). For each, one line of what it does.
- **Operational pain created:** named, observed pain — bug ID, drift incident, review comment URL, onboarding question, maintenance friction. Not speculation.
- **Proposed abstraction opportunity:** the shape that *might* fit. May be vague — this is observation, not design.
- **Why abstraction may help:** the cognitive-load or correctness gain expected. Concrete.
- **Risks of abstraction:** what could go wrong. Always include at least one risk; if none come to mind, the entry is not ready.
- **Recommendation status:** one of `observing`, `ready-for-evaluation`, `approved-for-implementation`, `implemented`, `rejected`, `superseded`.
- **Last reviewed:** YYYY-MM-DD
- **Notes (optional):** anything that helps a future evaluator — links to related entries, prior discussions, supersessions.
```

### Status values


| Status                        | Meaning                                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `observing`                   | Evidence is accumulating. Not ready for a human decision yet.                                                                              |
| `ready-for-evaluation`        | All four append conditions are clearly met. Awaiting human review.                                                                         |
| `approved-for-implementation` | Human has approved. A PR is expected. AI agents still do not implement without the approval being linked.                                  |
| `implemented`                 | Shipped. Entry retained as historical record; link the PR.                                                                                 |
| `rejected`                    | Human decided against. Entry retained with a one-line reason.                                                                              |
| `superseded`                  | Replaced by another entry, by a different solution, or by deletion of the duplication. Link the successor or the PR that removed the need. |


## Maintenance

- Entries with status `observing` that have not been updated in **90 days** are reviewed. If the pain has not recurred, mark `rejected` with reason `aged out` and keep the record.
- Entries with status `implemented` or `rejected` are kept for historical signal. They are not deleted.
- Entries with status `superseded` link to the successor entry, PR, or deletion that removed the need.
- Append at the bottom of the [Entries](#entries) section. Do not reorder; chronological order is the record.
- Editing an existing entry is allowed only to update `Recommendation status`, `Last reviewed`, or `Notes`. Substantive changes require a new entry referencing the prior one.

## Anti-patterns when appending

Do not append entries that:

- Describe an anticipated future need rather than an observed current one.
- Cite fewer than three real occurrences.
- Cite "feels duplicated" or "violates DRY" as the operational pain.
- Propose a `utils/`, `helpers/`, `common/`, or `shared/` module as the solution.
- Cross feature boundaries without a clear ownership home (see `[abstraction-governance.md](./abstraction-governance.md#operational-criteria-for-abstraction)`).
- Restate an existing entry. Cross-link instead.
- Are followed by an autonomous implementation. See [Who may implement](#who-may-implement).

## Entries

> No entries yet.
>
> When the first entry is added, this placeholder is removed.

## Related

- `[abstraction-governance.md](./abstraction-governance.md)` — the criteria entries are evaluated against
- `[ai-governance.md](./ai-governance.md)` — AI autonomy boundaries; this document is observation-only for agents
- `[engineering-philosophy.md](./engineering-philosophy.md)` — deletion-preferred, smallest-correct-diff, no anticipatory abstraction
- `[canonical-vocabulary.md](./canonical-vocabulary.md)` — forbidden module names that frequently appear in bad abstraction proposals


# Repository Boundaries

Where each kind of content lives. Read before adding a new markdown file or moving one.

## The split


| Surface          | Role                                                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| `docs/`          | **Explains the system.** Human-readable knowledge: architecture, governance, workflows, standards, narrative context. |
| `.ai/`           | **Operates the system.** Agent-executable assets: prompts, templates, agent workflows, agent-facing checklists.       |
| `.cursor/rules/` | Enforced rules in the IDE. Authoritative on conflict.                                                                 |
| `docs/specs/`    | Product specs, technical specs, and implementation plans per feature.                                                 |


Single rule: `**docs/` explains, `.ai/` operates.**

## What goes in `docs/`

- Architecture documents (`docs/architecture/`)
- Engineering philosophy and governance (`docs/architecture/engineering-philosophy.md`, `canonical-vocabulary.md`)
- Standards documents (`docs/standards/`)
- Workflows for humans (`docs/workflows/`)
- Specs (`docs/specs/`)
- Anything narrative, explanatory, or governance-oriented

## What goes in `.ai/`

- Agent prompts (`.ai/prompts/`)
- Agent-facing workflows (`.ai/workflows/`)
- Templates an agent fills in (`.ai/templates/`)
- Agent-facing standards (`.ai/standards/`) — short, operational restatements
- AI-generated operational assets (new prompts, new templates) produced by agents

## Authorship and consumption


| Surface          | Primarily authored by                    | Primarily consumed by         |
| ---------------- | ---------------------------------------- | ----------------------------- |
| `docs/`          | Humans                                   | Humans + agents reading prose |
| `.ai/`           | Humans (curated) + AI agents (generated) | AI agents executing tasks     |
| `.cursor/rules/` | Humans                                   | IDE + AI agents (enforced)    |


Either side may read the other. The labels indicate the dominant flow — not exclusive ownership.

## Decision rule for new files

Ask: *is this content meant to be **executed** by an agent, or **read** by a human?*

- Executed → `.ai/`
- Read → `docs/`

If both — pick the dominant use and link from the other.

## Mirror policy

When the same idea exists for both audiences, keep two short documents — not one long one shared.


| Concept                         | Human (`docs/`)                                | Agent (`.ai/`)                          |
| ------------------------------- | ---------------------------------------------- | --------------------------------------- |
| Feature implementation workflow | `docs/workflows/ai-implementation-workflow.md` | `.ai/prompts/feature-implementation.md` |
| Spec lifecycle                  | `docs/workflows/spec-driven-development.md`    | `.ai/workflows/spec-lifecycle.md`       |
| Repository invariants           | `docs/architecture/overview.md`                | `.ai/standards/repository.md`           |


Mirrors stay in sync on substantive change. Drift between mirrors is a defect.

## Conflict resolution

If `.cursor/rules/*.mdc` contradicts a `docs/` or `.ai/` file, the rule wins. Flag the prose drift in the PR; do not silently follow stale prose.

## Anti-patterns

- A long agent prompt buried in `docs/`.
- A human philosophy document under `.ai/`.
- Duplicating large prose across both surfaces instead of two short, linked docs.
- Letting `.ai/` accumulate narrative explanation — it should stay operational.

## Related

- `[canonical-vocabulary.md](./canonical-vocabulary.md)` — terminology
- `[engineering-philosophy.md](./engineering-philosophy.md)` — governance
- `[../README.md](../README.md)`, `[../../.ai/README.md](../../.ai/README.md)` — navigation
# Monolith Platform Documentation

Operational docs for humans and AI agents. Cursor rules (`.cursor/rules/*.mdc`) enforce standards in the IDE; this tree explains workflows and templates.

## Quick start

| I want to… | Read |
|------------|------|
| Set up locally | [workflows/development.md](./workflows/development.md) |
| Start a feature | [workflows/spec-driven-development.md](./workflows/spec-driven-development.md) |
| Implement with AI | [workflows/ai-implementation-workflow.md](./workflows/ai-implementation-workflow.md) |
| Open a PR | [workflows/pull-request-workflow.md](./workflows/pull-request-workflow.md) |
| Deploy | [workflows/deployment-workflow.md](./workflows/deployment-workflow.md) |

## Structure

```
docs/
  specs/          # Product, technical, implementation templates + feature specs
  architecture/   # Philosophy and layer standards
  workflows/      # End-to-end processes
  standards/      # Coding, naming, testing, Docker
```

## AI assets

Agent prompts, workflows, and templates: [.ai/](../.ai/)

| Path | Purpose |
|------|---------|
| `.ai/prompts/` | Copy-paste agent system prompts |
| `.ai/workflows/` | Product → release lifecycles |
| `.ai/standards/` | Agent behaviour and expectations |
| `.ai/templates/` | Compact spec templates |

## Architecture map

[architecture/overview.md](./architecture/overview.md) — repo layout summary.

[architecture/canonical-vocabulary.md](./architecture/canonical-vocabulary.md) — terminology used across `docs/`, `.cursor/rules/`, and `.ai/`.

[architecture/repository-boundaries.md](./architecture/repository-boundaries.md) — where `docs/`, `.ai/`, and rules each belong.

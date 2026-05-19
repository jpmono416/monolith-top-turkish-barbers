# Spec Lifecycle

How specifications evolve and remain trustworthy organisational memory.

## States

| Status | Meaning |
|--------|---------|
| `draft` | Work in progress, not for implementation |
| `review` | Ready for feedback |
| `approved` | Engineering may implement |
| `implementing` | Active development |
| `done` | Shipped; historical record |
| `superseded` | Replaced by newer spec (link successor) |

Update status in spec header on every transition.

## Artefacts

| Type | Template | Typical owner |
|------|----------|---------------|
| Product | `docs/specs/product-spec-template.md` | Product / lead |
| Technical | `docs/specs/technical-spec-template.md` | Engineering |
| Plan | `docs/specs/implementation-plan-template.md` | Engineering / agent |

Store in `docs/specs/YYYY-MM-DD-<feature>.md` or linked set:

```
docs/specs/2026-05-20-orders-product.md
docs/specs/2026-05-20-orders-technical.md
docs/specs/2026-05-20-orders-plan.md
```

## Change control

| Change type | Action |
|-------------|--------|
| Scope addition | Update product spec + re-approve |
| API contract change | Update technical spec + types first |
| Descoped work | Mark non-goals; update plan checklist |
| Wrong assumption found | Document in spec; fix spec before more code |

## Linking to code

- PR description links spec file
- Implementation plan checkboxes mirror PR scope
- On merge: spec → `implementing` → `done`

## Archival

- Do not delete specs — mark `superseded` with link
- Open questions resolved or moved to follow-up spec

## Agent rules

- Do not implement from `draft` specs unless user explicitly overrides
- When code diverges from spec, stop and reconcile spec first

## Related

- `docs/workflows/spec-driven-development.md`
- `.ai/workflows/product-to-implementation.md`

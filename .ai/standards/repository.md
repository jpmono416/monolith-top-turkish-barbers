# Repository standards

This document defines repository-level expectations within the Monolith AI-Native Engineering Platform.

The objective is:

- repository coherence
- operational simplicity
- maintainability
- predictable AI-assisted implementation
- low cognitive overhead

The platform is intentionally:

- highly opinionated
- modular monolith oriented
- AI-assisted
- operationally pragmatic

This document defines repository expectations, not rigid architectural law.

Controlled deviations may be acceptable when operationally justified and explicitly approved.

---

# Repository philosophy

Repositories should optimise for:

- fast product delivery
- maintainability
- implementation predictability
- operational clarity
- long-term coherence

Repositories should avoid:

- speculative scalability
- unnecessary infrastructure
- premature abstraction
- enterprise organisational patterns
- framework proliferation

The platform exists to accelerate product delivery, not become the product itself.

---

# Repository structure expectations

Repositories should:

- preserve clear boundaries
- maintain predictable structure
- favour explicit organisation
- minimise hidden coupling
- avoid parallel architectural systems

Structure should remain:

- understandable
- navigable
- operationally lightweight

Canonical terminology and boundaries are defined in:

- docs/architecture/[canonical-vocabulary.md](http://canonical-vocabulary.md)
- docs/architecture/[repository-boundaries.md](http://repository-boundaries.md)

---

# Shared code expectations

Shared code should exist only when operationally justified.

Potential shared packages may include:

- configuration
- UI primitives
- typed contracts
- operational tooling

Shared code should:

- reduce proven repeated operational pain
- remain narrowly scoped
- minimise cross-product coupling

Avoid:

- speculative shared frameworks
- premature package extraction
- shared business-domain abstractions

Repetition is acceptable until abstraction becomes operationally justified.

---

# Feature expectations

Features should:

- remain internally cohesive
- preserve understandable boundaries
- avoid unnecessary cross-feature coupling
- favour explicit behaviour

Business logic placement should remain:

- predictable
- maintainable
- easy to reason about

Reference implementation structures may exist to guide consistency, but should not become rigid architectural doctrine.

---

# Infrastructure expectations

Infrastructure should remain:

- operationally proportional
- easy to maintain
- easy to deploy
- understandable by AI agents

Additional infrastructure must justify:

- operational value
- maintenance burden
- cognitive overhead

Avoid:

- speculative infrastructure
- infrastructure-first thinking
- operational complexity without validation value

---

# AI-agent expectations

Repositories should optimise for:

- AI readability
- predictable implementation patterns
- explicit operational behaviour
- stable governance boundaries

AI agents should:

- prefer existing patterns
- avoid autonomous architecture redesign
- preserve repository coherence
- escalate justified deviations appropriately

---

# Documentation expectations

Repository documentation should remain:

- lightweight
- operational
- maintainable
- high-signal

Avoid:

- governance duplication
- overlapping documentation systems
- speculative documentation structures
- organisational theatre

Canonical specifications belong in:

- docs/specs/

Operational governance belongs in:

- docs/architecture/

AI operational guidance belongs in:

- .ai/

Rule enforcement belongs in:

- .cursor/rules/


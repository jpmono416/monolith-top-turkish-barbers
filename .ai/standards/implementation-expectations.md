# Implementation expectations

This document defines operational expectations for implementation work within the Monolith platform.

The objective is:

- maintainable delivery
- predictable implementation
- repository coherence
- operational simplicity
- AI-agent readability

This is NOT:

- rigid architectural enforcement
- speculative engineering doctrine
- infrastructure prescription

Controlled deviations may be acceptable when operationally justified and explicitly approved.

---

# Core expectations

Implementation should:

- preserve repository consistency
- prefer existing patterns
- optimise for maintainability
- remain operationally simple
- minimise unnecessary cognitive overhead
- favour explicit behaviour over clever abstractions

The smallest correct diff wins.

---

# Architecture expectations

Implementation should:

- follow existing repository boundaries
- avoid parallel architectural systems
- avoid speculative scalability
- avoid premature abstraction

Repetition is acceptable until abstraction becomes operationally justified.

Additional infrastructure must justify:

- operational value
- maintenance burden
- cognitive cost

---

# AI-agent expectations

AI agents should:

- read relevant context before implementation
- preserve existing implementation patterns
- escalate architectural uncertainty
- avoid autonomous governance changes
- avoid uncontrolled drift

If a deviation appears beneficial:

- explain operational reasoning
- explain tradeoffs
- request approval before implementation

---

# Verification expectations

Implementation work should include proportional verification.

Potential verification includes:

- linting
- type checking
- tests
- build validation
- manual flow verification

Verification depth should remain proportional to:

- implementation complexity
- operational risk
- validation importance

Avoid unnecessary testing infrastructure.

---

# Documentation expectations

Implementation work should:

- preserve documentation consistency
- update operational context when relevant
- document important deviations
- document reusable observations when valuable

Documentation should remain:

- lightweight
- operational
- maintainable

Avoid governance bloat.

---

# Non-goals

The platform does NOT optimise for:

- theoretical architectural purity
- enterprise process
- speculative infrastructure
- premature framework extraction
- excessive abstraction
- engineering aesthetics over operational outcomes


Implement an approved feature within the Monolith AI-Native Engineering Platform.

Your role is to execute implementation work inside an existing governed operational system.

The objective is:

- production-grade implementation
- operational simplicity
- repository consistency
- predictable delivery
- low cognitive overhead
- maintainable AI-readable code

The goal is NOT:

- architectural reinvention
- speculative scalability
- infrastructure expansion
- abstraction creation without operational justification

---

## Required implementation context

Before implementation:

1. Read relevant product/project context
2. Read relevant specifications
3. Read relevant governance/rule files
4. Inspect existing repository patterns
5. Match existing implementation conventions

Relevant context may exist in:

- docs/project/
- docs/specs/
- docs/architecture/
- .cursor/rules/
- .ai/

Read ONLY what is relevant to the current implementation slice.

Avoid unnecessary context loading.

If required specifications are missing:

- stop
- request missing inputs
- or offer to draft them from existing templates

---

## Execution principles

Implementation should:

- remain scoped to the current approved slice
- preserve repository consistency
- prefer existing patterns
- prefer direct implementation
- favour explicitness over abstraction
- optimise for maintainability
- preserve operational simplicity

The smallest correct diff wins.

Repetition is acceptable until abstraction becomes operationally justified.

Avoid:

- drive-by refactors
- speculative infrastructure
- unnecessary dependencies
- introducing parallel architectural patterns
- expanding scope beyond validation needs

---

## Architecture and governance

Canonical governance lives in:

- docs/architecture/
- .cursor/rules/
- .ai/

Do NOT:

- redefine governance during implementation
- duplicate architectural doctrine
- silently introduce deviations from platform conventions

If a deviation appears operationally justified:

- explain the reasoning
- explain tradeoffs
- explain maintenance implications
- request approval BEFORE implementation

Controlled deviations are acceptable.
Uncontrolled drift is not.

---

## Implementation workflow

Use existing repository patterns as the primary implementation reference.

Potential references may include:

- existing features
- existing services
- existing API patterns
- existing frontend structures
- existing environment/configuration patterns

Follow repository conventions instead of inventing new structures.

If implementation reveals:

- repeated operational pain
- reusable patterns
- governance friction
- abstraction opportunities

Document observations appropriately.

Do NOT autonomously introduce platform-wide abstractions.

---

## Verification expectations

Before completion:

- run relevant validation commands
- verify linting/type safety
- verify build integrity
- verify behaviour for the implemented slice
- verify no unrelated areas were unintentionally affected

Testing depth should remain proportional to:

- implementation complexity
- operational risk
- product validation goals

Avoid unnecessary testing infrastructure.

---

## Implementation completion output

Provide a concise operational summary including:

## Summary

What was implemented

## Verification

How behaviour was verified
(commands, routes, flows, environments)

## Scope completed

Which implementation-plan items were completed

## Operational observations

Any:

- friction encountered
- architectural uncertainty
- reusable pattern observations
- governance concerns
- potential future improvements

Keep communication concise, explicit, and operationally focused.
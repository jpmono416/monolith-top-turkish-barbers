Perform a behaviour-preserving refactor within the Monolith platform.

The objective is:

- improve maintainability
- improve clarity
- reduce justified duplication
- strengthen repository coherence

WITHOUT:

- changing external behaviour
- introducing architectural drift
- increasing unnecessary complexity

---

## Preconditions

Before refactoring:

- identify the exact improvement goal
- define what behaviour must remain unchanged
- inspect existing repository patterns
- verify refactor scope is operationally justified

If behaviour changes are required:  
treat the work as:

- feature implementation  
or
- bugfix

NOT:

- refactor

---

## Refactor principles

Prefer:

- small safe improvements
- explicit structures
- predictable patterns
- localised changes
- repository consistency

Avoid:

- speculative abstractions
- architecture redesign
- parallel systems
- unnecessary package extraction
- refactoring for aesthetics alone

Repetition is acceptable until abstraction becomes operationally justified.

---

## Governance expectations

If the refactor impacts:

- public contracts
- infrastructure assumptions
- multiple architectural boundaries
- shared operational patterns

perform an architecture review first.

If uncertainty exists:  
preserve stability and escalate concerns instead of expanding scope.

---

## Verification expectations

Verify:

- behaviour remains unchanged
- repository consistency preserved
- validation/build commands still pass
- no unrelated areas unintentionally changed

Testing depth should remain proportional to operational risk.

---

## Completion output

## Refactor goal

What was improved

## Behaviour preserved

What intentionally remained unchanged

## Verification

How stability was verified

## Operational observations

Any:

- repeated patterns
- future risks
- abstraction observations
- governance concerns


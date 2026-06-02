Perform a conservative architecture review on proposed or existing Monolith platform changes.

The goal is:

- preserve operational simplicity
- preserve maintainability
- preserve repository coherence
- detect unnecessary complexity
- detect architectural drift

The platform is highly opinionated by default, but controlled deviations may be acceptable when operationally justified.

Do NOT optimise for:

- theoretical scalability
- enterprise architecture
- speculative infrastructure
- abstraction purity

---

## Review areas

## Repository coherence

- Existing patterns preserved where reasonable
- No parallel architectural systems introduced
- Naming aligns with canonical vocabulary
- Repository boundaries remain clear

## Operational simplicity

- Complexity justified operationally
- Infrastructure burden proportional to product needs
- Cognitive overhead remains low
- No speculative systems introduced

## Feature boundaries

- Features remain internally cohesive
- Coupling remains intentional and understandable
- Business logic placement remains appropriate
- Shared code justified by repeated operational value

## API and contracts

- Public behaviour explicit and predictable
- Validation and error handling appropriate
- Contracts consistent with existing patterns

## Infrastructure and deployment

- Deployment assumptions remain simple
- Environment handling remains explicit
- Operational burden remains proportional

## AI-agent maintainability

- Implementation remains AI-readable
- Patterns remain predictable
- Governance consistency preserved
- Existing conventions preferred over novelty

---

## Review output

## Verdict

approve | approve with changes | reject

## Findings


| Severity | Area | Observation | Recommendation |
| -------- | ---- | ----------- | -------------- |


## Operational risks

- [Risk]
- [Risk]

## Governance observations

- [Observation]
- [Observation]

## Complexity assessment

Was unnecessary complexity introduced?

- yes / no

If yes:
explain whether it is operationally justified.
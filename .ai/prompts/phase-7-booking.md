# Phase 7 — Booking

## Objective

Implement ONLY:

Booking section redesign.

Everything else is out of scope.

## Required Reading

Read:

docs/specs/[2026-06-04-top-turkish-barbers-ui-design-spec.md](http://2026-06-04-top-turkish-barbers-ui-design-spec.md)

Focus specifically on:

# Booking

## Scope Boundaries

Do NOT modify:

- Navbar
- Hero
- Services
- Gallery
- Visit Us
- Footer

## Booking Tasks

Remove:

native date picker

Implement:

two wheel selectors

### Wheel 1

Day

Values:

1–31

Vertical wheel selector.

### Wheel 2

Month

Values:

January–December

Vertical wheel selector.

Month names only.

### Year

Current year automatically.

User never selects year.

## Submission Behaviour

When:

Submit Request clicked

Construct:

day  
month  
current year

Convert into existing payload structure.

Backend contract must remain unchanged.

No API changes.

## Implementation Constraints

Prefer:

lightweight implementation

Avoid:

new libraries

Avoid:

heavy date-picker packages

## Verification Checklist

Verify:

- native date picker removed
- day wheel exists
- month wheel exists
- current year used automatically
- booking submission still works
- API payload unchanged

Run:

- lint
- typecheck
- build

Provide screenshots.

Stop.
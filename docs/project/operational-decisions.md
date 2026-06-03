# Operational decisions

## Decision

Use appointment-request workflow instead of real scheduling engine

### Date

2026-06-02

### Context

The project is intended as a fast-moving local-business validation prototype prioritising premium UX and low operational complexity.

### Decision

The booking system will:

- collect preferred appointment date
- collect customer contact details
- trigger email and WhatsApp confirmations

The system will NOT:

- manage availability
- enforce timeslot collisions
- integrate calendars
- provide admin booking management

### Tradeoffs

- Simpler operational model
- Faster implementation
- Reduced realism compared to full booking systems
- Significantly lower maintenance burden

### Why this approach was chosen

This preserves fast delivery velocity and allows implementation effort to focus on visual polish and customer perception during in-person demos.

### Alternatives considered

- Full scheduling engine
- Third-party booking platform integration

### Revisit conditions

Revisit only if a real client signs and operational booking requirements become validated.

---

## Decision

Use WhatsApp Cloud API developer sandbox for demo validation

### Date

2026-06-02

### Context

The product aims to demonstrate modern booking confirmations and customer communication workflows during local-business demos.

### Decision

The prototype will integrate:

- WhatsApp Cloud API developer mode
- Resend email confirmations
- WhatsApp deep-link fallback behaviour

### Tradeoffs

- Temporary developer limitations
- Future production onboarding complexity
- Improved perceived product quality during demos

### Why this approach was chosen

The sandbox environment enables realistic demonstrations without introducing large operational costs or unnecessary production complexity during validation.

### Alternatives considered

- Email-only confirmations
- Deep-link-only WhatsApp flow
- Unofficial WhatsApp libraries

### Revisit conditions

Revisit when onboarding a paying production customer requiring full WhatsApp Business onboarding.

---

## Decision

Prioritise premium UX polish over feature breadth

### Date

2026-06-02

### Context

The primary success metric is strong emotional impact during in-person demo presentations.

### Decision

Implementation effort should prioritise:

- premium hero section
- motion design
- booking interaction quality
- responsive mobile experience
- visual consistency

Feature scope will remain intentionally constrained.

### Tradeoffs

- Reduced backend sophistication
- Smaller functional scope
- Higher frontend polish

### Why this approach was chosen

For local-business acquisition, perceived craftsmanship and trustworthiness have higher commercial impact than backend feature depth.

### Alternatives considered

- Larger feature scope
- Operational tooling
- Real booking infrastructure

### Revisit conditions

Revisit only after successful business validation.
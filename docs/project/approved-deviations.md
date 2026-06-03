# Approved deviations

## Deviation

WhatsApp Cloud API developer sandbox integration

### Date

2026-06-02

### Category

- infrastructure
- workflow

### Reason

The Monolith platform default communication flow currently focuses primarily on email delivery.

The WhatsApp sandbox integration is approved specifically to improve realism and perceived product quality during local-business demo validation.

### Approved by

Product/platform owner approval during initial local-business validation phase.

### Operational impact

- Additional Meta developer setup
- Additional environment variables
- Minor external API integration complexity
- Temporary developer sandbox restrictions

### Complexity impact

- low

### Revisit conditions

Revisit if:

- WhatsApp messaging becomes production-critical
- operational complexity increases
- production onboarding requirements become burdensome
- alternative messaging approaches become operationally preferable


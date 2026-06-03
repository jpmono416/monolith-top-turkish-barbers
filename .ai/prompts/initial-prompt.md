You are implementing the feature described in:

- docs/specs/[2026-06-02-top-turkish-barbers-product.md](http://2026-06-02-top-turkish-barbers-product.md)
- docs/specs/[2026-06-02-top-turkish-barbers-technical.md](http://2026-06-02-top-turkish-barbers-technical.md)
- docs/specs/[2026-06-02-top-turkish-barbers-plan.md](http://2026-06-02-top-turkish-barbers-plan.md)

Important constraints:

- Follow Monolith platform philosophy
- Smallest correct diff
- No unnecessary abstractions
- No generic booking framework
- No admin systems
- No real scheduling engine
- Premium UX quality is higher priority than backend sophistication
- Mobile-first
- Preserve operational simplicity

Implementation order:

1. booking-request API feature
2. Resend integration
3. WhatsApp Cloud API sandbox integration
4. homepage structure
5. premium hero section
6. premium booking interaction
7. responsive/mobile polish
8. animation refinement

Frontend direction:

- matte black
- warm gold accents
- premium Turkish barber aesthetic
- subtle cinematic motion
- elegant typography
- restrained premium animation

Booking UX:

- user selects preferred date first
- contact fields progressively appear
- elegant success transition after submit

Avoid:

- over-engineering
- reusable abstractions
- unnecessary packages
- complex state management
- excessive component fragmentation

Please begin with PR Slice 1 only:

- booking-request feature
- DTO validation
- Resend integration
- WhatsApp Cloud API sandbox wiring
- environment variable setup

After implementation:

- run lint
- run typecheck
- run tests
- summarise changes and verification steps
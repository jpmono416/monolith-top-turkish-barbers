# Implementation Plan: Top Turkish Barbers Demo Website

> **Technical spec:** `2026-06-02-top-turkish-barbers-technical.md`  
> **Branch:** `feature/top-turkish-barbers-demo`  
> **Estimated slices:** 4 PRs recommended

## Checklist (definition of done)

- Product + technical specs approved
- Lightweight booking request endpoint implemented
- Resend integration functional
- WhatsApp Cloud API sandbox functional
- Premium responsive landing page complete
- Booking interaction polished
- Environment variables configured
- `pnpm lint`, `typecheck`, `test`, `build` pass
- Critical booking journey manually validated
- Production deployment working
- Spec status updated

## Implementation order

Always:  
**foundation → booking API → premium UX → polish → deployment validation**


| Step | Task                    | Files / commands                         | Verify                     |
| ---- | ----------------------- | ---------------------------------------- | -------------------------- |
| 1    | Project setup alignment | env/config verification                  | local apps boot correctly  |
| 2    | Create booking feature  | `apps/api/src/features/booking-request/` | endpoint responds          |
| 3    | DTO validation          | booking DTOs/services                    | invalid payloads rejected  |
| 4    | Resend integration      | booking service                          | test email received        |
| 5    | WhatsApp integration    | booking service                          | sandbox message received   |
| 6    | Homepage structure      | `apps/web/src/app/page.tsx`              | sections render correctly  |
| 7    | Hero section polish     | hero components                          | premium visual quality     |
| 8    | Booking interaction UX  | booking components                       | interaction feels polished |
| 9    | Animation pass          | motion tuning                            | smooth mobile performance  |
| 10   | Responsive optimisation | mobile polish                            | mobile UX validated        |
| 11   | Final visual polish     | typography/spacing/imagery               | premium feel achieved      |
| 12   | Production deployment   | Vercel/Railway                           | full flow operational      |


## PR slices


| PR  | Contents                                                 | Depends on |
| --- | -------------------------------------------------------- | ---------- |
| 1   | booking API + Resend + WhatsApp setup                    | —          |
| 2   | landing page structure + branding                        | PR 1       |
| 3   | premium booking interaction + animations                 | PR 2       |
| 4   | polish + responsive optimisation + deployment validation | PR 3       |


## Agent execution notes

### Important implementation constraints

Agents must:

- preserve operational simplicity
- avoid abstractions
- avoid over-engineering
- avoid reusable framework creation
- avoid generic booking systems
- prefer smallest correct diff

### Frontend priorities

Highest frontend priority:

1. premium first impression
2. hero quality
3. booking interaction quality
4. mobile responsiveness
5. motion polish

### Backend priorities

Backend should remain:

- intentionally lightweight
- operationally simple
- easy to reason about
- minimal in surface area

### Animation guidance

Motion should feel:

- premium
- smooth
- restrained
- deliberate

Avoid:

- flashy transitions
- excessive parallax
- distracting motion
- performance-heavy effects

## Risks during implementation


| Risk                           | Watch for                            |
| ------------------------------ | ------------------------------------ |
| UX over-animation              | preserve elegance and clarity        |
| WhatsApp setup friction        | maintain deep-link fallback          |
| Mobile performance degradation | test animations on mobile            |
| Scope expansion                | preserve MVP constraints             |
| Real scheduling creep          | reject additional booking complexity |


## Post-merge

- Update spec statuses
- Validate production deployment manually
- Test live booking request flow
- Prepare in-person demo workflow
- Prepare sales/demo talking points


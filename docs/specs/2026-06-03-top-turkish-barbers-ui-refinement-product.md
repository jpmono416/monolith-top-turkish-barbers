# Product Spec: Top Turkish Barbers UI Refinement

> **Status:** approved  
> **Owner:** Ariel  
> **Last updated:** 2026-06-03  
> **Links:** `2026-06-02-top-turkish-barbers-product.md`

## Problem

The current implementation successfully establishes branding, colour palette and core content structure, but the overall experience still feels visually unbalanced and excessively long for a premium local-business landing page.

Current issues:

- oversized sections
- weak spacing hierarchy
- gallery dominating page length
- service layout resembling a PDF/menu rather than a premium website
- insufficient visual sophistication
- weak section composition
- overly vertical scrolling experience

The landing page should instead feel:

- premium
- compact
- curated
- elegant
- cinematic
- intentionally composed

while remaining operationally lightweight and implementation-friendly.

## Goals

- Reduce total perceived page length significantly
- Improve premium visual hierarchy
- Rework service presentation into modern premium cards
- Replace oversized gallery blocks with compact carousel layout
- Improve section balance and composition
- Improve overall commercial presentation quality
- Increase emotional impact during in-person demos

## Non-goals

Explicitly out of scope:

- Backend changes
- Booking workflow redesign
- New infrastructure
- CMS functionality
- Real gallery management
- Dynamic content systems
- Generic reusable UI framework extraction

## Users & scenarios


| Persona        | Scenario                            | Success signal                        |
| -------------- | ----------------------------------- | ------------------------------------- |
| Local customer | Browses landing page on mobile      | Experience feels premium and modern   |
| Business owner | Views demo website                  | Website appears commercially valuable |
| Product owner  | Uses demo during in-person outreach | Strong emotional first impression     |


## Requirements

### Must have

1. Reduced vertical page length
2. More compact section spacing
3. Modern premium services layout
4. Updated service list and pricing
5. Compact premium gallery redesign
6. Multi-image gallery carousel behaviour
7. Premium decorative gallery frames
8. Reworked location/contact section into 2-column layout
9. Improved visual hierarchy throughout page

### Should have

1. Subtle premium hover interactions
2. Smooth restrained motion
3. Premium spacing consistency
4. Improved typography hierarchy
5. Better desktop composition balance

### Could have (defer)

1. Advanced image transitions
2. Subtle parallax motion
3. Cinematic scroll reveals
4. Real photography optimisation

## UX / product behaviour

### Overall page direction

The page should:

- feel more compact
- feel intentionally designed
- reduce unnecessary whitespace
- avoid giant stacked sections
- preserve premium breathing room without excessive height

The target feeling is:

- luxury barbershop brand
- modern hospitality experience
- boutique premium service
- cinematic but restrained

### Services section

Current issues:

- resembles a PDF/menu
- weak hierarchy
- prices disconnected from service cards
- excessive width usage

New direction:

- modern premium card/grid layout
- no bullet points
- prices visually integrated into cards
- compact spacing
- visually balanced composition

Services must become exactly:

- Hair cut — £14
- Hot towel shave — £18
- Hot steam — £10
- Beard trim — £10
- Skin fades — £16
- Face mask — £12
- Hot wax — £8

No "from" pricing language.

### Gallery section

Current issues:

- excessively tall
- visually repetitive
- oversized placeholder blocks
- weak visual sophistication

New direction:

- 3-column desktop layout
- portrait-oriented framed cards
- each column behaves as a lightweight 3-image carousel
- smooth automatic image transitions
- no visible text overlays
- restrained premium appearance

Decorative frame direction:

- rounded corners
- thin ornamental edge details
- subtle gold luxury framing
- inspired by luxury mirrors/barber aesthetics

The gallery should feel:

- curated
- elegant
- compact
- visually premium

not:

- portfolio-heavy
- oversized
- content-dumping

### Find The Shop section

Current issues:

- stacked layout feels too long
- weak information grouping

New direction:

- 2-column responsive layout
- left:
  - map
  - address
- right:
  - opening hours
  - contact details

Desktop should feel balanced and compact.

Mobile should stack naturally.

## Acceptance criteria

- Given the refined homepage loads, when viewed on desktop, then the total page length feels significantly more compact
- Given the services section is visible, when browsing services, then the section feels premium and modern instead of resembling a PDF/menu
- Given the gallery section is visible, when viewing images, then the layout feels curated and visually sophisticated
- Given the location section is visible, when viewed on desktop, then map/details appear in balanced two-column composition
- Given the business owner views the demo, when navigating the site, then the website feels commercially premium and professionally designed

## Dependencies & risks


| Item                         | Type    | Mitigation                            |
| ---------------------------- | ------- | ------------------------------------- |
| Placeholder imagery quality  | product | use premium placeholders temporarily  |
| Over-animation risk          | UX      | maintain restrained motion philosophy |
| Excessive decorative styling | design  | preserve readability and simplicity   |


## Open questions

- Final decorative frame implementation style
- Final typography refinements
- Final animation timing calibration

## Handoff to engineering

When approved, create:

1. `2026-06-03-top-turkish-barbers-ui-refinement-technical.md`
2. `2026-06-03-top-turkish-barbers-ui-refinement-plan.md`


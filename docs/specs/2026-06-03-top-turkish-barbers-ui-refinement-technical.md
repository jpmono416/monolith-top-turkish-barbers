# Technical Spec: Top Turkish Barbers UI Refinement

> **Status:** approved  
> **Product spec:** `2026-06-03-top-turkish-barbers-ui-refinement-product.md`  
> **Owner:** Ariel  
> **Last updated:** 2026-06-03

## Summary

Refine the current landing page implementation to achieve a more premium, compact and commercially polished experience.

The implementation should focus on:

- layout refinement
- spacing hierarchy
- section redesign
- premium composition
- restrained motion polish

No backend or infrastructure changes are required.

## Scope

### In scope

- Homepage layout refinement
- Section spacing refinement
- Services section redesign
- Gallery section redesign
- Lightweight image carousel behaviour
- Decorative gallery framing
- Location/contact section restructuring
- Responsive composition improvements
- Typography hierarchy improvements

### Out of scope

- Backend changes
- API changes
- Booking logic changes
- CMS systems
- Dynamic gallery infrastructure
- Real persistence
- Generic component abstraction work

## Architecture impact


| Layer             | Change                                    |
| ----------------- | ----------------------------------------- |
| `apps/web`        | homepage component/layout refinement only |
| `apps/api`        | none                                      |
| `@monolith/types` | none                                      |
| Database          | none                                      |
| Infrastructure    | none                                      |


## Web implementation direction

### Overall layout goals

Reduce:

- oversized vertical spacing
- giant content blocks
- unnecessary full-height sections

Improve:

- composition density
- hierarchy
- section balance
- premium visual rhythm

### Hero section

Preserve:

- strong first impression
- premium dark aesthetic
- CTA prominence

Reduce:

- excessive vertical height
- unnecessary dead space

Target:

- approximately 85-95vh desktop
- approximately 75-85vh mobile

### Services section

Replace current list/menu appearance with:

- premium card/grid layout
- 2-4 columns responsive
- visually integrated pricing
- compact spacing

### Services content

Use exactly:

```txt
Hair cut — £14
Hot towel shave — £18
Hot steam — £10
Beard trim — £10
Skin fades — £16
Face mask — £12
Hot wax — £8

```

### Services visual direction

Requirements:

- no bullet points
- no "from" pricing
- price visually emphasised
- premium dark cards
- subtle gold borders/accenting
- restrained hover interaction

Avoid:

- menu/PDF appearance
- large horizontal rows
- excessive text density

### Gallery section

Replace current oversized gallery layout with:

- compact 3-column desktop grid
- portrait aspect ratio cards
- 1-column mobile stacking
- lightweight auto-rotating image carousel per column

### Carousel behaviour

Requirements:

- 3 images per column
- auto-rotate every 4-6 seconds
- smooth fade or slide transition
- lightweight implementation only
- avoid heavy carousel libraries

### Gallery frame styling

Direction:

- rounded luxury frame appearance
- subtle ornamental corner details
- thin gold framing
- inspired by premium mirrors/barber aesthetics

Implementation guidance:

- CSS pseudo-elements preferred
- avoid SVG-heavy decorative systems
- avoid over-engineering

### Gallery content constraints

- no text overlays
- no placeholder explanatory text
- no giant image containers
- restrained section height

### Find The Shop section

Refactor into responsive 2-column layout.

Left column:

- map
- address

Right column:

- opening hours
- contact details

Desktop:

- balanced side-by-side composition

Mobile:

- stacked naturally

## Motion direction

Motion should feel:

- premium
- restrained
- smooth
- deliberate

Avoid:

- flashy animation
- excessive scroll effects
- performance-heavy transitions

## Responsive behaviour

### Desktop

Focus:

- balanced composition
- reduced page length
- premium spacing rhythm

### Mobile

Focus:

- readability
- compact stacking
- touch-friendly spacing
- preserved premium feel

## Security

No security changes required.

## Observability

No observability changes required.

## Testing plan


| Layer            | What to test                  |
| ---------------- | ----------------------------- |
| Responsive UI    | desktop/tablet/mobile layouts |
| Gallery carousel | transitions + timing          |
| Services layout  | responsive card behaviour     |
| Contact section  | responsive 2-column stacking  |


## Rollout

Deploy web application normally after:

- responsive validation
- visual QA
- mobile testing

## Open questions

- Final gallery ornament implementation
- Final card hover intensity
- Final image transition style


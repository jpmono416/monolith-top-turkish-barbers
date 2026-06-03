# Implementation Plan: Top Turkish Barbers UI Refinement

> **Technical spec:** `2026-06-03-top-turkish-barbers-ui-refinement-technical.md`  
> **Branch:** `feature/top-turkish-barbers-ui-refinement`  
> **Estimated slices:** 3 PRs recommended

## Checklist (definition of done)

- Services section redesigned
- Service content updated
- Gallery section redesigned
- Compact layout implemented
- Decorative frames implemented
- Gallery carousel behaviour working
- Find The Shop section converted to 2-column layout
- Responsive layouts validated
- Mobile UX polished
- Excessive page length reduced
- `pnpm lint`, `typecheck`, `build` pass

## Implementation order


| Step | Task                                   | Verify                          |
| ---- | -------------------------------------- | ------------------------------- |
| 1    | Reduce oversized spacing/layout height | page feels more compact         |
| 2    | Redesign services section              | premium card layout visible     |
| 3    | Update services/pricing content        | exact services rendered         |
| 4    | Rebuild gallery layout                 | compact 3-column layout working |
| 5    | Add lightweight carousel behaviour     | image transitions working       |
| 6    | Add decorative framing                 | premium visual appearance       |
| 7    | Refactor Find The Shop section         | balanced 2-column layout        |
| 8    | Responsive polish                      | mobile/tablet validated         |
| 9    | Motion polish pass                     | restrained premium motion       |


## PR slices


| PR  | Contents                              |
| --- | ------------------------------------- |
| 1   | spacing/layout/services redesign      |
| 2   | gallery redesign + carousel behaviour |
| 3   | location/contact redesign + polish    |


## Agent execution notes

### Critical priorities

Prioritise:

1. composition quality
2. spacing hierarchy
3. premium visual rhythm
4. compactness
5. restrained elegance

Do NOT prioritise:

- abstraction
- reusable systems
- generic UI frameworks
- over-engineered animation systems

### Gallery implementation guidance

Preferred approach:

- lightweight React state
- interval rotation
- CSS transitions
- minimal logic

Avoid:

- complex carousel packages
- generic slideshow abstractions
- animation-heavy frameworks

### Decorative styling guidance

The decorative frame should:

- feel elegant
- remain subtle
- not dominate the UI
- preserve readability

Prefer:

- CSS pseudo-elements
- thin borders
- restrained ornamentation

Avoid:

- heavy SVG systems
- ornate excessive decoration
- visual clutter

### Layout guidance

Target:

- curated premium composition

Avoid:

- giant stacked sections
- excessive whitespace
- oversized image blocks
- long-scroll feeling

## Risks during implementation


| Risk                      | Watch for                       |
| ------------------------- | ------------------------------- |
| Over-decoration           | maintain premium restraint      |
| Carousel complexity creep | keep implementation lightweight |
| Reduced readability       | preserve hierarchy clarity      |
| Animation excess          | preserve subtlety               |
| Mobile spacing issues     | validate real mobile layouts    |


## Post-merge

- Validate mobile UX manually
- Validate desktop composition
- Capture updated screenshots
- Prepare next demo iteration


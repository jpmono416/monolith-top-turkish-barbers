# Top Turkish Barbers UI Design Specification

Status: Approved

Purpose:

This document defines the exact visual direction for the final refinement of the Top Turkish Barbers demo website.

This is NOT a product specification.

This is NOT a technical specification.

This document exists to remove ambiguity from UI implementation.

The visual reference image remains the primary aesthetic reference.

This document defines:

- layout
- hierarchy
- spacing
- proportions
- content
- responsiveness

Implementation should follow this document exactly.

---

# Global Page Direction

## Current State

The website now contains all major sections and branding.

However several areas still feel:

- unfinished
- stretched vertically
- weakly composed
- inconsistent with the visual reference

The website currently resembles a correctly themed wireframe rather than a premium finished marketing page.

## Target State

The website should feel:

- intentionally designed
- premium
- compact
- luxurious
- highly curated

The page should communicate quality within the first few seconds.

A barber shop owner should immediately feel:

"This is significantly better than what I currently have."

---

# Visual Hierarchy

The page should communicate information in this order:

1. Hero headline
2. Hero CTA
3. Services
4. Gallery
5. Booking
6. Visit Us

Nothing should compete with the Hero section.

Nothing should visually dominate the page more than the Hero.

---

# Section Header System

## Current Problem

Most sections currently contain:

- a title
- a subtitle

Example:

Services  
Our Services

Gallery  
The Atmosphere

This creates visual clutter.

## Target

Every section should contain exactly ONE heading.

Examples:

Services

Gallery

Booking

Visit Us

No secondary heading.

No subtitle.

## Decorative Divider

Every section heading should have a decorative divider underneath.

Format:

---

Characteristics:

- centred
- accent colour
- positioned immediately below heading
- consistent across all sections

This divider becomes the shared visual language for all sections.

---

# Navbar

## Current Problems

The navbar feels:

- too thin
- unfinished
- visually disconnected from the rest of the page

Navigation is also incomplete.

## Target Layout

Desktop:

Left side:

Top Turkish Barbers

Right side:

Home  
Services  
Gallery  
Contact

Book Appointment button

All items aligned vertically.

The navbar should feel intentional and premium.

## Height

Increase navbar height noticeably.

Target feeling:

luxury hotel website

not:

developer template navigation

## Navigation Behaviour

Links scroll to sections.

Book Appointment scrolls directly to booking section.

---

# Hero Section

## Current Problems

Hero content spans too much horizontal space.

Buttons stretch excessively.

Hierarchy is weak.

The copy does not match the intended marketing message.

## Target Composition

Everything centred.

Maximum content width:

700px–900px

Nothing should span the full viewport width.

The eye should remain focused in the centre of the screen.

## Hero Copy

Small accent text:

OPEN EVERY DAY

Eyebrow text:

TRADITION • PRECISION • PERFECTION

Main headline:

Premium Grooming  
for the Modern Man

Supporting copy:

Traditional Turkish barbering, modern precision, and a welcoming experience in the heart of Shrewsbury.

## CTA

Only one button.

Text:

Book Appointment

Remove:

View Services

Button width:

content-sized

Never full width.

The button should feel premium and intentional.

## Hero Background

Use the barber interior hero image.

The image should:

- cover hero area
- remain readable behind overlay
- preserve focus on text

Use a dark overlay if required.

---

# Services Section

## Current Problems

Cards still feel mechanically arranged.

Spacing is too tight.

Price hierarchy remains weak.

The layout does not immediately communicate quality.

## Target Layout

Desktop:

Row 1:  
4 services

Row 2:  
3 services

The second row should appear centred beneath the first row.

Not left aligned.

Mobile:

Maximum 2 columns.

Expected arrangement:

2  
2  
2  
1

## Card Separation

Cards should visually float independently.

Cards must never touch.

Minimum gap:

24px horizontal

24px vertical

## Internal Card Layout

Top padding must be increased.

The icon should never appear close to the top border.

Visual order:

1. Icon
2. Service Name
3. Price

## Price Treatment

Price should become a visual focal point.

Requirements:

- larger font
- bold weight
- gold colour
- positioned close to service name

The current implementation places too much visual emphasis on the service title.

Target implementation should place more emphasis on the price.

## Services

Exactly:

Hair Cut — £14

Hot Towel Shave — £18

Hot Steam — £10

Beard Trim — £10

Skin Fades — £16

Face Mask — £12

Hot Wax — £8

---

# Gallery

## Current Problems

List markers visible.

Mobile layout unnecessarily long.

Gallery still feels like a placeholder component.

## Desktop Layout

Three portrait cards.

Three columns.

Cards aligned horizontally.

Balanced spacing.

## Mobile Layout

Show only ONE carousel.

Do not stack all three carousels vertically.

The current mobile implementation creates unnecessary page length.

## Decorative Frame

The frame should be treated as part of the design.

Characteristics:

- thin gold border
- subtle ornamentation
- rounded corners

The frame should feel:

luxury mirror

not:

picture frame

## Content

No captions.

No labels.

No explanatory text.

The images alone should communicate atmosphere.

## Technical Constraint

Remove white list markers through CSS.

Do not refactor component structure solely to remove markers.

---

# Booking

## Current Problems

The standard date picker breaks the premium visual language.

It feels like a browser control rather than a designed experience.

## Target

Replace with two wheel selectors.

Inspired by iOS date wheels.

## Wheel One

Day

Values:

1–31

Vertical scrolling.

## Wheel Two

Month

Values:

January–December

Vertical scrolling.

Use month names.

Never numbers.

## Year

Not selectable.

Always use current year.

## Submission Behaviour

When the form is submitted:

Construct:

Day  
Month  
Current Year

Convert into the payload format already expected by the backend.

No API contract changes.

No backend changes.

---

# Visit Us

## Current Problems

Information hierarchy is weak.

Map and business information do not feel connected.

The section is visually unbalanced.

## Desktop Layout

Exactly two columns.

50% width each.

### Left Column

Map

Address underneath

Nothing else.

Remove:

Top Turkish Barbers heading.

### Address

Display:

location icon  
address text

Only address information.

### Right Column

Opening Hours

Contact Information

## Opening Hours

Display exactly:

Monday – Saturday

9:00am – 6:30pm

Sunday

10:00am – 4:00pm

This should be presented clearly and scan easily.

## Contact Information

Display:

phone icon + phone

email icon + email

whatsapp icon + whatsapp

Use gold icons.

## Map Styling

If easily achievable:

- dark theme
- gold marker

If not:

keep existing map implementation.

Do not introduce additional complexity.

---

# Footer

Remove completely.

The website should end after Visit Us.

The Visit Us section becomes the natural conclusion of the page.

---

# Final Acceptance Criteria

The final page is approved only when:

- Hero contains new copy
- Hero contains one CTA
- CTA is not full width
- Navbar contains all required links
- Section subtitles removed
- Section divider added everywhere
- Services render 4+3 desktop layout
- Services render 2+2+2+1 mobile layout
- Services have larger prices
- Services have increased spacing
- Gallery displays one carousel on mobile
- Gallery list markers removed
- Booking uses wheel selectors
- Visit Us uses two-column desktop layout
- Visit Us uses icons
- Footer removed

Every item above must be complete before the UI is considered finished.
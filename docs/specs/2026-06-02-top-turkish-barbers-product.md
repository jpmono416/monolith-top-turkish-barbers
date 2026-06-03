# Product Spec: Top Turkish Barbers Demo Website

> **Status:** implemented  
> **Owner:** Ariel  
> **Last updated:** 2026-06-02  
> **Links:** Local Business Web Platform initiative

## Problem

Many independent local businesses lack modern, premium-quality websites that reflect the quality of their in-person customer experience. This reduces perceived trust, weakens online visibility and limits customer conversion opportunities.

Top Turkish Barbers in Shrewsbury currently represents a strong candidate for validating whether highly tailored modern demo websites can improve local-business acquisition workflows and generate recurring maintenance revenue.

## Goals

- Deliver a premium-quality local-business demo website rapidly
- Create strong emotional impact during in-person demo presentation
- Demonstrate modern appointment-request UX
- Validate local-business commercial interest
- Validate AI-assisted Monolith delivery workflow

## Non-goals

Explicitly out of scope for this iteration:

- Real scheduling engine
- Calendar integrations
- Authentication
- Admin dashboard
- Multi-business support
- CMS tooling
- Queue-driven architecture

## Users & scenarios


| Persona               | Scenario                                       | Success signal                                   |
| --------------------- | ---------------------------------------------- | ------------------------------------------------ |
| Local barber customer | Visits website on mobile and explores services | Website feels premium and trustworthy            |
| Local barber customer | Requests appointment                           | Booking request submitted successfully           |
| Business owner        | Views demo in-person                           | Strong positive reaction and commercial interest |


## Requirements

### Must have

1. Premium landing page experience
2. Real business branding/content
3. Mobile-first responsive design
4. Opening hours and contact information
5. Embedded map/location
6. Premium booking-request interaction
7. Email confirmation flow
8. WhatsApp confirmation/demo integration
9. Smooth animations and transitions

### Should have

1. Service showcase section
2. Gallery imagery
3. Subtle barber-pole-inspired visual motion
4. Premium scroll behaviour

### Could have (defer)

1. Real booking management
2. Customer notifications
3. Admin tooling
4. Analytics dashboard
5. Review management

## UX / product behaviour

Primary flow:

1. User lands on cinematic premium hero section
2. User explores business information and imagery
3. User enters booking section
4. User selects preferred appointment date
5. Contact fields progressively animate into view
6. User submits booking request
7. User receives confirmation experience
8. WhatsApp confirmation flow is triggered

Booking interaction should feel:

- premium
- modern
- elegant
- lightweight
- visually differentiated from generic booking forms

The experience should avoid:

- clutter
- operational complexity
- enterprise scheduling UI patterns

## Acceptance criteria

- Given a mobile user visits the site, when the page loads, then the experience feels premium and fully responsive
- Given a user selects a preferred date, when contact details are entered, then the booking request can be submitted successfully
- Given a booking request is submitted, when processing completes, then confirmation messaging is shown
- Given the business owner views the website, when navigating through the experience, then the website appears production-quality and commercially viable

## Dependencies & risks


| Item                     | Type        | Mitigation                              |
| ------------------------ | ----------- | --------------------------------------- |
| WhatsApp Cloud API setup | third-party | fallback deep-link flow                 |
| Asset quality            | product     | manually curate best available imagery  |
| Time constraints         | operational | intentionally constrained feature scope |


## Open questions

- Final animation intensity balance
- Final imagery selection
- Exact booking confirmation messaging


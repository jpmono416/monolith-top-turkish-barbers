# Technical Spec: Top Turkish Barbers Demo Website

> **Status:** implemented  
> **Product spec:** `2026-06-02-top-turkish-barbers-product.md`  
> **Owner:** Ariel  
> **Last updated:** 2026-06-02

## Summary

Build a premium-quality local-business demo website using the Monolith platform defaults with intentionally constrained backend complexity.

The system will provide:

- premium landing page experience
- lightweight appointment-request workflow
- Resend email confirmations
- WhatsApp Cloud API sandbox integration
- minimal API infrastructure reuse

The implementation prioritises:

- visual polish
- operational simplicity
- rapid delivery
- maintainability
- realistic production deployment validation

## Scope

### In scope

- Premium responsive landing page
- Real business branding/content
- Animated booking-request interaction
- Appointment request submission
- Resend integration
- WhatsApp Cloud API sandbox integration
- Lightweight API endpoint(s)
- Minimal infrastructure wiring validation
- Mobile-first UX
- Production deployment setup

### Out of scope

- Real scheduling engine
- Availability management
- Calendar integrations
- Authentication
- Admin dashboard
- Customer management
- Queue processing
- Persistent booking storage
- CMS integration
- Multi-business support

## Architecture impact


| Layer                  | Change                                             |
| ---------------------- | -------------------------------------------------- |
| `@monolith/types`      | Optional lightweight booking request types         |
| `apps/api` feature     | `features/booking-request/`                        |
| `apps/web`             | Landing page, booking interaction, API integration |
| `apps/mobile`          | none                                               |
| `prisma/schema.prisma` | none initially                                     |
| Queues                 | none                                               |
| Infra / env            | Resend + WhatsApp environment variables            |


## Data model

No persistent database models initially.

Booking requests will remain operationally lightweight:

- transient API handling
- email delivery
- WhatsApp delivery
- optional mocked success response

No Prisma migration required for MVP.

## API contract

Base path: `/api/booking-request`


| Method | Path                   | Auth | Request                 | Response         | Notes                          |
| ------ | ---------------------- | ---- | ----------------------- | ---------------- | ------------------------------ |
| POST   | `/api/booking-request` | none | booking request payload | success response | triggers email + WhatsApp flow |
| GET    | `/api/health`          | none | none                    | health status    | existing platform endpoint     |


### Booking request payload

```ts
type BookingRequest = {
  preferredDate: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
};

```

### Response

```ts
type BookingRequestResponse = {
  success: boolean;
  message: string;
};

```

## DTOs & validation


| DTO                       | Fields                                                    | Rules                                                    |
| ------------------------- | --------------------------------------------------------- | -------------------------------------------------------- |
| `CreateBookingRequestDto` | preferredDate, customerName, customerPhone, customerEmail | required date + name, optional validated contact details |


Validation rules:

- required preferred date
- required customer name
- minimum one contact method
- sanitised string lengths
- basic phone/email validation

## Service logic

### Booking request flow

1. Validate payload
2. Generate lightweight booking summary
3. Send confirmation email via Resend
4. Attempt WhatsApp Cloud API message
5. Fallback gracefully if WhatsApp fails
6. Return success response

### Operational principles

- no persistence
- no retry system
- no queue infrastructure
- no background processing
- no transactional complexity

### Error handling

- graceful frontend messaging
- no raw provider errors exposed
- fallback success copy if WhatsApp unavailable

## Async / queues

Not used intentionally for MVP.

Rationale:

- operational simplicity
- low complexity
- small request volume
- validation-first implementation

## Web / mobile

### Routes

```txt
apps/web/src/app/page.tsx

```

### Sections

- hero
- services
- gallery
- booking interaction
- contact/location
- footer

### Booking UX behaviour

The booking interaction is a key differentiator.

Flow:

1. User selects preferred date
2. Contact fields progressively animate into view
3. User submits request
4. Success animation/transition shown
5. Confirmation messaging displayed

### Design direction

Visual style:

- matte black
- warm gold accents
- premium typography
- cinematic imagery
- subtle motion design

Animation principles:

- smooth
- premium
- restrained
- polished
- mobile-friendly

### Technical frontend direction

- App Router
- Tailwind
- shadcn/ui where useful
- Framer Motion allowed for premium UX polish
- minimal client components only where interaction requires

## Security

- DTO validation on API
- No secrets exposed client-side
- Rate limiting deferred for MVP
- Environment variables stored securely
- No authentication surface initially

### Required environment variables

```env
RESEND_API_KEY=
BOOKING_NOTIFICATION_EMAIL=

WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_VERIFY_TOKEN=

```

## Observability

Minimal operational logging only.

Log:

- booking request received
- email delivery attempt
- WhatsApp delivery attempt
- provider failure fallback

Avoid:

- verbose logs
- PII leakage
- operational noise

## Testing plan


| Layer           | What to test                              |
| --------------- | ----------------------------------------- |
| API service     | request validation + success/failure flow |
| Web interaction | booking interaction states                |
| E2E             | complete booking-request flow             |


### Critical E2E flow

1. Open homepage
2. Navigate booking interaction
3. Select date
4. Enter contact details
5. Submit request
6. Verify success state appears

## Rollout

### Deployment order

1. Deploy API (Railway)
2. Configure environment variables
3. Deploy web (Vercel)
4. Validate booking flow manually

### Rollback plan

If WhatsApp integration fails:

- disable WhatsApp API usage
- preserve email flow
- preserve WhatsApp deep-link fallback

## Open questions

- Final WhatsApp message template wording
- Final animation intensity calibration
- Final imagery/licensing selection


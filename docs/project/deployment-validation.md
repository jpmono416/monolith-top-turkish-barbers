# Deployment validation: Top Turkish Barbers demo

Use this checklist after deploying API (Railway) and web (Vercel). See `docs/workflows/deployment-workflow.md` for platform steps.

## Environment variables

### Railway (API)

| Variable | Required for demo |
|----------|-------------------|
| `DATABASE_URL` | Yes (platform health) |
| `DIRECT_URL` | Yes (migrations) |
| `REDIS_URL` | Yes (platform boot) |
| `CORS_ORIGIN` | Yes — Vercel web URL |
| `RESEND_API_KEY` | Yes for email |
| `BOOKING_NOTIFICATION_EMAIL` | Yes for email |
| `BOOKING_FROM_EMAIL` | Yes (verified Resend domain) |
| `WHATSAPP_ACCESS_TOKEN` | Optional (sandbox) |
| `WHATSAPP_PHONE_NUMBER_ID` | Optional (sandbox) |
| `WHATSAPP_VERIFY_TOKEN` | Optional (webhook verify) |

### Vercel (Web)

| Variable | Required |
|----------|----------|
| `NEXT_PUBLIC_APP_URL` | Yes — production web URL |
| `NEXT_PUBLIC_API_URL` | Yes — Railway API URL |

## Release order

1. Deploy API → `GET /api/health` returns `status: ok`
2. Set Vercel `NEXT_PUBLIC_API_URL` to Railway URL
3. Set Railway `CORS_ORIGIN` to Vercel URL
4. Deploy web

## Smoke tests

- [ ] Homepage loads on mobile and desktop
- [ ] Mobile menu opens and section links scroll correctly
- [ ] Booking: select date → contact fields appear → submit → success state
- [ ] `POST /api/booking-request` returns 201 (browser network tab or curl)
- [ ] Resend notification received (if configured)
- [ ] WhatsApp message or graceful skip logged on API (if configured)
- [ ] WhatsApp deep link on contact section works
- [ ] Map iframe renders

## Rollback

- Web: Vercel previous deployment
- API: Railway previous image
- If WhatsApp fails: disable tokens; email + WhatsApp deep link remain usable

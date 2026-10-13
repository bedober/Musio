# Musio

Musio is a Uganda-first music streaming and artist-services platform, designed to expand worldwide.

## Working prototype

The first public Zite prototype is available at **https://6c1j92a3bg.zite.so**. It demonstrates listener music discovery and five workspace previews: Listener, Artist, Management, Label, and Platform Admin.

The prototype currently uses demo data. Playback controls are UI-only; live authentication, licensed audio streaming, database-backed catalog data, and royalty payments are not connected yet.

## Product direction

- Free music discovery and streaming
- Artist and label services
- Role-specific catalog and release management
- Transparent royalty statements and payout tracking
- Uganda-first onboarding, with international expansion after validation

## Workflow

- **Zite:** rapid prototype and early operational workflows
- **GitHub:** versioned source, implementation plan, and CI
- **Vercel:** Next.js hosting and deployment

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for the phased roadmap, role permissions, and architecture.

## Pesapal payment integration

The server-side Pesapal API foundation is available at `POST /api/payments/pesapal` for creating a checkout order and `GET /api/payments/pesapal?orderTrackingId=...` for checking the provider's transaction status. The callback returns the customer to `/payment/result` with the tracking ID. It supports UGX, USD, KES, TZS, and RWF and uses separate sandbox/live credentials.

Configure the environment variables in `.env.example` in Vercel Project Settings → Environment Variables. Keep all Consumer Keys and Secrets server-side. Set `PESAPAL_ENVIRONMENT=sandbox` while testing. To go live, complete Pesapal merchant approval, obtain live credentials, register an IPN URL, set the live IPN ID, and set `PESAPAL_ENVIRONMENT=live`. Set `NEXT_PUBLIC_APP_URL` to the canonical HTTPS Musio domain.

**Important limitations:** this is the payment-provider integration foundation, not a complete paid-product flow. A verified user/order database, payment persistence and idempotent IPN processing, entitlement activation, refunds/reconciliation, and an actual checkout UI must be added before charging users for services. Never unlock a service or mark an order paid based only on the browser callback; verify the status with Pesapal on the server.

## Next.js starter runtime

- Node.js 24.x
- Next.js 15.5.27
- React 19.2.4

Local development:

```bash
npm install
npm run dev
```

## Production requirements still outstanding

- Secure authentication and server-enforced role-based access
- Database schema and row-level authorization
- Licensed catalog, media upload validation, audio transcoding, and signed streaming delivery
- Auditable play events and contract-based royalty ledger
- Payment persistence, idempotent Pesapal IPN handling, checkout UI, and payout reconciliation
- Security, privacy, rights/takedown, backup, and production tests

**Deployment status:** the Zite prototype is published. The GitHub-to-Vercel deployment still needs verification because the Vercel integration returned an authorization/scope error. Do not treat the prototype as production-ready or any demo earnings as payable amounts.

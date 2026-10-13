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
- Uganda-compatible payment-provider onboarding and payout reconciliation
- Security, privacy, rights/takedown, backup, and production tests

**Deployment status:** the Zite prototype is published. The GitHub-to-Vercel deployment still needs verification because the Vercel integration returned an authorization/scope error. Do not treat the prototype as production-ready or any demo earnings as payable amounts.

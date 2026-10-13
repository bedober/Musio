# Musio implementation plan

**Launch market:** Uganda first, international expansion after pilot validation.  
**Product model:** Free, ad-supported or sponsor-supported streaming at launch; paid artist and label services.  
**Workflow:** Zite for fast product iteration and operations, GitHub for versioned source and reviews, Vercel for the Next.js production application.

## Current build status (2026-10-13)

- A public Musio Streaming prototype has been built and published in Zite: https://6c1j92a3bg.zite.so
- Prototype includes responsive listener discovery, genre filtering, search, liked-track UI, a demo player state, and selectable Listener, Artist, Management, Label, and Platform Admin workspace previews.
- Zite typecheck passed before commit.
- GitHub contains the initial Next.js starter using Node.js 24.x and Next.js 15.5.27.
- Vercel deployment is not verified yet; the Vercel connector previously returned an authorization/scope error.
- Demo cards, plays, earnings, and dashboard counts are placeholders, not real catalog or financial data. Playback controls are UI-only until licensed audio delivery is connected.

## Product phases

### Phase 1 — Working product shell
- Mobile-first landing and discovery experience.
- Search, genre filters, likes/library interaction, track cards, and persistent player controls.
- Five clearly separated role experiences and role-specific navigation.
- Use fixture/demo data only; label it clearly.

### Phase 2 — Identity, permissions, and core data
- Authentication with email/password and OAuth where useful.
- Store roles and account status on the server, not in editable browser state.
- Enforce role permissions in every server endpoint and database policy.
- Core entities: users, artist profiles, management memberships, labels, label rosters, tracks/releases, media assets, rights/territories, play events, royalty ledger entries, payout requests, audit events.
- Multi-factor authentication for platform administrators; audit privileged actions.

### Phase 3 — Catalog and streaming
- Artist/label submission workflow with metadata, cover art, audio files, explicit-content flag, rights declarations, territories, and release dates.
- Uploads to private object storage; validate file type, size, and media metadata.
- Transcode to streaming formats and deliver through CDN/signed URLs.
- Record a play only after a defined qualifying-play rule is met; add rate limits and bot/fraud detection.
- Confirm music rights and distribution agreements before public playback.

### Phase 4 — Royalty accounting and payments
- Keep raw play events and financial ledger entries append-only; corrections are reversing/adjustment entries.
- Calculate allocations from contract terms and eligible net revenue by reporting period, territory, and revenue source. Do not promise a fixed per-stream rate.
- Show calculation inputs, deductions, split percentages, adjustments, status, and period in artist/label statements.
- Require reconciliation and approval before payout; store provider transaction references and payout audit history.
- Add Uganda payment-provider integration only after merchant onboarding and sandbox tests. Support international payout methods later.

### Phase 5 — Launch readiness and expansion
- Test with a small group of Ugandan artists, labels, and listeners.
- Security review, accessibility, backup/restore test, performance checks, privacy/retention policy, takedown workflow, and incident response.
- Track streaming reliability, search-to-play conversion, artist activation, payout reconciliation, and support volume.
- Expand to additional countries after rights coverage, payment rails, support, and local compliance are confirmed.

## Role and permission matrix

| Capability | Listener | Artist | Management | Label | Platform Admin |
|---|---|---|---|---|---|
| Discover/play published catalog | Yes | Yes | Yes | Yes | Yes |
| Manage own library | Yes | Yes | Yes | Yes | Support only |
| Submit/manage own releases | No | Own catalog | Assigned artists only | Label roster only | Review/support |
| View audience analytics | No | Own profile | Assigned artists | Label roster | Aggregated platform view |
| View royalty statements | No | Own statements | Only explicitly delegated | Label/roster entitlement | Audited operations |
| Request payout | No | Own account | Only if explicitly delegated | Label account | Review/approve, never impersonate |
| Manage roles and security | No | No | No | Label members within scope | Yes, with audit trail |

Every permission above must be enforced server-side. Hiding a button or changing the selected workspace is not authorization.

## Initial technical architecture

- **Zite:** prototype, internal operations tools, and early data/workflow iteration.
- **GitHub:** canonical reviewable source, issues, CI checks, migrations, and release history.
- **Vercel:** Next.js application hosting and preview/production deployments.
- **PostgreSQL:** relational source of truth for identities, catalog metadata, permissions, royalty ledger, and audit history.
- **Object storage + CDN:** private source audio and controlled streaming delivery.
- **Payment provider:** provider abstraction; integrate a Uganda-compatible provider after account and compliance setup.

Before production, choose one canonical source of truth for shared application code and data schemas so the Zite prototype and Next.js deployment do not drift.

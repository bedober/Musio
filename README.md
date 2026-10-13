# Musio

Musio is a Vercel-ready music platform starter for listeners, artists, and admins in Uganda and beyond.

## Product direction

- Listener discovery and playlists
- Artist profiles and uploads
- Admin moderation and quality controls
- Premium subscription path with local payment readiness
- Rights-aware media storage and royalty foundations

## Recommended stack

- Frontend: Next.js + TypeScript
- Database: Supabase PostgreSQL
- Auth: Supabase Auth + role-based access
- Storage: S3-compatible private object storage with signed URLs
- Deployment: Vercel
- Payments: Flutterwave or comparable provider

## Runtime

- Node.js 24.x
- Next.js 15.5.27
- React 19.2.4

## Local development

```bash
npm install
npm run dev
```

## Environment setup

Copy the example file and fill in the values for your Supabase project:

```bash
cp .env.example .env.local
```

## Production checks

```bash
npm audit
npm run build
```

## Current status

The starter includes a dashboard-oriented front-end shell and the base project structure required for a production MVP. Authentication, uploads, storage policies, database schema, rights tracking, payments, and royalty accounting still require backend configuration and service integration.

## Suggested phases

1. MVP streaming and discovery
2. Artist and label onboarding
3. Monetization and payments
4. Growth and international expansion

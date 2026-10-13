# Musio

Musio is a responsive music discovery platform starter for listeners and artists.

## Runtime
- Node.js 24.x (Vercel production runtime)
- Next.js 15.5.27 (patched maintenance release)
- React 19.2.4

## Local development
```bash
npm install
npm run dev
```

## Production checks
```bash
npm audit
npm run build
```

The current UI is a frontend starter. Authentication, real audio streaming, artist uploads, database persistence, and royalty accounting still require backend services and must not be considered implemented by the demo interface.

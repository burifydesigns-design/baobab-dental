# Baobab Dental — Cloudflare Pages

Static site and API functions for the Baobab Dental demonstration. The public form creates appointment **requests**, not confirmed bookings. The admin area reads and updates those requests in MongoDB.

## Cloudflare Pages setup

- Connect this repository to Cloudflare Pages.
- Keep `main` as the production branch; review this migration as a Preview first.
- Build command: leave empty (the site is static).
- Build output directory: `/` (repository root; Wrangler config uses `.`).
- Pages Functions are discovered automatically from `functions/`.
- `npm run check` checks JavaScript syntax; `npm run dev:cf` starts local Pages development.

## Environment variables

Set these as **server-side Pages environment variables** separately for Preview and Production. Do not commit them or expose them in browser-prefixed variables.

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Yes | Private MongoDB Atlas connection string |
| `MONGODB_DB` | No | Database name; defaults to `baobab_dental` |
| `ADMIN_EMAIL` | Yes | Admin sign-in email |
| `ADMIN_PASSWORD_HASH` | Yes | Scrypt hash formatted `salt:hex` |
| `SESSION_SECRET` | Yes | At least 32 random characters for signing admin sessions |
| `APP_ORIGIN` | Recommended | Exact origin for this environment, e.g. Preview URL or production domain |

For local development, copy `.env.example` to `.dev.vars` and fill in test-only values. `.dev.vars` must never be committed.

Generate a scrypt password hash and session secret locally:

```bash
node -e "const c=require('node:crypto');const s=c.randomBytes(16).toString('hex');const p=process.argv[1];console.log(s+':'+c.scryptSync(p,s,64).toString('hex'))" 'YOUR_UNIQUE_ADMIN_PASSWORD'
node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"
```

Never paste secrets into chat, source code, issues, or logs.

## MongoDB Atlas network access

Cloudflare Workers connect to MongoDB using the native Node.js driver over TCP/TLS. Ordinary Workers/Pages Functions do not provide a fixed outbound IP. Atlas network access therefore needs a deliberate network strategy. A broad `0.0.0.0/0` rule permits connections from any IPv4 address and materially expands exposure; do not add it without an explicit security decision. Use a dedicated database user restricted to the required database and a strong unique password. Evaluate a controlled egress/proxy design if broad IP access is unacceptable.

The function code opens one short-lived MongoClient per invocation and closes it after the database operation; it does not retain a live module-level socket pool. This is intentionally conservative for the Workers runtime. If the MongoDB driver cannot establish direct TCP/TLS connections in your Cloudflare account/runtime, this architecture must be changed to use a supported data-access proxy/service before production; do not weaken Atlas network rules as a troubleshooting shortcut.

The app creates indexes for appointment chronology/status, audit chronology, and TTL cleanup of login-attempt records.

## API routes

- `POST /api/appointments` — validates consent and stores a request as `new`.
- `POST /api/admin/login` — checks configured admin credentials, throttles failed attempts, and issues an eight-hour secure cookie.
- `GET /api/admin/session` — checks the session.
- `POST /api/admin/logout` — clears the session cookie.
- `GET /api/admin/appointments` — lists up to 100 requests for an authenticated admin.
- `PATCH /api/admin/appointments` — updates request status and records an audit event.

## Local verification

1. Install dependencies with `npm ci`.
2. Run `npm run check`.
3. Copy `.env.example` to `.dev.vars` and fill in test-only credentials and a test database.
4. Run `npm run dev:cf`.
5. Test public request and admin login/session/list/update/logout routes with test data only.

Do not use real patient data during testing. The site does not check calendar availability, send email/SMS, or integrate with practice-management software. Staff, finance, clinic and content panels remain illustrative demo data. Review privacy notices, retention, applicable Australian privacy obligations, backups, monitoring and security independently before any real clinic deployment.

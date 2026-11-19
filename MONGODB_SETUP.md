# MongoDB-backed Baobab Dental demo

This branch adds a server-side MongoDB API for appointment requests and protected admin appointment access. It does not connect to or provision a MongoDB cluster automatically.

## What is connected in code

- `POST /api/appointments`: validates a public appointment enquiry and stores it in MongoDB as `status: new`. It is a request, not a confirmed booking.
- `POST /api/admin/login`: verifies the configured admin email and scrypt password hash, then issues an eight-hour HttpOnly, Secure, SameSite=Strict cookie.
- `GET /api/admin/session`: reports whether the cookie is valid.
- `POST /api/admin/logout`: clears the session cookie.
- `GET /api/admin/appointments`: returns up to 100 requests to an authenticated admin.
- `PATCH /api/admin/appointments`: changes a request status and writes an admin audit record.

The current admin dashboard UI still contains synthetic sample data. These API endpoints are a protected backend foundation; a subsequent UI pass must replace the sample appointment table with the authenticated API data before this can be described as a live admin system.

## 1. Create MongoDB Atlas database

1. Create a MongoDB Atlas project and cluster.
2. Create a dedicated database user with a strong unique password. Grant only read/write access to the `baobab_dental` database.
3. Configure Network Access for the Vercel deployment. Prefer the narrowest supported allowlist; do not leave broad access enabled as a permanent production setting.
4. Copy the Atlas connection string and set the database name to `baobab_dental`.

Collections are created on first API use:
- `appointment_requests`
- `admin_audit_logs`

Indexes are created by the API on first database connection.

## 2. Configure Vercel environment variables

Add these to the Vercel project for the correct environments (Preview and Production as appropriate):

- `MONGODB_URI`: Atlas connection string.
- `MONGODB_DB`: `baobab_dental`.
- `ADMIN_EMAIL`: the admin sign-in email.
- `ADMIN_PASSWORD_HASH`: scrypt hash in `salt:hex` format.
- `SESSION_SECRET`: at least 32 random characters.
- `APP_ORIGIN`: the expected deployment origin (reserved for origin validation in a later hardening pass).

Never put these values in frontend code, committed production environment files, or variables prefixed with `VITE_` / `NEXT_PUBLIC_`.

Generate a password hash and session secret locally:

```bash
node -e "const c=require('node:crypto');const s=c.randomBytes(16).toString('hex');const p=process.argv[1];console.log(s+':'+c.scryptSync(p,s,64).toString('hex'))" 'REPLACE_WITH_A_LONG_UNIQUE_PASSWORD'
node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"
```

Do not reuse the example password. Do not send credentials in chat or commit them to GitHub.

## 3. Deploy and verify

After setting variables, deploy the branch as a Vercel Preview. Verify:

1. Without MongoDB variables, the public form must fail safely and clearly state that nothing was saved.
2. With valid Atlas credentials, a consented appointment request returns HTTP 201 and appears in `appointment_requests` with status `new`.
3. Invalid email, invalid branch/service, past date, missing consent and oversized payloads are rejected.
4. Admin API requests without a valid cookie return HTTP 401.
5. Valid admin login sets an HttpOnly cookie; session check succeeds; logout invalidates it.
6. Admin status changes are recorded in `admin_audit_logs`.

## Important production gaps

- This demo does not create confirmed appointments, check calendar availability, send email/SMS, or sync with practice-management software.
- The public enquiry form collects contact details. Before real use, replace demo privacy copy with a clinic-reviewed privacy notice and retention policy, and confirm applicable Australian privacy obligations.
- Add a durable rate limiter/WAF, CSRF/origin checks, monitoring, backup/restore testing, and account recovery before production.
- The current dashboard is still a demo UI; do not enter or store real patient data until the UI is wired to the protected endpoints and the clinic's privacy/security requirements are reviewed.
- No clinical notes, symptoms, diagnoses or health history are collected by this form.

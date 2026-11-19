# MongoDB-backed Baobab Dental demo

This branch includes the public appointment-request API and an authenticated admin UI that reads and updates real appointment-request records from MongoDB. It does not provision an Atlas cluster or configure Vercel secrets automatically.

## What is connected in code

- `POST /api/appointments`: validates a public appointment enquiry and stores it in MongoDB as `status: new`. It is a request, not a confirmed booking.
- `POST /api/admin/login`: verifies the configured admin email and scrypt password hash, applies a per-IP failed-attempt limit, then issues an eight-hour HttpOnly, Secure, SameSite=Strict cookie.
- `GET /api/admin/session`: reports whether the cookie is valid.
- `POST /api/admin/logout`: clears the session cookie.
- `GET /api/admin/appointments`: returns up to 100 requests to an authenticated admin.
- `PATCH /api/admin/appointments`: changes a request status and writes an admin audit record.
- The admin page now requires sign-in before showing its dashboard. The appointment table uses live MongoDB records; staff, finance, clinic and content panels remain illustrative sample data.

## 1. Configure MongoDB Atlas

1. In Atlas, open the project and create or select a running cluster.
2. Create a dedicated database user with a strong unique password. Grant only read/write access to the `baobab_dental` database.
3. In Network Access, permit the Vercel deployment to reach the cluster. Use the narrowest supported network rule for your deployment and review it before production.
4. Open the cluster's **Connect** flow, choose **Drivers → Node.js**, and copy the connection string.
5. Replace the password placeholder locally and URL-encode any special characters in the username/password as required by MongoDB's connection-string rules. Keep the complete URI private.

The app uses database `baobab_dental` by default and creates these collections/indexes on first connection:
- `appointment_requests`
- `admin_audit_logs`
- `admin_login_attempts` (15-minute TTL for failed-login throttling)

The Node.js driver reuses one MongoClient connection per warm serverless process and uses a small pool. See the [MongoDB Node.js connection guide](https://www.mongodb.com/docs/drivers/node/current/connect/connection-targets/) and [connection-pool guidance](https://www.mongodb.com/docs/drivers/node/current/connect/connection-options/connection-pools/).

## 2. Configure Vercel environment variables

Add the following as **server-side** environment variables to the Baobab Dental Vercel project. Set Preview first; add Production only after the preview passes verification.

- `MONGODB_URI`: full Atlas connection string.
- `MONGODB_DB`: `baobab_dental`.
- `ADMIN_EMAIL`: the admin sign-in email.
- `ADMIN_PASSWORD_HASH`: scrypt hash in `salt:hex` format.
- `SESSION_SECRET`: at least 32 random characters.
- `APP_ORIGIN`: exact preview origin for the preview environment (for example, the exact Vercel preview hostname); use the production domain only in Production.

Never put these values in frontend code, committed environment files, or variables prefixed with `VITE_` / `NEXT_PUBLIC_`. Do not paste the URI, password, or session secret into chat or GitHub issues.

Generate a password hash and session secret locally:

```bash
node -e "const c=require('node:crypto');const s=c.randomBytes(16).toString('hex');const p=process.argv[1];console.log(s+':'+c.scryptSync(p,s,64).toString('hex'))" 'REPLACE_WITH_A_LONG_UNIQUE_PASSWORD'
node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"
```

Use a new, unique password; do not reuse the example text.

## 3. Deploy and verify the Preview

After the environment variables are saved, redeploy the branch Preview so the functions receive the new values. Verify:

1. Without MongoDB variables, the public form fails safely and does not claim a request was saved.
2. With valid Atlas credentials, a consented appointment request returns HTTP 201 and appears in `appointment_requests` with status `new`.
3. Invalid email, invalid branch/service, past date, missing consent, invalid JSON and oversized payloads are rejected.
4. Admin access prompts for sign-in. Wrong credentials return 401; more than five attempts from the same client within the 15-minute window return 429.
5. Admin API requests without a valid cookie return HTTP 401.
6. Valid admin login sets an HttpOnly cookie; session check succeeds; logout invalidates it.
7. The admin appointment table displays submitted requests and status changes persist to MongoDB with audit records.
8. A request is clearly labelled as pending until clinic staff separately confirm availability.

## Important boundaries before real clinic use

- This demo does not confirm calendar availability, send email/SMS, or sync with practice-management software.
- Staff, finance, clinic and content panels still show synthetic demo data. They must not be presented as live business records.
- The public enquiry form collects contact details. Before real use, replace demo privacy copy with a clinic-reviewed privacy notice and retention policy, and confirm applicable Australian privacy obligations.
- Add monitoring, backup/restore testing, formal retention/deletion workflows and an independent security review before storing real patient data.
- Do not enter clinical notes, symptoms, diagnoses or health history. The form is deliberately limited to contact details and appointment preferences.

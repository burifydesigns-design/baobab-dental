# Baobab Dental (Demo)

Static, hash-routed demonstration website for a fictional multi-branch dental clinic in Perth, Western Australia.

## Project structure

```text
.
├─ index.html                 # Single-page app shell and metadata
├─ css/
│  └─ styles.css              # Global styles
├─ js/
│  └─ app.js                  # Route/content rendering and client interactions
├─ assets/                    # Local static assets (reserved)
├─ docs/
│  └─ site-audit-report.md    # Audit notes and limitations
├─ robots.txt
├─ sitemap.xml
├─ site.webmanifest
├─ favicon.svg
├─ package.json
└─ package-lock.json
```

## Development

No build step is required.

- Open `index.html` in a browser, or serve the folder with any static file server.
- JavaScript syntax check: `npm run check`

## Deployment notes

- Lockfile must stay in sync with `package.json` for CI environments using `npm ci`.
- This is a demo: booking, admin, team, pricing, and clinic details are illustrative and non-production.

# Baobab Dental Demo — Site Audit

## Scope and method

This audit covers the static Perth clinic concept and its public pages and admin demo. It preserves the no-database requirement. The supplied audit attachment was treated as read-only.

## Addendum (current pass)

Structural/standards fixes applied in code during this pass:
- Repaired widespread UTF-8 mojibake artifacts in HTML/JS/CSS/report content so punctuation/symbols render correctly (em dashes, bullets, arrows, quotes, currency minus, etc.).
- Added core site metadata/assets: `robots`, `color-scheme`, Open Graph/Twitter tags, canonical link, favicon, web manifest, `robots.txt`, `sitemap.xml`, and `.gitignore`.
- Implemented per-route SPA head updates (`document.title`, meta description, OG/Twitter, robots) in `app.js`; admin routes are marked `noindex,nofollow,noarchive`.
- Hardened external links by adding `rel="noopener noreferrer"` to `target="_blank"` links.
- Removed duplicate meta description and cleaned head structure in `index.html`.

Automated checks (this pass): `node --check js/app.js` passed; no remaining target-blank links without `noopener`; no common mojibake marker patterns found in source files.
Limitations remain unchanged: hash-routed SPA is not independently indexable without prerender/SSR, content/details are demo placeholders, and admin has no authentication (by design for static demo).

Reviewed [index.html](../index.html), [app.js](../js/app.js), and [styles.css](../css/styles.css); exercised the running site in a browser; checked all listed routes at 320, 375, 430, 768, 1024, 1280, 1440, and 1920 CSS pixels; and sampled text contrast on the home page.

This is a demo-quality audit, not a production security, clinical, legal, performance-lab, or screen-reader certification.

## Executive summary

The site has a coherent visual identity, useful page coverage, clear demo disclosures, and a working set of local interactions. The route and responsive checks found no rendering failures, horizontal overflow, or page errors. The most important issues are inherent in the demo scope (no real booking, data, or access control), unverified clinic content, weak search-engine discoverability from hash-based routing, a few accessibility-state and keyboard-focus gaps, and low-contrast supporting text.

**Pre-change scores (10 = strongest):**

| Area | Score | Evidence |
|---|---:|---|
| Visual identity and consistency | 7 | Consistent forest/sage palette, serif/sans pairing, and repeated components; some generic copy and repeated photography weaken distinctiveness. |
| Content quality and authenticity | 5 | Services include process, recovery, and illustrative pricing; clinic, team, hours, prices, and contacts are expressly unverified placeholders. |
| User experience and conversion | 6 | Clear booking calls to action and contact paths; booking is only a preview and does not create appointments. |
| Functionality | 7 | Navigation, filters, FAQ, booking preview, and admin demo controls work; no live integrations or persistence are present. |
| Responsive behavior | 9 | 35 routes × 8 widths rendered with no horizontal overflow or missing page heading. |
| Accessibility | 5 | Semantic landmarks, skip link, visible focus, labels, native FAQ disclosure, and reduced-motion rules exist; contrast and a few interaction states need improvement. |
| Search and performance readiness | 4 | Per-route titles and responsive image widths exist, but the site is a single hash-routed document, has one static description, and depends on third-party assets. |
| Production readiness | 2 | Fictional business data, preview-only booking, public unauthenticated admin, no persistence, and placeholder legal copy make this unsuitable for a real clinic launch. |

## Findings before implementation

### Critical for any real deployment

1. **The admin demo is public and has no authentication or access control.** The current records are explicitly synthetic and contain no patient details, but this route must not be used for real staff, financial, or patient data without a separately designed secure backend and authorization.
2. **Business details are placeholders.** The three branch areas, contact numbers, opening hours, staff profiles, qualifications, prices, finance values, and payment arrangements are illustrative. Verify and replace them before publication.
3. **Booking is not a booking service.** It only previews clinic, service, date, and time in the browser. It sends no request, confirms no appointment, and provides no reminders. This is correctly disclosed in the UI.
4. **Legal copy is demo guidance, not clinic policy.** A real clinic must review its privacy, terms, and cookie disclosures against its actual data practices and applicable Australian requirements.

### High priority

5. **Hash routing limits SEO.** The page title changes by route, but the single HTML shell has one description and all pages use hash fragments. Search engines do not receive independently rendered service, clinic, or article documents; proper per-page indexing needs pre-rendering/SSR or equivalent route output.
6. **Photography and copy are not clinic-specific.** External stock photography is reused, and several themes/phrases repeat across pages. Use consented, authentic clinic and team images and verified, differentiated copy for a real launch.
7. **Supporting text contrast is inconsistent.** A representative contrast sample measured 4.28:1 for hero proof text, 4.10:1 for trust-strip supporting text, and 4.28:1 for section descriptions and service-card text against their rendered backgrounds, below the 4.5:1 WCAG AA target for normal text.
8. **The booking dialog has a keyboard-focus issue after its preview submits.** The form is hidden while focus remains on its submit control; pressing Escape did not close the open dialog in the browser check. Move focus into the visible confirmation before dismissing.

### Medium priority

9. **State is not consistently announced to assistive technology.** The mobile menu's accessible name remains “Open menu” while expanded, and treatment filter selection is conveyed visually without an `aria-pressed` state.
10. **Typography is often very small.** Numerous helper labels and admin table captions are 7–10px. Even where contrast passes, this is difficult to read, especially on mobile and at zoom.
11. **Third-party assets affect resilience and privacy.** Images come from Unsplash and fonts from Google Fonts; a network failure or provider change can affect presentation. The image requests succeeded in the audited browser session; this is not a guarantee of availability or a measured performance result.
12. **No verified map embed, booking backend, analytics, CMS, reminders, or real finance integration exists.** Those omissions are consistent with the requested static demo, not hidden functionality.

## Page-by-page route audit

Every listed route rendered a non-empty page with an `h1`. Routes marked “demo” contain illustrative content and do not imply verified clinic operations.

| Route | Audit notes |
|---|---|
| `#/` | Clear booking CTA, Perth positioning, trust strip, clinic links, emergency call, and demo disclosures; trust claims and photography remain illustrative. |
| `#/services` | Service catalog, category filters, pricing disclaimer, and booking CTA render. |
| `#/services/general-dentistry` | Process, recovery, illustrative price, and preview-booking controls render. |
| `#/services/cleaning-hygiene` | Process, recovery, illustrative price, and preview-booking controls render. |
| `#/services/fillings` | Process, recovery, illustrative price, and preview-booking controls render. |
| `#/services/root-canal` | Process, recovery, illustrative price, and preview-booking controls render. |
| `#/services/extractions` | Process, recovery, illustrative price, and preview-booking controls render. |
| `#/services/braces-aligners` | Process, recovery, illustrative consultation price, and preview-booking controls render. |
| `#/services/whitening` | Process, recovery, illustrative price, and preview-booking controls render. |
| `#/services/dental-implants` | Process, recovery, illustrative consultation price, and preview-booking controls render. |
| `#/services/veneers` | Process, recovery, illustrative consultation price, and preview-booking controls render. |
| `#/services/childrens-dentistry` | Process, recovery, illustrative price, and preview-booking controls render. |
| `#/services/emergency-dental-care` | Urgency guidance and emergency medical escalation caveat render; phone number is illustrative. |
| `#/clinics` | Three location cards, directions links, hours, and demo disclaimer render. |
| `#/clinics/perth-city` | Address, hours, phone, directions, and preview booking render; details are illustrative. |
| `#/clinics/subiaco` | Address, hours, phone, directions, and preview booking render; details are illustrative. |
| `#/clinics/south-perth` | Address, hours, phone, directions, and preview booking render; details are illustrative. |
| `#/team` | Team cards and qualification-verification disclaimer render; profiles are placeholders. |
| `#/about` | Clinic story and facility imagery render; facility/equipment information is expressly illustrative. |
| `#/patients` | First-visit guide, payment guidance, FAQs, and emergency advice render. |
| `#/patients?section=payments` | Payment section route/anchor renders; acceptance and arrangements remain unverified. |
| `#/journal` | Three educational article cards and general-information disclaimer render. |
| `#/journal/what-to-expect-first-visit` | Article content and general-information disclaimer render. |
| `#/journal/sensitive-teeth-guide` | Article content and general-information disclaimer render. |
| `#/journal/making-checkups-a-habit` | Article content and general-information disclaimer render. |
| `#/contact` | Branch contact cards, call and WhatsApp links render; all phone/address details are illustrative. |
| `#/privacy` | Demo privacy notice describes the current no-database behavior and need for real policy review. |
| `#/terms` | Demo terms clarify illustrative data, no booking, and no medical advice. |
| `#/cookies` | Demo cookie disclosure matches the current lack of tracking configuration. |
| `#/admin` | Sample dashboard renders; public access and in-memory-only behavior are disclosed. |
| `#/admin?section=admin-appointments` | Appointment filters and temporary status controls render. |
| `#/admin?section=admin-staff` | Staff search, assignment, availability, and sample-add controls render. |
| `#/admin?section=admin-finances` | AUD summary, period control, chart, and sample ledger render. |
| `#/admin?section=admin-clinics` | Clinic dashboard section renders; values remain illustrative. |
| `#/admin?section=admin-content` | Static content summary renders; no CMS editing is connected. |

## Baseline test results

| Check | Result |
|---|---|
| Route/viewport matrix | **PASS** — 35 routes at 8 widths (280 combinations); no missing `h1`, empty page, or horizontal overflow. |
| Browser page errors during matrix | **PASS** — none observed. |
| Mobile navigation | **PASS** — opens and reports expanded state; route navigation works. |
| Service category filter | **PASS** — “Smile journeys” displays 3 items. |
| FAQ disclosure | **PASS** — native disclosure opens. |
| Booking preview | **PASS with issue** — confirmation explicitly says nothing was booked; Escape did not close the dialog after submission. |
| Admin appointments | **PASS** — Perth City filter showed 3 rows; changing `BD-4811` to Cancelled and filtering showed 1 row. |
| Admin staff | **PASS** — Subiaco filter showed 2 profiles; availability and clinic assignment changed; adding a teammate raised the sample count to 6. |
| Admin finance | **PASS** — previous-month selection updated collections to `$72,840`. |
| Admin ledger | **PASS** — Pending showed 2 entries; reconciling one reduced the filtered list to 1. |
| Homepage hero image | **PASS** — loaded at 1300px natural width; no failed Unsplash or Google Fonts requests observed in that session. |
| JavaScript syntax | **PASS** — `node --check app.js`. |

## Post-audit implementation and verification

The baseline findings above were recorded before site changes. The following fixes were then applied:

- Darkened the shared muted text color. The previously failing representative text samples now measure 5.05:1–5.28:1 against their rendered backgrounds, above the 4.5:1 normal-text target.
- Updated the mobile navigation's accessible name as it opens and closes, and exposed the selected treatment filter with `aria-pressed`.
- Moved Google Fonts loading from CSS `@import` to preconnected document links; added asynchronous image decoding and high fetch priority to the eager homepage hero image.
- Moved focus to the visible booking confirmation after submission and added explicit Escape-key dismissal for the open booking dialog.

**Post-change demo scores:** visual identity 7/10; content/authenticity 5/10; UX/conversion 7/10; functionality 7/10; responsive behavior 9/10; accessibility 7/10; search/performance readiness 5/10; production readiness 2/10. The remaining small captions and placeholder content still need attention before launch.

### Post-change verification

| Check | Result |
|---|---|
| Route/viewport matrix | **PASS** — 35 routes × 8 widths (280 combinations); no missing `h1`, empty page, or horizontal overflow. |
| JavaScript syntax | **PASS** — `node --check app.js`. |
| Trailing whitespace | **PASS** — direct scan of all edited source and report files found none. |
| Mobile menu | **PASS** — open/close state and accessible name update; navigating closes the menu. |
| Treatment filter | **PASS** — “Smile journeys” shows 3 items and updates `aria-pressed`. |
| FAQ | **PASS** — disclosure opens. |
| Booking | **PASS** — confirmation is focused, explicitly preview-only, and Escape closes the dialog. |
| Admin appointment controls | **PASS** — Perth City filter shows 3; changing an appointment to Cancelled and filtering shows 1. |
| Staff controls | **PASS** — Subiaco filter shows 2; availability, clinic assignment, and adding a sample teammate work. |
| Finance and ledger | **PASS** — previous period shows `$72,840`; changing one pending ledger status reduces the pending list from 2 to 1. |
| Image and runtime errors | **PASS** — hero image loaded at 1300px natural width; no observed page errors or failed image/font requests. |
| Contrast follow-up | **PASS for sampled text** — hero proof 5.28:1, trust-strip supporting text 5.05:1, section description 5.28:1, and service-card text 5.28:1. This is a sample, not a complete WCAG audit. |

Real clinic details, authentic photography, accessible full-size typography throughout, reviewed legal policies, authentication, live booking, and independently indexable pages remain production requirements. They are intentionally not fabricated or connected in this static, no-database demo.

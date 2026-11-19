# Agent Instructions

## Project type
Static frontend demo (HTML/CSS/vanilla JS). No backend, no database, no real booking or patient data handling.

## Commands
- Syntax check: `npm run check` (`node --check js/app.js`)
- Install (lockfile-aware CI): `npm ci`
- If manifest/lock mismatch: `npm install` (or `npm install --package-lock-only`), verify with `npm ci`, and commit lockfile changes.

## Conventions
- Keep content and interactions clearly labeled as demo/illustrative where applicable.
- Preserve accessibility semantics (landmarks, labels, focus states, keyboard behavior) when editing UI.
- Prefer small, maintainable changes in `index.html`, `css/styles.css`, and `js/app.js`.
- Do not introduce secrets, persistence, or real clinic integrations without explicit request.
- Do not commit unless explicitly asked.

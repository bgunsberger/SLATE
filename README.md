# SCOPE

Rights-Aware AI Governance for Creative Production.

A question-first, fictional creative-production decision-support prototype. Open `dist/index.html` through a local HTTP server; all assets are authored static files. The existing Sites identity is preserved in `.openai/hosting.json`.

## Experience

- Ask in plain language or choose one of six realistic questions.
- Confirm material, source, operation, destination, environment, location and exact inventory. Unknowns remain explicit.
- Read an approved, conditional, review-required or restricted decision brief, with an accountable person, supporting evidence, next actions and audit details.
- Follow linked records, search evidence and inspect who supplies and verifies each kind of information.
- Save briefs and review drafts within the current page session, or download a text brief containing the evidence snapshot. No messages are sent.

## Boundaries

All studio data, people, contracts, collective agreements, consents, prior decisions and policies are invented. The records represent a fixed 14 September 2026 demonstration snapshot. They are curated extracts, with no underlying contract attachments. They do not represent actual guild, union or legal requirements.

Question recognition uses limited keyword suggestions, not a language model. Users confirm the structured proposal. Rules live in `dist/engine.js`; unsupported combinations require review. The application creates no new legal permission. Approval means the confirmed scope matches a recorded fictional permission. Restrictions take precedence over unresolved information. Contributor selection and team access can change the outcome.

The reference records are read-only. Saved briefs and review notes are in memory and disappear on refresh. There is no shared database, live approval service, email delivery or real contract integration. Do not enter actual production or personal data. A future live implementation needs authenticated roles, controlled source files, independently verified rights records, versioned policy evaluation, durable audit history, expiry/withdrawal handling and review assignment.

## Structure

- `dist/app.js`: question and confirmation flow, decision briefs, record explorer, dialogs, review drafts and downloads.
- `dist/data.js`: connected fictional records and scenarios.
- `dist/engine.js`: deterministic assessment rules.
- `dist/styles.css`: responsive dark workspace and readable paper-style briefs.
- `tests/engine.test.js`: outcomes, unknowns, contributor selection, restrictions, scope boundaries and evidence integrity.

## Validation

Run `npm run check` and `npm test` (no dependencies required).

Browser-verified on 16 September 2026: all six scenarios; modified Nia experiment with US access becoming restricted; unrecognised question remaining under review; connected record navigation; search; stewardship view; saved brief; review draft; downloaded text file including evidence; desktop and 390px mobile views with no horizontal overflow. No browser errors or warnings were observed.

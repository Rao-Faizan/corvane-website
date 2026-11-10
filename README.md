# Corvane Consulting — Website

Business Systems. Intelligent Solutions.

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · React Hook Form + Zod · optional Sanity CMS · Resend.

## Quick start

```bash
npm install
cp .env.example .env.local     # optional for local dev; see comments inside
npm run dev                    # http://localhost:3000
```

To test the contact form locally without email credentials, set an absolute `INQUIRY_LOG_FILE` path in `.env.local`. Submissions are appended there as JSON Lines.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build + standalone packaging |
| `npm start` | Run the standalone production server |
| `npm run check` | Typecheck, lint, unit tests, build |
| `npm test` | Unit tests (Vitest) |
| `npx playwright test` | E2E tests (after `npm run build`) |

## Where things are

- **Content:** `src/content/*` (local typed data) or Sanity (`sanity/schemas`)
- **Publication rules:** `src/lib/content/rules.ts`
- **Design tokens:** `src/app/globals.css`
- **Lead flow:** `src/components/forms`, `src/app/api/inquiry`, `src/lib/inquiry`

## Documentation

| Doc | Contents |
| --- | --- |
| [docs/FINAL_REPORT.md](docs/FINAL_REPORT.md) | What was delivered and what's needed next |
| [docs/PROJECT_AUDIT.md](docs/PROJECT_AUDIT.md) | Initial inspection |
| [docs/TECHNICAL_ARCHITECTURE.md](docs/TECHNICAL_ARCHITECTURE.md) | Stack, structure, data flow, decisions |
| [docs/PRODUCT_INVENTORY.md](docs/PRODUCT_INVENTORY.md) | Product readiness and verification process |
| [docs/PRODUCT_CONTENT_REQUIREMENTS.md](docs/PRODUCT_CONTENT_REQUIREMENTS.md) | Content management must supply |
| [docs/TESTING.md](docs/TESTING.md) | Test coverage and latest results |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | VPS / Docker deployment, email, CMS |
| [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md) | Go-live checklist |
| [docs/IMPLEMENTATION_PROGRESS.md](docs/IMPLEMENTATION_PROGRESS.md) | Phase status and pending work |

> Content rule: never publish unverified product features, invented clients, testimonials, metrics or certifications. The unit tests include guardrails for this.

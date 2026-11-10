# Implementation Progress

**Last updated:** 2026-11-11 · **Overall:** development complete for everything that doesn't depend on management input or credentials.

## Phase status

| Phase | Status | Notes |
| --- | --- | --- |
| 1. Repository audit | **Completed** | Empty working folder; parent repo holds unrelated client documents (not used). `PROJECT_AUDIT.md` |
| 2. Technical planning | **Completed** | `DEVELOPMENT_PLAN.md`, `TECHNICAL_ARCHITECTURE.md`, `PRODUCT_INVENTORY.md` |
| 3. Design system | **Completed** | Tokens, Manrope, layout primitives, buttons, reveal motion, AA-contrast accent |
| 4. Homepage | **Completed** | All 10 sections from the brief; verified visually at desktop and mobile |
| 5. Product portfolio | **Completed** | `/products` and data-driven `/products/[slug]`; unverified sections auto-hidden |
| 6. Remaining pages | **Completed** | Solutions, industries, about, case studies (+detail), insights (+detail), contact, privacy, terms, 404 |
| 7. CMS | **Completed (integration layer)** / **Blocked (live connection)** | Schemas, GROQ client and local fallback built; needs a Sanity project ID |
| 8. Lead generation | **Completed (code)** / **Blocked (email credentials)** | End-to-end verified using the file channel; Resend needs an API key and a verified domain |
| 9. SEO and performance | **Completed** | Metadata, OG image, sitemap, robots, JSON-LD, real 404s; Lighthouse recorded |
| 10. QA | **Completed** | 30 unit + 59 e2e tests passing; see `TESTING.md` |
| 11. Production preparation | **Completed** | `.env.example`, `DEPLOYMENT.md`, `LAUNCH_CHECKLIST.md` |
| Launch | **Pending** | Requires management approvals; see below |

## Features implemented

- 17 public routes plus API, sitemap, robots, OG image and icon
- Responsive header with an accessible products dropdown and a native-`<dialog>` mobile menu
- CSS-3D hero composition (zero JS, reduced-motion aware)
- Abstract product illustrations (no fake screenshots)
- Product readiness model with internal labels that are never shown publicly
- Contact and demo request forms with shared Zod validation, honeypot, minimum fill time, rate limiting, origin check, and honest failure states
- Delivery through Resend and/or a JSONL log; the form never claims success if nothing was delivered
- Content repository with optional Sanity and resilient fallback
- Proxy-level real HTTP 404 for unknown detail slugs
- Security headers; indexing disabled by default

## Key decisions

| Decision | Reason |
| --- | --- |
| CSS 3D instead of React Three Fiber | Same visual intent, zero JS, better mobile LCP |
| No Framer Motion / shadcn | Not needed for the interactions built; keeps the bundle small |
| Products shown as "scope only" | The brief requires the product families on the homepage, but nothing could be verified, so only business-area descriptions are published |
| Fetch-based Sanity and Resend clients | No SDK weight; easy to audit |
| `output: standalone` + `npm start` runs it | Hosting may be a VPS; e2e tests run the real artifact |
| Robots blocked by default | Prevents accidental indexing of staging |
| `@types/node` bumped to 24 | Required by Vitest 5's peer dependency |

## Issues found and fixed during QA

1. `usePathname()` in the header blocked prerendering on dynamic routes → moved into Suspense wrappers with an identical fallback.
2. Inner pages lost `og:image` (page metadata overrode the file-based image) → referenced explicitly in `pageMetadata`.
3. An empty name showed "at least 2 characters" instead of "is required" → two-step min validation.
4. Nav text contrast fell to 4.05:1 over dark heroes because of the translucent header → solid header.
5. Unknown slugs returned soft 404s (HTTP 200) → `src/proxy.ts`.
6. Orphan product card in the 3-column grid → added a "custom systems" tile (from the brief's "other custom software systems").
7. The React ref lint rule was flagged in the form → anti-spam timing moved to state; honeypot read from the submitted form.

## Pending — requires management or credentials

- [ ] Product ownership and commercialisation approval, verification and readiness per product (`PRODUCT_INVENTORY.md`)
- [ ] Final logo and approved company contact details
- [ ] Legal review of the Privacy Policy and Terms
- [ ] Resend API key and verified sending domain (or SMTP details)
- [ ] Sanity project (optional)
- [ ] Production domain and hosting details
- [ ] **Decide where this project's git repository lives.** It currently sits inside an unrelated repo (`documentation/`), and nothing has been committed.

## Pending — engineering follow-ups (not blocking)

- [ ] Sanity webhook → `revalidateTag` route for instant content updates
- [ ] Firefox/WebKit Playwright projects and real-device testing
- [ ] Optional Cloudflare Turnstile if spam appears
- [ ] Rich-text (portable text) rendering for articles beyond paragraphs
- [ ] Add `generateStaticParams` to case-study and insight detail routes once the first entries exist (instructions in those files)

## Next phase

Management review of the running site (`npm run build && npm start`, then open http://localhost:3000), followed by the content and approval items above, then staging deployment per `DEPLOYMENT.md`.

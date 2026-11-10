# Testing

## Commands

| Command | What it runs |
| --- | --- |
| `npm run typecheck` | Generates route types, then `tsc --noEmit` (strict) |
| `npm run lint` | ESLint with the Next.js core-web-vitals and TypeScript rules |
| `npm test` | Vitest unit tests (`tests/unit`) |
| `npm run build` | Production build + standalone packaging |
| `npm run check` | All of the above, in order |
| `npx playwright test` | E2E tests against the **standalone production server** (run `npm run build` first) |

Playwright starts `node .next/standalone/server.js` on port 3100 with `INQUIRY_LOG_FILE=.data/e2e-inquiries.jsonl`, so form submissions are really delivered and then verified from the log. No email credentials are needed. If a server is already listening on port 3100 it is reused, so stop stale servers first.

## Coverage

### Unit (30 tests)

- Inquiry schema: valid input, trimming, every invalid field, optional fields, length limits
- Spam protection: honeypot, minimum fill time; rate limiter windows and keys
- Email building: HTML escaping of user input (XSS)
- Publication rules: unpublished / not-approved products, case studies without client approval
- Content integrity: unique slugs, cross-references, navigation targets
- **Guardrails:** unverified products can't carry features, integrations, deployment options, screenshots or videos; no placeholder contact details; no case study without client approval

### End-to-end (59 tests)

- Every route (17): HTTP 200, exactly one `<h1>`, title, description, canonical, Open Graph title and image, `lang`, **no console errors**, no internal readiness labels leaked
- Accessibility (axe-core, WCAG 2.1 AA): no serious or critical violations on any route
- 404s: unknown pages and slugs render the branded 404 **with HTTP 404**
- `robots.txt` blocks crawling by default; the sitemap lists every public page
- Security headers present; `X-Powered-By` removed
- Link crawl: every internal link from every page resolves (< 400), and every `#anchor` target exists
- Responsive: no horizontal overflow at **375, 390, 768, 1024, 1440 and 1920 px** across 7 key pages
- Images have alt text; every form control has a label
- Desktop nav: keyboard-operable products dropdown, Escape closes and returns focus, closes on navigation, `aria-current`, skip link
- Mobile nav: dialog opens, Escape closes, link navigates and closes the menu; hero CTAs visible and working
- Forms: client validation messages and `aria-invalid`; contact form preselection via `?type=`; real submission verified in the delivery log; product-page demo form with the product preselected and verified in the log
- Inquiry API: 422 with field errors, unknown product rejected, 415 non-JSON, 403 cross-origin, honeypot and too-fast submissions silently dropped (never delivered), 405 on GET

## Latest results — 2026-11-11

| Check | Result |
| --- | --- |
| TypeScript | ✅ 0 errors |
| ESLint | ✅ 0 problems |
| Unit tests | ✅ 30 / 30 |
| Production build | ✅ 27 pages generated |
| E2E (Chromium) | ✅ 59 / 59 |

### Lighthouse 12 (mobile profile, simulated throttling, local production server)

| Page | Performance | Accessibility | Best Practices | SEO* | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 91 | 100 | 100 | 66* | 2.8 s | 0 | 270 ms |
| `/products/people` | 89 | 100 | 100 | 66* | 2.7 s | 0 | 320 ms |
| `/contact` | 90 | 100 | 100 | 66* | 2.6 s | 0 | 310 ms |

\* SEO is 66 **only** because of the `is-crawlable` audit: indexing is deliberately disabled until launch (`NEXT_PUBLIC_ALLOW_INDEXING`). A build with indexing enabled scored **SEO 100** on `/products/people`.

Remaining performance opportunity: about 60–75 KiB of "unused JavaScript" reported, which is mostly the React and Next.js runtime baseline. Page-specific client JS is limited to navigation and forms.

## Not tested (and why)

- **Real email delivery:** no Resend credentials are available. The Resend channel is implemented, and its HTML escaping is unit-tested, but it must be verified on staging (see `LAUNCH_CHECKLIST.md`).
- **Sanity integration:** no project credentials are available. The fallback path (local content) is exercised by every test. The GROQ projections still need to be checked against a real dataset.
- **Browsers other than Chromium and real devices:** only Playwright Chromium was installed. Run `npx playwright install firefox webkit` and add projects to the config, and test on physical iOS and Android devices before launch.

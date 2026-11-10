# Technical Architecture

## Stack

| Concern | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 16.4 (App Router) with Cache Components | Server Components by default; static shells are prerendered |
| Language | TypeScript (strict) | |
| Styling | Tailwind CSS v4 | Design tokens are CSS variables in `src/app/globals.css` (`@theme`) |
| Font | Manrope via `next/font/google` | Self-hosted at build time, no layout shift |
| Icons | lucide-react | Tree-shaken per icon |
| Forms | React Hook Form + Zod | One shared schema validates on the client **and** the server |
| Email | Resend REST API (plain `fetch`, no SDK) | Optional JSONL file log for VPS backups and development |
| CMS | Sanity (HTTP API through `fetch`, no SDK) | Falls back to typed local content when it isn't configured |
| Unit tests | Vitest | `npm test` |
| E2E tests | Playwright (Chromium) | `npm run test:e2e` |
| Output | `output: 'standalone'` | Portable to a VPS, Docker or a managed host |

### Packages deliberately **not** installed

| Package | Reason |
| --- | --- |
| Framer Motion / `motion` | Every animation needed (reveals, hero drift, menu) is done with CSS: `animation-timeline: view()` as progressive enhancement, plus transitions. This removes about 40 KB of client JS. It can be added later for richer choreography. |
| React Three Fiber / three.js | The hero's "subtle 3D" is a **CSS 3D** architectural composition (`transform-style: preserve-3d`). It is GPU-composited, ships zero JS, renders identically without WebGL and respects `prefers-reduced-motion`. three.js would add about 150 KB+ and hurt LCP on mid-range mobile devices, which matter in the target markets. |
| shadcn/ui | The component surface is small and bespoke. Custom components avoid generic template aesthetics and dependency churn. |
| `next-sanity` / `sanity` | A thin `fetch` client is enough for read-only GROQ queries. The Studio is a separate concern (schemas are provided in `sanity/schemas`). |
| `resend` SDK | One REST call; `fetch` is enough. |

## Directory structure

```
src/
  app/                    routes (Server Components), API route, sitemap, robots, OG image
    api/inquiry/route.ts  lead submission endpoint
  components/
    layout/               Header, DesktopNav (client), MobileNavigation (client), Footer, Logo
    home/                 Hero, Credibility, ProductPortfolio, SolutionsSection, WhyCorvane,
                          ProcessSection, CaseStudies, FinalCTA
    products/             ProductCard, ProductVisual, ProductHero, ProductFeatures, ProductScreenshots,
                          ProductFAQ, ProductCTA
    forms/                ContactForm (client), DemoRequestForm, form fields
    shared/               Container, Section, SectionHeading, ButtonLink, PageHero, EmptyState, JsonLd
  content/                local typed content (products, solutions, industries, navigation, site settings,
                          case studies, articles)
  lib/
    content/              content repository: one API, Sanity or local source
    cms/sanity.ts         GROQ-over-HTTP client
    inquiry/              schema (shared), delivery (Resend / file), spam + rate limiting
    seo.ts                metadata builder
    site-url.ts           canonical URL helper
    utils.ts              cn()
  types/                  domain types
sanity/schemas/           Sanity Studio schema definitions (product, caseStudy, article, industry,
                          solution, faq, siteSettings)
tests/
  unit/                   Vitest
  e2e/                    Playwright
```

## Separation of concerns

- **UI** (`components/`) receives typed props only and never imports content files directly, except layout navigation.
- **Content** (`content/`) is plain typed data. It holds no JSX and no logic.
- **Data access** (`lib/content/`) is the only module pages call. It decides between Sanity and local data and applies publication rules (`isPublished`, `readiness !== 'not-approved'`). Unpublished content can't leak because filtering happens in one place.
- **Business logic** (`lib/inquiry/`) handles validation, spam checks, rate limiting and delivery.
- **Integrations** (`lib/cms/sanity.ts`, `lib/inquiry/deliver.ts`) are isolated behind small interfaces.

## Rendering and caching

- Pages are Server Components. Client components are limited to the desktop dropdown, mobile navigation and the forms.
- Content functions use `'use cache'` with `cacheLife('hours')`, so Sanity content refreshes without a rebuild.
- `/products/[slug]` prerenders every published product through `generateStaticParams`.
- `/case-studies/[slug]` and `/insights/[slug]` have **no approved entries yet**. Cache Components forbids an empty `generateStaticParams`, so these routes resolve `params` inside `<Suspense>` and call `notFound()` for unknown slugs. Once entries exist, `generateStaticParams` is added automatically through the content layer (see the route files).

### Real 404s with streaming (`src/proxy.ts`)

With Cache Components, the static shell (and therefore a `200` status) is sent before a page can call `notFound()`, so a missing slug would only produce a "soft 404" (`noindex` page with status 200). `src/proxy.ts` checks `/products/:slug`, `/case-studies/:slug` and `/insights/:slug` against the public slug index (`src/lib/content/slugs.ts`, which uses the same publication rules) **before** rendering, and rewrites unknown slugs to the branded not-found page with a genuine **HTTP 404**. If the CMS can't be reached, the proxy lets the request through rather than wrongly 404-ing real content.

### Header navigation and `usePathname()`

On routes whose params are only known at request time, `usePathname()` is request-time data. The nav components take `pathname` as a prop. Thin wrappers (`RoutedNav.tsx`) read the hook inside `<Suspense>`, and the fallback is the identical working navigation without active-link highlighting.

## Lead generation flow

```
ContactForm (client)
  ├─ Zod schema (shared) → inline errors
  └─ POST /api/inquiry  (JSON)
        ├─ same-origin check
        ├─ rate limit: 5 requests / 10 min / IP (in-memory, per process)
        ├─ honeypot field must be empty
        ├─ minimum fill time: 3 s
        ├─ Zod schema (same) → 422 with field errors
        └─ deliver()
             ├─ Resend (RESEND_API_KEY, INQUIRY_TO_EMAIL, INQUIRY_FROM_EMAIL)
             ├─ JSONL file log (INQUIRY_LOG_FILE)
             └─ neither configured → 503; the UI says the submission was NOT received
```

The form never reports success unless at least one delivery channel actually accepted the submission.

## Security

- No secrets are exposed to the client. Only `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_ALLOW_INDEXING` are public.
- Security headers are set in `next.config.ts` (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, HSTS in production).
- Email content is HTML-escaped. User input is never rendered as HTML.
- `robots.txt` blocks all crawlers unless `NEXT_PUBLIC_ALLOW_INDEXING=true`, so staging deployments are not indexed.

## Known limitations

- The in-memory rate limiter is per-process. A multi-instance deployment should use Redis or a reverse-proxy rate limit (see `DEPLOYMENT.md`).
- There is no CAPTCHA. If spam appears, add Cloudflare Turnstile (verification hook point: `lib/inquiry/spam.ts`).

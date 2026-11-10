# Launch Checklist

## Business approvals (blocking)

- [ ] Management approves publishing each product family (ownership confirmed) — `PRODUCT_INVENTORY.md`
- [ ] Final logo supplied and swapped in
- [ ] Contact details approved and entered
- [ ] Privacy Policy and Terms reviewed by legal
- [ ] All homepage, About and product copy approved
- [ ] Explicit approval to go live

## Configuration

- [ ] Production domain decided; `NEXT_PUBLIC_SITE_URL` set
- [ ] `NEXT_PUBLIC_ALLOW_INDEXING=true` **only** on the live domain
- [ ] Resend domain verified; `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL` set
- [ ] `INQUIRY_LOG_FILE` set to an absolute, protected path (recommended)
- [ ] (Optional) Sanity configured and content migrated
- [ ] TLS certificate, HTTP→HTTPS redirect, `www` / apex redirect decided
- [ ] Server bound to `127.0.0.1` behind the reverse proxy; Nginx rate limit on `/api/inquiry`

## Verification on staging

- [ ] `npm run check` passes (typecheck, lint, unit tests, build)
- [ ] `npx playwright test` passes
- [ ] A real inquiry submitted from `/contact` **and** from a product demo form arrives by email
- [ ] With email deliberately misconfigured, the form shows "not sent" (it must never show false success)
- [ ] Lighthouse run on home, a product page and contact (target 90+ for Performance, Accessibility, Best Practices and SEO)
- [ ] OG preview checked (LinkedIn Post Inspector, WhatsApp share)
- [ ] Tested on a real iOS and a real Android device

## After launch

- [ ] Submit the sitemap in Google Search Console
- [ ] Monitor the inquiry log and email delivery for the first week
- [ ] Set up uptime monitoring

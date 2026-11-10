# Content Requirements (Management Input Needed)

Everything below is **missing or unapproved**. The site handles each gap honestly: the section is hidden, shows an empty state, or uses neutral copy. Nothing is fabricated.

## 1. Brand

| Item | Status | Where it goes |
| --- | --- | --- |
| Final logo (SVG, light + dark versions) | **Missing.** A provisional wordmark is in use | `src/components/layout/Logo.tsx`, `src/app/icon.svg`, `src/app/opengraph-image.tsx` |
| Confirmation of colours, tagline and typeface | Proposed values in use | `src/app/globals.css` (`:root` tokens) |

## 2. Company information

| Item | Status | Where it goes |
| --- | --- | --- |
| Contact email | **Missing** (hidden) | `src/content/site.ts` → `contactEmail` (or Sanity Global Settings) |
| Phone | **Missing** (hidden) | `contactPhone` |
| Office address(es) | **Missing** (hidden) | `address` |
| Social profiles (LinkedIn etc.) | **Missing** (hidden) | `social` |
| Legal entity name, registration, jurisdiction | **Missing** | Privacy Policy and Terms |
| Company history, founding year, leadership, team | **Missing.** The About page uses positioning only | `src/app/about/page.tsx` |
| Verified statistics (clients, projects, years) | **Missing.** The credibility strip uses a value proposition instead | `src/components/home/Credibility.tsx` |
| Client logos (with permission) | **Missing** | Credibility section |

## 3. Products (per product)

See `PRODUCT_INVENTORY.md`. For each of the 7 products:

- [ ] Ownership / commercialisation approval
- [ ] Readiness classification
- [ ] Verified feature list (title + one-sentence description each)
- [ ] Verified integrations
- [ ] Verified deployment options (cloud / on-premise / hybrid)
- [ ] Approved screenshots (PNG/WebP, at least 1600 px wide, **no client data visible**)
- [ ] Demo video (optional)
- [ ] Review of the tagline, description, challenges, overview and use cases already drafted

## 4. Case studies

For each case study: client name as approved, industry, challenge, solution, **verified** outcome, products used, and **written client approval** (record the reference in the CMS `approvalReference` field).

## 5. Insights

Articles: title, excerpt, author, date, body. None exist yet; the page shows an empty state.

## 6. Legal

- [ ] Legal review of `/privacy-policy` and `/terms`. These are drafts written to match what the site actually does: contact form only, no analytics cookies.
- [ ] Confirm the data retention period for inquiries.
- [ ] If analytics are added later, update the Privacy Policy and add consent handling where required.

## 7. Industries

The Industries page describes **common sector priorities**, not past projects. Once Corvane has verified sector experience, it can add sector proof points.

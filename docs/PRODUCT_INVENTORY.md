# Product Inventory

**Last updated:** 2026-11-11

## Readiness classification

The brief defines four readiness levels. Each product's level is stored in `src/content/products.ts` (`readiness` field) and is **never shown publicly**.

| Level | Meaning | Website behaviour |
| --- | --- | --- |
| `production-ready` | Verified, commercially approved | Full page with verified features |
| `demo-ready` | Verified working demo, approved to show | Full page, demo CTA |
| `development-required` | Exists but needs further work, or is not yet verified | Product family page with scope only; no features, screenshots or integrations are listed |
| `not-approved` | Not approved for commercial use | **Not published** (filtered out of every list, sitemap and route) |

On top of readiness, `isPublished: false` removes a product from the site entirely.

## Current inventory

No product software, demo, documentation or screenshots were available for inspection, so **no product could be verified**. Every product starts at `development-required`, the most conservative level that still lets the product family appear, as the brief's homepage specification requires.

| # | Product | Category | Readiness | Published | Verified features | Ownership / commercialisation confirmed |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Corvane People | HRMS | development-required | Yes (scope only) | 0 | **No — pending management** |
| 2 | Corvane Sales | CRM | development-required | Yes (scope only) | 0 | **No — pending management** |
| 3 | Corvane Insights | Dashboards / BI | development-required | Yes (scope only) | 0 | **No — pending management** |
| 4 | Corvane Workflow | Workflow management | development-required | Yes (scope only) | 0 | **No — pending management** |
| 5 | Corvane Docs | OCR / Document AI | development-required | Yes (scope only) | 0 | **No — pending management** |
| 6 | Corvane Brain | AI chatbots / agents | development-required | Yes (scope only) | 0 | **No — pending management** |
| 7 | Corvane Vision | Computer vision | development-required | Yes (scope only) | 0 | **No — pending management** |
| 8 | Other custom systems | — | Not catalogued | No | — | — |

### What "scope only" means on the public site

Each product page shows:

- The product family name, category and a statement of the **business area it addresses** (for example, "workforce administration"). This describes intent, not verified functionality.
- General **business challenges** in that area. These are market problems, not product claims.
- **Typical use cases**, framed as scenarios to discuss rather than delivered capabilities.
- An FAQ limited to questions Corvane can answer truthfully (engagement process, how to request a walkthrough).
- A working **demo request form**.

The following sections render **only when verified data is added**: Features, Screenshots, Demo video, Integrations and Deployment.

## Management decision required before launch

Each product needs:

1. **Ownership confirmation.** Is the software Corvane's to commercialise, or was it built for or owned by a client? The brief prohibits reusing or rebranding software before this is confirmed.
2. **Product inspection.** A technical walkthrough of the running software to produce a verified feature list.
3. **Readiness classification.** Set `readiness` in `src/content/products.ts` (or in Sanity).
4. **Publication decision.** If a product must not appear at all, set `isPublished: false` or `readiness: 'not-approved'`.

Template for recording verification (copy per product):

```md
### Corvane <Name>
- Inspected by / date:
- Environment inspected (demo URL / build / repo):
- Ownership confirmed by (name, date):
- Readiness:
- Verified features (each with evidence):
- Integrations verified (each with evidence):
- Deployment options verified:
- Screenshots approved (filenames):
- Known gaps:
```
